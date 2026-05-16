import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Save, Percent, Calendar } from "lucide-react";

export function AddPromotionScreen({ onBack, onSave }: {
  onBack: () => void;
  onSave?: () => void;
}) {
  const [formData, setFormData] = useState({
    productName: "",
    normalPrice: "",
    promotionalPrice: "",
    discountPercentage: "",
    validUntil: "",
    description: ""
  });

  const [saved, setSaved] = useState(false);

  const products = [
    "Arroz Tio João 5kg",
    "Feijão Camil 1kg",
    "Café Pilão 500g",
    "Óleo Soya 900ml",
    "Açúcar Cristal 1kg",
    "Sal Refinado 1kg",
    "Leite Integral 1L",
    "Pão Francês"
  ];

  const calculateDiscount = () => {
    if (formData.normalPrice && formData.promotionalPrice) {
      const normal = parseFloat(formData.normalPrice);
      const promotional = parseFloat(formData.promotionalPrice);
      const percentage = ((normal - promotional) / normal * 100).toFixed(1);
      return percentage;
    }
    return formData.discountPercentage;
  };

  const handleCalculatePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const percentage = parseFloat(e.target.value);
    if (formData.normalPrice && percentage > 0) {
      const normal = parseFloat(formData.normalPrice);
      const promotional = (normal * (1 - percentage / 100)).toFixed(2);
      setFormData({
        ...formData,
        discountPercentage: e.target.value,
        promotionalPrice: promotional
      });
    } else {
      setFormData({ ...formData, discountPercentage: e.target.value });
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      onSave?.();
    }, 1500);
  };

  return (
    <div className="h-screen overflow-y-auto bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-primary-dark to-emerald-700 px-6 pt-12 pb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-white mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>
        <h1 className="text-white text-3xl mb-2" style={{ fontFamily: 'Montserrat' }}>
          Nova Promoção
        </h1>
        <p className="text-emerald-100">Crie uma oferta especial para seus clientes</p>
      </div>

      <div className="px-6 -mt-6">
        {/* Product Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <label className="text-foreground text-sm mb-2 block">Selecione o Produto *</label>
          <select
            value={formData.productName}
            onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
            className="w-full bg-white border border-border rounded-2xl px-4 py-4 outline-none focus:ring-2 ring-primary/20"
          >
            <option value="">Escolha um produto...</option>
            {products.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </motion.div>

        {/* Pricing Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-blue-50 rounded-2xl p-4 mb-6"
        >
          <h3 className="text-foreground font-medium mb-3 flex items-center gap-2">
            <Percent className="w-5 h-5 text-blue-600" />
            Preços e Desconto
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-foreground text-sm mb-2 block">Preço Normal *</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground">R$</span>
                <input
                  type="number"
                  placeholder="0,00"
                  value={formData.normalPrice}
                  onChange={(e) => setFormData({ ...formData, normalPrice: e.target.value, promotionalPrice: "", discountPercentage: "" })}
                  step="0.01"
                  className="w-full bg-white border border-border rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 ring-primary/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-foreground text-sm mb-2 block">Desconto %</label>
                <div className="relative">
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground">%</span>
                  <input
                    type="number"
                    placeholder="0"
                    value={formData.discountPercentage}
                    onChange={handleCalculatePrice}
                    step="1"
                    max="100"
                    className="w-full bg-white border border-border rounded-xl px-4 py-3 pr-8 outline-none focus:ring-2 ring-primary/20"
                  />
                </div>
              </div>

              <div>
                <label className="text-foreground text-sm mb-2 block">Preço Promocional</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground">R$</span>
                  <input
                    type="number"
                    placeholder="0,00"
                    value={formData.promotionalPrice}
                    onChange={(e) => setFormData({ ...formData, promotionalPrice: e.target.value })}
                    step="0.01"
                    className="w-full bg-white border border-border rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 ring-primary/20"
                  />
                </div>
              </div>
            </div>

            {formData.normalPrice && formData.promotionalPrice && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-white rounded-lg p-3 border border-green-200"
              >
                <div className="flex items-center justify-between">
                  <span className="text-green-700 text-sm font-medium">Economia do cliente</span>
                  <span className="text-green-600 font-bold">
                    R$ {(parseFloat(formData.normalPrice) - parseFloat(formData.promotionalPrice)).toFixed(2)}
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Validity Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-purple-50 rounded-2xl p-4 mb-6"
        >
          <h3 className="text-foreground font-medium mb-3 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            Validade
          </h3>
          <div>
            <label className="text-foreground text-sm mb-2 block">Válido até *</label>
            <input
              type="date"
              value={formData.validUntil}
              onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
              className="w-full bg-white border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 ring-primary/20"
            />
          </div>
        </motion.div>

        {/* Description Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <label className="text-foreground text-sm mb-2 block">Descrição da Promoção</label>
          <textarea
            placeholder="Descreva detalhes da promoção (ex: 'Leve 3 e pague 2', 'Só hoje')"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-white border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 ring-primary/20 resize-none h-20"
          />
        </motion.div>

        {/* Save Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={handleSave}
          disabled={!formData.productName || !formData.normalPrice || !formData.promotionalPrice || !formData.validUntil}
          className="w-full bg-primary text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-medium transition-all hover:bg-primary-dark active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-5 h-5" />
          {saved ? "Promoção Criada!" : "Criar Promoção"}
        </motion.button>
      </div>
    </div>
  );
}
