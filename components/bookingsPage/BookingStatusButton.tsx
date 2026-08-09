"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

type props = {
  id: string;
  status: string;
};
const BookingStatusButton = ({ id, status }: props) => {
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const targetStatus = status === "Confirmed" ? "Cancelled" : "Confirmed";

  const handleStatusChange = async () => {
    setError(null);
    setIsSaving(true);
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: targetStatus,
        }),
      });
      if (!response.ok) {
        const result = await response.json();
        setError(result.error);
        return;
      }
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      setError(`Unable to update booking. Please try again.`);
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-2">
      {error && (
        <p
          role="alert"
          className="max-w-56 rounded-md bg-red-50 px-2.5 py-2 text-left text-xs leading-4 whitespace-normal text-red-700"
        >
          {error}
        </p>
      )}
      <Button
        onClick={handleStatusChange}
        variant="outline"
        disabled={isSaving || isPending}
        className={`rounded-lg px-3 py-1.5 text-xs font-medium ${status === "Cancelled" ? "text-green-700" : "text-red-500"} `}
      >
        {(isSaving || isPending) && <Spinner data-icon="inline-start" />}
        {status === "Cancelled" ? "Restore" : "Cancel"}
      </Button>
    </div>
  );
};

export default BookingStatusButton;
