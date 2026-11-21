# Panadería Alviña — Sitio web (v1)

Sitio one-page para Panadería Alviña · Leandro Alviña 395, Trujillo 13001, Perú.

## Archivo principal
- `index.html` — **archivo único autocontenido** (CSS, JS, fuentes y todas las imágenes incrustadas). Basta arrastrarlo a un navegador o subirlo a cualquier hosting estático.

## Estructura del código (fuentes)
- `src/index.html` — estructura HTML y SVG (logo, mapas, iconos, secciones).
- `src/styles.css` — design system: paleta, tipografías, botones, tarjetas, animaciones, responsive.
- `src/script.js` — catálogo (24 productos), filtros, carrito, WhatsApp, reseñas, animaciones.
- `assets/` — fotografías optimizadas (AI-generated + fotografía real).
- `fonts/` — Playfair Display + Plus Jakarta Sans (variable woff2, fuentes locales).
- `build.py` — regenera el archivo final incrustando CSS/JS/fuentes/imágenes.

## Reconstruir
```
python3 build.py
```

## Personalización rápida
- **Número de WhatsApp** (`+51 935 466 580`): variable `WA_NUMBER` en `src/script.js` y texto mostrado en la sección de contacto (`src/index.html`).
- **Productos / precios / categorías**: array `PRODUCTS` en `src/script.js` (cat: pan, desayunos, bolleria, postres, bebidas).
- **Reseñas**: array `REVIEWERS` en `src/script.js`.
- **Horarios**: lógica de `updateStatus()` en `src/script.js` (Lun–Sáb 6:30–21:30, Dom 7:00–21:00).
- **Dirección/horario en la página**: secciones `#ubicacion` en `src/index.html`.
- **Mapa estilizado**: SVG `.map-svg` en `src/index.html`. El botón «Cómo llegar con Google Maps» abre la ruta real desde el navegador.
- **Colores**: variables `:root` en `src/styles.css` (#8B4513, #A0522D, #FDF8F2, #F4E8D8, #D4AF37, #E09F3E, #2C1E16, #5C4738).
- **Facebook**: enlace en footer y menú social.

## Notas
- Las imágenes generadas por IA (panadería/historial) y las fotografías reales provienen de fuentes públicas con fines de demostración. Reemplázalas con tu propia marca.
- El mapa es una ilustración estilizada, no un embed de Google Maps (para funcionar sin conexión y consistencia visual).
- El indicador «Horno encendido» se calcula en tiempo real según la hora local de Trujillo (zona America/Lima).
