// ── Genre ──
export type Genre =
  | 'indie-rock'
  | 'electronic'
  | 'hip-hop'
  | 'folk'
  | 'jazz'
  | 'r-and-b'
  | 'pop'
  | 'metal';

export interface GenreInfo {
  id: Genre;
  label: string;
  icon: string;
  color: string;
}

// ── City ──
export interface City {
  id: string;
  name: string;
  state: string;
  shortName: string;
  activeCampaigns: number;
}

// ── Artist ──
export interface Track {
  name: string;
  duration: string;
}

export interface Artist {
  id: string;
  slug: string;
  name: string;
  genre: Genre;
  subGenres: string[];
  bio: string;
  monthlyListeners: number;
  totalPledges: number;
  showsBooked: number;
  verified: boolean;
  imageUrl: string;
  heroImageUrl: string;
  socialLinks: {
    spotify?: string;
    instagram?: string;
    twitter?: string;
    website?: string;
  };
  topTracks: Track[];
}

// ── Reward Tier ──
export interface RewardTier {
  id: string;
  name: string;
  price: number;
  description: string;
  perks: string[];
  totalSlots: number;
  claimedSlots: number;
}

// ── Venue ──
export interface Venue {
  id: string;
  slug: string;
  name: string;
  city: City;
  address: string;
  capacity: number;
  imageUrl: string;
  type: string;
  amenities: string[];
}

// ── Campaign Status ──
export type CampaignStatus =
  | 'active'
  | 'threshold_met'
  | 'confirmed'
  | 'completed'
  | 'expired';

// ── Activity Event ──
export interface ActivityEvent {
  id: string;
  type: 'pledge' | 'referral' | 'ambassador_upgrade' | 'threshold_met' | 'milestone';
  fanName: string;
  fanAvatarUrl: string;
  message: string;
  timestamp: string;
  tierName?: string;
}

// ── Campaign ──
export interface Campaign {
  id: string;
  slug: string;
  artistId: string;
  artist: Artist;
  city: City;
  venueId?: string;
  venue?: Venue;
  title: string;
  description: string;
  currentPledges: number;
  threshold: number;
  pledgeAmountTotal: number;
  startDate: string;
  endDate: string;
  showDate?: string;
  status: CampaignStatus;
  rewardTiers: RewardTier[];
  artworkUrl: string;
  gradientColors: [string, string];
  recentActivity: ActivityEvent[];
  daysRemaining: number;
  createdAt: string;
  sponsorBrandId?: string;
  sponsorBrand?: Brand;
}

// ── Ambassador Tier ──
export type AmbassadorTier = 'fan' | 'superfan' | 'ambassador' | 'champion';

// ── Pledge ──
export interface Pledge {
  id: string;
  campaignId: string;
  campaign: Campaign;
  tierName: string;
  amount: number;
  status: 'active' | 'confirmed' | 'refunded' | 'completed';
  pledgedAt: string;
}

// ── User Role ──
export type UserRole = 'fan' | 'artist' | 'brand';

// ── Brand / Sponsor ──
export type BrandCategory =
  | 'beverage'
  | 'apparel'
  | 'tech'
  | 'automotive'
  | 'lifestyle'
  | 'food'
  | 'media'
  | 'local-business';

export interface Brand {
  id: string;
  slug: string;
  name: string;
  category: BrandCategory;
  bio: string;
  logoUrl: string;
  heroImageUrl: string;
  website: string;
  contactEmail: string;
  totalSponsorships: number;
  totalEventsBooked: number;
  totalSpent: number;
  joinedAt: string;
}

export type SponsorshipTier = 'presenting' | 'supporting' | 'community';
export type SponsorshipStatus = 'pending' | 'active' | 'completed' | 'cancelled';

export interface Sponsorship {
  id: string;
  brandId: string;
  brand: Brand;
  campaignId: string;
  campaign: Campaign;
  tier: SponsorshipTier;
  amount: number;
  status: SponsorshipStatus;
  perks: string[];
  createdAt: string;
}

export type BookingStatus = 'inquiry' | 'confirmed' | 'completed' | 'cancelled';

export interface BrandBooking {
  id: string;
  brandId: string;
  brand: Brand;
  artistId: string;
  artist: Artist;
  eventName: string;
  eventDate: string;
  venueId?: string;
  venue?: Venue;
  city: City;
  budget: number;
  attendees: number;
  status: BookingStatus;
  notes: string;
  createdAt: string;
}

// ── Fan ──
export interface Fan {
  id: string;
  name: string;
  displayName: string;
  avatarUrl: string;
  city: City;
  ambassadorTier: AmbassadorTier;
  totalPledges: number;
  totalReferrals: number;
  points: number;
  joinedAt: string;
  pledges: Pledge[];
}
