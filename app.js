/**
 * [Your Shop Name] - Modern Local Retail Shop Application Logic
 * Interactive shopping cart, category filtering, live search, WhatsApp ordering,
 * quick view modal, countdown timer, and store hours detector.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. PRODUCT CATALOG DATA
  // ==========================================
  const products = [
    {
      id: 'p-1',
      name: '[Wild Meadow Raw Mountain Honey]',
      category: 'pantry',
      categoryLabel: 'Pure Pantry & Honey',
      price: 380,
      originalPrice: 450,
      unit: '[500g Jar • Raw & Unpasteurized]',
      tag: 'Local Apiary',
      rating: 4.9,
      reviewsCount: 54,
      image: 'images/product_honey.jpg',
      description: 'Harvested directly by independent valley beekeepers. 100% pure, unfiltered wildflower honey packed with natural pollen and enzymes. No added syrups or heating.',
      stockStatus: 'In Stock (18 jars left at [Main Market])',
      source: 'Direct from [Local Valley Apiary]'
    },
    {
      id: 'p-2',
      name: '[Artisanal Country Sourdough Boule]',
      category: 'bakery',
      categoryLabel: 'Artisan Bakery',
      price: 190,
      originalPrice: 240,
      unit: '[650g Loaf • 36-Hr Fermented]',
      tag: 'Fresh Baked Daily',
      rating: 5.0,
      reviewsCount: 82,
      image: 'images/product_bakery.jpg',
      description: 'Naturally leavened using traditional sourdough starter and stoneground heritage flour. Features a deeply caramelized crackling crust and an airy, pillowy crumb.',
      stockStatus: 'Fresh Morning Batch (Daily Limit 30 loaves)',
      source: 'Baked locally at 7:00 AM'
    },
    {
      id: 'p-3',
      name: '[Handmade Stoneware Speckled Mug]',
      category: 'home',
      categoryLabel: 'Ceramics & Lifestyle',
      price: 420,
      originalPrice: 520,
      unit: '[320ml Capacity • Lead-Free Clay]',
      tag: 'Artisan Potter',
      rating: 4.8,
      reviewsCount: 38,
      image: 'images/product_ceramic.jpg',
      description: 'Wheel-thrown by local potters using natural high-fire stoneware clay. Comfortable ergonomic handle and tactile speckled satin glaze. Microwave and dishwasher safe.',
      stockStatus: 'Limited Craft Batch (12 units in stock)',
      source: 'Crafted in [Local Pottery Studio]'
    },
    {
      id: 'p-4',
      name: '[Morning Harvest Organic Produce Basket]',
      category: 'produce',
      categoryLabel: 'Farm Fresh Produce',
      price: 320,
      originalPrice: 390,
      unit: '[Approx. 2.5 kg Assorted Basket]',
      tag: 'Farm-to-Door',
      rating: 4.9,
      reviewsCount: 67,
      image: 'images/product_produce.jpg',
      description: 'A hand-packed assortment of crispy orchard apples, sweet heritage vine tomatoes, fresh tender sweet basil, and seasonal local greens picked at sunrise.',
      stockStatus: 'Daily Fresh Stock Available',
      source: 'Direct from [Green Valley Family Farm]'
    },
    {
      id: 'p-5',
      name: '[First Cold-Pressed Extra Virgin Olive Oil]',
      category: 'pantry',
      categoryLabel: 'Pure Pantry & Honey',
      price: 680,
      originalPrice: 799,
      unit: '[500ml Dark UV Glass Bottle]',
      tag: 'Estate Pressed',
      rating: 4.9,
      reviewsCount: 41,
      image: 'images/hero_storefront.jpg',
      description: 'Single-estate extra virgin oil mechanically pressed below 27°C. Gentle peppery finish and grassy aroma, excellent for raw drizzling, salads, and crusty bread dipping.',
      stockStatus: 'In Stock (24 bottles available)',
      source: 'Imported Direct by [Your Shop Name]'
    },
    {
      id: 'p-6',
      name: '[Stoneground Heritage Wheat Flour]',
      category: 'bakery',
      categoryLabel: 'Artisan Bakery',
      price: 140,
      originalPrice: 175,
      unit: '[1 kg Eco Cloth Bag]',
      tag: 'Zero Additives',
      rating: 4.7,
      reviewsCount: 29,
      image: 'images/artisan_products.jpg',
      description: 'Slow-milled on traditional cold stones to preserve wheat germ oil, natural fiber, and essential minerals. Produces fragrant flatbreads and rustic loaves.',
      stockStatus: 'In Stock (35 bags available)',
      source: 'Stoneground at [Local Grain Mill]'
    },
    {
      id: 'p-7',
      name: '[Pure Beeswax & Lavender Scented Candle]',
      category: 'home',
      categoryLabel: 'Ceramics & Lifestyle',
      price: 290,
      originalPrice: 360,
      unit: '[240g • 45-Hour Clean Burn]',
      tag: 'Hand-Poured',
      rating: 4.8,
      reviewsCount: 19,
      image: 'images/product_ceramic.jpg',
      description: 'Hand-poured with 100% natural beeswax, cotton wick, and pure organic lavender essential oil. Burns smokelessly while subtly purifying the air.',
      stockStatus: 'In Stock (15 pieces available)',
      source: 'Handmade by [Local Community Artisan]'
    },
    {
      id: 'p-8',
      name: '[Crisp Mountain Orchard Apples]',
      category: 'produce',
      categoryLabel: 'Farm Fresh Produce',
      price: 210,
      originalPrice: 260,
      unit: '[1 kg Eco Box (Approx 5–6 Apples)]',
      tag: 'Wax-Free Orchards',
      rating: 4.9,
      reviewsCount: 45,
      image: 'images/product_produce.jpg',
      description: 'Naturally ripened on highland trees with zero chemical wax coating. Extra juicy, crisp, and sweet for everyday snacking or fresh baking.',
      stockStatus: 'Fresh Arrival Today',
      source: 'Harvested at [Highland Orchard Co.]'
    }
  ];

  // ==========================================
  // 2. STATE MANAGEMENT
  // ==========================================
  let currentFilter = 'all';
  let cart = [];
  let fulfillmentType = 'pickup'; // 'pickup' or 'delivery'

  // Load cart from LocalStorage
  try {
    const savedCart = localStorage.getItem('localShopCart');
    if (savedCart) {
      cart = JSON.parse(savedCart);
    }
  } catch (e) {
    console.error('LocalStorage unavailable', e);
  }

  // ==========================================
  // 3. DOM ELEMENTS
  // ==========================================
  const productsGrid = document.getElementById('productsGrid');
  const filterTabs = document.querySelectorAll('.filter-tab');
  
  // Cart Elements
  const cartTriggerBtn = document.getElementById('cartTriggerBtn');
  const cartBackdrop = document.getElementById('cartBackdrop');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartCloseBtn = document.getElementById('cartCloseBtn');
  const cartCount = document.getElementById('cartCount');
  const mCartBadge = document.getElementById('mCartBadge');
  const cartDrawerCount = document.getElementById('cartDrawerCount');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartEmptyState = document.getElementById('cartEmptyState');
  const cartDrawerFooter = document.getElementById('cartDrawerFooter');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const cartGrandTotal = document.getElementById('cartGrandTotal');
  const fulfillmentCost = document.getElementById('fulfillmentCost');
  const fulfillmentLabel = document.getElementById('fulfillmentLabel');
  const btnPickupOption = document.getElementById('btnPickupOption');
  const btnDeliveryOption = document.getElementById('btnDeliveryOption');
  const whatsappOrderBtn = document.getElementById('whatsappOrderBtn');
  const reserveOrderBtn = document.getElementById('reserveOrderBtn');
  const cartStartShoppingBtn = document.getElementById('cartStartShoppingBtn');
  const addBundleBtn = document.getElementById('addBundleBtn');

  // Search Elements
  const searchInput = document.getElementById('searchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');
  const searchDropdown = document.getElementById('searchDropdown');
  const mobileSearchInput = document.getElementById('mobileSearchInput');

  // Quick View Modal
  const modalBackdrop = document.getElementById('modalBackdrop');
  const quickViewModal = document.getElementById('quickViewModal');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  // Mobile Drawer
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  const mBottomCart = document.getElementById('mBottomCart');

  // Interactive Features
  const copyAddressBtn = document.getElementById('copyAddressBtn');
  const newsletterForm = document.getElementById('newsletterForm');
  const toastContainer = document.getElementById('toastContainer');
  const timingRows = document.querySelectorAll('.timing-row');
  const mainHeader = document.getElementById('mainHeader');

  // ==========================================
  // 4. TOAST NOTIFICATION UTILITY
  // ==========================================
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span>${type === 'success' ? '✓' : 'ℹ'}</span>
      <div>${message}</div>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // ==========================================
  // 5. RENDER PRODUCTS
  // ==========================================
  function renderProducts() {
    if (!productsGrid) return;

    const filtered = currentFilter === 'all' 
      ? products 
      : products.filter(p => p.category === currentFilter);

    productsGrid.innerHTML = '';

    filtered.forEach(product => {
      const card = document.createElement('article');
      card.className = 'product-card';
      card.innerHTML = `
        <div class="card-media-wrap">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <span class="card-tag">${product.tag}</span>
          <button class="quick-view-trigger" data-id="${product.id}" aria-label="Quick preview of ${product.name}">Quick View</button>
        </div>
        <div class="card-body">
          <span class="product-cat">${product.categoryLabel}</span>
          <h3 class="product-title">${product.name}</h3>
          <span class="product-weight">${product.unit}</span>
          <div class="product-rating">
            <span>★★★★★</span>
            <span>${product.rating}</span>
            <span class="rating-count">(${product.reviewsCount})</span>
          </div>
          <div class="card-footer">
            <div class="price-wrap">
              <span class="current-price">₹${product.price}</span>
              <span class="original-price">₹${product.originalPrice}</span>
            </div>
            <button class="btn-add-cart" data-id="${product.id}">
              <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
              <span>Add</span>
            </button>
          </div>
        </div>
      `;
      productsGrid.appendChild(card);
    });

    // Attach Click Events for Add to Cart
    productsGrid.querySelectorAll('.btn-add-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const pid = e.currentTarget.getAttribute('data-id');
        addToCart(pid);
      });
    });

    // Attach Quick View Events
    productsGrid.querySelectorAll('.quick-view-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const pid = e.currentTarget.getAttribute('data-id');
        openQuickView(pid);
      });
    });
  }

  // Category Filter Tabs
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      currentFilter = tab.getAttribute('data-category');
      renderProducts();
    });
  });

  // Footer Category Filters
  document.querySelectorAll('.footer-links [data-filter]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetCat = link.getAttribute('data-filter');
      const matchingTab = document.querySelector(`.filter-tab[data-category="${targetCat}"]`);
      if (matchingTab) {
        matchingTab.click();
      }
    });
  });

  // ==========================================
  // 6. CART MANAGEMENT
  // ==========================================
  function saveCart() {
    try {
      localStorage.setItem('localShopCart', JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
    updateCartUI();
  }

  function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        unit: product.unit,
        image: product.image,
        quantity: quantity
      });
    }

    saveCart();
    showToast(`Added <strong>${product.name}</strong> to your basket!`);
  }

  function updateItemQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== productId);
    }
    saveCart();
  }

  function removeItem(productId) {
    cart = cart.filter(i => i.id !== productId);
    saveCart();
    showToast('Item removed from basket', 'info');
  }

  function updateCartUI() {
    const totalCount = cart.reduce((acc, i) => acc + i.quantity, 0);
    const subtotal = cart.reduce((acc, i) => acc + (i.price * i.quantity), 0);
    const deliveryFee = (fulfillmentType === 'delivery' && totalCount > 0) ? 40 : 0;
    const grandTotal = subtotal + deliveryFee;

    // Badges
    if (cartCount) cartCount.textContent = totalCount;
    if (mCartBadge) mCartBadge.textContent = totalCount;
    if (cartDrawerCount) cartDrawerCount.textContent = `${totalCount} item${totalCount === 1 ? '' : 's'}`;

    // Subtotal & Grand Total
    if (cartSubtotal) cartSubtotal.textContent = `₹${subtotal}`;
    if (cartGrandTotal) cartGrandTotal.textContent = `₹${grandTotal}`;

    // Fulfillment text
    if (fulfillmentType === 'pickup') {
      fulfillmentLabel.textContent = 'Store Pickup (Shop #14):';
      fulfillmentCost.textContent = 'FREE';
      fulfillmentCost.classList.add('free-text');
    } else {
      fulfillmentLabel.textContent = 'Neighborhood Delivery:';
      fulfillmentCost.textContent = '₹40';
      fulfillmentCost.classList.remove('free-text');
    }

    // Render items list
    if (totalCount === 0) {
      cartEmptyState.style.display = 'flex';
      cartDrawerFooter.style.display = 'none';
      cartItemsList.querySelectorAll('.cart-item-row').forEach(row => row.remove());
    } else {
      cartEmptyState.style.display = 'none';
      cartDrawerFooter.style.display = 'block';

      // Keep empty state element, clear previous item rows
      cartItemsList.querySelectorAll('.cart-item-row').forEach(row => row.remove());

      cart.forEach(item => {
        const row = document.createElement('div');
        row.className = 'cart-item-row';
        row.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
          <div class="cart-item-info">
            <h4 class="cart-item-name">${item.name}</h4>
            <span class="cart-item-price">₹${item.price} each</span>
            <div class="cart-qty-control">
              <button class="qty-btn btn-qty-minus" data-id="${item.id}" aria-label="Decrease quantity">−</button>
              <span class="qty-display">${item.quantity}</span>
              <button class="qty-btn btn-qty-plus" data-id="${item.id}" aria-label="Increase quantity">+</button>
              <button class="cart-item-remove" data-id="${item.id}" aria-label="Remove item">Remove</button>
            </div>
          </div>
        `;
        cartItemsList.appendChild(row);
      });

      // Events for quantity controls
      cartItemsList.querySelectorAll('.btn-qty-minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
          updateItemQuantity(e.currentTarget.getAttribute('data-id'), -1);
        });
      });

      cartItemsList.querySelectorAll('.btn-qty-plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
          updateItemQuantity(e.currentTarget.getAttribute('data-id'), 1);
        });
      });

      cartItemsList.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
          removeItem(e.currentTarget.getAttribute('data-id'));
        });
      });
    }
  }

  function openCart() {
    cartDrawer.classList.add('open');
    cartBackdrop.classList.add('open');
    cartDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartDrawer.classList.remove('open');
    cartBackdrop.classList.remove('open');
    cartDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  cartTriggerBtn.addEventListener('click', openCart);
  if (mBottomCart) mBottomCart.addEventListener('click', openCart);
  cartCloseBtn.addEventListener('click', closeCart);
  cartBackdrop.addEventListener('click', closeCart);
  if (cartStartShoppingBtn) {
    cartStartShoppingBtn.addEventListener('click', () => {
      closeCart();
      const aisleSec = document.getElementById('aisles');
      if (aisleSec) aisleSec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Fulfillment selector toggle
  btnPickupOption.addEventListener('click', () => {
    fulfillmentType = 'pickup';
    btnPickupOption.classList.add('active');
    btnDeliveryOption.classList.remove('active');
    updateCartUI();
  });

  btnDeliveryOption.addEventListener('click', () => {
    fulfillmentType = 'delivery';
    btnDeliveryOption.classList.add('active');
    btnPickupOption.classList.remove('active');
    updateCartUI();
  });

  // Bundle Add Button
  if (addBundleBtn) {
    addBundleBtn.addEventListener('click', () => {
      addToCart('p-1', 1);
      addToCart('p-2', 1);
      showToast('Special Breakfast Bundle added to your basket!');
      openCart();
    });
  }

  // ==========================================
  // 7. ORDER VIA WHATSAPP FORMATTER
  // ==========================================
  function generateWhatsAppMessage() {
    if (cart.length === 0) return '';

    let text = `*New Order from [Your Shop Name] Website*%0A`;
    text += `-----------------------------------%0A`;
    text += `*Fulfillment:* ${fulfillmentType === 'pickup' ? 'Store Pickup (Shop #14)' : 'Local Neighborhood Delivery'}%0A%0A`;
    text += `*Items Ordered:*%0A`;

    let total = 0;
    cart.forEach((item, index) => {
      const lineCost = item.price * item.quantity;
      total += lineCost;
      text += `${index + 1}. ${encodeURIComponent(item.name)} x ${item.quantity} = ₹${lineCost}%0A`;
    });

    const deliveryFee = (fulfillmentType === 'delivery') ? 40 : 0;
    if (deliveryFee > 0) {
      text += `Delivery Fee: ₹40%0A`;
      total += deliveryFee;
    }

    text += `-----------------------------------%0A`;
    text += `*Estimated Total:* ₹${total}%0A%0A`;
    text += `*Customer Details Placeholder:*%0A`;
    text += `Name: [Customer Name]%0A`;
    text += `Phone: [Customer Phone]%0A`;
    text += `Pickup Time / Address: [Preferred Time / Neighborhood Address]%0A`;
    text += `%0APlease confirm if this order is ready for pickup/delivery!`;

    return text;
  }

  whatsappOrderBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      showToast('Please add items to your basket first.', 'info');
      return;
    }
    const message = generateWhatsAppMessage();
    const phone = '919876543210'; // Store placeholder phone
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  });

  reserveOrderBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      showToast('Your basket is empty.', 'info');
      return;
    }
    showToast(`Order reserved! Please collect at counter at [Shop No. 14]. Pay in-store.`);
    closeCart();
  });

  // ==========================================
  // 8. QUICK VIEW MODAL
  // ==========================================
  function openQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    modalBody.innerHTML = `
      <div class="modal-media-wrap">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="modal-info-wrap">
        <span class="modal-cat-tag">${product.categoryLabel}</span>
        <h3 class="modal-title">${product.name}</h3>
        <div class="modal-price-row">
          <span class="current-price">₹${product.price}</span>
          <span class="original-price">₹${product.originalPrice}</span>
          <span class="discount-pill">Local Fresh</span>
        </div>
        <p class="modal-desc">${product.description}</p>
        
        <div class="modal-specs">
          <div class="modal-spec-row">
            <span class="modal-spec-label">Unit Spec:</span>
            <span class="modal-spec-value">${product.unit}</span>
          </div>
          <div class="modal-spec-row">
            <span class="modal-spec-label">Source / Origin:</span>
            <span class="modal-spec-value">${product.source}</span>
          </div>
          <div class="modal-spec-row">
            <span class="modal-spec-label">Availability:</span>
            <span class="modal-spec-value">${product.stockStatus}</span>
          </div>
        </div>

        <div class="modal-cta-row">
          <button class="btn btn-primary btn-block" id="modalAddToCartBtn">
            <span>Add to Store Basket (₹${product.price})</span>
          </button>
        </div>
      </div>
    `;

    document.getElementById('modalAddToCartBtn').addEventListener('click', () => {
      addToCart(product.id);
      closeQuickView();
      openCart();
    });

    quickViewModal.classList.add('open');
    modalBackdrop.classList.add('open');
    quickViewModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeQuickView() {
    quickViewModal.classList.remove('open');
    modalBackdrop.classList.remove('open');
    quickViewModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalCloseBtn.addEventListener('click', closeQuickView);
  modalBackdrop.addEventListener('click', closeQuickView);

  // ==========================================
  // 9. LIVE SEARCH AUTOCOMPLETE
  // ==========================================
  function handleSearch(query) {
    query = query.trim().toLowerCase();
    if (!query) {
      searchDropdown.innerHTML = '';
      searchDropdown.classList.remove('open');
      searchClearBtn.classList.remove('visible');
      return;
    }

    searchClearBtn.classList.add('visible');
    const matches = products.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.categoryLabel.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      searchDropdown.innerHTML = `<div class="search-no-results">No local items found for "${query}". You can ask us on WhatsApp!</div>`;
    } else {
      searchDropdown.innerHTML = matches.map(item => `
        <div class="search-result-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" class="search-item-thumb">
          <div class="search-item-info">
            <div class="search-item-name">${item.name}</div>
            <div class="search-item-price">₹${item.price} • ${item.unit}</div>
          </div>
        </div>
      `).join('');

      searchDropdown.querySelectorAll('.search-result-item').forEach(el => {
        el.addEventListener('click', () => {
          const pid = el.getAttribute('data-id');
          searchDropdown.classList.remove('open');
          openQuickView(pid);
        });
      });
    }

    searchDropdown.classList.add('open');
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
    searchClearBtn.addEventListener('click', () => {
      searchInput.value = '';
      handleSearch('');
      searchInput.focus();
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
        searchDropdown.classList.remove('open');
      }
    });
  }

  if (mobileSearchInput) {
    mobileSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        closeMobileDrawer();
        const q = mobileSearchInput.value.trim().toLowerCase();
        if (q) {
          const firstMatch = products.find(p => p.name.toLowerCase().includes(q));
          if (firstMatch) {
            openQuickView(firstMatch.id);
          } else {
            showToast(`Searching for "${q}"... Check our aisles below!`, 'info');
          }
        }
      }
    });
  }

  // ==========================================
  // 10. MOBILE DRAWER NAVIGATION
  // ==========================================
  function openMobileDrawer() {
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('open');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileDrawer() {
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('open');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  mobileMenuBtn.addEventListener('click', openMobileDrawer);
  drawerCloseBtn.addEventListener('click', closeMobileDrawer);
  drawerBackdrop.addEventListener('click', closeMobileDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', closeMobileDrawer));

  // ==========================================
  // 11. WEEKEND DEAL COUNTDOWN TIMER
  // ==========================================
  const hoursVal = document.getElementById('hoursValue');
  const minutesVal = document.getElementById('minutesValue');
  const secondsVal = document.getElementById('secondsValue');

  let remainingSeconds = (8 * 3600) + (42 * 60) + 19;

  function updateTimer() {
    if (remainingSeconds > 0) {
      remainingSeconds--;
    } else {
      remainingSeconds = 24 * 3600; // Reset next cycle
    }

    const h = Math.floor(remainingSeconds / 3600);
    const m = Math.floor((remainingSeconds % 3600) / 60);
    const s = remainingSeconds % 60;

    if (hoursVal) hoursVal.textContent = String(h).padStart(2, '0');
    if (minutesVal) minutesVal.textContent = String(m).padStart(2, '0');
    if (secondsVal) secondsVal.textContent = String(s).padStart(2, '0');
  }

  setInterval(updateTimer, 1000);

  // ==========================================
  // 12. STORE TIMING CURRENT DAY HIGHLIGHTER
  // ==========================================
  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentDayName = daysOfWeek[new Date().getDay()];

  timingRows.forEach(row => {
    if (row.getAttribute('data-day') === currentDayName) {
      row.classList.add('today');
      const badge = document.createElement('span');
      badge.style.fontSize = '0.7rem';
      badge.style.backgroundColor = '#10b981';
      badge.style.color = '#ffffff';
      badge.style.padding = '1px 6px';
      badge.style.borderRadius = '999px';
      badge.style.marginLeft = '8px';
      badge.textContent = 'Today';
      row.querySelector('.day-name').appendChild(badge);
    }
  });

  // ==========================================
  // 13. COPY STORE ADDRESS
  // ==========================================
  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', () => {
      const addressText = document.getElementById('storeAddressText').innerText;
      navigator.clipboard.writeText(addressText).then(() => {
        showToast('Store address copied to clipboard!');
      }).catch(() => {
        showToast('Address: ' + addressText, 'info');
      });
    });
  }

  // ==========================================
  // 14. NEWSLETTER / CLUB FORM SUBMISSION
  // ==========================================
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('subscriberName').value;
      showToast(`Thank you, <strong>${name}</strong>! Your 10% in-store discount voucher has been generated.`);
      newsletterForm.reset();
    });
  }

  // ==========================================
  // 15. STICKY HEADER SCROLL EFFECT
  // ==========================================
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }
  });

  // Initial render
  renderProducts();
  updateCartUI();
});
