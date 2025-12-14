import { useState } from "react";
import { cn } from "../../utils/cn";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

export function Tabs({ tabs, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);

  return (
    <div className="w-full">
      {/* Tab List */}
      <div className="mb-6 flex overflow-x-auto border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative px-6 py-3 text-sm font-medium transition-colors hover:text-gray-900",
              activeTab === tab.id
                ? "text-primary"
                : "text-gray-500"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 h-0.5 w-full bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={cn("hidden animate-in fade-in-0", activeTab === tab.id && "block")}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
