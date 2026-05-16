import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Search, Package, Store, CheckCircle, XCircle, Eye, AlertTriangle, Tag } from "lucide-react";

type ValidationStatus = "pending" | "approved" | "rejected";

interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  merchant: string;
  merchantId: number;
  imageUrl: string;
  submittedBy: string;
  submittedDate: string;
  status: ValidationStatus;
  price?: number;
  barcode?: string;
  notes?: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Leite Integral UHT 1L",
    category: "Laticínios",
    brand: "Marca Premium",
    merchant: "Supermercado Central",
    merchantId: 1,
    imageUrl: "https://via.placeholder.com/120x120/10b981/ffffff?text=Leite",
    submittedBy: "central@supermercado.com",
    submittedDate: "2026-05-14",
    status: "pending",
    price: 5.49,
    barcode: "7891234567890"
  },
  {
    id: 2,
    name: "Arroz Integral Tipo 1 - 5kg",
    category: "Grãos",
    brand: "Tio João",
    merchant: "Mercado Bom Preço",
    merchantId: 2,
    imageUrl: "https://via.placeholder.com/120x120/059669/ffffff?text=Arroz",
    submittedBy: "contato@bompreco.com",
    submittedDate: "2026-05-14",
    status: "pending",
    price: 32.90,
    barcode: "7891234567891",
    notes: "Produto orgânico certificado"
  },
  {
    id: 3,
    name: "Refrigerante Cola 2L",
    category: "Bebidas",
    brand: "Coca-Cola",
    merchant: "Atacadão Silva",
    merchantId: 3,
    imageUrl: "https://via.placeholder.com/120x120/ef4444/ffffff?text=Cola",
    submittedBy: "silva@atacadao.com",
    submittedDate: "2026-05-13",
    status: "approved",
    price: 7.99,
    barcode: "7891234567892"
  },
  {
    id: 4,
    name: "Sabão em Pó 1kg",
    category: "Limpeza",
    brand: "Omo",
    merchant: "Super Família",
    merchantId: 5,
    imageUrl: "https://via.placeholder.com/120x120/3b82f6/ffffff?text=Sabão",
    submittedBy: "contato@superfamilia.com",
    submittedDate: "2026-05-13",
    status: "pending",
    price: 12.50,
    barcode: "7891234567893"
  },
  {
    id: 5,
    name: "Produto Sem Nome Claro",
    category: "Não especificado",
    brand: "Desconhecida",
    merchant: "Mercadinho do José",
    merchantId: 4,
    imageUrl: "https://via.placeholder.com/120x120/6b7280/ffffff?text=???",
    submittedBy: "jose@mercadinho.com",
    submittedDate: "2026-05-12",
    status: "rejected",
    notes: "Informações incompletas"
  }
];

