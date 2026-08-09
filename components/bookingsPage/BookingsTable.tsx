import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Member, Workspace } from "@prisma/client";
import { CalendarDays, Clock, MapPin, User } from "lucide-react";
import BookingStatusButton from "./BookingStatusButton";

type Booking = {
  member: Member;
  workspace: Workspace;
  id: string;
  date: Date;
  slot: string;
  status: string;
};

type Bookings = {
  bookings: Booking[];
};
const BookingsTable = ({ bookings }: Bookings) => {
  if (bookings.length === 0) {
    return <p>Nothing found. Try adjusting your filters.</p>;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <Table className="text-left">
        <TableHeader className="bg-gray-50 text-xs uppercase text-gray-500">
          <TableRow className="hover:bg-gray-50">
            <TableHead className="px-5 py-3">Member</TableHead>
            <TableHead className="px-5 py-3">Workspace</TableHead>
            <TableHead className="px-5 py-3">Date & time</TableHead>
            <TableHead className="px-5 py-3">Status</TableHead>
            <TableHead className="px-5 py-3">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
                    <User size={16} className="text-gray-500" />
                  </div>

                  <div>
                    <p className="font-medium text-gray-900">
                      {booking.member.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {booking.member.email}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="px-5 py-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin size={15} className="text-gray-400" />
                  {booking.workspace.name}
                </div>
              </TableCell>
              <TableCell className="px-5 py-4">
                <div className="space-y-1 text-gray-600">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={15} />
                    <div>{new Date(booking.date).toLocaleDateString()}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock size={15} />
                    {booking.slot}
                  </div>
                </div>
              </TableCell>
              <TableCell className="px-5 py-4">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    booking.status === "Confirmed"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {booking.status}
                </span>
              </TableCell>
              <TableCell className="px-5 py-4">
                <div className="flex justify-end gap-2">
                  <BookingStatusButton
                    id={booking.id}
                    status={booking.status}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingsTable;
