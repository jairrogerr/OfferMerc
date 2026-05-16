import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Search, MapPin, Phone, Clock, CheckCircle, XCircle, AlertCircle, Eye, MoreVertical } from "lucide-react";

type MerchantStatus = "pending" | "approved" | "verified" | "rejected";

interface Merchant {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  status: MerchantStatus;
  registeredDate: string;
  productsCount: number;
  rating: number;
  hours: string;
}

const mockMerchants: Merchant[] = [
  {
    id: 1,
    name: "Supermercado Central",
    address: "Av. Principal, 1500 - Campinas/SP",
    phone: "(19) 3234-5678",
    email: "central@supermercado.com",
    status: "verified",
    registeredDate: "2025-08-15",
    productsCount: 1247,
    rating: 4.5,
    hours: "7h - 22h"
  },
  {
    id: 2,
    name: "Mercado Bom Preço",
    address: "Rua das Flores, 234 - Campinas/SP",
    phone: "(19) 3345-6789",
    email: "contato@bompreco.com",
    status: "pending",
    registeredDate: "2026-05-10",
    productsCount: 0,
    rating: 0,
    hours: "8h - 20h"
  },
  {
    id: 3,
    name: "Atacadão Silva",
    address: "Av. Industrial, 890 - Valinhos/SP",
    phone: "(19) 3456-7890",
    email: "silva@atacadao.com",
    status: "approved",
    registeredDate: "2026-03-22",
    productsCount: 523,
    rating: 4.2,
    hours: "6h - 21h"
  },
  {
    id: 4,
    name: "Mercadinho do José",
    address: "Rua Pequena, 45 - Campinas/SP",
    phone: "(19) 3567-8901",
    email: "jose@mercadinho.com",
    status: "rejected",
    registeredDate: "2026-04-18",
    productsCount: 0,
    rating: 0,
    hours: "Não informado"
  },
  {
    id: 5,
    name: "Super Família",
    address: "Av. dos Estados, 567 - Indaiatuba/SP",
    phone: "(19) 3678-9012",
    email: "contato@superfamilia.com",
    status: "pending",
    registeredDate: "2026-05-12",
    productsCount: 0,
    rating: 0,
    hours: "7h - 21h"
  }
];

const statusConfig = {
  pending: { label: "Pendente", icon: AlertCircle, color: "bg-amber-50 text-amber-600 border-amber-200" },
  approved: { label: "Aprovado", icon: CheckCircle, color: "bg-blue-50 text-blue-600 border-blue-200" },
  verified: { label: "Verificado", icon: CheckCircle, color: "bg-green-50 text-green-600 border-green-200" },
  rejected: { label: "Rejeitado", icon: XCircle, color: "bg-red-50 text-red-600 border-red-200" }
};

export function MerchantManagementScreen({ onBack }: { onBack: () => void }) {
  const [merchants, setMerchants] = useState(mockMerchants);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<MerchantStatus | "all">("all");

  const filteredMerchants = merchants.filter(merchant => {
    const matchesSearch = merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         merchant.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         merchant.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || merchant.status === filter;
    return matchesSearch && matchesFilter;
  });

  const approveMerchant = (id: number) => {
    setMerchants(merchants.map(merchant =>
      merchant.id === id ? { ...merchant, status: "approved" as MerchantStatus } : merchant
    ));
  };

  const rejectMerchant = (id: number) => {
    setMerchants(merchants.map(merchant =>
      merchant.id === id ? { ...merchant, status: "rejected" as MerchantStatus } : merchant
    ));
  };

  const verifyMerchant = (id: number) => {
    setMerchants(merchants.map(merchant =>
      merchant.id === id ? { ...merchant, status: "verified" as MerchantStatus } : merchant
    ));
  };

  const pendingCount = merchants.filter(m => m.status === "pending").length;

  return (
    <div className="h-screen overflow-y-auto bg-background pb-24">
      <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 px-6 pt-12 pb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-white mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>
        <h1 className="text-white text-3xl mb-2" style={{ fontFamily: 'Montserrat' }}>
          Gerenciar Mercados
        </h1>
        <p className="text-slate-300">{filteredMerchants.length} estabelecimentos encontrados</p>
        {pendingCount > 0 && (
          <div className="mt-4 bg-amber-500/20 border border-amber-400/30 rounded-xl px-4 py-3">
            <p className="text-amber-100 text-sm">
              ⚠️ {pendingCount} {pendingCount === 1 ? "estabelecimento aguardando" : "estabelecimentos aguardando"} aprovação
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
              placeholder="Buscar por nome, endereço ou e-mail..."
              className="w-full bg-white border border-border rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 ring-slate-700/20"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-xl text-sm transition-colors whitespace-nowrap ${
                filter === "all"
                  ? "bg-slate-700 text-white"
                  : "bg-white border border-border text-foreground"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-xl text-sm transition-colors whitespace-nowrap ${
                filter === "pending"
                  ? "bg-amber-600 text-white"
                  : "bg-white border border-border text-foreground"
              }`}
            >
              Pendentes {pendingCount > 0 && `(${pendingCount})`}
            </button>
            <button
              onClick={() => setFilter("approved")}
              className={`px-4 py-2 rounded-xl text-sm transition-colors whitespace-nowrap ${
                filter === "approved"
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-border text-foreground"
              }`}
            >
              Aprovados
            </button>
            <button
              onClick={() => setFilter("verified")}
              className={`px-4 py-2 rounded-xl text-sm transition-colors whitespace-nowrap ${
                filter === "verified"
                  ? "bg-green-600 text-white"
                  : "bg-white border border-border text-foreground"
              }`}
            >
              Verificados
            </button>
            <button
              onClick={() => setFilter("rejected")}
              className={`px-4 py-2 rounded-xl text-sm transition-colors whitespace-nowrap ${
                filter === "rejected"
                  ? "bg-red-600 text-white"
                  : "bg-white border border-border text-foreground"
              }`}
            >
              Rejeitados
            </button>
          </div>
        </div>

        {/* Merchants List */}
        <div className="space-y-3">
          {filteredMerchants.map((merchant, index) => {
            const StatusIcon = statusConfig[merchant.status].icon;
            return (
              <motion.div
                key={merchant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white rounded-2xl p-4 shadow-sm border-2 ${statusConfig[merchant.status].color}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-foreground font-medium">{merchant.name}</p>
                      <div className={`px-2 py-0.5 rounded-full text-xs flex items-center gap-1 ${statusConfig[merchant.status].color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig[merchant.status].label}
                      </div>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{merchant.address}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          <span>{merchant.phone}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{merchant.hours}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center">
                    <MoreVertical className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>Cadastro: {new Date(merchant.registeredDate).toLocaleDateString('pt-BR')}</span>
                    <span>Produtos: {merchant.productsCount}</span>
                    {merchant.rating > 0 && <span>⭐ {merchant.rating.toFixed(1)}</span>}
                  </div>

                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Eye className="w-4 h-4" />
                    </button>

                    {merchant.status === "pending" && (
                      <>
                        <button
                          onClick={() => approveMerchant(merchant.id)}
                          className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => rejectMerchant(merchant.id)}
                          className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </>
                    )}

                    {merchant.status === "approved" && (
                      <button
                        onClick={() => verifyMerchant(merchant.id)}
                        className="px-3 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center text-xs"
                      >
                        Verificar
                      </button>
                    )}

                    {merchant.status === "rejected" && (
                      <button
                        onClick={() => approveMerchant(merchant.id)}
                        className="px-3 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs"
                      >
                        Reavaliar
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredMerchants.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-muted mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum estabelecimento encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}
