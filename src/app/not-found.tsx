import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-dark flex items-center justify-center">
      <div className="text-center px-4">
        <p className="font-display text-8xl font-extrabold text-btb-yellow">404</p>
        <h1 className="font-display text-3xl font-bold text-white uppercase tracking-wide mt-4">
          Page Not Found
        </h1>
        <p className="text-text-secondary mt-2 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist. Maybe the campaign ended, or maybe it hasn&apos;t started yet.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href="/">
            <Button variant="primary" size="lg">
              Go Home
            </Button>
          </Link>
          <Link href="/discover">
            <Button variant="outline" size="lg">
              Discover Campaigns
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
