import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Shield, Bell, Globe, Database, Key, Users, Settings, ChevronRight, LogOut } from "lucide-react";

export function AdminSettingsScreen({ onBack }: { onBack: () => void }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoApproval, setAutoApproval] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

  const settingsSections = [
    {
      title: "Segurança",
      icon: Shield,
      items: [
        {
          label: "Autenticação de Dois Fatores",
          description: "Camada extra de proteção para login",
          type: "toggle" as const,
          value: twoFactorAuth,
          onChange: setTwoFactorAuth
        },
        {
          label: "Gerenciar Administradores",
          description: "Adicionar ou remover acesso admin",
          type: "nav" as const,
          action: () => console.log("Manage admins")
        },
        {
          label: "Logs de Auditoria",
          description: "Ver histórico de ações administrativas",
          type: "nav" as const,
          action: () => console.log("View logs")
        },
        {
          label: "Alterar Senha",
          description: "Atualizar senha de administrador",
          type: "nav" as const,
          action: () => console.log("Change password")
        }
      ]
    },
    {
      title: "Sistema",
      icon: Settings,
      items: [
        {
          label: "Modo Manutenção",
          description: "Desabilita acesso temporariamente",
          type: "toggle" as const,
          value: maintenanceMode,
          onChange: setMaintenanceMode,
          warning: true
        },
        {
          label: "Aprovação Automática",
          description: "Auto-aprovar produtos de mercados verificados",
          type: "toggle" as const,
          value: autoApproval,
          onChange: setAutoApproval
        },
        {
          label: "Backup do Banco de Dados",
          description: "Criar cópia de segurança agora",
          type: "nav" as const,
          action: () => console.log("Backup")
        },
        {
          label: "Configurações de API",
          description: "Gerenciar chaves e integrações",
          type: "nav" as const,
          action: () => console.log("API settings")
        }
      ]
    },
    {
      title: "Notificações",
      icon: Bell,
      items: [
        {
          label: "Notificações Push",
          description: "Alertas de atividades importantes",
          type: "toggle" as const,
          value: notificationsEnabled,
          onChange: setNotificationsEnabled
        },
        {
          label: "E-mails de Resumo",
          description: "Relatórios diários enviados por e-mail",
          type: "nav" as const,
          action: () => console.log("Email settings")
        },
        {
          label: "Alertas de Segurança",
          description: "Notificações de tentativas de acesso",
          type: "nav" as const,
          action: () => console.log("Security alerts")
        }
      ]
    },
    {
      title: "Moderação",
      icon: Users,
      items: [
        {
          label: "Palavras Bloqueadas",
          description: "Lista de termos não permitidos",
          type: "nav" as const,
          action: () => console.log("Blocked words")
        },
        {
          label: "Regras de Validação",
          description: "Critérios para aprovar produtos/mercados",
          type: "nav" as const,
          action: () => console.log("Validation rules")
        },
        {
          label: "Denúncias Automáticas",
          description: "Configurar gatilhos de alerta",
          type: "nav" as const,
          action: () => console.log("Auto reports")
        }
      ]
    }
  ];

  const adminInfo = {
    name: "Admin Principal",
    email: "admin@offermerc.com",
    role: "Super Administrador",
    lastLogin: "2026-05-14 09:23"
  };

  return (
    <div className="h-screen overflow-y-auto bg-background pb-24">
      <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 px-6 pt-12 pb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-white mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>
        <h1 className="text-white text-3xl mb-2" style={{ fontFamily: 'Montserrat' }}>
          Configurações do Sistema
        </h1>
        <p className="text-slate-300">Gerencie configurações administrativas</p>
      </div>

      <div className="px-6 pt-6">
        {/* Admin Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 mb-6 border border-border"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">👤</span>
            </div>
            <div className="flex-1">
              <p className="text-foreground font-medium">{adminInfo.name}</p>
              <p className="text-muted-foreground text-sm">{adminInfo.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">
                  {adminInfo.role}
                </span>
                <span className="text-xs text-muted-foreground">
                  Último acesso: {adminInfo.lastLogin}
                </span>
              </div>
            </div>
          </div>

          <button className="w-full bg-slate-100 text-slate-700 rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors">
            <Key className="w-4 h-4" />
            Editar Perfil Admin
          </button>
        </motion.div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingsSections.map((section, sectionIndex) => {
            const SectionIcon = section.icon;
            return (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1 }}
              >
                <div className="flex items-center gap-2 mb-3 px-2">
                  <SectionIcon className="w-5 h-5 text-slate-700" />
                  <h3 className="text-foreground font-medium">{section.title}</h3>
                </div>

                <div className="bg-white rounded-2xl border border-border overflow-hidden">
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className={`p-4 ${
                        itemIndex !== section.items.length - 1 ? "border-b border-border" : ""
                      } ${item.warning && item.value ? "bg-red-50/50" : ""}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-foreground text-sm font-medium mb-0.5">
                            {item.label}
                            {item.warning && item.value && (
                              <span className="ml-2 text-red-600 text-xs">⚠️ Ativo</span>
                            )}
                          </p>
                          <p className="text-muted-foreground text-xs">{item.description}</p>
                        </div>

                        {item.type === "toggle" && (
                          <button
                            onClick={() => item.onChange && item.onChange(!item.value)}
                            className={`w-12 h-6 rounded-full transition-colors relative ${
                              item.value ? "bg-slate-700" : "bg-muted"
                            }`}
                          >
                            <motion.div
                              animate={{ x: item.value ? 24 : 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              className="w-6 h-6 bg-white rounded-full shadow-sm"
                            />
                          </button>
                        )}

                        {item.type === "nav" && (
                          <button
                            onClick={item.action}
                            className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center"
                          >
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* System Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-slate-50 rounded-2xl p-5 border border-border"
        >
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-slate-700" />
            <h3 className="text-foreground font-medium">Informações do Sistema</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Versão do Sistema</span>
              <span className="text-foreground font-medium">v2.4.1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Último Backup</span>
              <span className="text-foreground font-medium">14/05/2026 03:00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Uptime do Servidor</span>
              <span className="text-foreground font-medium">99.8%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Espaço em Disco</span>
              <span className="text-foreground font-medium">245 GB / 500 GB</span>
            </div>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-3 px-2">
            <span className="text-red-600">⚠️</span>
            <h3 className="text-red-600 font-medium">Zona de Perigo</h3>
          </div>
          <div className="bg-white rounded-2xl border-2 border-red-200 overflow-hidden">
            <button className="w-full p-4 text-left hover:bg-red-50 transition-colors border-b border-red-200 flex items-center justify-between">
              <div>
                <p className="text-foreground text-sm font-medium">Limpar Cache do Sistema</p>
                <p className="text-muted-foreground text-xs">Remove dados temporários e otimiza performance</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="w-full p-4 text-left hover:bg-red-50 transition-colors border-b border-red-200 flex items-center justify-between">
              <div>
                <p className="text-foreground text-sm font-medium">Resetar Configurações Padrão</p>
                <p className="text-muted-foreground text-xs">Restaura configurações de fábrica</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="w-full p-4 text-left hover:bg-red-50 transition-colors flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm font-medium">Desativar Sistema Permanentemente</p>
                <p className="text-red-500 text-xs">Ação irreversível - requer confirmação múltipla</p>
              </div>
              <ChevronRight className="w-5 h-5 text-red-600" />
            </button>
          </div>
        </motion.div>

        {/* Logout */}
        <button className="w-full bg-slate-700 text-white rounded-2xl py-4 flex items-center justify-center gap-2 mb-6">
          <LogOut className="w-5 h-5" />
          Sair do Painel Admin
        </button>
      </div>
    </div>
  );
}
