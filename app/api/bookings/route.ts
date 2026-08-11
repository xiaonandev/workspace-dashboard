import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const finalPayload = {
      ...body,
      status: "Confirmed",
    };

    const [workspace, member] = await Promise.all([
      prisma.workspace.findUnique({ where: { id: body.workspaceId } }),
      prisma.member.findUnique({ where: { id: body.memberId } }),
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
        workspaceId: body.workspaceId,
        date: new Date(body.date),
        slot: body.slot,
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
      data: finalPayload,
    });
    return NextResponse.json(newBooking);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to create new booking." },
      { status: 500 },
    );
  }
}
