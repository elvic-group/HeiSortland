// ---------------------------------------------------------------------------
// Skeleton components — dark, subtle, premium loading placeholders
// matching the HeiSortland card shapes and navy/warm palette.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Shared primitives
// ---------------------------------------------------------------------------

function ShimmerBlock({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse bg-navy/5 rounded-none ${className}`}
      aria-hidden="true"
    />
  );
}

function ShimmerLine({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse bg-navy/5 rounded-none ${className}`}
      aria-hidden="true"
    />
  );
}

// ---------------------------------------------------------------------------
// 1. SkeletonCard — matches EventCard shape
// ---------------------------------------------------------------------------

export function SkeletonCard() {
  return (
    <div
      className="border border-navy/5 bg-white rounded-none"
      aria-hidden="true"
    >
      {/* Image area — h-48 matches the specified skeleton image height */}
      <div className="relative h-48 overflow-hidden bg-navy/5 animate-pulse rounded-none">
        {/* Subtle inner gradient zone to suggest depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/10 via-transparent to-transparent" />
      </div>

      {/* Content area — mirrors EventCard p-5 spacing */}
      <div className="p-5 space-y-3">
        {/* Date / time row */}
        <ShimmerLine className="h-3 w-1/3" />

        {/* Title — two lines mimicking font-serif text-xl */}
        <div className="space-y-2">
          <ShimmerLine className="h-5 w-3/4" />
          <ShimmerLine className="h-5 w-1/2" />
        </div>

        {/* Description — two shorter lines */}
        <div className="space-y-1.5">
          <ShimmerLine className="h-3 w-full" />
          <ShimmerLine className="h-3 w-2/3" />
        </div>

        {/* Location */}
        <ShimmerLine className="h-3 w-2/5" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 2. SkeletonCategoryCard — matches CategoryCard shape
// ---------------------------------------------------------------------------

export function SkeletonCategoryCard() {
  return (
    <div
      className="border border-navy/5 bg-white rounded-none"
      aria-hidden="true"
    >
      {/* Image area — h-32 matches CategoryCard */}
      <div className="relative h-32 overflow-hidden bg-navy/5 animate-pulse rounded-none">
        <div className="absolute inset-0 bg-gradient-to-t from-navy/10 via-navy/5 to-transparent" />
        {/* Accent line at bottom-left — matches the real card's decorative line */}
        <div className="absolute left-4 bottom-4 h-px w-10 bg-navy/10" />
      </div>

      {/* Content area */}
      <div className="p-5 space-y-3">
        {/* Title — font-serif text-xl */}
        <ShimmerLine className="h-5 w-3/5" />

        {/* Description — two lines */}
        <div className="space-y-1.5">
          <ShimmerLine className="h-3 w-full" />
          <ShimmerLine className="h-3 w-4/5" />
        </div>

        {/* Count — text-xs font-mono style */}
        <ShimmerLine className="h-3 w-1/3" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 3. SkeletonPlaceCard — matches PlaceCard shape
// ---------------------------------------------------------------------------

export function SkeletonPlaceCard() {
  return (
    <div
      className="border border-navy/5 bg-white rounded-none"
      aria-hidden="true"
    >
      {/* Image area — h-40 matches PlaceCard */}
      <div className="relative h-40 overflow-hidden bg-navy/5 animate-pulse rounded-none">
        <div className="absolute inset-0 bg-gradient-to-t from-navy/10 via-transparent to-transparent" />
        {/* Type label area */}
        <div className="absolute bottom-4 left-5">
          <ShimmerLine className="h-3 w-16" />
        </div>
      </div>

      {/* Content area */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <ShimmerLine className="h-5 w-2/3" />

        {/* Description — two lines */}
        <div className="space-y-1.5">
          <ShimmerLine className="h-3 w-full" />
          <ShimmerLine className="h-3 w-3/4" />
        </div>

        {/* Address row */}
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 shrink-0 bg-navy/5 animate-pulse rounded-none" />
          <ShimmerLine className="h-3 w-1/2" />
        </div>

        {/* Phone row */}
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 shrink-0 bg-navy/5 animate-pulse rounded-none" />
          <ShimmerLine className="h-3 w-1/3" />
        </div>

        {/* Divider + link row */}
        <div className="pt-3 border-t border-navy/5 flex gap-4">
          <ShimmerLine className="h-3 w-16" />
          <ShimmerLine className="h-3 w-10" />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 4. SkeletonGrid — renders a responsive grid of skeleton cards
// ---------------------------------------------------------------------------

interface SkeletonGridProps {
  count: number;
  variant: "event" | "category" | "place";
}

export function SkeletonGrid({ count, variant }: SkeletonGridProps) {
  const SkeletonComponent =
    variant === "category"
      ? SkeletonCategoryCard
      : variant === "place"
        ? SkeletonPlaceCard
        : SkeletonCard;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// 5. PageSkeleton — full-page loading fallback (header + grid)
// ---------------------------------------------------------------------------

export function PageSkeleton({
  variant = "event",
  count = 8,
}: {
  variant?: "event" | "category" | "place";
  count?: number;
}) {
  return (
    <div className="min-h-screen bg-warm" aria-busy="true" aria-label="Laster innhold">
      {/* Compact header skeleton */}
      <div className="border-b border-navy/5 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
          {/* Page title */}
          <ShimmerLine className="h-8 w-1/3" />
          {/* Subtitle / description */}
          <ShimmerLine className="h-4 w-2/5" />
          {/* Filter / search bar hint */}
          <div className="flex gap-3 pt-2">
            <ShimmerBlock className="h-9 w-24" />
            <ShimmerBlock className="h-9 w-24" />
            <ShimmerBlock className="h-9 w-20" />
          </div>
        </div>
      </div>

      {/* Grid of skeleton cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <SkeletonGrid count={count} variant={variant} />
      </div>
    </div>
  );
}
