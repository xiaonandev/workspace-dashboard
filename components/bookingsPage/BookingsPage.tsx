"use client";

import { useState } from "react";
import BookingsFilters from "./BookingsFilters";
import BookingsTable from "./BookingsTable";

export type BookingFilters = {
  search: string;
  status: string;
  type: string;
};

export default function BookingsPage() {
  const bookings = [
    {
      id: "BK-001",
      member: "Emma Wilson",
      email: "emma@workspace.com",
      workspace: "Atlas Meeting Room",
      type: "Meeting Room",
      date: "Aug 8, 2026",
      time: "10:00 - 11:00",
      status: "Confirmed",
    },
    {
      id: "BK-002",
      member: "Daniel Kim",
      email: "daniel@workspace.com",
      workspace: "Focus Pod A",
      type: "Focus Room",
      date: "Aug 8, 2026",
      time: "14:00 - 16:00",
      status: "Confirmed",
    },
    {
      id: "BK-003",
      member: "Sophie Martin",
      email: "sophie@workspace.com",
      workspace: "Studio Space",
      type: "Event Space",
      date: "Aug 9, 2026",
      time: "09:00 - 10:00",
      status: "Cancelled",
    },
  ];
  const [filters, setFilters] = useState<BookingFilters>({
    search: "",
    status: "All status",
    type: "All types",
  });

  const handleFilterChange = (key: keyof BookingFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const filteredBookings = bookings.filter((booking) => {
    const search = filters.search.toLowerCase();

    const matchesSearch =
      booking.member.toLowerCase().includes(search) ||
      booking.workspace.toLowerCase().includes(search);

    const matchesStatus =
      filters.status === "All status" || booking.status === filters.status;

    const matchesType =
      filters.type === "All types" || booking.type === filters.type;

    return matchesSearch && matchesStatus && matchesType;
  });

  const clearFilters = () => {
    setFilters({
      search: "",
      status: "All status",
      type: "All types",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Bookings</h1>

        <p className="mt-1 text-sm text-gray-500">
          View and manage workspace reservations.
        </p>
      </div>

      <BookingsFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClear={clearFilters}
      />

      <BookingsTable bookings={filteredBookings} />
    </div>
  );
}
