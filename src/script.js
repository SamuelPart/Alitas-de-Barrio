/* ════════════════════════════════════════════════════════════
   Panadería Alviña — Interactive experience
   Vanilla JS · sin dependencias · todo inline
════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  window.__IMGS__ = window.__IMGS__ || {};
  const IMGS = window.__IMGS__;
  const WA_NUMBER = '51935466580';

  /* ═══════════ CARTA (24 productos) ═══════════ */
  const PRODUCTS = [
    // Panadería Artesanal
    { id: 'pan-ejema',   cat: 'pan', img: 'pan-ejema',          name: 'Pan de Yema Trujillano',   desc: 'Pan artesano con costra dorada y yema brillante — el homenaje a nuestra tradición de desayunos.', price: 6.50,  tag: 'Especialidad' },
    { id: 'pan-frances', cat: 'pan', img: 'pan-frances',        name: 'Pan Francés Crujiente',    desc: 'Tiras esbeltas y crujientes de trigo artesanal. Ideal para sándwiches y desayunos.', price: 3.50, tag: 'Más vendido' },
    { id: 'ciabatta',    cat: 'pan', img: 'ciabatta',           name: 'Ciabatta Artesanal',       desc: 'Masa aireada con costra rugosa y crujiente, perfecta para sándwiches generosos.', price: 9.00 },
    { id: 'hogaza',      cat: 'pan', img: 'hogaza',             name: 'Pan de Masa Madre (Hogaza)', desc: 'Fermentación natural de 24 horas y corteza dura — el pan de la abuela.', price: 22.00, tag: 'Masa madre' },
    { id: 'pan-piso',    cat: 'pan', img: 'pan-piso',           name: 'Pan de Piso',               desc: 'Aplanado y esponjoso, el clásico que acompaña cada desayuno criollo.', price: 3.00 },
    { id: 'paneton',     cat: 'pan', img: 'paneton',            name: 'Panetón Artesanal Alviña', desc: 'Edición especial de corteza dorado oscuro, con yema y frutas secas seleccionadas.', price: 18.00, tag: 'Edición especial', dark: true },
    // Desayunos y Sándwiches
    { id: 'desayuno-criollo', cat: 'desayunos', img: 'desayuno-criollo', name: 'Desayuno Criollo Trujillano', desc: 'Chicharrón de cerdo, tamal criollo, camote frito, salsa criolla y pan francés.', price: 15.00, tag: 'Especialidad' },
    { id: 'pan-pavo',    cat: 'desayunos', img: 'pan-pavo',       name: 'Pan con Pavo al Horno',    desc: 'Pavo al horno sazonado con tomate y lechuga, entre dos capas de pan artesanal.', price: 12.50 },
    { id: 'pan-chancho', cat: 'desayunos', img: 'pan-chancho',    name: 'Pan con Chancho al Horno', desc: 'Chancho al horno jugoso con salsa de cerveza y cebolla morada.', price: 13.00, tag: 'Recomendado' },
    { id: 'triple',      cat: 'desayunos', img: 'triple',         name: 'Sándwich Triple Clásico',   desc: 'Pollo, jamón, queso y palta entre tres capas de pan artesanal.', price: 11.00 },
    // Bollería y Facturas
    { id: 'facturas',    cat: 'bolleria', img: 'facturas',        name: 'Facturas Argentinas Surtidas', desc: 'Facturas glaseadas, torcidas y surtidas, recién horneadas — a pedir por bandejas.', price: 8.00 },
    { id: 'medialunas',  cat: 'bolleria', img: 'medialunas',      name: 'Medialunas de Mantequilla', desc: 'Medialunas crujientes rellenas de mantequilla de la casa, aroma a canela.', price: 3.50 },
    { id: 'croissant-relleno', cat: 'bolleria', img: 'croissant-relleno', name: 'Croissants Rellenos',  desc: 'Croissants artesanales con crema de chocolate y dulce de leche.', price: 5.50 },
    { id: 'rollos-canela', cat: 'bolleria', img: 'rollos-canela', name: 'Rollos de Canela',         desc: 'Rollos en espiral con canela, mantequilla y glaseado de mantequilla.', price: 4.50 },
    // Pastelería y Postres
    { id: 'torta',       cat: 'postres', img: 'torta',            name: 'Tortas de la Casa',        desc: 'Chocolate húmedo, tres leches o selva negra — por porción o entero.', price: 7.00, tag: 'Personalizado' },
    { id: 'cupcakes',    cat: 'postres', img: 'cupcakes',         name: 'Cupcakes Artesanales',     desc: 'Cupcakes pequeños con crema batida de chocolate y mantequilla de la casa.', price: 5.00 },
    { id: 'donas',       cat: 'postres', img: 'donas',            name: 'Donas Glaseadas',          desc: 'Donas doradas con glaseado crujiente de azúcar – ni frío ni caliente, recién salidas.', price: 3.50 },
    { id: 'piononos',    cat: 'postres', img: 'piononos',         name: 'Piononos y Alfajores',     desc: 'Pionono cremoso y alfajores rellenos de dulce de leche.', price: 6.00 },
    // Cafetería y Bebidas
    { id: 'cafe-pasado', cat: 'bebidas', img: 'cafe-pasado',      name: 'Café Pasado Trujillano',  desc: 'Café pasado fuerte, con buena crema — el verdadero sabor de Trujillo.', price: 6.00, tag: 'Tradición', dark: true },
    { id: 'espresso',    cat: 'bebidas', img: 'espresso',         name: 'Espresso',                 desc: 'Taza pequeña de espresso con crema aterciopelada.', price: 5.00 },
    { id: 'cappuccino',  cat: 'bebidas', img: 'cappuccino',       name: 'Cappuccino',               desc: 'Cappuccino con crema densa y un toque de cacao.', price: 6.50 },
    { id: 'latte',       cat: 'bebidas', img: 'latte',            name: 'Latte',                    desc: 'Latte al gusto, con leche espumosa y relieve de café — caliente o helicoptero.', price: 7.00 },
    { id: 'jugos',       cat: 'bebidas', img: 'jugos',            name: 'Jugo Natural de Estación', desc: 'Frutas de estación exprimidas al momento — naranja, mango y más.', price: 8.00, tag: '100% Natural' },
    { id: 'chocolate',   cat: 'bebidas', img: 'chocolate',        name: 'Chocolate Caliente',       desc: 'Chocolate artesanal con crema y un toque de canela.', price: 7.00 },
  ];

  const REVIEWERS = [
    { initials: 'MP', name: 'María Peralta', place: 'Trujillo Centro',      initials2: '', tag: 'Compra frecuente', text: 'La casa olía a pan de yema la primera vez… luego pedí su desayuno criollo y cambió mi mañana.' },
    { initials: 'JR', name: 'Jorge Ramírez', place: 'Virú',                 tag: 'Café pasado',       text: 'Limpieza impecable, atención amable y ese olor a leche y mantequilla. Mi café pasado es ya cita obligatoria.' },
    { initials: 'AL', name: 'Ana Lay',       place: 'La Victoria',          tag: 'Masa madre',        text: 'El mejor pan de masa madre de Trujillo. Siempre con calma, siempre esponjoso y lleno de sabor.' },
    { initials: 'CS', name: 'Carmen Salazar', place: 'Huanchaco',           tag: 'Caja de desayuno',  text: 'Pedimos una caja de desayuno para mi familia — llegó impecable, caliente y delicioso.' },
    { initials: 'DM', name: 'Diego Paredes', place: 'Trujillo Centro',      tag: 'Desayuno criollo',  text: 'La calma que se siente en el salón: luz cálida, café pasado y un sándwich triple que abraza.' },
    { initials: 'VP', name: 'Valeria Pinto', place: 'El Porvenir',          tag: 'Lealtad de años',   text: 'El café pasado con ese final amargo… sí, vale la pena. Vuelvo cada mañana como los domingos de mi abuela.' },
  ];

  const CAT_LABELS = {
    todos: 'Todos', pan: 'Panadería Artesanal', desayunos: 'Desayunos y Sándwiches',
    bolleria: 'Bollería y Facturas', postres: 'Pastelería y Postres', bebidas: 'Cafetería y Bebidas',
  };

  /* ═══════════ HELPERS ═══════════ */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const fmt = n => 'S/ ' + n.toFixed(2);
  const escAttr = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

  function el(html) {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }

  const STORAGE_KEY = 'alvina_cart_v1';

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const obj = JSON.parse(raw);
      if (!obj || typeof obj !== 'object') return null;
      return obj;
    } catch (e) { return null; }
  }
  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, modality, cartName, address }));
    } catch (e) { /* sin almacenamiento */ }
  }

  /* ═══════════ ESTADO ═══════════ */
  let cart = {}; // id -> qty
  let modality = 'delivery';
  let cartName = '';
  let address = '';

  const stored = loadState();
  if (stored) {
    cart = stored.cart || {};
    modality = stored.modality || 'delivery';
    cartName = stored.cartName || '';
    address = stored.address || '';
  }

  /* ═══════════ DOM REFS ═══════════ */
  const grid = $('#productsGrid');
  const filterBar = $('#filterBar');
  const cartBtn = $('#cartBtn');
  const cartBadge = $('#cartBadge');
  const cartDrawer = $('#cartDrawer');
  const cartOverlay = $('#cartOverlay');
  const cartItems = $('#cartItems');
  const cartCountLabel = $('#cartCountLabel');
  const subtotalEl = $('#cartSubtotal');
  const shippingEl = $('#cartShipping');
  const cartTotal = $('#cartTotal');
  const whatsappSend = $('#whatsappSend');
  const cartClose = $('#cartClose');
  const toastWrap = $('#toastWrap');
  const header = $('#siteHeader');
  const scrollProgress = $('#scrollProgress');
  const menuToggle = $('#menuToggle');
  const mobileMenu = $('#mobileMenu');
  const statusChip = $('#statusChip');
  const statusText = $('#statusText');
  const hero = $('#inicio');

  /* ═══════════ RENDER CARTA ═══════════ */
  function renderProducts(filter) {
    const list = filter === 'todos' ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter);
    grid.innerHTML = '';
    list.forEach((p, idx) => {
      const img = IMGS[p.img] || '';
      const imgClass = p.id === 'pan-pavo' ? ' img-pavo' : '';
      const card = el(`
        <article class="product-card reveal" style="transition-delay:${Math.min(idx * 0.05, 0.4)}s">
          <div class="product-media">
            <img class="${imgClass.trim()}" src="${img}" alt="${escAttr(p.name)}" loading="lazy" width="800" height="560">
            ${p.tag ? `<span class="product-tag${p.dark ? ' tag-dark' : ''}">${escAttr(p.tag)}</span>` : ''}
            <span class="product-cat">${CAT_LABELS[p.cat]}</span>
          </div>
          <div class="product-body">
            <h3>${escAttr(p.name)}</h3>
            <p>${escAttr(p.desc)}</p>
            <div class="product-foot">
              <span class="price"><small>S/</small>${p.price.toFixed(2)}</span>
              <button class="add-btn" data-add="${p.id}" aria-label="Agregar ${escAttr(p.name)} al pedido">
                <svg class="icon" viewBox="0 0 24 24" style="color:currentColor"><use href="#i-plus"/></svg>
                Agregar
              </button>
            </div>
          </div>
        </article>`);
      grid.appendChild(card);
    });
    observeReveals(grid);
    bindCardButtons();
  }

  function bindCardButtons() {
    $$('.add-btn', grid).forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.add;
        cart[id] = (cart[id] || 0) + 1;
        saveState();
        updateCartUI();
        toast(`<strong>${PRODUCTS.find(p => p.id === id).name}</strong>&nbsp;añadido al pedido`);
        popBadge();
        btn.classList.add('is-added');
        btn.innerHTML = '<svg class="icon" viewBox="0 0 24 24" style="color:currentColor"><use href="#i-check"/></svg> Agregado';
        setTimeout(() => {
          btn.classList.remove('is-added');
          btn.innerHTML = '<svg class="icon" viewBox="0 0 24 24" style="color:currentColor"><use href="#i-plus"/></svg> Agregar';
        }, 1400);
      });
    });
  }

  /* ═══════════ FILTROS ═══════════ */
  let activeCat = 'todos';
  function setFilter(cat, scroll) {
    activeCat = cat;
    $$('.pill', filterBar).forEach(b => {
      const on = b.dataset.cat === cat;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    renderProducts(cat);
    if (scroll) {
      $('#carta').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  filterBar.addEventListener('click', e => {
    const btn = e.target.closest('.pill');
    if (!btn) return;
    setFilter(btn.dataset.cat, false);
  });

  /* enlaces en redes de filtrado (navbar + footer) */
  function bindNavFilters() {
    $$('[data-nav-filter]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        setFilter(a.dataset.navFilter, true);
        toast(`Mostrando <strong>${CAT_LABELS[a.dataset.navFilter]}</strong>`);
        closeMobileMenu();
      });
    });
  }

  /* ═══════════ CARRITO ═══════════ */
  const tax = 0; // no hay impuestos locales de delivery puro en la carta
  const SHIPPING_DELIVERY = 3.00;

  function cartCount() {
    return Object.values(cart).reduce((a, b) => a + b, 0);
  }
  function cartSubtotal() {
    return Object.entries(cart).reduce((sum, [id, qty]) => {
      const p = PRODUCTS.find(p => p.id === id);
      return p ? sum + p.price * qty : sum;
    }, 0);
  }
  function cartShipping() {
    return cartCount() === 0 ? 0 : (modality === 'delivery' ? SHIPPING_DELIVERY : 0);
  }
  function cartTotalValue() {
    return cartSubtotal() + cartShipping() + tax;
  }

  function updateCartUI() {
    const n = cartCount();
    cartBadge.textContent = n;
    cartBadge.style.display = n ? 'inline-flex' : 'none';
    cartCountLabel.textContent = '(' + n + ')';
    subtotalEl.textContent = fmt(cartSubtotal());
    shippingEl.textContent = fmt(cartShipping());
    cartTotal.textContent = fmt(cartTotalValue());
    whatsappSend.disabled = n === 0;

    // render items
    const entries = Object.entries(cart).filter(([, q]) => q > 0);
    if (entries.length === 0) {
      cartItems.innerHTML = '';
      const empty = el(`
        <div class="cart-empty">
          <svg viewBox="0 0 24 24" style="color:currentColor" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h2l2.4 11.2A2 2 0 0 0 9.4 17h7.8a2 2 0 0 0 2-1.5L20.5 8H7"/><circle cx="10.5" cy="20.6" r="1.3"/><circle cx="17.5" cy="20.6" r="1.3"/></svg>
          <h3>Tu pedido está vacío</h3>
          <p>Elige panes recién horneados y café de la casa para empezar.</p>
          <button class="btn btn-primary" type="button" data-close-cart>Ver la carta</button>
        </div>`);
      cartItems.appendChild(empty);
      const b = empty.querySelector('[data-close-cart]');
      if (b) b.addEventListener('click', closeCart);
      return;
    }
    cartItems.innerHTML = '';
    entries.forEach(([id, qty]) => {
      const p = PRODUCTS.find(p => p.id === id);
      if (!p) return;
      const item = el(`
        <div class="cart-item" data-id="${p.id}">
          <img src="${IMGS[p.img] || ''}" alt="" width="64" height="64">
          <h4>${escAttr(p.name)}</h4>
          <div class="qty-row">
            <button class="qty-btn" data-dec aria-label="Quitar uno"><svg class="icon" viewBox="0 0 24 24" style="color:currentColor"><use href="#i-minus"/></svg></button>
            <span class="qty-value">${qty}</span>
            <button class="qty-btn" data-inc aria-label="Agregar uno"><svg class="icon" viewBox="0 0 24 24" style="color:currentColor"><use href="#i-plus"/></svg></button>
          </div>
          <span class="cart-item-price">${fmt(p.price * qty)}</span>
          <button class="cart-item-remove" data-remove aria-label="Eliminar ${escAttr(p.name)} del pedido">
            <svg class="icon" viewBox="0 0 24 24" style="color:currentColor"><use href="#i-trash"/></svg>
          </button>
        </div>`);
      cartItems.appendChild(item);
    });
  }

  cartItems.addEventListener('click', e => {
    const item = e.target.closest('.cart-item');
    if (!item) return;
    const id = item.dataset.id;
    const qty = cart[id] || 0;
    if (e.target.closest('[data-inc]')) cart[id] = qty + 1;
    else if (e.target.closest('[data-dec]')) {
      if (qty <= 1) delete cart[id]; else cart[id] = qty - 1;
    } else if (e.target.closest('[data-remove]')) delete cart[id];
    else return;
    saveState();
    updateCartUI();
  });

  function popBadge() {
    cartBadge.classList.add('pop');
    setTimeout(() => cartBadge.classList.remove('pop'), 350);
  }

  /* ═══════════ DRAWER ═══════════ */
  let lastFocus = null;
  function openCart() {
    lastFocus = document.activeElement;
    cartDrawer.classList.add('is-open');
    cartOverlay.classList.add('is-open');
    cartDrawer.setAttribute('aria-hidden', 'false');
    cartBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    $('#cartName').focus();
  }
  function closeCart() {
    cartDrawer.classList.remove('is-open');
    cartOverlay.classList.remove('is-open');
    cartDrawer.setAttribute('aria-hidden', 'true');
    cartBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    lastFocus = null;
  }

  cartBtn.addEventListener('click', openCart);
  cartClose.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (cartDrawer.classList.contains('is-open')) closeCart();
      closeMobileMenu();
    }
  });

  /* modality radios */
  const addrField = $('.cart-address-field');
  $$('input[name="modality"]').forEach(r => r.addEventListener('change', () => {
    modality = r.value;
    if (addrField) addrField.style.display = modality === 'delivery' ? '' : 'none';
    saveState();
    updateCartUI();
    if (modality === 'recojo') {
      toast('Recojo en Leandro Alviña — sin costos de envío');
    }
  }));

  /* nombre y dirección */
  $('#cartName').addEventListener('input', e => { cartName = e.target.value.trim(); saveState(); });

  const addrInput = $('#cartAddr');
  addrInput.addEventListener('input', e => { address = e.target.value.trim(); saveState(); });

  function restoreFormValues() {
    $('#cartName').value = cartName;
    addrInput.value = address;
    $$('input[name="modality"]').forEach(r => { r.checked = r.value === modality; });
    if (addrField) addrField.style.display = modality === 'delivery' ? '' : 'none';
  }

  /* WhatsApp */
  function buildWhatsAppMessage() {
    const lines = ['¡Hola Panadería Alviña! 👋 Quiero hacer un pedido:', ''];
    Object.entries(cart).filter(([, q]) => q > 0).forEach(([id, qty]) => {
      const p = PRODUCTS.find(p => p.id === id);
      if (p) lines.push(`• ${qty}× ${p.name} — ${fmt(p.price * qty)}`);
    });
    lines.push('');
    if (modality === 'delivery') {
      lines.push('🚚 Modalidad: Delivery en Trujillo');
      lines.push(address ? `📍 Dirección: ${address}` : '📍 Dirección: _(indicar)_');
    } else {
      lines.push('🏪 Modalidad: Recojo en Leandro Alviña 395');
    }
    if (cartName) lines.push(`👤 Nombre: ${cartName}`);
    lines.push('');
    lines.push(`💰 Total: ${fmt(cartTotalValue())}`);
    lines.push('¡Gracias por su atención! 🧡');
    return lines.join('\n');
  }

  whatsappSend.addEventListener('click', () => {
    if (cartCount() === 0) return;
    const msg = buildWhatsAppMessage();
    const url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg);
    window.open(url, '_blank', 'noopener');
    toast('Abriendo WhatsApp con tu pedido…');
  });

  /* ═══════════ FORM ESPECIALES ═══════════ */
  $('#specialsForm').addEventListener('submit', e => {
    e.preventDefault();
    const name = $('#spName').value.trim();
    const phone = $('#spPhone').value.trim();
    const type = $('#spType').value;
    const qty = $('#spQty').value.trim();
    const note = $('#spNote').value.trim();
    if (!name || !note) {
      toast('Por favor completa tu nombre y los detalles del encargo', true);
      $('#spName').focus();
      return;
    }
    const lines = [
      '¡Hola Panadería Alviña! 👋 Quiero cotizar un pedido especial:',
      '',
      `👤 Nombre: ${name}`,
      phone ? `📞 Teléfono: ${phone}` : null,
      `🎯 Tipo: ${type}`,
      qty ? `👥 Cantidad aproximada: ${qty}` : null,
      '',
      `📝 Detalles: ${note}`,
      '',
      '¡Gracias por su atención! 🧡',
    ].filter(Boolean).join('\n');
    const url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(lines);
    window.open(url, '_blank', 'noopener');
    e.target.reset();
    toast('Abre WhatsApp con tu cotización…');
  });

  /* ═══════════ TOASTS ═══════════ */
  function toast(html, isError) {
    const t = el(`<div class="toast${isError ? ' toast-err' : ''}"><svg class="icon" viewBox="0 0 24 24" style="color:currentColor"><use href="#i-${isError ? 'x' : 'check'}"/></svg><span>${html}</span></div>`);
    toastWrap.appendChild(t);
    setTimeout(() => {
      t.classList.add('is-leaving');
      setTimeout(() => t.remove(), 320);
    }, 2600);
  }

  /* ═══════════ OPEN / CLOSE INDICATOR ═══════════ */
  function updateStatus() {
    try {
      const now = new Date();
      const weekday = new Intl.DateTimeFormat('es-PE', { weekday: 'long', timeZone: 'America/Lima' }).format(now);
      const hm = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Lima' }).format(now);
      const [hh, mm] = hm.split(':').map(Number);
      const minutes = hh * 60 + mm;
      const isSunday = /domingo/i.test(weekday);
      const openMin = isSunday ? 7 * 60 : 6 * 60 + 30;
      const closeMin = isSunday ? 21 * 60 : 21 * 60 + 30;
      const open = minutes >= openMin && minutes < closeMin;
      if (statusChip) statusChip.classList.toggle('is-closed', !open);
      if (statusText) {
        statusText.textContent = open
          ? 'Abierto ahora · Horno encendido'
          : (minutes < openMin
            ? `Cerrado · Apertura a las ${isSunday ? '7:00 a.m.' : '6:30 a.m.'}`
            : 'Cerrado · Apertura mañana a las 6:30 a.m.');
      }
      const heroStatusText = $('#heroStatusText');
      if (heroStatusText) {
        heroStatusText.textContent = open ? 'Abierto ahora · Horno encendido' : 'Cerrado · Huéspedes bienvenidos';
        const badge = $('#heroStatus');
        if (badge) badge.classList.toggle('is-closed', !open);
      }
    } catch (e) { /* idiomas desconocidos */ }
  }
  updateStatus();
  setInterval(updateStatus, 30000);

  /* ═══════════ ANIMATE COUNTERS ═══════════ */
  function animateCounters() {
    const els = $$('[data-count]');
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        const target = parseFloat(en.target.dataset.count);
        const decimals = parseInt(en.target.dataset.decimals || '0', 10);
        const suffix = en.target.dataset.suffix || '';
        const dur = 1400;
        const start = performance.now();
        const step = now => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          en.target.textContent = (target * eased).toFixed(decimals) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.55 });
    els.forEach(el => io.observe(el));
  }

  /* ═══════════ REVEAL ON SCROLL ═══════════ */
  const revealIO = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        revealIO.unobserve(en.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  function observeReveals(root) {
    $$('.reveal', root || document).forEach(el => revealIO.observe(el));
  }

  /* ═══════════ ACTIVE NAV + SCROLL ═══════════ */
  const navLinks = $$('[data-sec]');
  const sections = ['inicio', 'historia', 'carta', 'pedidos', 'resenas', 'ubicacion'].map(id => document.getElementById(id)).filter(Boolean);

  function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    header.classList.toggle('is-scrolled', y > 10);
    let current = 'inicio';
    sections.forEach(s => {
      if (s.getBoundingClientRect().top <= 160) current = s.id;
    });
    // also map desayunos nav link to carta
    navLinks.forEach(a => {
      const id = a.dataset.sec;
      const active = id === current || (id === 'desayunos' && current === 'carta');
      a.classList.toggle('is-active', !!active);
    });
  }
  window.addEventListener('scroll', () => requestAnimationFrame(onScroll), { passive: true });
  onScroll();

  /* ═══════════ MOBILE MENU ═══════════ */
  function closeMobileMenu() {
    mobileMenu.classList.remove('is-open');
    menuToggle.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
  menuToggle.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('is-open');
    menuToggle.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  $$('.mobile-menu a').forEach(a => a.addEventListener('click', () => closeMobileMenu()));

  /* ═══════════ TESTIMONIALS ═══════════ */
  function renderTestimonials() {
    const wrap = $('#testimonials');
    wrap.innerHTML = '';
    REVIEWERS.forEach((r, i) => {
      const card = el(`
        <figure class="testimonial reveal" style="transition-delay:${Math.min(i * 0.06, 0.45)}s">
          <figcaption class="t-head">
            <span class="t-avatar" aria-hidden="true">${r.initials}</span>
            <span class="t-meta"><strong>${r.name}</strong><small>${r.place}</small></span>
          </figcaption>
          <div class="t-stars" aria-label="5 de 5 estrellas">${'<svg class="icon fill" viewBox="0 0 24 24"><use href="#i-star"/></svg>'.repeat(5)}</div>
          <blockquote class="t-text">“${r.text}”</blockquote>
          <span class="t-tag">${r.tag}</span>
        </figure>`);
      wrap.appendChild(card);
    });
    observeReveals(wrap);
  }

  /* ═══════════ IMGS → IMG SRC (product cards are inserted with inline src) ═══════════ */
  function resolveImages() {
    $$('img[data-img]').forEach(img => {
      img.src = IMGS[img.dataset.img] || '';
    });
  }

  /* ═══════════ INIT ═══════════ */
  renderProducts('todos');
  renderTestimonials();
  animateCounters();
  observeReveals();
  updateCartUI();
  restoreFormValues();
  bindNavFilters();
  resolveImages();

  // atajo para el CTA de header
  $('#ctaWhatsApp').addEventListener('click', e => {
    if (cartCount() > 0) {
      e.preventDefault();
      openCart();
    }
  });

  document.body.classList.remove('no-js');
})();
