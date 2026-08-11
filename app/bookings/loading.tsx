import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function BookingsLoading() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Loading bookings">
      <div className="flex items-start justify-between gap-5">
        <div className="space-y-2">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-5 w-52" />
        </div>
        <Skeleton className="h-10 w-40 rounded-lg" />
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <Skeleton className="h-10 min-w-55 flex-1 rounded-lg" />
        <Skeleton className="h-10 w-32 rounded-lg" />
        <Skeleton className="h-10 w-24 rounded-lg" />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow className="hover:bg-gray-50">
              {["Member", "Workspace", "Date & time", "Status", "Actions"].map(
                (heading) => (
                  <TableHead key={heading} className="px-5 py-3">
                    <Skeleton className="h-4 w-20" />
                  </TableHead>
                ),
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="size-9 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-3 w-36" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-5 py-4">
                  <Skeleton className="h-4 w-28" />
                </TableCell>
                <TableCell className="px-5 py-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </TableCell>
                <TableCell className="px-5 py-4">
                  <Skeleton className="h-6 w-20 rounded-full" />
                </TableCell>
                <TableCell className="px-5 py-4">
                  <Skeleton className="ml-auto h-8 w-20 rounded-lg" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
