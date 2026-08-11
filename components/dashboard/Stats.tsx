import { prisma } from "@/lib/prisma";
import { CalendarCheck, CalendarDays, MapPinCheck } from "lucide-react";
import StatsGrid, { type StatItem } from "./StatsGrid";

const SLOTS_PER_DAY = 7;

function getDayRange(daysFromToday: number) {
  const start = new Date();
  start.setDate(start.getDate() + daysFromToday);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

export default async function Stats() {
  const today = getDayRange(0);
  const yesterday = getDayRange(-1);
  const tomorrow = getDayRange(1);

  const [
    createdToday,
    createdYesterday,
    activeWorkspaces,
    totalWorkspaces,
    confirmedTomorrow,
  ] = await Promise.all([
    prisma.booking.count({
      where: { createdAt: { gte: today.start, lte: today.end } },
    }),
    prisma.booking.count({
      where: { createdAt: { gte: yesterday.start, lte: yesterday.end } },
    }),
    prisma.workspace.count({ where: { status: "active" } }),
    prisma.workspace.count(),
    prisma.booking.count({
      where: {
        date: { gte: tomorrow.start, lte: tomorrow.end },
        status: "Confirmed",
        workspace: { status: "active" },
      },
    }),
  ]);

  const totalTomorrowSlots = activeWorkspaces * SLOTS_PER_DAY;
  const availableTomorrow = Math.max(
    0,
    totalTomorrowSlots - confirmedTomorrow,
  );
  const maintenanceWorkspaces = totalWorkspaces - activeWorkspaces;

  const stats: StatItem[] = [
    {
      title: "Bookings Created Today",
      value: createdToday.toString(),
      detail: `${createdYesterday} created yesterday`,
      progress: Math.min(100, createdToday * 10),
      icon: CalendarCheck,
      color: "from-emerald-400 to-teal-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      title: "Available Slots Tomorrow",
      value: `${availableTomorrow} / ${totalTomorrowSlots}`,
      detail: `${confirmedTomorrow} already booked`,
      progress:
        totalTomorrowSlots === 0
          ? 0
          : (availableTomorrow / totalTomorrowSlots) * 100,
      icon: CalendarDays,
      color: "from-cyan-400 to-teal-600",
      bgColor: "bg-cyan-50",
      textColor: "text-cyan-600",
    },
    {
      title: "Active Workspaces",
      value: `${activeWorkspaces} / ${totalWorkspaces}`,
      detail: `${maintenanceWorkspaces} under maintenance`,
      progress:
        totalWorkspaces === 0 ? 0 : (activeWorkspaces / totalWorkspaces) * 100,
      icon: MapPinCheck,
      color: "from-violet-400 to-indigo-600",
      bgColor: "bg-violet-50",
      textColor: "text-violet-600",
    },
  ];

  return <StatsGrid stats={stats} />;
}
