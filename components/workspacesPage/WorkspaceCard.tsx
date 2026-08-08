"use client";
import { Button } from "@/components/ui/button";
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
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { MapPin, Monitor, Users, Video, Wifi } from "lucide-react";
import Image from "next/image";
import WorkspaceSheet from "./WorkspaceSheet";
import type { Workspace } from "@/lib/generated/prisma/browser";
import { useRouter } from "next/navigation";

type WorkspaceCardProps = {
  workspace: Workspace;
};

export default function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  const router = useRouter();

  const { name, type, location, capacity, image, status } = workspace;
  const isActive = status === "active";
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch(`/api/workspaces/${workspace.id}`, {
      method: "PATCH",
      body: formData,
    });
    if (!response.ok) {
      const result = await response.json();
      console.error(result.error);
      return;
    }

    router.refresh();
  };
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="relative h-48">
        <Image src={image} alt={name} fill className="object-cover" />

        <span className="absolute left-3 top-3 rounded-full bg-violet-500 px-3 py-1 text-xs font-medium text-white">
          {type}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>

        <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
          <MapPin size={15} />
          <span>{location}</span>
        </div>

        <div className="mt-3 flex items-center gap-4 text-gray-500">
          <div className="flex items-center gap-1 text-sm">
            <Users size={16} />
            <span>{capacity} people</span>
          </div>

          <Monitor size={16} />
          <Video size={16} />
          <Wifi size={16} />
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div
            className={`flex items-center gap-2 text-sm font-medium ${
              isActive ? "text-emerald-700" : "text-red-700"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                isActive ? "bg-emerald-600" : "bg-red-700"
              }`}
            />
            <span className="capitalize">{status}</span>
          </div>

          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger
                render={
                  <Button className="inline-flex cursor-pointer items-center rounded-lg border border-[#44777d]/30 bg-white px-3 py-4 text-sm font-medium text-[#44777d] transition hover:border-[#44777d] hover:bg-[#44777d]/5">
                    Edit
                  </Button>
                }
              />

              <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle>Edit workspace</DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                  <FieldGroup>
                    <Field>
                      <Label htmlFor="name-1">Name</Label>
                      <Input
                        id="name-1"
                        name="name"
                        defaultValue={workspace.name}
                      />
                    </Field>
                    <Field>
                      <Label htmlFor="capacity-1">Capacity</Label>
                      <Input
                        id="capacity-1"
                        name="capacity"
                        defaultValue={workspace.capacity}
                      />
                    </Field>
                    <Field>
                      <Label htmlFor="status-1">Status</Label>
                      <select
                        className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mb-5`}
                        defaultValue={workspace.status}
                        name="status"
                        id="status-1"
                      >
                        <option value="active">Active</option>
                        <option value="maintenance">Maintenance</option>
                      </select>
                    </Field>
                  </FieldGroup>
                  <DialogFooter>
                    <DialogClose
                      render={<Button variant="outline">Cancel</Button>}
                    />
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <WorkspaceSheet workspace={workspace} />
          </div>
        </div>
      </div>
    </div>
  );
}
