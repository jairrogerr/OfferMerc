import { motion } from "motion/react";

export function LoadingState({ message = "Carregando..." }: { message?: string }) {
  return (
    <div className="h-screen bg-background flex items-center justify-center px-6">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full mx-auto mb-4"
        />
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

export function SkeletonProductCard() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-border animate-pulse">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-16 h-16 bg-muted rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-3 bg-muted rounded w-1/2" />
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="h-6 bg-muted rounded w-20" />
        <div className="h-3 bg-muted rounded w-24" />
      </div>
    </div>
  );
}

export function SkeletonScreen() {
  return (
    <div className="h-screen overflow-y-auto bg-background pb-24">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-br from-primary via-primary-dark to-emerald-700 px-6 pt-12 pb-8">
        <div className="h-8 bg-white/20 rounded w-48 mb-2" />
        <div className="h-4 bg-white/20 rounded w-32" />
      </div>

      <div className="px-6 pt-6 space-y-3">
        <SkeletonProductCard />
        <SkeletonProductCard />
        <SkeletonProductCard />
        <SkeletonProductCard />
      </div>
    </div>
  );
}
