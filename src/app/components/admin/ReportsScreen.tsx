import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, TrendingUp, Users, Store, Package, Calendar, Download, BarChart3 } from "lucide-react";

type TimeRange = "7d" | "30d" | "90d" | "1y";

interface ChartData {
  label: string;
  value: number;
  percentage: number;
}

const userGrowthData: Record<TimeRange, ChartData[]> = {
  "7d": [
    { label: "Dom", value: 45, percentage: 45 },
    { label: "Seg", value: 67, percentage: 67 },
    { label: "Ter", value: 89, percentage: 89 },
    { label: "Qua", value: 72, percentage: 72 },
    { label: "Qui", value: 95, percentage: 95 },
    { label: "Sex", value: 100, percentage: 100 },
    { label: "Sáb", value: 82, percentage: 82 }
  ],
  "30d": [
    { label: "Sem 1", value: 234, percentage: 65 },
    { label: "Sem 2", value: 312, percentage: 87 },
    { label: "Sem 3", value: 289, percentage: 80 },
    { label: "Sem 4", value: 358, percentage: 100 }
  ],
  "90d": [
    { label: "Jan", value: 1250, percentage: 78 },
    { label: "Fev", value: 1420, percentage: 89 },
    { label: "Mar", value: 1598, percentage: 100 }
  ],
  "1y": [
    { label: "Q1", value: 3240, percentage: 70 },
    { label: "Q2", value: 4120, percentage: 89 },
    { label: "Q3", value: 4580, percentage: 99 },
    { label: "Q4", value: 4632, percentage: 100 }
  ]
};

const topProducts = [
  { name: "Arroz Branco 5kg", views: 5234, merchants: 45 },
  { name: "Feijão Preto 1kg", views: 4876, merchants: 38 },
  { name: "Óleo de Soja 900ml", views: 4521, merchants: 42 },
  { name: "Açúcar Cristal 1kg", views: 3892, merchants: 35 },
  { name: "Café Torrado 500g", views: 3654, merchants: 29 }
];

const topMerchants = [
  { name: "Supermercado Central", products: 1247, rating: 4.8 },
  { name: "Atacadão Silva", products: 523, rating: 4.2 },
  { name: "Super Família", products: 412, rating: 4.5 },
  { name: "Mercado Bom Preço", products: 298, rating: 4.1 },
  { name: "Hiper Compras", products: 267, rating: 4.3 }
];

export function ReportsScreen({ onBack }: { onBack: () => void }) {
  const [timeRange, setTimeRange] = useState<TimeRange>("30d");

  const currentData = userGrowthData[timeRange];
  const maxValue = Math.max(...currentData.map(d => d.value));

  const stats = [
    { label: "Novos Usuários", value: "+1,284", change: "+18%", icon: Users, color: "text-blue-600" },
    { label: "Novos Mercados", value: "+23", change: "+12%", icon: Store, color: "text-green-600" },
    { label: "Produtos Adicionados", value: "+2,847", change: "+24%", icon: Package, color: "text-purple-600" },
    { label: "Taxa de Aprovação", value: "94%", change: "+5%", icon: TrendingUp, color: "text-amber-600" }
  ];

  return (
    <div className="h-screen overflow-y-auto bg-background pb-24">
      <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 px-6 pt-12 pb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-white mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-white text-3xl mb-2" style={{ fontFamily: 'Montserrat' }}>
              Relatórios
            </h1>
            <p className="text-slate-300">Análises e métricas do sistema</p>
          </div>
          <button className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Download className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setTimeRange("7d")}
            className={`px-4 py-2 rounded-xl text-sm transition-colors whitespace-nowrap ${
              timeRange === "7d" ? "bg-white text-slate-900" : "bg-white/10 text-white"
            }`}
          >
            7 dias
          </button>
          <button
            onClick={() => setTimeRange("30d")}
            className={`px-4 py-2 rounded-xl text-sm transition-colors whitespace-nowrap ${
              timeRange === "30d" ? "bg-white text-slate-900" : "bg-white/10 text-white"
            }`}
          >
            30 dias
          </button>
          <button
            onClick={() => setTimeRange("90d")}
            className={`px-4 py-2 rounded-xl text-sm transition-colors whitespace-nowrap ${
              timeRange === "90d" ? "bg-white text-slate-900" : "bg-white/10 text-white"
            }`}
          >
            90 dias
          </button>
          <button
            onClick={() => setTimeRange("1y")}
            className={`px-4 py-2 rounded-xl text-sm transition-colors whitespace-nowrap ${
              timeRange === "1y" ? "bg-white text-slate-900" : "bg-white/10 text-white"
            }`}
          >
            1 ano
          </button>
        </div>
      </div>

      <div className="px-6 pt-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-4 border border-border"
              >
                <Icon className={`w-6 h-6 ${stat.color} mb-2`} />
                <p className="text-foreground text-2xl mb-1" style={{ fontFamily: 'Montserrat' }}>
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-xs mb-1">{stat.label}</p>
                <span className="text-green-600 text-xs">{stat.change}</span>
              </motion.div>
            );
          })}
        </div>

        {/* User Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 border border-border"
        >
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-slate-700" />
            <h3 className="text-foreground font-medium">Crescimento de Usuários</h3>
          </div>

          <div className="flex items-end justify-between gap-2 h-48">
            {currentData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end justify-center h-40">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${item.percentage}%` }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="w-full bg-gradient-to-t from-slate-700 to-slate-500 rounded-t-lg relative group"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {item.value}
                    </div>
                  </motion.div>
                </div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 border border-border"
        >
          <h3 className="text-foreground font-medium mb-4">Produtos Mais Buscados</h3>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-foreground text-sm">{product.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {product.views.toLocaleString()} visualizações • {product.merchants} mercados
                  </p>
                </div>
                <div className="w-12 h-6 bg-slate-100 rounded-full flex items-center justify-center">
                  <span className="text-slate-700 text-xs font-medium">#{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Merchants */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 border border-border"
        >
          <h3 className="text-foreground font-medium mb-4">Mercados Mais Ativos</h3>
          <div className="space-y-3">
            {topMerchants.map((merchant, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">#{index + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="text-foreground text-sm">{merchant.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {merchant.products} produtos
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-amber-500">⭐</span>
                  <span className="text-foreground text-sm">{merchant.rating.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-6 text-white"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5" />
            <h3 className="font-medium">Resumo do Período</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-slate-300 text-sm mb-1">Total de Interações</p>
              <p className="text-2xl" style={{ fontFamily: 'Montserrat' }}>127,8k</p>
            </div>
            <div>
              <p className="text-slate-300 text-sm mb-1">Tempo Médio no App</p>
              <p className="text-2xl" style={{ fontFamily: 'Montserrat' }}>8min 32s</p>
            </div>
            <div>
              <p className="text-slate-300 text-sm mb-1">Taxa de Retenção</p>
              <p className="text-2xl" style={{ fontFamily: 'Montserrat' }}>68%</p>
            </div>
            <div>
              <p className="text-slate-300 text-sm mb-1">Usuários Ativos Diários</p>
              <p className="text-2xl" style={{ fontFamily: 'Montserrat' }}>4,2k</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
