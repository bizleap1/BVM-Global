import { useState, useEffect } from "react";
import Lenis from "lenis";
import Hero from "./components/Hero";

const NAV_LINKS = ["Home", "About", "Products", "Certifications", "Why Us", "Contact"];

const PRODUCTS = [
  {
    name: "Makhana (Fox Nuts)",
    image: "/makhana.jpg",
    color: "from-amber-50 to-amber-100",
    accent: "#d97706",
    desc: "Hand-harvested lotus seeds from Bihar's pristine lakes — crunchy, nutritious, and globally prized.",
    tags: ["Gluten-Free", "Protein Rich"],
  },
  {
    name: "Lychee",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Litchi_chinensis_fruits.JPG/960px-Litchi_chinensis_fruits.JPG",
    color: "from-rose-50 to-pink-100",
    accent: "#e11d48",
    desc: "Juicy, fragrant lychees from Muzaffarpur — a jewel of Indian summer exported fresh worldwide.",
    tags: ["Tropical", "Antioxidant"],
  },
  {
    name: "Elephant Foot Yam",
    image: "/elephant-yam.jpg",
    color: "from-stone-50 to-stone-100",
    accent: "#78716c",
    desc: "Premium Suran cultivated in rich Indian soil — a versatile root vegetable gaining global demand.",
    tags: ["High Fiber", "Versatile"],
  },
  {
    name: "Alphonso Mangoes",
    image: "/alphonso-mangoes.jpg",
    color: "from-yellow-50 to-orange-100",
    accent: "#ea580c",
    desc: "The king of fruits — Alphonso mangoes bursting with sweetness, aroma, and pure Indian sunshine.",
    tags: ["Premium", "Seasonal"],
  },
  {
    name: "Drumstick (Moringa)",
    image: "/drumstick.jpg",
    color: "from-green-50 to-emerald-100",
    accent: "#059669",
    desc: "Nutrient-dense Moringa pods — nature's superfood grown sustainably across India's heartland.",
    tags: ["Superfood", "Organic"],
  },
  {
    name: "Green Chillies",
    image: "/green-chillies.jpg",
    color: "from-lime-50 to-green-100",
    accent: "#65a30d",
    desc: "Vibrant, fiery green chillies — adding India's signature heat to kitchens across the globe.",
    tags: ["Fresh", "Spicy"],
  },
];

const CERTS = [
  { icon: "🏛️", title: "DGFT Registered", desc: "Directorate General of Foreign Trade authorized exporter" },
  { icon: "🏅", title: "MSME Certified", desc: "Ministry of MSME recognized enterprise" },
  { icon: "✈️", title: "APEDA Approved", desc: "Agricultural & Processed Food Products Export authority" },
  { icon: "🌍", title: "Global Standards", desc: "Compliant with international food safety regulations" },
];

const WHY_US = [
  { icon: "🌾", title: "Premium Quality", desc: "Handpicked produce meeting the highest export standards." },
  { icon: "🤝", title: "Farmer Direct", desc: "Sourced directly from local farming communities across India." },
  { icon: "🍃", title: "Fresh & Natural", desc: "No additives, no compromise — pure farm-to-port produce." },
  { icon: "🚢", title: "Global Delivery", desc: "Reliable logistics to 30+ countries worldwide." },
  { icon: "📋", title: "Trusted Standards", desc: "Full compliance with FSSAI, APEDA, and international norms." },
];

