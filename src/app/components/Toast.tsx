import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

export interface ToastProps {
  show: boolean;
  type: ToastType;
  message: string;
  onClose: () => void;
}

export function Toast({ show, type, message, onClose }: ToastProps) {
  const config = {
    success: {
      icon: CheckCircle,
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-800",
      iconColor: "text-green-600"
    },
    error: {
      icon: AlertCircle,
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-800",
      iconColor: "text-red-600"
    },
    info: {
      icon: Info,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-800",
      iconColor: "text-blue-600"
    }
  };

  const { icon: Icon, bgColor, borderColor, textColor, iconColor } = config[type];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 max-w-sm w-full px-6"
        >
          <div className={`${bgColor} border ${borderColor} rounded-2xl p-4 shadow-lg flex items-start gap-3`}>
            <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5`} />
            <p className={`flex-1 text-sm ${textColor}`}>{message}</p>
            <button onClick={onClose} className={`${textColor} opacity-50 hover:opacity-100`}>
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Action Feedback Component
export function ActionFeedback({ show, message }: { show: boolean; message: string }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
        >
          <div className="bg-foreground/90 text-background px-6 py-4 rounded-2xl shadow-2xl">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6" />
              <p className="text-lg">{message}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
