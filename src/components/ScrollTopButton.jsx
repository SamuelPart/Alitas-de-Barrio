import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useState } from 'react'

export default function ScrollTopButton({ offset = 520 }) {
  const [visible, setVisible] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (value) => {
    setVisible(value > offset)
  })

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          whileTap={{ scale: 0.9 }}
          whileHover={{ y: -3 }}
          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
          className="fixed bottom-24 right-4 z-40 grid h-11 w-11 place-items-center rounded-full border border-line bg-ink/85 text-gold backdrop-blur-xl shadow-lg sm:bottom-28 sm:right-6"
          aria-label="Volver arriba"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
