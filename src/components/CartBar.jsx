import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, ShoppingBag } from 'lucide-react'
import { formatPrice } from '../utils/format'

/**
 * Barra flotante inferior con blur: contador, total y acceso al pedido.
 */
export default function CartBar({ count, total, onOpen, hidden = false }) {
  return (
    <AnimatePresence>
      {count > 0 && !hidden && (
        <motion.div
          initial={{ y: 110, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 110, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          className="safe-bottom fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-5 sm:pb-5"
        >
          <motion.button
            type="button"
            onClick={onOpen}
            whileTap={{ scale: 0.985 }}
            whileHover={{ y: -2 }}
            className="mx-auto flex w-full max-w-3xl items-center gap-3 rounded-2xl border border-line/80 bg-ink/85 p-2 pl-3.5 backdrop-blur-2xl shadow-[0_-10px_40px_-12px_rgba(0,0,0,0.9)] sm:p-2.5 sm:pl-5"
            aria-label="Ver pedido"
          >
            <div className="relative shrink-0">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-fire-red/25 to-fire-orange/20 text-fire-orange">
                <ShoppingBag size={19} />
              </div>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={count}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 24 }}
                  className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[10px] font-extrabold text-ink"
                >
                  {count}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="min-w-0 flex-1 text-left">
              <p className="truncate text-[11px] font-medium uppercase tracking-[0.14em] text-cream/40">
                {count} {count === 1 ? 'producto' : 'productos'}
              </p>
              <p className="flex items-baseline gap-1 text-gold">
                <span className="text-xs font-semibold">S/</span>
                <span className="font-display text-xl leading-none tracking-wide">
                  {formatPrice(total)}
                </span>
              </p>
            </div>

            <span className="flex shrink-0 items-center gap-1.5 rounded-xl bg-fire px-4 py-3 text-[13px] font-bold uppercase tracking-wide text-white shadow-fire">
              Ver Pedido
              <ChevronRight size={16} />
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
