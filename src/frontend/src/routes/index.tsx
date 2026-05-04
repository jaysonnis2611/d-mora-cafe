import { createRoute } from "@tanstack/react-router";
import AppDownloadSection from "../pages/AppDownloadSection";
import Footer from "../pages/Footer";
import HeroSection from "../pages/HeroSection";
import { Route as rootRoute } from "./__root";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HeroSection />
      <AppDownloadSection />
      <Footer />
    </>
  );
}
