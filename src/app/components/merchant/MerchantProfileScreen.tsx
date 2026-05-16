import { useState } from "react";
import { motion } from "motion/react";
import { Building2, MapPin, Clock, Phone, Mail, Edit, Save, ArrowLeft, LogOut } from "lucide-react";

interface MerchantProfile {
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  openingTime: string;
  closingTime: string;
  description: string;
}

const initialProfile: MerchantProfile = {
  name: "Supermercado Econômico",
  address: "Rua das Flores, 123",
  city: "São Paulo",
  state: "SP",
  phone: "(11) 3333-4444",
  email: "contato@supermercado-economico.com",
  openingTime: "07:00",
  closingTime: "22:00",
  description: "Supermercado com grande variedade de produtos a preços competitivos"
};

export function MerchantProfileScreen({ onBack, onNavigate }: {
  onBack: () => void;
  onNavigate?: (screen: string) => void;
}) {
  const [profile, setProfile] = useState<MerchantProfile>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<MerchantProfile>(initialProfile);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setProfile(editData);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setIsEditing(false);
    }, 1500);
  };

  const handleCancel = () => {
    setEditData(profile);
    setIsEditing(false);
  };

  const displayData = isEditing ? editData : profile;

  return (
    <div className="h-screen overflow-y-auto bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-primary-dark to-emerald-700 px-6 pt-12 pb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-white mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-3xl mb-2" style={{ fontFamily: 'Montserrat' }}>
              Perfil do Estabelecimento
            </h1>
            <p className="text-emerald-100">Gerencie informações da sua loja</p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-border mb-6"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-foreground text-xl font-bold" style={{ fontFamily: 'Montserrat' }}>
                {displayData.name}
              </h2>
              <p className="text-muted-foreground text-sm flex items-center gap-1 mt-1">
                <MapPin className="w-4 h-4" />
                {displayData.city}, {displayData.state}
              </p>
            </div>
          </div>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-primary/10 text-primary py-3 rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-primary/20 transition-colors"
            >
              <Edit className="w-5 h-5" />
              Editar Perfil
            </button>
          )}
        </motion.div>

        {/* Information Sections */}
        {isEditing ? (
          // Edit Mode
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {/* Basic Info */}
            <div>
              <h3 className="text-foreground font-medium mb-3">Informações Básicas</h3>
              <div className="space-y-3 bg-blue-50 rounded-2xl p-4">
                <div>
                  <label className="text-foreground text-sm mb-2 block">Nome do Estabelecimento</label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="w-full bg-white border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-foreground text-sm mb-2 block">Descrição</label>
                  <textarea
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    className="w-full bg-white border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 ring-primary/20 resize-none h-16"
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="text-foreground font-medium mb-3">Localização</h3>
              <div className="space-y-3 bg-green-50 rounded-2xl p-4">
                <div>
                  <label className="text-foreground text-sm mb-2 block">Endereço</label>
                  <input
                    type="text"
                    value={editData.address}
                    onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                    className="w-full bg-white border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 ring-primary/20"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-foreground text-sm mb-2 block">Cidade</label>
                    <input
                      type="text"
                      value={editData.city}
                      onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                      className="w-full bg-white border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="text-foreground text-sm mb-2 block">Estado</label>
                    <input
                      type="text"
                      value={editData.state}
                      onChange={(e) => setEditData({ ...editData, state: e.target.value })}
                      maxLength={2}
                      className="w-full bg-white border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 ring-primary/20"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div>
              <h3 className="text-foreground font-medium mb-3">Horários</h3>
              <div className="space-y-3 bg-purple-50 rounded-2xl p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-foreground text-sm mb-2 block">Abertura</label>
                    <input
                      type="time"
                      value={editData.openingTime}
                      onChange={(e) => setEditData({ ...editData, openingTime: e.target.value })}
                      className="w-full bg-white border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="text-foreground text-sm mb-2 block">Fechamento</label>
                    <input
                      type="time"
                      value={editData.closingTime}
                      onChange={(e) => setEditData({ ...editData, closingTime: e.target.value })}
                      className="w-full bg-white border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 ring-primary/20"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-foreground font-medium mb-3">Contato</h3>
              <div className="space-y-3 bg-orange-50 rounded-2xl p-4">
                <div>
                  <label className="text-foreground text-sm mb-2 block">Telefone</label>
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    className="w-full bg-white border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 ring-primary/20"
                  />
                </div>
                <div>
                  <label className="text-foreground text-sm mb-2 block">E-mail</label>
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    className="w-full bg-white border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 ring-primary/20"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleCancel}
                className="flex-1 bg-white border border-border text-foreground py-3 rounded-2xl font-medium transition-colors hover:bg-accent"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="flex-1 bg-primary text-white py-3 rounded-2xl font-medium transition-all hover:bg-primary-dark active:scale-95 flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                {saved ? "Salvo!" : "Salvar"}
              </button>
            </div>
          </motion.div>
        ) : (
          // View Mode
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {/* Address */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-border">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground text-xs">Endereço</p>
                  <p className="text-foreground font-medium">{displayData.address}</p>
                  <p className="text-muted-foreground text-sm">{displayData.city}, {displayData.state}</p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-border">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground text-xs">Horário de Funcionamento</p>
                  <p className="text-foreground font-medium">{displayData.openingTime} às {displayData.closingTime}</p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-border">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground text-xs">Telefone</p>
                  <p className="text-foreground font-medium">{displayData.phone}</p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-border">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground text-xs">E-mail</p>
                  <p className="text-foreground font-medium text-sm">{displayData.email}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            {displayData.description && (
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-border">
                <p className="text-muted-foreground text-xs mb-2">Descrição</p>
                <p className="text-foreground">{displayData.description}</p>
              </div>
            )}

            {/* Logout */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full mt-6 bg-destructive/10 text-destructive py-4 rounded-2xl flex items-center justify-center gap-2 font-medium transition-colors hover:bg-destructive/20"
            >
              <LogOut className="w-5 h-5" />
              <span>Sair da Conta</span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
