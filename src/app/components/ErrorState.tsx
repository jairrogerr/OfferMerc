import { motion } from "motion/react";
import { WifiOff, AlertCircle, RefreshCw } from "lucide-react";

type ErrorType = "network" | "notfound" | "generic";

export function ErrorState({
  type = "generic",
  title,
  message,
  onRetry
}: {
  type?: ErrorType;
  title?: string;
  message?: string;
  onRetry?: () => void;
}) {
  const errorConfig = {
    network: {
      icon: WifiOff,
      defaultTitle: "Sem Conexão",
      defaultMessage: "Verifique sua conexão com a internet e tente novamente",
      color: "text-orange-500"
    },
    notfound: {
      icon: AlertCircle,
      defaultTitle: "Não Encontrado",
      defaultMessage: "O conteúdo que você procura não está disponível",
      color: "text-blue-500"
    },
    generic: {
      icon: AlertCircle,
      defaultTitle: "Algo deu errado",
      defaultMessage: "Ocorreu um erro inesperado. Tente novamente em alguns instantes",
      color: "text-destructive"
    }
  };

  const config = errorConfig[type];
  const Icon = config.icon;

  return (
    <div className="h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-sm"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className={`w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6 ${config.color}`}
        >
          <Icon className="w-12 h-12" />
        </motion.div>

        <h3 className="text-foreground text-2xl mb-3" style={{ fontFamily: 'Montserrat' }}>
          {title || config.defaultTitle}
        </h3>
        <p className="text-muted-foreground mb-8">
          {message || config.defaultMessage}
        </p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="w-full bg-primary text-white py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
          >
            <RefreshCw className="w-5 h-5" />
            Tentar Novamente
          </button>
        )}
      </motion.div>
    </div>
  );
}

export function EmptyState({
  icon: Icon = AlertCircle,
  title,
  message,
  actionLabel,
  onAction
}: {
  icon?: any;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="text-center py-16 px-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <Icon className="w-12 h-12 text-muted-foreground" />
      </motion.div>

      <h3 className="text-foreground text-xl mb-2" style={{ fontFamily: 'Montserrat' }}>
        {title}
      </h3>
      <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
        {message}
      </p>

      {onAction && actionLabel && (
        <button
          onClick={onAction}
          className="bg-primary text-white px-8 py-3 rounded-xl shadow-lg shadow-primary/25"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
