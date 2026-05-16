import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, MapPin, Crosshair, Navigation } from "lucide-react";

export function LocationSettingsScreen({ onBack }: { onBack: () => void }) {
  const [radius, setRadius] = useState(5);
  const [zipCode, setZipCode] = useState("");
  const [useGPS, setUseGPS] = useState(true);

  return (
    <div className="h-screen overflow-y-auto bg-background pb-24">
      <div className="bg-gradient-to-br from-primary via-primary-dark to-emerald-700 px-6 pt-12 pb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-white mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>
        <h1 className="text-white text-3xl mb-2" style={{ fontFamily: 'Montserrat' }}>
          Localização
        </h1>
        <p className="text-emerald-100">Configure como encontrar mercados próximos</p>
      </div>

      <div className="px-6 pt-6 space-y-6">
        {/* GPS Toggle */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Crosshair className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-foreground">Usar minha localização</p>
                <p className="text-muted-foreground text-sm">GPS automático</p>
              </div>
            </div>
            <button
              onClick={() => setUseGPS(!useGPS)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                useGPS ? "bg-primary" : "bg-muted"
              }`}
            >
              <motion.div
                animate={{ x: useGPS ? 24 : 0 }}
                className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow"
              />
            </button>
          </div>

          {useGPS && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="pt-4 border-t border-border"
            >
              <div className="flex items-center gap-2 text-sm text-primary">
                <Navigation className="w-4 h-4" />
                <span>Localização atual: São Paulo, SP</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Radius Slider */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-border">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-foreground mb-1">Raio de busca</p>
              <p className="text-muted-foreground text-sm">
                Mostrar mercados em um raio de até <span className="text-primary">{radius} km</span>
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <input
              type="range"
              min="1"
              max="20"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-5
                [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-primary
                [&::-webkit-slider-thumb]:shadow-lg
                [&::-moz-range-thumb]:w-5
                [&::-moz-range-thumb]:h-5
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-primary
                [&::-moz-range-thumb]:border-0
                [&::-moz-range-thumb]:shadow-lg"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 km</span>
              <span>10 km</span>
              <span>20 km</span>
            </div>
          </div>
        </div>

        {/* Manual ZIP Code */}
        {!useGPS && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-5 shadow-sm border border-border"
          >
            <label className="text-foreground text-sm mb-3 block">CEP de referência</label>
            <div className="relative">
              <MapPin className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="00000-000"
                maxLength={9}
                className="w-full bg-input-background border border-border rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 ring-primary/20"
              />
            </div>
          </motion.div>
        )}

        {/* Info Card */}
        <div className="bg-accent/50 border border-primary/20 rounded-xl p-4">
          <p className="text-sm text-foreground mb-2">💡 Dica:</p>
          <p className="text-xs text-muted-foreground">
            Aumentar o raio de busca pode mostrar mais opções de mercados, mas os preços podem variar pela distância.
          </p>
        </div>
      </div>
    </div>
  );
}
