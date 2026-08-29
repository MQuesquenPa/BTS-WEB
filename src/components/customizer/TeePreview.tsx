import { useId } from 'react'
import type { CustomDesignState } from '@/constants/customizer'

// Polo front silhouette — crew neck, oversized proportions, viewBox 0 0 300 380
const POLO_PATH =
  'M 30,0 L 108,0 Q 120,0 128,22 Q 138,50 150,54 Q 162,50 172,22 Q 180,0 192,0 L 270,0 L 300,70 L 263,70 L 263,380 L 37,380 L 37,70 L 0,70 Z'

function colorIsDark(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.5
}

export function TeePreview({ state }: { state: CustomDesignState }) {
  const uid = useId().replace(/:/g, 'x')
  const clipId = `polo${uid}`

  const bg = state.color.hex
  const dark = colorIsDark(bg)
  const fg = dark ? '#ffffff' : '#171720'
  const fg60 = dark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)'
  const fg30 = dark ? 'rgba(255,255,255,0.28)' : 'rgba(0,0,0,0.18)'
  const accent = dark ? '#DED5FF' : '#8054FF'
  const bias = state.biasLabel ?? 'TU BIAS'
  const customerPhoto = state.customerPhotoUrl
  const artistPhoto = state.artistReferenceUrl

  const ariaLabel = [
    `Polo ${state.color.name}`,
    state.size ? `talla ${state.size}` : null,
    state.biasLabel ? `bias ${state.biasLabel}` : null,
    state.style ? `estilo ${state.style}` : null,
    customerPhoto ? 'con tu foto' : null,
    artistPhoto ? 'con referencia de artista' : null,
  ]
    .filter(Boolean)
    .join(', ')

  return (
    <div className="mx-auto w-full max-w-[300px] sm:max-w-[340px] lg:max-w-none">
      <svg
        viewBox="0 0 300 380"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
        aria-label={ariaLabel}
        role="img"
      >
        <defs>
          <clipPath id={clipId}>
            <path d={POLO_PATH} />
          </clipPath>
        </defs>

        {/* Polo body clipped to silhouette + drop shadow */}
        <g clipPath={`url(#${clipId})`} style={{ filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.22))' }}>
          <rect width="300" height="380" fill={bg} />

          {state.style === 'purple-editorial' && (
            <PurpleEditorial customerPhoto={customerPhoto} bias={bias} fg={fg} fg60={fg60} accent={accent} />
          )}
          {state.style === 'lima-night' && (
            <LimaNight customerPhoto={customerPhoto} artistPhoto={artistPhoto} bias={bias} />
          )}
          {state.style === 'fan-collage' && (
            <FanCollage customerPhoto={customerPhoto} artistPhoto={artistPhoto} bias={bias} fg={fg} accent={accent} dark={dark} />
          )}
          {!state.style && (
            <DefaultView customerPhoto={customerPhoto} bias={bias} fg={fg} fg60={fg60} fg30={fg30} accent={accent} />
          )}

          {/* Collar rib — subtle seam line */}
          <path
            d="M 108,0 Q 120,0 128,22 Q 138,50 150,54 Q 162,50 172,22 Q 180,0 192,0"
            fill="none"
            stroke={fg30}
            strokeWidth="9"
            strokeLinecap="round"
          />
        </g>

        {/* Polo outline for shape definition on light backgrounds */}
        <path d={POLO_PATH} fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="1.5" />
      </svg>

      <p className="mt-2 text-center font-mono text-[9px] tracking-[0.1em] text-foreground-muted" aria-hidden="true">
        {state.color.name.toUpperCase()} · {state.size ?? '—'} · {bias}
      </p>
    </div>
  )
}

// ── Default view (no template selected yet) ───────────────────────────────────

