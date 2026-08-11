"use client";
import { useEffect, useState } from "react";

export default function Header() {
  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const timeStr = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setCurrentTime(`${dateStr} ${timeStr}`);
    };
    updateTime();

    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="flex min-h-22 items-center justify-between gap-6 border-b border-[#e1e8ed] bg-white/90 px-8 py-4.5 backdrop-blur-[14px] max-sm:min-h-18.5 max-sm:px-4.5 max-sm:py-3.5">
      <div>
        <p className="m-0 text-[11px] font-extrabold tracking-[0.09em] text-[#44777d] uppercase">
          {currentTime}{" "}
        </p>
        <h1 className="mt-0.5 text-[22px] font-bold tracking-[-0.03em] max-sm:text-lg">
          Good morning, Demo User
        </h1>
      </div>
    </header>
  );
}
