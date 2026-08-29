import { useEffect, useReducer, useRef, useState } from 'react'
import { MEMBERS } from '@/data/members'
import {
  buildOrderSummaryText,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  WHATSAPP_NUMBER,
} from '@/lib/customizer-order'
import { useToastStore } from '@/store/toastStore'
import {
  ACCEPTED_IMAGE_TYPES,
  CUSTOMIZER_COLORS,
  CUSTOMIZER_SIZES,
  MAX_PHOTO_BYTES,
  STYLE_OPTIONS,
  type ColorOption,
  type CustomDesignState,
  type CustomizerSize,
  type StyleTemplate,
} from '@/constants/customizer'
import { TeePreview } from './TeePreview'

// ── Reducer ───────────────────────────────────────────────────────────────────

type Action =
  | { type: 'SET_COLOR'; color: ColorOption }
  | { type: 'SET_SIZE'; size: CustomizerSize }
  | { type: 'SET_BIAS'; slug: string; label: string }
  | { type: 'SET_CUSTOMER_PHOTO'; file: File; url: string }
  | { type: 'REMOVE_CUSTOMER_PHOTO' }
  | { type: 'SET_ARTIST_REFERENCE'; file: File; url: string }
  | { type: 'REMOVE_ARTIST_REFERENCE' }
  | { type: 'SET_STYLE'; style: StyleTemplate }

const INITIAL: CustomDesignState = {
  model: 'oversized-tee',
  color: CUSTOMIZER_COLORS[0]!,
  size: null,
  bias: null,
  biasLabel: null,
  customerPhoto: null,
  customerPhotoUrl: null,
  artistReference: null,
  artistReferenceUrl: null,
  style: null,
}

function reducer(state: CustomDesignState, action: Action): CustomDesignState {
  switch (action.type) {
    case 'SET_COLOR':
      return { ...state, color: action.color }
    case 'SET_SIZE':
      return { ...state, size: action.size }
    case 'SET_BIAS':
      return { ...state, bias: action.slug, biasLabel: action.label }
    case 'SET_CUSTOMER_PHOTO':
      return { ...state, customerPhoto: action.file, customerPhotoUrl: action.url }
    case 'REMOVE_CUSTOMER_PHOTO':
      return { ...state, customerPhoto: null, customerPhotoUrl: null }
    case 'SET_ARTIST_REFERENCE':
      return { ...state, artistReference: action.file, artistReferenceUrl: action.url }
    case 'REMOVE_ARTIST_REFERENCE':
      return { ...state, artistReference: null, artistReferenceUrl: null }
    case 'SET_STYLE':
      return { ...state, style: action.style }
  }
}

// ── Constants ─────────────────────────────────────────────────────────────────

const TOTAL_STEPS = 6
const STEP_LABELS = ['Color', 'Talla', 'Bias', 'Fotos', 'Estilo', 'Tu Diseño']

type BiasOption = { slug: string; label: string; initial: string; gradient: string }

const BIAS_OPTIONS: BiasOption[] = [
  {
    slug: 'ot7',
    label: 'OT7',
    initial: 'OT7',
    gradient: 'linear-gradient(155deg, #3E2E66 0%, #8054FF 55%, #DED5FF 100%)',
  },
  ...MEMBERS.map((m) => ({ slug: m.slug, label: m.stage, initial: m.initial, gradient: m.gradient })),
]

// ── Wizard ────────────────────────────────────────────────────────────────────

