import { motion } from "motion/react";
import { Home, Search, ListChecks, User } from "lucide-react";

type NavItem = {
  id: string;
  icon: typeof Home;
  label: string;
};

const navItems: NavItem[] = [
  { id: "home", icon: Home, label: "Início" },
  { id: "search", icon: Search, label: "Buscar" },
  { id: "list", icon: ListChecks, label: "Lista" },
  { id: "profile", icon: User, label: "Perfil" }
];

export function BottomNav({
  activeScreen,
  onNavigate
}: {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border pb-safe">
      <div className="flex justify-around items-center h-20 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center justify-center gap-1 flex-1 relative"
            >
              <div className="relative">
                <Icon
                  className={`w-6 h-6 transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
              <span className={`text-xs transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
