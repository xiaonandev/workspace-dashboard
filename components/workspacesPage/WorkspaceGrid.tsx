import WorkspaceCard from "./WorkspaceCard";
import type { Workspace } from "@/lib/generated/prisma/browser";

type WorkspaceGridProps = {
  workspaces: Workspace[];
};
export default function WorkspaceGrid({ workspaces }: WorkspaceGridProps) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {workspaces.map((workspace) => (
        <WorkspaceCard key={workspace.id} workspace={workspace} />
      ))}
    </div>
  );
}
