import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Banknote,
  Bike,
  Check,
  MessageCircle,
  Minus,
  Plus,
  Smartphone,
  Store,
  Trash2,
  User,
  MapPin,
  StickyNote,
  ShoppingBag,
  X,
} from 'lucide-react'
import { business, isOpenNow } from '../data/business'
import { useLockBodyScroll, useEscapeKey } from '../hooks/useUi'
import { formatPrice } from '../utils/format'
import { buildOrderMessage, buildWhatsappUrl } from '../utils/whatsapp'

const DELIVERY_FEE = 0
const modeOptions = [
  { id: 'delivery', label: 'Delivery', hint: '6:00 PM - 11:45 PM', Icon: Bike },
  { id: 'recojo', label: 'Recojo en local', hint: 'Alto Trujillo', Icon: Store },
]

const paymentOptions = [
  { id: 'Yape / Plin', label: 'Yape / Plin', Icon: Smartphone },
  { id: 'Efectivo', label: 'Efectivo', Icon: Banknote },
]

const initialForm = {
  mode: 'delivery',
  name: '',
  address: '',
  payment: 'Yape / Plin',
  notes: '',
}

export default function OrderDrawer({
  open,
  onClose,
  items,
  total,
  count,
  onIncrement,
  onDecrement,
  onRemove,
  onClear,
}) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  useLockBodyScroll(open)
  useEscapeKey(onClose, open)

  useEffect(() => {
    if (!open) setSent(false)
  }, [open])

  const update = (key) => (event) =>
    setForm((current) => ({ ...current, [key]: event.target.value }))

  const grandTotal = useMemo(
    () => total + (items.length ? DELIVERY_FEE : 0),
    [total, items.length],
  )

  const validate = () => {
    const next = {}
    if (!form.name.trim() || form.name.trim().length < 2) {
      next.name = 'Escribe tu nombre'
    }
    if (form.mode === 'delivery' && form.address.trim().length < 5) {
      next.address = 'Indica tu dirección o referencia'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!items.length) return
    if (!validate()) return
    const message = buildOrderMessage(items, form)
    window.open(buildWhatsappUrl(message), '_blank', 'noopener,noreferrer')
    setSent(true)
  }

  const delivery = form.mode === 'delivery'

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Overlay */}
          <motion.button
            type="button"
            aria-label="Cerrar pedido"
            onClick={onClose}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 h-full w-full cursor-default bg-black/70 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-title"
            variants={{
              hidden: { y: '100%', opacity: 0.7 },
              visible: { y: 0, opacity: 1 },
            }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl border border-line bg-[#0e0e0e] shadow-2xl sm:max-h-[88vh] sm:rounded-3xl"
          >
            {/* Asa para arrastrar (móvil) */}
            <div className="flex justify-center pt-2.5 sm:hidden">
              <div className="h-1.5 w-12 rounded-full bg-line" />
            </div>

            {/* Cabecera */}
            <div className="flex items-start justify-between gap-3 border-b border-line/70 px-5 pb-3.5 pt-3 sm:pt-5">
              <div>
                <h2
                  id="order-title"
                  className="font-display text-xl tracking-wide text-cream sm:text-2xl"
                >
                  TU PEDIDO
                </h2>
                <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.16em] text-cream/35">
                  {count} {count === 1 ? 'producto' : 'productos'} · Alitas Barrio
                </p>
              </div>
              <motion.button
                type="button"
                onClick={onClose}
                whileTap={{ scale: 0.9 }}
                className="rounded-full border border-line bg-card p-2 text-cream/60 transition-colors hover:text-cream"
                aria-label="Cerrar"
              >
                <X size={16} />
              </motion.button>
            </div>

            {/* Cuerpo scrollable */}
            <div className="no-scrollbar flex-1 overflow-y-auto overscroll-contain px-5 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-14 text-center">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-card text-cream/25">
                    <ShoppingBag size={28} />
                  </div>
                  <p className="text-base font-semibold text-cream">Tu pedido está vacío</p>
                  <p className="max-w-[16rem] text-sm text-cream/45">
                    Agrega tus alitas, pollo o cócteles favoritos y vuelve aquí.
                  </p>
                  <motion.button
                    type="button"
                    onClick={onClose}
                    whileTap={{ scale: 0.95 }}
                    className="mt-1 rounded-full bg-fire px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white"
                  >
                    Ver la carta
                  </motion.button>
                </div>
              ) : (
                <>
                  {/* Lista de productos */}
                  <ul className="space-y-2.5">
                    <AnimatePresence initial={false}>
                      {items.map((item) => (
                        <motion.li
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -24, height: 0, marginBottom: 0 }}
                          transition={{ duration: 0.22 }}
                          className="flex items-center gap-3 rounded-2xl border border-line/80 bg-card/80 p-2.5"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-14 w-14 shrink-0 rounded-xl object-cover"
                            loading="lazy"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[13px] font-semibold text-cream">
                              {item.name}
                            </p>
                            <p className="mt-0.5 text-[11px] text-cream/40">
                              S/ {formatPrice(item.price)} c/u
                            </p>
                            <p className="mt-1 text-[13px] font-bold text-gold">
                              S/ {formatPrice(item.price * item.qty)}
                            </p>
                          </div>

                          <div className="flex shrink-0 flex-col items-end gap-1.5">
                            <div className="flex items-center gap-1 rounded-lg border border-line bg-ink-soft/70 p-0.5">
                              <motion.button
                                type="button"
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onDecrement(item.id)}
                                className="grid h-7 w-7 place-items-center rounded-md text-cream/75 hover:text-fire-red"
                                aria-label={`Quitar uno de ${item.name}`}
                              >
                                <Minus size={13} strokeWidth={3} />
                              </motion.button>
                              <span className="w-5 text-center text-[13px] font-bold text-cream">
                                {item.qty}
                              </span>
                              <motion.button
                                type="button"
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onIncrement(item.id)}
                                className="grid h-7 w-7 place-items-center rounded-md bg-fire text-white"
                                aria-label={`Agregar uno de ${item.name}`}
                              >
                                <Plus size={13} strokeWidth={3} />
                              </motion.button>
                            </div>
                            <motion.button
                              type="button"
                              whileTap={{ scale: 0.9 }}
                              onClick={() => onRemove(item.id)}
                              className="flex items-center gap-1 text-[10px] font-medium text-cream/30 hover:text-fire-red"
                              aria-label={`Eliminar ${item.name}`}
                            >
                              <Trash2 size={11} /> Quitar
                            </motion.button>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>

                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={onClear}
                      className="text-[11px] font-medium text-cream/30 underline-offset-2 hover:text-cream/60 hover:underline"
                    >
                      Vaciar pedido
                    </button>
                  </div>

                  {/* Datos del pedido */}
                  <div className="mt-4 space-y-4">
                    <fieldset>
                      <legend className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-cream/45">
                        Tipo de entrega
                      </legend>
                      <div className="grid grid-cols-2 gap-2">
                        {modeOptions.map(({ id, label, hint, Icon }) => {
                          const active = form.mode === id
                          return (
                            <motion.button
                              key={id}
                              type="button"
                              whileTap={{ scale: 0.96 }}
                              onClick={() =>
                                setForm((current) => ({ ...current, mode: id }))
                              }
                              aria-pressed={active}
                              className={`relative flex items-center gap-2.5 rounded-2xl border p-3 text-left transition-colors ${
                                active
                                  ? 'border-fire-orange/60 bg-fire-red/10'
                                  : 'border-line bg-card/60'
                              }`}
                            >
                              <Icon
                                size={18}
                                className={active ? 'text-fire-orange' : 'text-cream/40'}
                              />
                              <span className="min-w-0">
                                <span className="block text-[12.5px] font-semibold text-cream">
                                  {label}
                                </span>
                                <span className="block truncate text-[10px] text-cream/40">
                                  {hint}
                                </span>
                              </span>
                              {active && (
                                <motion.span
                                  layoutId="modeCheck"
                                  className="absolute right-2 top-2 grid h-4 w-4 place-items-center rounded-full bg-fire text-white"
                                >
                                  <Check size={10} strokeWidth={4} />
                                </motion.span>
                              )}
                            </motion.button>
                          )
                        })}
                      </div>
                      {!isOpenNow() && (
                        <p className="mt-2 rounded-xl border border-gold/20 bg-gold/5 px-3 py-2 text-[11px] leading-relaxed text-gold/80">
                          Ahora estamos fuera de horario. Puedes enviar tu pedido y lo
                          atenderemos desde las 6:00 PM.
                        </p>
                      )}
                    </fieldset>

                    {/* Nombre */}
                    <label className="block">
                      <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-cream/45">
                        <User size={12} /> Nombre
                      </span>
                      <input
                        type="text"
                        value={form.name}
                        onChange={update('name')}
                        placeholder="¿Cómo te llamas?"
                        autoComplete="name"
                        className={`w-full rounded-xl border bg-ink-soft/70 px-3.5 py-3 text-sm text-cream placeholder:text-cream/25 focus:outline-none ${
                          errors.name
                            ? 'border-fire-red/70'
                            : 'border-line focus:border-fire-orange/60'
                        }`}
                      />
                      {errors.name && (
                        <span className="mt-1 block text-[11px] text-fire-red">
                          {errors.name}
                        </span>
                      )}
                    </label>

                    {/* Dirección */}
                    {delivery && (
                      <motion.label
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="block overflow-hidden"
                      >
                        <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-cream/45">
                          <MapPin size={12} /> Dirección / Referencia
                        </span>
                        <textarea
                          value={form.address}
                          onChange={update('address')}
                          rows={2}
                          placeholder="Ej. Mz. F Lt. 8, Barrio 3A, frente al parque…"
                          className={`w-full resize-none rounded-xl border bg-ink-soft/70 px-3.5 py-3 text-sm text-cream placeholder:text-cream/25 focus:outline-none ${
                            errors.address
                              ? 'border-fire-red/70'
                              : 'border-line focus:border-fire-orange/60'
                          }`}
                        />
                        {errors.address && (
                          <span className="mt-1 block text-[11px] text-fire-red">
                            {errors.address}
                          </span>
                        )}
                        <span className="mt-1 block text-[10px] text-cream/30">
                          Entregamos en Alto Trujillo y alrededores.
                        </span>
                      </motion.label>
                    )}

                    {/* Pago */}
                    <fieldset>
                      <legend className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-cream/45">
                        Método de pago
                      </legend>
                      <div className="grid grid-cols-2 gap-2">
                        {paymentOptions.map(({ id, label, Icon }) => {
                          const active = form.payment === id
                          return (
                            <motion.button
                              key={id}
                              type="button"
                              whileTap={{ scale: 0.96 }}
                              onClick={() =>
                                setForm((current) => ({ ...current, payment: id }))
                              }
                              aria-pressed={active}
                              className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-[12.5px] font-semibold transition-colors ${
                                active
                                  ? 'border-gold/50 bg-gold/10 text-gold'
                                  : 'border-line bg-card/60 text-cream/60'
                              }`}
                            >
                              <Icon size={15} />
                              {label}
                            </motion.button>
                          )
                        })}
                      </div>
                    </fieldset>

                    {/* Nota */}
                    <label className="block">
                      <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-cream/45">
                        <StickyNote size={12} /> Nota (opcional)
                      </span>
                      <input
                        type="text"
                        value={form.notes}
                        onChange={update('notes')}
                        placeholder="Sin ají, término medio, etc."
                        className="w-full rounded-xl border border-line bg-ink-soft/70 px-3.5 py-3 text-sm text-cream placeholder:text-cream/25 focus:border-fire-orange/60 focus:outline-none"
                      />
                    </label>
                  </div>
                </>
              )}
            </div>

            {/* Pie: total + enviar */}
            {items.length > 0 && (
              <div className="safe-bottom border-t border-line/70 bg-[#0b0b0b]/95 px-5 pb-3 pt-3.5 backdrop-blur">
                <div className="mb-2.5 space-y-1">
                  <div className="flex items-center justify-between text-[12.5px] text-cream/50">
                    <span>Subtotal</span>
                    <span>S/ {formatPrice(total)}</span>
                  </div>
                  <div className="flex items-center justify-between text-[12.5px] text-cream/50">
                    <span>{delivery ? 'Delivery' : 'Recojo en local'}</span>
                    <span className="text-emerald-400/80">
                      {delivery ? 'A coordinar' : 'Gratis'}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between border-t border-line/60 pt-2">
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-cream/70">
                      Total a pagar
                    </span>
                    <span className="flex items-baseline gap-1 text-gold">
                      <span className="text-xs font-semibold">S/</span>
                      <span className="font-display text-2xl leading-none tracking-wide">
                        {formatPrice(grandTotal)}
                      </span>
                    </span>
                  </div>
                </div>

                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ y: -1 }}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-4 py-3.5 text-[13.5px] font-extrabold uppercase tracking-wide text-[#052e16] shadow-[0_16px_36px_-16px_rgba(37,211,102,0.7)]"
                >
                  <MessageCircle size={18} strokeWidth={2.6} />
                  Enviar Pedido por WhatsApp
                </motion.button>

                <AnimatePresence>
                  {sent && (
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-2 text-center text-[11px] text-emerald-400/90"
                    >
                      ¡Listo! Abrimos WhatsApp con tu pedido. Solo presiona enviar.
                    </motion.p>
                  )}
                </AnimatePresence>

                <p className="mt-2 text-center text-[10px] leading-relaxed text-cream/25">
                  Pedidos al {business.phoneDisplay} · Delivery {business.schedule}
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
