import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, User, Mail, Phone, MapPin, Camera, Save } from "lucide-react";

export function EditProfileScreen({ onBack, onSave }: {
  onBack: () => void;
  onSave: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 98765-4321",
    address: "São Paulo, SP"
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      onSave();
    }, 1500);
  };

  return (
    <div className="h-screen overflow-y-auto bg-background pb-24">
      <div className="bg-gradient-to-br from-primary via-primary-dark to-emerald-700 px-6 pt-12 pb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-white mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>
        <h1 className="text-white text-3xl mb-2" style={{ fontFamily: 'Montserrat' }}>
          Editar Perfil
        </h1>
        <p className="text-emerald-100">Atualize suas informações</p>
      </div>

      <div className="px-6 -mt-12">
        {/* Avatar */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl">
              <User className="w-12 h-12 text-primary" strokeWidth={2} />
            </div>
            <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg">
              <Camera className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="text-foreground text-sm mb-2 block">Nome completo</label>
            <div className="relative">
              <User className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white border border-border rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 ring-primary/20"
              />
            </div>
          </div>

          <div>
            <label className="text-foreground text-sm mb-2 block">E-mail</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white border border-border rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 ring-primary/20"
              />
            </div>
          </div>

          <div>
            <label className="text-foreground text-sm mb-2 block">Telefone</label>
            <div className="relative">
              <Phone className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-white border border-border rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 ring-primary/20"
              />
            </div>
          </div>

          <div>
            <label className="text-foreground text-sm mb-2 block">Localização</label>
            <div className="relative">
              <MapPin className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-white border border-border rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 ring-primary/20"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saved}
            className="w-full bg-primary text-white py-4 rounded-2xl shadow-lg shadow-primary/25 mt-6 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {saved ? (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  ✓
                </motion.div>
                Salvo!
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Salvar Alterações
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
