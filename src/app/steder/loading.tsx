import { PageSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return <PageSkeleton variant="place" count={8} />;
}
