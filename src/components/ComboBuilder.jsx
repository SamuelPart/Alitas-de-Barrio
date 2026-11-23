import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Check,
  Drumstick,
  Martini,
  Plus,
  RotateCcw,
  ShoppingBag,
  Sparkles,
  UtensilsCrossed,
} from 'lucide-react'
import { baseOptions, sideOptions, drinkOptions, builderNote } from '../data/builder'
import { formatPrice } from '../utils/format'

const steps = [
  { key: 'base', label: 'Base', Icon: Drumstick, options: baseOptions },
  { key: 'side', label: 'Acompaña', Icon: UtensilsCrossed, options: sideOptions },
  { key: 'drink', label: 'Cóctel', Icon: Martini, options: drinkOptions },
]

/**
 * "Arma tu combo" — tarjeta de construcción:
 * el bloque central se descompone en ingredientes (base / acompañamiento / cóctel)
 * con animación spring y los chips resumen la elección.
 */
export default function ComboBuilder({ onAddCombo }) {
  const [selection, setSelection] = useState({
    base: baseOptions[0],
    side: sideOptions[0],
    drink: drinkOptions[2],
  })
  const [step, setStep] = useState('base')
  const [added, setAdded] = useState(false)

  const total = useMemo(
    () =>
      selection.base.price +
      selection.side.price +
      selection.drink.price,
    [selection],
  )

  const chosen = useMemo(
    () => [selection.base, selection.side, selection.drink].filter((o) => o.price > 0 || o.id !== 'sin-drink'),
    [selection],
  )

  const pick = (key, option) => {
    setSelection((current) => ({ ...current, [key]: option }))
    const i = steps.findIndex((s) => s.key === key)
    if (i < steps.length - 1) setTimeout(() => setStep(steps[i + 1].key), 180)
  }

  const handleAdd = () => {
    const parts = [selection.base.name, selection.side.name]
    if (selection.drink.id !== 'sin-drink') parts.push(selection.drink.name)
    onAddCombo({
      id: `combo-${selection.base.id}-${selection.side.id}-${selection.drink.id}`,
      name: `Combo a tu medida: ${parts.join(' + ')}`,
      price: total,
      image: '/img/pollo-cut.png',
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  const activeIndex = steps.findIndex((s) => s.key === step)

  return (
    <section
      id="arma-tu-combo"
      className="relative mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-12 sm:px-6 sm:py-16"
    >
      <div className="mb-6 text-center">
        <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-fire-orange">
          <Sparkles size={13} /> Hecho a tu medida
        </p>
        <h2 className="font-display mt-2 text-3xl leading-none tracking-wide text-cream sm:text-4xl">
          ARMA TU <span className="text-fire">COMBO</span>
        </h2>
        <p className="mx-auto mt-2 max-w-md text-[12.5px] leading-relaxed text-cream/45">
          Arma tu plato en tres toques. El precio se ajusta solo.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-3xl border border-line bg-card/70"
      >
        {/* Cabecera del combo */}
        <div className="relative flex flex-wrap items-center gap-3 border-b border-line/70 px-4 py-3.5 sm:px-5">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_140%_at_0%_0%,rgba(229,57,53,0.16),transparent_60%)]" />
          <div className="relative flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-fire text-white">
              <Sparkles size={15} />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-cream/85">
                Tu combo
              </p>
              <p className="text-[10px] text-cream/40">
                {chosen.length} ingrediente{chosen.length === 1 ? '' : 's'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setSelection({ base: baseOptions[0], side: sideOptions[0], drink: drinkOptions[2] })
              setStep('base')
            }}
            className="relative ml-auto inline-flex items-center gap-1.5 rounded-full border border-line bg-ink/60 px-3 py-1.5 text-[10px] font-semibold text-cream/50 transition-colors hover:text-cream"
          >
            <RotateCcw size={11} /> Reiniciar
          </button>
        </div>

        <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[0.92fr_1.08fr]">
          {/* ---------- Plato que se descompone ---------- */}
          <div className="relative flex flex-col items-center justify-center rounded-2xl border border-line/60 bg-[radial-gradient(70%_60%_at_50%_38%,rgba(251,140,0,0.14),transparent_70%)] p-4">
            <div className="relative h-[168px] w-full max-w-[220px] sm:h-[200px]">
              {/* Plato */}
              <motion.div
                aria-hidden="true"
                animate={{ rotate: [0, 2.5, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-0 left-1/2 h-8 w-[86%] -translate-x-1/2 rounded-[50%] border border-white/10 bg-gradient-to-b from-[#2a2a2a] to-[#141414] shadow-[0_10px_24px_rgba(0,0,0,0.8)]"
              />

              {/* Base (protagonista) */}
              <motion.div
                key={`base-${selection.base.id}`}
                initial={{ opacity: 0, y: 26, scale: 0.86 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="absolute inset-x-0 bottom-3 z-20 grid place-items-center"
              >
                <motion.img
                  src={selection.base.id === 'pollo' ? '/img/pollo-cut.png' : '/img/alitas-cut.png'}
                  alt={selection.base.name}
                  className="w-[72%] drop-shadow-[0_18px_28px_rgba(0,0,0,0.75)]"
                  whileHover={{ scale: 1.04 }}
                />
              </motion.div>

              {/* Acompañamiento: entra desde la derecha */}
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={`side-${selection.side.id}`}
                  initial={{ opacity: 0, x: 34, y: 12, rotate: 12, scale: 0.7 }}
                  animate={{ opacity: 1, x: 0, y: 0, rotate: -8, scale: 1 }}
                  exit={{ opacity: 0, x: 40, scale: 0.7 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 20, delay: 0.06 }}
                  className="absolute bottom-4 left-0 z-30 w-[38%]"
                >
                  <img
                    src={selection.side.id === 'makis' ? '/img/alitas-cut-sm.png' : '/img/chaufa-cut-sm.png'}
                    alt={selection.side.name}
                    className="drop-shadow-[0_12px_18px_rgba(0,0,0,0.7)]"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Cóctel: entra desde arriba a la derecha */}
              <AnimatePresence mode="popLayout">
                {selection.drink.id !== 'sin-drink' && (
                  <motion.div
                    key={`drink-${selection.drink.id}`}
                    initial={{ opacity: 0, y: -30, rotate: 10, scale: 0.6 }}
                    animate={{ opacity: 1, y: 0, rotate: 8, scale: 1 }}
                    exit={{ opacity: 0, y: -24, scale: 0.6 }}
                    transition={{ type: 'spring', stiffness: 240, damping: 19 }}
                    className="absolute -top-1 right-0 z-30 w-[30%]"
                  >
                    <img
                      src={selection.drink.id === 'laguna' ? '/img/azul-cut.png' : '/img/colada-cut-sm.png'}
                      alt={selection.drink.name}
                      className="drop-shadow-[0_14px_20px_rgba(0,0,0,0.7)]"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Chips de lo elegido */}
            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              <AnimatePresence mode="popLayout">
                {chosen.map((item) => (
                  <motion.span
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="inline-flex items-center gap-1 rounded-full border border-line bg-ink/70 px-2.5 py-1 text-[10px] font-medium text-cream/70"
                  >
                    <Check size={10} className="text-emerald-400" />
                    {item.name}
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* ---------- Selector ---------- */}
          <div className="flex flex-col">
            {/* Progreso por pasos */}
            <div className="mb-3 flex items-center gap-1.5">
              {steps.map((s, index) => {
                const active = step === s.key
                const done = index < activeIndex
                return (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setStep(s.key)}
                    className={`group flex flex-1 flex-col gap-1.5 rounded-xl border px-2.5 py-2 text-left transition-colors ${
                      active
                        ? 'border-fire-orange/50 bg-fire-red/10'
                        : 'border-line bg-ink-soft/40 hover:border-line/80'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <s.Icon
                        size={12}
                        className={active ? 'text-fire-orange' : done ? 'text-emerald-400' : 'text-cream/35'}
                      />
                      <span
                        className={`text-[10px] font-bold uppercase tracking-[0.1em] ${
                          active ? 'text-cream' : 'text-cream/40'
                        }`}
                      >
                        {s.label}
                      </span>
                    </span>
                    <span className="h-0.5 w-full overflow-hidden rounded-full bg-line/80">
                      <motion.span
                        initial={false}
                        animate={{ scaleX: active || done ? 1 : 0 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className={`block h-full origin-left rounded-full ${
                          active ? 'bg-fire' : 'bg-emerald-400/70'
                        }`}
                      />
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Opciones */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="grid gap-2"
              >
                {steps
                  .find((s) => s.key === step)
                  .options.map((option) => {
                    const selected = selection[step]?.id === option.id
                    return (
                      <motion.button
                        key={option.id}
                        type="button"
                        whileTap={{ scale: 0.985 }}
                        onClick={() => pick(step, option)}
                        className={`flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition-colors ${
                          selected
                            ? 'border-fire-orange/55 bg-fire-red/10'
                            : 'border-line bg-ink-soft/40 hover:border-line/80'
                        }`}
                      >
                        <span
                          className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                            selected
                              ? 'border-fire bg-fire text-white'
                              : 'border-line text-transparent'
                          }`}
                        >
                          <Check size={11} strokeWidth={4} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[12.5px] font-semibold text-cream">
                            {option.name}
                          </span>
                          <span className="block truncate text-[10px] text-cream/40">
                            {option.desc}
                          </span>
                        </span>
                        <span className="shrink-0 text-[11.5px] font-bold text-gold">
                          {option.price > 0 ? `+ S/ ${formatPrice(option.price)}` : 'Gratis'}
                        </span>
                      </motion.button>
                    )
                  })}
              </motion.div>
            </AnimatePresence>

            <p className="mt-3 text-[9.5px] leading-relaxed text-cream/25">{builderNote}</p>

            {/* Total + acción */}
            <div className="mt-auto flex items-center gap-2.5 pt-3">
              <div className="shrink-0">
                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-cream/35">
                  Total
                </p>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.p
                    key={total}
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -8, opacity: 0 }}
                    className="flex items-baseline gap-1 text-gold"
                  >
                    <span className="text-[10px] font-semibold">S/</span>
                    <span className="font-display text-2xl leading-none tracking-wide">
                      {formatPrice(total)}
                    </span>
                  </motion.p>
                </AnimatePresence>
              </div>

              <motion.button
                type="button"
                onClick={handleAdd}
                whileTap={{ scale: 0.97 }}
                whileHover={{ y: -1 }}
                className="ml-auto inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-fire px-4 py-3 text-[11.5px] font-extrabold uppercase tracking-wide text-white shadow-fire sm:text-xs"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {added ? (
                    <motion.span
                      key="ok"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="flex items-center gap-2"
                    >
                      <Check size={15} strokeWidth={3} /> ¡Agregado!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="flex items-center gap-2"
                    >
                      <ShoppingBag size={15} /> Agregar al pedido
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
