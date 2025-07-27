import { Skeleton } from "@/components/ui/skeleton";

const CardSkeleton = () => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border shadow-sm border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition hover:shadow-md hover:-translate-y-1 duration-300">
      {/* Cover image */}
      <Skeleton className="h-48 w-full rounded-t-2xl" />

      <div className="p-4 space-y-3">
        {/* Category pill */}
        <Skeleton className="h-5 w-24 rounded-full" />

        {/* Title */}
        <Skeleton className="h-6 w-3/4 rounded-md" />

        {/* Description lines */}
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-5/6 rounded-md" />

        {/* Author section */}
        <div className="flex items-center gap-3 pt-4">
          <Skeleton className="h-9 w-9 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-3 w-24 rounded-md" />
            <Skeleton className="h-3 w-16 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
