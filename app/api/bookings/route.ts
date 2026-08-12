import { prisma } from "@/lib/prisma";
import { BOOKING_SLOTS } from "@/lib/constants";
import { NextResponse } from "next/server";
import z from "zod";

const isTodayOrLater = (date: Date) => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  return date >= todayStart;
};

const CreateBookingSchema = z.object({
  date: z.coerce.date().refine(isTodayOrLater, {
    message: "Please select today or a later date.",
  }),
  slot: z.enum(BOOKING_SLOTS),
  workspaceId: z.string().min(1, "Please select a workspace."),
  memberId: z.string().min(1, "Please select a member."),
});
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = CreateBookingSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error.issues[0]?.message ?? "Invalid input data.",
          details: z.flattenError(validation.error),
        },
        { status: 400 },
      );
    }

    const bookingData = validation.data;

    const [workspace, member] = await Promise.all([
      prisma.workspace.findUnique({ where: { id: bookingData.workspaceId } }),
      prisma.member.findUnique({ where: { id: bookingData.memberId } }),
    ]);

    if (!workspace || !member) {
      return NextResponse.json(
        { error: "Invalid workspace or member." },
        { status: 400 },
      );
    }

    if (workspace.status === "maintenance") {
      return NextResponse.json(
        { error: "The workspace is under maintenance." },
        { status: 400 },
      );
    }
    const conflict = await prisma.booking.findFirst({
      where: {
        workspaceId: bookingData.workspaceId,
        date: bookingData.date,
        slot: bookingData.slot,
        status: { not: "Cancelled" },
      },
    });
    if (conflict) {
      return NextResponse.json(
        { error: "The workspace has been reserved at this time." },
        { status: 409 },
      );
    }

    const newBooking = await prisma.booking.create({
      data: { ...bookingData, status: "Confirmed" },
    });
    return NextResponse.json(newBooking);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Unable to create new booking." },
      { status: 500 },
    );
  }
}
