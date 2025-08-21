"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface VideoFamoso {
  id: number;
  name: string;
  description: string;
  videoSrc: string;
  thumbnail?: string;
}

interface ThemeClasses {
  bg: string;
  bgAlt: string;
  text: string;
  textMuted: string;
  border: string;
  card: string;
  cardAlt: string;
}

interface VideosFamososSectionProps {
  themeClasses: ThemeClasses;
}

const videosFamosos: VideoFamoso[] = [
  {
    id: 1,
    name: "Antony",
    description: "Cantor sertanejo que escolheu a Decol Design para sua casa",
    videoSrc: "/Antony.mp4",
  },
  {
    id: 2,
    name: "Ana Mosconi",
    description: "Influenciadora que confiou em nosso atendimento VIP",
    videoSrc: "/AnaMosconi.mp4",
  },
  {
    id: 3,
    name: "Alex ppa",
    description: "Artista que encontrou o estilo perfeito em nossa loja",
    videoSrc: "/Alexppa.mp4",
  },
];

export default function VideosFamososSection({
  themeClasses,
}: VideosFamososSectionProps) {
  const [currentVideo, setCurrentVideo] = useState(0);

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videosFamosos.length);
  };

  const prevVideo = () => {
    setCurrentVideo(
      (prev) => (prev - 1 + videosFamosos.length) % videosFamosos.length
    );
  };

  return (
    <section
      className={`py-12 md:py-16 px-3 md:px-4 relative overflow-hidden transition-colors duration-300`}
    >
      {/* Efeito de brilho dourado de fundo
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 via-amber-500/20 to-yellow-600/10 opacity-30"></div> */}

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Título da Seção */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star className="h-6 w-6 md:h-8 md:w-8 text-gold-400" />
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-400 bg-clip-text text-transparent font-playfair drop-shadow-lg">
              FAMOSOS QUE JÁ ESCOLHERAM A DECOL DESIGN
            </h2>
            <Star className="h-6 w-6 md:h-8 md:w-8 text-gold-400" />
          </div>
          <p
            className={`text-base md:text-xl ${themeClasses.textMuted} font-medium max-w-3xl mx-auto`}
          >
            <strong className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
              Celebridades e influenciadores
            </strong>{" "}
            que confiaram em nosso atendimento VIP e levaram o luxo da Decol
            Design para suas casas
          </p>
        </div>

        {/* Carrossel */}
        <div className="relative max-w-sm md:max-w-md mx-auto">
          {/* Video Principal */}
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <div className="aspect-[9/16] relative bg-black">
              <video
                key={videosFamosos[currentVideo].id}
                className="w-full h-full object-cover"
                controls
                muted
                playsInline
              >
                <source
                  src={videosFamosos[currentVideo].videoSrc}
                  type="video/mp4"
                />
                Seu navegador não suporta a tag de vídeo.
              </video>

              {/* Informações do Famoso */}
              <div className="absolute top-4 left-4 right-4 bg-black/70 backdrop-blur-sm text-white p-3 rounded-lg">
                <h3 className="text-base md:text-lg font-bold mb-1 bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent">
                  {videosFamosos[currentVideo].name}
                </h3>
                <p className="text-xs md:text-sm opacity-90">
                  {videosFamosos[currentVideo].description}
                </p>
              </div>
            </div>
          </div>

          {/* Controles do Carrossel */}
          <button
            onClick={prevVideo}
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-2 md:p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
            aria-label="Vídeo anterior"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          <button
            onClick={nextVideo}
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-2 md:p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
            aria-label="Próximo vídeo"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          {/* Indicadores */}
          <div className="flex justify-center gap-2 mt-6">
            {videosFamosos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentVideo(index)}
                className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                  index === currentVideo
                    ? "bg-gold-400 scale-125"
                    : "bg-gray-500 hover:bg-gray-400"
                }`}
                aria-label={`Ir para vídeo ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8 md:mt-12">
          <p className={`text-lg md:text-xl ${themeClasses.text} mb-6`}>
            <strong className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
              Você também pode fazer parte
            </strong>{" "}
            da nossa clientela VIP!
          </p>
          <button
            onClick={() =>
              window.open(
                "https://wa.me/5543991201005?text=Olá, preciso de um atendimento VIP!🤩✨",
                "_blank"
              )
            }
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            FALAR COM A LOJA DOS FAMOSOS
          </button>
        </div>
      </div>
    </section>
  );
}
