import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bike, Clock, MapPin, Search, Sparkles, X } from 'lucide-react'
import { business, isOpenNow } from '../data/business'
import Embers from './Embers'
import HeroArt from './HeroArt'

export default function Hero({ query, setQuery }) {
  const [open, setOpen] = useState(() => isOpenNow())
  const [searchActive, setSearchActive] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    const check = () => setOpen(isOpenNow())
    const interval = setInterval(check, 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const submitSearch = (event) => {
    event.preventDefault()
    inputRef.current?.blur()
    document
      .getElementById('carta')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="relative">
      {/* Fondo: foto del pollo a la brasa + degradados de brasa */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/img/hero-bg.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full scale-105 object-cover object-[62%_38%] opacity-45"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/70 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_15%_0%,rgba(229,57,53,0.32),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_90%_10%,rgba(251,140,0,0.22),transparent_65%)]" />
      </div>
      <Embers count={16} />

      {/* Contenido hero compacto */}
      <div
        id="top"
        className="relative mx-auto w-full max-w-6xl scroll-mt-20 px-4 pb-14 pt-24 sm:px-6 sm:pb-20 sm:pt-28"
      >
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
          }}
          className="grid items-center gap-7 md:grid-cols-[1fr_0.95fr] md:gap-10"
        >
          <div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold"
            >
              <Sparkles size={13} />
              Carta digital · Alto Trujillo
            </motion.div>

            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className="font-display mt-4 text-[2.6rem] leading-[0.94] tracking-tight text-cream sm:text-6xl lg:text-[4.2rem]"
            >
              EL SABOR QUE
              <br />
              <span className="text-fire">TE HACE VOLVER</span>
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className="mt-4 max-w-md text-sm leading-relaxed text-cream/65 sm:text-base"
            >
              Alitas, pollo a la brasa al carbón y cócteles de barrio.{' '}
              <span className="text-cream/90">{business.slogan}.</span>
            </motion.p>

            {/* Badges de horario y dirección */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              className="mt-6 flex flex-wrap items-center gap-2.5"
            >
              <motion.div
                role="status"
                aria-live="polite"
                animate={{
                  boxShadow: [
                    '0 0 0 0 rgba(253,216,53,0.0)',
                    '0 0 0 4px rgba(229,57,53,0.16)',
                    '0 0 0 0 rgba(253,216,53,0.0)',
                  ],
                }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-card/80 px-3.5 py-2 text-xs font-semibold text-cream/85 backdrop-blur"
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className={`absolute inline-flex h-full w-full rounded-full ${
                      open ? 'animate-ping bg-emerald-400/70' : 'bg-cream/40'
                    }`}
                  />
                  <span
                    className={`relative inline-flex h-2 w-2 rounded-full ${
                      open ? 'bg-emerald-400' : 'bg-cream/40'
                    }`}
                  />
                </span>
                <Bike size={14} className="text-fire-orange" />
                <span>Delivery: {business.schedule}</span>
              </motion.div>

              <motion.a
                href={business.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-card/80 px-3.5 py-2 text-xs font-semibold text-cream/85 backdrop-blur transition-colors hover:border-fire-orange/40 hover:text-cream"
              >
                <MapPin size={14} className="text-gold" />
                {business.addressShort}
              </motion.a>
            </motion.div>

            {/* Búsqueda instantánea */}
            <motion.form
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
              onSubmit={submitSearch}
              className="mt-6 max-w-md"
              role="search"
            >
              <motion.label
                animate={{
                  borderColor: searchActive ? 'rgba(251,140,0,0.55)' : 'rgba(42,42,42,0.95)',
                  boxShadow: searchActive
                    ? '0 0 0 4px rgba(251,140,0,0.10)'
                    : '0 0 0 0 rgba(251,140,0,0)',
                }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-2.5 rounded-2xl border bg-card/80 px-4 py-3 backdrop-blur"
              >
                <Search size={17} className="shrink-0 text-cream/40" />
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onFocus={() => setSearchActive(true)}
                  onBlur={() => setSearchActive(false)}
                  placeholder="Buscar alitas, pollo, cócteles…"
                  aria-label="Buscar en la carta"
                  className="w-full bg-transparent text-sm text-cream placeholder:text-cream/35 focus:outline-none"
                />
                <AnimatePresence>
                  {query && (
                    <motion.button
                      type="button"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      onClick={() => {
                        setQuery('')
                        inputRef.current?.focus()
                      }}
                      whileTap={{ scale: 0.9 }}
                      className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-line text-cream/70"
                      aria-label="Limpiar búsqueda"
                    >
                      <X size={13} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.label>
            </motion.form>
          </div>

          {/* Portada: plato flotante sin fondo */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.94 },
              show: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
            }}
            className="relative order-first w-full md:order-last"
          >
            <HeroArt />
            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-cream/40">
              <Clock size={11} className="text-gold" />
              {business.scheduleFull}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Separador de brasa */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent" />
    </header>
  )
}
