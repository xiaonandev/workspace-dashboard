import { prisma } from "@/lib/prisma";
import { BadgeCheck, CalendarCheck, MapPinCheck, Users } from "lucide-react";
import StatsGrid, { type StatItem } from "./StatsGrid";

export default async function Stats() {
  const [totalBookings, confirmedBookings, totalMembers, activeWorkspaces, totalWorkspaces] =
    await Promise.all([
      prisma.booking.count(),
      prisma.booking.count({ where: { status: "Confirmed" } }),
      prisma.member.count(),
      prisma.workspace.count({ where: { status: "active" } }),
      prisma.workspace.count(),
    ]);

  const confirmationRate =
    totalBookings === 0 ? 0 : (confirmedBookings / totalBookings) * 100;
  const maintenanceWorkspaces = totalWorkspaces - activeWorkspaces;

  const stats: StatItem[] = [
    {
      title: "Total Reservations",
      value: totalBookings.toString(),
      detail: "All-time reservations",
      progress: totalBookings === 0 ? 0 : 100,
      icon: CalendarCheck,
      color: "from-emerald-400 to-teal-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      title: "Confirmation Rate",
      value: `${confirmationRate.toFixed(0)}%`,
      detail: `${confirmedBookings} confirmed reservations`,
      progress: confirmationRate,
      icon: BadgeCheck,
      color: "from-cyan-400 to-teal-600",
      bgColor: "bg-cyan-50",
      textColor: "text-cyan-600",
    },
    {
      title: "Registered Members",
      value: totalMembers.toString(),
      detail: "Members in the workspace",
      progress: totalMembers === 0 ? 0 : 100,
      icon: Users,
      color: "from-sky-400 to-blue-600",
      bgColor: "bg-sky-50",
      textColor: "text-sky-600",
    },
    {
      title: "Active Workspaces",
      value: `${activeWorkspaces} / ${totalWorkspaces}`,
      detail: `${maintenanceWorkspaces} under maintenance`,
      progress:
        totalWorkspaces === 0 ? 0 : (activeWorkspaces / totalWorkspaces) * 100,
      icon: MapPinCheck,
      color: "from-amber-400 to-orange-500",
      bgColor: "bg-amber-50",
      textColor: "text-amber-600",
    },
  ];

  return <StatsGrid stats={stats} />;
}
