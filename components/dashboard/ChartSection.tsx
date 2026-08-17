import { prisma } from "@/lib/prisma";
import { WORKSPACE_TYPE_COLORS } from "@/lib/constants";
import BookingsByTypeChart from "./BookingsByTypeChart";
import BookingsByWeekdayChart from "./BookingsByWeekdayChart";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const displayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default async function ChartSection() {
  const [allBookings, confirmedBookings] = await Promise.all([
    prisma.booking.findMany({ select: { date: true } }),
    prisma.booking.findMany({
      where: { status: "Confirmed" },
      select: { workspace: { select: { type: true } } },
    }),
  ]);

  const weekdayCounts = new Map<string, number>();
  for (const booking of allBookings) {
    const day = weekdays[booking.date.getUTCDay()];
    weekdayCounts.set(day, (weekdayCounts.get(day) ?? 0) + 1);
  }

  const weekdayData = displayOrder.map((day) => ({
    day,
    reservations: weekdayCounts.get(day) ?? 0,
  }));

  const typeCounts = new Map<string, number>();
  for (const booking of confirmedBookings) {
    const type = booking.workspace.type;
    typeCounts.set(type, (typeCounts.get(type) ?? 0) + 1);
  }

  const typeData = Object.entries(WORKSPACE_TYPE_COLORS).map(([name, color]) => ({
    name,
    value: typeCounts.get(name) ?? 0,
    color,
  }));

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
      <div className="xl:col-span-2"><BookingsByWeekdayChart data={weekdayData} /></div>
      <BookingsByTypeChart data={typeData} />
    </div>
  );
}