export function CustomizerWizard() {
  const [state, dispatch] = useReducer(reducer, INITIAL)
  const [step, setStep] = useState(1)
  const [stepError, setStepError] = useState<string | null>(null)
  const topRef = useRef<HTMLDivElement>(null)

  // Revoke each object URL when it changes or the wizard unmounts.
  useEffect(() => {
    const url = state.customerPhotoUrl
    return () => { if (url) URL.revokeObjectURL(url) }
  }, [state.customerPhotoUrl])

  useEffect(() => {
    const url = state.artistReferenceUrl
    return () => { if (url) URL.revokeObjectURL(url) }
  }, [state.artistReferenceUrl])

  function validate(s: number): string | null {
    if (s === 2 && !state.size) return 'Selecciona una talla para continuar.'
    if (s === 3 && !state.bias) return 'Selecciona tu bias para continuar.'
    if (s === 4 && !state.customerPhoto) return 'Sube tu foto para continuar.'
    if (s === 5 && !state.style) return 'Elige un estilo para continuar.'
    return null
  }

  function goNext() {
    const err = validate(step)
    if (err) { setStepError(err); return }
    setStepError(null)
    setStep((s) => Math.min(s + 1, TOTAL_STEPS))
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  function goBack() {
    setStepError(null)
    setStep((s) => Math.max(s - 1, 1))
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  function handleCustomerPhotoChange(file: File, url: string) {
    dispatch({ type: 'SET_CUSTOMER_PHOTO', file, url })
    setStepError(null)
  }

  function handleArtistReferenceChange(file: File, url: string) {
    dispatch({ type: 'SET_ARTIST_REFERENCE', file, url })
  }

  const isLastStep = step === TOTAL_STEPS

  return (
    <div className="py-8 sm:py-12">
      {/* Fixed model context */}
      <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl border border-border bg-surface/60 px-4 py-2.5">
        <span className="text-xs font-semibold tracking-[0.08em] text-purple-light">CUSTOM OVERSIZED TEE</span>
        <span className="text-xs text-border" aria-hidden="true">·</span>
        <span className="text-xs text-foreground-muted">Fan-made · Tiempo estimado 5–7 días aprox.</span>
      </div>

      {/* Progress indicator */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold tracking-[0.12em] text-purple-light">
            PASO {step} DE {TOTAL_STEPS}
          </span>
          <span className="text-xs text-foreground-muted">{STEP_LABELS[step - 1]}</span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-purple transition-all duration-300"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            role="progressbar"
            aria-label="Progreso del configurador"
            aria-valuenow={step}
            aria-valuemin={1}
            aria-valuemax={TOTAL_STEPS}
          />
        </div>
      </div>

      {/* Two-column layout: preview | steps */}
      <div className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-12">
        {/* Preview — sticky sidebar on desktop */}
        <div className="order-first lg:sticky lg:top-24 lg:self-start">
          <p className="mb-3 text-[10px] font-semibold tracking-[0.12em] text-foreground-muted">VISTA PREVIA</p>
          <TeePreview state={state} />
        </div>

        {/* Step content */}
        <div ref={topRef} className="flex flex-col">
          <div className="flex-1">
            {step === 1 && (
              <StepColor state={state} dispatch={dispatch} onInteract={() => setStepError(null)} />
            )}
            {step === 2 && (
              <StepSize state={state} dispatch={dispatch} onInteract={() => setStepError(null)} />
            )}
            {step === 3 && (
              <StepBias state={state} dispatch={dispatch} onInteract={() => setStepError(null)} />
            )}
            {step === 4 && (
              <StepPhotos
                state={state}
                onCustomerPhotoChange={handleCustomerPhotoChange}
                onCustomerPhotoRemove={() => dispatch({ type: 'REMOVE_CUSTOMER_PHOTO' })}
                onArtistReferenceChange={handleArtistReferenceChange}
                onArtistReferenceRemove={() => dispatch({ type: 'REMOVE_ARTIST_REFERENCE' })}
                onInteract={() => setStepError(null)}
              />
            )}
            {step === 5 && (
              <StepStyle state={state} dispatch={dispatch} onInteract={() => setStepError(null)} />
            )}
            {step === 6 && <StepSummary state={state} onEdit={() => setStep(5)} />}
          </div>

          {/* Inline step error */}
          {stepError && (
            <p
              role="alert"
              className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400"
            >
              {stepError}
            </p>
          )}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between gap-4 border-t border-border pt-6">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 1}
              className="min-h-11 rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground-muted transition-colors hover:border-purple-light hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
            >
              ← Atrás
            </button>

            {!isLastStep && (
              <button
                type="button"
                onClick={goNext}
                className="min-h-11 rounded-xl bg-purple px-8 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-purple-light"
              >
                Continuar →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Shared: step header ───────────────────────────────────────────────────────

function StepHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-2xl font-bold sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 text-sm text-foreground-muted">{subtitle}</p>}
    </div>
  )
}

// ── Step 1: Color ─────────────────────────────────────────────────────────────

function StepColor({
  state,
  dispatch,
  onInteract,
}: {
  state: CustomDesignState
  dispatch: React.Dispatch<Action>
  onInteract: () => void
}) {
  return (
    <div>
      <StepHeader
        title="ELIGE EL COLOR BASE"
        subtitle="Colores planeados — el stock físico se confirma antes del lanzamiento."
      />
      <div className="flex flex-wrap gap-5" role="group" aria-label="Color del polo">
        {CUSTOMIZER_COLORS.map((color) => {
          const selected = state.color.hex === color.hex
          const dark = isDark(color.hex)
          return (
            <button
              key={color.hex}
              type="button"
              onClick={() => { dispatch({ type: 'SET_COLOR', color }); onInteract() }}
              aria-pressed={selected}
              aria-label={`Color ${color.name}${selected ? ', seleccionado' : ''}`}
              className={`relative h-14 w-14 rounded-full border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-light focus-visible:ring-offset-2 ${
                selected
                  ? 'border-purple-light ring-2 ring-purple ring-offset-2 ring-offset-background'
                  : 'border-border hover:border-foreground-muted'
              }`}
              style={{ backgroundColor: color.hex }}
            >
              {selected && (
                <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                  <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                    <path
                      d="M1 4.5L3.8 7.5L10 1"
                      stroke={dark ? 'white' : '#171720'}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
            </button>
          )
        })}
      </div>
      <p className="mt-5 text-sm font-medium text-foreground">
        Seleccionado:{' '}
        <span className="text-purple-light">{state.color.name}</span>
      </p>
    </div>
  )
}

// ── Step 2: Talla ─────────────────────────────────────────────────────────────

function StepSize({
  state,
  dispatch,
  onInteract,
}: {
  state: CustomDesignState
  dispatch: React.Dispatch<Action>
  onInteract: () => void
}) {
  return (
    <div>
      <StepHeader
        title="ELIGE TU TALLA"
        subtitle="Corte oversized — si dudas entre dos tallas, elige la mayor."
      />
      <div className="flex flex-wrap gap-3" role="group" aria-label="Talla del polo">
        {CUSTOMIZER_SIZES.map((size) => {
          const selected = state.size === size
          return (
            <button
              key={size}
              type="button"
              onClick={() => { dispatch({ type: 'SET_SIZE', size }); onInteract() }}
              aria-pressed={selected}
              className={`min-h-14 w-20 rounded-2xl border-2 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-light ${
                selected
                  ? 'border-purple-light bg-purple/15 text-purple-light'
                  : 'border-border text-foreground-muted hover:border-purple-light hover:text-foreground'
              }`}
            >
              {size}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Step 3: Bias ──────────────────────────────────────────────────────────────

function StepBias({
  state,
  dispatch,
  onInteract,
}: {
  state: CustomDesignState
  dispatch: React.Dispatch<Action>
  onInteract: () => void
}) {
  return (
    <div>
      <StepHeader
        title="ELIGE TU BIAS"
        subtitle="El integrante que protagonizará el diseño de tu polo."
      />
      <div className="grid grid-cols-4 gap-2 sm:gap-3" role="group" aria-label="Bias o integrante">
        {BIAS_OPTIONS.map(({ slug, label, initial, gradient }) => {
          const selected = state.bias === slug
          return (
            <button
              key={slug}
              type="button"
              onClick={() => { dispatch({ type: 'SET_BIAS', slug, label }); onInteract() }}
              aria-pressed={selected}
              className={`flex flex-col items-center gap-2 rounded-2xl p-2.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-light sm:p-3 ${
                selected ? 'bg-purple/10' : 'hover:bg-surface'
              }`}
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-full text-[10px] font-bold text-white transition-all sm:h-14 sm:w-14 sm:text-xs ${
                  selected ? 'ring-2 ring-purple-light ring-offset-2 ring-offset-background' : ''
                }`}
                style={{ background: gradient }}
              >
                {initial}
              </span>
              <span
                className={`text-[11px] font-semibold leading-tight sm:text-xs ${
                  selected ? 'text-purple-light' : 'text-foreground-muted'
                }`}
              >
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Step 4: Fotos ─────────────────────────────────────────────────────────────

function StepPhotos({
  state,
  onCustomerPhotoChange,
  onCustomerPhotoRemove,
  onArtistReferenceChange,
  onArtistReferenceRemove,
  onInteract,
}: {
  state: CustomDesignState
  onCustomerPhotoChange: (file: File, url: string) => void
  onCustomerPhotoRemove: () => void
  onArtistReferenceChange: (file: File, url: string) => void
  onArtistReferenceRemove: () => void
  onInteract: () => void
}) {
  return (
    <div>
      <StepHeader title="CREA TU COMPOSICIÓN" />

      {/* Privacy notice */}
      <div className="mb-6 flex items-start gap-2 rounded-xl border border-border bg-surface/60 px-4 py-3">
        <span className="mt-0.5 shrink-0 text-xs text-foreground-muted" aria-hidden="true">🔒</span>
        <p className="text-xs leading-relaxed text-foreground-muted">
          Ambas fotos permanecen en este dispositivo durante la vista previa. No las almacenamos ni enviamos en esta etapa.
        </p>
      </div>

      <div className="flex flex-col gap-6 sm:flex-row">
        <PhotoUploadArea
          label="TU FOTO"
          sublabel="Recomendamos imágenes con buena iluminación y fondo simple."
          url={state.customerPhotoUrl}
          required
          onChange={(file, url) => { onCustomerPhotoChange(file, url); onInteract() }}
          onRemove={onCustomerPhotoRemove}
        />
        <PhotoUploadArea
          label="REFERENCIA DE ARTISTA"
          sublabel="Una imagen de tu bias que te inspire (opcional, para Fan Collage y Lima Night)."
          url={state.artistReferenceUrl}
          onChange={onArtistReferenceChange}
          onRemove={onArtistReferenceRemove}
        />
      </div>
    </div>
  )
}

function PhotoUploadArea({
  label,
  sublabel,
  url,
  required,
  onChange,
  onRemove,
}: {
  label: string
  sublabel: string
  url: string | null
  required?: boolean
  onChange: (file: File, url: string) => void
  onRemove: () => void
}) {
  const [fileError, setFileError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setFileError('Formato no soportado. Usa JPEG, PNG o WebP.')
      e.target.value = ''
      return
    }
    if (file.size > MAX_PHOTO_BYTES) {
      const mb = (file.size / 1024 / 1024).toFixed(1)
      setFileError(`La imagen es muy grande (${mb} MB). El máximo es 8 MB.`)
      e.target.value = ''
      return
    }

    setFileError(null)
    const blobUrl = URL.createObjectURL(file)
    onChange(file, blobUrl)
    e.target.value = ''
  }

  return (
    <div className="flex-1">
      {/* Label + badge */}
      <div className="mb-1.5 flex items-center gap-2">
        <span className="text-[11px] font-bold tracking-[0.08em] text-foreground">{label}</span>
        {required ? (
          <span className="rounded-full bg-purple/20 px-2 py-0.5 text-[9px] font-semibold text-purple-light">
            Requerida
          </span>
        ) : (
          <span className="rounded-full bg-surface px-2 py-0.5 text-[9px] font-semibold text-foreground-muted">
            Opcional
          </span>
        )}
      </div>
      <p className="mb-3 text-xs leading-relaxed text-foreground-muted">{sublabel}</p>

      {url ? (
        <div className="flex flex-col gap-3">
          <div className="relative aspect-[4/3] w-full max-w-[200px] overflow-hidden rounded-xl border border-border">
            <img src={url} alt={label} className="h-full w-full object-cover" />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="min-h-9 rounded-xl border border-border px-4 py-2 text-xs font-semibold text-foreground-muted transition-colors hover:border-purple-light hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-light"
            >
              Cambiar
            </button>
            <button
              type="button"
              onClick={onRemove}
              className="min-h-9 rounded-xl border border-border px-4 py-2 text-xs font-semibold text-foreground-muted transition-colors hover:border-red-500/50 hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            >
              Eliminar
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full flex-col items-center gap-2.5 rounded-2xl border-2 border-dashed border-border px-4 py-10 transition-colors hover:border-purple-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-light"
          aria-label={`Seleccionar ${label}`}
        >
          <span className="text-3xl" aria-hidden="true">📷</span>
          <span className="text-xs font-semibold text-foreground-muted">Seleccionar imagen</span>
          <span className="text-[10px] text-foreground-muted">JPEG, PNG o WebP · Máx. 8 MB</span>
        </button>
      )}

      {fileError && (
        <p role="alert" className="mt-2 text-xs font-medium text-red-400">
          {fileError}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_IMAGE_TYPES}
        onChange={handleSelect}
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
      />
    </div>
  )
}

// ── Step 5: Estilo ────────────────────────────────────────────────────────────

function StepStyle({
  state,
  dispatch,
  onInteract,
}: {
  state: CustomDesignState
  dispatch: React.Dispatch<Action>
  onInteract: () => void
}) {
  return (
    <div>
      <StepHeader
        title="ELIGE EL ESTILO"
        subtitle="El look visual de tu polo. Cambia en tiempo real en la vista previa."
      />
      <div className="grid gap-4 sm:grid-cols-3" role="group" aria-label="Estilo del diseño">
        {STYLE_OPTIONS.map((option) => {
          const selected = state.style === option.id
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => { dispatch({ type: 'SET_STYLE', style: option.id }); onInteract() }}
              aria-pressed={selected}
              className={`flex flex-col overflow-hidden rounded-2xl border text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-light ${
                selected
                  ? 'border-purple-light bg-purple/10 ring-1 ring-purple/30'
                  : 'border-border bg-surface hover:border-purple-light'
              }`}
            >
              {/* Mini visual preview */}
              <div className="h-28 w-full overflow-hidden">
                {option.id === 'purple-editorial' && <PurpleEditorialThumb />}
                {option.id === 'lima-night' && <LimaNightThumb />}
                {option.id === 'fan-collage' && <FanCollageThumb />}
              </div>
              {/* Card text */}
              <div className="p-4">
                <p className={`text-sm font-semibold ${selected ? 'text-purple-light' : 'text-foreground'}`}>
                  {option.name}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-foreground-muted">{option.description}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Mini thumbnail SVGs for style cards

function PurpleEditorialThumb() {
  return (
    <svg
      viewBox="0 0 200 112"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="200" height="112" fill="#171720" />
      <rect x="24" y="12" width="152" height="60" fill="rgba(128,84,255,0.14)" rx="3" />
      <text x="100" y="45" textAnchor="middle" fill="rgba(128,84,255,0.4)" fontSize="10" fontFamily="monospace" letterSpacing="3">
        FOTO
      </text>
      <line x1="24" y1="80" x2="176" y2="80" stroke="#8054FF" strokeWidth="0.8" />
      <line x1="24" y1="76" x2="24" y2="84" stroke="#8054FF" strokeWidth="0.8" />
      <line x1="176" y1="76" x2="176" y2="84" stroke="#8054FF" strokeWidth="0.8" />
      <text x="100" y="97" textAnchor="middle" fill="white" fontSize="13" fontFamily="Georgia,serif" fontWeight="700">
        BIAS
      </text>
      <text x="100" y="109" textAnchor="middle" fill="rgba(128,84,255,0.7)" fontSize="5.5" fontFamily="monospace" letterSpacing="3">
        PURPLE WAVE
      </text>
    </svg>
  )
}

function LimaNightThumb() {
  return (
    <svg
      viewBox="0 0 200 112"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="200" height="112" fill="#060609" />
      <ellipse cx="100" cy="56" rx="65" ry="40" fill="rgba(128,84,255,0.08)" />
      <text x="100" y="22" textAnchor="middle" fill="#FF315C" fontSize="11" fontFamily="monospace" letterSpacing="6" fontWeight="700">
        07·09·10
      </text>
      <rect x="36" y="30" width="128" height="52" fill="rgba(255,255,255,0.06)" rx="2" />
      <text x="100" y="59" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="9" fontFamily="monospace" letterSpacing="3">
        TU FOTO
      </text>
      <text x="100" y="97" textAnchor="middle" fill="white" fontSize="12" fontFamily="Georgia,serif" fontWeight="700">
        BIAS
      </text>
      <text x="100" y="109" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="5.5" fontFamily="monospace" letterSpacing="4">
        LIMA 2026
      </text>
    </svg>
  )
}

function FanCollageThumb() {
  return (
    <svg
      viewBox="0 0 200 112"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="200" height="112" fill="#3E2E66" />
      <g transform="rotate(-4, 68, 52)">
        <rect x="14" y="12" width="108" height="80" fill="rgba(255,255,255,0.18)" rx="3" />
      </g>
      <g transform="rotate(5, 142, 52)">
        <rect x="88" y="16" width="102" height="76" fill="rgba(255,255,255,0.11)" rx="3" />
      </g>
      <text x="18" y="104" fill="#DED5FF" fontSize="8" opacity="0.8">✦</text>
      <text x="170" y="98" fill="#DED5FF" fontSize="6" opacity="0.7">✦</text>
      <text x="94" y="108" fill="#FF315C" fontSize="8" opacity="0.8">♡</text>
      <rect x="50" y="88" width="100" height="17" rx="6" fill="rgba(255,255,255,0.16)" />
      <text x="100" y="100" textAnchor="middle" fill="white" fontSize="10" fontFamily="Georgia,serif" fontWeight="700">
        BIAS
      </text>
    </svg>
  )
}

// ── Step 6: Tu Diseño (Summary + Handoff) ────────────────────────────────────

function StepSummary({ state, onEdit }: { state: CustomDesignState; onEdit: () => void }) {
  const styleName = STYLE_OPTIONS.find((s) => s.id === state.style)?.name ?? '—'
  const [copyState, setCopyState] = useState<'idle' | 'success' | 'error'>('idle')
  const showToast = useToastStore((s) => s.showToast)

  const summaryText = buildOrderSummaryText(state)
  const waMessage = buildWhatsAppMessage(state)
  const waUrl = WHATSAPP_NUMBER ? buildWhatsAppUrl(WHATSAPP_NUMBER, waMessage) : '+51956975212'
  const hasPhotos = Boolean(state.customerPhoto ?? state.artistReference)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(summaryText)
      showToast('Detalles copiados 💜')
      setCopyState('success')
      setTimeout(() => setCopyState('idle'), 2500)
    } catch {
      setCopyState('error')
    }
  }

  return (
    <div>
      <StepHeader title="TU DISEÑO ESTÁ LISTO" subtitle="Revisa los detalles antes de continuar con tu pedido." />

      {/* Design summary */}
      <div className="rounded-2xl border border-border bg-surface p-6">
        <dl className="flex flex-col gap-3">
          <SummaryRow label="Modelo" value="Oversized Tee" />
          <SummaryRow label="Color" value={state.color.name} swatch={state.color.hex} />
          <SummaryRow label="Talla" value={state.size ?? '—'} />
          <SummaryRow label="Bias" value={state.biasLabel ?? '—'} />
          <SummaryRow label="Foto principal" value={state.customerPhoto ? 'Agregada' : 'No agregada'} />
          <SummaryRow label="Referencia artista" value={state.artistReference ? 'Agregada' : 'No agregada'} />
          <SummaryRow label="Estilo" value={styleName} />
        </dl>
      </div>

      {/* Delivery info */}
      <div className="mt-4 rounded-2xl border border-border bg-surface/50 p-5">
        <dl className="flex flex-col gap-2 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-foreground-muted">Tiempo estimado</dt>
            <dd className="font-semibold">5–7 días aprox.</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-foreground-muted">Envíos</dt>
            <dd>Todo el Perú</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-foreground-muted">Delivery</dt>
            <dd>Se coordina aparte según destino</dd>
          </div>
        </dl>
      </div>

      {/* Photo privacy notice — shown only when images were uploaded */}
      {hasPhotos && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-border bg-surface/60 px-4 py-3">
          <span className="mt-0.5 shrink-0 text-xs text-foreground-muted" aria-hidden="true">🔒</span>
          <p className="text-xs leading-relaxed text-foreground-muted">
            Las fotos permanecen en el dispositivo y todavía no son almacenadas ni enviadas por Purple Wave.
            {waUrl && ' Cuando abras WhatsApp, adjunta las imágenes que utilizaste en tu diseño.'}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="mt-6 flex flex-col gap-3">
        {waUrl ? (
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
          >
            <WhatsAppIcon />
            Continuar por WhatsApp
          </a>
        ) : (
          <p className="rounded-xl border border-border/50 bg-surface/30 px-4 py-3 text-xs text-foreground-muted">
            El canal directo de pedidos estará disponible próximamente. Puedes copiar los detalles de tu diseño mientras tanto.
          </p>
        )}

        <button
          type="button"
          onClick={handleCopy}
          className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-light ${
            copyState === 'success'
              ? 'border-purple-light bg-purple/10 text-purple-light'
              : 'border-border text-foreground-muted hover:border-purple-light hover:text-foreground'
          }`}
        >
          {copyState === 'success' ? '¡Copiado!' : 'Copiar detalles'}
        </button>

        {copyState === 'error' && (
          <p className="text-xs text-red-400">
            No se pudo copiar al portapapeles. Copia el texto manualmente.
          </p>
        )}

        <button
          type="button"
          onClick={onEdit}
          className="self-start text-xs text-foreground-muted underline underline-offset-2 transition-colors hover:text-purple-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-light focus-visible:ring-offset-1"
        >
          Editar diseño
        </button>
      </div>

      <p className="mt-6 text-xs text-foreground-muted">
        Vista previa referencial. El diseño final puede requerir ajustes antes de producción.
      </p>
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function SummaryRow({ label, value, swatch }: { label: string; value: string; swatch?: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border/50 pb-3 text-sm last:border-0 last:pb-0">
      <dt className="text-foreground-muted">{label}</dt>
      <dd className="flex items-center gap-2 font-semibold">
        {swatch && (
          <span
            className="inline-block h-4 w-4 rounded-full border border-border"
            style={{ backgroundColor: swatch }}
            aria-hidden="true"
          />
        )}
        {value}
      </dd>
    </div>
  )
}

// ── Utility ───────────────────────────────────────────────────────────────────

function isDark(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.5
}
