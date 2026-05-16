import { useState } from "react";
import { motion } from "motion/react";
import { Heart, TrendingDown, MapPin, Trash2, ArrowLeft } from "lucide-react";

const initialFavorites = [
  { id: 1, name: "Arroz Tio João 5kg", price: 18.90, market: "Supermercado Econômico", category: "Grãos" },
  { id: 2, name: "Feijão Camil 1kg", price: 6.50, market: "Mercadão Popular", category: "Grãos" },
  { id: 3, name: "Café Pilão 500g", price: 12.90, market: "Rede Bem Mais", category: "Bebidas" }
];

export function FavoritesScreen({ onProductSelect, onBack }: {
  onProductSelect: (product: any) => void;
  onBack: () => void;
}) {
  const [favorites, setFavorites] = useState(initialFavorites);

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };

  return (
    <div className="h-screen overflow-y-auto bg-background pb-24">
      <div className="bg-gradient-to-br from-primary via-primary-dark to-emerald-700 px-6 pt-12 pb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-white mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>
        <h1 className="text-white text-3xl mb-2" style={{ fontFamily: 'Montserrat' }}>
          Favoritos
        </h1>
        <p className="text-emerald-100">{favorites.length} produtos salvos</p>
      </div>

      <div className="px-6 pt-6">
        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Heart className="w-12 h-12 text-muted-foreground" />
            </motion.div>
            <h3 className="text-foreground text-xl mb-2" style={{ fontFamily: 'Montserrat' }}>
              Nenhum Favorito
            </h3>
            <p className="text-muted-foreground mb-2">
              Você ainda não adicionou produtos aos favoritos
            </p>
            <p className="text-muted-foreground text-sm">
              Toque no ❤️ ao visualizar um produto para salvá-lo aqui
            </p>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-border mb-6 flex items-start gap-3">
              <Heart className="w-5 h-5 text-primary fill-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-foreground text-sm mb-1">Produtos favoritos</p>
                <p className="text-muted-foreground text-xs">
                  Acompanhe os preços dos seus produtos preferidos em um só lugar
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {favorites.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-border"
                >
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => onProductSelect(item)}
                      className="flex-1 text-left"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <p className="text-foreground mb-1">{item.name}</p>
                          <p className="text-muted-foreground text-sm">{item.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                        <div className="flex items-center gap-2">
                          <TrendingDown className="w-4 h-4 text-primary" />
                          <span className="text-primary text-lg" style={{ fontFamily: 'Montserrat' }}>
                            R$ {item.price.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span className="max-w-[120px] truncate">{item.market}</span>
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => removeFavorite(item.id)}
                      className="w-10 h-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
