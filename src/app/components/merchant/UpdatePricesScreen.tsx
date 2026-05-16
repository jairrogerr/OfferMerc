import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, TrendingUp, Check, Clock } from "lucide-react";

interface Product {
  id: number;
  name: string;
  currentPrice: number;
  newPrice?: number;
  lastUpdate: string;
  edited?: boolean;
}

const initialProducts: Product[] = [
  { id: 1, name: "Arroz Tio João 5kg", currentPrice: 18.90, lastUpdate: "há 2h" },
  { id: 2, name: "Feijão Camil 1kg", currentPrice: 6.50, lastUpdate: "há 4h" },
  { id: 3, name: "Café Pilão 500g", currentPrice: 12.90, lastUpdate: "há 1h" },
  { id: 4, name: "Óleo Soya 900ml", currentPrice: 5.20, lastUpdate: "ontem" },
  { id: 5, name: "Açúcar Cristal 1kg", currentPrice: 4.80, lastUpdate: "há 3h" },
  { id: 6, name: "Sal Refinado 1kg", currentPrice: 3.50, lastUpdate: "há 6h" }
];

export function UpdatePricesScreen({ onBack }: {
  onBack: () => void;
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [savedCount, setSavedCount] = useState(0);

  const handlePriceChange = (id: number, newPrice: string) => {
    setProducts(products.map(p => 
      p.id === id 
        ? { ...p, newPrice: parseFloat(newPrice) || 0, edited: true }
        : p
    ));
  };

  const handleSavePrice = (id: number) => {
    setProducts(products.map(p =>
      p.id === id
        ? { ...p, currentPrice: p.newPrice || p.currentPrice, edited: false, lastUpdate: "agora" }
        : p
    ));
    setSavedCount(savedCount + 1);
  };

  const handleSaveAll = () => {
    setProducts(products.map(p => ({
      ...p,
      currentPrice: p.newPrice || p.currentPrice,
      edited: false,
      lastUpdate: "agora"
    })));
    setSavedCount(products.length);
  };

  const editedCount = products.filter(p => p.edited).length;

  return (
    <div className="h-screen overflow-y-auto bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-primary-dark to-emerald-700 px-6 pt-12 pb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-white mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>
        <h1 className="text-white text-3xl mb-2" style={{ fontFamily: 'Montserrat' }}>
          Atualizar Preços
        </h1>
        <p className="text-emerald-100">Gerencie os preços de seus produtos</p>
      </div>

      <div className="px-6 -mt-6">
        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 rounded-2xl p-4 mb-6 border border-blue-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground font-medium text-sm">Alterações Pendentes</p>
              <p className="text-muted-foreground text-xs mt-1">{editedCount} produto(s) aguardando confirmação</p>
            </div>
            <div className="text-2xl font-bold text-blue-600" style={{ fontFamily: 'Montserrat' }}>
              {editedCount}
            </div>
          </div>
        </motion.div>

        {/* Products List */}
        <div className="space-y-3">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-2xl p-4 shadow-sm border border-border transition-all ${
                product.edited ? "border-orange-300 bg-orange-50/50" : ""
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-foreground font-medium">{product.name}</p>
                    <p className="text-muted-foreground text-xs flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" /> {product.lastUpdate}
                    </p>
                  </div>
                  {product.edited && (
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                  )}
                </div>

                {/* Price Input */}
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <label className="text-muted-foreground text-xs mb-1 block">
                      Preço Atual
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                      <input
                        type="number"
                        value={product.newPrice ?? product.currentPrice}
                        onChange={(e) => handlePriceChange(product.id, e.target.value)}
                        step="0.01"
                        className={`w-full bg-white border rounded-xl pl-8 pr-3 py-2 text-sm outline-none focus:ring-2 ring-primary/20 ${
                          product.edited ? "border-orange-300" : "border-border"
                        }`}
                      />
                    </div>
                  </div>

                  {product.edited ? (
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      onClick={() => handleSavePrice(product.id)}
                      className="bg-green-500 text-white rounded-xl p-2 hover:bg-green-600 transition-colors"
                    >
                      <Check className="w-5 h-5" />
                    </motion.button>
                  ) : (
                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                      <Check className="w-5 h-5 text-green-500" />
                    </div>
                  )}
                </div>

                {product.edited && product.newPrice && (
                  <div className="bg-blue-100 rounded-lg p-2 text-xs text-blue-700">
                    Diferença: {product.newPrice > product.currentPrice ? "+" : ""}{(product.newPrice - product.currentPrice).toFixed(2)}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Save All Button */}
        {editedCount > 0 && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleSaveAll}
            className="w-full mt-6 bg-primary text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-medium transition-all hover:bg-primary-dark active:scale-95"
          >
            <Check className="w-5 h-5" />
            Salvar {editedCount} Alteração{editedCount !== 1 ? "s" : ""}
          </motion.button>
        )}

        {/* Saved Feedback */}
        {savedCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3"
          >
            <Check className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-green-700 font-medium text-sm">{savedCount} preço(s) atualizado(s)</p>
              <p className="text-green-600 text-xs">Os clientes verão as atualizações em tempo real</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
