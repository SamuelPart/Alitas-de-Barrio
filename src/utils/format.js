import { business } from '../data/business'

/** Formatea un monto en Soles: 18 → "18.00" */
export const formatPrice = (value) =>
  Number(value || 0).toLocaleString('es-PE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

/** Formatea con símbolo: 18 → "S/ 18.00" */
export const withCurrency = (value) => `${business.currency} ${formatPrice(value)}`

/** Quita tildes y pasa a minúsculas para búsquedas tolerantes. */
export const normalize = (text = '') =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
