import type { LucideIcon } from "lucide-react";

export type StatItem = {
  title: string;
  value: string;
  detail: string;
  progress: number;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  textColor: string;
};

type StatsGridProps = {
  stats: StatItem[];
};

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => (
        <div
          className="group rounded-xl border border-slate-200/50 bg-white/80 p-6 backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/20"
          key={stat.title}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="mb-2 text-sm font-medium text-slate-600">
                {stat.title}
              </p>
              <p className="mb-3 text-3xl font-bold text-slate-800">
                {stat.value}
              </p>
              <p className="text-sm text-slate-500">{stat.detail}</p>
            </div>

            <div
              className={`rounded-xl p-3 transition-transform duration-200 group-hover:scale-110 ${stat.bgColor}`}
            >
              <stat.icon className={`size-6 ${stat.textColor}`} />
            </div>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full bg-linear-to-r ${stat.color}`}
              style={{
                width: `${Math.min(100, Math.max(0, stat.progress))}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
