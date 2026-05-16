import { motion } from "motion/react";
import { Users, Store, Package, AlertCircle, TrendingUp, Eye, ChevronRight, Bell } from "lucide-react";

const stats = [
  { id: 1, label: "Total de Usuários", value: "12,453", change: "+12%", icon: Users, color: "bg-blue-50 text-blue-600", trend: "up" },
  { id: 2, label: "Mercados Cadastrados", value: "248", change: "+5%", icon: Store, color: "bg-green-50 text-green-600", trend: "up" },
  { id: 3, label: "Produtos Cadastrados", value: "38,691", change: "+18%", icon: Package, color: "bg-purple-50 text-purple-600", trend: "up" },
  { id: 4, label: "Validações Pendentes", value: "47", change: "-3%", icon: AlertCircle, color: "bg-amber-50 text-amber-600", trend: "down" }
];

const pendingActions = [
  { id: 1, type: "Validação de Produto", description: "Leite Integral Marca X - 1L", time: "há 5 min", priority: "high" },
  { id: 2, type: "Novo Mercado", description: "Supermercado Central - Campinas/SP", time: "há 15 min", priority: "medium" },
  { id: 3, type: "Denúncia", description: "Preço incorreto reportado", time: "há 1 hora", priority: "high" },
  { id: 4, type: "Validação de Produto", description: "Arroz Premium 5kg", time: "há 2 horas", priority: "low" }
];

const quickActions = [
  { id: 1, label: "Validar Produtos", icon: Package, screen: "productValidation", count: 47 },
  { id: 2, label: "Gerenciar Usuários", icon: Users, screen: "userManagement", count: 0 },
  { id: 3, label: "Aprovar Mercados", icon: Store, screen: "merchantManagement", count: 12 },
  { id: 4, label: "Ver Relatórios", icon: TrendingUp, screen: "reports", count: 0 }
];

export function AdminDashboard({ onNavigate }: { onNavigate?: (screen: string) => void }) {
  return (
    <div className="h-screen overflow-y-auto bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 px-6 pt-12 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-slate-300 text-sm mb-1">Painel Administrativo</p>
            <h1 className="text-white text-2xl" style={{ fontFamily: 'Montserrat' }}>
              Dashboard Admin
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center relative">
              <Bell className="w-5 h-5 text-white" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">3</span>
              </div>
            </button>
            <button
              onClick={() => onNavigate && onNavigate("adminSettings")}
              className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center"
            >
              <Eye className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    stat.trend === "up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-foreground text-2xl mb-1" style={{ fontFamily: 'Montserrat' }}>
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-xs">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mt-6">
        <h3 className="text-foreground mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.id}
                onClick={() => onNavigate && onNavigate(action.screen)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-border rounded-2xl p-4 text-left relative"
              >
                {action.count > 0 && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">{action.count}</span>
                  </div>
                )}
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-slate-700" />
                </div>
                <p className="text-foreground text-sm">{action.label}</p>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Pending Actions */}
      <div className="px-6 mt-8 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground">Ações Pendentes</h3>
          <button className="text-slate-700 text-sm flex items-center gap-1">
            Ver todas
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {pendingActions.map((action, index) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl p-4 shadow-sm border border-border"
            >
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  action.priority === "high" ? "bg-red-500" :
                  action.priority === "medium" ? "bg-amber-500" :
                  "bg-green-500"
                }`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-foreground text-sm">{action.type}</p>
                    {action.priority === "high" && (
                      <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full">
                        Urgente
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-xs mb-2">{action.description}</p>
                  <p className="text-muted-foreground text-xs">{action.time}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
