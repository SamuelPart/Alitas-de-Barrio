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
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-card/85 backdrop-blur-sm shadow-card"
      aria-labelledby={`product-${product.id}`}
    >
      {/* Imagen */}
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-soft">
        <motion.img
          src={product.image}
          alt={product.name}
          loading={index < 2 ? 'eager' : 'lazy'}
          decoding="async"
          className="h-full w-full object-cover"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.06 }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />

        {/* Etiqueta de categoría destacada */}
        {product.badge && (
          <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-ink/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-gold backdrop-blur">
            <Flame size={11} />
            {product.badge}
          </div>
        )}

        <div className="absolute right-3 top-3 rounded-full bg-ink/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-cream/55 backdrop-blur">
          Precio referencial
        </div>
      </div>

      {/* Contenido */}
      <div className="flex flex-1 flex-col gap-3 p-4 pt-1.5">
        <div>
          <h3
            id={`product-${product.id}`}
            className="text-[15px] font-bold leading-snug text-cream sm:text-base"
          >
            {product.name}
          </h3>
          <p className="mt-1.5 line-clamp-3 text-[12.5px] leading-relaxed text-cream/50">
            {product.description}
          </p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-1">
          <div>
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-cream/35">
              Precio
            </span>
            <div className="flex items-baseline gap-1 text-gold">
              <span className="text-xs font-semibold">S/</span>
              <span className="font-display text-2xl leading-none tracking-wide">
                {formatPrice(product.price)}
              </span>
            </div>
          </div>

          <QuantityStepper
            qty={qty}
            onAdd={() => onAdd(product)}
            onIncrement={() => onIncrement(product.id)}
            onDecrement={() => onDecrement(product.id)}
            label={product.name}
          />
        </div>
      </div>

      {/* Borde de fuego al hover */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/0 transition-all duration-500 group-hover:ring-fire-orange/25" />
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
