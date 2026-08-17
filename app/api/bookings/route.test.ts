import { beforeEach, describe, expect, it, vi } from "vitest";

const prismaMock = vi.hoisted(() => ({
  workspace: {
    findUnique: vi.fn(),
  },
  member: {
    findUnique: vi.fn(),
  },
  booking: {
    findFirst: vi.fn(),
    create: vi.fn(),
  },
}));

vi.mock("@/lib/prisma", () => ({
  prisma: prismaMock,
}));

import { POST } from "./route";

const validRequestBody = {
  date: "2099-01-01",
  slot: "09:00 - 10:00",
  workspaceId: "workspace-1",
  memberId: "member-1",
};

const createRequest = () =>
  new Request("http://localhost/api/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validRequestBody),
  });

describe("POST /api/bookings", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("creates a booking when the request is valid", async () => {
    prismaMock.workspace.findUnique.mockResolvedValue({
      id: "workspace-1",
      status: "active",
    });
    prismaMock.member.findUnique.mockResolvedValue({
      id: "member-1",
    });
    prismaMock.booking.findFirst.mockResolvedValue(null);

    const createdBooking = {
      id: "booking-1",
      ...validRequestBody,
      date: new Date(validRequestBody.date),
      status: "Confirmed",
    };
    prismaMock.booking.create.mockResolvedValue(createdBooking);

    const response = await POST(createRequest());
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(prismaMock.booking.create).toHaveBeenCalledOnce();
    expect(prismaMock.booking.create).toHaveBeenCalledWith({
      data: {
        date: new Date(validRequestBody.date),
        slot: validRequestBody.slot,
        workspaceId: validRequestBody.workspaceId,
        memberId: validRequestBody.memberId,
        status: "Confirmed",
      },
    });
    expect(responseBody).toEqual({
      ...createdBooking,
      date: createdBooking.date.toISOString(),
    });
  });

  it("returns 409 and does not create when the slot is reserved", async () => {
    prismaMock.workspace.findUnique.mockResolvedValue({
      id: "workspace-1",
      status: "active",
    });
    prismaMock.member.findUnique.mockResolvedValue({
      id: "member-1",
    });
    prismaMock.booking.findFirst.mockResolvedValue({
      id: "existing-booking",
    });

    const response = await POST(createRequest());
    const responseBody = await response.json();

    expect(response.status).toBe(409);
    expect(responseBody).toEqual({
      error: "The workspace has been reserved at this time.",
    });
    expect(prismaMock.booking.create).not.toHaveBeenCalled();
  });
});
