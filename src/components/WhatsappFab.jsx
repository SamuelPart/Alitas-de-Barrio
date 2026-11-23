import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { business, whatsappUrl } from '../data/business'

/**
 * Acceso rápido al WhatsApp del negocio (consultas, sin carrito).
 */
export default function WhatsappFab({ lifted = false }) {
  const message = `¡Hola ${business.name}! 👋 Quisiera hacer una consulta sobre la carta y el delivery.`
  return (
    <motion.a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1, bottom: lifted ? 96 : 20 }}
      transition={{ delay: 0.9, type: 'spring', stiffness: 320, damping: 26 }}
      whileHover={{ y: -3, scale: 1.04 }}
      whileTap={{ scale: 0.92 }}
      className="fixed left-4 z-40 grid h-12 w-12 place-items-center rounded-full border border-[#25D366]/30 bg-[#25D366] text-[#052e16] shadow-[0_12px_30px_-8px_rgba(37,211,102,0.65)] sm:left-6"
      aria-label={`Escribir por WhatsApp al ${business.phoneDisplay}`}
      title={`Pedidos al ${business.phoneDisplay}`}
    >
      <MessageCircle size={22} strokeWidth={2.4} />
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/30" />
    </motion.a>
  )
}
