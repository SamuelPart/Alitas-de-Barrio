/**
 * Carta de Alitas Barrio — precios editables (en Soles).
 * Cambia el valor de `price` para actualizar la carta.
 * Cambia `available: false` para mostrar el producto como agotado.
 */
export const categories = [
  { id: 'todos', label: 'Todos', icon: 'flame' },
  { id: 'alitas', label: 'Alitas y Combos', icon: 'drumstick' },
  { id: 'pollo', label: 'Pollo a la Brasa', icon: 'chicken' },
  { id: 'cocteles', label: 'Cócteles', icon: 'cocktail' },
]

export const products = [
  {
    id: 'alitas-chaufa',
    name: 'Alitas + Chaufa + Papas Fritas',
    category: 'alitas',
    image: '/img/alitas-chaufa.jpg',
    description:
      'Jugosas alitas doradas acompañadas de arroz chaufa y papas fritas crocantes',
    price: 18.0,
    badge: 'Más pedido',
    available: true,
  },
  {
    id: 'combo-alitas-makis',
    name: 'Combo Alitas + Makis + Papas',
    category: 'alitas',
    image: '/img/promo-alitas.jpg',
    description:
      'Porción para compartir con alitas crujientes, rolls variados y papas fritas',
    price: 25.0,
    badge: 'Para compartir',
    available: true,
  },
  {
    id: 'pollo-cuarto',
    name: 'Pollo a la Brasa 1/4 con Papas',
    category: 'pollo',
    image: '/img/pollo-brasa.jpg',
    description:
      'Sabroso, jugoso y 100% peruano, cocción perfecta al carbón con papas y ensalada',
    price: 16.0,
    badge: 'Al carbón',
    available: true,
  },
  {
    id: 'pollo-entero',
    name: 'Pollo a la Brasa Entero Familiar',
    category: 'pollo',
    image: '/img/pollo-brasa.jpg',
    description:
      'Pollo entero al carbón ideal para compartir, incluye papas fritas y ensalada',
    price: 52.0,
    badge: 'Familiar',
    available: true,
  },
  {
    id: 'pina-colada',
    name: 'Piña Colada Especial',
    category: 'cocteles',
    image: '/img/pina-colada.jpg',
    description:
      'Cóctel cremoso y refrescante decorado con piña natural y cereza',
    price: 12.0,
    badge: 'Especial',
    available: true,
  },
  {
    id: 'laguna-azul',
    name: 'Laguna Azul',
    category: 'cocteles',
    image: '/img/coctel-azul.jpg',
    description: 'Cóctel frío y refrescante con toque cítrico, piña y cereza',
    price: 12.0,
    badge: 'Refrescante',
    available: true,
  },
]
