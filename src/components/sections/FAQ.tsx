import { Container } from '@/components/common/Container'

// Kept neutral on anything we haven't actually decided (shipping times,
// contact channels) instead of inventing specific commercial policies —
// see the Fase 4.2 report.
const FAQ_ITEMS = [
  {
    question: '¿Es merch oficial de BTS?',
    answer:
      'No. Purple Wave es un proyecto fan-made, sin afiliación oficial con BTS, BIGHIT MUSIC o HYBE. Cada pieza está inspirada en el fandom, no producida ni licenciada por ellos.',
  },
  {
    question: '¿Puedo personalizar mi merch?',
    answer:
      'Sí — estamos construyendo un personalizador propio. Mientras tanto, puedes explorar el avance en la sección Personaliza.',
  },
  {
    question: '¿Qué tallas manejan?',
    answer:
      'La mayoría de prendas van de S a XL; los accesorios suelen ser talla única. Cada producto muestra sus tallas disponibles en su propia ficha.',
  },
  {
    question: '¿Purple Wave vende entradas para Lima 2026?',
    answer:
      'No — solo merch fan-made inspirado en las fechas del BTS World Tour en Lima (07, 09 y 10 de octubre de 2026, Estadio San Marcos). Las entradas se gestionan por los canales oficiales del tour.',
  },
  {
    question: '¿Cuánto demora el envío?',
    answer:
      'Cada pieza es fan-made y se produce bajo pedido. Los tiempos y zonas de envío se confirman antes de completar tu compra.',
  },
  {
    question: '¿Cómo los contacto?',
    answer: 'Escríbenos desde la sección About — ahí encontrarás la forma más rápida de comunicarte con nosotros.',
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
    <section className="py-14 sm:py-20">
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
