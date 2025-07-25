import Image from "next/image"

export default function ProductsSection() {
  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4 grid gap-12 md:gap-16">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1">
          <Image
            src="/Mesa-organica.JPG"
            alt="Mesa orgânica personalizada Decol Design"
            width={500}
            height={350}
            className="rounded-xl shadow-lg object-cover w-full h-auto max-h-80"
            priority
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-gold-600">Na Decol Design, acreditamos que a casa é um reflexo de quem somos</h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            A sala de estar e a sala de jantar são os espaços onde as melhores memórias são criadas. Por isso, somos especialistas em dois pontos centrais do lar: estofados de alto padrão e salas de jantar sob medida.
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
        <div className="flex-1">
          <Image
            src="/sofa-modular.JPG"
            alt="Sofá modular de alto padrão Decol Design"
            width={500}
            height={350}
            className="rounded-xl shadow-lg object-cover w-full h-auto max-h-80"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl md:text-2xl font-serif font-semibold mb-4 text-gold-600">Foco em conforto, exclusividade e design</h3>
          <p className="text-lg md:text-xl text-muted-foreground">
            Atendemos clientes exigentes: famílias em construção ou reforma, arquitetos, designers de interiores, clientes do agro, universo sertanejo e celebridades da região. Buscam sofisticação sem abrir mão de acolhimento. Não à toa, somos reconhecidos como a loja dos famosos.
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1">
          <Image
            src="/sofa-organico.JPG"
            alt="Sofá orgânico luxuoso Decol Design"
            width={500}
            height={350}
            className="rounded-xl shadow-lg object-cover w-full h-auto max-h-80"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl md:text-2xl font-serif font-semibold mb-4 text-gold-600">Showroom exclusivo em Londrina/PR</h3>
          <p className="text-lg md:text-xl text-muted-foreground">
            Curadoria de estofados luxuosos, tecidos nobres, assentos anatômicos e acabamentos impecáveis. Referência em salas de jantar personalizadas, com mesas de diferentes tamanhos, estilos e materiais — todas feitas para valorizar o ambiente e acomodar com elegância os momentos mais especiais.
          </p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto mt-8 text-center md:text-left">
        <p className="text-lg md:text-xl mb-4 text-muted-foreground">
          Trabalhamos com móveis sob medida, mas também temos peças à pronta entrega selecionadas no segundo andar da loja. O atendimento é feito com cuidado e atenção aos detalhes — seja presencialmente ou com hora marcada — sempre buscando entender o estilo e a rotina de cada cliente.
        </p>
        <p className="text-lg md:text-xl mb-4 text-muted-foreground">
          Nossa missão é criar ambientes que combinem estética e funcionalidade e estamos sempre em busca de novidades, tendências e atualizações no mercado, para oferecer aos nossos clientes o que há de melhor no universo do design de interiores.
        </p>
        <p className="text-lg md:text-xl font-semibold text-gold-600">
          Na Decol Design, cada móvel é pensado para fazer parte da sua história.<br />
          <span className="block mt-2">Seu projeto começa aqui — e eleva o seu viver a um novo padrão.</span>
        </p>
      </div>
    </section>
  )
}