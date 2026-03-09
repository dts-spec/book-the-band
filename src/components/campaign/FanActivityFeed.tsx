import { cn } from "@/lib/utils";
import type { ActivityEvent } from "@/types";
import { formatRelativeTime } from "@/lib/formatters";
import Avatar from "@/components/ui/Avatar";

interface FanActivityFeedProps {
  activities: ActivityEvent[];
  maxItems?: number;
  className?: string;
}

function getActivityIcon(type: ActivityEvent["type"]): string {
  switch (type) {
    case "pledge":
      return "🎫";
    case "referral":
      return "🔗";
    case "ambassador_upgrade":
      return "⭐";
    case "threshold_met":
      return "🎉";
    case "milestone":
      return "🏆";
    default:
      return "📣";
  }
}

export default function FanActivityFeed({
  activities,
  maxItems = 8,
  className,
}: FanActivityFeedProps) {
  const items = activities.slice(0, maxItems);

  return (
    <div className={cn("space-y-0", className)}>
      {items.map((activity) => (
        <div
          key={activity.id}
          className="flex items-center gap-3 px-4 py-3 border-b border-border-dark last:border-0 hover:bg-surface-hover/50 transition-colors"
        >
          <Avatar src={activity.fanAvatarUrl} alt={activity.fanName} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white truncate">
              <span className="mr-1.5">{getActivityIcon(activity.type)}</span>
              {activity.message}
            </p>
          </div>
          <span className="text-xs text-text-muted whitespace-nowrap flex-shrink-0">
            {formatRelativeTime(activity.timestamp)}
          </span>
        </div>
      ))}
    </div>
  );
}
