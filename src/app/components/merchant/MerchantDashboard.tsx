import { motion } from "motion/react";
import { Package, Percent, TrendingUp, ChevronRight, Plus, Settings, AlertCircle } from "lucide-react";

const dashboardStats = [
  { id: 1, label: "Produtos", value: "24", icon: Package, color: "bg-blue-100 text-blue-600" },
  { id: 2, label: "Promoções Ativas", value: "8", icon: Percent, color: "bg-green-100 text-green-600" },
  { id: 3, label: "Visualizações", value: "1.2K", icon: TrendingUp, color: "bg-purple-100 text-purple-600" }
];

const recentUpdates = [
  { id: 1, title: "Arroz Tio João 5kg", action: "Preço atualizado", time: "há 2h", status: "success" },
  { id: 2, title: "Feijão Camil 1kg", action: "Adicionado à promoção", time: "há 1h", status: "success" },
  { id: 3, title: "Café Pilão 500g", action: "Pendente de validação", time: "há 30m", status: "pending" }
];

const quickActions = [
  { id: 1, label: "Novo Produto", icon: Plus, color: "bg-blue-500 text-white", screen: "addProduct" },
  { id: 2, label: "Atualizar Preços", icon: TrendingUp, color: "bg-green-500 text-white", screen: "updatePrices" },
  { id: 3, label: "Promoções", icon: Percent, color: "bg-purple-500 text-white", screen: "managePromotions" },
  { id: 4, label: "Validações", icon: AlertCircle, color: "bg-orange-500 text-white", screen: "pendingValidation" }
];

export function MerchantDashboard({ onNavigate }: { onNavigate?: (screen: string) => void }) {
  return (
    <div className="h-screen overflow-y-auto bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-primary-dark to-emerald-700 px-6 pt-12 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-emerald-100 text-sm mb-1">Bem-vindo,</p>
            <h1 className="text-white text-2xl" style={{ fontFamily: 'Montserrat' }}>
              Supermercado Econômico
            </h1>
          </div>
          <button
            onClick={() => onNavigate?.("merchantProfile")}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center"
          >
            <Settings className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-6 -mt-4 mb-6">
        <div className="grid grid-cols-3 gap-3">
          {dashboardStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-4 shadow-lg border border-border text-center"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color} mx-auto mb-2`}>
                  <Icon className="w-5 h-5" strokeWidth={2} />
                </div>
                <p className="text-foreground text-xl" style={{ fontFamily: 'Montserrat' }}>
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-xs">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mb-6">
        <h3 className="text-foreground mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onNavigate?.(action.screen)}
                className={`${action.color} rounded-2xl p-4 flex flex-col items-center gap-2 shadow-lg transition-transform hover:scale-105 active:scale-95`}
              >
                <Icon className="w-6 h-6" strokeWidth={2} />
                <span className="text-xs text-center font-medium">{action.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Recent Updates */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground">Atualizações Recentes</h3>
          <button className="text-primary text-sm flex items-center gap-1">
            Ver Tudo <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {recentUpdates.map((update, index) => (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-4 shadow-sm border border-border"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-foreground font-medium">{update.title}</p>
                  <p className="text-muted-foreground text-sm">{update.action}</p>
                </div>
                <div className="text-right">
                  <div className={`w-2 h-2 rounded-full mx-auto mb-1 ${
                    update.status === "success" ? "bg-green-500" : "bg-orange-500"
                  }`} />
                  <p className="text-muted-foreground text-xs">{update.time}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
