"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import Filters from "../features/common/Filter";
import InteractiveButton from "../features/common/InteractiveButton";

const defaultValues: Record<string, string> = {
  type: "All types",
  location: "All locations",
  capacity: "All capacity",
  status: "All status",
};

const WorkspaceFilters = () => {
  const typeOptions = [
    { value: "All types", label: "All types" },
    { value: "Meeting Room", label: "Meeting Room" },
    { value: "Focus Room", label: "Focus Room" },
    { value: "Desk", label: "Desk" },
    { value: "Event Space", label: "Event Space" },
  ];

  const locationOptions = [
    { value: "All locations", label: "All locations" },
    { value: "Floor 1", label: "Floor 1" },
    { value: "Floor 2", label: "Floor 2" },
    { value: "Floor 3", label: "Floor 3" },
  ];

  const capacityOptions = [
    { value: "All capacity", label: "All capacity" },
    { value: "1", label: "1+ person" },
    { value: "4", label: "4+ people" },
    { value: "8", label: "8+ people" },
  ];

  const statusOptions = [
    { value: "All status", label: "All status" },
    { value: "active", label: "Active" },
    { value: "maintenance", label: "Maintenance" },
  ];
  const router = useRouter();
  const params = useSearchParams();
  const searchParam = params.get("search") ?? "";
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOnChange = (key: string, value: string) => {
    const newParams = new URLSearchParams(params.toString());

    if (!value || defaultValues[key] === value) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    const query = newParams.toString();
    router.push(query ? `/workspaces?${query}` : "/workspaces");
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
      router.replace(query ? `/workspaces?${query}` : "/workspaces");
    }, 300);
  };

  const clearFilters = () => {
    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }
    router.push("/workspaces");
  };

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <input
        key={searchParam}
        type="text"
        placeholder="Search by name or location..."
        defaultValue={searchParam}
        onChange={(e) => handleSearchChange(e.target.value)}
        className="min-w-50 flex-1 rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none"
      />
      <Filters
        options={typeOptions}
        value={params.get("type") || "All types"}
        onChange={(val) => handleOnChange("type", val)}
      />
      <Filters
        options={locationOptions}
        value={params.get("location") || "All locations"}
        onChange={(val) => handleOnChange("location", val)}
      />
      <Filters
        options={capacityOptions}
        value={params.get("capacity") || "All capacity"}
        onChange={(val) => handleOnChange("capacity", val)}
      />
      <Filters
        options={statusOptions}
        value={params.get("status") || "All status"}
        onChange={(val) => handleOnChange("status", val)}
      />

      <InteractiveButton onClick={clearFilters} name="Clear all" />
    </div>
  );
};
export default WorkspaceFilters;
