import { motion } from "motion/react";
import { MapPin, X } from "lucide-react";

export function LocationPermissionModal({ onAllow, onDeny, onManual }: {
  onAllow: () => void;
  onDeny: () => void;
  onManual: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl p-6 max-w-sm w-full"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <button onClick={onDeny} className="text-muted-foreground">
            <X className="w-6 h-6" />
          </button>
        </div>

        <h3 className="text-foreground text-xl mb-2" style={{ fontFamily: 'Montserrat' }}>
          Permitir Localização
        </h3>
        <p className="text-muted-foreground text-sm mb-6">
          O OfferMerc precisa da sua localização para mostrar mercados e ofertas próximos a você.
        </p>

        <div className="bg-accent/50 border border-primary/20 rounded-xl p-4 mb-6">
          <p className="text-sm text-foreground mb-2">✓ Benefícios:</p>
          <ul className="text-xs text-muted-foreground space-y-1 ml-4">
            <li>• Ver mercados próximos automaticamente</li>
            <li>• Comparar preços por distância</li>
            <li>• Receber ofertas da sua região</li>
          </ul>
        </div>

        <div className="space-y-3">
          <button
            onClick={onAllow}
            className="w-full bg-primary text-white py-4 rounded-2xl"
          >
            Permitir Acesso
          </button>
          <button
            onClick={onManual}
            className="w-full bg-white border border-border text-foreground py-4 rounded-2xl"
          >
            Inserir CEP Manualmente
          </button>
          <button
            onClick={onDeny}
            className="w-full text-muted-foreground py-2"
          >
            Agora não
          </button>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-4">
          Você pode alterar isso nas configurações a qualquer momento
        </p>
      </motion.div>
    </div>
  );
}
