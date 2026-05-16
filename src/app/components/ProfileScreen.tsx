import { motion } from "motion/react";
import {
  User,
  MapPin,
  Bell,
  Heart,
  Settings,
  ChevronRight,
  LogOut,
  Edit,
  Eye
} from "lucide-react";

export function ProfileScreen({ onNavigate }: { onNavigate?: (screen: string) => void }) {
  const menuItems = [
    { id: 1, icon: Edit, label: "Editar Perfil", color: "text-blue-500 bg-blue-50", screen: "editProfile" },
    { id: 2, icon: Heart, label: "Favoritos", color: "text-red-500 bg-red-50", screen: "favorites" },
    { id: 3, icon: Bell, label: "Alertas de Preço", color: "text-purple-500 bg-purple-50", screen: "alerts" },
    { id: 4, icon: MapPin, label: "Localização", color: "text-green-500 bg-green-50", screen: "location" },
    { id: 5, icon: Eye, label: "Acessibilidade", color: "text-orange-500 bg-orange-50", screen: "accessibility" },
    { id: 6, icon: Settings, label: "Configurações", color: "text-gray-500 bg-gray-50", screen: null }
  ];
  return (
    <div className="h-screen overflow-y-auto bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-primary-dark to-emerald-700 px-6 pt-12 pb-8">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg"
          >
            <User className="w-12 h-12 text-primary" strokeWidth={2} />
          </motion.div>
          <h2 className="text-white text-2xl mb-1" style={{ fontFamily: 'Montserrat' }}>
            João Silva
          </h2>
          <p className="text-emerald-100">joao.silva@email.com</p>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 -mt-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-border"
        >
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-primary text-2xl mb-1" style={{ fontFamily: 'Montserrat' }}>
                87
              </p>
              <p className="text-muted-foreground text-xs">Produtos<br />Comparados</p>
            </div>
            <div className="border-x border-border">
              <p className="text-primary text-2xl mb-1" style={{ fontFamily: 'Montserrat' }}>
                R$ 243
              </p>
              <p className="text-muted-foreground text-xs">Economia<br />Total</p>
            </div>
            <div>
              <p className="text-primary text-2xl mb-1" style={{ fontFamily: 'Montserrat' }}>
                12
              </p>
              <p className="text-muted-foreground text-xs">Listas<br />Criadas</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Menu Items */}
      <div className="px-6">
        <h3 className="text-foreground mb-4">Conta</h3>
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                onClick={() => item.screen && onNavigate && onNavigate(item.screen)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="w-full bg-white rounded-2xl p-4 shadow-sm border border-border flex items-center gap-4 hover:bg-accent transition-colors"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                  <Icon className="w-5 h-5" strokeWidth={2} />
                </div>
                <span className="flex-1 text-left text-foreground">{item.label}</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </motion.button>
            );
          })}
        </div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full mt-6 bg-destructive/10 text-destructive py-4 rounded-2xl flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          <span>Sair da Conta</span>
        </motion.button>
      </div>
    </div>
  );
}
