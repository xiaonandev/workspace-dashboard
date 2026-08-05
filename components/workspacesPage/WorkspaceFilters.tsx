'use client';
import Filters from '../ui/Filter';
type Props = {
  filters: {
    search: string;
    type: string;
    location: string;
    capacity: string;
    sort: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onClear: () => void;
};
const WorkspaceFilters = ({ filters, onFilterChange, onClear }: Props) => {
  const typeOptions = [
    { value: 'All types', label: 'All types' },
    { value: 'Meeting Room', label: 'Meeting Room' },
    { value: 'Focus Room', label: 'Focus Room' },
    { value: 'Desk', label: 'Desk' },
    { value: 'Event Space', label: 'Event Space' },
  ];

  const locationOptions = [
    { value: 'All locations', label: 'All locations' },
    { value: 'Floor 1', label: 'Floor 1, Main Hall' },
    { value: 'Floor 2', label: 'Floor 2, Open Area' },
    { value: 'Floor 3', label: 'Floor 3, North Wing' },
  ];

  const capacityOptions = [
    { value: 'All capacity', label: 'All capacity' },
    { value: '1', label: '1+ person' },
    { value: '4', label: '4+ people' },
    { value: '8', label: '8+ people' },
    { value: '10', label: '10+ people' },
  ];

  const sortOptions = [
    { value: 'popular', label: 'Most popular' },
    { value: 'newest', label: 'Newest' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <input
        type="text"
        placeholder="Search by name or location..."
        value={filters.search}
        onChange={(e) => onFilterChange('search', e.target.value)}
        className="min-w-50 flex-1 rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none"
      />
      <Filters
        options={typeOptions}
        value={filters.type}
        onChange={(val) => onFilterChange('type', val)}
      />
      <Filters
        options={locationOptions}
        value={filters.location}
        onChange={(val) => onFilterChange('location', val)}
      />
      <Filters
        options={capacityOptions}
        value={filters.capacity}
        onChange={(val) => onFilterChange('capacity', val)}
      />
      <div className="ml-auto flex items-center gap-2">
        <span className="whitespace-nowrap text-sm text-gray-500">Sort by</span>

        <Filters
          options={sortOptions}
          value={filters.sort}
          onChange={(val) => onFilterChange('sort', val)}
        />
      </div>
      <button
        onClick={onClear}
        className="rounded-lg bg-[#44777d] px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800 cursor-pointer"
      >
        Clear all
      </button>
    </div>
  );
};
export default WorkspaceFilters;
