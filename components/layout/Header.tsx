import { Bell, Plus, Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex min-h-22 items-center justify-between gap-6 border-b border-[#e1e8ed] bg-white/90 px-8 py-4.5 backdrop-blur-[14px] max-sm:min-h-18.5 max-sm:px-4.5 max-sm:py-3.5">
      <div>
        <p className="m-0 text-[11px] font-extrabold tracking-[0.09em] text-[#44777d] uppercase">
          Tuesday, August 4
        </p>
        <h1 className="mt-0.5 text-[22px] font-bold tracking-[-0.03em] max-sm:text-lg">
          Good morning, Alex
        </h1>
      </div>
      <div className="flex items-center gap-2.5">
        <label className="flex h-10.5 w-57.5 items-center gap-2.5 rounded-[11px] border border-[#e1e8ed] bg-[#f7f9fa] px-3.25 focus-within:border-[#44777d] focus-within:ring-3 focus-within:ring-[#e3f5f5] max-[900px]:hidden">
          <Search className="w-4.25 text-[#687787]" aria-hidden="true" />
          <span className="sr-only">Search</span>
          <input
            className="w-full border-0 bg-transparent text-[13px] text-[#2e3c49] outline-none"
            type="search"
            placeholder="Search workspaces"
          />
        </label>
        <button
          className="relative grid size-10.5 cursor-pointer place-items-center rounded-[11px] border-0 bg-[#edf2f4] text-[#4b5c69]"
          aria-label="Notifications"
        >
          <Bell className="w-4.5" aria-hidden="true" />
          <span className="absolute top-2.25 right-2.25 size-1.5 rounded-full border-2 border-[#edf2f4] bg-[#e55445]" />
        </button>
        <button className="flex h-10.5 cursor-pointer items-center gap-2 rounded-[11px] border-0 bg-[#44777d] px-4 text-[13px] font-bold text-white hover:bg-[#257a73] max-sm:w-10.5 max-sm:justify-center max-sm:px-0 max-sm:text-[0px]">
          <Plus className="w-4.25" aria-hidden="true" />
          New booking
        </button>
      </div>
    </header>
  );
}
