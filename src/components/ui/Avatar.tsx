import { cn } from "@/lib/utils";

type AvatarSize = "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  src: string;
  alt: string;
  size?: AvatarSize;
  className?: string;
  ring?: boolean;
}

const sizeStyles: Record<AvatarSize, string> = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-14 h-14",
  xl: "w-20 h-20",
};

export default function Avatar({
  src,
  alt,
  size = "md",
  ring = false,
  className,
}: AvatarProps) {
  return (
    <div
      className={cn(
        "rounded-full overflow-hidden bg-surface-hover flex-shrink-0",
        sizeStyles[size],
        ring && "ring-2 ring-btb-yellow ring-offset-2 ring-offset-surface-dark",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
}
