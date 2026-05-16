import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Camera, Upload, Sparkles, X, CheckCircle } from "lucide-react";

type SearchState = "initial" | "analyzing" | "result" | "notfound";

export function ImageSearchScreen({ onBack, onProductSelect }: {
  onBack: () => void;
  onProductSelect: (product: any) => void;
}) {
  const [state, setState] = useState<SearchState>("initial");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleCapture = () => {
    // Simula captura
    setUploadedImage("📸");
    setState("analyzing");
    setTimeout(() => {
      setState("result");
    }, 2500);
  };

  const handleUpload = () => {
    // Simula upload
    setUploadedImage("🖼️");
    setState("analyzing");
    setTimeout(() => {
      // 50% chance de não encontrar
      setState(Math.random() > 0.5 ? "result" : "notfound");
    }, 2500);
  };

  const mockProduct = {
    name: "Arroz Tio João 5kg",
    lowestPrice: "R$ 18,90",
    market: "Supermercado Econômico"
  };

  return (
    <div className="h-screen overflow-y-auto bg-background">
      <div className="bg-gradient-to-br from-primary via-primary-dark to-emerald-700 px-6 pt-12 pb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-white mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>
        <h1 className="text-white text-3xl mb-2" style={{ fontFamily: 'Montserrat' }}>
          Busca por Imagem
        </h1>
        <p className="text-emerald-100">Tire uma foto ou envie uma imagem do produto</p>
      </div>

      <div className="px-6 pt-8">
        <AnimatePresence mode="wait">
          {state === "initial" && (
            <motion.div
              key="initial"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="bg-muted rounded-3xl aspect-square flex items-center justify-center mb-8">
                <div className="text-center">
                  <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Nenhuma imagem selecionada</p>
                </div>
              </div>

              <button
                onClick={handleCapture}
                className="w-full bg-primary text-white py-5 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-primary/25"
              >
                <Camera className="w-6 h-6" />
                <span className="text-lg">Tirar Foto</span>
              </button>

              <button
                onClick={handleUpload}
                className="w-full bg-white border border-border text-foreground py-5 rounded-2xl flex items-center justify-center gap-3"
              >
                <Upload className="w-6 h-6" />
                <span className="text-lg">Enviar da Galeria</span>
              </button>

              <div className="bg-accent/50 border border-primary/20 rounded-xl p-4 mt-6">
                <p className="text-sm text-foreground mb-2">💡 Dicas para melhor resultado:</p>
                <ul className="text-xs text-muted-foreground space-y-1 ml-4">
                  <li>• Centralize o produto na imagem</li>
                  <li>• Garanta boa iluminação</li>
                  <li>• Foque no rótulo ou embalagem</li>
                </ul>
              </div>
            </motion.div>
          )}

          {state === "analyzing" && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-12"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 mx-auto mb-6"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-white" />
                </div>
              </motion.div>

              <h3 className="text-foreground text-xl mb-2" style={{ fontFamily: 'Montserrat' }}>
                Analisando Imagem...
              </h3>
              <p className="text-muted-foreground">Identificando o produto</p>

              <div className="mt-8 space-y-2">
                {["Processando imagem", "Identificando produto", "Buscando melhores preços"].map((text, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.5 }}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.5 }}
                      className="w-2 h-2 bg-primary rounded-full"
                    />
                    {text}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {state === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-8 h-8 text-primary" />
              </motion.div>

              <h3 className="text-foreground text-xl text-center mb-8" style={{ fontFamily: 'Montserrat' }}>
                Produto Identificado!
              </h3>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-border mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-20 h-20 bg-accent rounded-xl flex items-center justify-center text-4xl">
                    {uploadedImage}
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground mb-1">{mockProduct.name}</p>
                    <p className="text-primary text-2xl" style={{ fontFamily: 'Montserrat' }}>
                      {mockProduct.lowestPrice}
                    </p>
                    <p className="text-muted-foreground text-sm">{mockProduct.market}</p>
                  </div>
                </div>

                <button
                  onClick={() => onProductSelect(mockProduct)}
                  className="w-full bg-primary text-white py-3 rounded-xl"
                >
                  Ver Comparação de Preços
                </button>
              </div>

              <button
                onClick={() => setState("initial")}
                className="w-full bg-white border border-border text-foreground py-4 rounded-2xl"
              >
                Buscar Outro Produto
              </button>
            </motion.div>
          )}

          {state === "notfound" && (
            <motion.div
              key="notfound"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-12"
            >
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <X className="w-12 h-12 text-muted-foreground" />
              </div>

              <h3 className="text-foreground text-xl mb-2" style={{ fontFamily: 'Montserrat' }}>
                Produto Não Encontrado
              </h3>
              <p className="text-muted-foreground mb-8">
                Não conseguimos identificar este produto em nossa base de dados.
              </p>

              <div className="bg-accent/50 border border-primary/20 rounded-xl p-4 mb-6">
                <p className="text-sm text-foreground">
                  💡 Tente novamente com uma foto mais clara do rótulo ou busque manualmente pelo nome.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setState("initial")}
                  className="w-full bg-primary text-white py-4 rounded-2xl"
                >
                  Tentar Novamente
                </button>
                <button
                  onClick={onBack}
                  className="w-full bg-white border border-border text-foreground py-4 rounded-2xl"
                >
                  Buscar Manualmente
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