export default function BVMGlobal() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", country: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [lenisRef, setLenisRef] = useState(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      wheelMultiplier: 1.2,
    });
    setLenisRef(lenis);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ["home", "about", "products", "certifications", "why-us", "contact"];
      const labels = ["Home", "About", "Products", "Certifications", "Why Us", "Contact"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(labels[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      lenis.destroy();
    };
  }, []);

  const scrollTo = (section) => {
    const ids = { Home: "home", About: "about", Products: "products", Certifications: "certifications", "Why Us": "why-us", Contact: "contact" };
    const el = document.getElementById(ids[section]);
    if (el && lenisRef) {
      lenisRef.scrollTo(el, { offset: -50 });
    } else if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", phone: "", country: "", message: "" });
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }} className="bg-[#fafaf7] text-[#1a2e1a] overflow-x-hidden">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(247,253,245,0.96)" : "transparent",
          boxShadow: scrolled ? "0 2px 32px rgba(22,101,52,0.08)" : "none",
          backdropFilter: scrolled ? "blur(14px)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-20 h-20 sm:w-28 sm:h-24 flex items-center justify-center">
              <img src="/logo bvm.png" alt="BVM Global" className="w-full h-full object-contain scale-[1.35] drop-shadow-sm" />
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  color: activeSection === link ? "#fff" : "#14532d",
                  background: activeSection === link ? "linear-gradient(135deg,#15803d,#22c55e)" : "transparent",
                }}
              >
                {link}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {[0, 1, 2].map((i) => (
              <span key={i} className="block w-6 h-0.5 transition-all duration-300" style={{ background: "#14532d" }} />
            ))}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <button key={link} onClick={() => scrollTo(link)} className="text-left py-2 px-4 rounded-xl text-sm font-medium hover:bg-green-50 transition-colors" style={{ color: activeSection === link ? "#2d6a2d" : "#374151" }}>
                {link}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <Hero scrollTo={scrollTo} />

      {/* ABOUT */}
      <section id="about" className="py-16 md:py-28 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#15803d" }}>Who We Are</span>
            <h2 className="text-3xl md:text-5xl font-black mt-2" style={{ color: "#0f3d2e" }}>About BVM Global</h2>
            <div className="w-16 h-1 rounded-full mx-auto mt-4" style={{ background: "linear-gradient(90deg,#15803d,#22c55e)" }} />
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
            <div>
              <div className="rounded-3xl p-8 mb-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#f0f9e8,#e8f5d0)" }}>
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: "#5a9e2f", transform: "translate(30%,-30%)" }} />
                <div className="text-4xl mb-4">🌱</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "#1a2e1a" }}>Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">Representing authentic Indian food culture globally — bridging the gap between India's fertile farmlands and discerning consumers worldwide.</p>
              </div>
              <div className="rounded-3xl p-8 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#fef9e7,#fef3c7)" }}>
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ background: "#d4a72c", transform: "translate(30%,-30%)" }} />
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: "#1a2e1a" }}>Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">Fresh goes global — delivering high-quality agricultural products from India's heartland to international markets with integrity and care.</p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-8" style={{ color: "#1a2e1a" }}>Our Core Values</h3>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {[
                  { icon: "⭐", title: "High Quality", desc: "Every product meets strict export-grade standards" },
                  { icon: "🌾", title: "Farmer Support", desc: "Empowering local farming communities" },
                  { icon: "♻️", title: "Sustainable", desc: "Eco-conscious farming practices" },
                  { icon: "🌐", title: "Global Standards", desc: "International compliance & certifications" },
                ].map((v) => (
                  <div key={v.title} className="p-5 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ borderColor: "#e5e7eb", background: "white" }}>
                    <div className="text-2xl mb-2">{v.icon}</div>
                    <div className="font-semibold text-sm mb-1" style={{ color: "#1a2e1a" }}>{v.title}</div>
                    <div className="text-xs text-gray-500 leading-relaxed">{v.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Leadership Section */}
          <div className="mt-20">
            <h3 className="text-3xl font-black text-center mb-12" style={{ color: "#1a2e1a" }}>Our Leadership</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Founder 1 */}
              <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100 text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-6 border-4 border-green-50 shadow-md">
                  <img src="/Gemini_Generated_Image_xiamspxiamspxiam.png" alt="Asmit Shahu" className="w-full h-full object-cover" />
                </div>
                <h4 className="text-xl font-bold text-[#0f3d2e]">Asmit Shahu</h4>
                <p className="font-medium mb-3" style={{ color: "#15803d" }}>Founder</p>
                <p className="text-gray-500 text-sm leading-relaxed">Asmit leads BVM Global with a vision to connect India's rich agricultural heritage with international markets, ensuring uncompromised quality.</p>
              </div>

              {/* Founder 2 */}
              <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100 text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-6 border-4 border-green-50 shadow-md">
                  <img src="/Gemini_Generated_Image_z5bflnz5bflnz5bf.png" alt="Ujjwal Chaudhari" className="w-full h-full object-cover" />
                </div>
                <h4 className="text-xl font-bold text-[#0f3d2e]">Ujjwal Choudhary</h4>
                <p className="font-medium mb-3" style={{ color: "#15803d" }}>Founder</p>
                <p className="text-gray-500 text-sm leading-relaxed">Passionate about reliable supply chains, Ujjwal ensures that every shipment meets the strictest global standards for freshness and compliance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-16 md:py-28 px-4 md:px-6" style={{ background: "linear-gradient(180deg,#f8fdf4 0%,#fafaf7 100%)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#15803d" }}>What We Export</span>
            <h2 className="text-4xl md:text-5xl font-black mt-2" style={{ color: "#0f3d2e" }}>Our Products</h2>
            <div className="w-16 h-1 rounded-full mx-auto mt-4" style={{ background: "linear-gradient(90deg,#15803d,#22c55e)" }} />
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">Farm-fresh, export-grade agricultural products from India's richest growing regions.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((p) => (
              <div
                key={p.name}
                className={`group rounded-3xl overflow-hidden bg-gradient-to-br ${p.color} border border-white shadow-md transition-all duration-400 hover:shadow-2xl hover:-translate-y-2`}
              >
                {/* Product visual */}
                <div className="relative h-48 flex items-center justify-center overflow-hidden" style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.2))` }}>
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/800x600/${p.accent.replace('#','')}22/15803d?text=${encodeURIComponent(p.name)}&font=poppins`;
                    }}
                  />
                  {/* Export badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: `linear-gradient(135deg,${p.accent},${p.accent}cc)` }}>
                    ✓ Export Grade
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2" style={{ color: "#1a2e1a" }}>{p.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{p.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {p.tags.map((tag) => (
                      <span key={tag} className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: "rgba(255,255,255,0.7)", color: p.accent, border: `1px solid ${p.accent}33` }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => scrollTo("Contact")}
                    className="w-full py-3 rounded-2xl text-sm font-semibold transition-all duration-300 hover:scale-[1.02]"
                    style={{ background: `linear-gradient(135deg,${p.accent},${p.accent}bb)`, color: "white", boxShadow: `0 4px 16px ${p.accent}40` }}
                  >
                    📬 Send Inquiry
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" className="py-16 md:py-28 px-4 md:px-6" style={{ background: "linear-gradient(135deg,#0d2e0d,#1a4a1a)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#a8e063" }}>Trust & Compliance</span>
            <h2 className="text-4xl md:text-5xl font-black mt-2 text-white">Certifications & Compliance</h2>
            <div className="w-16 h-1 rounded-full mx-auto mt-4" style={{ background: "linear-gradient(90deg,#a8e063,#d4a72c)" }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CERTS.map((c) => (
              <div key={c.title} className="group p-8 rounded-3xl text-center border transition-all duration-300 hover:scale-105" style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}>
                <div className="text-5xl mb-5 transition-transform duration-300 group-hover:scale-110">{c.icon}</div>
                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-4" style={{ background: "rgba(168,224,99,0.2)", color: "#a8e063" }}>CERTIFIED</div>
                <h3 className="font-bold text-lg text-white mb-2">{c.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why-us" className="py-16 md:py-28 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#15803d" }}>Our Advantage</span>
            <h2 className="text-4xl md:text-5xl font-black mt-2" style={{ color: "#0f3d2e" }}>Why Choose BVM Global</h2>
            <div className="w-16 h-1 rounded-full mx-auto mt-4" style={{ background: "linear-gradient(90deg,#15803d,#22c55e)" }} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {WHY_US.map((w, i) => (
              <div key={w.title} className="group p-6 rounded-3xl text-center border transition-all duration-300 hover:shadow-xl hover:-translate-y-2" style={{ background: "white", borderColor: "#e8f5e0" }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" style={{ background: "linear-gradient(135deg,#f0f9e8,#d4edba)" }}>
                  {w.icon}
                </div>
                <h3 className="font-bold text-sm mb-2" style={{ color: "#1a2e1a" }}>{w.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>

          {/* Banner */}
          <div className="mt-12 md:mt-16 rounded-2xl md:rounded-3xl p-7 md:p-10 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg,#2d6a2d,#5a9e2f)" }}>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-black text-white mb-3 md:mb-4">Ready to source from India?</h3>
              <p className="text-white/80 mb-6 md:mb-8 max-w-lg mx-auto text-sm md:text-base">Partner with BVM Global and get access to premium quality Indian agricultural exports with complete compliance and traceability.</p>
              <button
                onClick={() => scrollTo("Contact")}
                className="px-10 py-4 rounded-2xl font-semibold text-base transition-all duration-300 hover:scale-105"
                style={{ background: "white", color: "#2d6a2d", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
              >
                Get In Touch →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-16 md:py-28 px-4 md:px-6" style={{ background: "linear-gradient(180deg,#f8fdf4,#fafaf7)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "#15803d" }}>Get In Touch</span>
            <h2 className="text-3xl md:text-5xl font-black mt-2" style={{ color: "#0f3d2e" }}>Contact Us</h2>
            <div className="w-16 h-1 rounded-full mx-auto mt-4" style={{ background: "linear-gradient(90deg,#15803d,#22c55e)" }} />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Info */}
            <div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: "#1a2e1a" }}>Let's Build A Partnership</h3>
              <p className="text-gray-500 mb-8 leading-relaxed">Whether you're a retailer, distributor, or importer, we'd love to connect and discuss how BVM Global can serve your needs.</p>

              <div className="space-y-5 mb-8">
                {[
                  { icon: "📧", label: "Email", value: "bvmglobal.impex@gmail.com" },
                  { icon: "📞", label: "Phone", value: "+91 9579240339" },
                  { icon: "📍", label: "Location", value: "Nagpur, Maharashtra, India" },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4 p-4 rounded-2xl" style={{ background: "white", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: "linear-gradient(135deg,#f0f9e8,#d4edba)" }}>{c.icon}</div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-0.5">{c.label}</div>
                      <div className="font-medium text-sm" style={{ color: "#1a2e1a" }}>{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919579240339"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base transition-all duration-300 hover:scale-105 inline-flex"
                style={{ background: "linear-gradient(135deg,#25d366,#128c7e)", color: "white", boxShadow: "0 8px 24px rgba(37,211,102,0.35)", display: "inline-flex" }}
              >
                <span className="text-xl">💬</span> Chat on WhatsApp
              </a>
            </div>

            {/* Form */}
            <div className="p-8 rounded-3xl shadow-xl" style={{ background: "white" }}>
              {submitted ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: "#2d6a2d" }}>Message Sent!</h3>
                  <p className="text-gray-500">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { key: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
                    { key: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
                    { key: "phone", label: "Phone Number", type: "tel", placeholder: "+1 234 567 890" },
                    { key: "country", label: "Country", type: "text", placeholder: "Your country" },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: "#374151" }}>{f.label}</label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        value={formData[f.key]}
                        onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 focus:border-green-400 focus:ring-2 focus:ring-green-100"
                        style={{ borderColor: "#e5e7eb", background: "#fafaf7" }}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: "#374151" }}>Message</label>
                    <textarea
                      placeholder="Tell us about your requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 resize-none"
                      style={{ borderColor: "#e5e7eb", background: "#fafaf7" }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl font-semibold text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                    style={{ background: "linear-gradient(135deg,#15803d,#22c55e)", color: "white", boxShadow: "0 8px 24px rgba(22,163,74,0.30)" }}
                  >
                    🌾 Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0a1f0a" }} className="py-12 md:py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-24 h-24 flex items-center justify-center">
                  <img src="/logo bvm.png" alt="BVM Global" className="w-full h-full object-contain" />
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>Connecting India's finest agricultural produce with global markets — freshness, quality, and trust in every shipment.</p>
              <div className="flex gap-3">
                {["🐦", "📘", "📸", "💼"].map((icon, i) => (
                  <button key={i} className="w-9 h-9 rounded-xl flex items-center justify-center text-sm transition-all duration-200 hover:scale-110" style={{ background: "rgba(255,255,255,0.08)" }}>
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-white mb-5">Quick Links</h4>
              <div className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <button key={link} onClick={() => scrollTo(link)} className="block text-sm transition-colors hover:text-green-400" style={{ color: "rgba(255,255,255,0.5)" }}>
                    → {link}
                  </button>
                ))}
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-bold text-white mb-5">Our Products</h4>
              <div className="space-y-3">
                {PRODUCTS.map((p) => (
                  <div key={p.name} className="text-sm flex items-center gap-2" style={{ color: "rgba(255,255,255,0.5)" }}>
                    <div className="w-6 h-6 rounded overflow-hidden flex-shrink-0">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    {p.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <div className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              © 2025 BVM Global. All rights reserved. | Made with 💚 in India
            </div>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
              DGFT Registered · MSME Certified · APEDA Approved
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
