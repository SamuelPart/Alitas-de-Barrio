# 🔥 Alitas Barrio — Carta Digital Premium & Pedidos por WhatsApp

> **Un sabor diferente, una experiencia única.**
> Carta digital premium y sistema de pedidos por WhatsApp para **Alitas Barrio** (Alto Trujillo, Perú).

![Alitas Barrio](public/img/og-image.jpg)

---

## 📍 Datos del negocio

| Dato | Valor |
| --- | --- |
| Nombre | **Alitas Barrio** |
| Eslogan | Un sabor diferente, una experiencia única |
| Ubicación | Mz. E Lt. 12, Barrio 3A, Alto Trujillo, Perú |
| Horario (local y delivery) | **6:00 PM – 11:45 PM** |
| WhatsApp de pedidos | **907 634 061** (`+51 907 634 061`) |
| Moneda | Soles (S/) |

---

## ✨ Características

- **Diseño gastrobar/brasa premium**: fondo `#0A0A0A`, tarjetas glassmorphism oscuras (`#161616` con bordes `#2A2A2A`), acentos en degradado fuego (`#E53935 → #FB8C00`) y detalles dorados (`#FDD835`).
- **Animaciones con Framer Motion**
  - Entrada escalonada (*stagger children*) y *scroll reveal* (`whileInView`) en las tarjetas de productos.
  - Pestañas de categorías filtrables con transición `layoutId` (Todos / Alitas y Combos / Pollo a la Brasa / Cócteles).
  - Microinteracciones táctiles `whileTap={{ scale: 0.95 }}` en todos los botones `+` y `-`.
  - Drawer deslizable desde abajo en móviles con `AnimatePresence`.
  - Botón flotante para volver arriba.
- **Hero compacto**: logo, badge animado de horario (*Delivery: 6:00 PM - 11:45 PM*), dirección exacta y **búsqueda instantánea** (tolerante a tildes y mayúsculas).
- **Composición "ingredient stack"** en el hero: plato central con satélites (alitas, papas, cóctel) que se ensamblan con spring y se mueven con parallax al hacer scroll.
- **Arma tu Combo** (`#arma-tu-combo`): armador interactivo en 3 pasos (Base → Acompañamiento → Cóctel). Cada elección recompone la pila de capas con `AnimatePresence`/`layout` y el total se actualiza animado. El combo se agrega directo al carrito y al mensaje de WhatsApp.
- **Mosaico editorial** con parallax sutil por imagen.
- **Fotografía retocada con IA** manteniendo los platos reales: misma composición y ángulo, con limpieza de texto/gráficos del fondo, iluminación de estudio y contraste mejorados.
- **Carrito completo**
  - Barra flotante inferior con blur: contador de ítems, total en Soles y botón **Ver Pedido**.
  - Drawer para modificar cantidades, elegir **Delivery (6:00 PM - 11:45 PM)** o **Recojo en local**, ingresar **Nombre**, **Dirección/Referencia en Alto Trujillo** y **Método de pago** (*Yape / Plin* o *Efectivo*).
  - Persistencia del pedido en `localStorage`.
  - Estado de **abierto/cerrado** calculado automáticamente en hora de Perú (UTC-5).
- **Checkout por WhatsApp**: genera el mensaje formateado con emojis (productos, cantidades, tipo de entrega, dirección, pago y total) y abre `https://wa.me/51907634061?text=…`.
- **SEO**: metadatos Open Graph/Twitter, `favicon`, imagen de previsualización y datos estructurados `Restaurant` (Schema.org).

---

## 🧰 Stack

