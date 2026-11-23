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
    image: '/img/alitas-cut.png',
  },
  {
    id: 'pollo',
    name: 'Pollo a la brasa',
    desc: '1/4 de pollo al carbón',
    price: 16.0,
    image: '/img/pollo-cut.png',
  },
]

export const sideOptions = [
  {
    id: 'papas',
    name: 'Papas fritas',
    desc: 'Porción crocante',
    price: 5.0,
    image: '/img/chaufa-cut-sm.png',
  },
  {
    id: 'chaufa',
    name: 'Arroz chaufa',
    desc: 'Con sillao y cebollita',
    price: 7.0,
    image: '/img/chaufa-cut-sm.png',
  },
  {
    id: 'makis',
    name: 'Makis',
    desc: 'Rolls variados',
    price: 9.0,
    image: '/img/alitas-cut-sm.png',
  },
]

export const drinkOptions = [
  {
    id: 'laguna',
    name: 'Laguna Azul',
    desc: 'Cítrico y helado',
    price: 12.0,
    image: '/img/azul-cut.png',
  },
  {
    id: 'piña',
    name: 'Piña Colada',
    desc: 'Cremosa y tropical',
    price: 12.0,
    image: '/img/colada-cut-sm.png',
  },
  {
    id: 'sin-drink',
    name: 'Sin cóctel',
    desc: 'Solo comida',
    price: 0,
    image: '/img/azul-cut.png',
  },
]

/** Aviso de moderación del negocio */
export const builderNote =
  'Los cócteles son solo para mayores de 18 años. Pediremos DNI al entregar.'
