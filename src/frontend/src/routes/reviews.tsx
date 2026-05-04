import { createRoute } from "@tanstack/react-router";
import AppDownloadSection from "../pages/AppDownloadSection";
import Footer from "../pages/Footer";
import ReviewsSection from "../pages/ReviewsSection";
import { Route as rootRoute } from "./__root";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reviews",
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <>
      <div className="pt-16">
        <ReviewsSection />
      </div>
      <AppDownloadSection />
      <Footer />
    </>
  );
}
