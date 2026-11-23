import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Portada: plato flotante (PNG sin fondo) sobre un spotlight cálido,
 * con anillos orbitales y satélites. Parallax suave al hacer scroll.
 */
export default function HeroArt() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const dishY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const ringScale = useTransform(scrollYProgress, [0, 1], [1, 1.18])
  const satY = useTransform(scrollYProgress, [0, 1], [0, 50])

  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-square w-full max-w-[310px] sm:max-w-[400px] lg:max-w-[460px]"
      aria-hidden="true"
    >
      {/* Spotlight central */}
      <div className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(251,140,0,0.30),rgba(229,57,53,0.16)_45%,transparent_70%)] blur-2xl" />

      {/* Anillos */}
      <motion.div
        style={{ scale: ringScale }}
        className="absolute inset-[2%] rounded-full border border-line/70"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-[11%] rounded-full border border-dashed border-fire-orange/20"
      />

      {/* Sombra del plato */}
      <div className="absolute bottom-[13%] left-1/2 h-[8%] w-[64%] -translate-x-1/2 rounded-[50%] bg-black/70 blur-xl" />

      {/* Plato principal sin fondo */}
      <motion.div style={{ y: dishY }} className="absolute inset-0 grid place-items-center">
        <motion.img
          src="/img/pollo-cut.png"
          alt=""
          width="620"
          height="620"
          className="w-[92%] drop-shadow-[0_28px_50px_rgba(0,0,0,0.75)]"
          initial={{ opacity: 0, scale: 0.9, y: 24 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { duration: 0.7, delay: 0.1 },
            scale: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
            y: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
      </motion.div>

      {/* Satélites flotantes */}
      <motion.img
        src="/img/azul-cut.png"
        alt=""
        style={{ y: satY }}
        width="620"
        height="620"
        initial={{ opacity: 0, scale: 0.5, x: -14 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ type: 'spring', stiffness: 190, damping: 17, delay: 0.55 }}
        className="absolute right-[-2%] top-[2%] w-[30%] drop-shadow-[0_18px_26px_rgba(0,0,0,0.65)]"
      />
      <motion.img
        src="/img/alitas-cut.png"
        alt=""
        width="760"
        height="760"
        initial={{ opacity: 0, scale: 0.5, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 190, damping: 17, delay: 0.7 }}
        className="absolute bottom-[-2%] left-[-8%] w-[40%] drop-shadow-[0_18px_30px_rgba(0,0,0,0.7)]"
      />

      {/* Badge flotante */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.95 }}
        className="absolute left-1/2 top-[6%] -translate-x-1/2 whitespace-nowrap rounded-full border border-gold/30 bg-ink/80 px-3 py-1.5 text-[9.5px] font-bold uppercase tracking-[0.16em] text-gold backdrop-blur"
      >
        Al carbón · 100% peruano
      </motion.div>
    </div>
  )
}
