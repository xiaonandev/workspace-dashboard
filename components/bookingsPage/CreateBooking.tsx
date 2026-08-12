"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import type { Workspace, Member } from "@/lib/generated/prisma/browser";
import { BOOKING_SLOTS } from "@/lib/constants";
import { useRouter } from "next/navigation";

type createBookingProps = {
  workspaces: Workspace[];
  members: Member[];
};

const CreateBooking = ({ workspaces, members }: createBookingProps) => {
  const today = new Date().toISOString().split("T")[0];
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const closeDialog = () => {
    setIsOpen(false);
    setError(null);
  };
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);

    if (!open) {
      setError(null);
    }
  };
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    setError(null);
    setIsSaving(true);
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const formValues = Object.fromEntries(formData.entries());
      const selectedDate = new Date(formValues.date as string).toISOString();

      const finalPayload = {
        ...formValues,
        date: selectedDate,
      };

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalPayload),
      });
      if (!response.ok) {
        const result = await response.json();
        setError(result.error);
        return;
      }
      closeDialog();
      router.refresh();
    } catch (error) {
      setError("Unable to create booking. Please try later.");
      console.log(error);
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger
          render={
            <Button className="inline-flex cursor-pointer items-center rounded-lg border border-[#44777d]/30 bg-white px-3 py-4 text-sm font-medium text-[#44777d] transition hover:border-[#44777d] hover:bg-[#44777d]/5">
              Create new booking
            </Button>
          }
        />

        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle> Create new booking</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label htmlFor="workspace">Workspace</Label>
                <select
                  className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm`}
                  defaultValue=""
                  name="workspaceId"
                  id="workspace"
                  required
                >
                  <option value="" disabled>
                    Select one workspace
                  </option>
                  {workspaces
                    .slice()
                    .sort((a, b) => {
                      if (
                        a.status === "maintenance" &&
                        b.status !== "maintenance"
                      ) {
                        return 1;
                      }
                      if (
                        a.status !== "maintenance" &&
                        b.status === "maintenance"
                      ) {
                        return -1;
                      }
                      return 0;
                    })
                    .map((workspace) => (
                      <option
                        key={workspace.id}
                        value={workspace.id}
                        disabled={workspace.status === "maintenance"}
                      >
                        {workspace.name}
                        {workspace.status === "maintenance"
                          ? " (under maintenance)"
                          : ""}
                      </option>
                    ))}
                </select>
              </Field>
              <Field>
                <Label htmlFor="member">Members</Label>
                <select
                  className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm`}
                  name="memberId"
                  id="member"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Select one member
                  </option>
                  {members.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field>
                <Label htmlFor="date">Date</Label>
                <input
                  className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm`}
                  type="date"
                  name="date"
                  id="date"
                  min={today}
                  defaultValue={today}
                  required
                />
              </Field>
              <Field>
                <Label htmlFor="slot">Slot</Label>
                <select
                  className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 mb-3 text-sm`}
                  name="slot"
                  id="slot"
                  defaultValue=""
                  required
                >
                  <option value="" disabled>
                    Select one time slot
                  </option>
                  {BOOKING_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </Field>
              {error && <div className="text-red-800 -mt-5 mb-2">{error} </div>}
            </FieldGroup>
            <DialogFooter>
              <DialogClose
                render={
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                }
              />
              <Button disabled={isSaving} type="submit">
                {isSaving ? "Saving..." : "Create Booking"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateBooking;
