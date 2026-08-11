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
