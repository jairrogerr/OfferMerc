import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Store, Shield, ChevronDown } from "lucide-react";

type AppMode = "customer" | "merchant" | "admin";

interface ModeToggleProps {
  currentMode: AppMode;
  onModeChange: (mode: AppMode) => void;
}

export function ModeToggle({ currentMode, onModeChange }: ModeToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  const modes = [
    { id: "customer" as AppMode, icon: User, label: "Cliente", color: "text-green-600 bg-green-50" },
    { id: "merchant" as AppMode, icon: Store, label: "Estabelecimento", color: "text-blue-600 bg-blue-50" },
    { id: "admin" as AppMode, icon: Shield, label: "Administrador", color: "text-slate-700 bg-slate-100" }
  ];

  const currentModeData = modes.find(m => m.id === currentMode) || modes[0];
  const CurrentIcon = currentModeData.icon;

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg ${currentModeData.color} transition-all`}
      >
        <CurrentIcon className="w-4 h-4" />
        <span className="text-sm font-medium">{currentModeData.label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-border overflow-hidden z-50"
            >
              {modes.map((mode) => {
                const Icon = mode.icon;
                const isActive = currentMode === mode.id;

                return (
                  <button
                    key={mode.id}
                    onClick={() => {
                      onModeChange(mode.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                      isActive
                        ? `${mode.color} font-medium`
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <div className="flex-1 text-left">
                      <p className="text-sm">{mode.label}</p>
                    </div>
                    {isActive && (
                      <div className="w-2 h-2 rounded-full bg-current" />
                    )}
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
