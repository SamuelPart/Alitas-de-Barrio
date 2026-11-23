import { motion } from 'framer-motion'
import { Flame, Info } from 'lucide-react'
import QuantityStepper from './QuantityStepper'
import { formatPrice } from '../utils/format'

const cardVariants = {
  hidden: { opacity: 0, y: 26, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 240, damping: 26, mass: 0.7 },
  },
  exit: {
    opacity: 0,
    y: -14,
    scale: 0.97,
    transition: { duration: 0.18, ease: 'easeIn' },
  },
}

export default function ProductCard({
  product,
  qty,
  onAdd,
  onIncrement,
  onDecrement,
  index = 0,
}) {
  return (
    <motion.article
      layout
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      exit="exit"
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -60px 0px' }}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-card/85 backdrop-blur-sm shadow-card sm:rounded-3xl"
      aria-labelledby={`product-${product.id}`}
    >
      {/* Imagen: recorte sin fondo sobre spotlight */}
      <div className="relative aspect-[5/4] overflow-hidden">
        <div className="absolute inset-x-[14%] bottom-[10%] h-[22%] rounded-[50%] bg-black/60 blur-lg" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_62%,rgba(251,140,0,0.18),rgba(229,57,53,0.08)_45%,transparent_72%)]" />

        <motion.img
          src={product.cutout || product.image}
          alt={product.name}
          loading={index < 4 ? 'eager' : 'lazy'}
          decoding="async"
          className="relative z-10 h-full w-full object-contain drop-shadow-[0_18px_26px_rgba(0,0,0,0.65)]"
          fetchPriority={index < 2 ? 'high' : 'auto'}
          initial={{ opacity: 0, scale: 0.86, y: 12 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: 'spring', stiffness: 190, damping: 20, delay: Math.min(index, 3) * 0.05 }}
          whileHover={{ scale: 1.06, y: -4 }}
        />

        {/* Etiqueta destacada */}
        {product.badge && (
          <div className="absolute left-1.5 top-1.5 z-20 inline-flex max-w-[calc(100%-0.75rem)] items-center gap-1 rounded-full border border-gold/30 bg-ink/80 px-1.5 py-0.5 text-[8.5px] font-bold uppercase tracking-[0.06em] text-gold backdrop-blur sm:left-3 sm:top-3 sm:gap-1.5 sm:px-2.5 sm:py-1 sm:text-[10px] sm:tracking-[0.12em]">
            <Flame size={8} className="shrink-0 sm:hidden" />
            <Flame size={11} className="hidden shrink-0 sm:block" />
            <span className="truncate">{product.badge}</span>
          </div>
        )}

        <div className="absolute right-3 top-3 z-20 hidden rounded-full bg-ink/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-cream/55 backdrop-blur sm:block">
          Precio referencial
        </div>
      </div>

      {/* Contenido */}
      <div className="flex flex-1 flex-col p-2.5 pt-2 sm:p-4 sm:pt-1.5">
        <h3
          id={`product-${product.id}`}
          className="text-[13px] font-bold leading-snug text-cream sm:text-[15px] lg:text-base"
        >
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-cream/50 sm:mt-1.5 sm:line-clamp-3 sm:text-[12.5px]">
          {product.description}
        </p>

        <div className="mt-auto pt-2 sm:pt-3">
          <div className="flex items-baseline gap-1 text-gold">
            <span className="text-[10px] font-semibold sm:text-xs">S/</span>
            <span className="font-display text-[19px] leading-none tracking-wide sm:text-2xl">
              {formatPrice(product.price)}
            </span>
          </div>
          <p className="mt-0.5 text-[9px] uppercase tracking-[0.08em] text-cream/30 sm:hidden">
            Precio referencial
          </p>

          <div className="mt-1.5 sm:mt-2">
            <QuantityStepper
              qty={qty}
              size="sm"
              onAdd={() => onAdd(product)}
              onIncrement={() => onIncrement(product.id)}
              onDecrement={() => onDecrement(product.id)}
              label={product.name}
            />
          </div>
        </div>
      </div>

      {/* Borde de fuego al hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/0 transition-all duration-500 group-hover:ring-fire-orange/25 sm:rounded-3xl" />
    </motion.article>
  )
}

/** Estados vacíos / de carga de la carta */
export function ProductsEmpty({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-full flex flex-col items-center gap-3 rounded-3xl border border-dashed border-line bg-card/50 px-6 py-14 text-center"
    >
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-fire-red/10 text-fire-orange">
        <Info size={26} />
      </div>
      <h3 className="text-lg font-bold text-cream">No encontramos ese plato</h3>
      <p className="max-w-sm text-sm text-cream/50">
        Prueba con otra palabra: “alitas”, “pollo” o “cóctel”.
      </p>
      <motion.button
        type="button"
        onClick={onReset}
        whileTap={{ scale: 0.95 }}
        className="mt-1 rounded-full border border-line bg-card px-4 py-2 text-xs font-semibold text-cream/80 transition-colors hover:border-gold/40 hover:text-gold"
      >
        Ver toda la carta
      </motion.button>
    </motion.div>
  )
}
