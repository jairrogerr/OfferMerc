import { LayoutDashboard, Users, Store, Package, BarChart3, Settings } from "lucide-react";

type AdminScreen = "adminDashboard" | "userManagement" | "merchantManagement" | "productValidation" | "reports" | "adminSettings";

interface AdminBottomNavProps {
  currentScreen: string;
  onNavigate: (screen: AdminScreen) => void;
}

export function AdminBottomNav({ currentScreen, onNavigate }: AdminBottomNavProps) {
  const navItems = [
    { id: "adminDashboard" as AdminScreen, icon: LayoutDashboard, label: "Dashboard" },
    { id: "userManagement" as AdminScreen, icon: Users, label: "Usuários" },
    { id: "merchantManagement" as AdminScreen, icon: Store, label: "Mercados" },
    { id: "productValidation" as AdminScreen, icon: Package, label: "Produtos" },
    { id: "reports" as AdminScreen, icon: BarChart3, label: "Relatórios" },
    { id: "adminSettings" as AdminScreen, icon: Settings, label: "Config" }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border pb-safe z-40">
      <div className="flex items-center justify-around px-2 py-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                isActive
                  ? "bg-slate-700 text-white"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
