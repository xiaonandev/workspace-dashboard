import {
  CalendarDays,
  LayoutDashboard,
  MapPin,
  Settings,
  Users,
  Zap,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: MapPin, label: "Workspaces" },
  { icon: CalendarDays, label: "Bookings" },
  { icon: Users, label: "Members" },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-0 z-20 flex h-screen flex-col bg-[#0a262c] px-4 pt-6 pb-4.5 text-[#d9e7e9] max-[900px]:px-2.5 max-sm:fixed max-sm:top-auto max-sm:bottom-0 max-sm:h-17 max-sm:w-full max-sm:flex-row max-sm:px-3 max-sm:py-2">
      <div className="flex items-center gap-3 px-2.5 pb-7 max-[900px]:justify-center max-[900px]:px-0 max-sm:hidden">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#44777d] text-white">
          <Zap className="w-5.25" aria-hidden="true" />
        </span>
        <span className="flex min-w-0 flex-col max-[900px]:hidden">
          <strong className="text-lg tracking-[-0.02em] text-white">
            Workspace
          </strong>
          <small className="mt-0.5 text-xs text-[#8eaaae]">
            Workspace manager
          </small>
        </span>
      </div>

      <nav
        className="flex flex-col gap-1.5 max-sm:w-full max-sm:flex-row max-sm:justify-around max-sm:gap-1"
        aria-label="Primary navigation"
      >
        {menuItems.map((item) => (
          <a
            href="#"
            className={`flex items-center gap-3 rounded-sm px-3 py-2.75 text-sm font-semibold no-underline transition-colors max-[900px]:justify-center max-[900px]:px-0 max-sm:flex-1 max-sm:flex-col max-sm:gap-0.75 max-sm:px-1 max-sm:py-1.75 max-sm:text-[10px] ${
              item.active
                ? "bg-[#44777d] text-white shadow-[0_8px_20px_rgba(0,0,0,0.16)]"
                : "text-[#aec3c6] hover:bg-white/[0.07] hover:text-white"
            }`}
            aria-current={item.active ? "page" : undefined}
            key={item.label}
          >
            <item.icon
              className="size-4.75 max-sm:size-4.5"
              aria-hidden="true"
            />
            <span className="max-[900px]:hidden max-sm:block">
              {item.label}
            </span>
          </a>
        ))}
      </nav>

      <div className="mt-auto max-sm:hidden">
        <a
          href="#"
          className="flex items-center gap-3 rounded-[10px] px-3 py-2.75 text-sm font-semibold text-[#aec3c6] no-underline transition-colors hover:bg-white/[0.07] hover:text-white max-[900px]:justify-center max-[900px]:px-0"
        >
          <Settings className="size-4.75" aria-hidden="true" />
          <span className="max-[900px]:hidden">Settings</span>
        </a>
        <div className="mt-4 flex items-center gap-2.5 border-t border-white/10 px-2.5 pt-4 max-[900px]:justify-center max-[900px]:px-0">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#d7eeee] text-xs font-extrabold text-[#0b5962]">
            AM
          </span>
          <span className="flex min-w-0 flex-col max-[900px]:hidden">
            <strong className="truncate whitespace-nowrap text-[13px] text-white">
              Alex Morgan
            </strong>
            <small className="mt-0.5 text-xs text-[#8eaaae]">
              Administrator
            </small>
          </span>
        </div>
      </div>
    </aside>
  );
}
