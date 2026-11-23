import { motion } from 'framer-motion'
import { Drumstick, Flame, Martini, Wheat } from 'lucide-react'

const iconMap = {
  flame: Flame,
  drumstick: Drumstick,
  chicken: Wheat,
  cocktail: Martini,
}

export default function CategoryTabs({ categories, active, onChange, counts = {} }) {
  return (
    <div
      role="tablist"
      aria-label="Categorías de la carta"
      className="no-scrollbar mask-fade-r -mx-4 flex gap-2.5 overflow-x-auto px-4 py-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
    >
      {categories.map((category) => {
        const Icon = iconMap[category.icon] ?? Flame
        const isActive = active === category.id
        return (
          <motion.button
            key={category.id}
            role="tab"
            type="button"
            aria-selected={isActive}
            onClick={() => onChange(category.id)}
            whileTap={{ scale: 0.95 }}
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 420, damping: 26 }}
            className={`relative isolate flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold transition-colors duration-300 ${
              isActive ? 'text-white' : 'text-cream/60 hover:text-cream'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="activeCategory"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                className="absolute inset-0 -z-10 rounded-full bg-fire shadow-fire"
              />
            )}
            {!isActive && (
              <span className="absolute inset-0 -z-10 rounded-full border border-line bg-card/70 backdrop-blur-sm" />
            )}
            <Icon size={15} className={isActive ? 'text-white' : 'text-fire-orange/80'} />
            <span className="whitespace-nowrap">{category.label}</span>
            {typeof counts[category.id] === 'number' && counts[category.id] > 0 && (
              <span
                className={`grid h-[18px] min-w-[18px] place-items-center rounded-full px-1 text-[10px] font-bold ${
                  isActive ? 'bg-white/25 text-white' : 'bg-line text-cream/60'
                }`}
              >
                {counts[category.id]}
              </span>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
