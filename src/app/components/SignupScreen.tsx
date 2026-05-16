import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";

export function SignupScreen({ onBack, onSignup }: {
  onBack: () => void;
  onSignup: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(1);

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = "Nome é obrigatório";
    if (!formData.email) newErrors.email = "E-mail é obrigatório";
    else if (!formData.email.includes("@")) newErrors.email = "E-mail inválido";
    else if (formData.email === "teste@email.com") newErrors.email = "Este e-mail já está cadastrado";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.password) newErrors.password = "Senha é obrigatória";
    else if (formData.password.length < 6) newErrors.password = "Senha deve ter no mínimo 6 caracteres";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "As senhas não coincidem";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      onSignup();
    }
  };

  const passwordStrength = formData.password.length >= 8 ? "Forte" : formData.password.length >= 6 ? "Média" : "Fraca";
  const strengthColor = passwordStrength === "Forte" ? "bg-green-500" : passwordStrength === "Média" ? "bg-yellow-500" : "bg-red-500";

  return (
    <div className="h-screen overflow-y-auto bg-background flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-primary-dark to-emerald-700 px-6 pt-12 pb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-white mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>
        <h1 className="text-white text-3xl mb-2" style={{ fontFamily: 'Montserrat' }}>
          Criar Conta
        </h1>
        <p className="text-emerald-100">Comece a economizar hoje mesmo</p>

        {/* Steps Indicator */}
        <div className="flex gap-2 mt-6">
          <div className={`flex-1 h-1 rounded-full transition-all ${step >= 1 ? "bg-white" : "bg-white/30"}`} />
          <div className={`flex-1 h-1 rounded-full transition-all ${step >= 2 ? "bg-white" : "bg-white/30"}`} />
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 pt-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <p className="text-muted-foreground text-sm mb-6">Etapa 1 de 2: Informações básicas</p>

              {/* Name Input */}
              <div>
                <label className="text-foreground text-sm mb-2 block">Nome completo</label>
                <div className="relative">
                  <User className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      setErrors({ ...errors, name: "" });
                    }}
                    placeholder="João Silva"
                    className={`w-full bg-white border rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 ring-primary/20 ${
                      errors.name ? "border-destructive" : "border-border"
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-destructive text-xs mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div>
                <label className="text-foreground text-sm mb-2 block">E-mail</label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      setErrors({ ...errors, email: "" });
                    }}
                    placeholder="seu@email.com"
                    className={`w-full bg-white border rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 ring-primary/20 ${
                      errors.email ? "border-destructive" : "border-border"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-destructive text-xs mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <p className="text-muted-foreground text-sm mb-6">Etapa 2 de 2: Segurança</p>

              {/* Password Input */}
              <div>
                <label className="text-foreground text-sm mb-2 block">Senha</label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                      setErrors({ ...errors, password: "" });
                    }}
                    placeholder="Mínimo 6 caracteres"
                    className={`w-full bg-white border rounded-2xl pl-12 pr-12 py-4 outline-none focus:ring-2 ring-primary/20 ${
                      errors.password ? "border-destructive" : "border-border"
                    }`}
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
                {formData.password && !errors.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Força da senha:</span>
                      <span className={`${passwordStrength === "Forte" ? "text-green-600" : passwordStrength === "Média" ? "text-yellow-600" : "text-red-600"}`}>
                        {passwordStrength}
                      </span>
                    </div>
                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full ${strengthColor} transition-all`} style={{ width: passwordStrength === "Forte" ? "100%" : passwordStrength === "Média" ? "66%" : "33%" }} />
                    </div>
                  </div>
                )}
                {errors.password && (
                  <p className="text-destructive text-xs mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password Input */}
              <div>
                <label className="text-foreground text-sm mb-2 block">Confirmar senha</label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => {
                      setFormData({ ...formData, confirmPassword: e.target.value });
                      setErrors({ ...errors, confirmPassword: "" });
                    }}
                    placeholder="Digite a senha novamente"
                    className={`w-full bg-white border rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 ring-primary/20 ${
                      errors.confirmPassword ? "border-destructive" : "border-border"
                    }`}
                  />
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <CheckCircle className="w-5 h-5 text-green-500 absolute right-4 top-1/2 -translate-y-1/2" />
                  )}
                </div>
                {errors.confirmPassword && (
                  <p className="text-destructive text-xs mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Buttons */}
      <div className="px-6 pb-8 space-y-3">
        {step === 2 && (
          <button
            onClick={() => setStep(1)}
            className="w-full bg-white border border-border text-foreground py-4 rounded-2xl"
          >
            Voltar
          </button>
        )}
        <motion.button
          onClick={handleNext}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-primary text-white py-4 rounded-2xl shadow-lg shadow-primary/25"
        >
          {step === 1 ? "Próximo" : "Criar Conta"}
        </motion.button>
      </div>
    </div>
  );
}
