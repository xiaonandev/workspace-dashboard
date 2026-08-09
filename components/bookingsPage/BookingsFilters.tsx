"use client";
import { Search } from "lucide-react";
import InteractiveButton from "../ui/InteractiveButton";
import Filters from "../ui/Filter";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

export default function BookingsFilters() {
  const statusOptions = [
    { value: "All status", label: "All status" },
    { value: "Confirmed", label: "Confirmed" },
    { value: "Cancelled", label: "Cancelled" },
  ];
  const params = useSearchParams();
  const router = useRouter();
  const searchParam = params.get("search") ?? "";
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOnChange = (key: string, value: string) => {
    const newParams = new URLSearchParams(params.toString());

    if (!value || value === "All status") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    const query = newParams.toString();

    router.push(query ? `/bookings?${query}` : "/bookings");
  };
  const handleSearchChange = (value: string) => {
    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }
    searchTimer.current = setTimeout(() => {
      const newParams = new URLSearchParams(window.location.search);

      if (value.trim()) {
        newParams.set("search", value.trim());
      } else {
        newParams.delete("search");
      }

      const query = newParams.toString();
      router.replace(query ? `/bookings?${query}` : "/bookings");
    }, 300);
  };
  const clearFilters = () => {
    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }
    router.push("/bookings");
  };
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="relative min-w-55 flex-1">
        <Search
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          key={searchParam}
          defaultValue={searchParam}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search member or workspace..."
          className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm outline-none"
        />
      </div>
      <Filters
        options={statusOptions}
        value={params.get("status") || "All status"}
        onChange={(val) => handleOnChange("status", val)}
      />
      <InteractiveButton onClick={clearFilters} name="Clear all" />
    </div>
  );
}
