"use client"
import type React from "react"
import Image from "next/image"
import { Check, Star, Play, Pause, X, MapPin, Phone, Clock, Mail, Navigation, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect, useCallback } from "react"
import { useMobile } from "@/hooks/use-mobile"

export default function DecolDesignShowroom() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
    message: "",
  })
  const [errors, setErrors] = useState({
    name: "",
    whatsapp: "",
  })
  const [videoProgress, setVideoProgress] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [videoEnded, setVideoEnded] = useState(false)
  const isMobile = useMobile()
  const videoRef = useRef<HTMLVideoElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const themeClasses = {
    bg: isDarkMode ? "bg-gray-900" : "bg-white",
    bgAlt: isDarkMode ? "bg-black" : "bg-gray-50",
    text: isDarkMode ? "text-white" : "text-gray-900",
    textMuted: isDarkMode ? "text-gray-300" : "text-gray-600",
    border: isDarkMode ? "border-gray-700" : "border-gray-200",
    card: isDarkMode ? "bg-gray-800" : "bg-white",
    cardAlt: isDarkMode ? "bg-gray-700" : "bg-gray-50",
  }

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
        setVideoEnded(false)
      }
      setIsPlaying(!isPlaying)
    }
  }, [isPlaying])

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = "auto"
  }

  const openModal = () => {
    setIsModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let valid = true
    const newErrors = { name: "", whatsapp: "" }

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório"
      valid = false
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp é obrigatório"
      valid = false
    } else if (!/^[0-9]{10,11}$/.test(formData.whatsapp.replace(/\D/g, ""))) {
      newErrors.whatsapp = "WhatsApp inválido"
      valid = false
    }

    setErrors(newErrors)

    if (valid) {
      console.log("Form submitted:", formData)
      alert("Mensagem enviada! Entraremos em contato em breve.")
      closeModal()
      setFormData({
        name: "",
        whatsapp: "",
        email: "",
        message: "",
      })
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile) {
        if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
          const clickY = event.clientY
          const drawerTop = window.innerHeight - drawerRef.current.offsetHeight
          if (clickY < drawerTop) {
            closeModal()
          }
        }
      } else {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
          closeModal()
        }
      }
    }

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isModalOpen, isMobile])

  useEffect(() => {
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleTimeUpdate = () => {
      if (videoRef.current) {
        const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
        setVideoProgress(progress)
      }
    }
    const handleEnded = () => {
      setIsPlaying(false)
      setVideoEnded(true)
    }

    const videoElement = videoRef.current
    if (videoElement) {
      videoElement.addEventListener("play", handlePlay)
      videoElement.addEventListener("pause", handlePause)
      videoElement.addEventListener("timeupdate", handleTimeUpdate)
      videoElement.addEventListener("ended", handleEnded)
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("play", handlePlay)
        videoElement.removeEventListener("pause", handlePause)
        videoElement.removeEventListener("timeupdate", handleTimeUpdate)
        videoElement.removeEventListener("ended", handleEnded)
      }
    }
  }, [])

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted
      videoRef.current.muted = newMutedState
      setIsMuted(newMutedState)
    }
  }

  const openWhatsApp = () => {
    window.open(
      "https://wa.me/5543999999999?text=Olá! Vi o site da Decol Design e gostaria de conhecer os estofados e salas de jantar. Quando posso visitar a loja?",
      "_blank",
    )
  }

  const openMaps = () => {
    window.open(
      "https://www.google.com/maps/place/DECOL+DESIGN+-+LOJA+DOS+FAMOSOS/@-23.2648510,-51.1556386,17z/data=!3m1!4b1!4m6!3m5!1s0x94eb45fd2f23f967:0x8c031b1798108722!8m2!3d-23.2648510!4d-51.1556386!16s%2Fg%2F11y3k8qp0q",
      "_blank",
    )
  }

  return (
    <div
      className={`flex flex-col min-h-screen ${themeClasses.bg} ${themeClasses.text} overflow-x-hidden transition-colors duration-300`}
    >
      {/* Header com Localização */}
      <header className={`py-4 px-4 ${themeClasses.bg} shadow-sm ${themeClasses.border} border-b`}>
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-center">
            <Image
              src={"/logo.png"}
              width={280}
              height={140}
              className=""
              alt={"Decol Design - Loja dos Famosos - Londrina"}
            />

            <div className="flex items-center gap-4">
              {/* Localização Destacada */}
              <div className="hidden lg:flex items-center gap-6 bg-gold-600 text-white px-6 py-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <div>
                    <p className="font-semibold text-sm">Londrina/PR</p>
                    <p className="text-xs opacity-90">R. Lupércio Pozato, 933</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  <div>
                    <p className="font-semibold text-sm">(43) 99999-9999</p>
                    <p className="text-xs opacity-90">Seg-Sex: 8h-18h</p>
                  </div>
                </div>
              </div>

              {/* Mobile Location */}
              <div className="lg:hidden flex items-center gap-2 text-gold-600">
                <MapPin className="h-4 w-4" />
                <span className="text-sm font-medium">Londrina/PR</span>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${themeClasses.cardAlt} ${themeClasses.border} border transition-colors`}
                aria-label="Alternar tema"
              >
                {isDarkMode ? <Sun className="h-5 w-5 text-gold-500" /> : <Moon className="h-5 w-5 text-gold-600" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className={`py-12 md:py-20 px-4 ${themeClasses.bgAlt}`}>
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${themeClasses.text} leading-tight`}>
                <span className="text-gold-600">DECOL DESIGN</span>
                <br />
                <span className="text-2xl md:text-4xl">A Loja dos Famosos</span>
              </h1>
              <p className={`text-xl md:text-2xl ${themeClasses.textMuted} max-w-4xl mx-auto mb-8 font-medium`}>
                <strong>Estofados de Alto Padrão</strong> e <strong>Salas de Jantar Sob Medida</strong>
                <br />
                Onde celebridades e clientes exigentes encontram sofisticação em Londrina/PR
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  onClick={openWhatsApp}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 text-xl font-bold"
                >
                  <Phone className="h-6 w-6 mr-3" />
                  FALAR AGORA NO WHATSAPP
                </Button>
                <Button
                  onClick={openModal}
                  variant="outline"
                  size="lg"
                  className={`border-gold-600 text-gold-600 hover:bg-gold-50 px-10 py-4 text-xl font-bold ${isDarkMode ? "hover:bg-gold-900/20" : ""} bg-transparent`}
                >
                  SOLICITAR ORÇAMENTO
                </Button>
              </div>
            </div>

            {/* Vídeo Maior - Full Width */}
            <div className="mb-16">
              <div className="text-center mb-8">
                <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${themeClasses.text}`}>
                  CONHEÇA NOSSO SHOWROOM EXCLUSIVO
                </h2>
                <p className={`text-lg ${themeClasses.textMuted} max-w-3xl mx-auto`}>
                  <strong>2 andares de luxo</strong> com curadoria exclusiva de estofados e salas de jantar que atendem
                  celebridades e clientes do agro
                </p>
              </div>

              {/* Vídeo em Destaque - Maior */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-6xl mx-auto">
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

                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <button
                      onClick={togglePlay}
                      className={`bg-gold-600 hover:bg-gold-700 text-white p-6 md:p-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl ${isPlaying && !videoEnded ? "opacity-0" : "opacity-100"
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

                  <button
                    onClick={toggleMute}
                    className="absolute bottom-6 right-6 bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:bg-black/90"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? (
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                        />
                      </svg>
                    )}
                  </button>

                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-black/50">
                    <div
                      className="h-full bg-gold-600 transition-all duration-300"
                      style={{ width: `${videoProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Destaques do Vídeo */}
              <div className="grid md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
                <div
                  className={`${themeClasses.card} p-6 rounded-xl shadow-sm ${themeClasses.border} border text-center`}
                >
                  <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="h-6 w-6 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <h3 className={`font-bold text-lg mb-2 ${themeClasses.text}`}>2 Andares Exclusivos</h3>
                  <p className={`${themeClasses.textMuted} text-sm`}>
                    Showroom completo com peças à pronta entrega e sob medida
                  </p>
                </div>

                <div
                  className={`${themeClasses.card} p-6 rounded-xl shadow-sm ${themeClasses.border} border text-center`}
                >
                  <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-6 w-6 text-gold-600" />
                  </div>
                  <h3 className={`font-bold text-lg mb-2 ${themeClasses.text}`}>Loja dos Famosos</h3>
                  <p className={`${themeClasses.textMuted} text-sm`}>
                    Referência para celebridades e clientes exigentes
                  </p>
                </div>

                <div
                  className={`${themeClasses.card} p-6 rounded-xl shadow-sm ${themeClasses.border} border text-center`}
                >
                  <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-6 w-6 text-gold-600" />
                  </div>
                  <h3 className={`font-bold text-lg mb-2 ${themeClasses.text}`}>Londrina/PR</h3>
                  <p className={`${themeClasses.textMuted} text-sm`}>Localização privilegiada no centro da cidade</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Localização em Destaque */}
        <section className="py-16 px-4 bg-gold-600 text-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">VISITE A LOJA DOS FAMOSOS EM LONDRINA</h2>
                <p className="text-xl mb-8 opacity-90">
                  <strong>Localização privilegiada</strong> no Parque Industrial de Londrina com fácil acesso e
                  estacionamento. Venha conhecer pessoalmente nossa coleção exclusiva.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4">
                    <MapPin className="h-6 w-6 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-lg">R. Lupércio Pozato, 933</p>
                      <p className="opacity-90">Parque Industrial, Londrina/PR - CEP 86084-450</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Clock className="h-6 w-6 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Seg-Sex: 8h às 18h | Sáb: 8h às 16h</p>
                      <p className="opacity-90">Domingo: Fechado</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Phone className="h-6 w-6 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-lg">(43) 99999-9999</p>
                      <p className="opacity-90">WhatsApp disponível</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={openMaps}
                    size="lg"
                    className="bg-white text-gold-600 hover:bg-gray-100 px-8 py-3 font-bold"
                  >
                    <Navigation className="h-5 w-5 mr-2" />
                    VER NO GOOGLE MAPS
                  </Button>
                  <Button
                    onClick={openWhatsApp}
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-gold-600 px-8 py-3 font-bold bg-transparent"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    LIGAR AGORA
                  </Button>
                </div>
              </div>

              <div className="relative">
                {/* Google Maps Embed */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d916.3504134382918!2d-51.155638630358226!3d-23.26485096662963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94eb45fd2f23f967%3A0x8c031b1798108722!2sDECOL%20DESIGN%20-%20LOJA%20DOS%20FAMOSOS!5e0!3m2!1spt-BR!2sbr!4v1753190887814!5m2!1spt-BR!2sbr"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-2xl"
                  />
                  <div className="absolute bottom-6 left-6 bg-black/70 text-white p-4 rounded-lg">
                    <h3 className="text-lg font-bold mb-1">Decol Design</h3>
                    <p className="text-sm opacity-90">A Loja dos Famosos</p>
                    <p className="text-xs opacity-75">Parque Industrial - Londrina/PR</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sobre a Decol Design - Comunicação Assertiva */}
        <section className={`py-16 px-4 ${themeClasses.bg}`}>
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${themeClasses.text}`}>
                POR QUE SOMOS A <span className="text-gold-600">LOJA DOS FAMOSOS</span>
              </h2>
              <p className={`text-xl ${themeClasses.textMuted} font-medium`}>
                <strong>Especialistas absolutos</strong> em estofados de alto padrão e salas de jantar sob medida
              </p>
            </div>

            <div className={`${themeClasses.card} p-8 md:p-12 rounded-2xl shadow-lg ${themeClasses.border} border`}>
              <div className="prose prose-lg max-w-none leading-relaxed">
                <p className={`text-lg mb-6 ${themeClasses.text}`}>
                  <strong>Na Decol Design, sua casa reflete quem você é.</strong> Sala de estar e sala de jantar são
                  onde as melhores memórias acontecem. Por isso, somos <strong>especialistas absolutos</strong> em dois
                  pontos centrais do lar:
                  <span className="text-gold-600 font-bold"> estofados de alto padrão</span> e
                  <span className="text-gold-600 font-bold"> salas de jantar sob medida</span>.
                </p>

                <div className="grid md:grid-cols-2 gap-8 my-8">
                  <div>
                    <h3 className={`text-xl font-bold mb-4 ${themeClasses.text}`}>NOSSOS CLIENTES:</h3>
                    <ul className={`space-y-2 ${themeClasses.textMuted}`}>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-gold-600" />
                        <strong>Celebridades da região</strong>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-gold-600" />
                        <strong>Clientes do agro e universo sertanejo</strong>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-gold-600" />
                        <strong>Arquitetos e designers</strong>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-gold-600" />
                        <strong>Famílias exigentes</strong>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className={`text-xl font-bold mb-4 ${themeClasses.text}`}>NOSSO DIFERENCIAL:</h3>
                    <ul className={`space-y-2 ${themeClasses.textMuted}`}>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-gold-600" />
                        <strong>Tecidos nobres e assentos anatômicos</strong>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-gold-600" />
                        <strong>Mesas personalizadas exclusivas</strong>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-gold-600" />
                        <strong>Showroom com 2 andares</strong>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-gold-600" />
                        <strong>Atendimento VIP personalizado</strong>
                      </li>
                    </ul>
                  </div>
                </div>

                <p className={`text-lg mb-6 ${themeClasses.text}`}>
                  <strong>Trabalhamos sob medida e à pronta entrega.</strong> Nosso showroom em Londrina/PR reúne
                  curadoria exclusiva com acabamentos impecáveis. Atendimento presencial ou com hora marcada, sempre
                  focado no seu estilo e rotina.
                </p>

                <div className="text-center bg-gold-50 dark:bg-gold-900/20 p-8 rounded-xl mt-8">
                  <p className={`text-xl font-bold ${themeClasses.text} mb-2`}>
                    <strong>Cada móvel é pensado para fazer parte da sua história.</strong>
                  </p>
                  <p className="text-2xl font-bold text-gold-600">
                    Seu projeto começa aqui — e eleva seu viver a um novo padrão.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Produtos - Comunicação Direta */}
        <section className={`py-16 px-4 ${themeClasses.bgAlt}`}>
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${themeClasses.text}`}>NOSSOS PRODUTOS EXCLUSIVOS</h2>
              <p className={`text-xl ${themeClasses.textMuted} font-medium`}>
                <strong>Estética + Funcionalidade + Afeto</strong> em cada peça
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div
                className={`${themeClasses.card} p-8 rounded-2xl shadow-lg ${themeClasses.border} border hover:shadow-xl transition-shadow`}
              >
                <div className="w-20 h-20 rounded-full bg-gold-100 flex items-center justify-center mb-6">
                  <svg className="h-10 w-10 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${themeClasses.text}`}>ESTOFADOS DE ALTO PADRÃO</h3>
                <p className={`${themeClasses.textMuted} mb-6 text-lg`}>
                  <strong>Curadoria exclusiva</strong> com tecidos nobres importados, assentos anatômicos e acabamentos
                  impecáveis.
                  <strong>Conforto e sofisticação</strong> que celebridades escolhem.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <Check className="h-6 w-6 text-gold-600" />
                    <span className={`${themeClasses.text} font-medium`}>Tecidos nobres e importados</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-6 w-6 text-gold-600" />
                    <span className={`${themeClasses.text} font-medium`}>Assentos anatômicos exclusivos</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-6 w-6 text-gold-600" />
                    <span className={`${themeClasses.text} font-medium`}>Acabamentos impecáveis</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-6 w-6 text-gold-600" />
                    <span className={`${themeClasses.text} font-medium`}>Pronta entrega e sob medida</span>
                  </li>
                </ul>
              </div>

              <div
                className={`${themeClasses.card} p-8 rounded-2xl shadow-lg ${themeClasses.border} border hover:shadow-xl transition-shadow`}
              >
                <div className="w-20 h-20 rounded-full bg-gold-100 flex items-center justify-center mb-6">
                  <svg className="h-10 w-10 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${themeClasses.text}`}>SALAS DE JANTAR SOB MEDIDA</h3>
                <p className={`${themeClasses.textMuted} mb-6 text-lg`}>
                  <strong>Referência absoluta</strong> em salas de jantar personalizadas. Mesas de diferentes tamanhos,
                  estilos e materiais.
                  <strong>Feitas para valorizar</strong> seus momentos especiais.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <Check className="h-6 w-6 text-gold-600" />
                    <span className={`${themeClasses.text} font-medium`}>Mesas 100% personalizadas</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-6 w-6 text-gold-600" />
                    <span className={`${themeClasses.text} font-medium`}>Materiais nobres exclusivos</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-6 w-6 text-gold-600" />
                    <span className={`${themeClasses.text} font-medium`}>Projeto completo do ambiente</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-6 w-6 text-gold-600" />
                    <span className={`${themeClasses.text} font-medium`}>Diferentes tamanhos e estilos</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section className={`py-16 px-4 ${themeClasses.bg}`}>
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${themeClasses.text}`}>
                O QUE NOSSOS CLIENTES FALAM
              </h2>
              <p className={`text-xl ${themeClasses.textMuted} font-medium`}>
                <strong>Referência em Londrina</strong> - Resultados que falam por si
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className={`${themeClasses.cardAlt} p-8 rounded-2xl ${themeClasses.border} border`}>
                <div className="flex justify-center mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-6 w-6 fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <p className={`${themeClasses.textMuted} text-center mb-6 text-lg`}>
                  <strong>&quot;Transformação completa da nossa sala!&quot;</strong> O sofá da Decol Design é qualidade
                  excepcional. Tecido nobre, conforto incomparável. <strong>Realmente a loja dos famosos!</strong>
                </p>
                <div className="text-center">
                  <h4 className={`font-bold text-lg ${themeClasses.text}`}>Marina Silva</h4>
                  <p className="text-gold-600 font-medium">Zona Sul - Londrina</p>
                </div>
              </div>

              <div className={`${themeClasses.cardAlt} p-8 rounded-2xl ${themeClasses.border} border`}>
                <div className="flex justify-center mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-6 w-6 fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <p className={`${themeClasses.textMuted} text-center mb-6 text-lg`}>
                  <strong>&quot;Mesa para 12 pessoas perfeita!&quot;</strong> Nossa sala de jantar sob medida ficou espetacular.
                  Acabamento impecável, <strong>atendimento personalizado</strong> e resultado além das expectativas.
                </p>
                <div className="text-center">
                  <h4 className={`font-bold text-lg ${themeClasses.text}`}>Roberto Nascimento</h4>
                  <p className="text-gold-600 font-medium">Centro - Londrina</p>
                </div>
              </div>

              <div className={`${themeClasses.cardAlt} p-8 rounded-2xl ${themeClasses.border} border`}>
                <div className="flex justify-center mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-6 w-6 fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <p className={`${themeClasses.textMuted} text-center mb-6 text-lg`}>
                  <strong>&quot;Sofisticação que só encontramos aqui!&quot;</strong> Conjunto de estofados com assentos anatômicos
                  e tecidos importados. <strong>Vale cada centavo investido!</strong>
                </p>
                <div className="text-center">
                  <h4 className={`font-bold text-lg ${themeClasses.text}`}>Ana Paula</h4>
                  <p className="text-gold-600 font-medium">Gleba Palhano - Londrina</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final Assertivo */}
        <section className="py-20 px-4 bg-gradient-to-r from-gold-600 to-gold-700 text-white">
          <div className="container mx-auto max-w-5xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">VISITE A LOJA DOS FAMOSOS AGORA</h2>
            <p className="text-2xl mb-12 opacity-95 font-medium">
              <strong>Coleção exclusiva</strong> de estofados de alto padrão e salas de jantar sob medida.
              <br />
              <strong>Atendimento VIP</strong> que eleva seu viver a um novo padrão.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <Button
                onClick={openWhatsApp}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-12 py-5 text-xl font-bold"
              >
                <Phone className="h-6 w-6 mr-3" />
                FALAR AGORA NO WHATSAPP
              </Button>
              <Button
                onClick={openModal}
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gold-700 px-12 py-5 text-xl font-bold bg-transparent"
              >
                SOLICITAR ORÇAMENTO VIP
              </Button>
            </div>
            <p className="text-lg opacity-90">
              <strong>Londrina/PR</strong> • R. Lupércio Pozato, 933 - Parque Industrial •{" "}
              <strong>(43) 99999-9999</strong>
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`py-12 px-4 ${isDarkMode ? "bg-black" : "bg-gray-900"} text-white`}>
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gold-400 mb-4">DECOL DESIGN</h3>
              <p className="text-gold-300 mb-4 font-semibold">A Loja dos Famosos</p>
              <p className="text-gray-300">
                <strong>Especialistas absolutos</strong> em estofados de alto padrão e salas de jantar sob medida em
                Londrina/PR.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">CONTATO DIRETO</h4>
              <div className="space-y-3 text-gray-300">
                <p className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gold-400" />
                  <strong>(43) 99999-9999</strong>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gold-400" />
                  contato@decoldesign.com.br
                </p>
                <p className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gold-400" />
                  <strong>R. Lupércio Pozato, 933 - Parque Industrial, Londrina/PR</strong>
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">HORÁRIO VIP</h4>
              <div className="space-y-2 text-gray-300">
                <p>
                  <strong>Segunda a Sexta:</strong> 8h às 18h
                </p>
                <p>
                  <strong>Sábado:</strong> 8h às 16h
                </p>
                <p>
                  <strong>Domingo:</strong> Fechado
                </p>
                <p className="text-gold-300 font-medium mt-4">
                  <strong>Atendimento com hora marcada disponível</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400">© 2025 DECOL DESIGN - A Loja dos Famosos. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Modal de Contato */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          {isMobile ? (
            <div
              ref={drawerRef}
              className={`${themeClasses.bg} rounded-t-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl`}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-2xl font-bold ${themeClasses.text}`}>SOLICITAR ORÇAMENTO VIP</h3>
                <button
                  onClick={closeModal}
                  className={`${themeClasses.textMuted} hover:${themeClasses.text} transition-colors`}
                  aria-label="Fechar"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-300 rounded-full"></div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="drawer-name" className={`block text-sm font-bold ${themeClasses.text} mb-2`}>
                    Nome Completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="drawer-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full border ${errors.name ? "border-red-500" : themeClasses.border} rounded-lg py-4 px-4 ${themeClasses.bg} ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-gold-500/50`}
                    placeholder="Seu nome completo"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="drawer-whatsapp" className={`block text-sm font-bold ${themeClasses.text} mb-2`}>
                    WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="drawer-whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={(e) => {
                      const formatted = formatWhatsApp(e.target.value)
                      setFormData((prev) => ({ ...prev, whatsapp: formatted }))
                      if (errors.whatsapp) {
                        setErrors((prev) => ({ ...prev, whatsapp: "" }))
                      }
                    }}
                    className={`w-full border ${errors.whatsapp ? "border-red-500" : themeClasses.border} rounded-lg py-4 px-4 ${themeClasses.bg} ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-gold-500/50`}
                    placeholder="(00) 00000-0000"
                  />
                  {errors.whatsapp && <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>}
                </div>

                <div>
                  <label htmlFor="drawer-email" className={`block text-sm font-bold ${themeClasses.text} mb-2`}>
                    Email <span className={`${themeClasses.textMuted}`}>(opcional)</span>
                  </label>
                  <input
                    type="email"
                    id="drawer-email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full border ${themeClasses.border} rounded-lg py-4 px-4 ${themeClasses.bg} ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-gold-500/50`}
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="drawer-message" className={`block text-sm font-bold ${themeClasses.text} mb-2`}>
                    Seu Projeto <span className={`${themeClasses.textMuted}`}>(opcional)</span>
                  </label>
                  <textarea
                    id="drawer-message"
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
          ) : (
            <div ref={modalRef} className={`${themeClasses.bg} rounded-2xl w-full max-w-lg p-8 shadow-2xl`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`text-2xl font-bold ${themeClasses.text}`}>SOLICITAR ORÇAMENTO VIP</h3>
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
                  <label htmlFor="modal-name" className={`block text-sm font-bold ${themeClasses.text} mb-2`}>
                    Nome Completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="modal-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full border ${errors.name ? "border-red-500" : themeClasses.border} rounded-lg py-4 px-4 ${themeClasses.bg} ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-gold-500/50`}
                    placeholder="Seu nome completo"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="modal-whatsapp" className={`block text-sm font-bold ${themeClasses.text} mb-2`}>
                    WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="modal-whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={(e) => {
                      const formatted = formatWhatsApp(e.target.value)
                      setFormData((prev) => ({ ...prev, whatsapp: formatted }))
                      if (errors.whatsapp) {
                        setErrors((prev) => ({ ...prev, whatsapp: "" }))
                      }
                    }}
                    className={`w-full border ${errors.whatsapp ? "border-red-500" : themeClasses.border} rounded-lg py-4 px-4 ${themeClasses.bg} ${themeClasses.text} focus:outline-none focus:ring-2 focus:ring-gold-500/50`}
                    placeholder="(00) 00000-0000"
                  />
                  {errors.whatsapp && <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>}
                </div>

                <div>
                  <label htmlFor="modal-email" className={`block text-sm font-bold ${themeClasses.text} mb-2`}>
                    Email <span className={`${themeClasses.textMuted}`}>(opcional)</span>
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
                  <label htmlFor="modal-message" className={`block text-sm font-bold ${themeClasses.text} mb-2`}>
                    Seu Projeto <span className={`${themeClasses.textMuted}`}>(opcional)</span>
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
  )
}
