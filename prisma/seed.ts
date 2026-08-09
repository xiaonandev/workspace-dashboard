import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { Prisma, PrismaClient } from "../lib/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is required to seed the database.");
}

const pool = new Pool({ connectionString });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

type FilterWorkspaceType =
  | "Meeting Room"
  | "Focus Room"
  | "Desk"
  | "Event Space";
type FilterLocation = "Floor 1" | "Floor 2" | "Floor 3";
type FilterCapacity = 1 | 4 | 8;
type WorkspaceStatus = "active" | "maintenance";
type SeedWorkspace = Prisma.WorkspaceCreateManyInput & {
  type: FilterWorkspaceType;
  location: FilterLocation;
  capacity: FilterCapacity;
  status: WorkspaceStatus;
};

const workspaces = [
  {
    id: "seed-atlas-meeting-room",
    name: "Atlas Meeting Room",
    type: "Meeting Room",
    location: "Floor 1",
    capacity: 8,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1758691736433-4078b93abd72?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "seed-orbit-meeting-room",
    name: "Orbit Meeting Room",
    type: "Meeting Room",
    location: "Floor 1",
    capacity: 4,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "seed-harbor-boardroom",
    name: "Harbor Boardroom",
    type: "Meeting Room",
    location: "Floor 2",
    capacity: 8,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "seed-summit-meeting-room",
    name: "Summit Meeting Room",
    type: "Meeting Room",
    location: "Floor 3",
    capacity: 8,
    status: "maintenance",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "seed-nova-meeting-room",
    name: "Nova Meeting Room",
    type: "Meeting Room",
    location: "Floor 3",
    capacity: 4,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
  },

  {
    id: "seed-focus-pod-a",
    name: "Focus Pod A",
    type: "Focus Room",
    location: "Floor 1",
    capacity: 1,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "seed-focus-pod-b",
    name: "Focus Pod B",
    type: "Focus Room",
    location: "Floor 1",
    capacity: 1,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "seed-quiet-room",
    name: "Quiet Room",
    type: "Focus Room",
    location: "Floor 2",
    capacity: 1,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1659958661414-59d7bd483853?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "seed-library-room",
    name: "Library Room",
    type: "Focus Room",
    location: "Floor 3",
    capacity: 4,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1655988940601-7702d8685f95?auto=format&fit=crop&w=1200&q=80",
  },

  {
    id: "seed-window-desk-01",
    name: "Window Desk 01",
    type: "Desk",
    location: "Floor 1",
    capacity: 1,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1605543667606-52b0f1ee1b72?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "seed-window-desk-02",
    name: "Window Desk 02",
    type: "Desk",
    location: "Floor 1",
    capacity: 1,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1582202602267-840d332d9530?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "seed-corner-desk-03",
    name: "Corner Desk 03",
    type: "Desk",
    location: "Floor 2",
    capacity: 1,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1568052289438-e65932adc96b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "seed-standing-desk-04",
    name: "Standing Desk 04",
    type: "Desk",
    location: "Floor 2",
    capacity: 1,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1666185761824-a355321d1b24?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "seed-team-desk-cluster",
    name: "Team Desk Cluster",
    type: "Desk",
    location: "Floor 3",
    capacity: 4,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1692133230791-71d5a53f0f74?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "seed-studio-desk-06",
    name: "Studio Desk 06",
    type: "Desk",
    location: "Floor 3",
    capacity: 1,
    status: "maintenance",
    image:
      "https://images.unsplash.com/photo-1692133226337-55e513450a32?auto=format&fit=crop&w=1200&q=80",
  },

  {
    id: "seed-town-hall",
    name: "Town Hall",
    type: "Event Space",
    location: "Floor 1",
    capacity: 8,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1692133224682-42cc3283e4ea?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "seed-community-lounge",
    name: "Community Lounge",
    type: "Event Space",
    location: "Floor 1",
    capacity: 8,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1593791767540-fb2bddb20b9a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "seed-innovation-studio",
    name: "Innovation Studio",
    type: "Event Space",
    location: "Floor 2",
    capacity: 8,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1604510417956-f4d74192b25c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "seed-rooftop-forum",
    name: "Rooftop Forum",
    type: "Event Space",
    location: "Floor 3",
    capacity: 8,
    status: "active",
    image:
      "https://images.unsplash.com/photo-1618506487216-4e8c60a64c73?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "seed-workshop-lab",
    name: "Workshop Lab",
    type: "Event Space",
    location: "Floor 3",
    capacity: 8,
    status: "maintenance",
    image:
      "https://images.unsplash.com/photo-1757194455393-8e3134d4ce19?auto=format&fit=crop&w=1200&q=80",
  },
] satisfies SeedWorkspace[];

