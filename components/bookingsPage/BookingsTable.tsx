import { CalendarDays, Clock, MapPin, User } from "lucide-react";

type Booking = {
  id: string;
  member: string;
  email: string;
  workspace: string;
  date: string;
  time: string;
  status: string;
};

type Bookings = {
  bookings: Booking[];
};
const BookingsTable = ({ bookings }: Bookings) => {
  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-5 py-3 font-medium">Member</th>
                <th className="px-5 py-3 font-medium">Workspace</th>
                <th className="px-5 py-3 font-medium">Date & time</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {bookings.map((booking) => (
                <tr key={booking.id} className="transition hover:bg-gray-50">
                  {" "}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
                        <User size={16} className="text-gray-500" />
                      </div>

                      <div>
                        <p className="font-medium text-gray-900">
                          {booking.member}
                        </p>
                        <p className="text-xs text-gray-500">{booking.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin size={15} className="text-gray-400" />
                      {booking.workspace}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="space-y-1 text-gray-600">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={15} />
                        {booking.date}
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock size={15} />
                        {booking.time}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        booking.status === "Confirmed"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">
                        View
                      </button>

                      {booking.status !== "Cancelled" && (
                        <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50">
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingsTable;
