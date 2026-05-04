import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Clock,
  ExternalLink,
  MapPin,
  Phone,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useCreateReservation } from "../hooks/use-backend";

interface FormState {
  guestName: string;
  phone: string;
  date: string;
  time: string;
  partySize: string;
}

interface FormErrors {
  guestName?: string;
  phone?: string;
  date?: string;
  time?: string;
  partySize?: string;
}

interface BookingConfirmation {
  guestName: string;
  phone: string;
  date: string;
  time: string;
  partySize: string;
  referenceNo: string;
}

const INITIAL_FORM: FormState = {
  guestName: "",
  phone: "",
  date: "",
  time: "",
  partySize: "",
};
const TODAY = new Date().toISOString().split("T")[0];

// 30-min slots from 11:00 AM to 8:30 PM
const TIME_SLOTS = (() => {
  const slots: { value: string; label: string }[] = [];
  for (let hour = 11; hour <= 20; hour++) {
    const minutes = [0, 30];
    for (const min of minutes) {
      if (hour === 20 && min > 30) break;
      const hh = String(hour).padStart(2, "0");
      const mm = String(min).padStart(2, "0");
      const value = `${hh}:${mm}`;
      const ampm = hour >= 12 ? "PM" : "AM";
      const display = hour > 12 ? hour - 12 : hour;
      const label = `${display}:${mm} ${ampm}`;
      slots.push({ value, label });
    }
  }
  return slots;
})();

const PARTY_SIZES = Array.from({ length: 20 }, (_, i) => ({
  value: String(i + 1),
  label: i === 0 ? "1 guest" : `${i + 1} guests`,
}));

function generateRef() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let ref = "DMR-";
  for (let i = 0; i < 6; i++)
    ref += chars[Math.floor(Math.random() * chars.length)];
  return ref;
}

function validateForm(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.guestName.trim()) errors.guestName = "Name is required.";
  else if (form.guestName.trim().length < 2)
    errors.guestName = "Name must be at least 2 characters.";
  if (!form.phone.trim()) errors.phone = "Phone number is required.";
  else if (!/^[0-9+\-\s]{7,15}$/.test(form.phone.trim()))
    errors.phone = "Enter a valid phone number.";
  if (!form.date) errors.date = "Please select a date.";
  else if (form.date < TODAY) errors.date = "Date cannot be in the past.";
  if (!form.time) errors.time = "Please select a time slot.";
  const size = Number(form.partySize);
  if (!form.partySize) errors.partySize = "Party size is required.";
  else if (Number.isNaN(size) || size < 1 || size > 20)
    errors.partySize = "Party size must be between 1 and 20.";
  return errors;
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p
      className="text-destructive text-xs mt-1"
      role="alert"
      data-ocid="reservations.field_error"
    >
      {msg}
    </p>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          {label}
        </p>
        <p className="text-sm text-foreground">{value}</p>
      </div>
    </div>
  );
}

