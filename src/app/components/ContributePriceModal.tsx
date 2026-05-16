import { useState } from "react";
import { motion } from "motion/react";
import { X, DollarSign, MapPin, Calendar, CheckCircle } from "lucide-react";

export function ContributePriceModal({ product, onClose, onSubmit }: {
  product: any;
  onClose: () => void;
  onSubmit: (data: any) => void;
}) {
  const [price, setPrice] = useState("");
  const [market, setMarket] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const markets = [
    "Supermercado Econômico",
    "Mercadão Popular",
    "Rede Bem Mais",
    "Hipermercado Total",
    "Mercado da Vila"
  ];

  const handleSubmit = () => {
    if (price && market) {
      setSubmitted(true);
      setTimeout(() => {
        onSubmit({ price: parseFloat(price), market });
      }, 1500);
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 max-w-sm w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle className="w-10 h-10 text-primary" />
          </motion.div>
          <h3 className="text-foreground text-2xl mb-2" style={{ fontFamily: 'Montserrat' }}>
            Obrigado!
          </h3>
          <p className="text-muted-foreground mb-6">
            Sua contribuição ajuda a comunidade a encontrar os melhores preços
          </p>
          <button
            onClick={onClose}
            className="w-full bg-primary text-white py-4 rounded-2xl"
          >
            Fechar
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-6 z-50">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-3xl p-6 max-w-sm w-full"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-foreground text-xl mb-1" style={{ fontFamily: 'Montserrat' }}>
              Informar Preço
            </h3>
            <p className="text-muted-foreground text-sm">{product?.name || "Produto"}</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-accent/50 border border-primary/20 rounded-xl p-3 mb-6 flex items-start gap-2">
          <span className="text-lg">💚</span>
          <p className="text-sm text-foreground">
            Ajude a comunidade compartilhando preços que você encontrou
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="text-foreground text-sm mb-2 block">Preço encontrado</label>
            <div className="relative">
              <DollarSign className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0,00"
                className="w-full bg-input-background border border-border rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 ring-primary/20"
              />
            </div>
          </div>

          <div>
            <label className="text-foreground text-sm mb-2 block">Mercado</label>
            <div className="relative">
              <MapPin className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={market}
                onChange={(e) => setMarket(e.target.value)}
                className="w-full bg-input-background border border-border rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 ring-primary/20 appearance-none"
              >
                <option value="">Selecione o mercado</option>
                {markets.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Data: Hoje, {new Date().toLocaleDateString('pt-BR')}</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleSubmit}
            disabled={!price || !market}
            className="w-full bg-primary text-white py-4 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Enviar Preço
          </button>
          <button
            onClick={onClose}
            className="w-full bg-muted text-foreground py-4 rounded-2xl"
          >
            Cancelar
          </button>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-4">
          Sua contribuição será verificada antes de ser publicada
        </p>
      </motion.div>
    </div>
  );
}
