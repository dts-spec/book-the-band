"use client";

import { getCurrentBrand } from "@/data/brands";
import { getSponsorshipsByBrand } from "@/data/sponsorships";
import { getBookingsByBrand } from "@/data/brand-bookings";
import { formatCurrency, formatNumber, formatDate } from "@/lib/formatters";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function BrandDashboardPage() {
  const brand = getCurrentBrand();
  const sponsorships = getSponsorshipsByBrand(brand.id);
  const bookings = getBookingsByBrand(brand.id);

  const activeSponsorships = sponsorships.filter((s) => s.status === "active");
  const audienceReached = Math.round(
    sponsorships.reduce((sum, s) => sum + s.campaign.currentPledges * 2.5, 0)
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={brand.logoUrl}
              alt={brand.name}
              className="w-14 h-14 rounded-xl object-cover"
            />
            <div>
              <h1 className="font-display text-3xl font-bold text-white uppercase tracking-wide">
                Brand Dashboard
              </h1>
              <p className="text-text-secondary">{brand.name}</p>
            </div>
          </div>
          <Link href="/brand-discover">
            <Button variant="primary" size="md">
              Sponsor a Campaign
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Active Sponsorships", value: String(activeSponsorships.length), color: "text-btb-yellow" },
            { label: "Total Invested", value: formatCurrency(brand.totalSpent), color: "text-success" },
            { label: "Events Booked", value: String(bookings.length), color: "text-white" },
            { label: "Audience Reached", value: formatNumber(audienceReached), color: "text-btb-yellow" },
          ].map((stat) => (
            <Card key={stat.label} variant="dark" padding="lg">
              <p className={`text-2xl font-bold font-display ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-text-muted mt-1">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Active Sponsorships Table */}
        <div className="bg-surface-elevated border border-border-dark rounded-xl overflow-hidden mb-8">
          <div className="px-5 py-4 border-b border-border-dark">
            <h2 className="font-display text-lg font-bold text-white uppercase tracking-wide">
              Active Sponsorships
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-dark">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide">Campaign</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide">Artist</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide">City</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide">Tier</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide">Amount</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide">Status</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {sponsorships.map((sponsorship) => (
                  <tr key={sponsorship.id} className="border-b border-border-dark last:border-0 hover:bg-surface-hover/50 transition-colors">
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-white">{sponsorship.campaign.title}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-text-secondary">
                      {sponsorship.campaign.artist.name}
                    </td>
                    <td className="px-5 py-4 text-sm text-text-secondary">
                      {sponsorship.campaign.city.name}
                    </td>
                    <td className="px-5 py-4">
                      <Badge
                        variant={
                          sponsorship.tier === "presenting" ? "yellow" :
                          sponsorship.tier === "supporting" ? "warning" : "success"
                        }
                      >
                        {sponsorship.tier}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-sm text-success font-medium">
                      {formatCurrency(sponsorship.amount)}
                    </td>
                    <td className="px-5 py-4">
                      <Badge
                        variant={sponsorship.status === "active" ? "success" : "default"}
                        dot
                      >
                        {sponsorship.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-4">
                      <Link href={`/sponsor/${sponsorship.campaign.slug}`}>
                        <Button variant="ghost" size="sm">View</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Bookings */}
        <div className="bg-surface-elevated border border-border-dark rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border-dark">
            <h2 className="font-display text-lg font-bold text-white uppercase tracking-wide">
              Upcoming Bookings
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
            {bookings.map((booking) => (
              <Card key={booking.id} variant="dark" padding="lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-display text-base font-bold text-white uppercase tracking-wide">
                      {booking.eventName}
                    </h3>
                    <p className="text-sm text-text-secondary mt-1">
                      {booking.artist.name}
                    </p>
                  </div>
                  <Badge
                    variant={
                      booking.status === "confirmed" ? "success" :
                      booking.status === "completed" ? "info" :
                      booking.status === "inquiry" ? "yellow" : "error"
                    }
                    dot
                  >
                    {booking.status}
                  </Badge>
                </div>
                <div className="space-y-1.5 text-sm text-text-muted">
                  <p>Date: <span className="text-white">{formatDate(booking.eventDate)}</span></p>
                  <p>Venue: <span className="text-white">{booking.venue?.name ?? "TBD"}</span></p>
                  <p>Budget: <span className="text-success">{formatCurrency(booking.budget)}</span></p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
