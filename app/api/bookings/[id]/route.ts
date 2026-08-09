import { prisma } from "@/lib/prisma";

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
      return Response.json(
        { error: "Please enter a vaild value." },
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
    return Response.json(updatedBooking);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Unable to unpate booking." },
      { status: 500 },
    );
  }
}
