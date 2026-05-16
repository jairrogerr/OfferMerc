import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Percent, Calendar, Toggle2, Trash2 } from "lucide-react";

interface Promotion {
  id: number;
  productName: string;
  normalPrice: number;
  promotionalPrice: number;
  discount: number;
  validUntil: string;
  active: boolean;
}

const initialPromotions: Promotion[] = [
  {
    id: 1,
    productName: "Arroz Tio João 5kg",
    normalPrice: 18.90,
    promotionalPrice: 15.12,
    discount: 20,
    validUntil: "2024-06-30",
    active: true
  },
  {
    id: 2,
    productName: "Feijão Camil 1kg",
    normalPrice: 6.50,
    promotionalPrice: 5.53,
    discount: 15,
    validUntil: "2024-06-25",
    active: true
  },
  {
    id: 3,
    productName: "Café Pilão 500g",
    normalPrice: 12.90,
    promotionalPrice: 9.68,
    discount: 25,
    validUntil: "2024-06-20",
    active: true
  },
  {
    id: 4,
    productName: "Óleo Soya 900ml",
    normalPrice: 5.20,
    promotionalPrice: 4.68,
    discount: 10,
    validUntil: "2024-06-18",
    active: false
  },
  {
    id: 5,
    productName: "Açúcar Cristal 1kg",
    normalPrice: 4.80,
    promotionalPrice: 3.84,
    discount: 20,
    validUntil: "2024-06-28",
    active: true
  }
];

export function ManagePromotionsScreen({ onBack, onNavigate }: {
  onBack: () => void;
  onNavigate?: (screen: string) => void;
}) {
  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions);
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");

  const togglePromotion = (id: number) => {
    setPromotions(promotions.map(p =>
      p.id === id ? { ...p, active: !p.active } : p
    ));
  };

  const deletePromotion = (id: number) => {
    setPromotions(promotions.filter(p => p.id !== id));
  };

  const filteredPromotions = promotions.filter(p => {
    if (filter === "active") return p.active;
    if (filter === "inactive") return !p.active;
    return true;
  });

  const activeCount = promotions.filter(p => p.active).length;
  const totalSavings = promotions.reduce((acc, p) => {
    if (p.active) acc += (p.normalPrice - p.promotionalPrice);
    return acc;
  }, 0);

  return (
    <div className="h-screen overflow-y-auto bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-primary-dark to-emerald-700 px-6 pt-12 pb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-white mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>
        <h1 className="text-white text-3xl mb-2" style={{ fontFamily: 'Montserrat' }}>
          Gerenciar Promoções
        </h1>
        <p className="text-emerald-100">Crie e gerencie suas ofertas especiais</p>
      </div>

      <div className="px-6 -mt-6">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-3 mb-6"
        >
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-border">
            <p className="text-muted-foreground text-xs">Promoções Ativas</p>
            <p className="text-primary text-2xl mt-1" style={{ fontFamily: 'Montserrat' }}>
              {activeCount}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-border">
            <p className="text-muted-foreground text-xs">Economia Total</p>
            <p className="text-green-600 text-2xl mt-1" style={{ fontFamily: 'Montserrat' }}>
              R$ {totalSavings.toFixed(2)}
            </p>
          </div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-6"
        >
          {(["all", "active", "inactive"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                filter === f
                  ? "bg-primary text-white"
                  : "bg-white border border-border text-foreground hover:bg-accent"
              }`}
            >
              {f === "all" ? "Todas" : f === "active" ? "Ativas" : "Inativas"}
            </button>
          ))}
        </motion.div>

        {/* Promotions List */}
        <div className="space-y-3">
          {filteredPromotions.map((promo, index) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`rounded-2xl p-4 shadow-sm border transition-all ${
                promo.active
                  ? "bg-white border-border"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="space-y-3">
                {/* Product Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className={`font-medium ${promo.active ? "text-foreground" : "text-muted-foreground"}`}>
                      {promo.productName}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-lg font-medium">
                        -{promo.discount}%
                      </span>
                      <span className={`text-xs ${promo.active ? "text-muted-foreground" : "text-gray-400"}`}>
                        {promo.normalPrice.toFixed(2)} → R$ {promo.promotionalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Toggle */}
                  <button
                    onClick={() => togglePromotion(promo.id)}
                    className={`relative w-14 h-8 rounded-full transition-colors ${
                      promo.active ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                        promo.active ? "translate-x-7" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Validity and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Válido até {new Date(promo.validUntil).toLocaleDateString("pt-BR")}</span>
                  </div>
                  <button
                    onClick={() => deletePromotion(promo.id)}
                    className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPromotions.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Percent className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">Nenhuma promoção neste filtro</p>
          </motion.div>
        )}

        {/* Add New Promotion Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={() => onNavigate?.("addPromotion")}
          className="w-full mt-6 bg-primary text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-medium transition-all hover:bg-primary-dark active:scale-95"
        >
          <Percent className="w-5 h-5" />
          Nova Promoção
        </motion.button>
      </div>
    </div>
  );
}
