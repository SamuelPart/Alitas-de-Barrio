import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Bike,
  Clock,
  Flame,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
  Store,
  UtensilsCrossed,
  ChefHat,
  Maximize2,
} from 'lucide-react'
import { business, whatsappUrl } from '../data/business'
import Embers from './Embers'

const reveal = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

/* ---------------------------------- Valores --------------------------------- */
const features = [
  {
    Icon: Flame,
    title: 'Pollo fresco',
    text: 'Seleccionado cada día, con cocción perfecta al carbón.',
  },
  {
    Icon: ChefHat,
    title: 'Marinado secreto',
    text: 'Nuestras especias hacen la diferencia desde el primer bocado.',
  },
  {
    Icon: UtensilsCrossed,
    title: 'Ideal para compartir',
    text: 'Porciones generosas para la familia o los amigos.',
  },
  {
    Icon: Sparkles,
    title: 'Cócteles de barrio',
    text: 'Frescos, frutales y con el toque que te hace volver.',
  },
]

export function Features() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
      >
        {features.map(({ Icon, title, text }) => (
          <motion.div
            key={title}
            variants={reveal}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-line bg-card/60 p-4 backdrop-blur-sm transition-colors hover:border-fire-orange/25"
          >
            <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-fire-red/20 to-fire-orange/10 text-fire-orange">
              <Icon size={18} />
            </div>
            <h3 className="text-[13px] font-bold uppercase tracking-wide text-cream">
              {title}
            </h3>
            <p className="mt-1 text-[11.5px] leading-relaxed text-cream/45">{text}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

/* ------------------------------- Cómo pedir -------------------------------- */
const steps = [
  {
    n: '01',
    title: 'Elige tus platos',
    text: 'Recorre la carta y agrega al pedido con el botón +.',
  },
  {
    n: '02',
    title: 'Revisa tu pedido',
    text: 'Ajusta cantidades y elige delivery o recojo en local.',
  },
  {
    n: '03',
    title: 'Envía por WhatsApp',
    text: `Confirma en el ${business.phoneDisplay} y nosotros cocinamos.`,
  },
]

export function HowToOrder() {
  return (
    <section className="relative overflow-hidden border-y border-line/60 bg-ink-soft/40">
      <Embers count={10} className="opacity-60" />
      <div className="relative mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="text-center"
        >
          <motion.p
            variants={reveal}
            className="text-[11px] font-bold uppercase tracking-[0.24em] text-fire-orange"
          >
            Así de fácil
          </motion.p>
          <motion.h2
            variants={reveal}
            className="font-display mt-2 text-3xl tracking-wide text-cream sm:text-4xl"
          >
            PIDE EN <span className="text-fire">3 PASOS</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mt-9 grid gap-3 sm:grid-cols-3 sm:gap-4"
        >
          {steps.map((step) => (
            <motion.div
              key={step.n}
              variants={reveal}
              whileHover={{ y: -4 }}
              className="relative overflow-hidden rounded-2xl border border-line bg-card/70 p-5"
            >
              <span className="font-display absolute -right-1 -top-3 text-6xl text-white/[0.04]">
                {step.n}
              </span>
              <span className="font-display text-fire text-sm tracking-widest">
                {step.n}
              </span>
              <h3 className="mt-1 text-base font-bold text-cream">{step.title}</h3>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-cream/50">
                {step.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ---------------------------------- Info ----------------------------------- */
export function InfoSection({ onOpenQr }) {
  const cards = [
    {
      Icon: Clock,
      label: 'Horario de atención',
      value: '6:00 PM — 11:45 PM',
      hint: 'Atención en local y delivery todos los días',
    },
    {
      Icon: MapPin,
      label: 'Ubicación',
      value: 'Mz. E Lt. 12, Barrio 3A',
      hint: 'Alto Trujillo, Perú',
      href: business.mapsUrl,
    },
    {
      Icon: Phone,
      label: 'Pedidos por WhatsApp',
      value: business.phoneDisplay,
      hint: 'Escribe y te atendemos al instante',
      href: `https://wa.me/${business.phoneRaw}`,
    },
  ]

  return (
    <section
      id="contacto"
      className="relative mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-14 sm:px-6 sm:py-16"
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger}
        >
          <motion.p
            variants={reveal}
            className="text-[11px] font-bold uppercase tracking-[0.24em] text-fire-orange"
          >
            Visítanos o pide a casa
          </motion.p>
          <motion.h2
            variants={reveal}
            className="font-display mt-2 text-3xl leading-tight tracking-wide text-cream sm:text-4xl"
          >
            ATENCIÓN EN LOCAL
            <br />
            <span className="text-fire">Y DELIVERY</span>
          </motion.h2>
          <motion.p
            variants={reveal}
            className="mt-3 max-w-md text-sm leading-relaxed text-cream/55"
          >
            Sabor que une, momentos que quedan. Estamos en el corazón de Alto Trujillo,
            listos para atenderte todas las noches.
          </motion.p>

          {/* QR de la carta */}
          <motion.button
            type="button"
            variants={reveal}
            onClick={onOpenQr}
            whileTap={{ scale: 0.985 }}
            whileHover={{ y: -2 }}
            className="group mt-6 flex w-full items-center gap-3.5 rounded-2xl border border-line bg-card/60 p-3 text-left transition-colors hover:border-fire-orange/35"
            aria-label="Ampliar el código QR de la carta"
          >
            <motion.img
              src="/img/qr-carta.png"
              alt="Código QR de la carta digital de Alitas Barrio"
              width="92"
              height="92"
              loading="lazy"
              whileHover={{ scale: 1.06, rotate: -1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="h-[76px] w-[76px] shrink-0 rounded-xl border border-line/70 transition-shadow group-hover:shadow-[0_10px_24px_-10px_rgba(251,140,0,0.7)] sm:h-[88px] sm:w-[88px]"
            />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-fire-orange">
                Escanea y pide
              </p>
              <p className="mt-0.5 text-[13px] font-semibold leading-snug text-cream">
                Abre la carta en tu celular
              </p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-cream/40">
                Toca el QR para ampliarlo, descargarlo o compartirlo.
              </p>
            </div>
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line bg-ink/60 text-cream/40 transition-colors group-hover:border-fire-orange/40 group-hover:text-fire-orange">
              <Maximize2 size={14} />
            </span>
          </motion.button>

          <motion.div variants={reveal} className="mt-3 space-y-2.5">
            {cards.map(({ Icon, label, value, hint, href }) => {
              const Wrapper = href ? 'a' : 'div'
              return (
                <Wrapper
                  key={label}
                  {...(href
                    ? { href, target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="group flex items-center gap-3 rounded-2xl border border-line bg-card/60 p-3.5 transition-colors hover:border-fire-orange/30"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-fire-red/20 to-fire-orange/10 text-fire-orange">
                    <Icon size={17} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-cream/35">
                      {label}
                    </p>
                    <p className="truncate text-[14px] font-semibold text-cream">{value}</p>
                    <p className="truncate text-[11px] text-cream/40">{hint}</p>
                  </div>
                  {href && (
                    <ArrowUpRight
                      size={16}
                      className="shrink-0 text-cream/25 transition-colors group-hover:text-gold"
                    />
                  )}
                </Wrapper>
              )
            })}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl border border-line"
        >
          <img
            src="/img/local.jpg"
            alt="Ambiente del local de Alitas Barrio en Alto Trujillo"
            className="h-64 w-full object-cover sm:h-80 lg:h-[26rem]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/70 px-3 py-1.5 text-[11px] font-semibold text-cream/85 backdrop-blur">
                <Store size={12} className="text-gold" /> Local
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/70 px-3 py-1.5 text-[11px] font-semibold text-cream/85 backdrop-blur">
                <Bike size={12} className="text-fire-orange" /> Delivery
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/70 px-3 py-1.5 text-[11px] font-semibold text-cream/85 backdrop-blur">
                <Clock size={12} className="text-emerald-400" /> 6:00 PM - 11:45 PM
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* --------------------------------- Footer ---------------------------------- */
export function Footer({ onOpenCart, count }) {
  return (
    <footer className="relative overflow-hidden border-t border-line/70 bg-ink-soft/50">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[36rem] -translate-x-1/2 rounded-full bg-fire-red/10 blur-[80px]" />
      <div className="relative mx-auto w-full max-w-6xl px-4 pb-28 pt-12 sm:px-6 sm:pb-16">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <div className="max-w-sm">
            <div className="flex items-center justify-center gap-2.5 md:justify-start">
              <img src="/img/logo.png" alt="Alitas Barrio" className="h-12 w-auto" />
              <span className="font-display text-xl tracking-wide text-cream">
                ALITAS <span className="text-fire">BARRIO</span>
              </span>
            </div>
            <p className="mt-3 text-sm italic text-cream/50">“{business.slogan}”</p>
            <p className="mt-2 text-[12px] leading-relaxed text-cream/35">
              {business.address}
            </p>
          </div>

          <div className="flex flex-col items-center gap-2.5 text-[12.5px] md:items-end">
            <a
              href={`https://wa.me/${business.phoneRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-cream/80 transition-colors hover:text-gold"
            >
              <MessageCircle size={15} className="text-[#25D366]" />
              {business.phoneDisplay}
            </a>
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cream/50 transition-colors hover:text-cream"
            >
              <MapPin size={14} /> Cómo llegar
            </a>
            <p className="inline-flex items-center gap-2 text-cream/50">
              <Clock size={14} /> {business.schedule}
            </p>
            <button
              type="button"
              onClick={onOpenCart}
              className="mt-1 inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-[12px] font-semibold text-cream/75 transition-colors hover:border-gold/40 hover:text-gold"
            >
              Ver mi pedido ({count})
            </button>
          </div>
        </div>

        <div className="mt-9 flex flex-col items-center gap-2 border-t border-line/60 pt-5 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-[11px] text-cream/25">
            © {new Date().getFullYear()} Alitas Barrio · Alto Trujillo, Perú
          </p>
          <p className="text-[11px] text-cream/25">
            Precios referenciales en Soles (S/) · Sujetos a disponibilidad
          </p>
        </div>
      </div>
    </footer>
  )
}
