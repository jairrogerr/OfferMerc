import { motion } from "motion/react";
import { AlertTriangle, X } from "lucide-react";

export function DeleteAccountModal({ onClose, onConfirm }: {
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl p-6 max-w-sm w-full"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-destructive/10 rounded-2xl flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-destructive" />
          </div>
          <button onClick={onClose} className="text-muted-foreground">
            <X className="w-6 h-6" />
          </button>
        </div>

        <h3 className="text-foreground text-xl mb-2" style={{ fontFamily: 'Montserrat' }}>
          Excluir Conta?
        </h3>
        <p className="text-muted-foreground text-sm mb-6">
          Esta ação é permanente e não pode ser desfeita. Todos os seus dados, listas e histórico serão perdidos.
        </p>

        <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-3 mb-6">
          <p className="text-destructive text-sm">
            ⚠️ Você perderá acesso a:
          </p>
          <ul className="text-destructive text-xs mt-2 space-y-1 ml-4">
            <li>• Todas as suas listas de compras</li>
            <li>• Histórico de comparações</li>
            <li>• Alertas de preços configurados</li>
            <li>• Mercados favoritos</li>
          </ul>
        </div>

        <div className="space-y-3">
          <button
            onClick={onConfirm}
            className="w-full bg-destructive text-white py-4 rounded-2xl"
          >
            Sim, Excluir Minha Conta
          </button>
          <button
            onClick={onClose}
            className="w-full bg-muted text-foreground py-4 rounded-2xl"
          >
            Cancelar
          </button>
        </div>
      </motion.div>
    </div>
  );
}
