import { MoreHorizontal } from "lucide-react";
import { cn } from "../../utils/cn";

interface StatCardProps {
  title: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  className?: string;
  dark?: boolean;
}

export function StatCard({ title, value, trend, trendUp, className, dark }: StatCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl p-6 shadow-sm",
        dark ? "bg-sidebar text-white" : "bg-white",
        className
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
           {dark && <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />}
           <span className={cn("text-sm font-medium", dark ? "text-gray-300" : "text-gray-500")}>
             {title}
           </span>
        </div>
        <button className="text-gray-400 hover:text-gray-300">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-3xl font-bold">{value}</span>
        {trend && (
          <div className="flex items-center gap-2 text-sm">
            <span className={cn("font-medium", trendUp ? "text-primary" : "text-red-500")}>
               {trendUp ? "↗" : "↘"} {trend}
            </span>
            <span className={cn(dark ? "text-gray-400" : "text-gray-500")}>from last month</span>
          </div>
        )}
      </div>

      {dark && (
        <div className="mt-6">
           <a href="#" className="text-sm text-gray-400 hover:text-white underline decoration-gray-600 underline-offset-4">
              See Statistics &gt;
           </a>
        </div>
      )}
    </div>
  );
}
