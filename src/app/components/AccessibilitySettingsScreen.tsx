import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Type, Eye, Contrast } from "lucide-react";

export function AccessibilitySettingsScreen({ onBack }: { onBack: () => void }) {
  const [fontSize, setFontSize] = useState("medium");
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const fontSizes = [
    { id: "small", label: "Pequeno", size: "14px" },
    { id: "medium", label: "Médio", size: "16px" },
    { id: "large", label: "Grande", size: "18px" },
    { id: "xlarge", label: "Muito Grande", size: "20px" }
  ];

  return (
    <div className="h-screen overflow-y-auto bg-background pb-24">
      <div className="bg-gradient-to-br from-primary via-primary-dark to-emerald-700 px-6 pt-12 pb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-white mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>
        <h1 className="text-white text-3xl mb-2" style={{ fontFamily: 'Montserrat' }}>
          Acessibilidade
        </h1>
        <p className="text-emerald-100">Personalize sua experiência</p>
      </div>

      <div className="px-6 pt-6 space-y-6">
        {/* Font Size */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-border">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Type className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-foreground mb-1">Tamanho da fonte</p>
              <p className="text-muted-foreground text-sm">
                Ajuste o tamanho do texto para melhor leitura
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {fontSizes.map((size) => (
              <button
                key={size.id}
                onClick={() => setFontSize(size.id)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  fontSize === size.id
                    ? "border-primary bg-primary/5"
                    : "border-border bg-white"
                }`}
              >
                <p
                  className="text-foreground mb-1"
                  style={{ fontSize: size.size, fontFamily: 'Montserrat' }}
                >
                  Aa
                </p>
                <p className="text-xs text-muted-foreground">{size.label}</p>
              </button>
            ))}
          </div>

          {/* Preview */}
          <div className="mt-4 p-4 bg-accent/50 rounded-xl">
            <p className="text-muted-foreground text-xs mb-2">Visualização:</p>
            <p
              className="text-foreground"
              style={{ fontSize: fontSizes.find(s => s.id === fontSize)?.size }}
            >
              Este é um texto de exemplo para visualizar o tamanho da fonte selecionada.
            </p>
          </div>
        </div>

        {/* High Contrast */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Contrast className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-foreground mb-1">Alto contraste</p>
                <p className="text-muted-foreground text-sm">
                  Aumenta o contraste das cores
                </p>
              </div>
            </div>
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${
                highContrast ? "bg-primary" : "bg-muted"
              }`}
            >
              <motion.div
                animate={{ x: highContrast ? 24 : 0 }}
                className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow"
              />
            </button>
          </div>

          {highContrast && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="mt-4 pt-4 border-t border-border"
            >
              <div className="bg-foreground text-background p-4 rounded-xl">
                <p className="text-sm mb-2">Exemplo de Alto Contraste</p>
                <p className="text-xs opacity-90">
                  Textos e elementos ficam mais visíveis com maior contraste entre as cores.
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Reduce Motion */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Eye className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-foreground mb-1">Reduzir movimento</p>
                <p className="text-muted-foreground text-sm">
                  Minimiza animações e transições
                </p>
              </div>
            </div>
            <button
              onClick={() => setReduceMotion(!reduceMotion)}
              className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${
                reduceMotion ? "bg-primary" : "bg-muted"
              }`}
            >
              <motion.div
                animate={{ x: reduceMotion ? 24 : 0 }}
                className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow"
              />
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="bg-accent/50 border border-primary/20 rounded-xl p-4">
          <p className="text-sm text-foreground mb-2">♿ Compromisso com Acessibilidade</p>
          <p className="text-xs text-muted-foreground">
            O OfferMerc está comprometido em proporcionar uma experiência inclusiva para todos os usuários.
            Estas configurações ajudam a personalizar o app de acordo com suas necessidades.
          </p>
        </div>
      </div>
    </div>
  );
}
