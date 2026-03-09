import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function BrandLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-dark text-white">
      <Navbar variant="dark" />
      <main className="pt-16">{children}</main>
      <Footer variant="dark" />
    </div>
  );
}
