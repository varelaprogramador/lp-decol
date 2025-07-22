"use client";

import type React from "react";
import Image from "next/image";
import { Check, Star, Play, Pause, X, Clock, Lock, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect, useCallback } from "react";
import { useMobile } from "@/hooks/use-mobile";
import BotaoLead from "./components/button-group";

// Update the component to use the mobile detection
export default function DecolDesignVSL() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    whatsapp: "",
  });
  const [videoProgress, setVideoProgress] = useState(0);

  const [countdown, setCountdown] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });
  const [isMuted, setIsMuted] = useState(true);
  const [videoEnded, setVideoEnded] = useState(false);

  const isMobile = useMobile();
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Initialize countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        setVideoEnded(false); // Reset the ended state when playing again
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  // Update the modal/drawer close function to handle both
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    let valid = true;
    const newErrors = { name: "", whatsapp: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
      valid = false;
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp é obrigatório";
      valid = false;
    } else if (!/^[0-9]{10,11}$/.test(formData.whatsapp.replace(/\D/g, ""))) {
      newErrors.whatsapp = "WhatsApp inválido";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      // Here you would typically send the data to your backend
      console.log("Form submitted:", formData);

      // Show success message and close modal
      alert(
        "Orçamento solicitado com sucesso! Entraremos em contato em breve."
      );
      closeModal();

      // Reset form
      setFormData({
        name: "",
        whatsapp: "",
        email: "",
      });
    }
  };

  // Update the click outside handler to work with both modal and drawer
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile) {
        // For drawer, only close if clicking above the drawer (not inside)
        if (
          drawerRef.current &&
          !drawerRef.current.contains(event.target as Node)
        ) {
          const clickY = event.clientY;
          const drawerTop = window.innerHeight - drawerRef.current.offsetHeight;
          if (clickY < drawerTop) {
            closeModal();
          }
        }
      } else {
        // For modal, close if clicking outside
        if (
          modalRef.current &&
          !modalRef.current.contains(event.target as Node)
        ) {
          closeModal();
        }
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, isMobile]);

  // Video event listeners
  useEffect(() => {
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => {
      if (videoRef.current) {
        const progress =
          (videoRef.current.currentTime / videoRef.current.duration) * 100;
        setVideoProgress(progress);
      }
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setVideoEnded(true);
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("play", handlePlay);
      videoElement.addEventListener("pause", handlePause);
      videoElement.addEventListener("timeupdate", handleTimeUpdate);
      videoElement.addEventListener("ended", handleEnded);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("play", handlePlay);
        videoElement.removeEventListener("pause", handlePause);
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
        videoElement.removeEventListener("ended", handleEnded);
      }
    };
  }, []);

  // Format WhatsApp number as user types
  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7)
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(
      7,
      11
    )}`;
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  // Update the JSX to include mobile-specific adjustments
  return (
    <div className="flex flex-col min-h-screen bg-black text-white overflow-x-hidden">
      {/* Header - Minimal for VSL */}
      <header className="py-3 sm:py-4 px-4 bg-black border-b border-gold-400/20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center">
            <Image
              src={"/logo.png"}
              width={400}
              height={200}
              className=""
              alt={"Decol Design - Design de Interiores em Londrina"}
            ></Image>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1 sm:gap-2 bg-gold-400/10 px-2 sm:px-4 py-1 sm:py-2 rounded-md">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-gold-400" />
                <span className="text-xs sm:text-sm font-medium">
                  {String(countdown.hours).padStart(2, "0")}:
                  {String(countdown.minutes).padStart(2, "0")}:
                  {String(countdown.seconds).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main VSL Section */}
      <main className="flex-1">
        {/* Hero Section with Video */}
        <section className="py-6 sm:py-10 px-4 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
                <span className="text-gold-400">DESIGN DE INTERIORES EM LONDRINA: </span>
                Transforme Sua Casa em um Ambiente de <span className="text-gold-400">LUXO</span>
              </h1>
              <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto">
                Projetos personalizados de decoração e design de interiores com móveis planejados sob medida.
                Veja como criar ambientes sofisticados gastando menos.
              </p>
            </div>

            {/* Main Video - Adjusted for mobile */}
            <div className="relative rounded-xl overflow-hidden border-2 border-gold-400/30 shadow-[0_0_30px_rgba(212,175,55,0.15)] mb-6 sm:mb-8">
              <div className="aspect-video relative">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  poster="/placeholder.svg?height=1080&width=1920"
                  controls={false}
                  muted={isMuted}
                  autoPlay
                  playsInline
                >
                  <source src="/video2.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Video Controls Overlay - Adjusted for mobile */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                  <button
                    onClick={togglePlay}
                    className={`bg-gold-400 hover:bg-gold-500 text-black p-4 sm:p-6 rounded-full transition-all duration-300 transform hover:scale-105 ${isPlaying && !videoEnded ? "opacity-0" : "opacity-100"
                      }`}
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? (
                      <Pause className="h-8 w-8 sm:h-12 sm:w-12" />
                    ) : (
                      <Play className="h-8 w-8 sm:h-12 sm:w-12 ml-1" />
                    )}
                  </button>
                </div>

                {/* Sound Control Button */}
                <button
                  onClick={toggleMute}
                  className="absolute bottom-8 left-8 z-20 bg-gold-400/20 text-gold-600 hover:bg-gold-400/30 p-3 rounded-full transition-all duration-300 gap-4 flex items-center"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gold-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                          clipRule="evenodd"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                        />
                      </svg>
                      Ativar o som
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gold-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                        />
                      </svg>
                      Desativar o som
                    </>
                  )}
                </button>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 sm:h-2 bg-gray-800">
                  <div
                    className="h-full bg-gold-400 transition-all duration-300"
                    style={{ width: `${videoProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gold-900/50 to-black border-2 border-gold-400 rounded-xl p-4 sm:p-8 mb-8 sm:mb-12 animate-fadeIn">
              <div className="text-center mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
                  SOLICITE SEU ORÇAMENTO GRATUITO
                </h2>
                <p className="text-base sm:text-lg text-gray-300 mb-3 sm:mb-4">
                  Receba uma <span className="text-gold-400 font-bold">consulta gratuita</span> e descubra como transformar sua casa
                  {" "}com projetos de design de interiores personalizados em Londrina
                </p>
                <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-gold-400" />
                  <p className="text-sm sm:text-base text-gold-400 font-medium">
                    Promoção válida por mais{" "}
                    {String(countdown.hours).padStart(2, "0")}:
                    {String(countdown.minutes).padStart(2, "0")}:
                    {String(countdown.seconds).padStart(2, "0")}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 justify-center">
                <BotaoLead />
              </div>

              <div className="mt-3 sm:mt-4 text-center">
                <p className="text-xs sm:text-sm text-gray-400 flex items-center justify-center gap-1">
                  <Lock className="h-3 w-3 sm:h-4 sm:w-4" /> Atendimento limitado -
                  Apenas 5 consultas gratuitas hoje
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-12 px-4 bg-black">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                O que Nossos Clientes Dizem Sobre Nossos Projetos de Design
              </h2>
              <p className="text-gray-300">
                Mais de 200 projetos realizados em Londrina e região com total satisfação dos clientes
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Testimonial 1 */}
              <div className="bg-gray-900/30 p-6 rounded-xl border border-gray-800 relative">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                  <div className="w-10 h-10 rounded-full bg-gold-400 flex items-center justify-center">
                    <Star className="h-5 w-5 text-black" fill="black" />
                  </div>
                </div>
                <div className="pt-4">
                  <div className="flex justify-center mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-4 w-4 fill-gold-400 text-gold-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 text-center mb-4">
                    &quot;Transformaram completamente minha sala. O projeto ficou exatamente como eu sempre sonhei.
                    Recomendo para quem busca design de qualidade em Londrina.&quot;
                  </p>
                  <div className="text-center">
                    <h4 className="font-bold">Marina Silva</h4>
                    <p className="text-gold-400 text-sm">Zona Sul - Londrina</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-gray-900/30 p-6 rounded-xl border border-gray-800 relative">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                  <div className="w-10 h-10 rounded-full bg-gold-400 flex items-center justify-center">
                    <Star className="h-5 w-5 text-black" fill="black" />
                  </div>
                </div>
                <div className="pt-4">
                  <div className="flex justify-center mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-4 w-4 fill-gold-400 text-gold-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 text-center mb-4">
                    &quot;Móveis planejados de excelente qualidade. O projeto do quarto do meu filho ficou perfeito
                    e o atendimento foi excepcional do início ao fim.&quot;
                  </p>
                  <div className="text-center">
                    <h4 className="font-bold">Roberto Nascimento</h4>
                    <p className="text-gold-400 text-sm">Centro - Londrina</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-gray-900/30 p-6 rounded-xl border border-gray-800 relative">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                  <div className="w-10 h-10 rounded-full bg-gold-400 flex items-center justify-center">
                    <Star className="h-5 w-5 text-black" fill="black" />
                  </div>
                </div>
                <div className="pt-4">
                  <div className="flex justify-center mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-4 w-4 fill-gold-400 text-gold-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 text-center mb-4">
                    &quot;Cozinha dos sonhos! O projeto integrou perfeitamente com a área gourmet.
                    Profissionais competentes que cumprem o que prometem.&quot;
                  </p>
                  <div className="text-center">
                    <h4 className="font-bold">Ana Paula</h4>
                    <p className="text-gold-400 text-sm">Gleba Palhano - Londrina</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 px-4 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Por Que Escolher a <span className="text-gold-400">DECOL DESIGN</span> Para Seu Projeto
              </h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                Especialistas em design de interiores e móveis planejados em Londrina há mais de 10 anos.
                Transformamos espaços com elegância e funcionalidade.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-900/30 p-6 rounded-xl border border-gray-800 hover:border-gold-400/30 transition-all">
                <div className="w-14 h-14 rounded-full bg-gold-400/10 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-gold-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Projetos 100% Personalizados
                </h3>
                <p className="text-gray-400 mb-4">
                  Cada projeto é único e desenvolvido especialmente para suas necessidades,
                  estilo de vida e orçamento. Móveis planejados sob medida para aproveitamento total do espaço.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-gold-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300">
                      Visita técnica gratuita
                    </p>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-gold-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300">Projeto 3D realístico</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-gold-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300">Acompanhamento completo da obra</p>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-900/30 p-6 rounded-xl border border-gray-800 hover:border-gold-400/30 transition-all">
                <div className="w-14 h-14 rounded-full bg-gold-400/10 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-gold-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Materiais de Alta Qualidade</h3>
                <p className="text-gray-400 mb-4">
                  Trabalhamos apenas com fornecedores certificados e materiais premium.
                  Garantia estendida em todos os móveis e acabamentos.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-gold-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300">MDF 18mm de primeira linha</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-gold-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300">Ferragens Blum importadas</p>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-gold-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300">5 anos de garantia</p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bonus Section */}
            <div className="bg-gradient-to-r from-gold-900/30 to-black border border-gold-400/30 rounded-xl p-6 mb-10">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-gold-400/20 flex items-center justify-center flex-shrink-0">
                  <Gift className="h-10 w-10 text-gold-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    BÔNUS: CONSULTORIA GRATUITA EM SUA CASA
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Agende hoje sua consulta <span className="text-gold-400 font-bold">100% GRATUITA</span> e receba
                    dicas profissionais para transformar seus ambientes + catálogo com 100 projetos de inspiração.
                  </p>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-gold-400" />
                    <p className="text-gold-400 font-medium">
                      Valor da consultoria: R$ 350,00 - Hoje: GRÁTIS
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary CTA */}
            <div className="text-center">
              <BotaoLead />

              <p className="mt-4 text-gray-400">
                Apenas <span className="text-gold-400 font-bold">5 consultas gratuitas</span> disponíveis hoje
              </p>
            </div>
          </div>
        </section>


        {/* FAQ Section */}
        <section className="py-12 px-4 bg-black">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Como funciona as ofertas do Grupo VIP
              </h2>
              <p className="text-gray-300">
                *Ofertas tem validade de tempo ou quantidade, estarao
                descriminadas na oferta.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-900/30 p-6 rounded-xl border border-gray-800">
                <h3 className="text-lg font-bold mb-3">
                  Como faço para aproveitar e comprar as ofertas do grupo vip?
                </h3>
                <p className="text-gray-300">
                  para efetivar sua compra é necessario envio dos dados basicos
                  como NOME, CPF, ENDEREÇO , TELEFONE com o pagamento. Apos é
                  feito contrato de compra e enviado ao cliente.
                </p>
              </div>

              <div className="bg-gray-900/30 p-6 rounded-xl border border-gray-800">
                <h3 className="text-lg font-bold mb-3">
                  Quais sao as formas de pagamento?{" "}
                </h3>
                <p className="text-gray-300">
                  Pagamento das ofertas especiais, sao via PIX ou link de
                  pagamento como parcelamento em ate 12x cartao.
                </p>
              </div>

              <div className="bg-gray-900/30 p-6 rounded-xl border border-gray-800">
                <h3 className="text-lg font-bold mb-3">
                  Como funciona a entrega dos produtos?
                </h3>
                <p className="text-gray-300">
                  para produtos em estoque pronta entrega, apos identificação do
                  pagamento, ocorre o agendamento da entrega ou despacho via
                  transportadora.
                  <br /> <br /> para produtos em linha de produção, dentro do
                  prazo de contrato, assim que descarregar em nosso centro de
                  distribuição é feito o agendamento de entrega ou despacho via
                  transportadora.
                </p>
              </div>
              {/* 
              <div className="bg-gray-900/30 p-6 rounded-xl border border-gray-800">
                <h3 className="text-lg font-bold mb-3">
                  Vocês oferecem financiamento para os projetos?
                </h3>
                <p className="text-gray-300">
                  Sim, trabalhamos com diversas opções de pagamento, incluindo
                  parcelamento em até 12x no cartão de crédito e financiamento
                  bancário para projetos maiores. Durante o atendimento,
                  apresentamos todas as opções disponíveis.
                </p>
              </div> */}
            </div>
          </div>
        </section>

        {/* Final CTA Section - Adjusted for mobile */}
        <section className="py-10 sm:py-16 px-4 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/placeholder.svg?height=800&width=1920"
              alt="Interior de luxo"
              fill
              className="object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/80"></div>
          </div>

          <div className="container mx-auto max-w-4xl px-4 sm:px-6 relative z-10 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Entre para o Grupo VIP da Decol Design hoje e tenho acesso a
              ofertas especiais que estão disponíveis{" "}
              <span className="text-gold-400">EXCLUSIVAMENTE</span> para o
              <span className="text-gold-400"> GRUPO.</span>
            </h2>

            <div className="bg-black/50 backdrop-blur-sm border border-gold-400 rounded-xl p-4 sm:p-8 mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-gold-400" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-400">
                      Oferta expira em:
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-gold-400">
                      {String(countdown.hours).padStart(2, "0")}:
                      {String(countdown.minutes).padStart(2, "0")}:
                      {String(countdown.seconds).padStart(2, "0")}
                    </p>
                  </div>
                </div>

                <div className="h-px w-20 sm:h-12 sm:w-px bg-gray-700 block my-2 sm:block"></div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <Lock className="h-5 w-5 sm:h-6 sm:w-6 text-gold-400" />
                  <div>
                    <p className="text-xs sm:text-sm text-gray-400">
                      Vagas disponíveis:
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-gold-400">
                      5
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <BotaoLead />

            <p className="mt-4 sm:mt-6 text-gray-400 text-xs sm:text-sm">
              Ao clicar no botão acima, você terá acesso imediato ao nosso Grupo
              VIP e todas as ofertas exclusivas
            </p>
          </div>
        </section>
      </main>

      {/* Footer - Adjusted for mobile */}
      <footer className="py-4 sm:py-8 px-4 bg-black border-t border-gray-800">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-lg sm:text-xl font-bold text-gold-400">
                DECOL DESIGN
              </h2>
              <p className="text-xs text-gray-400">Loja dos Famosos</p>
            </div>

            <div className="text-center md:text-right">
              <p className="text-gray-400 text-xs sm:text-sm">
                © 2025 DECOL DESIGN. Todos os direitos reservados.
              </p>
              <div className="flex items-center justify-center md:justify-end gap-2 sm:gap-4 mt-2">
                <a
                  href="#"
                  className="text-xs sm:text-sm text-gray-400 hover:text-gold-400 transition-colors"
                >
                  Termos de Uso
                </a>
                <span className="text-gray-600">|</span>
                <a
                  href="#"
                  className="text-xs sm:text-sm text-gray-400 hover:text-gold-400 transition-colors"
                >
                  Política de Privacidade
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal for desktop / Drawer for mobile */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 overflow-hidden">
          {isMobile ? (
            // Drawer for mobile
            <div
              ref={drawerRef}
              className="bg-gray-900 border-t-2 border-gold-400 rounded-t-xl w-full max-h-[90vh] overflow-y-auto p-5 shadow-[0_0_30px_rgba(212,175,55,0.2)] animate-slideUp"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">
                  Entre Para o Grupo VIP Exclusivo
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Fechar drawer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Drawer handle indicator */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-gray-600 rounded-full"></div>

              <p className="text-gray-300 mb-5 text-sm">
                Preencha o formulário abaixo para garantir sua vaga e receber
                seu bônus exclusivo
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="drawer-name"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Nome Completo <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="drawer-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-800 border ${errors.name ? "border-red-500" : "border-gray-700"
                      } rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-gold-400/50`}
                    placeholder="Seu nome completo"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="drawer-whatsapp"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    WhatsApp <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="tel"
                    id="drawer-whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={(e) => {
                      const formatted = formatWhatsApp(e.target.value);
                      setFormData((prev) => ({ ...prev, whatsapp: formatted }));

                      // Clear error when user types
                      if (errors.whatsapp) {
                        setErrors((prev) => ({ ...prev, whatsapp: "" }));
                      }
                    }}
                    className={`w-full bg-gray-800 border ${errors.whatsapp ? "border-red-500" : "border-gray-700"
                      } rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-gold-400/50`}
                    placeholder="(00) 00000-0000"
                  />
                  {errors.whatsapp && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.whatsapp}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="drawer-email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email <span className="text-gray-500">(opcional)</span>
                  </label>
                  <input
                    type="email"
                    id="drawer-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-gold-400/50"
                    placeholder="seu@email.com"
                  />
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-gold-400 hover:bg-gold-500 text-black font-bold py-4 rounded-md transition-all text-base"
                  >
                    GARANTIR MINHA VAGA NO GRUPO VIP
                  </Button>

                  <div className="mt-4 flex items-center justify-center gap-2 bg-gold-400/10 p-3 rounded-md">
                    <Gift className="h-4 w-4 text-gold-400" />
                    <p className="text-xs text-gold-300">
                      + Catálogo digital com 100 ambientes de luxo GRÁTIS
                    </p>
                  </div>

                  <p className="text-center text-gray-500 text-xs mt-4">
                    Seus dados estão seguros e não serão compartilhados com
                    terceiros
                  </p>
                </div>
              </form>
            </div>
          ) : (
            // Modal for desktop
            <div
              ref={modalRef}
              className="bg-gray-900 border-2 border-gold-400 rounded-xl w-full max-w-md p-6 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">
                  Entre Para o Grupo VIP Exclusivo
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Fechar modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="text-gray-300 mb-6">
                Preencha o formulário abaixo para garantir sua vaga e receber
                seu bônus exclusivo
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="modal-name"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Nome Completo <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="modal-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-800 border ${errors.name ? "border-red-500" : "border-gray-700"
                      } rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-gold-400/50`}
                    placeholder="Seu nome completo"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="modal-whatsapp"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    WhatsApp <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="tel"
                    id="modal-whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={(e) => {
                      const formatted = formatWhatsApp(e.target.value);
                      setFormData((prev) => ({ ...prev, whatsapp: formatted }));

                      // Clear error when user types
                      if (errors.whatsapp) {
                        setErrors((prev) => ({ ...prev, whatsapp: "" }));
                      }
                    }}
                    className={`w-full bg-gray-800 border ${errors.whatsapp ? "border-red-500" : "border-gray-700"
                      } rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-gold-400/50`}
                    placeholder="(00) 00000-0000"
                  />
                  {errors.whatsapp && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.whatsapp}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="modal-email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email <span className="text-gray-500">(opcional)</span>
                  </label>
                  <input
                    type="email"
                    id="modal-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-gold-400/50"
                    placeholder="seu@email.com"
                  />
                </div>

                <div className="pt-4">
                  <BotaoLead />

                  <div className="mt-4 flex items-center justify-center gap-2 bg-gold-400/10 p-3 rounded-md">
                    <Gift className="h-5 w-5 text-gold-400" />
                    <p className="text-sm text-gold-300">
                      + Catálogo digital com 100 ambientes de luxo GRÁTIS
                    </p>
                  </div>

                  <p className="text-center text-gray-500 text-xs mt-4">
                    Seus dados estão seguros e não serão compartilhados com
                    terceiros
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
