import { motion } from "motion/react";
import { ArrowLeft, MapPin, Star, Clock, Phone, TrendingDown } from "lucide-react";

const bestPrices = [
  { id: 1, product: "Arroz Tio João 5kg", price: 18.90, discount: "20% OFF" },
  { id: 2, product: "Açúcar União 1kg", price: 4.20, discount: "15% OFF" },
  { id: 3, product: "Óleo de Soja Liza 900ml", price: 7.80, discount: "10% OFF" },
  { id: 4, product: "Macarrão Galo 500g", price: 3.50, discount: "25% OFF" }
];

export function MarketDetailsScreen({
  market,
  onBack
}: {
  market: any;
  onBack: () => void;
}) {
  const marketData = market || {
    name: "Supermercado Econômico",
    rating: 4.5,
    distance: "0.8 km",
    address: "Rua das Flores, 123 - Centro",
    phone: "(11) 3456-7890",
    hours: "Seg-Sáb: 7h-22h | Dom: 8h-20h"
  };

  return (
    <div className="h-screen overflow-y-auto bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-primary-dark to-emerald-700 px-6 pt-12 pb-8">
        <button onClick={onBack} className="mb-6 flex items-center gap-2 text-white">
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>

        <div className="text-center">
          <div className="w-20 h-20 bg-white rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <span className="text-3xl">🏪</span>
          </div>
          <h2 className="text-white text-2xl mb-2" style={{ fontFamily: 'Montserrat' }}>
            {marketData.name}
          </h2>
          <div className="flex items-center justify-center gap-4 text-emerald-100">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
              <span>{marketData.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{marketData.distance}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="px-6 -mt-4 mb-6 space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-4 shadow-sm border border-border"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm mb-1">Endereço</p>
              <p className="text-foreground">{marketData.address}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-4 shadow-sm border border-border"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm mb-1">Horário de Funcionamento</p>
              <p className="text-foreground">{marketData.hours}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-4 shadow-sm border border-border"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm mb-1">Telefone</p>
              <p className="text-foreground">{marketData.phone}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Best Prices */}
      <div className="px-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingDown className="w-5 h-5 text-primary" />
          <h3 className="text-foreground">Produtos Mais Baratos</h3>
        </div>
        <div className="space-y-3">
          {bestPrices.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="bg-white rounded-2xl p-4 shadow-sm border border-border flex items-center justify-between"
            >
              <div className="flex-1">
                <p className="text-foreground mb-1">{item.product}</p>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {item.discount}
                </span>
              </div>
              <p className="text-primary text-xl ml-4" style={{ fontFamily: 'Montserrat' }}>
                R$ {item.price.toFixed(2)}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="w-full mt-6 bg-primary text-white py-4 rounded-2xl shadow-lg shadow-primary/25"
        >
          Ver Todos os Produtos
        </motion.button>
      </div>
    </div>
  );
}
