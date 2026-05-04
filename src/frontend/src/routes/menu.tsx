import { createRoute } from "@tanstack/react-router";
import AppDownloadSection from "../pages/AppDownloadSection";
import Footer from "../pages/Footer";
import MenuSection from "../pages/MenuSection";
import { Route as rootRoute } from "./__root";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/menu",
  component: MenuPage,
});

function MenuPage() {
  return (
    <>
      <div className="pt-16">
        <MenuSection />
      </div>
      <AppDownloadSection />
      <Footer />
    </>
  );
}
