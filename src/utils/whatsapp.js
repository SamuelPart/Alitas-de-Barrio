import { business } from '../data/business'
import { formatPrice } from './format'

/**
 * Construye el mensaje de WhatsApp con el pedido completo.
 * @param {Array} items  [{ name, price, qty }]
 * @param {Object} order { mode, name, address, payment, notes }
 * @returns {string}
 */
export const buildOrderMessage = (items, order) => {
  const lines = []
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  lines.push('🔥 *NUEVO PEDIDO — ALITAS BARRIO* 🔥')
  lines.push('_Un sabor diferente, una experiencia única_')
  lines.push('')

  lines.push('🛒 *MI PEDIDO*')
  items.forEach((item, index) => {
    lines.push(
      `${index + 1}. ${item.name}`,
      `   ✕ ${item.qty}  —  S/ ${formatPrice(item.price * item.qty)}`,
    )
  })
  lines.push('')

  lines.push(`💰 *TOTAL A PAGAR:* S/ ${formatPrice(total)}`)
  lines.push('')

  lines.push(
    order.mode === 'delivery'
      ? '🛵 *TIPO DE ENTREGA:* Delivery (6:00 PM - 11:45 PM)'
      : '🏠 *TIPO DE ENTREGA:* Recojo en local',
  )
  lines.push(`👤 *NOMBRE:* ${order.name.trim()}`)

  if (order.mode === 'delivery') {
    lines.push(`📍 *DIRECCIÓN / REFERENCIA:* ${order.address.trim()}`)
  } else {
    lines.push(`📍 *PUNTO DE RECOJO:* ${business.address}`)
  }

  lines.push(`💳 *MÉTODO DE PAGO:* ${order.payment}`)

  if (order.notes && order.notes.trim()) {
    lines.push(`📝 *NOTA:* ${order.notes.trim()}`)
  }

  lines.push('')
  lines.push('📞 *CONTACTO:* ' + business.phoneDisplay)
  lines.push('')
  lines.push('¡Gracias por tu pedido! 🍗🍟✨')

  return lines.join('\n')
}

/** URL final de WhatsApp lista para abrir. */
export const buildWhatsappUrl = (message) =>
  `https://wa.me/${business.phoneRaw}?text=${encodeURIComponent(message)}`