| Tecnología | Uso |
| --- | --- |
| [React 18](https://react.dev/) | UI |
| [Vite 6](https://vite.dev/) | Bundler / dev server |
| [Tailwind CSS 4](https://tailwindcss.com/) (`@tailwindcss/vite`) | Estilos |
| [Framer Motion 11](https://www.framer.com/motion/) | Animaciones |
| [Lucide React](https://lucide.dev/) | Iconos |

---

## 🚀 Uso local

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera /dist
npm run preview  # sirve el build de producción
```

Requiere **Node.js 18+** (recomendado 20/22).

---

## ☁️ Despliegue en Vercel

El proyecto ya incluye `vercel.json`, por lo que la detección es automática:

1. Sube el repositorio a GitHub.
2. En [vercel.com](https://vercel.com) → **Add New… → Project** → importa el repo.
3. Framework preset: **Vite** · Build Command: `npm run build` · Output Directory: `dist`.
4. **Deploy**. ✅

También desde la CLI:

```bash
npm i -g vercel
vercel --prod
```

---

## 🗂️ Estructura

```
├── public/
│   └── img/
│       ├── logo.png            # Logo de Alitas Barrio (fondo transparente)
│       ├── alitas-chaufa.jpg   # Alitas + Chaufa + Papas
│       ├── promo-alitas.jpg    # Combo Alitas + Makis + Papas
│       ├── pollo-brasa.jpg     # Pollo a la brasa
│       ├── pina-colada.jpg     # Piña Colada Especial
│       ├── coctel-azul.jpg     # Laguna Azul
│       ├── hero-bg.jpg         # Fondo del hero
│       ├── local.jpg           # Ambiente del local
│       ├── og-image.jpg        # Imagen para redes sociales
│       └── favicon.png
├── src/
│   ├── components/
│   │   ├── TopBar.jsx          # Barra fija superior (logo, teléfono, pedido)
│   │   ├── Hero.jsx            # Encabezado hero + búsqueda
│   │   ├── CategoryTabs.jsx    # Pestañas con layoutId
│   │   ├── ProductCard.jsx     # Tarjeta de producto + estados vacíos
│   │   ├── QuantityStepper.jsx # Botones + / - con microinteracciones
│   │   ├── CartBar.jsx         # Barra flotante inferior
│   │   ├── OrderDrawer.jsx     # Drawer del pedido + checkout
│   │   ├── ScrollTopButton.jsx # Volver arriba
│   │   ├── WhatsappFab.jsx     # Acceso rápido a WhatsApp
│   │   ├── ComboBuilder.jsx    # Arma tu Combo (ingredient stack interactivo)
│   │   ├── IngredientStack.jsx # Composición del hero con parallax
│   │   ├── Showcase.jsx        # Mosaico editorial con parallax
│   │   ├── Sections.jsx        # Valores, cómo pedir, info y footer
│   │   └── Embers.jsx          # Partículas de brasa
│   ├── data/
│   │   ├── menu.js             # ⚙️ Catálogo y precios editables
│   │   ├── builder.js          # ⚙️ Opciones de "Arma tu Combo"
│   │   └── business.js         # ⚙️ Datos del negocio
│   ├── hooks/
│   │   ├── useCart.js          # Carrito + localStorage
│   │   ├── useMediaQuery.js
│   │   └── useUi.js            # Bloqueo de scroll / tecla Escape
│   ├── utils/
│   │   ├── format.js           # Precios y normalización de texto
│   │   └── whatsapp.js         # Generador del mensaje de WhatsApp
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── vercel.json
└── package.json
```

---

## ✏️ Cómo editar la carta y los precios

Todo el catálogo vive en **`src/data/menu.js`**:

```js
{
  id: 'alitas-chaufa',
  name: 'Alitas + Chaufa + Papas Fritas',
  category: 'alitas',            // 'alitas' | 'pollo' | 'cocteles'
  image: '/img/alitas-chaufa.jpg',
  description: 'Jugosas alitas doradas acompañadas de arroz chaufa y papas fritas crocantes',
  price: 18.0,                   // 👈 cambia el precio aquí (Soles)
  badge: 'Más pedido',           // opcional
  available: true,               // false = no se muestra
}
```

Para reemplazar una foto, sube el archivo a `public/img/` con el mismo nombre
(o actualiza la ruta `image`). Se recomienda **900 × 675 px** (proporción 4:3), JPG optimizado.

Los datos del negocio (teléfono, dirección, horario) están en **`src/data/business.js`**.
Al cambiar `phoneRaw` (`51907634061`) y `phoneDisplay` (`907 634 061`) se actualizan
todos los enlaces y textos del sitio.

---

## 📱 Carta actual

| Producto | Categoría | Precio |
| --- | --- | --- |
| Alitas + Chaufa + Papas Fritas | Alitas y Combos | S/ 18.00 |
| Combo Alitas + Makis + Papas | Alitas y Combos | S/ 25.00 |
| Pollo a la Brasa 1/4 con Papas | Pollo a la Brasa | S/ 16.00 |
| Pollo a la Brasa Entero Familiar | Pollo a la Brasa | S/ 52.00 |
| Piña Colada Especial | Cócteles | S/ 12.00 |
| Laguna Azul | Cócteles | S/ 12.00 |

> Los precios mostrados en el sitio son **referenciales** y pueden variar según disponibilidad del día.

---

## 💬 Ejemplo del mensaje enviado por WhatsApp

```
🔥 *NUEVO PEDIDO — ALITAS BARRIO* 🔥
_Un sabor diferente, una experiencia única_

🛒 *MI PEDIDO*
1. Alitas + Chaufa + Papas Fritas
   ✕ 2  —  S/ 36.00
2. Laguna Azul
   ✕ 1  —  S/ 12.00

💰 *TOTAL A PAGAR:* S/ 48.00

🛵 *TIPO DE ENTREGA:* Delivery (6:00 PM - 11:45 PM)
👤 *NOMBRE:* Ana
📍 *DIRECCIÓN / REFERENCIA:* Mz. F. Lt. 8, Barrio 3A
💳 *MÉTODO DE PAGO:* Yape / Plin

📞 *CONTACTO:* 907 634 061

¡Gracias por tu pedido! 🍗🍟✨
```

---

## 📄 Licencia

Proyecto privado desarrollado para **Alitas Barrio** · Alto Trujillo, Trujillo, Perú.
