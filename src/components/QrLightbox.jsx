import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Copy, Download, Link2, Share2, X } from 'lucide-react'
import { useEscapeKey, useLockBodyScroll } from '../hooks/useUi'

const QR_SRC = '/img/qr-carta.png'
const QR_FILE = 'alitas-barrio-carta-qr.png'

const shareText = 'Carta digital de Alitas Barrio — Un sabor diferente 🍗🔥'

/**
 * Visor del QR en primer plano: zoom con spring, descarga y compartir.
 * En móvil entra como bottom sheet; en desktop como modal centrado.
 */
export default function QrLightbox({ open, onClose, url = 'https://debarrioalitas.vercel.app' }) {
  const [status, setStatus] = useState(null)
  const [canNativeShare, setCanNativeShare] = useState(false)

  useLockBodyScroll(open)
  useEscapeKey(onClose, open)

  useEffect(() => {
    if (!open) return
    setCanNativeShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function')
    setStatus(null)
  }, [open])

  const flash = useCallback((value) => {
    setStatus(value)
    setTimeout(() => setStatus(null), 2200)
  }, [])

  const handleDownload = useCallback(async () => {
    try {
      const res = await fetch(QR_SRC)
      if (!res.ok) throw new Error('sin archivo')
      const blob = await res.blob()
      const href = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = href
      link.download = QR_FILE
      document.body.appendChild(link)
      link.click()
      link.remove()
      setTimeout(() => URL.revokeObjectURL(href), 4000)
      flash('download')
    } catch {
      // Fallback: abrir en pestaña nueva para guardar manualmente
      window.open(QR_SRC, '_blank', 'noopener,noreferrer')
    }
  }, [flash])

  const handleShare = useCallback(async () => {
    try {
      const res = await fetch(QR_SRC)
      const blob = await res.blob()
      const file = new File([blob], QR_FILE, { type: 'image/png' })

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: 'Alitas Barrio', text: shareText, url })
        return
      }
      if (navigator.share) {
        await navigator.share({ title: 'Alitas Barrio', text: shareText, url })
        return
      }
      await navigator.clipboard.writeText(url)
      flash('copied')
    } catch (error) {
      if (error?.name === 'AbortError') return
      try {
        await navigator.clipboard.writeText(url)
        flash('copied')
      } catch {
        flash('error')
      }
    }
  }, [flash, url])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url)
      flash('copied')
    } catch {
      flash('error')
    }
  }, [flash, url])

  const label = {
    download: '¡QR descargado!',
    copied: 'Enlace copiado',
    error: 'No se pudo. Mantén presionado el QR para guardarlo.',
  }[status]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Fondo */}
          <motion.button
            type="button"
            aria-label="Cerrar QR"
            onClick={onClose}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 h-full w-full cursor-zoom-out bg-black/80 backdrop-blur-md"
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Código QR de la carta"
            variants={{
              hidden: { opacity: 0, scale: 0.55, y: 40 },
              visible: { opacity: 1, scale: 1, y: 0 },
            }}
            transition={{ type: 'spring', stiffness: 280, damping: 26, mass: 0.8 }}
            className="relative m-3 w-full max-w-sm overflow-hidden rounded-3xl border border-line bg-[#0d0d10] shadow-2xl sm:m-0"
          >
            {/* halo */}
            <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-fire-red/25 blur-[70px]" />

            <div className="relative flex items-center justify-between px-4 pt-3.5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-fire-orange">
                  Escanea y pide
                </p>
                <h2 className="font-display text-xl tracking-wide text-cream">
                  CARTA DIGITAL
                </h2>
              </div>
              <motion.button
                type="button"
                onClick={onClose}
                whileTap={{ scale: 0.9 }}
                className="grid h-9 w-9 place-items-center rounded-full border border-line bg-card text-cream/60 transition-colors hover:text-cream"
                aria-label="Cerrar"
              >
                <X size={16} />
              </motion.button>
            </div>

            {/* QR con animación de zoom */}
            <div className="relative px-4 py-4">
              <motion.div
                initial={{ scale: 0.86, rotate: -1.5 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 22, delay: 0.06 }}
                className="relative overflow-hidden rounded-2xl bg-white p-2 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.9)]"
              >
                <img
                  src={QR_SRC}
                  alt="Código QR de la carta digital de Alitas Barrio"
                  width="640"
                  height="640"
                  draggable={false}
                  className="aspect-square w-full select-none rounded-xl object-contain"
                />
                {/* destello al abrir */}
                <motion.div
                  aria-hidden="true"
                  initial={{ opacity: 0.7, x: '-120%' }}
                  animate={{ opacity: 0, x: '120%' }}
                  transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                />
              </motion.div>

              <p className="mt-3 text-center text-[11.5px] leading-relaxed text-cream/45">
                Apunta la cámara de tu celular. También puedes
                <span className="text-cream/75"> descargarlo</span> o
                <span className="text-cream/75"> compartirlo</span>.
              </p>
            </div>

            {/* Acciones */}
            <div className="grid grid-cols-2 gap-2 px-4 pb-3">
              <motion.button
                type="button"
                onClick={handleDownload}
                whileTap={{ scale: 0.96 }}
                whileHover={{ y: -1 }}
                className="flex items-center justify-center gap-2 rounded-xl bg-fire px-3 py-3 text-[12px] font-bold uppercase tracking-wide text-white shadow-fire"
              >
                <Download size={15} />
                Descargar
              </motion.button>

              <motion.button
                type="button"
                onClick={handleShare}
                whileTap={{ scale: 0.96 }}
                whileHover={{ y: -1 }}
                className="flex items-center justify-center gap-2 rounded-xl border border-line bg-card px-3 py-3 text-[12px] font-bold uppercase tracking-wide text-cream/85"
              >
                <Share2 size={15} className="text-gold" />
                {canNativeShare ? 'Compartir' : 'Enviar'}
              </motion.button>
            </div>

            <div className="flex items-center justify-center gap-2 pb-4">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-full border border-line/70 px-3 py-1.5 text-[10.5px] font-semibold text-cream/50 transition-colors hover:text-cream"
              >
                <Link2 size={11} /> Copiar enlace de la carta
              </button>
            </div>

            {/* Confirmación */}
            <AnimatePresence>
              {label && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className={`absolute inset-x-3 bottom-3 flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-[11.5px] font-semibold backdrop-blur ${
                    status === 'error'
                      ? 'bg-fire-red/90 text-white'
                      : 'bg-emerald-500/90 text-emerald-950'
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  {status === 'copied' ? <Copy size={13} /> : <Check size={13} />}
                  {label}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
