import { motion } from "motion/react";
import { ArrowLeft, TrendingDown, TrendingUp, Minus } from "lucide-react";

const priceHistory = [
  { date: "23/04/2026", price: 18.90, change: "down", market: "Supermercado Econômico" },
  { date: "20/04/2026", price: 19.90, change: "same", market: "Supermercado Econômico" },
  { date: "15/04/2026", price: 19.90, change: "up", market: "Supermercado Econômico" },
  { date: "10/04/2026", price: 18.50, change: "down", market: "Supermercado Econômico" },
  { date: "05/04/2026", price: 20.90, change: "up", market: "Supermercado Econômico" },
  { date: "01/04/2026", price: 19.50, change: "down", market: "Supermercado Econômico" }
];

export function PriceHistoryScreen({ product, onBack }: {
  product: any;
  onBack: () => void;
}) {
  const currentPrice = 18.90;
  const lowestPrice = Math.min(...priceHistory.map(h => h.price));
  const highestPrice = Math.max(...priceHistory.map(h => h.price));
  const avgPrice = priceHistory.reduce((sum, h) => sum + h.price, 0) / priceHistory.length;

  return (
    <div className="h-screen overflow-y-auto bg-background pb-24">
      <div className="bg-gradient-to-br from-primary via-primary-dark to-emerald-700 px-6 pt-12 pb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-white mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>
        <h1 className="text-white text-3xl mb-2" style={{ fontFamily: 'Montserrat' }}>
          Histórico de Preços
        </h1>
        <p className="text-emerald-100">{product?.name || "Arroz Tio João 5kg"}</p>
      </div>

      <div className="px-6 pt-6">
        {/* Price Chart Mock */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-border mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Preço Atual</p>
              <p className="text-primary text-3xl" style={{ fontFamily: 'Montserrat' }}>
                R$ {currentPrice.toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground text-sm mb-1">Últimos 30 dias</p>
              <div className="flex items-center gap-1 text-green-600">
                <TrendingDown className="w-4 h-4" />
                <span className="text-sm">-10%</span>
              </div>
            </div>
          </div>

          {/* Simple Bar Chart Mockup */}
          <div className="space-y-2">
            {priceHistory.slice(0, 6).map((item, index) => {
              const barWidth = ((item.price - lowestPrice) / (highestPrice - lowestPrice)) * 100;
              return (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-16">{item.date.slice(0, 5)}</span>
                  <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${barWidth}%` }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className={`h-full rounded-full ${
                        item.price === currentPrice
                          ? "bg-primary"
                          : item.price === lowestPrice
                          ? "bg-green-500"
                          : "bg-muted-foreground/30"
                      }`}
                    />
                  </div>
                  <span className="text-sm text-foreground w-16 text-right">
                    R$ {item.price.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border text-center">
            <TrendingDown className="w-5 h-5 text-green-600 mx-auto mb-2" />
            <p className="text-muted-foreground text-xs mb-1">Menor</p>
            <p className="text-foreground" style={{ fontFamily: 'Montserrat' }}>
              R$ {lowestPrice.toFixed(2)}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border text-center">
            <Minus className="w-5 h-5 text-blue-600 mx-auto mb-2" />
            <p className="text-muted-foreground text-xs mb-1">Média</p>
            <p className="text-foreground" style={{ fontFamily: 'Montserrat' }}>
              R$ {avgPrice.toFixed(2)}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border text-center">
            <TrendingUp className="w-5 h-5 text-red-600 mx-auto mb-2" />
            <p className="text-muted-foreground text-xs mb-1">Maior</p>
            <p className="text-foreground" style={{ fontFamily: 'Montserrat' }}>
              R$ {highestPrice.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Price Timeline */}
        <div>
          <h3 className="text-foreground mb-4">Histórico Detalhado</h3>
          <div className="space-y-2">
            {priceHistory.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-border"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      item.change === "down"
                        ? "bg-green-50 text-green-600"
                        : item.change === "up"
                        ? "bg-red-50 text-red-600"
                        : "bg-blue-50 text-blue-600"
                    }`}>
                      {item.change === "down" ? (
                        <TrendingDown className="w-5 h-5" />
                      ) : item.change === "up" ? (
                        <TrendingUp className="w-5 h-5" />
                      ) : (
                        <Minus className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <p className="text-foreground text-sm">{item.date}</p>
                      <p className="text-muted-foreground text-xs">{item.market}</p>
                    </div>
                  </div>
                  <p className="text-foreground text-lg" style={{ fontFamily: 'Montserrat' }}>
                    R$ {item.price.toFixed(2)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
