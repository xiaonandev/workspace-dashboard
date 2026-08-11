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
