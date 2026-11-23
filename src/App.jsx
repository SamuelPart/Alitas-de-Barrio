import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search } from 'lucide-react'

import TopBar from './components/TopBar'
import Hero from './components/Hero'
import CategoryTabs from './components/CategoryTabs'
import ProductCard, { ProductsEmpty } from './components/ProductCard'
import CartBar from './components/CartBar'
import OrderDrawer from './components/OrderDrawer'
import ComboBuilder from './components/ComboBuilder'
import Showcase from './components/Showcase'
import ScrollTopButton from './components/ScrollTopButton'
import WhatsappFab from './components/WhatsappFab'
import { Features, HowToOrder, InfoSection, Footer } from './components/Sections'

import { products as menu, categories } from './data/menu'
import { business } from './data/business'
import { useCart } from './hooks/useCart'
import { normalize } from './utils/format'

export default function App() {
  const [category, setCategory] = useState('todos')
  const [query, setQuery] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)

  const {
    items,
    count,
    total,
    addItem,
    increment,
    decrement,
    removeItem,
    clearCart,
    quantityOf,
  } = useCart()

  const available = useMemo(() => menu.filter((p) => p.available !== false), [menu])

  const filtered = useMemo(() => {
    const term = normalize(query)
    return available.filter((product) => {
      const matchesCategory = category === 'todos' || product.category === category
      if (!matchesCategory) return false
      if (!term) return true
      const haystack = normalize(`${product.name} ${product.description}`)
      return term.split(/\s+/).every((word) => haystack.includes(word))
    })
  }, [available, category, query])

  const counts = useMemo(() => {
    const term = normalize(query)
    const base = available.filter((product) => {
      if (!term) return true
      const haystack = normalize(`${product.name} ${product.description}`)
      return term.split(/\s+/).every((word) => haystack.includes(word))
    })
    return categories.reduce((acc, cat) => {
      acc[cat.id] =
        cat.id === 'todos'
          ? base.length
          : base.filter((p) => p.category === cat.id).length
      return acc
    }, {})
  }, [available, query])

  const openDrawer = () => setDrawerOpen(true)
  const resetFilters = () => {
    setQuery('')
    setCategory('todos')
  }

  return (
    <div className="relative min-h-screen bg-ink text-cream selection:bg-fire-orange/30">
      {/* Resplandores de ambiente */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-32 top-[28rem] h-72 w-72 rounded-full bg-fire-red/10 blur-[110px]" />
        <div className="absolute -right-24 top-[55rem] h-80 w-80 rounded-full bg-fire-orange/10 blur-[120px]" />
        <div className="absolute bottom-40 left-1/3 h-64 w-64 rounded-full bg-gold/[0.06] blur-[120px]" />
      </div>

      <TopBar cartCount={count} onOpenCart={openDrawer} />

      <Hero query={query} setQuery={setQuery} />

      <main>
        {/* ---------------------------------- Carta -------------------------------- */}
        <section
          id="carta"
          className="relative mx-auto w-full max-w-6xl scroll-mt-16 px-4 pt-2 sm:px-6"
        >
          <div className="mb-5 flex flex-col items-center text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[11px] font-bold uppercase tracking-[0.24em] text-fire-orange"
            >
              Nuestra carta
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="font-display mt-1.5 text-[2rem] leading-none tracking-wide text-cream sm:text-4xl"
            >
              ELIGE TU <span className="text-fire">ANTOJO</span>
            </motion.h2>
          </div>

          <div className="sticky top-16 z-30 -mx-4 bg-ink/85 px-4 py-3 backdrop-blur-xl sm:static sm:mx-0 sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none">
            <CategoryTabs
              categories={categories}
              active={category}
              onChange={setCategory}
              counts={counts}
            />
          </div>

          {/* Resultado de búsqueda */}
          <AnimatePresence>
            {query.trim() && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-line/70 bg-card/50 px-3 py-2 text-[12px] text-cream/50">
                  <Search size={13} className="text-fire-orange" />
                  <span>
                    {filtered.length} resultado{filtered.length === 1 ? '' : 's'} para{' '}
                    <span className="font-semibold text-cream/85">“{query}”</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="ml-1 font-semibold text-gold hover:underline"
                  >
                    Limpiar
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            layout
            className="mt-4 grid grid-cols-2 gap-2.5 pb-10 sm:mt-5 sm:gap-4 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  qty={quantityOf(product.id)}
                  onAdd={addItem}
                  onIncrement={increment}
                  onDecrement={decrement}
                />
              ))}
            </AnimatePresence>

            {filtered.length === 0 && <ProductsEmpty onReset={resetFilters} />}
          </motion.div>

          <p className="pb-8 text-center text-[11px] text-cream/25">
            Precio referencial en Soles (S/) · Consulta disponibilidad del día al{' '}
            {business.phoneDisplay}
          </p>
        </section>

        <Showcase />

        <ComboBuilder
          onAddCombo={(combo) =>
            addItem({
              id: combo.id,
              name: combo.name,
              price: combo.price,
              image: combo.image,
            })
          }
        />

        <Features />
        <HowToOrder />
        <InfoSection />
      </main>

      <Footer onOpenCart={openDrawer} count={count} />

      {/* Capa flotante */}
      <CartBar count={count} total={total} onOpen={openDrawer} />
      <ScrollTopButton />
      <WhatsappFab lifted={count > 0} />
      <OrderDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        items={items}
        total={total}
        count={count}
        onIncrement={increment}
        onDecrement={decrement}
        onRemove={removeItem}
        onClear={clearCart}
      />
    </div>
  )
}