function DefaultView({
  customerPhoto,
  bias,
  fg,
  fg60,
  fg30,
  accent,
}: {
  customerPhoto: string | null
  bias: string
  fg: string
  fg60: string
  fg30: string
  accent: string
}) {
  return (
    <>
      {customerPhoto ? (
        <image href={customerPhoto} x="65" y="78" width="170" height="175" preserveAspectRatio="xMidYMid slice" />
      ) : (
        <>
          <rect x="65" y="78" width="170" height="175" fill={fg30} rx="3" />
          <text x="150" y="172" textAnchor="middle" fill={fg60} fontSize="9" fontFamily="monospace" letterSpacing="3">
            TU FOTO
          </text>
        </>
      )}
      <text x="150" y="290" textAnchor="middle" fill={fg} fontSize="22" fontFamily="Georgia,serif" fontWeight="700">
        {bias}
      </text>
      <text x="150" y="314" textAnchor="middle" fill={accent} fontSize="7" fontFamily="monospace" letterSpacing="5">
        PURPLE WAVE
      </text>
    </>
  )
}

// ── Purple Editorial ──────────────────────────────────────────────────────────

function PurpleEditorial({
  customerPhoto,
  bias,
  fg,
  fg60,
  accent,
}: {
  customerPhoto: string | null
  bias: string
  fg: string
  fg60: string
  accent: string
}) {
  return (
    <>
      {customerPhoto ? (
        <image href={customerPhoto} x="52" y="62" width="196" height="198" preserveAspectRatio="xMidYMid slice" />
      ) : (
        <>
          <rect x="52" y="62" width="196" height="198" fill="rgba(128,84,255,0.09)" rx="2" />
          <text x="150" y="165" textAnchor="middle" fill={accent} fontSize="9" fontFamily="monospace" letterSpacing="3">
            TU FOTO
          </text>
        </>
      )}
      {/* Fine rule */}
      <line x1="62" y1="272" x2="238" y2="272" stroke={accent} strokeWidth="0.7" />
      {/* Decorative side mark */}
      <line x1="62" y1="268" x2="62" y2="276" stroke={accent} strokeWidth="0.8" />
      <line x1="238" y1="268" x2="238" y2="276" stroke={accent} strokeWidth="0.8" />
      <text x="150" y="300" textAnchor="middle" fill={fg} fontSize="26" fontFamily="Georgia,serif" fontWeight="700">
        {bias}
      </text>
      <text x="150" y="322" textAnchor="middle" fill={accent} fontSize="7" fontFamily="monospace" letterSpacing="5">
        PURPLE WAVE
      </text>
      <text x="150" y="342" textAnchor="middle" fill={fg60} fontSize="5.5" fontFamily="monospace" letterSpacing="2">
        FAN-MADE · PERÚ
      </text>
    </>
  )
}

// ── Lima Night ────────────────────────────────────────────────────────────────

function LimaNight({
  customerPhoto,
  artistPhoto,
  bias,
}: {
  customerPhoto: string | null
  artistPhoto: string | null
  bias: string
}) {
  return (
    <>
      {/* Dark overlay for concert atmosphere */}
      <rect width="300" height="380" fill="rgba(0,0,0,0.52)" />

      {/* Subtle concert glow */}
      <ellipse cx="150" cy="160" rx="90" ry="70" fill="rgba(128,84,255,0.09)" />

      {/* Concert dates */}
      <text
        x="150"
        y="83"
        textAnchor="middle"
        fill="#FF315C"
        fontSize="12"
        fontFamily="monospace"
        letterSpacing="7"
        fontWeight="700"
      >
        07 · 09 · 10
      </text>
      <text x="150" y="99" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="7" fontFamily="monospace" letterSpacing="5">
        LIMA 2026
      </text>

      {/* Customer photo — center */}
      {customerPhoto ? (
        <image href={customerPhoto} x="55" y="108" width="190" height="172" preserveAspectRatio="xMidYMid slice" />
      ) : (
        <>
          <rect x="60" y="108" width="180" height="172" fill="rgba(255,255,255,0.06)" rx="2" />
          <text x="150" y="198" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace" letterSpacing="3">
            TU FOTO
          </text>
        </>
      )}

      {/* Artist reference — corner badge (on top of customer photo) */}
      {artistPhoto && (
        <>
          <rect x="195" y="106" width="64" height="58" fill="rgba(0,0,0,0.6)" rx="3" />
          <image href={artistPhoto} x="196" y="107" width="62" height="56" preserveAspectRatio="xMidYMid slice" />
          <rect x="195" y="106" width="64" height="3" fill="#FF315C" rx="1" />
        </>
      )}

      {/* Bias and venue */}
      <text x="150" y="308" textAnchor="middle" fill="white" fontSize="26" fontFamily="Georgia,serif" fontWeight="700">
        {bias}
      </text>
      <text x="150" y="326" textAnchor="middle" fill="rgba(255,255,255,0.38)" fontSize="6.5" fontFamily="monospace" letterSpacing="3">
        ESTADIO SAN MARCOS
      </text>
      <text x="150" y="348" textAnchor="middle" fill="#DED5FF" fontSize="7" fontFamily="monospace" letterSpacing="5">
        PURPLE WAVE
      </text>
    </>
  )
}

