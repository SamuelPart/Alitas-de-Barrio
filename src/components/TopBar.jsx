import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { Phone, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { business } from '../data/business'

/**
 * Barra superior fija: logo, teléfono y acceso al pedido.
 * Se vuelve sólida al hacer scroll.
 */
export default function TopBar({ cartCount, onOpenCart }) {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const logoScale = useTransform(scrollY, [0, 220], [1, 0.82])

  useMotionValueEvent(scrollY, 'change', (value) => setScrolled(value > 24))

  return (
    <motion.div
      animate={{
        backgroundColor: scrolled ? 'rgba(10,10,10,0.92)' : 'rgba(10,10,10,0.35)',
        borderColor: scrolled ? 'rgba(42,42,42,0.9)' : 'rgba(42,42,42,0.25)',
      }}
      transition={{ duration: 0.3 }}
      className="fixed inset-x-0 top-0 z-40 border-b backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:px-6">
        <motion.a
          href="#top"
          style={{ scale: logoScale }}
          className="flex origin-left shrink-0 items-center gap-2.5"
          aria-label="Alitas Barrio, ir al inicio"
        >
          <img
            src="/img/logo.png"
            alt="Logo Alitas Barrio"
            className="h-11 w-auto drop-shadow-[0_4px_14px_rgba(229,57,53,0.5)]"
            width="48"
            height="55"
          />
          <span className="hidden leading-none sm:block">
            <span className="font-display block text-lg tracking-wide text-cream">
              ALITAS <span className="text-fire">BARRIO</span>
            </span>
            <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.22em] text-cream/45">
              Un sabor diferente
            </span>
          </span>
        </motion.a>

        <div className="ml-auto flex items-center gap-2">
          <a
            href={`https://wa.me/${business.phoneRaw}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full border border-line bg-card/70 px-3.5 py-2 text-xs font-semibold text-cream/80 transition-colors hover:border-gold/40 hover:text-gold md:inline-flex"
          >
            <Phone size={14} className="text-gold" />
            {business.phoneDisplay}
          </a>
          <motion.button
            type="button"
            onClick={onOpenCart}
            whileTap={{ scale: 0.94 }}
            whileHover={{ y: -1 }}
            className="relative inline-flex items-center gap-2 rounded-full bg-fire px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-white shadow-fire"
            aria-label={`Ver pedido, ${cartCount} productos`}
          >
            <ShoppingBag size={16} />
            <span className="hidden sm:inline">Mi pedido</span>
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 24 }}
                  className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[10px] font-extrabold text-ink shadow"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
