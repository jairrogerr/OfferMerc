import { motion } from "motion/react";
import { ArrowLeft, TrendingUp, Users, Eye, ShoppingCart } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const viewsData = [
  { day: "Seg", views: 240, sales: 24 },
  { day: "Ter", views: 321, sales: 29 },
  { day: "Qua", views: 289, sales: 20 },
  { day: "Qui", views: 200, sales: 12 },
  { day: "Sex", views: 278, sales: 39 },
  { day: "Sab", views: 190, sales: 23 },
  { day: "Dom", views: 239, sales: 34 }
];

const metrics = [
  { id: 1, label: "Visualizações", value: "1.2K", icon: Eye, color: "bg-blue-100 text-blue-600", change: "+12%" },
  { id: 2, label: "Vendas", value: "342", icon: ShoppingCart, color: "bg-green-100 text-green-600", change: "+8%" },
  { id: 3, label: "Clientes Únicos", value: "89", icon: Users, color: "bg-purple-100 text-purple-600", change: "+5%" },
  { id: 4, label: "Crescimento", value: "24%", icon: TrendingUp, color: "bg-orange-100 text-orange-600", change: "+3%" }
];

export function MerchantAnalyticsScreen({ onBack }: {
  onBack: () => void;
}) {
  return (
    <div className="h-screen overflow-y-auto bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-primary-dark to-emerald-700 px-6 pt-12 pb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-white mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>
        <h1 className="text-white text-3xl mb-2" style={{ fontFamily: 'Montserrat' }}>
          Análise de Desempenho
        </h1>
        <p className="text-emerald-100">Acompanhe suas métricas</p>
      </div>

      <div className="px-6 -mt-6">
        {/* Metrics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-3 mb-6"
        >
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-4 shadow-lg border border-border"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${metric.color}`}>
                  <Icon className="w-5 h-5" strokeWidth={2} />
                </div>
                <p className="text-muted-foreground text-xs">{metric.label}</p>
                <div className="flex items-end justify-between mt-2">
                  <p className="text-foreground text-xl font-bold" style={{ fontFamily: 'Montserrat' }}>
                    {metric.value}
                  </p>
                  <span className="text-green-600 text-xs font-medium">{metric.change}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-border mb-6"
        >
          <h3 className="text-foreground font-medium mb-4">Visualizações e Vendas (Última Semana)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={viewsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#999" style={{ fontSize: "12px" }} />
              <YAxis stroke="#999" style={{ fontSize: "12px" }} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#fff", border: "1px solid #ccc", borderRadius: "8px" }}
              />
              <Bar dataKey="views" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="sales" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Time-based Insights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-border"
        >
          <h3 className="text-foreground font-medium mb-4">Insights por Período</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
              <div>
                <p className="text-foreground font-medium text-sm">Manhã (6h-12h)</p>
                <p className="text-muted-foreground text-xs">Melhor período</p>
              </div>
              <div className="text-right">
                <p className="text-blue-600 font-bold">342 vendas</p>
                <p className="text-blue-500 text-xs">48% do total</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
              <div>
                <p className="text-foreground font-medium text-sm">Tarde (12h-18h)</p>
                <p className="text-muted-foreground text-xs">Crescimento +15%</p>
              </div>
              <div className="text-right">
                <p className="text-green-600 font-bold">198 vendas</p>
                <p className="text-green-500 text-xs">28% do total</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
              <div>
                <p className="text-foreground font-medium text-sm">Noite (18h-22h)</p>
                <p className="text-muted-foreground text-xs">Período intermediário</p>
              </div>
              <div className="text-right">
                <p className="text-purple-600 font-bold">159 vendas</p>
                <p className="text-purple-500 text-xs">24% do total</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
