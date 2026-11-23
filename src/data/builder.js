/**
 * "Arma tu Combo" — opciones del armador interactivo.
 * Edita libremente nombres y precios (en Soles) para que coincidan
 * con tus porciones reales.
 */
export const baseOptions = [
  {
    id: 'alitas',
    name: 'Alitas',
    desc: '8 unidades glaseadas',
    price: 14.0,
    image: '/img/promo-alitas.jpg',
  },
  {
    id: 'pollo',
    name: 'Pollo a la brasa',
    desc: '1/4 de pollo al carbón',
    price: 16.0,
    image: '/img/pollo-brasa.jpg',
  },
]

export const sideOptions = [
  {
    id: 'papas',
    name: 'Papas fritas',
    desc: 'Porción crocante',
    price: 5.0,
    image: '/img/alitas-chaufa.jpg',
  },
  {
    id: 'chaufa',
    name: 'Arroz chaufa',
    desc: 'Con sillao y cebollita',
    price: 7.0,
    image: '/img/alitas-chaufa.jpg',
  },
  {
    id: 'makis',
    name: 'Makis',
    desc: 'Rolls variados',
    price: 9.0,
    image: '/img/promo-alitas.jpg',
  },
]

export const drinkOptions = [
  {
    id: 'laguna',
    name: 'Laguna Azul',
    desc: 'Cítrico y helado',
    price: 12.0,
    image: '/img/coctel-azul.jpg',
  },
  {
    id: 'piña',
    name: 'Piña Colada',
    desc: 'Cremosa y tropical',
    price: 12.0,
    image: '/img/pina-colada.jpg',
  },
  {
    id: 'sin-drink',
    name: 'Sin cóctel',
    desc: 'Solo comida',
    price: 0,
    image: '/img/coctel-azul.jpg',
  },
]

/** Aviso de moderación del negocio */
export const builderNote =
  'Los cócteles son solo para mayores de 18 años. Pediremos DNI al entregar.'
