import { Search } from "lucide-react";
import { BookingFilters } from "./BookingsPage";
import InteractiveButton from "../ui/InteractiveButton";

type BookingsFiltersProps = {
  filters: BookingFilters;
  onFilterChange: (key: keyof BookingFilters, value: string) => void;
  onClear: () => void;
};

const typeOptions = [
  "All types",
  "Meeting Room",
  "Focus Room",
  "Desk",
  "Event Space",
];

export default function BookingsFilters({
  filters,
  onFilterChange,
  onClear,
}: BookingsFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="relative min-w-[220px] flex-1">
        <Search
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          value={filters.search}
          onChange={(e) => onFilterChange("search", e.target.value)}
          placeholder="Search member or workspace..."
          className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm outline-none"
        />
      </div>

      <select
        value={filters.status}
        onChange={(e) => onFilterChange("status", e.target.value)}
        className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
      >
        <option>All status</option>
        <option>Confirmed</option>
        <option>Cancelled</option>
      </select>

      <select
        value={filters.type}
        onChange={(e) => onFilterChange("type", e.target.value)}
        className="rounded-lg border border-gray-200 px-3 py-2 text-sm"
      >
        {typeOptions.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <InteractiveButton onClick={onClear} name="Clear all" />
    </div>
  );
}
