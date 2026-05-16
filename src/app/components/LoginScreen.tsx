import { useState } from "react";
import { motion } from "motion/react";
import { ShoppingBasket, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

export function LoginScreen({ onLogin, onSignup, onForgotPassword }: {
  onLogin: () => void;
  onSignup: () => void;
  onForgotPassword: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setError("Preencha todos os campos");
      return;
    }
    if (!email.includes("@")) {
      setError("E-mail inválido");
      return;
    }
    onLogin();
  };

  return (
    <div className="h-screen overflow-y-auto bg-background flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-primary-dark to-emerald-700 px-6 pt-16 pb-12 rounded-b-[3rem]">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl"
        >
          <ShoppingBasket className="w-10 h-10 text-primary" strokeWidth={2.5} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-white text-3xl mb-2" style={{ fontFamily: 'Montserrat' }}>
            Bem-vindo de volta!
          </h1>
          <p className="text-emerald-100">Entre para continuar economizando</p>
        </motion.div>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {/* Email Input */}
          <div>
            <label className="text-foreground text-sm mb-2 block">E-mail</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="seu@email.com"
                className="w-full bg-white border border-border rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 ring-primary/20"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="text-foreground text-sm mb-2 block">Senha</label>
            <div className="relative">
              <Lock className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="••••••••"
                className="w-full bg-white border border-border rounded-2xl pl-12 pr-12 py-4 outline-none focus:ring-2 ring-primary/20"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <Eye className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-destructive/10 border border-destructive/20 rounded-xl p-3 flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
              <p className="text-destructive text-sm">{error}</p>
            </motion.div>
          )}

          {/* Forgot Password */}
          <button
            onClick={onForgotPassword}
            className="text-primary text-sm ml-auto block"
          >
            Esqueceu a senha?
          </button>

          {/* Login Button */}
          <motion.button
            onClick={handleLogin}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-primary text-white py-4 rounded-2xl shadow-lg shadow-primary/25 mt-6"
          >
            Entrar
          </motion.button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-muted-foreground text-sm">ou</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button className="w-full bg-white border border-border py-4 rounded-2xl flex items-center justify-center gap-3">
              <span className="text-xl">🔍</span>
              <span className="text-foreground">Continuar com Google</span>
            </button>
            <button className="w-full bg-white border border-border py-4 rounded-2xl flex items-center justify-center gap-3">
              <span className="text-xl">📱</span>
              <span className="text-foreground">Continuar com Apple</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Signup Link */}
      <div className="px-6 pb-8 text-center">
        <p className="text-muted-foreground">
          Não tem uma conta?{" "}
          <button onClick={onSignup} className="text-primary">
            Criar conta
          </button>
        </p>
      </div>
    </div>
  );
}
