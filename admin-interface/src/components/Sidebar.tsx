import {
    BarChart3,
    LayoutDashboard,
    Map as MapIcon,
    MessageSquare,
    Palette,
    Settings,
    Shield,
    Users,
    Waypoints
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../utils/cn";

const navigation = [
  { name: "Overview", icon: LayoutDashboard, href: "/" },
  { name: "Analytics", icon: BarChart3, href: "/analytics" },
  { name: "Visitors", icon: Users, href: "/visitors" },
  { name: "Artworks", icon: Palette, href: "/artworks" },
  { name: "Interactions", icon: MessageSquare, href: "/interactions", badge: 12 }, // Real-time badge
  { name: "Trajectories", icon: Waypoints, href: "/trajectories" },
  { name: "Map Editor", icon: MapIcon, href: "/map-editor" },
];

const general = [
  { name: "Settings", icon: Settings, href: "/settings" },
  { name: "Security", icon: Shield, href: "/security" },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-screen w-64 flex-col bg-sidebar text-white">
      {/* Header */}
      <div className="flex items-center gap-2 px-6 py-8">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
          <span className="text-primary text-xl">🤖</span>
        </div>
        <span className="text-xl font-semibold tracking-tight">Musia Admin</span>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mb-8">
          <div className="mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Menu
          </div>
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-white/10 text-white border-l-4 border-primary"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-gray-400")} />
                    {item.name}
                  </div>
                  {item.badge && (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-sidebar font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          <div className="mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
            General
          </div>
          <nav className="space-y-1">
            {general.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-white/10 text-white border-l-4 border-primary"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-gray-400")} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* User Footer */}
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
          <div className="h-10 w-10 overflow-hidden rounded-full bg-primary">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">Admin User</span>
            <span className="text-xs text-gray-400">admin@musia.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
