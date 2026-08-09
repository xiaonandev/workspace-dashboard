import BookingsFilters from "@/components/bookingsPage/BookingsFilters";
import BookingsTable from "@/components/bookingsPage/BookingsTable";
import { prisma } from "@/lib/prisma";
type Props = {
  searchParams: Promise<{
    search?: string;
    status?: string;
  }>;
};
const page = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const bookings = await prisma.booking.findMany({
    where: {
      OR: params.search
        ? [
            {
              workspace: {
                name: {
                  contains: params.search,
                  mode: "insensitive",
                },
              },
            },
            {
              member: {
                name: {
                  contains: params.search,
                  mode: "insensitive",
                },
              },
            },
          ]
        : undefined,

      status: params.status || undefined,
    },
    include: {
      workspace: true,
      member: true,
    },
    orderBy: {
      date: "asc",
    },
  });

  return (
    <div>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Bookings</h1>

          <p className="mt-1 text-sm text-gray-500">
            View and manage workspace reservations.
          </p>
        </div>

        <BookingsFilters />

        <BookingsTable bookings={bookings} />
      </div>
    </div>
  );
};

export default page;