// ── Fan Collage ───────────────────────────────────────────────────────────────

function FanCollage({
  customerPhoto,
  artistPhoto,
  bias,
  fg,
  accent,
  dark,
}: {
  customerPhoto: string | null
  artistPhoto: string | null
  bias: string
  fg: string
  accent: string
  dark: boolean
}) {
  const badge = dark ? 'rgba(255,255,255,0.13)' : 'rgba(0,0,0,0.09)'
  return (
    <>
      {/* Scattered decorations */}
      <text x="43" y="92" fill={accent} fontSize="11" opacity="0.75">✦</text>
      <text x="250" y="88" fill={accent} fontSize="7" opacity="0.65">✦</text>
      <text x="41" y="280" fill={accent} fontSize="6" opacity="0.5">✦</text>
      <text x="254" y="296" fill={accent} fontSize="9" opacity="0.65">✦</text>
      <text x="90" y="350" fill="#FF315C" fontSize="8" opacity="0.6">♡</text>
      <text x="150" y="358" fill="#FF315C" fontSize="9" opacity="0.7">♡</text>
      <text x="208" y="350" fill="#FF315C" fontSize="8" opacity="0.6">♡</text>

      {/* Photos */}
      {customerPhoto && artistPhoto ? (
        // Two-photo collage: artist behind (right), customer on top (left)
        <>
          <image href={artistPhoto} x="126" y="94" width="132" height="158" preserveAspectRatio="xMidYMid slice" />
          <image href={customerPhoto} x="42" y="70" width="134" height="160" preserveAspectRatio="xMidYMid slice" />
        </>
      ) : customerPhoto ? (
        <image href={customerPhoto} x="58" y="70" width="184" height="184" preserveAspectRatio="xMidYMid slice" />
      ) : artistPhoto ? (
        <image href={artistPhoto} x="58" y="70" width="184" height="184" preserveAspectRatio="xMidYMid slice" />
      ) : (
        <>
          <rect x="58" y="70" width="184" height="184" fill="rgba(128,84,255,0.08)" rx="4" />
          <text x="150" y="164" textAnchor="middle" fill={accent} fontSize="9" fontFamily="monospace" letterSpacing="3">
            TU FOTO
          </text>
        </>
      )}

      {/* Bias badge */}
      <rect x="72" y="262" width="156" height="38" rx="10" fill={badge} />
      <text x="150" y="286" textAnchor="middle" fill={fg} fontSize="20" fontFamily="Georgia,serif" fontWeight="700">
        {bias}
      </text>
      <text x="150" y="322" textAnchor="middle" fill={accent} fontSize="7" fontFamily="monospace" letterSpacing="5">
        PURPLE WAVE
      </text>
    </>
  )
}
