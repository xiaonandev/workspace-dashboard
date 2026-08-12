export const BOOKING_SLOTS = [
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
] as const;

export const SLOTS_PER_DAY = BOOKING_SLOTS.length;

export const WORKSPACE_TYPE_COLORS: Record<string, string> = {
  "Meeting Room": "#3b82f6",
  Desk: "#06b6d4",
  "Focus Room": "#10b981",
  "Event Space": "#f59e0b",
};
