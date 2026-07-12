import React, { useState, useMemo, useRef, useEffect } from "react";
import { Shirt, Gem, Footprints, ShoppingBag, X, Plus, Minus, Trash2, Check } from "lucide-react";

const FONT_IMPORT_ID = "libaas-fonts";

function useFonts() {
  useEffect(() => {
    if (document.getElementById(FONT_IMPORT_ID)) return;
    const link = document.createElement("link");
    link.id = FONT_IMPORT_ID;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;1,500&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
  }, []);
}

const CATEGORIES = [
  { id: "clothes", label: "Clothes", icon: Shirt, color: "#6B1E23", tint: "#F3E4E1" },
  { id: "accessories", label: "Accessories", icon: Gem, color: "#B08A1E", tint: "#F6EFD9" },
  { id: "shoes", label: "Shoes", icon: Footprints, color: "#2F5D50", tint: "#E3ECE7" },
];

const PRODUCTS = [
  { id: 1, name: "Chikankari Kurta Set", cat: "clothes", price: 1899, tagline: "Cotton, hand-embroidered" },
  { id: 2, name: "Anarkali Suit", cat: "clothes", price: 2799, tagline: "Festive, flared silhouette" },
  { id: 3, name: "Denim Jacket", cat: "clothes", price: 2199, tagline: "Washed indigo, unisex" },
  { id: 4, name: "Cotton Kurti", cat: "clothes", price: 999, tagline: "Everyday wear, breathable" },
  { id: 5, name: "Jhumka Earrings", cat: "accessories", price: 649, tagline: "Oxidised silver finish" },
  { id: 6, name: "Leather Belt", cat: "accessories", price: 799, tagline: "Genuine leather, buckle detail" },
  { id: 7, name: "Banarasi Silk Dupatta", cat: "accessories", price: 1499, tagline: "Zari border, festive" },
  { id: 8, name: "Pearl Necklace Set", cat: "accessories", price: 1199, tagline: "Layered, bridal-ready" },
  { id: 9, name: "Mojari Juttis", cat: "shoes", price: 1099, tagline: "Hand-stitched, embroidered toe" },
  { id: 10, name: "Everyday Sneakers", cat: "shoes", price: 1799, tagline: "Cushioned sole, all-day" },
  { id: 11, name: "Formal Loafers", cat: "shoes", price: 2299, tagline: "Genuine leather, slip-on" },
  { id: 12, name: "Kolhapuri Chappals", cat: "shoes", price: 899, tagline: "Traditional leather craft" },
];

function rupee(n) {
  return "₹" + n.toLocaleString("en-IN");
}

