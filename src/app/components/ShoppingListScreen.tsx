import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Trash2, Check, Store, TrendingDown } from "lucide-react";

const initialItems = [
  { id: 1, name: "Arroz Tio João 5kg", price: 18.90, market: "Supermercado Econômico", checked: false },
  { id: 2, name: "Feijão Camil 1kg", price: 6.50, market: "Mercadão Popular", checked: false },
  { id: 3, name: "Café Pilão 500g", price: 12.90, market: "Rede Bem Mais", checked: true },
  { id: 4, name: "Açúcar União 1kg", price: 4.20, market: "Supermercado Econômico", checked: false }
];

export function ShoppingListScreen() {
  const [items, setItems] = useState(initialItems);
  const [showInput, setShowInput] = useState(false);
  const [newItem, setNewItem] = useState("");

  const toggleItem = (id: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, {
        id: Date.now(),
        name: newItem,
        price: 0,
        market: "A definir",
        checked: false
      }]);
      setNewItem("");
      setShowInput(false);
    }
  };

  const total = items.reduce((sum, item) => sum + (item.checked ? 0 : item.price), 0);
  const bestMarket = "Supermercado Econômico";

  return (
    <div className="h-screen overflow-y-auto bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-primary-dark to-emerald-700 px-6 pt-12 pb-6">
        <h1 className="text-white text-2xl mb-2" style={{ fontFamily: 'Montserrat' }}>
          Minha Lista
        </h1>
        <p className="text-emerald-100 text-sm">
          {items.filter(i => !i.checked).length} itens pendentes
        </p>
      </div>

      {/* Summary Card */}
      <div className="px-6 -mt-3 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-border"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Total Estimado</p>
              <p className="text-foreground text-3xl" style={{ fontFamily: 'Montserrat' }}>
                R$ {total.toFixed(2)}
              </p>
            </div>
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
              <TrendingDown className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4 border-t border-border">
            <Store className="w-4 h-4" />
            <span>Melhor mercado: <span className="text-primary">{bestMarket}</span></span>
          </div>
        </motion.div>
      </div>

      {/* Items List */}
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground">Produtos</h3>
          <button
            onClick={() => setShowInput(!showInput)}
            className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <AnimatePresence>
          {showInput && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginBottom: 0 }}
              animate={{ height: "auto", opacity: 1, marginBottom: 16 }}
              exit={{ height: 0, opacity: 0, marginBottom: 0 }}
              className="overflow-hidden"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addItem()}
                  placeholder="Nome do produto..."
                  className="flex-1 bg-white rounded-xl px-4 py-3 border border-border outline-none focus:ring-2 ring-primary/20"
                  autoFocus
                />
                <button
                  onClick={addItem}
                  className="px-6 bg-primary text-white rounded-xl"
                >
                  Adicionar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-2">
          <AnimatePresence>
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white rounded-2xl p-4 shadow-sm border border-border transition-opacity ${
                  item.checked ? "opacity-50" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      item.checked
                        ? "bg-primary border-primary"
                        : "border-muted bg-white"
                    }`}
                  >
                    {item.checked && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                  </button>
                  <div className="flex-1">
                    <p className={`text-foreground mb-1 ${item.checked ? "line-through" : ""}`}>
                      {item.name}
                    </p>
                    <p className="text-muted-foreground text-sm">{item.market}</p>
                  </div>
                  <div className="text-right flex items-center gap-3">
                    {item.price > 0 && (
                      <p className="text-primary text-lg" style={{ fontFamily: 'Montserrat' }}>
                        R$ {item.price.toFixed(2)}
                      </p>
                    )}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-8 h-8 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
