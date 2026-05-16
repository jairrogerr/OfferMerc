import { useState } from "react";
import { motion } from "motion/react";
import { Search, SlidersHorizontal, TrendingDown, MapPin, X, Camera } from "lucide-react";

const mockProducts = [
  { id: 1, name: "Arroz Tio João 5kg", category: "Grãos", lowestPrice: "R$ 18,90", market: "Supermercado Econômico" },
  { id: 2, name: "Feijão Camil 1kg", category: "Grãos", lowestPrice: "R$ 6,50", market: "Mercadão Popular" },
  { id: 3, name: "Café Pilão 500g", category: "Bebidas", lowestPrice: "R$ 12,90", market: "Rede Bem Mais" },
  { id: 4, name: "Açúcar União 1kg", category: "Grãos", lowestPrice: "R$ 4,20", market: "Supermercado Econômico" },
  { id: 5, name: "Óleo de Soja Liza 900ml", category: "Óleos", lowestPrice: "R$ 7,80", market: "Mercadão Popular" },
  { id: 6, name: "Leite Integral Piracanjuba 1L", category: "Laticínios", lowestPrice: "R$ 5,30", market: "Rede Bem Mais" }
];

export function SearchScreen({ onProductSelect, onNavigate }: {
  onProductSelect: (product: any) => void;
  onNavigate?: (screen: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = searchTerm
    ? mockProducts.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : mockProducts;

  return (
    <div className="h-screen overflow-y-auto bg-background pb-24">
      {/* Header */}
      <div className="bg-white border-b border-border px-6 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar produtos..."
              className="w-full bg-input-background rounded-2xl pl-12 pr-12 py-4 outline-none focus:ring-2 ring-primary/20"
              autoFocus
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            )}
          </div>
          {onNavigate && (
            <button
              onClick={() => onNavigate("imageSearch")}
              className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center"
            >
              <Camera className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
              showFilters ? "bg-primary text-white" : "bg-input-background text-foreground"
            }`}
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>

        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="space-y-3 overflow-hidden"
          >
            <div className="flex gap-2 flex-wrap">
              <button className="px-4 py-2 rounded-full bg-primary text-white text-sm">
                Menor preço
              </button>
              <button className="px-4 py-2 rounded-full bg-input-background text-foreground text-sm">
                Mais próximo
              </button>
              <button className="px-4 py-2 rounded-full bg-input-background text-foreground text-sm">
                Maior desconto
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Results */}
      <div className="px-6 mt-4">
        {searchTerm && (
          <p className="text-muted-foreground text-sm mb-4">
            {filteredProducts.length} resultado{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        )}

        <div className="space-y-3">
          {filteredProducts.map((product, index) => (
            <motion.button
              key={product.id}
              onClick={() => onProductSelect(product)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="w-full bg-white rounded-2xl p-4 shadow-sm border border-border text-left"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="text-foreground mb-1">{product.name}</p>
                  <p className="text-muted-foreground text-sm">{product.category}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-primary" />
                  <span className="text-primary text-lg" style={{ fontFamily: 'Montserrat' }}>
                    {product.lowestPrice}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span className="max-w-[150px] truncate">{product.market}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {filteredProducts.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-muted mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum produto encontrado</p>
            <p className="text-muted-foreground text-sm mt-1">Tente buscar por outro termo</p>
          </div>
        )}
      </div>
    </div>
  );
}
