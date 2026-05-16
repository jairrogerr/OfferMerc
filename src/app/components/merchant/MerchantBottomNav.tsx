import { motion } from "motion/react";
import { Home, BarChart3, Plus, Tag, Settings } from "lucide-react";

const navItems = [
  { id: 1, label: "Dashboard", icon: Home, screen: "merchantDashboard" },
  { id: 2, label: "Produtos", icon: Plus, screen: "updatePrices" },
  { id: 3, label: "Análise", icon: BarChart3, screen: "merchantAnalytics" },
  { id: 4, label: "Promoções", icon: Tag, screen: "managePromotions" },
  { id: 5, label: "Perfil", icon: Settings, screen: "merchantProfile" }
];

export function MerchantBottomNav({ currentScreen, onNavigate }: {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-border shadow-lg">
      <div className="flex items-center justify-around h-20 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.screen;

          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.screen)}
              className="flex flex-col items-center justify-center flex-1 py-3 gap-1 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={`p-2 rounded-xl transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "bg-transparent text-muted-foreground hover:bg-accent"
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={2} />
              </div>
              <span
                className={`text-xs font-medium transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="w-1 h-1 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 40 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
