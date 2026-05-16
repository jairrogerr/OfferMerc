import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Upload, Save, Image as ImageIcon } from "lucide-react";

export function AddProductScreen({ onBack, onSave }: {
  onBack: () => void;
  onSave?: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "Hortifruti",
    normalPrice: "",
    promotionalPrice: "",
    promotionExpiry: "",
    description: ""
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const categories = [
    "Hortifruti",
    "Bebidas",
    "Limpeza",
    "Açougue",
    "Laticínios",
    "Congelados",
    "Padaria",
    "Mercearia"
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
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
          Novo Produto
        </h1>
        <p className="text-emerald-100">Cadastre um produto para venda</p>
      </div>

      <div className="px-6 -mt-6">
        {/* Image Upload */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <label className="block">
            <div className="bg-white rounded-2xl border-2 border-dashed border-border p-8 text-center cursor-pointer hover:bg-accent transition-colors">
              {imagePreview ? (
                <div className="flex flex-col items-center gap-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setImagePreview(null);
                    }}
                    className="text-sm text-primary hover:underline"
                  >
                    Mudar imagem
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-foreground font-medium">Upload de Imagem</p>
                  <p className="text-muted-foreground text-sm">PNG, JPG até 5MB</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </label>
        </motion.div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Name */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            <label className="text-foreground text-sm mb-2 block">Nome do Produto *</label>
            <input
              type="text"
              placeholder="Ex: Arroz Tio João 5kg"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-white border border-border rounded-2xl px-4 py-4 outline-none focus:ring-2 ring-primary/20"
            />
          </motion.div>

          {/* Brand */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
            <label className="text-foreground text-sm mb-2 block">Marca</label>
            <input
              type="text"
              placeholder="Ex: Tio João"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              className="w-full bg-white border border-border rounded-2xl px-4 py-4 outline-none focus:ring-2 ring-primary/20"
            />
          </motion.div>

          {/* Category */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <label className="text-foreground text-sm mb-2 block">Categoria *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-white border border-border rounded-2xl px-4 py-4 outline-none focus:ring-2 ring-primary/20"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </motion.div>

          {/* Description */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
            <label className="text-foreground text-sm mb-2 block">Descrição</label>
            <textarea
              placeholder="Descrição do produto"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-white border border-border rounded-2xl px-4 py-4 outline-none focus:ring-2 ring-primary/20 resize-none h-20"
            />
          </motion.div>

          {/* Prices Section */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <div className="bg-blue-50 rounded-2xl p-4 mb-4">
              <h3 className="text-foreground font-medium mb-3">Preços</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-foreground text-sm mb-2 block">Preço Normal *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground">R$</span>
                    <input
                      type="number"
                      placeholder="0,00"
                      value={formData.normalPrice}
                      onChange={(e) => setFormData({ ...formData, normalPrice: e.target.value })}
                      className="w-full bg-white border border-border rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 ring-primary/20"
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
                      className="w-full bg-white border border-border rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 ring-primary/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-foreground text-sm mb-2 block">Válido até</label>
                  <input
                    type="date"
                    value={formData.promotionExpiry}
                    onChange={(e) => setFormData({ ...formData, promotionExpiry: e.target.value })}
                    className="w-full bg-white border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 ring-primary/20"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Save Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={handleSave}
          className="w-full mt-6 bg-primary text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-medium transition-all hover:bg-primary-dark active:scale-95"
        >
          <Save className="w-5 h-5" />
          {saved ? "Produto Salvo!" : "Salvar Produto"}
        </motion.button>
      </div>
    </div>
  );
}
