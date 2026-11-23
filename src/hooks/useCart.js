import { useCallback, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'alitas-barrio-cart-v1'

const readStoredCart = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (item) => item && typeof item.id === 'string' && Number(item.qty) > 0,
    )
  } catch {
    return []
  }
}

/**
 * Carrito de compras con persistencia en localStorage.
 * Cada ítem: { id, name, price, image, qty }
 */
export const useCart = () => {
  const [items, setItems] = useState(readStoredCart)
  const [lastAdded, setLastAdded] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* almacenamiento no disponible (modo privado) */
    }
  }, [items])

  const addItem = useCallback((product) => {
    setItems((current) => {
      const found = current.find((item) => item.id === product.id)
      if (found) {
        return current.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        )
      }
      return [
        ...current,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: 1,
        },
      ]
    })
    setLastAdded(product.id)
  }, [])

  const increment = useCallback((id) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item,
      ),
    )
  }, [])

  const decrement = useCallback((id) => {
    setItems((current) =>
      current
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0),
    )
  }, [])

  const removeItem = useCallback((id) => {
    setItems((current) => current.filter((item) => item.id !== id))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const { count, total } = useMemo(
    () => ({
      count: items.reduce((sum, item) => sum + item.qty, 0),
      total: items.reduce((sum, item) => sum + item.qty * item.price, 0),
    }),
    [items],
  )

  useEffect(() => {
    if (!lastAdded) return
    const timer = setTimeout(() => setLastAdded(null), 1200)
    return () => clearTimeout(timer)
  }, [lastAdded])

  const quantityOf = useCallback(
    (id) => items.find((item) => item.id === id)?.qty ?? 0,
    [items],
  )

  return {
    items,
    count,
    total,
    addItem,
    increment,
    decrement,
    removeItem,
    clearCart,
    quantityOf,
    lastAdded,
  }
}
