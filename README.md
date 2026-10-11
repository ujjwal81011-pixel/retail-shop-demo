# [Your Shop Name] - Modern Local Retail Shop Website

A modern, high-conversion, professional website designed specifically for local retail shops, general stores, artisanal grocers, and neighborhood lifestyle boutiques.

---

## ✨ Key Highlights & Aesthetic Philosophy

- **Warm, Professional Atmosphere (Strictly No Neon Colors)**: Designed with rich forest pine (`#1b3d33`), warm amber/honey (`#c58137`), and clean linen neutrals (`#faf7f2`), completely avoiding garish neon tones.
- **Easy Customization (Clear Placeholders)**: All business details, store hours, owner names, addresses, and phone numbers are enclosed in bracketed placeholders like `[Your Shop Name]` and `[+91 98765 43210]` for effortless client customization.
- **100% Mobile-Friendly Experience**:
  - Touch-first ergonomic bottom navigation bar (Home, Aisles, Cart, Call Shop, Directions).
  - Smooth slide-out mobile drawer menu with touch-friendly tap targets.
  - Responsive product grid adjusting seamlessly across mobile, tablet, and desktop viewports.
- **Integrated WhatsApp Direct Ordering**: Customers can assemble a basket and generate a neatly formatted order message sent directly to your counter WhatsApp number with a single tap.
- **Interactive Shopping Basket Drawer**: In-memory cart with live subtotal calculation, free in-store pickup toggle vs. local neighborhood delivery fee calculator.
- **Real-Time Live Search**: Instant dropdown search filtering honey, sourdough bread, pantry items, ceramics, and fresh produce.
- **Interactive Store Map & Schedule**: Highlights today's day of the week automatically, includes a 1-tap "Copy Address" feature and quick Google Maps navigation link.

---

## 📁 File Structure

```
e:/Local retail shop Demo/
├── index.html              # Semantic HTML5 markup, SEO meta tags, and accessibility hooks
├── style.css               # Vanilla CSS design system (typography, variables, responsive breakpoints)
├── app.js                  # Dynamic catalog rendering, interactive cart drawer, search, modals, countdown
├── images/                 # High-resolution generated store photography
│   ├── hero_storefront.jpg   # Welcoming modern boutique interior
│   ├── artisan_products.jpg  # Featured weekend market bundle
│   ├── product_honey.jpg     # Wild meadow raw honey
│   ├── product_bakery.jpg    # Artisanal sourdough boule
│   ├── product_ceramic.jpg   # Handcrafted stoneware ceramic mug
│   └── product_produce.jpg   # Fresh morning farm produce basket
└── README.md               # Documentation & setup guide
```

---

## 🚀 How to Run Locally

1. Open your terminal in the project directory:
   ```bash
   cd "e:\Local retail shop Demo"
   ```

2. Start the local server:
   ```bash
   python -m http.server 8080
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

---

## 📝 Customizing the Placeholders

Simply search and replace the following placeholder tags across `index.html` and `app.js`:

| Placeholder | Description | Example Replacement |
| :--- | :--- | :--- |
| `[Your Shop Name]` | Store name | *The Corner Grocer & Goods* |
| `[+91 98765 43210]` | Counter phone number | *+91 98112 34567* |
| `[Shop No. 14, Central Market...]` | Physical address | *Shop 12, Main Street, Delhi* |
| `[Shop Owner Name]` | Owner / founder name | *Rajesh & Team* |
| `[hello@yourshopdomain.com]` | Customer inquiry email | *orders@cornergrocer.in* |
| `[₹380]`, `[₹190]`, etc. | Product pricing | Your local item prices |

---

Developed with clean Vanilla HTML, CSS, and modern JavaScript for fast load times and reliable performance.