export default function ReservationSection() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormState, boolean>>
  >({});
  const [booking, setBooking] = useState<BookingConfirmation | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { mutateAsync, isPending } = useCreateReservation();

  const handleBlur = (field: keyof FormState) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validateForm({ ...form }));
  };

  const handleChange = (field: keyof FormState, value: string) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    if (touched[field]) setErrors(validateForm(updated));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(
      Object.keys(INITIAL_FORM).map((k) => [k, true]),
    ) as Record<keyof FormState, boolean>;
    setTouched(allTouched);
    const errs = validateForm(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitError(null);
    try {
      await mutateAsync({
        guestName: form.guestName.trim(),
        phone: form.phone.trim(),
        date: form.date,
        time: form.time,
        partySize: BigInt(Number(form.partySize)),
      });
      setBooking({
        guestName: form.guestName.trim(),
        phone: form.phone.trim(),
        date: form.date,
        time: form.time,
        partySize: form.partySize,
        referenceNo: generateRef(),
      });
    } catch {
      setSubmitError(
        "Booking failed. Please try again or call us at 7447445253.",
      );
    }
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setTouched({});
    setBooking(null);
    setSubmitError(null);
  };

  const formatDate = (d: string) => {
    if (!d) return "";
    const dt = new Date(`${d}T00:00:00`);
    return dt.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (t: string) => {
    const slot = TIME_SLOTS.find((s) => s.value === t);
    return slot ? slot.label : t;
  };

  return (
    <section
      id="reservations"
      className="min-h-screen bg-background"
      data-ocid="reservations.section"
    >
      {/* Page Hero */}
      <div className="relative bg-card border-b border-border overflow-hidden">
        {/* Decorative background accents */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary/5 blur-2xl translate-y-1/2 -translate-x-1/3" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              variant="outline"
              className="mb-4 text-primary border-primary/40 font-semibold tracking-widest uppercase text-xs px-4 py-1"
            >
              Book a Table
            </Badge>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
              Reserve Your Table
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
              Join us at D&apos;Mora Cafe &amp; Bistro for a warm, cozy dining
              experience. Book in advance and enjoy{" "}
              <span className="text-primary font-semibold">
                10% off your bill
              </span>
              .
            </p>
          </motion.div>
          {/* Stats bar */}
          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { label: "Google Rating", value: "4.4★" },
              { label: "Zomato Rating", value: "4.0★" },
              { label: "Justdial Rating", value: "4.4★" },
              { label: "Open Daily", value: "till 9 PM" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-xl font-bold text-primary">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Left info panel */}
          <motion.div
            className="lg:col-span-2 space-y-5"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <Card className="bg-card border border-border shadow-sm overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/70 to-transparent" />
              <CardContent className="p-6 space-y-5">
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                    Visit Us
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We&apos;d love to have you at D&apos;Mora.
                  </p>
                </div>
                <div className="space-y-4">
                  <InfoRow
                    icon={MapPin}
                    label="Address"
                    value="Patil Lane, College Road, Nashik, MH 422005"
                  />
                  <InfoRow
                    icon={Clock}
                    label="Hours"
                    value="Open daily — closes at 9:00 PM"
                  />
                  <InfoRow icon={Phone} label="Phone" value="7447445253" />
                  <InfoRow
                    icon={Users}
                    label="Seating"
                    value="Indoor & Upper-level seating available"
                  />
                </div>
                <div className="pt-2 border-t border-border">
                  <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
                    <p className="text-sm font-semibold text-primary mb-1">
                      🎉 10% Off Pre-Bookings
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Book in advance and get a 10% discount on your total bill.
                      Loyalty cards also available for regular guests.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Zomato CTA */}
            <Card className="bg-card border border-border shadow-sm">
              <CardContent className="p-5">
                <p className="text-sm font-semibold text-foreground mb-1">
                  Prefer to book on Zomato?
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  We also accept reservations via Zomato. Click below to visit
                  our Zomato page.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-primary/40 text-primary hover:bg-primary/10 gap-2 transition-smooth"
                  onClick={() =>
                    window.open(
                      "https://www.zomato.com/nashik/d-mora-cafe-bistro",
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                  data-ocid="reservations.zomato_link"
                >
                  <ExternalLink className="w-4 h-4" />
                  Book on Zomato
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right: form / success */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            {booking ? (
              /* ── Success State ── */
              <Card
                className="bg-card border border-primary/30 shadow-lg"
                data-ocid="reservations.success_state"
              >
                <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/70 to-transparent" />
                <CardContent className="p-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="text-center mb-8"
                  >
                    <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto mb-5 text-4xl gold-glow">
                      🎉
                    </div>
                    <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                      Table Confirmed!
                    </h2>
                    <p className="text-muted-foreground">
                      Your reservation is confirmed. We&apos;re looking forward
                      to seeing you at D&apos;Mora!
                    </p>
                  </motion.div>

                  <div className="bg-muted/30 rounded-xl p-5 border border-border mb-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Booking Summary
                      </p>
                      <Badge
                        variant="outline"
                        className="text-primary border-primary/30 text-xs font-mono"
                      >
                        {booking.referenceNo}
                      </Badge>
                    </div>
                    <div className="h-px bg-border" />
                    {[
                      { label: "Guest Name", value: booking.guestName },
                      { label: "Phone", value: booking.phone },
                      { label: "Date", value: formatDate(booking.date) },
                      { label: "Time", value: formatTime(booking.time) },
                      {
                        label: "Party Size",
                        value: `${booking.partySize} ${Number(booking.partySize) === 1 ? "guest" : "guests"}`,
                      },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className="flex justify-between items-center text-sm"
                      >
                        <span className="text-muted-foreground">
                          {row.label}
                        </span>
                        <span className="font-semibold text-foreground">
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="button"
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"
                      onClick={() =>
                        window.open(
                          "https://www.zomato.com/nashik/d-mora-cafe-bistro",
                          "_blank",
                          "noopener,noreferrer",
                        )
                      }
                      data-ocid="reservations.zomato_view_button"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View on Zomato
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 border-border hover:border-primary/40 transition-smooth"
                      onClick={resetForm}
                      data-ocid="reservations.book_again_button"
                    >
                      Make Another Booking
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              /* ── Booking Form ── */
              <Card
                className="bg-card border border-border shadow-md"
                data-ocid="reservations.form_card"
              >
                <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/70 to-transparent" />
                <CardContent className="p-6 sm:p-8">
                  <div className="mb-6">
                    <h2 className="font-display text-2xl font-bold text-foreground mb-1">
                      Book Your Table
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Fill in the details below and we&apos;ll confirm your
                      reservation.
                    </p>
                  </div>

                  {/* Info notice */}
                  <div className="flex items-center gap-2 bg-primary/8 border border-primary/20 rounded-lg px-4 py-3 mb-6">
                    <Clock className="w-4 h-4 text-primary shrink-0" />
                    <p className="text-sm text-foreground/80">
                      <span className="font-semibold text-foreground">
                        Open 11:00 AM – 9:00 PM
                      </span>{" "}
                      — Last reservation at 8:30 PM.
                    </p>
                  </div>

                  {/* Submit error */}
                  {submitError && (
                    <div
                      className="flex items-start gap-3 bg-destructive/10 border border-destructive/30 rounded-lg px-4 py-3 mb-5"
                      data-ocid="reservations.error_state"
                    >
                      <span className="text-base shrink-0">⚠️</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-destructive font-semibold mb-0.5">
                          Booking Failed
                        </p>
                        <p className="text-xs text-destructive/80">
                          {submitError}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="shrink-0 text-destructive hover:text-destructive"
                        onClick={() => setSubmitError(null)}
                        data-ocid="reservations.dismiss_error_button"
                      >
                        Dismiss
                      </Button>
                    </div>
                  )}

                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-5"
                  >
                    {/* Name + Phone */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="res-name"
                          className="flex items-center gap-1"
                        >
                          <span>Guest Name</span>
                          <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="res-name"
                          placeholder="Priya Sharma"
                          value={form.guestName}
                          onChange={(e) =>
                            handleChange("guestName", e.target.value)
                          }
                          onBlur={() => handleBlur("guestName")}
                          aria-invalid={!!errors.guestName}
                          className="focus:border-primary focus:ring-primary/20"
                          data-ocid="reservations.name_input"
                        />
                        <FieldError
                          msg={touched.guestName ? errors.guestName : undefined}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="res-phone"
                          className="flex items-center gap-1"
                        >
                          <span>Phone Number</span>
                          <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="res-phone"
                          type="tel"
                          placeholder="9876543210"
                          value={form.phone}
                          onChange={(e) =>
                            handleChange("phone", e.target.value)
                          }
                          onBlur={() => handleBlur("phone")}
                          aria-invalid={!!errors.phone}
                          className="focus:border-primary focus:ring-primary/20"
                          data-ocid="reservations.phone_input"
                        />
                        <FieldError
                          msg={touched.phone ? errors.phone : undefined}
                        />
                      </div>
                    </div>

                    {/* Date + Time */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="res-date"
                          className="flex items-center gap-1"
                        >
                          <Calendar className="w-3.5 h-3.5 text-primary" />
                          <span>Date</span>
                          <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="res-date"
                          type="date"
                          min={TODAY}
                          value={form.date}
                          onChange={(e) => handleChange("date", e.target.value)}
                          onBlur={() => handleBlur("date")}
                          aria-invalid={!!errors.date}
                          className="focus:border-primary focus:ring-primary/20"
                          data-ocid="reservations.date_input"
                        />
                        <FieldError
                          msg={touched.date ? errors.date : undefined}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-primary" />
                          <span>Time Slot</span>
                          <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={form.time}
                          onValueChange={(v) => {
                            handleChange("time", v);
                            setTouched((t) => ({ ...t, time: true }));
                          }}
                        >
                          <SelectTrigger
                            className="focus:border-primary focus:ring-primary/20"
                            data-ocid="reservations.time_input"
                          >
                            <SelectValue placeholder="Select a time" />
                          </SelectTrigger>
                          <SelectContent>
                            {TIME_SLOTS.map((slot) => (
                              <SelectItem key={slot.value} value={slot.value}>
                                {slot.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FieldError
                          msg={touched.time ? errors.time : undefined}
                        />
                      </div>
                    </div>

                    {/* Party Size */}
                    <div className="space-y-1.5">
                      <Label className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-primary" />
                        <span>Party Size</span>
                        <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={form.partySize}
                        onValueChange={(v) => {
                          handleChange("partySize", v);
                          setTouched((t) => ({ ...t, partySize: true }));
                        }}
                      >
                        <SelectTrigger
                          className="focus:border-primary focus:ring-primary/20"
                          data-ocid="reservations.party_size_input"
                        >
                          <SelectValue placeholder="How many guests?" />
                        </SelectTrigger>
                        <SelectContent>
                          {PARTY_SIZES.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FieldError
                        msg={touched.partySize ? errors.partySize : undefined}
                      />
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth h-12 text-base font-semibold gold-glow"
                      disabled={isPending}
                      data-ocid="reservations.submit_button"
                    >
                      {isPending ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" />
                          Booking your table…
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Confirm Reservation
                        </span>
                      )}
                    </Button>
                  </form>

                  {/* Zomato note */}
                  <p className="text-xs text-muted-foreground text-center mt-5 border-t border-border pt-4">
                    Also accept reservations on Zomato —{" "}
                    <button
                      type="button"
                      className="text-primary font-semibold underline underline-offset-2 hover:opacity-80 transition-smooth"
                      onClick={() =>
                        window.open(
                          "https://www.zomato.com/nashik/d-mora-cafe-bistro",
                          "_blank",
                          "noopener,noreferrer",
                        )
                      }
                      data-ocid="reservations.zomato_note_link"
                    >
                      click here
                    </button>
                  </p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
