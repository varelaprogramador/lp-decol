"use client"

import type React from "react"

import Image from "next/image"
import { ArrowRight, Check, Star, MapPin, Phone, Mail, Play, Pause, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useRef, useEffect } from "react"

export default function DecolDesignLanding() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    email: "",
  })
  const [errors, setErrors] = useState({
    name: "",
    whatsapp: "",
  })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const openModal = () => {
    setIsModalOpen(true)
    document.body.style.overflow = "hidden" // Prevent scrolling when modal is open
  }

  const closeModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = "auto" // Re-enable scrolling
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
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
      // Here you would typically send the data to your backend
      console.log("Form submitted:", formData)

      // Show success message and close modal
      alert("atendimento agendada com sucesso! Entraremos em contato em breve.")
      closeModal()

      // Reset form
      setFormData({
        name: "",
        whatsapp: "",
        email: "",
      })
    }
  }

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal()
      }
    }

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isModalOpen])

  // Video event listeners
  useEffect(() => {
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    const videoElement = videoRef.current
    if (videoElement) {
      videoElement.addEventListener("play", handlePlay)
      videoElement.addEventListener("pause", handlePause)
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("play", handlePlay)
        videoElement.removeEventListener("pause", handlePause)
      }
    }
  }, [])

  // Format WhatsApp number as user types
  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header")
      if (header) {
        if (window.scrollY > 50) {
          header.classList.add("py-3")
          header.classList.add("bg-black/95")
          header.classList.add("shadow-lg")
        } else {
          header.classList.remove("py-3")
          header.classList.remove("bg-black/95")
          header.classList.remove("shadow-lg")
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <header className="py-5 px-4 bg-black/95 backdrop-blur-md border-b border-amber-400/20 sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-amber-400">DECOL DESIGN</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <nav className="flex items-center gap-8">
                <a
                  href="#about"
                  className="text-gray-300 hover:text-amber-400 transition-colors text-sm font-medium relative group"
                >
                  Sobre Nós
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a
                  href="#services"
                  className="text-gray-300 hover:text-amber-400 transition-colors text-sm font-medium relative group"
                >
                  Serviços
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a
                  href="#portfolio"
                  className="text-gray-300 hover:text-amber-400 transition-colors text-sm font-medium relative group"
                >
                  Portfólio
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a
                  href="#contact"
                  className="text-gray-300 hover:text-amber-400 transition-colors text-sm font-medium relative group"
                >
                  Contato
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </nav>

              <Button
                onClick={openModal}
                className="bg-amber-400 hover:bg-amber-500 text-black font-medium rounded-md px-5 py-2.5 shadow-[0_0_15px_rgba(251,191,36,0.3)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(251,191,36,0.5)]"
              >
                Agendar Visita
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-300 hover:text-amber-400"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pt-4 pb-2 border-t border-gray-800 mt-4 animate-fadeIn">
              <nav className="flex flex-col gap-4">
                <a
                  href="#about"
                  className="text-gray-300 hover:text-amber-400 transition-colors py-2 px-3 hover:bg-gray-900/50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sobre Nós
                </a>
                <a
                  href="#services"
                  className="text-gray-300 hover:text-amber-400 transition-colors py-2 px-3 hover:bg-gray-900/50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Serviços
                </a>
                <a
                  href="#portfolio"
                  className="text-gray-300 hover:text-amber-400 transition-colors py-2 px-3 hover:bg-gray-900/50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Portfólio
                </a>
                <a
                  href="#contact"
                  className="text-gray-300 hover:text-amber-400 transition-colors py-2 px-3 hover:bg-gray-900/50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contato
                </a>
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    openModal()
                  }}
                  className="bg-amber-400 hover:bg-amber-500 text-black font-medium rounded-md mt-2"
                >
                  Agendar Visita
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section with Video */}
      <section className="relative h-[90vh] overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              poster="/placeholder.svg?height=1080&width=1920"
              muted
              loop
              playsInline
            >
              <source src="/placeholder.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Overlay gradient for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/70"></div>
          </div>
        </div>

        {/* Video Controls */}
        <button
          onClick={togglePlay}
          className="absolute bottom-8 right-8 z-20 bg-amber-400/20 hover:bg-amber-400/30 backdrop-blur-sm p-3 rounded-full transition-all duration-300"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause className="h-6 w-6 text-amber-400" /> : <Play className="h-6 w-6 text-amber-400" />}
        </button>

        {/* Content */}
        <div className="container mx-auto max-w-6xl h-full relative z-10 px-4 flex items-center">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Design de Interiores <span className="text-amber-400">Exclusivo</span> para os Mais Exigentes
              </h1>

              <p className="text-lg md:text-xl text-gray-300">
                Transforme seu espaço com o requinte e sofisticação que só a DECOL DESIGN pode oferecer. A escolha dos
                famosos agora ao seu alcance.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300">Projetos exclusivos assinados por designers renomados</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300">Móveis de alto padrão com acabamento impecável</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-300">Atendimento personalizado e consultoria completa</p>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  className="bg-amber-400 hover:bg-amber-500 text-black font-bold py-6 px-8 rounded-md text-lg transition-all"
                  onClick={openModal}
                >
                  SOLICITAR ORÇAMENTO
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="relative hidden md:block">
              <div className="relative rounded-xl overflow-hidden shadow-[0_0_25px_rgba(251,191,36,0.2)] border border-amber-400/20">
                <Image
                  src="/placeholder.svg?height=600&width=500"
                  alt="Interior de luxo DECOL DESIGN"
                  width={500}
                  height={600}
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                  <p className="text-xl font-medium">Sala de Estar Contemporânea</p>
                  <p className="text-amber-400">Projeto Exclusivo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nossos <span className="text-amber-400">Serviços</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Oferecemos soluções completas em design de interiores, desde a concepção do projeto até a execução final.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-800 hover:border-amber-400/30 transition-all group">
              <div className="w-16 h-16 rounded-full bg-amber-400/10 flex items-center justify-center mb-6 group-hover:bg-amber-400/20 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-amber-400"
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
              <h3 className="text-xl font-bold mb-3 group-hover:text-amber-400 transition-colors">
                Projeto Arquitetônico
              </h3>
              <p className="text-gray-400">
                Desenvolvimento de projetos arquitetônicos personalizados, considerando suas necessidades e estilo de
                vida.
              </p>
            </div>

            <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-800 hover:border-amber-400/30 transition-all group">
              <div className="w-16 h-16 rounded-full bg-amber-400/10 flex items-center justify-center mb-6 group-hover:bg-amber-400/20 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-amber-400"
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
              <h3 className="text-xl font-bold mb-3 group-hover:text-amber-400 transition-colors">
                Design de Interiores
              </h3>
              <p className="text-gray-400">
                Criação de ambientes exclusivos, com seleção de mobiliário, iluminação, cores e acabamentos.
              </p>
            </div>

            <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-800 hover:border-amber-400/30 transition-all group">
              <div className="w-16 h-16 rounded-full bg-amber-400/10 flex items-center justify-center mb-6 group-hover:bg-amber-400/20 transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-amber-400 transition-colors">
                Execução de Projetos
              </h3>
              <p className="text-gray-400">
                Acompanhamento completo da execução do projeto, garantindo que cada detalhe seja implementado conforme
                planejado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O que <span className="text-amber-400">Dizem</span> Sobre Nós
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              A satisfação de nossos clientes é o nosso maior orgulho. Confira alguns depoimentos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-900/30 p-8 rounded-xl border border-gray-800">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Cliente"
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Roberto Almeida</h4>
                  <p className="text-amber-400">Empresário</p>
                </div>
                <div className="ml-auto flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-gray-300">
                "A DECOL DESIGN transformou completamente minha residência. O projeto superou todas as expectativas, com
                um design sofisticado e funcional. A atenção aos detalhes e o profissionalismo da equipe foram
                impressionantes."
              </p>
            </div>

            <div className="bg-gray-900/30 p-8 rounded-xl border border-gray-800">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Cliente"
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Carla Mendonça</h4>
                  <p className="text-amber-400">Apresentadora</p>
                </div>
                <div className="ml-auto flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-gray-300">
                "Trabalhar com a DECOL DESIGN foi uma experiência incrível. Eles entenderam perfeitamente o meu estilo e
                criaram ambientes que refletem minha personalidade. Cada detalhe foi pensado com cuidado e o resultado é
                simplesmente deslumbrante."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=800&width=1920"
            alt="Interior de luxo"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/80"></div>
        </div>

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Transforme seu Espaço com a <span className="text-amber-400">Excelência</span> da DECOL DESIGN
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Entre em contato hoje mesmo e descubra como podemos criar um ambiente exclusivo que reflete seu estilo e
            personalidade.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-amber-400 hover:bg-amber-500 text-black font-bold py-6 px-8 rounded-md text-lg transition-all"
              onClick={openModal}
            >
              AGENDAR atendimento
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="border-amber-400 text-amber-400 hover:bg-amber-400/10 font-bold py-6 px-8 rounded-md text-lg transition-all"
            >
              CONHECER SHOWROOM
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Entre em <span className="text-amber-400">Contato</span>
              </h2>
              <p className="text-gray-300 mb-8">
                Estamos prontos para transformar seus sonhos em realidade. Entre em contato conosco para agendar uma
                atendimento ou visitar nosso showroom.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-amber-400 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold">Endereço</h4>
                    <p className="text-gray-400">Av. Higienópolis, 1100 - Centro, Londrina - PR</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-amber-400 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold">Telefone</h4>
                    <p className="text-gray-400">(43) 3356-0000</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-amber-400 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold">Email</h4>
                    <p className="text-gray-400">contato@decoldesign.com.br</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-800">
              <h3 className="text-xl font-bold mb-6">Envie-nos uma mensagem</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                      Nome
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-1">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                  ></textarea>
                </div>
                <Button className="w-full bg-amber-400 hover:bg-amber-500 text-black font-bold py-3 rounded-md transition-all">
                  ENVIAR MENSAGEM
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-950 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-xl font-bold text-amber-400">DECOL DESIGN</h2>
              <p className="text-xs text-gray-400">Loja dos Famosos</p>
            </div>

            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">© 2025 DECOL DESIGN. Todos os direitos reservados.</p>
              <p className="text-gray-500 text-xs mt-1">Loja dos Famosos</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal for data collection */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            ref={modalRef}
            className="bg-gray-900 border border-gray-800 rounded-xl w-full max-w-md p-6 shadow-[0_0_25px_rgba(251,191,36,0.15)]"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Agendar atendimento</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Fechar modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="modal-name" className="block text-sm font-medium text-gray-300 mb-1">
                  Nome <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  id="modal-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full bg-gray-800 border ${errors.name ? "border-red-500" : "border-gray-700"} rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50`}
                  placeholder="Seu nome completo"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="modal-whatsapp" className="block text-sm font-medium text-gray-300 mb-1">
                  WhatsApp <span className="text-amber-400">*</span>
                </label>
                <input
                  type="tel"
                  id="modal-whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={(e) => {
                    const formatted = formatWhatsApp(e.target.value)
                    setFormData((prev) => ({ ...prev, whatsapp: formatted }))

                    // Clear error when user types
                    if (errors.whatsapp) {
                      setErrors((prev) => ({ ...prev, whatsapp: "" }))
                    }
                  }}
                  className={`w-full bg-gray-800 border ${errors.whatsapp ? "border-red-500" : "border-gray-700"} rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50`}
                  placeholder="(00) 00000-0000"
                />
                {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>}
              </div>

              <div>
                <label htmlFor="modal-email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email <span className="text-gray-500">(opcional)</span>
                </label>
                <input
                  type="email"
                  id="modal-email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                  placeholder="seu@email.com"
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-amber-400 hover:bg-amber-500 text-black font-bold py-3 rounded-md transition-all"
                >
                  CONFIRMAR AGENDAMENTO
                </Button>
                <p className="text-center text-gray-500 text-xs mt-3">
                  Entraremos em contato via WhatsApp para confirmar sua atendimento
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