export function ProductValidationScreen({ onBack }: { onBack: () => void }) {
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<ValidationStatus | "all">("pending");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.merchant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || product.status === filter;
    return matchesSearch && matchesFilter;
  });

  const approveProduct = (id: number) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, status: "approved" as ValidationStatus } : product
    ));
    setSelectedProduct(null);
  };

  const rejectProduct = (id: number) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, status: "rejected" as ValidationStatus } : product
    ));
    setSelectedProduct(null);
  };

  const pendingCount = products.filter(p => p.status === "pending").length;

  return (
    <div className="h-screen overflow-y-auto bg-background pb-24">
      <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 px-6 pt-12 pb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-white mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>
        <h1 className="text-white text-3xl mb-2" style={{ fontFamily: 'Montserrat' }}>
          Validação de Produtos
        </h1>
        <p className="text-slate-300">{filteredProducts.length} produtos para revisar</p>
        {pendingCount > 0 && (
          <div className="mt-4 bg-amber-500/20 border border-amber-400/30 rounded-xl px-4 py-3">
            <p className="text-amber-100 text-sm">
              ⚠️ {pendingCount} {pendingCount === 1 ? "produto aguardando" : "produtos aguardando"} validação
            </p>
          </div>
        )}
      </div>

      <div className="px-6 pt-6">
        {/* Search and Filter */}
        <div className="mb-6 space-y-3">
          <div className="relative">
            <Search className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar produto, marca, categoria ou mercado..."
              className="w-full bg-white border border-border rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 ring-slate-700/20"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                filter === "pending"
                  ? "bg-amber-600 text-white"
                  : "bg-white border border-border text-foreground"
              }`}
            >
              Pendentes {pendingCount > 0 && `(${pendingCount})`}
            </button>
            <button
              onClick={() => setFilter("approved")}
              className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                filter === "approved"
                  ? "bg-green-600 text-white"
                  : "bg-white border border-border text-foreground"
              }`}
            >
              Aprovados
            </button>
            <button
              onClick={() => setFilter("rejected")}
              className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                filter === "rejected"
                  ? "bg-red-600 text-white"
                  : "bg-white border border-border text-foreground"
              }`}
            >
              Rejeitados
            </button>
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                filter === "all"
                  ? "bg-slate-700 text-white"
                  : "bg-white border border-border text-foreground"
              }`}
            >
              Todos
            </button>
          </div>
        </div>

        {/* Products List */}
        <div className="space-y-3">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-2xl p-4 shadow-sm border ${
                product.status === "pending" ? "border-amber-200 bg-amber-50/30" :
                product.status === "approved" ? "border-green-200 bg-green-50/30" :
                "border-red-200 bg-red-50/30"
              }`}
            >
              <div className="flex gap-4">
                {/* Product Image */}
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-foreground font-medium">{product.name}</p>
                        {product.status === "pending" && (
                          <div className="px-2 py-0.5 rounded-full text-xs bg-amber-100 text-amber-700 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            Pendente
                          </div>
                        )}
                        {product.status === "approved" && (
                          <div className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-700 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Aprovado
                          </div>
                        )}
                        {product.status === "rejected" && (
                          <div className="px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-700 flex items-center gap-1">
                            <XCircle className="w-3 h-3" />
                            Rejeitado
                          </div>
                        )}
                      </div>
                      <div className="space-y-0.5 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          <span>{product.brand} • {product.category}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Store className="w-3 h-3" />
                          <span>{product.merchant}</span>
                        </div>
                        {product.price && (
                          <div className="flex items-center gap-1">
                            <Package className="w-3 h-3" />
                            <span>Preço: R$ {product.price.toFixed(2)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {product.notes && (
                    <div className="mb-3 px-3 py-2 bg-slate-50 rounded-lg">
                      <p className="text-xs text-muted-foreground">{product.notes}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="text-xs text-muted-foreground">
                      Enviado em {new Date(product.submittedDate).toLocaleDateString('pt-BR')}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {product.status === "pending" && (
                        <>
                          <button
                            onClick={() => approveProduct(product.id)}
                            className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => rejectProduct(product.id)}
                            className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-muted mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum produto encontrado</p>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            className="bg-white rounded-t-3xl w-full max-w-md max-h-[80vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-foreground text-lg font-medium">Detalhes do Produto</h3>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="w-full h-48 rounded-2xl overflow-hidden bg-muted">
                  <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="w-full h-full object-cover" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Nome do Produto</p>
                  <p className="text-foreground font-medium">{selectedProduct.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Marca</p>
                    <p className="text-foreground">{selectedProduct.brand}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Categoria</p>
                    <p className="text-foreground">{selectedProduct.category}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Estabelecimento</p>
                  <p className="text-foreground">{selectedProduct.merchant}</p>
                </div>

                {selectedProduct.price && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Preço</p>
                    <p className="text-foreground text-2xl">R$ {selectedProduct.price.toFixed(2)}</p>
                  </div>
                )}

                {selectedProduct.barcode && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Código de Barras</p>
                    <p className="text-foreground font-mono">{selectedProduct.barcode}</p>
                  </div>
                )}

                {selectedProduct.notes && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Observações</p>
                    <p className="text-foreground">{selectedProduct.notes}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Enviado por</p>
                  <p className="text-foreground text-sm">{selectedProduct.submittedBy}</p>
                  <p className="text-muted-foreground text-xs">
                    {new Date(selectedProduct.submittedDate).toLocaleDateString('pt-BR')}
                  </p>
                </div>

                {selectedProduct.status === "pending" && (
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => approveProduct(selectedProduct.id)}
                      className="flex-1 bg-green-600 text-white rounded-xl py-3 flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Aprovar
                    </button>
                    <button
                      onClick={() => rejectProduct(selectedProduct.id)}
                      className="flex-1 bg-red-600 text-white rounded-xl py-3 flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-5 h-5" />
                      Rejeitar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
