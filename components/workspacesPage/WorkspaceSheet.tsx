import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Calendar, Clock, User, Users } from "lucide-react";
import type { Workspace } from "@/lib/generated/prisma/browser";
import type { UpcomingBooking } from "./WorkspaceGrid";

export type WorkspaceSheetProps = {
  workspace: Workspace;
  bookings: UpcomingBooking[];
};

function WorkspaceSheet({ workspace, bookings }: WorkspaceSheetProps) {
  const { name, image, capacity, location } = workspace;
  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer rounded-lg bg-[#44777d] px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800">
        View
      </SheetTrigger>

      <SheetContent showCloseButton={false} side="right">
        <SheetHeader>
          <SheetTitle>Workspace details</SheetTitle>
          <SheetDescription>
            View workspace information and upcoming bookings.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 p-4">
          <div>
            <div className="relative h-44 overflow-hidden rounded-xl">
              <Image src={image} alt={name} fill className="object-cover" />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-gray-900">{name}</h3>

            <p className="mt-1 text-sm text-gray-500">{location}</p>

            <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
              <Users size={16} />
              <span>Up to {capacity} people</span>
            </div>
          </div>

          <div className="border-t pt-5">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="font-semibold text-gray-900">Upcoming bookings</h4>

              <span className="text-sm text-gray-500">
                {bookings.length} bookings
              </span>
            </div>

            <div className="space-y-3">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-lg border border-gray-200 p-3"
                >
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                    <User size={15} />
                    {booking.member.name}
                  </div>

                  <div className="mt-2 flex gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {booking.date.toLocaleDateString()}
                    </div>

                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {booking.slot}
                    </div>
                  </div>
                </div>
              ))}
              {bookings.length === 0 && (
                <div className="rounded-lg border border-dashed border-gray-200 px-4 py-6 text-center text-sm text-gray-500">
                  No upcoming bookings.
                </div>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default WorkspaceSheet;
