import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Flame, Plus, Sparkles, ShoppingBag, RotateCcw } from 'lucide-react'
import { baseOptions, sideOptions, drinkOptions, builderNote } from '../data/builder'
import { formatPrice } from '../utils/format'

const steps = [
  { key: 'base', label: 'Base', options: baseOptions },
  { key: 'side', label: 'Acompañamiento', options: sideOptions },
  { key: 'drink', label: 'Cóctel', options: drinkOptions },
]

/**
 * "Arma tu Combo": selector tipo ingredient-stack.
 * Cada capa entra desde abajo/arriba y el plato se recompone en vivo.
 */
export default function ComboBuilder({ onAddCombo }) {
  const [base, setBase] = useState(baseOptions[0])
  const [side, setSide] = useState(sideOptions[0])
  const [drink, setDrink] = useState(drinkOptions[2])
  const [step, setStep] = useState('base')
  const [added, setAdded] = useState(false)

  const total = useMemo(
    () => base.price + side.price + drink.price,
    [base.price, side.price, drink.price],
  )

  const layers = useMemo(() => {
    const list = []
    if (drink.id !== 'sin-drink') {
      list.push({ key: 'drink', image: drink.image, y: -46, rotate: -5, scale: 0.74, blur: false })
    }
    list.push({ key: 'side', image: side.image, y: 4, rotate: 3, scale: 0.95, blur: false })
    list.push({ key: 'base', image: base.image, y: 46, rotate: -2, scale: 1.06, blur: false })
    return list
  }, [base, side, drink])

  const handleAdd = () => {
    const parts = [base.name, side.name]
    if (drink.id !== 'sin-drink') parts.push(drink.name)
    onAddCombo({
      id: `combo-${base.id}-${side.id}-${drink.id}`,
      name: `Combo personalizado: ${parts.join(' + ')}`,
      price: total,
      image: base.image,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  const reset = () => {
    setBase(baseOptions[0])
    setSide(sideOptions[0])
    setDrink(drinkOptions[2])
    setStep('base')
  }

  const current = steps.find((s) => s.key === step)

  return (
    <section
      id="arma-tu-combo"
      className="relative mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-12 sm:px-6 sm:py-16"
    >
      <div className="mb-6 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-fire-orange"
        >
          <Sparkles size={13} /> Hecho a tu medida
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="font-display mt-2 text-3xl leading-none tracking-wide text-cream sm:text-4xl"
        >
          ARMA TU <span className="text-fire">COMBO</span>
        </motion.h2>
        <p className="mt-2 max-w-md text-[12.5px] leading-relaxed text-cream/45">
          Elige base, acompañamiento y cóctel. Tu combo se arma al instante.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
        {/* ------------------------------ Composición ----------------------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-3xl border border-line bg-[radial-gradient(75%_65%_at_50%_18%,rgba(229,57,53,0.20),transparent_70%)] p-4 sm:min-h-[380px]"
        >
          <div className="pointer-events-none absolute inset-x-6 bottom-14 h-24 rounded-[50%] bg-black/60 blur-2xl" />

          {/* Pila de capas */}
          <div className="relative h-[240px] w-full max-w-[300px] sm:h-[290px]">
            <AnimatePresence mode="popLayout">
              {layers.map((layer, index) => (
                <motion.div
                  key={`${layer.key}-${layer.image}`}
                  layout
                  initial={{ opacity: 0, y: layer.y + 34, scale: layer.scale * 0.86, rotate: layer.rotate * 2 }}
                  animate={{ opacity: 1, y: layer.y, scale: layer.scale, rotate: layer.rotate }}
                  exit={{ opacity: 0, y: layer.y - 30, scale: layer.scale * 0.9 }}
                  transition={{ type: 'spring', stiffness: 240, damping: 26, delay: index * 0.04 }}
                  className="absolute left-1/2 top-1/2 -ml-[42%] w-[84%] overflow-hidden rounded-[28%] shadow-[0_22px_45px_-18px_rgba(0,0,0,0.95)]"
                  style={{ zIndex: 10 + index }}
                >
                  <img
                    src={layer.image}
                    alt=""
                    aria-hidden="true"
                    className="aspect-square w-full object-cover"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-[28%] ring-1 ring-inset ring-white/15" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Etiqueta flotante del total */}
          <motion.div
            key={total}
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 380, damping: 24 }}
            className="absolute bottom-3 left-3 rounded-2xl border border-gold/30 bg-ink/80 px-3.5 py-2 backdrop-blur"
          >
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-cream/40">
              Tu combo
            </p>
            <p className="flex items-baseline gap-1 text-gold">
              <span className="text-[10px] font-semibold">S/</span>
              <span className="font-display text-xl leading-none">{formatPrice(total)}</span>
            </p>
          </motion.div>

          <button
            type="button"
            onClick={reset}
            className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-line bg-ink/70 px-3 py-1.5 text-[10px] font-semibold text-cream/50 backdrop-blur transition-colors hover:text-cream"
          >
            <RotateCcw size={11} /> Reiniciar
          </button>
        </motion.div>

        {/* -------------------------------- Controles ------------------------------ */}
        <div className="flex flex-col rounded-3xl border border-line bg-card/70 p-4 sm:p-5">
          {/* Pasos */}
          <div className="mb-4 flex gap-1.5">
            {steps.map((s, i) => {
              const active = step === s.key
              return (
                <motion.button
                  key={s.key}
                  type="button"
                  onClick={() => setStep(s.key)}
                  whileTap={{ scale: 0.96 }}
                  className={`relative flex-1 rounded-xl px-2 py-2 text-[10.5px] font-bold uppercase tracking-wide transition-colors ${
                    active ? 'text-white' : 'text-cream/40 hover:text-cream/70'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="builderStep"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      className="absolute inset-0 rounded-xl bg-fire"
                    />
                  )}
                  <span className="relative">
                    {i + 1}. {s.label}
                  </span>
                </motion.button>
              )
            })}
          </div>

          {/* Opciones del paso */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.key}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.22 }}
              className="grid flex-1 gap-2"
            >
              {current.options.map((option) => {
                const selected =
                  (current.key === 'base' && base.id === option.id) ||
                  (current.key === 'side' && side.id === option.id) ||
                  (current.key === 'drink' && drink.id === option.id)

                return (
                  <motion.button
                    key={option.id}
                    type="button"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (current.key === 'base') setBase(option)
                      if (current.key === 'side') setSide(option)
                      if (current.key === 'drink') setDrink(option)
                      const nextIndex = steps.findIndex((s) => s.key === current.key) + 1
                      if (nextIndex < steps.length) {
                        setTimeout(() => setStep(steps[nextIndex].key), 160)
                      }
                    }}
                    className={`flex items-center gap-3 rounded-2xl border p-2 text-left transition-colors ${
                      selected
                        ? 'border-fire-orange/60 bg-fire-red/10'
                        : 'border-line bg-ink-soft/50 hover:border-line/80 hover:bg-ink-soft'
                    }`}
                  >
                    <img
                      src={option.image}
                      alt=""
                      aria-hidden="true"
                      className="h-12 w-12 shrink-0 rounded-xl object-cover"
                      loading="lazy"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-semibold text-cream">
                        {option.name}
                      </span>
                      <span className="block truncate text-[10.5px] text-cream/40">
                        {option.desc}
                      </span>
                    </span>
                    <span className="shrink-0 text-right">
                      <span className="block text-[12.5px] font-bold text-gold">
                        {option.price > 0 ? `+ S/ ${formatPrice(option.price)}` : 'Gratis'}
                      </span>
                    </span>
                    <span
                      className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border ${
                        selected
                          ? 'border-fire bg-fire text-white'
                          : 'border-line text-transparent'
                      }`}
                    >
                      <Check size={13} strokeWidth={3.5} />
                    </span>
                  </motion.button>
                )
              })}
            </motion.div>
          </AnimatePresence>

          <p className="mt-3 text-[10px] leading-relaxed text-cream/25">{builderNote}</p>

          <motion.button
            type="button"
            onClick={handleAdd}
            whileTap={{ scale: 0.97 }}
            whileHover={{ y: -1 }}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-fire px-4 py-3.5 text-[12.5px] font-extrabold uppercase tracking-wide text-white shadow-fire"
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
                  <Check size={16} strokeWidth={3} /> ¡Combo agregado!
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="flex items-center gap-2"
                >
                  <ShoppingBag size={16} /> Agregar combo · S/ {formatPrice(total)}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </section>
  )
}
