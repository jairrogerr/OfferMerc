import { motion } from "motion/react";
import { ArrowLeft, MapPin, Star, TrendingDown, Store } from "lucide-react";

const marketPrices = [
  { id: 1, market: "Supermercado Econômico", price: 18.90, distance: "0.8 km", rating: 4.5, isLowest: true },
  { id: 2, market: "Mercadão Popular", price: 21.50, distance: "1.2 km", rating: 4.3, isLowest: false },
  { id: 3, market: "Rede Bem Mais", price: 19.90, distance: "1.5 km", rating: 4.7, isLowest: false },
  { id: 4, market: "Hipermercado Total", price: 22.90, distance: "2.1 km", rating: 4.2, isLowest: false },
  { id: 5, market: "Mercado da Vila", price: 20.50, distance: "1.8 km", rating: 4.6, isLowest: false }
];

export function ProductComparisonScreen({
  product,
  onBack
}: {
  product: any;
  onBack: () => void;
}) {
  return (
    <div className="h-screen overflow-y-auto bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-primary-dark to-emerald-700 px-6 pt-12 pb-8">
        <button onClick={onBack} className="mb-6 flex items-center gap-2 text-white">
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
          <div className="w-24 h-24 bg-white rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Store className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-white text-xl mb-2" style={{ fontFamily: 'Montserrat' }}>
            {product?.name || "Arroz Tio João 5kg"}
          </h2>
          <div className="flex items-center justify-center gap-2 text-emerald-100 text-sm">
            <TrendingDown className="w-4 h-4" />
            <span>Economia de até R$ 4,00</span>
          </div>
        </div>
      </div>

      {/* Best Price Card */}
      <div className="px-6 -mt-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/80 text-sm">Melhor Preço</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-white text-xs">
              Menor preço
            </span>
          </div>
          <p className="text-white text-4xl mb-2" style={{ fontFamily: 'Montserrat' }}>
            R$ {marketPrices[0].price.toFixed(2)}
          </p>
          <div className="flex items-center justify-between text-white/90">
            <span>{marketPrices[0].market}</span>
            <div className="flex items-center gap-1 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{marketPrices[0].distance}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* All Prices */}
      <div className="px-6">
        <h3 className="text-foreground mb-4">Comparar em Outros Mercados</h3>
        <div className="space-y-3">
          {marketPrices.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-2xl p-4 shadow-sm border ${
                item.isLowest ? "border-primary ring-2 ring-primary/20" : "border-border"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-foreground">{item.market}</p>
                    {item.isLowest && (
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                        Melhor
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {item.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {item.rating}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-2xl ${item.isLowest ? "text-primary" : "text-foreground"}`} style={{ fontFamily: 'Montserrat' }}>
                    R$ {item.price.toFixed(2)}
                  </p>
                  {!item.isLowest && (
                    <p className="text-xs text-muted-foreground mt-1">
                      +R$ {(item.price - marketPrices[0].price).toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
