import { useState } from "react";
import { motion } from "motion/react";
import { X, Bell, TrendingDown } from "lucide-react";

export function SetPriceAlertModal({ product, onClose, onConfirm }: {
  product: any;
  onClose: () => void;
  onConfirm: (price: number) => void;
}) {
  const currentPrice = product?.price || 18.90;
  const [targetPrice, setTargetPrice] = useState("");

  const handleConfirm = () => {
    const price = parseFloat(targetPrice);
    if (price > 0 && price < currentPrice) {
      onConfirm(price);
    }
  };

  const suggestedPrices = [
    currentPrice * 0.9,
    currentPrice * 0.8,
    currentPrice * 0.7
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-6 z-50">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-3xl p-6 max-w-sm w-full"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Bell className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-foreground" style={{ fontFamily: 'Montserrat' }}>
                Criar Alerta
              </h3>
              <p className="text-muted-foreground text-sm">{product?.name || "Produto"}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-muted-foreground">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Preço atual:</span>
            <span className="text-foreground text-lg" style={{ fontFamily: 'Montserrat' }}>
              R$ {currentPrice.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <label className="text-foreground text-sm mb-2 block">Notificar quando chegar a:</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
            <input
              type="number"
              step="0.10"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              placeholder="0,00"
              className="w-full bg-input-background border border-border rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 ring-primary/20"
            />
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-2">Sugestões:</p>
          <div className="flex gap-2">
            {suggestedPrices.map((price, i) => (
              <button
                key={i}
                onClick={() => setTargetPrice(price.toFixed(2))}
                className="flex-1 bg-accent/50 hover:bg-accent border border-primary/20 rounded-xl py-2 text-sm"
              >
                <TrendingDown className="w-3 h-3 inline mr-1" />
                R$ {price.toFixed(2)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleConfirm}
            disabled={!targetPrice || parseFloat(targetPrice) >= currentPrice}
            className="w-full bg-primary text-white py-4 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Criar Alerta
          </button>
          <button
            onClick={onClose}
            className="w-full bg-muted text-foreground py-4 rounded-2xl"
          >
            Cancelar
          </button>
        </div>
      </motion.div>
    </div>
  );
}
