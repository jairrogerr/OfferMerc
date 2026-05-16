import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TrendingDown, ListChecks, Sparkles, ChevronRight } from "lucide-react";

const slides = [
  {
    icon: TrendingDown,
    title: "Compare Preços",
    description: "Encontre os melhores preços entre diversos mercados próximos a você",
    color: "from-emerald-400 to-teal-400"
  },
  {
    icon: Sparkles,
    title: "Economize Mais",
    description: "Veja quanto você pode economizar em cada compra e otimize seu orçamento",
    color: "from-green-400 to-emerald-400"
  },
  {
    icon: ListChecks,
    title: "Listas Inteligentes",
    description: "Crie listas de compras e descubra o melhor mercado para cada produto",
    color: "from-teal-400 to-cyan-400"
  }
];

export function OnboardingScreen({ onComplete }: { onComplete: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="fixed inset-0 bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="text-center max-w-sm"
          >
            <motion.div
              className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${slide.color} flex items-center justify-center mb-8 shadow-lg`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Icon className="w-16 h-16 text-white" strokeWidth={2} />
            </motion.div>
            <h2 className="text-3xl mb-4 text-foreground" style={{ fontFamily: 'Montserrat' }}>
              {slide.title}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="pb-12 px-8">
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? "w-8 bg-primary" : "w-2 bg-muted"
              }`}
              animate={{ scale: index === currentSlide ? 1 : 0.8 }}
            />
          ))}
        </div>

        <motion.button
          onClick={nextSlide}
          className="w-full bg-primary text-primary-foreground py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-lg">
            {currentSlide === slides.length - 1 ? "Começar" : "Próximo"}
          </span>
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
