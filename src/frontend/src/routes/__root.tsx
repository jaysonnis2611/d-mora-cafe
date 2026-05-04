import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Suspense, lazy, useState } from "react";
import { Header } from "../components/Header";
import { Layout } from "../components/Layout";

const CartDrawer = lazy(() => import("../components/CartDrawer"));

function PageLoader() {
  return (
    <div className="w-full h-64 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

function RootLayout() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <Layout>
      <Header onCartOpen={() => setCartOpen(true)} />
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
      <Suspense>
        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      </Suspense>
    </Layout>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
});
