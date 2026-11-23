import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'

const tap = { scale: 0.9 }

/**
 * Selector de cantidad con microinteracciones táctiles.
 * `variant="solid"` para el botón de agregar dentro de la tarjeta.
 */
export default function QuantityStepper({
  qty = 0,
  onIncrement,
  onDecrement,
  onAdd,
  size = 'md',
  label = 'producto',
}) {
  const dims =
    size === 'sm'
      ? { btn: 'h-8 w-8', icon: 14, text: 'w-6 text-sm' }
      : { btn: 'h-10 w-10', icon: 17, text: 'w-8 text-base' }

  if (qty === 0) {
    return (
      <motion.button
        type="button"
        onClick={onAdd}
        whileTap={tap}
        whileHover={{ scale: 1.04 }}
        transition={{ type: 'spring', stiffness: 500, damping: 22 }}
        className={`group inline-flex ${dims.btn} shrink-0 items-center justify-center rounded-xl bg-fire text-white shadow-fire`}
        aria-label={`Agregar ${label} al pedido`}
      >
        <Plus size={dims.icon + 3} strokeWidth={2.75} />
      </motion.button>
    )
  }

  return (
    <div className="flex shrink-0 items-center gap-1 rounded-xl border border-line bg-ink-soft/80 p-1">
      <motion.button
        type="button"
        onClick={onDecrement}
        whileTap={tap}
        className={`grid ${dims.btn} place-items-center rounded-lg bg-card text-cream/80 transition-colors hover:text-fire-red`}
        aria-label={`Quitar uno de ${label}`}
      >
        <Minus size={dims.icon} strokeWidth={2.75} />
      </motion.button>

      <div className={`relative grid ${dims.text} place-items-center font-bold text-cream`}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={qty}
            initial={{ y: 10, opacity: 0, scale: 0.7 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -10, opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.16 }}
          >
            {qty}
          </motion.span>
        </AnimatePresence>
      </div>

      <motion.button
        type="button"
        onClick={onIncrement}
        whileTap={tap}
        className={`grid ${dims.btn} place-items-center rounded-lg bg-fire text-white`}
        aria-label={`Agregar uno más de ${label}`}
      >
        <Plus size={dims.icon} strokeWidth={2.75} />
      </motion.button>
    </div>
  )
}
