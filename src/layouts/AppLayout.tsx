import { Outlet, Link, useLocation } from "react-router-dom";
import { Home, Dumbbell, Users, MessageSquare, User, LogOut, Wrench, TrendingUp, UserCheck, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export function AppLayout() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { isDark } = useTheme();

  const navItems = [
    { name: "Home", path: "/app/dashboard", icon: Home },
    { name: "Workouts", path: "/app/workouts", icon: Dumbbell },
    { name: "Steps", path: "/app/steps", icon: Activity },
    { name: "Analytics", path: "/app/analytics", icon: TrendingUp },
    { name: "Coaching", path: "/app/coaching", icon: UserCheck },
    { name: "Community", path: "/app/community", icon: Users },
    { name: "Chat", path: "/app/chat", icon: MessageSquare },
    { name: "Tools", path: "/app/tools", icon: Wrench },
    { name: "Profile", path: "/app/profile", icon: User },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 pb-20 md:pb-0 md:pl-64 ${
      isDark
        ? "bg-gradient-to-br from-slate-900 to-slate-800 text-white"
        : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-slate-900"
    }`}>
      {/* Desktop Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 hidden w-64 md:flex flex-col backdrop-blur-md transition-colors ${
        isDark
          ? "bg-white/6 border-r border-white/10"
          : "bg-white/40 border-r border-white/20"
      }`}>
        <div className={`flex h-16 items-center border-b px-6 ${
          isDark ? "border-b border-white/10" : "border-b border-white/20"
        }`}>
          <span className="text-xl font-bold text-emerald-400">Fitway Hub</span>
        </div>
        
        <div className={`p-4 border-b ${
          isDark ? "border-white/6" : "border-white/10"
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full overflow-hidden ${
              isDark ? "bg-white/10" : "bg-slate-300/40"
            }`}>
              <img src={user?.avatar} alt={user?.name} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-bold truncate ${isDark ? "text-white" : "text-slate-900"}`}>{user?.name}</p>
              <p className={`text-xs truncate ${isDark ? "text-white/70" : "text-slate-600"}`}>{user?.isPremium ? "Premium Member" : "Free Member"}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? isDark ? "bg-emerald-600/10 text-emerald-300" : "bg-emerald-500/10 text-emerald-600"
                  : isDark ? "text-white/80 hover:bg-white/6 hover:text-white" : "text-slate-600 hover:bg-white/30 hover:text-slate-900"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className={`p-4 border-t ${
          isDark ? "border-white/6" : "border-white/10"
        }`}>
          <button 
            onClick={logout}
            className={`flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium transition-colors ${
              isDark
                ? "text-rose-400 hover:bg-rose-600/10"
                : "text-rose-600 hover:bg-rose-600/10"
            }`}
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="min-h-screen container mx-auto px-4 py-10">
        <div className={`backdrop-blur-md rounded-3xl p-6 shadow-2xl border transition-colors ${
          isDark
            ? "bg-white/6 border-white/10"
            : "bg-white/40 border-white/20"
        }`}>
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className={`fixed bottom-0 left-0 right-0 z-50 border-t md:hidden overflow-x-auto backdrop-blur-md transition-colors ${
        isDark
          ? "border-white/6 bg-white/6"
          : "border-white/10 bg-white/40"
      }`}>
        <div className="flex h-16 items-center justify-around min-w-max px-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 p-2 min-w-[60px] text-xs font-medium transition-colors",
                location.pathname === item.path
                  ? "text-emerald-300"
                  : isDark ? "text-white/80 hover:text-white" : "text-slate-600 hover:text-slate-900"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] hidden sm:inline">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
