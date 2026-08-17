"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type BookingsByWeekdayChartProps = {
  data: { day: string; reservations: number }[];
};

export default function BookingsByWeekdayChart({ data }: BookingsByWeekdayChartProps) {
  return (
    <div className="rounded-xl border border-slate-200/50 bg-white p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800">Reservations by Weekday</h3>
        <p className="text-sm text-slate-500">All-time scheduled reservation pattern</p>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -20 }}>
            <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
            <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
            <Tooltip cursor={{ fill: "#f1f5f9" }} contentStyle={{ border: "1px solid #e2e8f0", borderRadius: "10px", boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)" }} />
            <Bar dataKey="reservations" name="Reservations" fill="#44777d" radius={[6, 6, 0, 0]} maxBarSize={48} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
