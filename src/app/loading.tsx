import { PageSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return <PageSkeleton variant="event" count={12} />;
}
