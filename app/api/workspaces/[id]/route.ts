import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import z from "zod";

type Context = {
  params: Promise<{ id: string }>;
};

const editWorkspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter a name.")
    .max(80, "Name must be 80 characters or fewer."),
  capacity: z.union([z.literal(1), z.literal(4), z.literal(8)]),
  status: z.enum(["active", "maintenance"]),
});

export async function PATCH(request: Request, context: Context) {
  try {
    const { id } = await context.params;
    const formData = await request.formData();
    const rawData = {
      name: formData.get("name"),
      capacity: Number(formData.get("capacity")),
      status: formData.get("status"),
    };
    const validation = editWorkspaceSchema.safeParse(rawData);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: validation.error.issues[0]?.message ?? "Invalid input data.",
          details: z.flattenError(validation.error),
        },
        { status: 400 },
      );
    }

    const { name, capacity, status } = validation.data;

    const workspace = await prisma.workspace.findUnique({ where: { id } });

    if (!workspace) {
      return NextResponse.json(
        { error: "Workspace not found." },
        { status: 404 },
      );
    }

    const updatedWorkspace = await prisma.workspace.update({
      where: {
        id,
      },
      data: {
        name,
        capacity,
        status,
      },
    });
    return NextResponse.json(updatedWorkspace);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to update workspace." },
      { status: 500 },
    );
  }
}
