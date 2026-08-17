import BookingsFilters from "@/components/bookingsPage/BookingsFilters";
import BookingsTable from "@/components/bookingsPage/BookingsTable";
import CreateBooking from "@/components/bookingsPage/CreateBooking";
import PageHeader from "@/components/layout/PageHeader";
import { prisma } from "@/lib/prisma";
type Props = {
  searchParams: Promise<{
    search?: string;
    status?: string;
  }>;
};
const page = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const bookingRecords = await prisma.booking.findMany({
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
    },
    include: {
      workspace: true,
      member: true,
    },
    orderBy: {
      date: "asc",
    },
  });
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const bookings = bookingRecords
    .map((booking) => {
      const bookingDate = new Date(booking.date);
      bookingDate.setUTCHours(0, 0, 0, 0);
      const isExpired = bookingDate < today;

      return {
        ...booking,
        isExpired,
        status: isExpired ? "Cancelled" : booking.status,
      };
    })
    .filter(
      (booking) => !params.status || booking.status === params.status,
    )
    .sort((a, b) => {
      if (a.isExpired !== b.isExpired) {
        return a.isExpired ? 1 : -1;
      }

      return a.date.getTime() - b.date.getTime();
    });
  const members = await prisma.member.findMany();
  const workspaces = await prisma.workspace.findMany();

  return (
    <div>
      <div className="space-y-4">
        <div className="flex gap-5">
          <PageHeader
            title="Bookings"
            description=" View and manage reservations."
          />
          <CreateBooking workspaces={workspaces} members={members} />
        </div>

        <BookingsFilters />

        <BookingsTable bookings={bookings} />
      </div>
    </div>
  );
};

export default page;
