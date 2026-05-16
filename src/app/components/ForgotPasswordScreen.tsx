import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";

export function ForgotPasswordScreen({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (email.includes("@")) {
      setSent(true);
    }
  };

  if (sent) {
    return (
      <div className="h-screen bg-background flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle className="w-12 h-12 text-primary" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h2 className="text-foreground text-2xl mb-3" style={{ fontFamily: 'Montserrat' }}>
            E-mail Enviado!
          </h2>
          <p className="text-muted-foreground mb-2">
            Enviamos as instruções para recuperação de senha para:
          </p>
          <p className="text-primary mb-8">{email}</p>
          <p className="text-muted-foreground text-sm mb-8">
            Verifique sua caixa de entrada e spam.
          </p>
          <button
            onClick={onBack}
            className="w-full bg-primary text-white py-4 rounded-2xl shadow-lg shadow-primary/25"
          >
            Voltar para Login
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-auto bg-background flex flex-col">
      <div className="bg-gradient-to-br from-primary via-primary-dark to-emerald-700 px-6 pt-12 pb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-white mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>
        <h1 className="text-white text-3xl mb-2" style={{ fontFamily: 'Montserrat' }}>
          Recuperar Senha
        </h1>
        <p className="text-emerald-100">Enviaremos um link para seu e-mail</p>
      </div>

      <div className="flex-1 px-6 pt-8">
        <div className="space-y-4">
          <div>
            <label className="text-foreground text-sm mb-2 block">E-mail cadastrado</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full bg-white border border-border rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 ring-primary/20"
              />
            </div>
          </div>

          <div className="bg-accent/50 border border-primary/20 rounded-xl p-4 mt-6">
            <p className="text-sm text-foreground">
              💡 Você receberá um e-mail com um link válido por 24 horas para criar uma nova senha.
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 pb-8">
        <button
          onClick={handleSend}
          disabled={!email.includes("@")}
          className="w-full bg-primary text-white py-4 rounded-2xl shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Enviar Link de Recuperação
        </button>
      </div>
    </div>
  );
}
