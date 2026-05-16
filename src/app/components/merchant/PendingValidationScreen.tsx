import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";

interface PendingProduct {
  id: number;
  name: string;
  submittedDate: string;
  status: "pending" | "approved" | "rejected";
  category: string;
  reason?: string;
}

const initialProducts: PendingProduct[] = [
  {
    id: 1,
    name: "Arroz Tio João 5kg",
    submittedDate: "2024-06-15",
    status: "approved",
    category: "Mercearia",
    reason: "Validado com sucesso"
  },
  {
    id: 2,
    name: "Feijão Camil 1kg",
    submittedDate: "2024-06-16",
    status: "pending",
    category: "Mercearia"
  },
  {
    id: 3,
    name: "Café Pilão 500g",
    submittedDate: "2024-06-17",
    status: "pending",
    category: "Mercearia"
  },
  {
    id: 4,
    name: "Óleo Soya 900ml",
    submittedDate: "2024-06-10",
    status: "rejected",
    category: "Mercearia",
    reason: "Imagem de baixa qualidade. Favor reenviar com melhor resolução."
  },
  {
    id: 5,
    name: "Açúcar Cristal 1kg",
    submittedDate: "2024-06-18",
    status: "pending",
    category: "Mercearia"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-700 border-green-200";
    case "pending":
      return "bg-orange-100 text-orange-700 border-orange-200";
    case "rejected":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "approved":
      return CheckCircle;
    case "pending":
      return Clock;
    case "rejected":
      return XCircle;
    default:
      return AlertCircle;
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "approved":
      return "Aprovado";
    case "pending":
      return "Pendente";
    case "rejected":
      return "Rejeitado";
    default:
      return "Desconhecido";
  }
};

export function PendingValidationScreen({ onBack }: {
  onBack: () => void;
}) {
  const [products, setProducts] = useState<PendingProduct[]>(initialProducts);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  const filteredProducts = products.filter(p => {
    if (filter === "all") return true;
    return p.status === filter;
  });

  const stats = {
    pending: products.filter(p => p.status === "pending").length,
    approved: products.filter(p => p.status === "approved").length,
    rejected: products.filter(p => p.status === "rejected").length
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
          Validação de Produtos
        </h1>
        <p className="text-emerald-100">Acompanhe o status de seus produtos</p>
      </div>

      <div className="px-6 -mt-6">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-border text-center">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-foreground text-xl font-bold" style={{ fontFamily: 'Montserrat' }}>
              {stats.pending}
            </p>
            <p className="text-muted-foreground text-xs">Pendentes</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-lg border border-border text-center">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-foreground text-xl font-bold" style={{ fontFamily: 'Montserrat' }}>
              {stats.approved}
            </p>
            <p className="text-muted-foreground text-xs">Aprovados</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-lg border border-border text-center">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-foreground text-xl font-bold" style={{ fontFamily: 'Montserrat' }}>
              {stats.rejected}
            </p>
            <p className="text-muted-foreground text-xs">Rejeitados</p>
          </div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-6 overflow-x-auto pb-2"
        >
          {(["all", "pending", "approved", "rejected"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                filter === f
                  ? "bg-primary text-white"
                  : "bg-white border border-border text-foreground hover:bg-accent"
              }`}
            >
              {f === "all" ? "Todos" : f === "pending" ? "Pendentes" : f === "approved" ? "Aprovados" : "Rejeitados"}
            </button>
          ))}
        </motion.div>

        {/* Products List */}
        <div className="space-y-3">
          {filteredProducts.map((product, index) => {
            const StatusIcon = getStatusIcon(product.status);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-2xl p-4 shadow-sm border transition-all ${
                  product.status === "pending" ? "bg-orange-50 border-orange-200" :
                  product.status === "approved" ? "bg-white border-border" :
                  "bg-red-50 border-red-200"
                }`}
              >
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-foreground font-medium">{product.name}</p>
                      <p className="text-muted-foreground text-xs mt-1">
                        Categoria: {product.category}
                      </p>
                    </div>
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-lg border text-xs font-medium ${getStatusColor(product.status)}`}>
                      <StatusIcon className="w-4 h-4" />
                      <span>{getStatusLabel(product.status)}</span>
                    </div>
                  </div>

                  {/* Submission Date */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Enviado em {new Date(product.submittedDate).toLocaleDateString("pt-BR")}</span>
                  </div>

                  {/* Reason */}
                  {product.reason && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className={`p-3 rounded-lg text-xs ${
                        product.status === "approved" ? "bg-green-100 text-green-700" :
                        product.status === "rejected" ? "bg-red-100 text-red-700" :
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      <div className="flex gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>{product.reason}</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Actions for Rejected */}
                  {product.status === "rejected" && (
                    <button className="w-full bg-primary/10 text-primary py-2 rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">
                      Reenviar Produto
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <CheckCircle className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">Nenhum produto neste filtro</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
