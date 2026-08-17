import { ChevronDown } from "lucide-react";

type OptionItem = {
  value: string;
  label: string;
};

type FiltersProps = {
  options: OptionItem[];
  value: string;
  onChange: (value: string) => void;
  label: string;
};
const Filters = ({ options, value, onChange, label }: FiltersProps) => {
  return (
    <div className="relative inline-block">
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm text-gray-700 shadow-sm hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#44777d] cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
        <ChevronDown size={18} />
      </div>
    </div>
  );
};

export default Filters;
