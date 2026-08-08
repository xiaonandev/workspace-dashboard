import { prisma } from "@/lib/prisma";

type Context = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: Context) {
  const { id } = await context.params;
  const formData = await request.formData();
  const name = formData.get("name");
  const capacityValue = formData.get("capacity");
  const status = formData.get("status");
  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof capacityValue !== "string" ||
    !Number.isInteger(Number(capacityValue)) ||
    Number(capacityValue) <= 0 ||
    typeof status !== "string" ||
    !["active", "maintenance"].includes(status)
  ) {
    return Response.json({ error: "Invalid workspace data" }, { status: 400 });
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
}
