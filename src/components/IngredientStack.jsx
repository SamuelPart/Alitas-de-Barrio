import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Composición tipo "ingredient stack": un plato central con capas
 * satélite que se ensamblan al cargar y orbitan suavemente.
 * Se mueve con parallax al hacer scroll.
 */
const satellites = [
  {
    id: 'alitas',
    image: '/img/promo-alitas.jpg',
    label: 'Alitas glaseadas',
    angle: -125,
    distance: 43,
    size: 'w-[82px] sm:w-[96px]',
    delay: 0.35,
  },
  {
    id: 'papas',
    image: '/img/alitas-chaufa.jpg',
    label: 'Papas crocantes',
    angle: 118,
    distance: 45,
    size: 'w-[78px] sm:w-[92px]',
    delay: 0.5,
  },
  {
    id: 'coctel',
    image: '/img/coctel-azul.jpg',
    label: 'Laguna Azul',
    angle: 8,
    distance: 48,
    size: 'w-[74px] sm:w-[88px]',
    delay: 0.65,
  },
]

export default function IngredientStack() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const parallaxSlow = useTransform(scrollYProgress, [0, 1], [26, -46])
  const parallaxFast = useTransform(scrollYProgress, [0, 1], [-34, 52])
  const rotateRing = useTransform(scrollYProgress, [0, 1], [-10, 12])

  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-[360px]"
      aria-hidden="true"
    >
      {/* Halo de fuego */}
      <div className="absolute inset-8 rounded-full bg-fire-red/25 blur-3xl" />
      <div className="absolute inset-16 rounded-full bg-gold/10 blur-2xl" />

      {/* Anillo punteado giratorio */}
      <motion.div
        style={{ rotate: rotateRing }}
        className="absolute inset-2 rounded-full border border-dashed border-line/80"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-6 rounded-full border border-fire-orange/15"
      />

      {/* Plato central */}
      <motion.div
        style={{ y: parallaxSlow }}
        initial={{ opacity: 0, scale: 0.82, rotate: -4 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="absolute inset-[16%] overflow-hidden rounded-full border border-white/15 shadow-[0_30px_70px_-25px_rgba(0,0,0,0.95)]"
      >
        <img
          src="/img/pollo-brasa.jpg"
          alt="Pollo a la brasa de Alitas Barrio"
          className="h-full w-full object-cover"
          width="320"
          height="320"
        />
        <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/5" />
      </motion.div>

      {/* Satélites */}
      {satellites.map((sat) => {
        const rad = (sat.angle * Math.PI) / 180
        const x = 50 + Math.cos(rad) * sat.distance
        const y = 50 + Math.sin(rad) * sat.distance
        return (
          <motion.div
            key={sat.id}
            style={{
              left: `${x}%`,
              top: `${y}%`,
              y: sat.angle > 0 ? parallaxFast : parallaxSlow,
            }}
            initial={{ opacity: 0, scale: 0.4, x: '-50%', y: '-50%' }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 18,
              delay: sat.delay,
            }}
            className="absolute"
          >
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{
                duration: 4.5 + (sat.delay % 1) * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: sat.delay,
              }}
              className={`relative ${sat.size} overflow-hidden rounded-2xl border border-white/15 bg-card shadow-[0_16px_30px_-12px_rgba(0,0,0,0.9)]`}
            >
              <img
                src={sat.image}
                alt={sat.label}
                className="aspect-square h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
            </motion.div>
          </motion.div>
        )
      })}

      {/* Etiqueta inferior */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-line bg-ink/85 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-cream/60 backdrop-blur"
      >
        Al carbón · 100% peruano
      </motion.div>
    </div>
  )
}
