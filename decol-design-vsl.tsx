"use client";
import type React from "react";
import Image from "next/image";
import {
  Check,
  Star,
  Play,
  Pause,
  X,
  MapPin,
  Phone,
  Clock,
  Mail,
  Navigation,
  Sun,
  Moon,
  Maximize,
  Minimize,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect, useCallback } from "react";
import { useMobile } from "@/hooks/use-mobile";
import ProductsSection from "@/components/productsSection";
import VideosFamososSection from "@/components/videosFamososSection";

export default function DecolDesignShowroom() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    whatsapp: "",
  });
  const [videoProgress, setVideoProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [videoEnded, setVideoEnded] = useState(false);
  const isMobile = useMobile();
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const expandedVideoRef = useRef<HTMLVideoElement>(null);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeClasses = {
    bg: isDarkMode ? "bg-gray-900" : "bg-white",
    bgAlt: isDarkMode ? "bg-black" : "bg-gray-50",
    text: isDarkMode ? "text-white" : "text-gray-900",
    textMuted: isDarkMode ? "text-gray-300" : "text-gray-600",
    border: isDarkMode ? "border-gray-700" : "border-gray-200",
    card: isDarkMode ? "bg-gray-800" : "bg-white",
    cardAlt: isDarkMode ? "bg-gray-700" : "bg-gray-50",
  };

  const togglePlay = useCallback(() => {
    const currentVideo = isVideoExpanded
      ? expandedVideoRef.current
      : videoRef.current;
    if (currentVideo) {
      if (isPlaying) {
        currentVideo.pause();
      } else {
        currentVideo.play();
        setVideoEnded(false);
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying, isVideoExpanded]);

  const toggleVideoExpanded = () => {
    setIsVideoExpanded(!isVideoExpanded);
    if (!isVideoExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  // const openModal = () => {
  //   setIsModalOpen(true);
  //   document.body.style.overflow = "hidden";
  // };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
      console.log("Form submitted:", formData);
      alert("Mensagem enviada! Entraremos em contato em breve.");
      closeModal();
      setFormData({
        name: "",
        whatsapp: "",
        email: "",
        message: "",
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile) {
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

  useEffect(() => {
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => {
      const currentVideo = isVideoExpanded
        ? expandedVideoRef.current
        : videoRef.current;
      if (currentVideo) {
        const progress =
          (currentVideo.currentTime / currentVideo.duration) * 100;
        setVideoProgress(progress);
      }
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setVideoEnded(true);
    };

    const videoElement = isVideoExpanded
      ? expandedVideoRef.current
      : videoRef.current;
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
  }, [isVideoExpanded]);

  // Sync video time when switching between normal and expanded
  useEffect(() => {
    if (isVideoExpanded && videoRef.current && expandedVideoRef.current) {
      expandedVideoRef.current.currentTime = videoRef.current.currentTime;
      if (isPlaying) {
        expandedVideoRef.current.play();
      }
    } else if (
      !isVideoExpanded &&
      videoRef.current &&
      expandedVideoRef.current
    ) {
      videoRef.current.currentTime = expandedVideoRef.current.currentTime;
      if (isPlaying) {
        videoRef.current.play();
      }
    }
  }, [isVideoExpanded, isPlaying]);

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
    const currentVideo = isVideoExpanded
      ? expandedVideoRef.current
      : videoRef.current;
    if (currentVideo) {
      const newMutedState = !currentVideo.muted;
      currentVideo.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  const openWhatsApp = () => {
    const message = "Olá, preciso de um atendimento VIP! 🤩✨";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5543991201005?text=${encodedMessage}`, "_blank");
  };

  const openMaps = () => {
    window.open(
      "https://www.google.com/maps/place/DECOL+DESIGN+-+LOJA+DOS+FAMOSOS/@-23.2648510,-51.1556386,17z/data=!3m1!4b1!4m6!3m5!1s0x94eb45fd2f23f967:0x8c031b1798108722!8m2!3d-23.2648510!4d-51.1556386!16s%2Fg%2F11y3k8qp0q",
      "_blank"
    );
  };

  return (
    <div
      className={`flex flex-col min-h-screen ${themeClasses.bg} ${themeClasses.text} overflow-x-hidden transition-colors duration-300`}
    >
      {/* Header Mobile Otimizado */}
      <header
        className={`py-3 md:py-4 px-3 md:px-4 ${themeClasses.bg} shadow-sm ${themeClasses.border} border-b sticky top-0 z-40`}
      >
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-center">
            <Image
              src={"/logo.png"}
              width={isMobile ? 200 : 280}
              height={isMobile ? 100 : 140}
              className=""
              alt={"Decol Design - Loja dos Famosos - Londrina"}
            />

            <div className="flex items-center gap-2 md:gap-4">
              {/* Localização Mobile Compacta */}
              {!isMobile && (
                <div className="hidden lg:flex items-center gap-6 bg-gold-600 text-white px-6 py-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <div>
                      <p className="font-semibold text-sm">Londrina/PR</p>
                      <p className="text-xs opacity-90">
                        R. Lupércio Pozato, 933
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    <div>
                      <p className="font-semibold text-sm">(43) 99120-1005</p>
                      <p className="text-xs opacity-90">Seg-Sex: 8h-18h</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Location Compact */}
              {isMobile && (
                <div className="flex flex-col items-end text-xs">
                  <div className="flex items-center gap-1 text-gold-600">
                    <MapPin className="h-3 w-3" />
                    <span className="font-medium">Londrina/PR</span>
                  </div>
                  <div className="flex items-center gap-1 text-gold-600">
                    <Phone className="h-3 w-3" />
                    <span className="font-medium">(43) 99120-1005</span>
                  </div>
                </div>
              )}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${themeClasses.cardAlt} ${themeClasses.border} border transition-colors`}
                aria-label="Alternar tema"
              >
                {isDarkMode ? (
                  <Sun className="h-4 w-4 md:h-5 md:w-5 text-gold-500" />
                ) : (
                  <Moon className="h-4 w-4 md:h-5 md:w-5 text-gold-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section Mobile Otimizado */}
        <section className={`py-8 md:py-20 px-3 md:px-4 ${themeClasses.bgAlt}`}>
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-8 md:mb-12">
              <h1
                className={`text-2xl md:text-6xl font-bold mb-4 md:mb-2  leading-tight`}
              >
                <div
                  className="font-playfair drop-shadow-sm"
                  style={{
                    background:
                      "linear-gradient(to right, #facc15, #eab308, #d97706)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  DECOL DESIGN
                </div>

                <span
                  className="text-lg md:text-4xl font-playfair"
                  style={{
                    background:
                      "linear-gradient(to right, #f59e0b, #eab308, #d97706)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  A Loja dos Famosos
                </span>
              </h1>
              <p
                className={`text-base md:text-2xl ${themeClasses.textMuted} max-w-4xl mx-auto mb-6 md:mb-8 font-medium px-2`}
              >
                <strong>Estofados de Alto Padrão</strong> e{" "}
                <strong>Salas de Jantar Sob Medida</strong>
                <br />
                Onde celebridades e clientes exigentes encontram sofisticação em
                Londrina/PR
              </p>
              <div className="flex flex-col gap-3 md:gap-4 justify-center items-center px-3">
                <Button
                  onClick={openWhatsApp}
                  size={isMobile ? "default" : "lg"}
                  className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-6 md:px-10 py-3 md:py-4 text-base md:text-xl font-bold"
                >
                  <Phone className="h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3" />
                  FALAR AGORA NO WHATSAPP
                </Button>
                {/* <Button
                  onClick={openModal}
                  variant="outline"
                  size={isMobile ? "default" : "lg"}
                  className={`w-full md:w-auto border-gold-600 text-gold-600 hover:bg-gold-50 px-6 md:px-10 py-3 md:py-4 text-base md:text-xl font-bold ${isDarkMode ? "hover:bg-gold-900/20" : ""} bg-transparent`}
                >
                  SOLICITAR ORÇAMENTO
                </Button> */}
              </div>
            </div>

            {/* Vídeo com Expansão */}
            <div className="mb-12 md:mb-16">
              <div className="text-center mb-6 md:mb-8 px-3">
                <h2
                  className="text-xl md:text-4xl font-bold mb-3 md:mb-4 font-playfair drop-shadow-sm"
                  style={{
                    background:
                      "linear-gradient(to right, #facc15, #f59e0b, #d97706)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  CONHEÇA NOSSO SHOWROOM EXCLUSIVO
                </h2>
                <p
                  className={`text-sm md:text-lg ${themeClasses.textMuted} max-w-3xl mx-auto`}
                >
                  <strong>2 andares de luxo</strong> com curadoria exclusiva de
                  estofados e salas de jantar
                </p>
              </div>

              {/* Vídeo Principal */}
              <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl max-w-6xl mx-auto">
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

                  {/* Controles do Vídeo */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <button
                      onClick={togglePlay}
                      className={`bg-gold-600 hover:bg-gold-700 text-white p-3 md:p-6 lg:p-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl ${
                        isPlaying && !videoEnded ? "opacity-0" : "opacity-100"
                      }`}
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                    >
                      {isPlaying ? (
                        <Pause className="h-6 w-6 md:h-12 md:w-12 lg:h-16 lg:w-16" />
                      ) : (
                        <Play className="h-6 w-6 md:h-12 md:w-12 lg:h-16 lg:w-16 ml-1" />
                      )}
                    </button>
                  </div>

                  {/* Controles Inferiores */}
                  <div className="absolute bottom-3 md:bottom-6 left-3 md:left-6 right-3 md:right-6 flex justify-between items-center">
                    <button
                      onClick={toggleMute}
                      className="bg-black/70 text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:bg-black/90"
                      aria-label={isMuted ? "Unmute video" : "Mute video"}
                    >
                      {isMuted ? (
                        <svg
                          className="h-4 w-4 md:h-6 md:w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-4 w-4 md:h-6 md:w-6"
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
                      )}
                    </button>

                    <button
                      onClick={toggleVideoExpanded}
                      className="bg-black/70 text-white p-2 md:p-3 rounded-full transition-all duration-300 hover:bg-black/90"
                      aria-label="Expandir vídeo"
                    >
                      <Maximize className="h-4 w-4 md:h-6 md:w-6" />
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 md:h-2 bg-black/50">
                    <div
                      className="h-full bg-gold-600 transition-all duration-300"
                      style={{ width: `${videoProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Destaques do Vídeo - Mobile Otimizado */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8 max-w-4xl mx-auto px-3">
                <div
                  className={`${themeClasses.card} p-4 md:p-6 rounded-lg md:rounded-xl shadow-sm ${themeClasses.border} border text-center`}
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <svg
                      className="h-5 w-5 md:h-6 md:w-6 text-gold-600"
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
                  <h3
                    className={`font-bold text-base md:text-lg mb-2 ${themeClasses.text}`}
                  >
                    O maior Showroom do Norte do Paraná
                  </h3>
                  <p className={`${themeClasses.textMuted} text-xs md:text-sm`}>
                    espaço completo com peças personalizadas
                  </p>
                </div>

                <div
                  className={`${themeClasses.card} p-4 md:p-6 rounded-lg md:rounded-xl shadow-sm ${themeClasses.border} border text-center`}
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <Star className="h-5 w-5 md:h-6 md:w-6 text-gold-600" />
                  </div>
                  <h3
                    className={`font-bold text-base md:text-lg mb-2 ${themeClasses.text}`}
                  >
                    Loja dos Famosos
                  </h3>
                  <p className={`${themeClasses.textMuted} text-xs md:text-sm`}>
                    já fizemos parte da casa de muitas celebridades!
                  </p>
                </div>

                <div
                  className={`${themeClasses.card} p-4 md:p-6 rounded-lg md:rounded-xl shadow-sm ${themeClasses.border} border text-center`}
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <MapPin className="h-5 w-5 md:h-6 md:w-6 text-gold-600" />
                  </div>
                  <h3
                    className={`font-bold text-base md:text-lg mb-2 ${themeClasses.text}`}
                  >
                    Londrina/PR
                  </h3>
                  <p className={`${themeClasses.textMuted} text-xs md:text-sm`}>
                    Acesso facilitado e amplo estacionamento exclusivo para
                    clientes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProductsSection />
        <VideosFamososSection themeClasses={themeClasses} />

        {/* Localização Mobile Otimizada */}
        <section className="py-12 md:py-16 px-3 md:px-4 bg-gold-600 text-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6  text-white font-playfair drop-shadow-sm">
                  VISITE A LOJA DOS FAMOSOS EM LONDRINA
                </h2>
                <p className="text-base md:text-xl mb-6 md:mb-8 opacity-90">
                  <strong>Localização privilegiada</strong> no Parque Industrial
                  de Londrina com fácil acesso e estacionamento. Venha conhecer
                  pessoalmente nossa coleção exclusiva.
                </p>

                <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  <div className="flex items-start gap-3 md:gap-4">
                    <MapPin className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-base md:text-lg">
                        R. Lupércio Pozato, 933
                      </p>
                      <p className="opacity-90 text-sm md:text-base">
                        Parque Industrial, Londrina/PR - CEP 86084-450
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:gap-4">
                    <Clock className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm md:text-base">
                        Seg-Sex: 8:30h às 18h | Sáb: 8:30h às 14h
                      </p>
                      <p className="opacity-90 text-sm">Domingo: Fechado</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:gap-4">
                    <Phone className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-base md:text-lg">
                        (43) 99120-1005
                      </p>
                      <p className="opacity-90 text-sm">WhatsApp disponível</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                  <Button
                    onClick={openMaps}
                    size={isMobile ? "default" : "lg"}
                    className="w-full md:w-auto bg-white text-gold-600 hover:bg-gray-100 px-6 md:px-8 py-3 font-bold"
                  >
                    <Navigation className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                    VER NO GOOGLE MAPS
                  </Button>
                  <Button
                    onClick={openWhatsApp}
                    size={isMobile ? "default" : "lg"}
                    variant="outline"
                    className="w-full md:w-auto border-white text-white hover:bg-white hover:text-gold-600 px-6 md:px-8 py-3 font-bold bg-transparent"
                  >
                    <Phone className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                    LIGAR AGORA
                  </Button>
                </div>
              </div>

              <div className="relative order-1 md:order-2">
                {/* Google Maps Mobile Otimizado */}
                <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d916.3504134382918!2d-51.155638630358226!3d-23.26485096662963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94eb45fd2f23f967%3A0x8c031b1798108722!2sDECOL%20DESIGN%20-%20LOJA%20DOS%20FAMOSOS!5e0!3m2!1spt-BR!2sbr!4v1753190887814!5m2!1spt-BR!2sbr"
                    width="100%"
                    height={isMobile ? "300" : "400"}
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl md:rounded-2xl"
                  />
                  <div className="absolute bottom-3 md:bottom-6 left-3 md:left-6 bg-black/70 text-white p-3 md:p-4 rounded-lg">
                    <h3 className="text-base md:text-lg font-bold mb-1">
                      Decol Design
                    </h3>
                    <p className="text-xs md:text-sm opacity-90">
                      A Loja dos Famosos
                    </p>
                    <p className="text-xs opacity-75">
                      Parque Industrial - Londrina/PR
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Restante das seções com otimizações mobile similares... */}
        {/* Sobre a Decol Design - Mobile Otimizado */}
        <section className={`py-12 md:py-16 px-3 md:px-4 ${themeClasses.bg}`}>
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-8 md:mb-12">
              <h2
                className={`text-2xl md:text-4xl font-bold mb-4 md:mb-6 ${themeClasses.text} font-playfair`}
              >
                POR QUE SOMOS A{" "}
                <span
                  className="font-playfair drop-shadow-sm"
                  style={{
                    background:
                      "linear-gradient(to right, #facc15, #f59e0b, #d97706)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  LOJA DOS FAMOSOS
                </span>
              </h2>
              <p
                className={`text-base md:text-xl ${themeClasses.textMuted} font-medium`}
              >
                <strong>Especialistas absolutos</strong> em estofados de alto
                padrão e salas de jantar sob medida
              </p>
            </div>

            <div
              className={`${themeClasses.card} p-6 md:p-12 rounded-xl md:rounded-2xl shadow-lg ${themeClasses.border} border`}
            >
              <div className="prose prose-lg max-w-none leading-relaxed">
                <p className={`text-base md:text-lg mb-6 ${themeClasses.text}`}>
                  <strong>
                    Na Decol Design, sua casa reflete quem você é.
                  </strong>{" "}
                  Sala de estar e sala de jantar são onde as melhores memórias
                  acontecem. Por isso, somos{" "}
                  <strong>especialistas absolutos</strong> em dois pontos
                  centrais do lar:
                  <span className="text-gold-600 font-bold">
                    {" "}
                    estofados de alto padrão
                  </span>{" "}
                  e
                  <span className="text-gold-600 font-bold">
                    {" "}
                    salas de jantar sob medida
                  </span>
                  .
                </p>

                <div className="flex items-center justify-center md:gap-8 my-6 md:my-8">
                  {/* <div>
                    <h3 className={`text-lg md:text-xl font-bold mb-3 md:mb-4 ${themeClasses.text}`}>
                      NOSSOS CLIENTES:
                    </h3>
                    <ul className={`space-y-2 ${themeClasses.textMuted}`}>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 md:h-5 md:w-5 text-gold-600 flex-shrink-0" />
                        <strong className="text-sm md:text-base">Celebridades da região</strong>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 md:h-5 md:w-5 text-gold-600 flex-shrink-0" />
                        <strong className="text-sm md:text-base">Clientes do agro e universo sertanejo</strong>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 md:h-5 md:w-5 text-gold-600 flex-shrink-0" />
                        <strong className="text-sm md:text-base">Arquitetos e designers</strong>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 md:h-5 md:w-5 text-gold-600 flex-shrink-0" />
                        <strong className="text-sm md:text-base">Famílias exigentes</strong>
                      </li>
                    </ul>
                  </div> */}

                  <div>
                    <h3
                      className={`text-lg md:text-xl font-bold mb-3 md:mb-4 ${themeClasses.text}`}
                    >
                      NOSSOS DIFERENCIAIS:
                    </h3>
                    <ul
                      className={`flex flex-col gap-6 ${themeClasses.textMuted}`}
                    >
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 md:h-5 md:w-5 text-gold-600 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="text-sm md:text-base font-bold text-gold-600 mb-1">
                            Especialistas em estofados e salas de jantar
                          </h4>
                          <p className="text-sm md:text-base">
                            Nosso foco está nos dois ambientes mais marcantes do
                            lar: sofás, poltronas, mesas e cadeiras que combinam
                            conforto, estética e personalidade.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 md:h-5 md:w-5 text-gold-600 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="text-sm md:text-base font-bold text-gold-600 mb-1">
                            Personalização total para se adaptar ao seu projeto
                          </h4>
                          <p className="text-sm md:text-base">
                            Você escolhe os detalhes e nós cuidamos do
                            acabamento! Os móveis podem ser personalizados em
                            madeira, serralheria, pedra, tecidos e muito mais!
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 md:h-5 md:w-5 text-gold-600 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="text-sm md:text-base font-bold text-gold-600 mb-1">
                            Showroom com dois andares e estrutura completa
                          </h4>
                          <p className="text-sm md:text-base">
                            Nosso espaço em Londrina oferece uma experiência
                            imersiva, com ambientes cuidadosamente montados para
                            inspirar e apresentar as possibilidades de um alto
                            padrão real.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 md:h-5 md:w-5 text-gold-600 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="text-sm md:text-base font-bold text-gold-600 mb-1">
                            Atendimento VIP e consultoria de verdade
                          </h4>
                          <p className="text-sm md:text-base">
                            Aqui, cada cliente é atendido com tempo, escuta e
                            olhar técnico. Seja com hora marcada ou em visita
                            espontânea, oferecemos um atendimento que entende
                            seu estilo e entrega exatamente o que você procura.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <p className={`text-base md:text-lg mb-6 ${themeClasses.text}`}>
                  <strong>Trabalhamos sob medida e à pronta entrega.</strong>{" "}
                  Nosso showroom em Londrina/PR reúne curadoria exclusiva com
                  acabamentos impecáveis. Atendimento presencial ou com hora
                  marcada, sempre focado no seu estilo e rotina.
                </p>

                <div className="text-center bg-gold-50 dark:bg-gold-900/20 p-6 md:p-8 rounded-xl mt-6 md:mt-8">
                  <p
                    className={`text-lg md:text-xl font-bold ${themeClasses.text} mb-2`}
                  >
                    <strong>
                      Cada móvel é pensado para fazer parte da sua história.
                    </strong>
                  </p>
                  <p
                    className="text-xl md:text-2xl font-bold font-playfair drop-shadow-sm"
                    style={{
                      background:
                        "linear-gradient(to right, #facc15, #f59e0b, #d97706)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Seu projeto começa aqui — e eleva seu viver a um novo
                    padrão.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final Mobile Otimizado */}
        <section className="py-16 md:py-20 px-3 md:px-4 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
          {/* Efeito de brilho dourado de fundo */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 via-amber-500/20 to-yellow-600/10 opacity-30"></div>
          <div className="container mx-auto max-w-5xl text-center relative z-10">
            <h2
              className="text-2xl md:text-5xl font-bold mb-6 md:mb-8 font-playfair drop-shadow-lg"
              style={{
                background:
                  "linear-gradient(to right, #fde047, #facc15, #f59e0b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              VENHA PARA A LOJA DOS FAMOSOS
            </h2>
            <p className="text-base md:text-2xl mb-8 md:mb-12 text-gray-100 font-medium">
              <strong
                style={{
                  background: "linear-gradient(to right, #facc15, #f59e0b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Coleção exclusiva
              </strong>{" "}
              de estofados de alto padrão e salas de jantar sob medida.
              <br />
              <strong
                style={{
                  background: "linear-gradient(to right, #facc15, #f59e0b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Atendimento VIP
              </strong>{" "}
              que eleva seu viver a um novo padrão.
            </p>
            <div className="flex flex-col gap-4 md:gap-6 justify-center mb-6 md:mb-8">
              <Button
                onClick={openWhatsApp}
                size={isMobile ? "default" : "lg"}
                className="w-full md:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 md:px-12 py-4 md:py-5 text-lg md:text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Phone className="h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3" />
                FALAR AGORA NO WHATSAPP
              </Button>
              <Button
                onClick={openWhatsApp}
                size={isMobile ? "default" : "lg"}
                className="w-full md:w-auto bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 hover:from-yellow-500 hover:via-amber-600 hover:to-yellow-700 text-black px-8 md:px-12 py-4 md:py-5 text-lg md:text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                COMPRAR AGORA
              </Button>
            </div>
            <p className="text-sm md:text-lg text-gray-200">
              <strong
                style={{
                  background: "linear-gradient(to right, #facc15, #f59e0b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Londrina/PR
              </strong>{" "}
              • R. Lupércio Pozato, 933 - Parque Industrial •{" "}
              <strong
                style={{
                  background: "linear-gradient(to right, #facc15, #f59e0b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                (43) 99120-1005
              </strong>
            </p>
          </div>
        </section>
      </main>

      {/* Footer Mobile Otimizado */}
      <footer
        className={`py-8 md:py-12 px-3 md:px-4 ${
          isDarkMode ? "bg-black" : "bg-gray-900"
        } text-white`}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div>
              <h3
                className="text-xl md:text-2xl font-bold mb-3 md:mb-4 font-playfair drop-shadow-sm"
                style={{
                  background:
                    "linear-gradient(to right, #facc15, #f59e0b, #d97706)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                DECOL DESIGN
              </h3>
              <p
                className="mb-3 md:mb-4 font-semibold"
                style={{
                  background: "linear-gradient(to right, #fde047, #f59e0b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                A Loja dos Famosos
              </p>
              <p className="text-gray-300 text-sm md:text-base">
                <strong>Especialistas absolutos</strong> em estofados de alto
                padrão e salas de jantar sob medida em Londrina/PR.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-base md:text-lg mb-3 md:mb-4">
                CONTATO DIRETO
              </h4>
              <div className="space-y-2 md:space-y-3 text-gray-300">
                <p className="flex items-center gap-2 md:gap-3 text-sm md:text-base">
                  <Phone className="h-4 w-4 md:h-5 md:w-5 text-gold-400 flex-shrink-0" />
                  <strong>(43) 99120-1005</strong>
                </p>
                <p className="flex items-center gap-2 md:gap-3 text-sm md:text-base">
                  <Mail className="h-4 w-4 md:h-5 md:w-5 text-gold-400 flex-shrink-0" />
                  Admdecoldesign@hotmail.com
                </p>
                <p className="flex items-start gap-2 md:gap-3 text-sm md:text-base">
                  <MapPin className="h-4 w-4 md:h-5 md:w-5 text-gold-400 flex-shrink-0 mt-0.5" />
                  <strong>
                    R. Lupércio Pozato, 933 - Parque Industrial, Londrina/PR
                  </strong>
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-base md:text-lg mb-3 md:mb-4">
                HORÁRIO VIP
              </h4>
              <div className="space-y-1 md:space-y-2 text-gray-300 text-sm md:text-base">
                <p>
                  <strong>Segunda a Sexta:</strong> 8:30h às 18h
                </p>
                <p>
                  <strong>Sábado:</strong> 8:30h às 14h
                </p>
                <p>
                  <strong>Domingo:</strong> Fechado
                </p>
                <p className="text-gold-300 font-medium mt-3 md:mt-4 text-sm">
                  <strong>Atendimento com horário agendado disponível</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 md:mt-12 pt-6 md:pt-8 text-center">
            <p className="text-gray-400 text-xs md:text-sm">
              © 2025 DECOL DESIGN - A Loja dos Famosos. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Modal de Vídeo Expandido */}
      {isVideoExpanded && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="relative w-full h-full">
            <video
              ref={expandedVideoRef}
              className="w-full h-full object-contain"
              controls={false}
              muted={isMuted}
              autoPlay
              playsInline
            >
              <source src="/video2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Controles do Vídeo Expandido */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/10">
              <button
                onClick={togglePlay}
                className={`bg-gold-600 hover:bg-gold-700 text-white p-6 md:p-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl ${
                  isPlaying && !videoEnded ? "opacity-0" : "opacity-100"
                }`}
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? (
                  <Pause className="h-12 w-12 md:h-16 md:w-16" />
                ) : (
                  <Play className="h-12 w-12 md:h-16 md:w-16 ml-2" />
                )}
              </button>
            </div>

            {/* Controles Inferiores Expandido */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
              <button
                onClick={toggleMute}
                className="bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:bg-black/90"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
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
                )}
              </button>

              <button
                onClick={toggleVideoExpanded}
                className="bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:bg-black/90"
                aria-label="Fechar vídeo expandido"
              >
                <Minimize className="h-6 w-6" />
              </button>
            </div>

            {/* Progress Bar Expandido */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-black/50">
              <div
                className="h-full bg-gold-600 transition-all duration-300"
                style={{ width: `${videoProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Contato Mobile Otimizado */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          {isMobile ? (
            <div
              ref={drawerRef}
              className={`${themeClasses.bg} rounded-t-2xl w-full max-h-[90vh] overflow-y-auto p-4 shadow-2xl`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3
                  className="text-lg font-bold font-playfair drop-shadow-sm"
                  style={{
                    background:
                      "linear-gradient(to right, #facc15, #f59e0b, #d97706)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  COMPRE AGORA
                </h3>
                <button
                  onClick={closeModal}
                  className={`${themeClasses.textMuted} hover:${themeClasses.text} transition-colors`}
                  aria-label="Fechar"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-300 rounded-full"></div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="drawer-name"
                    className={`block text-sm font-bold ${themeClasses.text} mb-1`}
                  >
                    Nome Completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="drawer-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full border ${
                      errors.name ? "border-red-500" : themeClasses.border
                    } rounded-lg py-3 px-3 ${themeClasses.bg} ${
                      themeClasses.text
                    } focus:outline-none focus:ring-2 focus:ring-gold-500/50 text-base`}
                    placeholder="Seu nome completo"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="drawer-whatsapp"
                    className={`block text-sm font-bold ${themeClasses.text} mb-1`}
                  >
                    WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="drawer-whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={(e) => {
                      const formatted = formatWhatsApp(e.target.value);
                      setFormData((prev) => ({ ...prev, whatsapp: formatted }));
                      if (errors.whatsapp) {
                        setErrors((prev) => ({ ...prev, whatsapp: "" }));
                      }
                    }}
                    className={`w-full border ${
                      errors.whatsapp ? "border-red-500" : themeClasses.border
                    } rounded-lg py-3 px-3 ${themeClasses.bg} ${
                      themeClasses.text
                    } focus:outline-none focus:ring-2 focus:ring-gold-500/50 text-base`}
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
                    className={`block text-sm font-bold ${themeClasses.text} mb-1`}
                  >
                    Email{" "}
                    <span className={`${themeClasses.textMuted}`}>
                      (opcional)
                    </span>
                  </label>
                  <input
                    type="email"
                    id="drawer-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full border ${themeClasses.border} rounded-lg py-3 px-3 ${themeClasses.bg} ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-gold-500/50 text-base`}
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="drawer-message"
                    className={`block text-sm font-bold ${themeClasses.text} mb-1`}
                  >
                    Seu Projeto{" "}
                    <span className={`${themeClasses.textMuted}`}>
                      (opcional)
                    </span>
                  </label>
                  <textarea
                    id="drawer-message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full border ${themeClasses.border} rounded-lg py-3 px-3 ${themeClasses.bg} ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-gold-500/50 text-base resize-none`}
                    placeholder="Conte sobre seu projeto: estofados, sala de jantar, ambiente..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gold-600 hover:bg-gold-700 text-white font-bold py-4 rounded-lg transition-all text-base"
                >
                  ENVIAR SOLICITAÇÃO VIP
                </Button>
              </form>
            </div>
          ) : (
            <div
              ref={modalRef}
              className={`${themeClasses.bg} rounded-2xl w-full max-w-lg p-8 shadow-2xl`}
            >
              <div className="flex justify-between items-center mb-6">
                <h3
                  className="text-2xl font-bold font-playfair drop-shadow-sm"
                  style={{
                    background:
                      "linear-gradient(to right, #facc15, #f59e0b, #d97706)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  SOLICITAR ORÇAMENTO VIP
                </h3>
                <button
                  onClick={closeModal}
                  className={`${themeClasses.textMuted} hover:${themeClasses.text} transition-colors`}
                  aria-label="Fechar"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="modal-name"
                    className={`block text-sm font-bold ${themeClasses.text} mb-2`}
                  >
                    Nome Completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="modal-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full border ${
                      errors.name ? "border-red-500" : themeClasses.border
                    } rounded-lg py-4 px-4 ${themeClasses.bg} ${
                      themeClasses.text
                    } focus:outline-none focus:ring-2 focus:ring-gold-500/50`}
                    placeholder="Seu nome completo"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="modal-whatsapp"
                    className={`block text-sm font-bold ${themeClasses.text} mb-2`}
                  >
                    WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="modal-whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={(e) => {
                      const formatted = formatWhatsApp(e.target.value);
                      setFormData((prev) => ({ ...prev, whatsapp: formatted }));
                      if (errors.whatsapp) {
                        setErrors((prev) => ({ ...prev, whatsapp: "" }));
                      }
                    }}
                    className={`w-full border ${
                      errors.whatsapp ? "border-red-500" : themeClasses.border
                    } rounded-lg py-4 px-4 ${themeClasses.bg} ${
                      themeClasses.text
                    } focus:outline-none focus:ring-2 focus:ring-gold-500/50`}
                    placeholder="(00) 00000-0000"
                  />
                  {errors.whatsapp && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.whatsapp}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="modal-email"
                    className={`block text-sm font-bold ${themeClasses.text} mb-2`}
                  >
                    Email{" "}
                    <span className={`${themeClasses.textMuted}`}>
                      (opcional)
                    </span>
                  </label>
                  <input
                    type="email"
                    id="modal-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full border ${themeClasses.border} rounded-lg py-4 px-4 ${themeClasses.bg} ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-gold-500/50`}
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="modal-message"
                    className={`block text-sm font-bold ${themeClasses.text} mb-2`}
                  >
                    Seu Projeto{" "}
                    <span className={`${themeClasses.textMuted}`}>
                      (opcional)
                    </span>
                  </label>
                  <textarea
                    id="modal-message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full border ${themeClasses.border} rounded-lg py-4 px-4 ${themeClasses.bg} ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-gold-500/50`}
                    placeholder="Conte sobre seu projeto: estofados, sala de jantar, ambiente..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gold-600 hover:bg-gold-700 text-white font-bold py-4 rounded-lg transition-all text-lg"
                >
                  ENVIAR SOLICITAÇÃO VIP
                </Button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