const members = [
  {
    id: "seed-member-emma-wilson",
    name: "Emma Wilson",
    email: "emma@workspace.test",
  },
  {
    id: "seed-member-daniel-kim",
    name: "Daniel Kim",
    email: "daniel@workspace.test",
  },
  {
    id: "seed-member-sophie-martin",
    name: "Sophie Martin",
    email: "sophie@workspace.test",
  },
  {
    id: "seed-member-james-lee",
    name: "James Lee",
    email: "james@workspace.test",
  },
] satisfies Prisma.MemberCreateManyInput[];

const bookings = [
  {
    id: "seed-booking-001",
    date: new Date("2026-08-08T00:00:00.000Z"),
    slot: "10:00 - 11:00",
    status: "Confirmed",
    workspaceId: "seed-atlas-meeting-room",
    memberId: "seed-member-emma-wilson",
  },
  {
    id: "seed-booking-002",
    date: new Date("2026-08-08T00:00:00.000Z"),
    slot: "14:00 - 16:00",
    status: "Confirmed",
    workspaceId: "seed-focus-pod-a",
    memberId: "seed-member-daniel-kim",
  },
  {
    id: "seed-booking-003",
    date: new Date("2026-08-09T00:00:00.000Z"),
    slot: "09:00 - 10:00",
    status: "Confirmed",
    workspaceId: "seed-window-desk-01",
    memberId: "seed-member-sophie-martin",
  },
  {
    id: "seed-booking-004",
    date: new Date("2026-08-10T00:00:00.000Z"),
    slot: "11:00 - 12:00",
    status: "Confirmed",
    workspaceId: "seed-town-hall",
    memberId: "seed-member-james-lee",
  },
  {
    id: "seed-booking-005",
    date: new Date("2026-08-11T00:00:00.000Z"),
    slot: "13:00 - 14:00",
    status: "Confirmed",
    workspaceId: "seed-nova-meeting-room",
    memberId: "seed-member-sophie-martin",
  },
  {
    id: "seed-booking-006",
    date: new Date("2026-08-12T00:00:00.000Z"),
    slot: "15:00 - 16:00",
    status: "Confirmed",
    workspaceId: "seed-team-desk-cluster",
    memberId: "seed-member-emma-wilson",
  },
] satisfies Prisma.BookingCreateManyInput[];

async function main() {
  await Promise.all(
    workspaces.map(({ id, ...workspace }) =>
      prisma.workspace.upsert({
        where: { id },
        update: workspace,
        create: { id, ...workspace },
      }),
    ),
  );

  await Promise.all(
    members.map(({ id, ...member }) =>
      prisma.member.upsert({
        where: { id },
        update: member,
        create: { id, ...member },
      }),
    ),
  );

  await Promise.all(
    bookings.map(({ id, ...booking }) =>
      prisma.booking.upsert({
        where: { id },
        update: booking,
        create: { id, ...booking },
      }),
    ),
  );

  console.log(
    `Seeded ${workspaces.length} workspaces, ${members.length} members, and ${bookings.length} bookings.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