function TagHole({ color }) {
  return (
    <svg width="100%" height="18" viewBox="0 0 200 18" className="block">
      <line x1="100" y1="0" x2="100" y2="10" stroke={color} strokeWidth="1.5" strokeDasharray="2 2" opacity="0.6" />
      <circle cx="100" cy="12" r="4" fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function HangingSketch({ children, delay, rotate }) {
  return (
    <div
      style={{
        animation: `sway 6s ease-in-out ${delay}s infinite`,
        transformOrigin: "top center",
      }}
    >
      <svg width="6" height="34" className="mx-auto block">
        <line x1="3" y1="0" x2="3" y2="34" stroke="#a08b6c" strokeWidth="1.5" />
      </svg>
      <div style={{ transform: `rotate(${rotate}deg)` }}>{children}</div>
    </div>
  );
}

function SketchKurta({ color }) {
  return (
    <svg width="72" height="90" viewBox="0 0 72 90" fill="none">
      <path
        d="M26 6 L36 14 L46 6 L58 16 L52 28 L46 24 L46 82 L26 82 L26 24 L20 28 L14 16 Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="36" cy="30" r="1.6" fill={color} />
      <circle cx="36" cy="40" r="1.6" fill={color} />
      <circle cx="36" cy="50" r="1.6" fill={color} />
    </svg>
  );
}

function SketchEarring({ color }) {
  return (
    <svg width="52" height="90" viewBox="0 0 52 90" fill="none">
      <circle cx="26" cy="14" r="7" stroke={color} strokeWidth="2" />
      <path d="M26 21 C 10 34, 10 60, 26 76 C 42 60, 42 34, 26 21 Z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <circle cx="26" cy="46" r="2" fill={color} />
    </svg>
  );
}

function SketchJutti({ color }) {
  return (
    <svg width="90" height="70" viewBox="0 0 90 70" fill="none">
      <path
        d="M8 52 C 8 30, 24 14, 44 14 C 56 14, 60 22, 66 22 C 74 22, 80 30, 80 40 C 80 52, 66 58, 44 58 L 14 58 C 8 58, 8 56, 8 52 Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M44 14 C 40 22, 40 30, 48 34" stroke={color} strokeWidth="1.5" />
      <circle cx="48" cy="30" r="2.5" fill={color} />
    </svg>
  );
}

function ProductCard({ product, onAdd }) {
  const cat = CATEGORIES.find((c) => c.id === product.cat);
  const Icon = cat.icon;
  return (
    <div
      className="relative rounded-[4px] border transition-all duration-200 hover:-translate-y-1 hover:shadow-lg group"
      style={{ borderColor: "#e4dccd", background: "#fffdf9" }}
    >
      <TagHole color={cat.color} />
      <div
        className="flex items-center justify-center h-32 mx-4 rounded-sm"
        style={{ background: cat.tint }}
      >
        <Icon size={40} strokeWidth={1.3} color={cat.color} />
      </div>
      <div className="p-4 pt-3">
        <p
          className="text-[10px] tracking-[0.15em] uppercase mb-1"
          style={{ fontFamily: "'IBM Plex Mono', monospace", color: cat.color }}
        >
          {cat.label}
        </p>
        <h3 className="text-[15px] leading-snug mb-1" style={{ fontFamily: "'Fraunces', serif", color: "#221F1F" }}>
          {product.name}
        </h3>
        <p className="text-[12px] mb-3" style={{ color: "#6b625a" }}>
          {product.tagline}
        </p>
        <div className="flex items-center justify-between">
          <span
            className="text-[15px] font-medium"
            style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#221F1F" }}
          >
            {rupee(product.price)}
          </span>
          <button
            onClick={() => onAdd(product)}
            className="text-[11px] uppercase tracking-wide px-3 py-1.5 rounded-sm transition-colors"
            style={{ background: cat.color, color: "#fdfbf6" }}
          >
            Add to bag
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LibaasStore() {
  useFonts();
  const [active, setActive] = useState("all");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });

  const filtered = useMemo(
    () => (active === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === active)),
    [active]
  );

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const itemCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const placeOrder = (e) => {
    e.preventDefault();
    const orderNo = "LB" + Math.floor(100000 + Math.random() * 900000);
    setOrderPlaced({ orderNo, total: subtotal, name: form.name });
    setCart([]);
    setCheckoutOpen(false);
    setForm({ name: "", phone: "", address: "" });
  };

  return (
    <div style={{ background: "#F2ECE4", minHeight: "100%", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @keyframes sway {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-30 backdrop-blur border-b" style={{ background: "rgba(242,236,228,0.9)", borderColor: "#ddd2bc" }}>
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="leading-tight">
            <span
              className="text-[22px] tracking-wide block"
              style={{ fontFamily: "'Fraunces', serif", fontStyle: "italic", color: "#6B1E23" }}
            >
              House of Aparna
            </span>
            <span
              className="text-[9.5px] uppercase tracking-[0.18em] block"
              style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#8a8074" }}
            >
              Clothes · Accessories · Shoes
            </span>
          </div>
          <nav className="hidden sm:flex gap-6 text-[13px] uppercase tracking-wide" style={{ color: "#4a4238" }}>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className="hover:opacity-100 transition-opacity"
                style={{ opacity: active === c.id ? 1 : 0.55, color: active === c.id ? c.color : "#4a4238" }}
              >
                {c.label}
              </button>
            ))}
          </nav>
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-sm"
            style={{ background: "#221F1F", color: "#fdfbf6" }}
            aria-label="Open bag"
          >
            <ShoppingBag size={16} strokeWidth={1.6} />
            <span className="text-[12px]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              {itemCount}
            </span>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-5 pt-14 pb-10 flex flex-col sm:flex-row items-center gap-10">
        <div className="flex-1">
          <p
            className="text-[11px] uppercase tracking-[0.2em] mb-3"
            style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#B08A1E" }}
          >
            Ek hi jagah, sab kuch
          </p>
          <h1
            className="text-[42px] sm:text-[52px] leading-[1.05] mb-4"
            style={{ fontFamily: "'Fraunces', serif", color: "#221F1F" }}
          >
            Sar se pair tak,<br />
            <em style={{ color: "#6B1E23" }}>ek hi dukaan.</em>
          </h1>
          <p className="text-[15px] mb-6 max-w-sm" style={{ color: "#4a4238" }}>
            Kapde, gehne aur joote — sab kuch ek jagah, poori pasand ke saath.
          </p>
          <button
            onClick={() => setActive("all")}
            className="px-5 py-2.5 rounded-sm text-[13px] uppercase tracking-wide"
            style={{ background: "#6B1E23", color: "#fdfbf6" }}
          >
            Sab dekho
          </button>
        </div>
        <div className="flex gap-6 sm:gap-8 items-start pt-2">
          <HangingSketch delay={0} rotate={-3}>
            <SketchKurta color="#6B1E23" />
          </HangingSketch>
          <HangingSketch delay={1.2} rotate={2}>
            <SketchEarring color="#B08A1E" />
          </HangingSketch>
          <HangingSketch delay={0.6} rotate={-2}>
            <SketchJutti color="#2F5D50" />
          </HangingSketch>
        </div>
      </section>

      {/* Category tabs */}
      <div className="max-w-5xl mx-auto px-5 flex gap-2 pb-6 flex-wrap">
        {[{ id: "all", label: "Sab kuch", icon: null, color: "#221F1F", tint: "#e9e2d3" }, ...CATEGORIES].map((c) => {
          const Icon = c.icon;
          const isActive = active === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] uppercase tracking-wide border transition-colors"
              style={{
                borderColor: isActive ? c.color : "#ddd2bc",
                background: isActive ? c.color : "transparent",
                color: isActive ? "#fdfbf6" : "#4a4238",
              }}
            >
              {Icon && <Icon size={13} strokeWidth={1.6} />}
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Product grid */}
      <section className="max-w-5xl mx-auto px-5 pb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={addToCart} />
        ))}
      </section>

      <footer className="border-t py-8 text-center text-[12px]" style={{ borderColor: "#ddd2bc", color: "#7a7166" }}>
        House of Aparna — demo storefront. Order form is for preview only, koi asli payment nahi hota.
      </footer>

      {/* Cart drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-40 flex justify-end">
          <div className="absolute inset-0 bg-black/30" onClick={() => setCartOpen(false)} />
          <div
            className="relative w-full max-w-sm h-full flex flex-col"
            style={{ background: "#fffdf9", animation: "slideIn 0.25s ease-out" }}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "#e4dccd" }}>
              <h2 className="text-[17px]" style={{ fontFamily: "'Fraunces', serif" }}>Your bag</h2>
              <button onClick={() => setCartOpen(false)} aria-label="Close bag">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-3">
              {cart.length === 0 && (
                <p className="text-[13px] text-center mt-10" style={{ color: "#8a8074" }}>
                  Bag khaali hai. Kuch add karo.
                </p>
              )}
              {cart.map((item) => {
                const cat = CATEGORIES.find((c) => c.id === item.cat);
                return (
                  <div key={item.id} className="flex items-center gap-3 py-3 border-b" style={{ borderColor: "#efe8da" }}>
                    <div className="w-12 h-12 flex items-center justify-center rounded-sm shrink-0" style={{ background: cat.tint }}>
                      <cat.icon size={20} strokeWidth={1.4} color={cat.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] truncate" style={{ fontFamily: "'Fraunces', serif" }}>{item.name}</p>
                      <p className="text-[12px]" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#6b625a" }}>
                        {rupee(item.price)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => changeQty(item.id, -1)} className="p-1 rounded-sm border" style={{ borderColor: "#ddd2bc" }}>
                        <Minus size={12} />
                      </button>
                      <span className="text-[12px] w-4 text-center" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                        {item.qty}
                      </span>
                      <button onClick={() => changeQty(item.id, 1)} className="p-1 rounded-sm border" style={{ borderColor: "#ddd2bc" }}>
                        <Plus size={12} />
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.id)} aria-label="Remove item">
                      <Trash2 size={15} color="#a34a3f" />
                    </button>
                  </div>
                );
              })}
            </div>
            {cart.length > 0 && (
              <div className="px-5 py-4 border-t" style={{ borderColor: "#e4dccd" }}>
                <div className="flex justify-between mb-3 text-[14px]">
                  <span style={{ color: "#4a4238" }}>Subtotal</span>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{rupee(subtotal)}</span>
                </div>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    setCheckoutOpen(true);
                  }}
                  className="w-full py-2.5 rounded-sm text-[13px] uppercase tracking-wide"
                  style={{ background: "#6B1E23", color: "#fdfbf6" }}
                >
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout modal */}
      {checkoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setCheckoutOpen(false)} />
          <form
            onSubmit={placeOrder}
            className="relative w-full max-w-sm rounded-sm p-6"
            style={{ background: "#fffdf9", animation: "fadeUp 0.2s ease-out" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[18px]" style={{ fontFamily: "'Fraunces', serif" }}>Delivery details</h2>
              <button type="button" onClick={() => setCheckoutOpen(false)} aria-label="Close checkout">
                <X size={18} />
              </button>
            </div>
            <label className="block text-[11px] uppercase tracking-wide mb-1" style={{ color: "#6b625a" }}>Naam</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full mb-3 px-3 py-2 rounded-sm border text-[14px]"
              style={{ borderColor: "#ddd2bc", background: "#fdfbf6" }}
              placeholder="Aapka naam"
            />
            <label className="block text-[11px] uppercase tracking-wide mb-1" style={{ color: "#6b625a" }}>Phone</label>
            <input
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full mb-3 px-3 py-2 rounded-sm border text-[14px]"
              style={{ borderColor: "#ddd2bc", background: "#fdfbf6" }}
              placeholder="10-digit number"
            />
            <label className="block text-[11px] uppercase tracking-wide mb-1" style={{ color: "#6b625a" }}>Address</label>
            <textarea
              required
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full mb-4 px-3 py-2 rounded-sm border text-[14px] resize-none"
              rows={3}
              style={{ borderColor: "#ddd2bc", background: "#fdfbf6" }}
              placeholder="Poora address"
            />
            <div className="flex justify-between mb-4 text-[14px]">
              <span style={{ color: "#4a4238" }}>Total</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{rupee(subtotal)}</span>
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-sm text-[13px] uppercase tracking-wide"
              style={{ background: "#6B1E23", color: "#fdfbf6" }}
            >
              Order place karo
            </button>
          </form>
        </div>
      )}

      {/* Order confirmation */}
      {orderPlaced && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOrderPlaced(null)} />
          <div className="relative w-full max-w-sm rounded-sm p-7 text-center" style={{ background: "#fffdf9" }}>
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "#2F5D50" }}
            >
              <Check size={22} color="#fdfbf6" />
            </div>
            <h2 className="text-[19px] mb-1" style={{ fontFamily: "'Fraunces', serif" }}>
              Shukriya, {orderPlaced.name}!
            </h2>
            <p className="text-[13px] mb-4" style={{ color: "#6b625a" }}>
              Order confirm ho gaya hai.
            </p>
            <p
              className="text-[11px] uppercase tracking-wide mb-1"
              style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#8a8074" }}
            >
              Order no.
            </p>
            <p className="text-[16px] mb-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              {orderPlaced.orderNo}
            </p>
            <button
              onClick={() => setOrderPlaced(null)}
              className="px-5 py-2 rounded-sm text-[13px] uppercase tracking-wide"
              style={{ background: "#221F1F", color: "#fdfbf6" }}
            >
              Shopping jaari rakho
            </button>
          </div>
        </div>
      )}
    </div>
  );
              }
