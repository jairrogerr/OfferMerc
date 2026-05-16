import { motion } from "motion/react";
import { ShoppingBasket } from "lucide-react";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-primary via-primary-dark to-emerald-700 flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={() => setTimeout(onComplete, 1500)}
    >
      <motion.div
        className="flex flex-col items-center gap-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <ShoppingBasket className="w-12 h-12 text-primary" strokeWidth={2.5} />
        </motion.div>
        <motion.div
          className="text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold text-white tracking-tight" style={{ fontFamily: 'Montserrat' }}>
            OfferMerc
          </h1>
          <p className="text-emerald-100 mt-2 text-lg">Economia inteligente</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
