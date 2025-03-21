import Image from "next/image"
import { Check, Star, ArrowRight, Home, Sofa, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FurnitureLandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-900 to-amber-800 py-4 px-4 text-white">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-xl font-medium flex items-center gap-2">
            <Home className="h-5 w-5 text-teal-300" />
            <span>DECOL</span>
          </h1>
          <p className="text-center md:text-right flex items-center gap-2 font-medium">
            <Sofa className="h-5 w-5 text-teal-300" />O melhor show-room de móveis e decoração de Londrina!
          </p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-amber-50 to-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Ambientes perfeitos, preço justo!{" "}
                <span className="text-amber-600">Móveis de qualidade e design exclusivo para sua casa!</span>
              </h2>

              <div className="flex items-center gap-2 bg-amber-50 p-3 rounded-lg border border-amber-100">
                <Check className="h-5 w-5 text-amber-600 flex-shrink-0" />
                <p className="text-gray-700">
                  Qualidade comprovada e design exclusivo para transformar sua casa em um ambiente aconchegante!
                </p>
              </div>

              <Button className="w-full md:w-auto bg-teal-600 hover:bg-teal-700 text-white font-bold py-6 px-8 rounded-lg text-lg transition-all">
                AGENDAR VISITA
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 relative">
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="Showroom Decol com móveis elegantes"
                  width={600}
                  height={500}
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-900/90 to-transparent p-4">
                  <Button className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2">
                    Quero conhecer o showroom
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 md:bottom-8 md:right-8 w-32 h-32 rounded-full bg-white shadow-lg p-2">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Móvel Decol"
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gradient-to-r from-amber-50 to-white p-6 rounded-xl border border-amber-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-teal-600" />
              Atendimento Exclusivo e Benefícios para Você!
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="bg-teal-100 rounded-full p-1 flex-shrink-0">
                  <Check className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Consultoria de Design Gratuita</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-teal-100 rounded-full p-1 flex-shrink-0">
                  <Check className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Entrega e Montagem Incluídas</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-teal-100 rounded-full p-1 flex-shrink-0">
                  <Check className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Móveis Exclusivos</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-teal-100 rounded-full p-1 flex-shrink-0">
                  <Check className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Garantia Estendida</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all">
                AGENDAR VISITA
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-gray-900 to-amber-950 text-white">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-center text-teal-300 font-medium mb-2">✨ Sua Casa Merece o Melhor em Decoração!</h3>

          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Você sabia que o ambiente onde vivemos influencia diretamente nossa qualidade de vida e bem-estar?
          </h2>

          <p className="text-center text-xl font-medium mb-12">
            Ter uma casa bem decorada e com móveis de qualidade é essencial para criar um ambiente aconchegante e
            funcional.
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-12">
            <h3 className="text-xl font-bold mb-4 text-center flex items-center justify-center gap-2">
              <Home className="h-5 w-5 text-teal-300" />A Decol traz a combinação perfeita de design e qualidade para
              transformar sua casa:
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-bold text-teal-300 mb-2">Design Exclusivo</h4>
                <p>Peças únicas e personalizadas que combinam com seu estilo e personalidade.</p>
              </div>

              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-bold text-teal-300 mb-2">Materiais Premium</h4>
                <p>Utilizamos apenas materiais de alta qualidade para garantir durabilidade e beleza.</p>
              </div>

              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-bold text-teal-300 mb-2">Conforto e Funcionalidade</h4>
                <p>Móveis que unem beleza e praticidade para o dia a dia da sua família.</p>
              </div>
            </div>
          </div>

          {/* Before & After Section */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 rounded-xl overflow-hidden">
              <div className="p-4 text-center">
                <p className="font-medium">1 - Salas transformadas com nossos móveis</p>
              </div>
              <Image
                src="/placeholder.svg?height=300&width=500"
                alt="Antes e depois - Sala transformada"
                width={500}
                height={300}
                className="w-full object-cover"
              />
            </div>

            <div className="bg-white/5 rounded-xl overflow-hidden">
              <div className="p-4 text-center">
                <p className="font-medium">2 - Quartos aconchegantes e funcionais</p>
              </div>
              <Image
                src="/placeholder.svg?height=300&width=500"
                alt="Antes e depois - Quarto transformado"
                width={500}
                height={300}
                className="w-full object-cover"
              />
            </div>

            <div className="bg-white/5 rounded-xl overflow-hidden">
              <div className="p-4 text-center">
                <p className="font-medium">3 - Cozinhas modernas e práticas</p>
              </div>
              <Image
                src="/placeholder.svg?height=300&width=500"
                alt="Antes e depois - Cozinha transformada"
                width={500}
                height={300}
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-teal-950 to-teal-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">DEPOIMENTO DE NOSSOS CLIENTES</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-white/10 rounded-xl p-6 relative">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <div className="w-16 h-16 rounded-full border-4 border-teal-600 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Carlos Eduardo"
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="mt-8 text-center">
                <h3 className="font-bold text-xl">CARLOS EDUARDO</h3>
                <p className="text-teal-300">LONDRINA</p>

                <div className="flex justify-center my-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="mt-4">
                  MINHA SALA ESTAVA PRECISANDO DE UMA RENOVAÇÃO. COM OS MÓVEIS DA DECOL, CONSEGUI TRANSFORMAR O AMBIENTE
                  E DEIXÁ-LO MUITO MAIS ACONCHEGANTE. ESTOU MUITO SATISFEITO!
                </p>

                <div className="flex justify-center gap-2 mt-4">
                  <div className="w-8 h-8 rounded-full bg-amber-600"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white/10 rounded-xl p-6 relative">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <div className="w-16 h-16 rounded-full border-4 border-teal-600 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Mariana Costa"
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="mt-8 text-center">
                <h3 className="font-bold text-xl">MARIANA COSTA</h3>
                <p className="text-teal-300">LONDRINA</p>

                <div className="flex justify-center my-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="mt-4">
                  A CONSULTORIA DE DESIGN FOI FUNDAMENTAL PARA ESCOLHER OS MÓVEIS CERTOS PARA MEU APARTAMENTO. O
                  RESULTADO FICOU INCRÍVEL E TODOS OS MEUS AMIGOS ELOGIAM!
                </p>

                <div className="flex justify-center gap-2 mt-4">
                  <div className="w-8 h-8 rounded-full bg-amber-600"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white/10 rounded-xl p-6 relative">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <div className="w-16 h-16 rounded-full border-4 border-teal-600 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Roberto Silva"
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="mt-8 text-center">
                <h3 className="font-bold text-xl">ROBERTO SILVA</h3>
                <p className="text-teal-300">CAMBÉ</p>

                <div className="flex justify-center my-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="mt-4">
                  MELHOR LOJA DE MÓVEIS DA REGIÃO. ATENDIMENTO EXCELENTE E PRODUTOS DE QUALIDADE. MINHA CASA FICOU
                  COMPLETAMENTE DIFERENTE!
                </p>

                <div className="flex justify-center gap-2 mt-4">
                  <div className="w-8 h-8 rounded-full bg-amber-600"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                </div>
              </div>
            </div>

            {/* Testimonial 4 */}
            <div className="bg-white/10 rounded-xl p-6 relative">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <div className="w-16 h-16 rounded-full border-4 border-teal-600 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Juliana Mendes"
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="mt-8 text-center">
                <h3 className="font-bold text-xl">JULIANA MENDES</h3>
                <p className="text-teal-300">LONDRINA</p>

                <div className="flex justify-center my-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="mt-4">
                  PROCUREI VÁRIAS LOJAS E NADA ME AGRADAVA. NA DECOL ENCONTREI EXATAMENTE O QUE PROCURAVA PARA MINHA
                  SALA DE JANTAR. QUALIDADE EXCEPCIONAL!
                </p>

                <div className="flex justify-center gap-2 mt-4">
                  <div className="w-8 h-8 rounded-full bg-amber-600"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-amber-900 to-amber-950 text-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <Home className="h-5 w-5 text-teal-300" />O Melhor Show-Room de Móveis e Decoração de Londrina!
            <Home className="h-5 w-5 text-teal-300" />
          </h2>

          <p className="text-center mb-12">
            Com certeza você já visitou várias lojas de móveis, mas muitas cobram caro e entregam pouco, com produtos
            que não trazem a qualidade esperada.
          </p>

          <h3 className="text-center font-bold text-xl mb-8 flex items-center justify-center gap-2">
            <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
            Com a Decol, você terá:
          </h3>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 rounded-xl p-6 border border-amber-800 relative">
              <div className="absolute -top-4 right-4 w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center">
                <Check className="h-5 w-5 text-white" />
              </div>
              <h4 className="text-lg font-bold mb-4 text-center">Móveis de alta qualidade com design exclusivo</h4>
            </div>

            <div className="bg-white/10 rounded-xl p-6 border border-amber-800 relative">
              <div className="absolute -top-4 right-4 w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center">
                <Check className="h-5 w-5 text-white" />
              </div>
              <h4 className="text-lg font-bold mb-4 text-center">
                Consultoria de design para criar ambientes harmoniosos
              </h4>
            </div>

            <div className="bg-white/10 rounded-xl p-6 border border-amber-800 relative">
              <div className="absolute -top-4 right-4 w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center">
                <Check className="h-5 w-5 text-white" />
              </div>
              <h4 className="text-lg font-bold mb-4 text-center">
                Entrega e montagem profissional incluídas na compra
              </h4>
            </div>
          </div>

          <div className="text-center">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-6 px-12 rounded-lg text-lg transition-all">
              AGENDAR VISITA
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-white text-center">
        <div className="container mx-auto max-w-6xl">
          <p className="text-sm text-gray-400">O melhor show-room de móveis e decoração de Londrina!</p>
          <p className="mt-4 text-xs text-gray-500">© 2025 Decol. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

