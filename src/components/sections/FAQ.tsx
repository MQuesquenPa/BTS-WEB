import { Container } from '@/components/common/Container'

const FAQ_ITEMS = [
  {
    question: '¿Es merch oficial de BTS?',
    answer:
      'No. Purple Wave es un proyecto fan-made, sin afiliación oficial con BTS, BIGHIT MUSIC o HYBE. Cada pieza está inspirada en el fandom y producida de forma independiente en Perú.',
  },
  {
    question: '¿Puedo personalizar mi polo?',
    answer:
      'Sí. Nuestro plus principal es que puedes crear tu polo oversized con tu foto y tu integrante favorito. Elige el color base, sube la foto y nosotros hacemos el diseño. La opción está disponible en la sección Personaliza.',
  },
  {
    question: '¿Cuánto demoran los pedidos?',
    answer:
      'Los productos personalizados tienen un tiempo estimado de 5–7 días aprox. desde que confirmas. En Lima puede ser menor. Para provincias el plazo puede variar según destino y operador de envío. Los productos en stock están disponibles según talla y color — el tiempo de entrega se coordina contigo según tu ubicación.',
  },
  {
    question: '¿Qué tallas manejan?',
    answer:
      'Los polos oversized van de S a XL. Los accesorios son talla única. Cada producto indica sus tallas disponibles en su ficha.',
  },
  {
    question: '¿Envían a todo el Perú?',
    answer:
      'Sí, enviamos a todo el Perú. El costo de delivery es aparte y se coordina contigo según tu ubicación antes de confirmar el pedido.',
  },
  {
    question: '¿Cuál es la diferencia entre productos en stock y bajo pedido?',
    answer:
      'Los productos en stock están listos y se despachan rápido. Los bajo pedido (como los personalizados) se producen desde cero después de que confirmas tu pedido — por eso llevan más tiempo pero son piezas únicas.',
  },
  {
    question: '¿Purple Wave vende entradas para Lima 2026?',
    answer:
      'No, solo merch fan-made inspirado en las fechas del BTS World Tour Lima 2026 (07, 09 y 10 de octubre, Estadio San Marcos). Las entradas las gestiona el operador oficial del tour.',
  },
  {
    question: '¿Cómo las contacto?',
    answer: 'Escríbenos desde la sección About. Respondemos lo antes posible.',
  },
]

// Matches FAQ_ITEMS exactly, rendered from the same array — the visible
// content and this markup can't drift apart.
const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-24 py-14 sm:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }} />
      <Container className="max-w-3xl">
        <div className="mb-8 text-center sm:mb-10">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">PREGUNTAS FRECUENTES</h2>
        </div>
        <div className="flex flex-col gap-3">
          {FAQ_ITEMS.map((item) => (
            <details key={item.question} className="group rounded-2xl border border-border bg-surface px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold marker:content-none sm:text-base">
                {item.question}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-lg text-foreground-muted transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  )
}
