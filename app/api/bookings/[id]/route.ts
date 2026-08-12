import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Context = {
  params: Promise<{
    id: string;
  }>;
};
export async function PATCH(request: Request, context: Context) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const status = body.status;

    if (status !== "Cancelled" && status !== "Confirmed") {
      return NextResponse.json(
        { error: "Please enter a valid value." },
        { status: 400 },
      );
    }

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { workspace: true },
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found." },
        { status: 404 },
      );
    }

    if (status === "Confirmed") {
      if (booking.workspace.status === "maintenance") {
        return NextResponse.json(
          { error: "The workspace is under maintenance." },
          { status: 409 },
        );
      }

      const conflictingBooking = await prisma.booking.findFirst({
        where: {
          id: { not: id },
          workspaceId: booking.workspaceId,
          date: booking.date,
          slot: booking.slot,
          status: "Confirmed",
        },
      });

      if (conflictingBooking) {
        return NextResponse.json(
          { error: "The workspace is already booked for this time slot." },
          { status: 409 },
        );
      }
    }

    const updatedBooking = await prisma.booking.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to update booking." },
      { status: 500 },
    );
  }
}
