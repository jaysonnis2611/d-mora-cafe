import { createRoute } from "@tanstack/react-router";
import AppDownloadSection from "../pages/AppDownloadSection";
import Footer from "../pages/Footer";
import GallerySection from "../pages/GallerySection";
import { Route as rootRoute } from "./__root";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gallery",
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <>
      <div className="pt-16">
        <GallerySection />
      </div>
      <AppDownloadSection />
      <Footer />
    </>
  );
}
