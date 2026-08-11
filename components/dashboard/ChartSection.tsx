import { prisma } from "@/lib/prisma";
import BookingsByTypeChart from "./BookingsByTypeChart";
import BookingsCreatedChart from "./BookingsCreatedChart";

const TYPE_COLORS: Record<string, string> = {
  "Meeting Room": "#3b82f6",
  Desk: "#06b6d4",
  "Focus Room": "#10b981",
  "Event Space": "#f59e0b",
};

function getDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

export default async function ChartSection() {
  const firstDay = new Date();
  firstDay.setUTCDate(firstDay.getUTCDate() - 6);
  firstDay.setUTCHours(0, 0, 0, 0);

  const [recentBookings, confirmedBookings] = await Promise.all([
    prisma.booking.findMany({
      where: { createdAt: { gte: firstDay } },
      select: { createdAt: true },
    }),
    prisma.booking.findMany({
      where: { status: "Confirmed" },
      select: {
        workspace: { select: { type: true } },
      },
    }),
  ]);

  const createdCounts = new Map<string, number>();
  for (const booking of recentBookings) {
    const key = getDateKey(booking.createdAt);
    createdCounts.set(key, (createdCounts.get(key) ?? 0) + 1);
  }

  const createdData = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(firstDay);
    date.setUTCDate(firstDay.getUTCDate() + index);
    const key = getDateKey(date);

    return {
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      }),
      bookings: createdCounts.get(key) ?? 0,
    };
  });

  const typeCounts = new Map<string, number>();
  for (const booking of confirmedBookings) {
    const type = booking.workspace.type;
    typeCounts.set(type, (typeCounts.get(type) ?? 0) + 1);
  }

  const typeData = Object.entries(TYPE_COLORS).map(([name, color]) => ({
    name,
    value: typeCounts.get(name) ?? 0,
    color,
  }));

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <div className="xl:col-span-2">
        <BookingsCreatedChart data={createdData} />
      </div>
      <BookingsByTypeChart data={typeData} />
    </div>
  );
}
