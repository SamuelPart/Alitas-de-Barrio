import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'

const tap = { scale: 0.9 }

/**
 * Selector de cantidad con microinteracciones táctiles.
 * Ocupa todo el ancho disponible para verse bien en tarjetas de 2 columnas.
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
      ? { btn: 'h-8 w-8', icon: 14 }
      : { btn: 'h-8 w-8 sm:h-9 sm:w-9', icon: 15 }

  if (qty === 0) {
    return (
      <motion.button
        type="button"
        onClick={onAdd}
        whileTap={tap}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 500, damping: 22 }}
        className="flex h-10 w-full items-center justify-center gap-1.5 rounded-xl bg-fire text-[11.5px] font-bold uppercase tracking-wide text-white shadow-fire sm:text-xs"
        aria-label={`Agregar ${label} al pedido`}
      >
        <Plus size={dims.icon + 1} strokeWidth={3} />
        Agregar
      </motion.button>
    )
  }

  return (
    <div className="flex h-10 w-full items-center justify-between gap-1 rounded-xl border border-line bg-ink-soft/80 p-1">
      <motion.button
        type="button"
        onClick={onDecrement}
        whileTap={tap}
        className={`grid ${dims.btn} shrink-0 place-items-center rounded-lg bg-card text-cream/80 transition-colors hover:text-fire-red`}
        aria-label={`Quitar uno de ${label}`}
      >
        <Minus size={dims.icon} strokeWidth={3} />
      </motion.button>

      <div className="relative grid min-w-5 flex-1 place-items-center text-sm font-bold text-cream">
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
        className={`grid ${dims.btn} shrink-0 place-items-center rounded-lg bg-fire text-white`}
        aria-label={`Agregar uno más de ${label}`}
      >
        <Plus size={dims.icon} strokeWidth={3} />
      </motion.button>
    </div>
  )
}
