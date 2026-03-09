import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function SharedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-light text-text-dark">
      <Navbar variant="light" />
      <main className="pt-16">{children}</main>
      <Footer variant="light" />
    </div>
  );
}
