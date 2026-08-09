import { prisma } from "@/lib/prisma";

type Context = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: Context) {
  try {
    const { id } = await context.params;
    const formData = await request.formData();
    const name = formData.get("name");
    const capacityValue = formData.get("capacity");
    const status = formData.get("status");
    if (typeof name !== "string" || !name.trim()) {
      return Response.json(
        { error: "Workspace name is required" },
        { status: 400 },
      );
    }
    const capacity = Number(capacityValue);

    if (![1, 4, 8].includes(capacity)) {
      return Response.json(
        { error: "Capacity must be 1, 4, or 8" },
        { status: 400 },
      );
    }
    if (
      typeof status !== "string" ||
      !["active", "maintenance"].includes(status)
    ) {
      return Response.json(
        { error: "Invalid workspace status" },
        { status: 400 },
      );
    }
    const updatedWorkspace = await prisma.workspace.update({
      where: {
        id,
      },
      data: {
        name: name.trim(),
        capacity: Number(capacityValue),
        status,
      },
    });
    return Response.json(updatedWorkspace);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Unable to update workspace" },
      { status: 500 },
    );
  }
}
