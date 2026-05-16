import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Search, Filter, MoreVertical, Ban, Edit, Trash2, CheckCircle } from "lucide-react";

type UserStatus = "active" | "blocked";

interface User {
  id: number;
  name: string;
  email: string;
  status: UserStatus;
  joinDate: string;
  listsCount: number;
}

const mockUsers: User[] = [
  { id: 1, name: "João Silva", email: "joao@email.com", status: "active", joinDate: "2026-01-15", listsCount: 12 },
  { id: 2, name: "Maria Santos", email: "maria@email.com", status: "active", joinDate: "2026-02-20", listsCount: 8 },
  { id: 3, name: "Carlos Souza", email: "carlos@email.com", status: "blocked", joinDate: "2025-11-10", listsCount: 3 },
  { id: 4, name: "Ana Costa", email: "ana@email.com", status: "active", joinDate: "2026-03-05", listsCount: 15 },
  { id: 5, name: "Pedro Lima", email: "pedro@email.com", status: "active", joinDate: "2026-04-12", listsCount: 5 }
];

export function UserManagementScreen({ onBack }: { onBack: () => void }) {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<UserStatus | "all">("all");

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || user.status === filter;
    return matchesSearch && matchesFilter;
  });

  const toggleUserStatus = (id: number) => {
    setUsers(users.map(user =>
      user.id === id
        ? { ...user, status: user.status === "active" ? "blocked" : "active" as UserStatus }
        : user
    ));
  };

  return (
    <div className="h-screen overflow-y-auto bg-background pb-24">
      <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 px-6 pt-12 pb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-white mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>
        <h1 className="text-white text-3xl mb-2" style={{ fontFamily: 'Montserrat' }}>
          Gerenciar Usuários
        </h1>
        <p className="text-slate-300">{filteredUsers.length} usuários encontrados</p>
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
              placeholder="Buscar por nome ou e-mail..."
              className="w-full bg-white border border-border rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 ring-slate-700/20"
            />
          </div>

          <div className="flex gap-2">
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
            <button
              onClick={() => setFilter("active")}
              className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                filter === "active"
                  ? "bg-green-600 text-white"
                  : "bg-white border border-border text-foreground"
              }`}
            >
              Ativos
            </button>
            <button
              onClick={() => setFilter("blocked")}
              className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                filter === "blocked"
                  ? "bg-red-600 text-white"
                  : "bg-white border border-border text-foreground"
              }`}
            >
              Bloqueados
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="space-y-3">
          {filteredUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-2xl p-4 shadow-sm border ${
                user.status === "blocked" ? "border-red-200 bg-red-50/30" : "border-border"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-foreground">{user.name}</p>
                    {user.status === "active" ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Ban className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm">{user.email}</p>
                </div>
                <button className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center">
                  <MoreVertical className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span>Desde: {new Date(user.joinDate).toLocaleDateString('pt-BR')}</span>
                  <span>Listas: {user.listsCount}</span>
                </div>

                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleUserStatus(user.id)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      user.status === "active"
                        ? "bg-red-50 text-red-600"
                        : "bg-green-50 text-green-600"
                    }`}
                  >
                    <Ban className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-muted mx-auto mb-4" />
            <p className="text-muted-foreground">Nenhum usuário encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}
