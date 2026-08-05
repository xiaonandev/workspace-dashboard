'use client';

import { useState } from 'react';
import WorkspaceFilters from './WorkspaceFilters';
import WorkspaceGrid from './WorkspaceGrid';

const WorkspaceClient = () => {
  const initialFilters = {
    search: '',
    type: 'All types',
    location: 'All locations',
    capacity: 'All capacity',
    sort: 'Popular',
  };

  const [filters, setFilters] = useState(initialFilters);
  const clearFilters = () => {
    setFilters(initialFilters);
  };
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const workspaces = [
    {
      id: 1,
      name: 'Atlas Meeting Room',
      type: 'Meeting Room',
      location: 'Floor 3',
      capacity: 8,
      image: '/workspace-1.jpg',
      available: true,
    },
    {
      id: 2,
      name: 'Focus Pod A',
      type: 'Focus Room',
      location: 'Floor 2',
      capacity: 1,
      image: '/workspace-2.jpg',
      available: true,
    },
  ];

  const filteredWorkspaces = workspaces.filter((workspace) => {
    const matchSearch = workspace.name
      .toLowerCase()
      .includes(filters.search.toLowerCase());

    const matchType =
      filters.type === 'All types' || workspace.type === filters.type;

    const matchLocation =
      filters.location === 'All locations' ||
      workspace.location === filters.location;

    const matchCapacity =
      filters.capacity === 'All capacity' ||
      workspace.capacity >= Number(filters.capacity);

    return matchSearch && matchType && matchLocation && matchCapacity;
  });

  return (
    <div>
      <WorkspaceFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClear={clearFilters}
      />
      <WorkspaceGrid workspaces={filteredWorkspaces} />
    </div>
  );
};

export default WorkspaceClient;
