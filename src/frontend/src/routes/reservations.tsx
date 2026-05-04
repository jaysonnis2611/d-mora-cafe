import { createRoute } from "@tanstack/react-router";
import AppDownloadSection from "../pages/AppDownloadSection";
import Footer from "../pages/Footer";
import ReservationSection from "../pages/ReservationSection";
import { Route as rootRoute } from "./__root";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reservations",
  component: ReservationsPage,
});

function ReservationsPage() {
  return (
    <div className="pt-16">
      <ReservationSection />
      <AppDownloadSection />
      <Footer />
    </div>
  );
}
