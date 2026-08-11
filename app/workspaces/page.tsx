import PageHeader from "@/components/layout/PageHeader";
import WorkspaceFilters from "@/components/workspacesPage/WorkspaceFilters";
import WorkspaceGrid from "@/components/workspacesPage/WorkspaceGrid";

import { prisma } from "@/lib/prisma";
type Props = {
  searchParams: Promise<{
    search?: string;
    type?: string;
    location?: string;
    capacity?: string;
    status?: string;
  }>;
};
export default async function page({ searchParams }: Props) {
  const params = await searchParams;
  const minimumCapacity = Number(params.capacity);

  const workspaces = await prisma.workspace.findMany({
    where: {
      OR: params.search
        ? [
            { name: { contains: params.search, mode: "insensitive" } },
            { location: { contains: params.search, mode: "insensitive" } },
          ]
        : undefined,
      type: params.type || undefined,
      location: params.location || undefined,
      capacity:
        params.capacity && Number.isFinite(minimumCapacity)
          ? { gte: minimumCapacity }
          : undefined,
      status: params.status || undefined,
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-4">
      <PageHeader
        title="Workspaces"
        description=" View and manage workspaces."
      />
      <WorkspaceFilters />
      <WorkspaceGrid workspaces={workspaces} />
    </div>
  );
}
