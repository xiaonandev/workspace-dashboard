# Workspace Booking Dashboard

A full-stack workspace reservation dashboard with conflict-safe booking flows,
server-rendered data and persistent PostgreSQL storage.

[Live Demo](https://workspace-dashboard-rho.vercel.app)

[Case Study](https://xiaonan-portfolio.vercel.app/en/case-studies/workspace-dashboard)

## Features

- URL-based workspace and booking filters
- Booking creation, cancellation and conflict-safe restoration
- Conflict checks across workspace, date and time slot
- Past reservations are presented as cancelled and cannot be restored
- Runtime API validation with Zod
- Durable, database-driven dashboard metrics and charts

## Engineering Highlights

- Revalidates workspace availability and slot conflicts before restoring a booking
- Keeps actions pending through both the API request and Server Component refresh
- Separates client-safe constants from Prisma-dependent server modules

## Tech Stack

Next.js · TypeScript · PostgreSQL · Prisma · Zod · Tailwind CSS · shadcn/ui · Recharts · Vitest

The demo uses seeded data and is intended for portfolio presentation.

## Screenshots

### Dashboard

<img src="./public/images/01.png" alt="Dashboard overview" width="760" />

### Workspaces

<img src="./public/images/02.png" alt="Workspace management" width="760" />

### Bookings

<img src="./public/images/03.png" alt="Booking management" width="760" />
