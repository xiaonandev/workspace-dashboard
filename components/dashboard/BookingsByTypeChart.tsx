"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type TypeData = {
  name: string;
  value: number;
  color: string;
};

type BookingsByTypeChartProps = {
  data: TypeData[];
};

export default function BookingsByTypeChart({
  data,
}: BookingsByTypeChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="rounded-xl border border-slate-200/50 bg-white p-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-800">
          Bookings by Space Type
        </h3>
        <p className="text-sm text-slate-500">Confirmed booking distribution</p>
      </div>

      <div className="h-48">
        {total === 0 ? (
          <div className="grid h-full place-items-center text-sm text-slate-500">
            No confirmed bookings yet
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={78}
                paddingAngle={3}
              >
                {data.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="space-y-3">
        {data.map((item) => {
          const percentage = total === 0 ? 0 : (item.value / total) * 100;

          return (
            <div className="flex items-center justify-between" key={item.name}>
              <div className="flex items-center gap-3">
                <span
                  className="size-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-slate-600">{item.name}</span>
              </div>
              <span className="text-sm font-semibold text-slate-700">
                {item.value} ({percentage.toFixed(0)}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
