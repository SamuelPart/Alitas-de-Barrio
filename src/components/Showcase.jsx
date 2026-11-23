import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Flame } from 'lucide-react'
import { business, whatsappUrl } from '../data/business'

const tiles = [
  {
    id: 'pollo',
    image: '/img/pollo-cut.png',
    cutout: true,
    title: 'Pollo a la brasa',
    text: 'Cocción perfecta al carbón',
    className: 'col-span-2 row-span-2 sm:col-span-2 sm:row-span-2',
    scale: 1.06,
  },
  {
    id: 'alitas',
    image: '/img/alitas-cut.png',
    cutout: true,
    title: 'Alitas glaseadas',
    text: 'Marinado con especias secretas',
    className: 'col-span-1 row-span-1',
  },
  {
    id: 'coctel',
    image: '/img/azul-cut.png',
    cutout: true,
    title: 'Cócteles',
    text: 'Frescos y frutales',
    className: 'col-span-1 row-span-1',
  },
]

/**
 * Mosaico editorial con parallax sutil: cada imagen se mueve
 * a distinta velocidad al hacer scroll.
 */
export default function Showcase() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const yBig = useTransform(scrollYProgress, [0, 1], ['-4%', '6%'])
  const ySmall = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])

  return (
    <section
      ref={ref}
      className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16"
      aria-label="Nuestros platos"
    >
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-fire-orange">
            <Flame size={12} /> Sabor que te hace volver
          </p>
          <h2 className="font-display mt-2 text-3xl leading-none tracking-wide text-cream sm:text-4xl">
            DIRECTO DEL <span className="text-fire">CARBÓN</span>
          </h2>
        </motion.div>

        <motion.a
          href={whatsappUrl('¡Hola Alitas Barrio! 👋 Quisiera pedir para delivery.')}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-card/70 px-4 py-2.5 text-[12px] font-semibold text-cream/80 backdrop-blur transition-colors hover:border-gold/40 hover:text-gold"
        >
          Pedir al {business.phoneDisplay}
          <ArrowUpRight size={14} />
        </motion.a>
      </div>

      <div className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] sm:gap-4 lg:grid-cols-4">
        {tiles.map((tile, index) => (
          <motion.figure
            key={tile.id}
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.7,
              delay: index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`group relative overflow-hidden rounded-2xl border border-line bg-card sm:rounded-3xl ${tile.className}`}
          >
            <motion.img
              src={tile.image}
              alt={tile.title}
              loading="lazy"
              style={{ y: index === 0 ? yBig : ySmall, scale: tile.scale ?? 1.05 }}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent opacity-90" />
            <figcaption className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
              <p className="font-display text-base leading-none tracking-wide text-cream sm:text-xl">
                {tile.title}
              </p>
              <p className="mt-1 text-[10px] text-cream/50 sm:text-[11.5px]">{tile.text}</p>
            </figcaption>
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/0 transition-all duration-500 group-hover:ring-fire-orange/30 sm:rounded-3xl" />
          </motion.figure>
        ))}
      </div>
    </section>
  )
}
