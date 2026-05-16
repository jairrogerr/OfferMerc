import { motion } from "motion/react";
import { Search, MapPin, Percent, Apple, Coffee, Droplet, Beef, ChevronRight, Heart, Bell } from "lucide-react";

const categories = [
  { id: 1, name: "Hortifruti", icon: Apple, color: "bg-green-100 text-green-600" },
  { id: 2, name: "Bebidas", icon: Coffee, color: "bg-blue-100 text-blue-600" },
  { id: 3, name: "Limpeza", icon: Droplet, color: "bg-purple-100 text-purple-600" },
  { id: 4, name: "Açougue", icon: Beef, color: "bg-red-100 text-red-600" }
];

const offers = [
  { id: 1, product: "Arroz Tio João 5kg", price: "R$ 18,90", market: "Supermercado Econômico", discount: "20% OFF" },
  { id: 2, product: "Feijão Camil 1kg", price: "R$ 6,50", market: "Mercadão Popular", discount: "15% OFF" },
  { id: 3, product: "Café Pilão 500g", price: "R$ 12,90", market: "Rede Bem Mais", discount: "25% OFF" }
];

const nearbyMarkets = [
  { id: 1, name: "Supermercado Econômico", distance: "0.8 km", rating: 4.5 },
  { id: 2, name: "Mercadão Popular", distance: "1.2 km", rating: 4.3 },
  { id: 3, name: "Rede Bem Mais", distance: "1.5 km", rating: 4.7 }
];

export function HomeScreen({ onNavigate, onProductSelect, onMarketSelect }: {
  onNavigate: (screen: string) => void;
  onProductSelect: (product: any) => void;
  onMarketSelect: (market: any) => void;
}) {
  return (
    <div className="h-screen overflow-y-auto bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-primary-dark to-emerald-700 px-6 pt-12 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-emerald-100 text-sm mb-1">Olá, João!</p>
            <h1 className="text-white text-2xl" style={{ fontFamily: 'Montserrat' }}>
              Encontre Ofertas
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate("favorites")}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center"
            >
              <Heart className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => onNavigate("alerts")}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center relative"
            >
              <Bell className="w-5 h-5 text-white" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">2</span>
              </div>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <button
          onClick={() => onNavigate("search")}
          className="w-full bg-white rounded-2xl px-4 py-4 flex items-center gap-3 shadow-lg"
        >
          <Search className="w-5 h-5 text-muted-foreground" />
          <span className="text-muted-foreground">Buscar produtos...</span>
        </button>
      </div>

      {/* Categories */}
      <div className="px-6 mt-6">
        <h3 className="text-foreground mb-4">Categorias</h3>
        <div className="grid grid-cols-4 gap-3">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center gap-2"
              >
                <div className={`w-16 h-16 rounded-2xl ${category.color} flex items-center justify-center`}>
                  <Icon className="w-8 h-8" strokeWidth={2} />
                </div>
                <span className="text-xs text-foreground text-center">{category.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Offers */}
      <div className="px-6 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground">Ofertas em Destaque</h3>
          <button className="text-primary text-sm flex items-center gap-1">
            Ver todas
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {offers.map((offer, index) => (
            <motion.button
              key={offer.id}
              onClick={() => onProductSelect(offer)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="w-full bg-white rounded-2xl p-4 shadow-sm border border-border flex items-center gap-4"
            >
              <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center">
                <Percent className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-foreground mb-1">{offer.product}</p>
                <p className="text-muted-foreground text-sm">{offer.market}</p>
              </div>
              <div className="text-right">
                <p className="text-primary text-lg" style={{ fontFamily: 'Montserrat' }}>
                  {offer.price}
                </p>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {offer.discount}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Nearby Markets */}
      <div className="px-6 mt-8 mb-6">
        <h3 className="text-foreground mb-4">Mercados Próximos</h3>
        <div className="space-y-3">
          {nearbyMarkets.map((market, index) => (
            <motion.button
              key={market.id}
              onClick={() => onMarketSelect(market)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="w-full bg-white rounded-2xl p-4 shadow-sm border border-border flex items-center justify-between"
            >
              <div className="flex-1 text-left">
                <p className="text-foreground mb-1">{market.name}</p>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {market.distance}
                  </span>
                  <span>⭐ {market.rating}</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
