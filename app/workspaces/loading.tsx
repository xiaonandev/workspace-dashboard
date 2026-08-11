import { Skeleton } from "@/components/ui/skeleton";

function WorkspaceCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <Skeleton className="h-48 w-full rounded-none" />

      <div className="p-4">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="mt-3 h-4 w-28" />

        <div className="mt-4 flex items-center gap-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="size-4" />
          <Skeleton className="size-4" />
          <Skeleton className="size-4" />
        </div>

        <div className="mt-5 flex items-center justify-between">
          <Skeleton className="h-5 w-20" />
          <div className="flex gap-2">
            <Skeleton className="h-9 w-16 rounded-lg" />
            <Skeleton className="h-9 w-16 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WorkspacesLoading() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Loading workspaces">
      <div className="space-y-2">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-5 w-56" />
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <Skeleton className="h-10 min-w-50 flex-1 rounded-lg" />
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-32 rounded-lg" />
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <WorkspaceCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
