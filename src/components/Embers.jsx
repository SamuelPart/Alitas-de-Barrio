import { useMemo } from 'react'
import { motion } from 'framer-motion'

/**
 * Partículas de brasa flotantes (decorativas, no interactivas).
 * Usa animación CSS para no sobrecargar el hilo de JS.
 */
export default function Embers({ count = 18, className = '' }) {
  const embers = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => {
        const seed = (index * 9301 + 49297) % 233280
        const rand = seed / 233280
        return {
          id: index,
          left: `${(rand * 100).toFixed(2)}%`,
          size: Number((1.6 + (index % 4) * 0.85).toFixed(2)),
          delay: `${(rand * 8).toFixed(2)}s`,
          duration: `${6 + ((index * 1.7) % 5).toFixed(2)}s`,
          drift: `${(index % 2 === 0 ? 1 : -1) * (10 + ((index * 13) % 40))}px`,
          opacity: 0.25 + ((index % 5) * 0.12),
        }
      }),
    [count],
  )

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {embers.map((ember) => (
        <span
          key={ember.id}
          className="absolute bottom-0 rounded-full bg-ember"
          style={{
            left: ember.left,
            width: `${ember.size}px`,
            height: `${ember.size}px`,
            opacity: ember.opacity,
            boxShadow: '0 0 8px 1px rgba(253, 216, 53, 0.55)',
            '--drift': ember.drift,
            animation: `ember ${ember.duration} linear ${ember.delay} infinite`,
          }}
        />
      ))}
    </div>
  )
}

/** Halo de fuego difuso reutilizable. */
export function FireGlow({ className = '' }) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.6, ease: 'easeOut' }}
      className={`pointer-events-none absolute -z-10 rounded-full blur-[90px] ${className}`}
    />
  )
}
