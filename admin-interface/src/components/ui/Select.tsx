import { type SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils/cn";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { label: string; value: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-1.5 block text-sm font-semibold text-gray-700">
            {label}
          </label>
        )}
        <div className="relative">
            <select
            ref={ref}
            className={cn(
                "w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 outline-none transition-all focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary disabled:opacity-50",
                error && "border-red-500 focus:border-red-500 focus:ring-red-500",
                className
            )}
            {...props}
            >
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                {opt.label}
                </option>
            ))}
            </select>
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
             ▼
            </div>
        </div>
        {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);
Select.displayName = "Select";
