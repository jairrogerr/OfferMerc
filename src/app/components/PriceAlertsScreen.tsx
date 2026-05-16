import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Bell, TrendingDown, Trash2, Plus } from "lucide-react";

const mockAlerts = [
  { id: 1, product: "Arroz Tio João 5kg", currentPrice: 18.90, targetPrice: 16.00, active: true },
  { id: 2, product: "Feijão Camil 1kg", currentPrice: 6.50, targetPrice: 5.50, active: true },
  { id: 3, product: "Café Pilão 500g", currentPrice: 12.90, targetPrice: 10.00, active: false }
];

export function PriceAlertsScreen({ onBack }: { onBack: () => void }) {
  const [alerts, setAlerts] = useState(mockAlerts);

  const toggleAlert = (id: number) => {
    setAlerts(alerts.map(alert =>
      alert.id === id ? { ...alert, active: !alert.active } : alert
    ));
  };

  const removeAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <div className="h-screen overflow-y-auto bg-background pb-24">
      <div className="bg-gradient-to-br from-primary via-primary-dark to-emerald-700 px-6 pt-12 pb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-white mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>
        <h1 className="text-white text-3xl mb-2" style={{ fontFamily: 'Montserrat' }}>
          Alertas de Preço
        </h1>
        <p className="text-emerald-100">
          {alerts.filter(a => a.active).length} alertas ativos
        </p>
      </div>

      <div className="px-6 pt-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-border mb-6 flex items-start gap-3">
          <Bell className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-foreground text-sm mb-1">Como funciona?</p>
            <p className="text-muted-foreground text-xs">
              Você receberá uma notificação quando o produto atingir o preço desejado em qualquer mercado.
            </p>
          </div>
        </div>

        {alerts.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-muted mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">Nenhum alerta configurado</p>
            <p className="text-muted-foreground text-sm">
              Configure alertas para ser notificado quando os preços caírem
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-2xl p-4 shadow-sm border ${
                  alert.active ? "border-border" : "border-muted opacity-60"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-foreground mb-1">{alert.product}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">
                        Atual: <span className="text-foreground">R$ {alert.currentPrice.toFixed(2)}</span>
                      </span>
                      <span className="text-primary flex items-center gap-1">
                        <TrendingDown className="w-3 h-3" />
                        Meta: R$ {alert.targetPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeAlert(alert.id)}
                    className="w-8 h-8 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-sm text-muted-foreground">
                    {alert.active ? "Ativo" : "Pausado"}
                  </span>
                  <button
                    onClick={() => toggleAlert(alert.id)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      alert.active ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <motion.div
                      animate={{ x: alert.active ? 24 : 0 }}
                      className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow"
                    />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Notification Example */}
      <div className="px-6 mt-8">
        <p className="text-muted-foreground text-sm mb-3">Exemplo de Notificação:</p>
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white rounded-2xl p-4 shadow-lg border border-primary/20"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <p className="text-foreground">Alerta de Preço</p>
                <span className="text-xs text-muted-foreground">Agora</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Arroz Tio João 5kg chegou ao preço desejado!
              </p>
              <div className="bg-primary/10 rounded-lg px-3 py-2 inline-block">
                <span className="text-primary text-sm">R$ 16,00 no Supermercado Econômico</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
