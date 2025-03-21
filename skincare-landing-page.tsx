import Image from "next/image"
import { Check, Star, ArrowRight, Diamond, Droplet, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SkincareLandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-rose-900 to-rose-800 py-4 px-4 text-white">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-xl font-medium flex items-center gap-2">
            <Diamond className="h-5 w-5 text-amber-300" />
            <span>KLARIE</span>
          </h1>
          <p className="text-center md:text-right flex items-center gap-2 font-medium">
            <Droplet className="h-5 w-5 text-amber-300" />
            Cuide da sua Pele com o Melhor Skincare e Resultados Comprovados!
          </p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-rose-50 to-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Pele perfeita, preço justo!{" "}
                <span className="text-rose-600">Ativos poderosos e tecnologia de ponta para um skincare eficaz!</span>
              </h2>

              <div className="flex items-center gap-2 bg-rose-50 p-3 rounded-lg border border-rose-100">
                <Check className="h-5 w-5 text-rose-600 flex-shrink-0" />
                <p className="text-gray-700">
                  Resultados visíveis e eficácia comprovada para uma pele saudável e rejuvenescida!
                </p>
              </div>

              <Button className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-6 px-8 rounded-lg text-lg transition-all">
                ENTRAR NO GRUPO VIP
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 relative">
              <div className="relative rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="Especialista em skincare com produto Klarie"
                  width={600}
                  height={500}
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-rose-900/90 to-transparent p-4">
                  <Button className="bg-rose-600 hover:bg-rose-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2">
                    Quero acessar o grupo de ofertas
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 md:bottom-8 md:right-8 w-32 h-32 rounded-full bg-white shadow-lg p-2">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-rose-600 to-rose-800 flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Produto Klarie"
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
          <div className="bg-gradient-to-r from-rose-50 to-white p-6 rounded-xl border border-rose-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-emerald-600" />
              Atendimento Exclusivo e Benefícios para Você!
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="bg-emerald-100 rounded-full p-1 flex-shrink-0">
                  <Check className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Desconto 25% no Valor Original</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-emerald-100 rounded-full p-1 flex-shrink-0">
                  <Check className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Comunidade VIP</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-emerald-100 rounded-full p-1 flex-shrink-0">
                  <Check className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Fórmulas Avançadas</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-emerald-100 rounded-full p-1 flex-shrink-0">
                  <Check className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Resultados Rápidos</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all">
                ENTRAR NO GRUPO VIP
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-gray-900 to-rose-950 text-white">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-center text-amber-300 font-medium mb-2">✨ Sua Pele Merece o Melhor Cuidado!</h3>

          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Você sabia que fatores como poluição, estresse e exposição ao sol aceleram o envelhecimento da pele?
          </h2>

          <p className="text-center text-xl font-medium mb-12">
            Manter uma rotina de skincare eficaz é essencial para conquistar uma pele saudável, iluminada e jovem.
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-12">
            <h3 className="text-xl font-bold mb-4 text-center flex items-center justify-center gap-2">
              <Diamond className="h-5 w-5 text-amber-300" />A Klarie traz a combinação perfeita de ativos poderosos para
              transformar sua pele:
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-bold text-amber-300 mb-2">Vitamina C</h4>
                <p>Clareia manchas, uniformiza o tom da pele e estimula a produção de colágeno.</p>
              </div>

              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-bold text-amber-300 mb-2">Retinol</h4>
                <p>Renova as células da pele, reduz linhas finas e melhora a textura.</p>
              </div>

              <div className="bg-white/5 p-4 rounded-lg">
                <h4 className="font-bold text-amber-300 mb-2">Ácido Hialurônico</h4>
                <p>Hidratação intensa e efeito preenchedor para uma pele mais firme e rejuvenescida.</p>
              </div>
            </div>
          </div>

          {/* Before & After Section */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 rounded-xl overflow-hidden">
              <div className="p-4 text-center">
                <p className="font-medium">1 - Hidratação profunda e efeito preenchedor</p>
              </div>
              <Image
                src="/placeholder.svg?height=300&width=500"
                alt="Antes e depois - Hidratação profunda"
                width={500}
                height={300}
                className="w-full object-cover"
              />
            </div>

            <div className="bg-white/5 rounded-xl overflow-hidden">
              <div className="p-4 text-center">
                <p className="font-medium">2 - Redução de manchas e uniformização</p>
              </div>
              <Image
                src="/placeholder.svg?height=300&width=500"
                alt="Antes e depois - Redução de manchas"
                width={500}
                height={300}
                className="w-full object-cover"
              />
            </div>

            <div className="bg-white/5 rounded-xl overflow-hidden">
              <div className="p-4 text-center">
                <p className="font-medium">3 - Pele mais firme, luminosa e rejuvenescida</p>
              </div>
              <Image
                src="/placeholder.svg?height=300&width=500"
                alt="Antes e depois - Pele rejuvenescida"
                width={500}
                height={300}
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-purple-950 to-purple-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">DEPOIMENTO DE NOSSOS CLIENTES PILOTO</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-white/10 rounded-xl p-6 relative">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <div className="w-16 h-16 rounded-full border-4 border-purple-600 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Ana Flávia"
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="mt-8 text-center">
                <h3 className="font-bold text-xl">ANA FLÁVIA</h3>
                <p className="text-purple-300">RIO DE JANEIRO</p>

                <div className="flex justify-center my-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="mt-4">
                  MINHA PELE ESTAVA COM MANCHAS E DESIDRATADA. COM ESSA LINHA, CONSEGUI CONTROLAR A OLEOSIDADE SEM
                  RESSECAR. ESTOU MUITO SATISFEITA COM OS RESULTADOS!
                </p>

                <div className="flex justify-center gap-2 mt-4">
                  <div className="w-8 h-8 rounded-full bg-rose-600"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white/10 rounded-xl p-6 relative">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <div className="w-16 h-16 rounded-full border-4 border-purple-600 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Camila Santos"
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="mt-8 text-center">
                <h3 className="font-bold text-xl">CAMILA SANTOS</h3>
                <p className="text-purple-300">MINAS GERAIS</p>

                <div className="flex justify-center my-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="mt-4">
                  SEMPRE TIVE MANCHAS E LINHAS DE EXPRESSÃO QUE ME INCOMODAVAM. USANDO ESSE SKINCARE, MINHA PELE FICOU
                  MAIS UNIFORME E ILUMINADA. RECOMENDO DEMAIS!
                </p>

                <div className="flex justify-center gap-2 mt-4">
                  <div className="w-8 h-8 rounded-full bg-rose-600"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white/10 rounded-xl p-6 relative">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <div className="w-16 h-16 rounded-full border-4 border-purple-600 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Letícia Alves"
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="mt-8 text-center">
                <h3 className="font-bold text-xl">LETÍCIA ALVES</h3>
                <p className="text-purple-300">SÃO PAULO</p>

                <div className="flex justify-center my-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="mt-4">
                  MELHOR SKINCARE QUE JÁ COMPREI. MINHA PELE ESTAVA MUITO DANIFICADA, E PERCEBI MUITA DIFERENÇA
                  RAPIDAMENTE.
                </p>

                <div className="flex justify-center gap-2 mt-4">
                  <div className="w-8 h-8 rounded-full bg-rose-600"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                </div>
              </div>
            </div>

            {/* Testimonial 4 */}
            <div className="bg-white/10 rounded-xl p-6 relative">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                <div className="w-16 h-16 rounded-full border-4 border-purple-600 overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Fernanda Oliveira"
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="mt-8 text-center">
                <h3 className="font-bold text-xl">FERNANDA OLIVEIRA</h3>
                <p className="text-purple-300">PARANÁ</p>

                <div className="flex justify-center my-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="mt-4">
                  TESTEI VÁRIAS MARCAS E NADA RESOLVIA MINHAS LINHAS FINAS. ESSE TRATAMENTO FEZ TODA A DIFERENÇA. MINHA
                  PELE ESTÁ MAIS FIRME E JOVEM. AMEI!
                </p>

                <div className="flex justify-center gap-2 mt-4">
                  <div className="w-8 h-8 rounded-full bg-rose-600"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 bg-gradient-to-b from-rose-900 to-rose-950 text-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <Diamond className="h-5 w-5 text-amber-300" />O Skincare de Alta Performance com Tecnologia Avançada para
            sua Pele!
            <Diamond className="h-5 w-5 text-amber-300" />
          </h2>

          <p className="text-center mb-12">
            Com certeza você já viu vários produtos de skincare no mercado, mas muitos cobram caro e entregam pouco, com
            fórmulas que não trazem os resultados esperados.
          </p>

          <h3 className="text-center font-bold text-xl mb-8 flex items-center justify-center gap-2">
            <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
            Com Klarie, você terá:
          </h3>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 rounded-xl p-6 border border-rose-800 relative">
              <div className="absolute -top-4 right-4 w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center">
                <Check className="h-5 w-5 text-white" />
              </div>
              <h4 className="text-lg font-bold mb-4 text-center">
                Poderá cuidar da sua pele com ativos de alta performance
              </h4>
            </div>

            <div className="bg-white/10 rounded-xl p-6 border border-rose-800 relative">
              <div className="absolute -top-4 right-4 w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center">
                <Check className="h-5 w-5 text-white" />
              </div>
              <h4 className="text-lg font-bold mb-4 text-center">
                Terá hidratação profunda e revitalização em todas as camadas
              </h4>
            </div>

            <div className="bg-white/10 rounded-xl p-6 border border-rose-800 relative">
              <div className="absolute -top-4 right-4 w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center">
                <Check className="h-5 w-5 text-white" />
              </div>
              <h4 className="text-lg font-bold mb-4 text-center">
                Poderá personalizar sua rotina de skincare com produtos eficazes e testados
              </h4>
            </div>
          </div>

          <div className="text-center">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-6 px-12 rounded-lg text-lg transition-all">
              ENTRAR NO GRUPO VIP
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-white text-center">
        <div className="container mx-auto max-w-6xl">
          <p className="text-sm text-gray-400">
            Este é o jeito mais FÁCIL e ECONÔMICO de apresentar profissionais aos seus clientes!
          </p>
          <p className="mt-4 text-xs text-gray-500">© 2025 Klarie. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

