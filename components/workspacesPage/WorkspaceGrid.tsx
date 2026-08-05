import WorkspaceCard from './WorkspaceCard';

type Workspace = {
  id: number;
  name: string;
  type: string;
  location: string;
  capacity: number;
  image: string;
  available: boolean;
};
type WorkspaceGridProps = {
  workspaces: Workspace[];
};
export default function WorkspaceGrid({ workspaces }: WorkspaceGridProps) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {workspaces.map((workspace) => (
        <WorkspaceCard
          key={workspace.id}
          name={workspace.name}
          type={workspace.type}
          location={workspace.location}
          capacity={workspace.capacity}
          image={workspace.image}
          available={workspace.available}
        />
      ))}
    </div>
  );
}
