/**
 * Datos del negocio — Alitas Barrio
 * Edita aquí los datos reales si cambian (teléfono, dirección, horario).
 */
export const business = {
  name: 'Alitas Barrio',
  slogan: 'Un sabor diferente, una experiencia única',
  tagline: 'Un sabor diferente',
  address: 'Mz. E Lt. 12, Barrio 3A, Alto Trujillo, Perú',
  addressShort: 'Mz. E Lt. 12 — Barrio 3A, Alto Trujillo',
  schedule: '6:00 PM - 11:45 PM',
  scheduleFull: 'Todos los días de 6:00 PM a 11:45 PM',
  opensAt: 18, // 6:00 PM
  closesAt: 23.75, // 11:45 PM
  phoneRaw: '51907634061',
  phoneDisplay: '907 634 061',
  currency: 'S/',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Mz.+E+Lt.+12+Barrio+3A+Alto+Trujillo+Trujillo+Peru',
}

export const whatsappUrl = (message) =>
  `https://wa.me/${business.phoneRaw}?text=${encodeURIComponent(message)}`

/** Devuelve true si el local está dentro del horario de atención. */
export const isOpenNow = (date = new Date()) => {
  // Hora local de Perú (UTC-5)
  const peru = new Date(date.getTime() - 5 * 60 * 60 * 1000)
  const hour = peru.getUTCHours() + peru.getUTCMinutes() / 60
  return hour >= business.opensAt && hour <= business.closesAt
}

export const paymentMethods = ['Yape / Plin', 'Efectivo']

export const deliveryModes = [
  {
    id: 'delivery',
    label: 'Delivery',
    hint: '6:00 PM - 11:45 PM',
    icon: 'scooter',
  },
  {
    id: 'recojo',
    label: 'Recojo en local',
    hint: 'Alto Trujillo',
    icon: 'store',
  },
]
