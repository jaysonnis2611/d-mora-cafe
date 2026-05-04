import { CartProvider } from "../contexts/CartContext";
import { UserProvider } from "../contexts/UserContext";
import { SignUpModal } from "./SignUpModal";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <UserProvider>
      <CartProvider>
        <div className="dark min-h-screen bg-background text-foreground">
          <SignUpModal />
          {children}
        </div>
      </CartProvider>
    </UserProvider>
  );
}
