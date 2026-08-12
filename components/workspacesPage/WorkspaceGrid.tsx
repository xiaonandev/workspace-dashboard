import WorkspaceCard from "./WorkspaceCard";
import type { Member, Workspace } from "@/lib/generated/prisma/browser";

export type UpcomingBooking = {
  id: string;
  date: Date;
  slot: string;
  member: Member;
};

export type WorkspaceWithUpcomingBookings = Workspace & {
  bookings: UpcomingBooking[];
};

type WorkspaceGridProps = {
  workspaces: WorkspaceWithUpcomingBookings[];
};
export default function WorkspaceGrid({ workspaces }: WorkspaceGridProps) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {workspaces
        .slice()
        .sort((a, b) => {
          if (a.status === "maintenance" && b.status !== "maintenance") {
            return 1;
          }
          if (a.status !== "maintenance" && b.status === "maintenance") {
            return -1;
          }
          return 0;
        })
        .map((workspace) => (
          <WorkspaceCard key={workspace.id} workspace={workspace} />
        ))}
      {workspaces.length === 0 && (
        <div>
          <p>Nothing found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}
