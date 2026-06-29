/* ============================================
   SCRIPT.JS — Inkwell & Crest
   Modular vanilla JS interactions
   ============================================ */
(function () {
  "use strict";

  /* ---------- Helpers ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const on = (el, evt, fn, opts) => el && el.addEventListener(evt, fn, opts);

  /* ---------- SVG icon set ---------- */
  const ICONS = {
    pen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
    layout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>',
    palette: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"/></svg>',
    printer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>',
    headphones: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>',
    video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    megaphone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>',
    shopping: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
    barcode: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5v14M7 5v14M11 5v14M15 5v14M19 5v14"/></svg>',
    award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    penTool: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/></svg>',
    rocket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  };

  /* ============================================
     DATA
     ============================================ */
  const LOGOS = [
    { name: "Amazon", svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm5.6 11.6a.7.7 0 0 1-1 .1c-1.5-1.1-3.4-1.4-5.6-1.4a8 8 0 0 0-2.9.4.6.6 0 0 1-.8-.4.6.6 0 0 1 .4-.8 9.4 9.4 0 0 1 3.3-.5c2.4 0 4.5.4 6.2 1.6a.6.6 0 0 1 .1.9zm1.5-3.3a.85.85 0 0 1-1.2.3A11.4 11.4 0 0 0 12 9.2a11.7 11.7 0 0 0-4.3.8.85.85 0 1 1-.6-1.6A13.2 13.2 0 0 1 12 7.5a13 13 0 0 1 6.8 1.7.85.85 0 0 1 .3 1.1zm.1-3.4c-2-1.2-5.6-1.3-7.6-1.3a16.5 16.5 0 0 0-5 .8 1 1 0 1 1-.7-1.9 18.4 18.4 0 0 1 5.7-.9c2.3 0 6.4.2 8.7 1.6a1 1 0 1 1-1 1.7z"/></svg>' },
    { name: "Barnes & Noble", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>' },
    { name: "Apple Books", svg: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>' },
    { name: "Google Books", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>' },
    { name: "Kobo", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>' },
    { name: "Audible", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>' },
    { name: "Kindle", svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="13" y2="14"/></svg>' },
  ];

  const SERVICES = [
    { icon: "pen", title: "Book Writing", desc: "Your voice. Our craft. Ghostwriting, co-writing, and developmental editing that shapes your ideas into a manuscript worth publishing.", tag: "Stage I" },
    { icon: "book", title: "Book Publication", desc: "From manuscript to masterpiece — published into every major retail channel, in print, ebook, and audio.", tag: "Stage II" },
    { icon: "palette", title: "Cover & Interior Design", desc: "Cover design that stops the scroll. Interior typesetting that makes reading a pleasure. Readers judge — let's make it work for you.", tag: "Stage II" },
    { icon: "megaphone", title: "Marketing & Advertising", desc: "Books don't find readers alone. Pre-launch building, Amazon strategy, paid ads, and email campaigns that turn launch day into momentum.", tag: "Stage III" },
    { icon: "headphones", title: "Press, Articles & Podcasts", desc: "Get into the rooms where your readers already are. Press releases, podcast pitches, and media placements that grow your audience.", tag: "Stage IV" },
    { icon: "award", title: "Book Events", desc: "We don't just publish your book. We fill the room. Curated, fully-staffed author events — from bookstore readings to festival headlines.", tag: "Star Service" },
    { icon: "edit", title: "Developmental Editing", desc: "Structural editing that strengthens pacing, voice, and emotional resonance — the difference between a draft and a book readers can't put down.", tag: null },
    { icon: "layout", title: "Interior Typesetting", desc: "Pixel-perfect layouts for paperback, hardcover, and every e-reader format — beautiful, readable, and retail-ready.", tag: null },
    { icon: "video", title: "Book Trailers", desc: "Cinematic trailers that capture your story's soul and ignite pre-launch buzz across social and email.", tag: null },
    { icon: "globe", title: "Author Platform", desc: "Conversion-optimized author websites with mailing list, book store, and event registration — your home base.", tag: null },
  ];

  const PROCESS = [
    {
      icon: "penTool", step: "I", title: "The Story",
      desc: "Your ideas, your voice, your experience — shaped into a manuscript worth publishing.",
      detail: "Ghostwriting, co-writing, and developmental editing. We start with deep-dive interviews to capture your voice, then build a chapter-by-chapter outline before a single sentence is drafted.",
      deliverables: ["Voice & strategy interviews", "Chapter-by-chapter outline", "Full manuscript draft", "Two revision rounds"],
      timeline: "12–16 weeks",
    },
    {
      icon: "palette", step: "II", title: "The Craft",
      desc: "Cover design that stops the scroll. Interior typesetting that makes reading a pleasure.",
      detail: "Award-winning cover designers create 3 concepts rooted in your genre's bestseller patterns. Interior typesetting follows for print, ebook, and audio formats. Then we publish into every major retail channel on earth.",
      deliverables: ["3 cover design concepts", "Interior typesetting (all formats)", "Global retail distribution", "ISBN & copyright filing"],
      timeline: "4–6 weeks",
    },
    {
      icon: "rocket", step: "III", title: "The Launch",
      desc: "Pre-launch reader building, Amazon strategy, paid advertising, and email campaigns.",
      detail: "We build your reader audience weeks before launch day. Amazon optimization, targeted ads, email sequences, and a launch team of early readers who drive reviews and rankings the moment your book goes live.",
      deliverables: ["Pre-launch reader funnel", "Amazon KDP optimization", "Paid ad campaigns", "Launch team & review strategy"],
      timeline: "4 weeks pre-launch",
    },
    {
      icon: "megaphone", step: "IV", title: "The Amplifier",
      desc: "Press releases, podcast pitches, publication features, and media placements.",
      detail: "We get you into the rooms where your readers already are. Our media team pitches podcasts, publications, and press outlets — securing features that introduce your book to audiences you couldn't reach alone.",
      deliverables: ["Press release distribution", "Podcast booking campaign", "Publication features", "Media training prep"],
      timeline: "Ongoing · 12+ weeks",
    },
    {
      icon: "award", step: "★", title: "The Moment",
      desc: "Curated, produced, fully-staffed author events — from bookstore readings to festival headlines.",
      detail: "This is where a book becomes a movement. Our events team produces curated author experiences — venue booking, staffing, promotion, and on-the-night coordination. The room fills. The audience shows up. Books sell through.",
      deliverables: ["Venue booking & logistics", "Full event staffing", "Promotion & ticketing", "On-night coordination"],
      timeline: "Per event · 3–6 weeks",
    },
  ];

  const BOOKS = [
    { cover: "cover-1", img: "https://sfile.chatglm.cn/images-ppt/b6b0194368a7.jpg", tag: "Memoir", title: "The Quiet Distance", author: "Margaret Westlake", price: "1,200+ sold Wk 1", stars: 5 },
    { cover: "cover-2", img: "https://sfile.chatglm.cn/images-ppt/db9e3e5fba3c.webp", tag: "Literary Fiction", title: "The Salt of Our Mothers", author: "Elena Santos-Cruz", price: "38 bookstore placements", stars: 5 },
    { cover: "cover-3", img: "https://sfile.chatglm.cn/images-ppt/8618f0f03ce0.jpg", tag: "Military Memoir", title: "After the Wire", author: "Robert Callahan", price: "National Bestseller", stars: 5 },
    { cover: "cover-4", img: "https://sfile.chatglm.cn/images-ppt/0693494848d3.jpg", tag: "Psychology", title: "Boundaries as Doorways", author: "Dr. Priya Mehta", price: "2,800+ reader reviews", stars: 5 },
    { cover: "cover-5", img: "https://sfile.chatglm.cn/images-ppt/f18914e87974.jpeg", tag: "Business / Leadership", title: "Lead From Within", author: "Dr. James Okafor", price: "#1 Bestseller · 11 wks", stars: 5 },
    { cover: "cover-6", img: "https://sfile.chatglm.cn/images-ppt/9cc91edd4e80.png", tag: "Entrepreneurship", title: "The Contrarian Founder", author: "Thomas Aldridge", price: "8 wks print sell-through", stars: 4 },
  ];

  const PORTFOLIO = [
    { cat: "memoir", catLabel: "Memoir", title: "The Quiet Distance", size: "size-big", img: "https://sfile.chatglm.cn/images-ppt/d9bff12c3757.jpg" },
    { cat: "business", catLabel: "Business", title: "Lead From Within", size: "", img: "https://sfile.chatglm.cn/images-ppt/adcafda3e4a6.png" },
    { cat: "fiction", catLabel: "Literary Fiction", title: "The Salt of Our Mothers", size: "size-tall", img: "https://sfile.chatglm.cn/images-ppt/787ae204e2b6.jpeg" },
    { cat: "nonfiction", catLabel: "Psychology", title: "Boundaries as Doorways", size: "", img: "https://sfile.chatglm.cn/images-ppt/6cae0dd3643f.jpg" },
    { cat: "business", catLabel: "Entrepreneurship", title: "The Contrarian Founder", size: "size-wide", img: "https://sfile.chatglm.cn/images-ppt/7889eb67c801.jpg" },
    { cat: "nonfiction", catLabel: "Military Memoir", title: "After the Wire", size: "", img: "https://sfile.chatglm.cn/images-ppt/ed0a1032e6d8.jpg" },
    { cat: "fiction", catLabel: "Literary Fiction", title: "Field Notes on Courage", size: "size-tall", img: "https://sfile.chatglm.cn/images-ppt/25098caea1fa.jpg" },
    { cat: "children", catLabel: "Children", title: "Where Rivers Sleep", size: "", img: "https://sfile.chatglm.cn/images-ppt/f66aa7960b78.jpg" },
  ];

  const STATS = [
    { num: 850, suffix: "+", label: "Books Published", sub: "Across every genre", progress: 92 },
    { num: 40, suffix: "+", label: "Events Produced", sub: "Across 18 American cities", progress: 70 },
    { num: 600, suffix: "+", label: "Media Placements", sub: "Press, podcasts & features", progress: 86 },
    { num: 18, suffix: "", label: "Bestseller Lists", sub: "NYT, WSJ & Amazon charts", progress: 80 },
  ];

  const TESTIMONIALS = [
    { initials: "PM", name: "Dr. Priya Mehta", role: "Clinical Psychologist · Boundaries as Doorways", text: "I came in with a clinical manuscript. I left with a book that changed lives. The launch event? People were still talking about it three months later. It's what got me into the APA national conference.", stars: 5 },
    { initials: "RC", name: "Robert Callahan", role: "Decorated Veteran · After the Wire", text: "I knew what I wanted to say. They knew how the world needed to hear it. The press placements and podcast bookings put my story in front of readers I could never have reached alone.", stars: 5 },
    { initials: "ES", name: "Elena Santos-Cruz", role: "Author · The Salt of Our Mothers", text: "They treated my debut like it was already a classic. That confidence became a self-fulfilling prophecy. Thirty-eight bookstore placements and two sold-out events in the first month.", stars: 5 },
    { initials: "JO", name: "Dr. James Okafor", role: "Leadership Coach · Lead From Within", text: "Every idea I brought was sharpened, elevated, and turned into something I'm genuinely proud of. Eleven weeks on the bestseller list. The events team is still booking me to speak.", stars: 5 },
    { initials: "MW", name: "Margaret Westlake", role: "Former U.S. Foreign Service Officer · The Quiet Distance", text: "I had lived the story for thirty years but never believed I could tell it. They didn't just publish my memoir — they built the stage for it. Fourteen media features in the first ninety days.", stars: 5 },
    { initials: "TA", name: "Thomas Aldridge", role: "Entrepreneur · The Contrarian Founder", text: "My last company exit didn't feel as good as holding my finished book for the first time. Eight-week print run sell-through and national press features.", stars: 4 },
  ];

  const PRICING = [
    {
      name: "The Manuscript", price: "3,900", per: "starting", desc: "For authors who have a story to tell and need help telling it — writing and editorial only.",
      popular: false,
      features: [
        { t: "Ghostwriting or co-writing (up to 40k words)", on: true },
        { t: "Developmental + line editing", on: true },
        { t: "Two revision rounds", on: true },
        { t: "Final proofread", on: true },
        { t: "You keep 100% of rights & royalties", on: true },
        { t: "Cover & interior design", on: false },
        { t: "Publication & distribution", on: false },
        { t: "Marketing, press & events", on: false },
      ],
    },
    {
      name: "The Publication", price: "7,900", per: "starting", desc: "Our most popular partnership — manuscript through launch, ready for the world.",
      popular: true,
      features: [
        { t: "Everything in The Manuscript", on: true },
        { t: "Award-winning cover design (3 concepts)", on: true },
        { t: "Interior typesetting (print + ebook)", on: true },
        { t: "Global publication & distribution", on: true },
        { t: "Amazon strategy & optimization", on: true },
        { t: "30-day launch marketing campaign", on: true },
        { t: "Named team — editorial, creative & media leads", on: true },
        { t: "Produced author events", on: false },
      ],
    },
    {
      name: "The Full Journey", price: "14,900", per: "starting", desc: "The complete Author Journey — writing through standing room only. Limited slots per quarter.",
      popular: false,
      features: [
        { t: "Everything in The Publication", on: true },
        { t: "Full ghostwriting (up to 80k words)", on: true },
        { t: "Press, articles & podcast booking", on: true },
        { t: "Produced author events (3 included)", on: true },
        { t: "Keynote & speaking development", on: true },
        { t: "90-day extended marketing", on: true },
        { t: "Priority support & quarterly reviews", on: true },
        { t: "Dedicated events producer", on: true },
      ],
    },
  ];

  const FAQS = [
    { q: "Do I keep the rights and royalties to my book?", a: "Always. You retain 100% of your copyright and every cent of royalties. We are a service partnership, never a publisher that owns your work." },
    { q: "What makes you different from other publishing companies?", a: "Most publishers stop the moment your book is live on Amazon. We don't stop until your audience has assembled in the same room as you — ghostwriting, publishing, design, marketing, press, podcasts, and produced events under one partnership, with a named team behind your book." },
    { q: "How long does the full Author Journey take?", a: "A typical full partnership runs 6 to 10 months from first call to launch event. Ghostwriting alone takes 12–16 weeks depending on length and research. We provide a detailed milestone timeline upfront." },
    { q: "Do you really produce author events?", a: "Yes — it's our signature service. Our events team has produced 40+ curated author events across 18 American cities, from bookstore readings to festival headlines. Every event is fully staffed, and every one has sold through books on the night." },
    { q: "Do you work with first-time authors?", a: "Absolutely. Over half of our authors are publishing for the first time. Our named-team model guides you through every stage of The Author Journey — no prior experience required. Many of our first-timers have gone on to become bestsellers." },
    { q: "How do I get started?", a: "Start with a free discovery consultation. Tell us about your book and your goals, and within one business day our team responds with a recommended path through The Author Journey — timeline and investment included. No obligation." },
  ];

  const POPUPS = [
    { initials: "MW", title: "Margaret W. just published her memoir", sub: "2 minutes ago · United States" },
    { initials: "JO", title: "Dr. James O. hit #1 in Leadership", sub: "5 minutes ago · Chicago" },
    { initials: "ES", title: "Elena S. sold out her launch event", sub: "8 minutes ago · Austin" },
    { initials: "RC", title: "Robert C. booked on 3 podcasts", sub: "12 minutes ago · Denver" },
    { initials: "PM", title: "Dr. Priya M. started her author journey", sub: "15 minutes ago · Seattle" },
  ];

  /* ============================================
     RENDERERS
     ============================================ */
  function renderLogos() {
    const track = $("#logoTrack");
    if (!track) return;
    const buildItem = (l) =>
      `<div class="logo-item">${l.svg}<span>${l.name}</span></div>`;
    // duplicate for seamless loop
    const html = LOGOS.map(buildItem).join("") + LOGOS.map(buildItem).join("");
    track.innerHTML = html;
  }

  function renderServices() {
    const grid = $("#servicesGrid");
    if (!grid) return;
    grid.classList.add("stagger");
    grid.innerHTML = SERVICES.map(
      (s, i) => `
      <article class="service-card spotlight icon-wiggle ${s.tag ? "has-tag" : ""}" data-tilt>
        <span class="service-card__num">${String(i + 1).padStart(2, "0")}</span>
        ${s.tag ? `<span class="eyebrow service-card__tag">${s.tag}</span>` : ""}
        <div class="service-card__icon">${ICONS[s.icon]}</div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
        <a href="#contact" class="service-card__link">Learn more ${ICONS.arrow}</a>
      </article>`
    ).join("");
  }

  function renderProcess() {
    const tl = $("#processTimeline");
    if (!tl) return;
    const line = $("#processLine");
    const steps = PROCESS.map(
      (p, i) => `
      <div class="process__step reveal fade-up" data-step-reveal data-step-index="${i}">
        <button class="process__step-btn" aria-expanded="false" data-step-trigger="${i}">
          <div class="process__step-num" data-step="${p.step}">${ICONS[p.icon]}</div>
          <h4>${p.title}</h4>
          <p>${p.desc}</p>
          <span class="process__step-toggle">Tap to explore <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></span>
        </button>
        <div class="process__detail" data-step-detail="${i}">
          <div class="process__detail-inner">
            <p class="process__detail-text">${p.detail}</p>
            <div class="process__detail-meta">
              <div class="process__detail-deliverables">
                <span class="process__detail-label">What you get</span>
                <ul>${p.deliverables.map((d) => `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>${d}</li>`).join("")}</ul>
              </div>
              <div class="process__detail-timeline">
                <span class="process__detail-label">Timeline</span>
                <span class="process__detail-time">${p.timeline}</span>
              </div>
            </div>
            ${i < PROCESS.length - 1 ? `<button class="process__next" data-step-next="${i + 1}">Next: ${PROCESS[i + 1].title} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></button>` : `<a href="#contact" class="process__next process__next--cta">Start Your Journey <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>`}
          </div>
        </div>
      </div>`
    ).join("");
    tl.insertAdjacentHTML("beforeend", steps);
  }

  function renderBooks() {
    const car = $("#booksCarousel");
    if (!car) return;
    car.innerHTML = BOOKS.map((b) => {
      const stars = Array.from({ length: 5 }, (_, i) =>
        i < b.stars ? ICONS.star : '<svg viewBox="0 0 24 24" fill="currentColor" style="opacity:0.25"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'
      ).join("");
      return `
      <article class="book-card reveal zoom-in">
        <div class="book-card__inner book-card__inner--img" data-tilt>
          <img src="${b.img}" alt="${b.title} book cover" class="book-card__img" loading="lazy" />
          <div class="book-card__cover book-card__cover--img">
            <span class="book-card__tag">${b.tag}</span>
            <div>
              <div class="book-card__title">${b.title}</div>
              <div class="book-card__author">by ${b.author}</div>
            </div>
          </div>
          <div class="book-card__meta">${stars}</div>
        </div>
        <div class="book-card__info">
          <h4>${b.title}</h4>
          <p>by ${b.author}</p>
          <span class="book-card__price">${b.price}</span>
        </div>
      </article>`;
    }).join("");
  }

  function renderPortfolio() {
    const grid = $("#portfolioGrid");
    if (!grid) return;
    grid.classList.add("stagger");
    grid.innerHTML = PORTFOLIO.map(
      (p, i) => `
      <article class="portfolio__item ${p.size} spotlight" data-cat="${p.cat}" data-tilt>
        <img src="${p.img}" alt="${p.title} book cover" class="portfolio__img" loading="lazy" />
        <div class="portfolio__overlay">
          <span class="portfolio__cat">${p.catLabel}</span>
          <span class="portfolio__title">${p.title}</span>
          <span class="portfolio__view">View Cover <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span>
        </div>
      </article>`
    ).join("");
  }

  function renderStats() {
    const grid = $("#statsGrid");
    if (!grid) return;
    grid.innerHTML = STATS.map(
      (s) => `
      <div class="stat-block reveal zoom-in">
        <div class="stat-block__circle">
          <svg viewBox="0 0 120 120">
            <circle class="track" cx="60" cy="60" r="50"/>
            <circle class="bar" cx="60" cy="60" r="50" data-progress="${s.progress}"/>
          </svg>
          <div class="stat-block__num" data-count="${s.num}" data-suffix="${s.suffix}">0</div>
        </div>
        <div class="stat-block__label">${s.label}</div>
        <div class="stat-block__sub">${s.sub}</div>
      </div>`
    ).join("");
  }

  function renderTestimonials() {
    const track = $("#testimonialsTrack");
    const dots = $("#testimonialsDots");
    if (!track) return;
    track.innerHTML = TESTIMONIALS.map((t) => {
      const stars = Array.from({ length: 5 }, (_, i) =>
        i < t.stars
          ? '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'
          : '<svg viewBox="0 0 24 24" fill="currentColor" style="opacity:0.3"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'
      ).join("");
      return `
      <article class="testimonial-card">
        <span class="testimonial-card__quote">&ldquo;</span>
        <div class="testimonial-card__stars">${stars}</div>
        <p class="testimonial-card__text">${t.text}</p>
        <div class="testimonial-card__author">
          <div class="testimonial-card__avatar">${t.initials}</div>
          <div>
            <div class="testimonial-card__name">${t.name}</div>
            <div class="testimonial-card__role">${t.role}</div>
          </div>
        </div>
      </article>`;
    }).join("");

    if (dots) {
      dots.innerHTML = TESTIMONIALS.map((_, i) =>
        `<button class="testimonials__dot ${i === 0 ? "active" : ""}" data-dot="${i}" aria-label="Go to testimonial ${i + 1}"></button>`
      ).join("");
    }
  }

  function renderPricing() {
    const grid = $("#pricingGrid");
    if (!grid) return;
    grid.classList.add("stagger");
    grid.innerHTML = PRICING.map((p) => {
      const feats = p.features
        .map(
          (f) =>
            `<div class="pricing-card__feature ${f.on ? "" : "muted"}">${
              f.on
                ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
                : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
            }<span>${f.t}</span></div>`
        )
        .join("");
      return `
      <article class="pricing-card ${p.popular ? "popular" : ""}">
        ${p.popular ? '<span class="pricing__badge">Popular</span>' : ""}
        <div class="pricing-card__name">${p.name}</div>
        <div class="pricing-card__price">
          <span class="amt">$${p.price}</span>
          <span class="per">${p.per}</span>
        </div>
        <p class="pricing-card__desc">${p.desc}</p>
        <div class="pricing-card__features">${feats}</div>
        <a href="#contact" class="btn btn-shine ${p.popular ? "btn-primary" : "btn-ghost"} magnetic">Choose ${p.name}</a>
      </article>`;
    }).join("");
  }

  function renderFAQ() {
    const wrap = $("#faqWrap");
    if (!wrap) return;
    wrap.innerHTML = FAQS.map(
      (f, i) => `
      <div class="faq__item reveal fade-up ${i === 0 ? "open" : ""}" style="animation-delay:${i * 0.05}s">
        <button class="faq__q" aria-expanded="${i === 0 ? "true" : "false"}">
          <span>${f.q}</span>
          <span class="faq__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
        </button>
        <div class="faq__a"><div class="faq__a-inner">${f.a}</div></div>
      </div>`
    ).join("");
    // open first
    const firstA = $(".faq__a", wrap);
    const firstQ = $(".faq__q", wrap);
    if (firstA && firstQ) {
      firstA.style.maxHeight = firstA.scrollHeight + "px";
    }
  }

  /* ============================================
     MODULES
     ============================================ */

  // Preloader
  function initPreloader() {
    const pre = $("#preloader");
    if (!pre) return;
    window.addEventListener("load", function () {
      setTimeout(() => pre.classList.add("hidden"), 400);
    });
    // fallback
    setTimeout(() => pre.classList.add("hidden"), 2500);
  }

  // Navbar scroll
  function initNav() {
    const nav = $("#nav");
    if (!nav) return;
    const onScroll = () => {
      if (window.scrollY > 60) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Mobile menu
  function initMobileMenu() {
    const toggle = $("#navToggle");
    const menu = $("#mobileMenu");
    const overlay = $("#mobileOverlay");
    const closeBtn = $("#mobileMenuClose");
    if (!toggle || !menu) return;
    const close = () => {
      menu.classList.remove("open");
      overlay.classList.remove("open");
      toggle.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };
    const open = () => {
      menu.classList.add("open");
      overlay.classList.add("open");
      toggle.classList.add("active");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    };
    on(toggle, "click", () => (menu.classList.contains("open") ? close() : open()));
    if (closeBtn) on(closeBtn, "click", close);
    on(overlay, "click", close);
    $$(".mobile-menu__link", menu).forEach((l) => on(l, "click", close));
    // close on Escape
    on(document, "keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) close();
    });
  }

  // Smooth scroll for anchor links
  function initSmoothScroll() {
    $$('a[href^="#"]').forEach((a) => {
      on(a, "click", function (e) {
        const id = this.getAttribute("href");
        if (id === "#" || id.length < 2) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const navH = 70;
        const y = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top: y, behavior: "smooth" });
      });
    });
  }

  // Scroll progress bar
  function initScrollProgress() {
    const bar = $("#scrollProgress");
    if (!bar) return;
    const update = () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
      bar.style.width = (scrolled * 100) + "%";
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  // Cursor glow
  function initCursorGlow() {
    const glow = $("#cursorGlow");
    if (!glow) return;
    if (window.innerWidth < 768) return;
    let x = 0, y = 0, tx = 0, ty = 0;
    document.addEventListener("mousemove", (e) => {
      tx = e.clientX;
      ty = e.clientY;
    });
    const animate = () => {
      x += (tx - x) * 0.15;
      y += (ty - y) * 0.15;
      glow.style.left = x + "px";
      glow.style.top = y + "px";
      requestAnimationFrame(animate);
    };
    animate();
  }

  // Scroll reveal via IntersectionObserver
  function initReveal() {
    const els = $$(".reveal");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => { el.style.opacity = 1; });
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = "running";
            // trigger counter if it has data-count
            if (entry.target.hasAttribute("data-count")) {
              animateCounter(entry.target);
            }
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => {
      // set animation paused until visible (so delays hold)
      el.style.animationPlayState = "paused";
      io.observe(el);
    });

    // Also observe counter elements and stat bars specifically
    $$("[data-count]").forEach((el) => io.observe(el));
    $$(".stat-block__circle .bar").forEach((el) => observeStatBar(el, io));
    if ($("#processLine")) observeProcess(io);
  }

  function observeStatBar(el, io) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const prog = parseInt(el.getAttribute("data-progress"), 10);
            const offset = 314 - (314 * prog) / 100;
            el.style.strokeDashoffset = offset;
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
  }

  function observeProcess(io) {
    const line = $("#processLine");
    const steps = $$("[data-step-reveal]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            line.classList.add("active");
            steps.forEach((s, i) => {
              setTimeout(() => s.classList.add("in-view"), i * 200);
            });
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    const tl = $("#processTimeline");
    if (tl) obs.observe(tl);
  }

  // Counter animation
  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-count"), 10);
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 2000;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const val = Math.floor(eased * target);
      el.textContent = val + suffix;
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    };
    requestAnimationFrame(step);
  }

  // Rotating words
  function initRotatingWords() {
    const el = $("#rotatingWord");
    if (!el) return;
    const words = ["Standing Room Only.", "A Bestseller.", "A Movement.", "Headlined.", "Unforgettable."];
    let i = 0;
    setInterval(() => {
      i = (i + 1) % words.length;
      el.style.opacity = 0;
      el.style.transform = "translateY(-12px)";
      el.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      setTimeout(() => {
        el.textContent = words[i];
        el.style.opacity = 1;
        el.style.transform = "translateY(0)";
      }, 400);
    }, 2800);
  }

  // Magnetic buttons
  function initMagnetic() {
    if (window.innerWidth < 992) return;
    $$(".magnetic").forEach((btn) => {
      on(btn, "mousemove", function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        this.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
      });
      on(btn, "mouseleave", function () {
        this.style.transform = "";
      });
    });
  }

  // Ripple effect
  function initRipple() {
    $$(".btn").forEach((btn) => {
      on(btn, "click", function (e) {
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const ripple = document.createElement("span");
        ripple.className = "ripple";
        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
        ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 650);
      });
    });
  }

  // Tilt cards
  function initTilt() {
    if (window.innerWidth < 992) return;
    $$("[data-tilt]").forEach((card) => {
      const strength = 8;
      on(card, "mousemove", function (e) {
        const rect = this.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rx = (0.5 - py) * strength;
        const ry = (px - 0.5) * strength;
        this.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
      });
      on(card, "mouseleave", function () {
        this.style.transform = "";
      });
    });
  }

  // Books carousel nav
  function initBooksCarousel() {
    const car = $("#booksCarousel");
    const prev = $("#booksPrev");
    const next = $("#booksNext");
    if (!car) return;
    const scrollBy = () => Math.min(car.offsetWidth * 0.8, 340);
    on(prev, "click", () => car.scrollBy({ left: -scrollBy(), behavior: "smooth" }));
    on(next, "click", () => car.scrollBy({ left: scrollBy(), behavior: "smooth" }));
  }

  // Portfolio filter
  function initPortfolioFilter() {
    const btns = $$(".filter-btn");
    const items = $$(".portfolio__item");
    if (!btns.length) return;
    btns.forEach((btn) => {
      on(btn, "click", function () {
        btns.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
        const f = this.getAttribute("data-filter");
        items.forEach((item) => {
          const cat = item.getAttribute("data-cat");
          if (f === "all" || cat === f) {
            item.classList.remove("hide");
            item.style.animation = "zoomIn 0.5s ease forwards";
          } else {
            item.classList.add("hide");
          }
        });
      });
    });
  }

  // Testimonials slider
  function initTestimonials() {
    const track = $("#testimonialsTrack");
    const dots = $("#testimonialsDots");
    if (!track) return;
    let index = 0;
    let timer = null;

    const perView = () => {
      if (window.innerWidth < 768) return 1;
      if (window.innerWidth < 992) return 2;
      return 3;
    };

    const maxIndex = () => Math.max(0, TESTIMONIALS.length - perView());

    const go = (i) => {
      index = Math.min(Math.max(0, i), maxIndex());
      const cardW = track.children[0].getBoundingClientRect().width + 24;
      track.style.transform = `translateX(${-index * cardW}px)`;
      $$(".testimonials__dot").forEach((d, di) =>
        d.classList.toggle("active", di === index)
      );
    };

    const start = () => {
      stop();
      timer = setInterval(() => {
        index = index >= maxIndex() ? 0 : index + 1;
        go(index);
      }, 5000);
    };
    const stop = () => timer && clearInterval(timer);

    on(dots, "click", (e) => {
      const t = e.target.closest("[data-dot]");
      if (!t) return;
      go(parseInt(t.getAttribute("data-dot"), 10));
      start();
    });

    const slider = track.closest(".testimonials__slider");
    on(slider, "mouseenter", stop);
    on(slider, "mouseleave", start);

    window.addEventListener("resize", () => go(index));

    setTimeout(() => {
      go(0);
      start();
    }, 400);
  }

  // FAQ accordion
  function initFAQ() {
    const wrap = $("#faqWrap");
    if (!wrap) return;
    on(wrap, "click", function (e) {
      const btn = e.target.closest(".faq__q");
      if (!btn) return;
      const item = btn.parentElement;
      const ans = $(".faq__a", item);
      const isOpen = item.classList.contains("open");
      // close all
      $$(".faq__item", wrap).forEach((it) => {
        it.classList.remove("open");
        $(".faq__q", it).setAttribute("aria-expanded", "false");
        const a = $(".faq__a", it);
        if (a) a.style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
        ans.style.maxHeight = ans.scrollHeight + "px";
      }
    });
  }

  // Submit form data to FormSubmit.co via AJAX (no backend needed)
  // FormSubmit sends the submission straight to your email inbox.
  // First submission triggers a one-time confirmation email from FormSubmit —
  // you must click that link once to activate email delivery.
  // The function always resolves so the UI confirms to the user regardless
  // (network errors never block the user experience).
  function submitToFormSubmit(form) {
    const email = form.getAttribute("data-formsubmit");
    if (!email) return Promise.resolve({ success: true });
    const formData = new FormData(form);
    const payload = new URLSearchParams();
    for (const [k, v] of formData.entries()) {
      if (k === "_honey") continue;
      payload.append(k, v);
    }
    return fetch("https://formsubmit.co/ajax/" + email, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: payload,
    })
      .then(() => ({ success: true }))
      .catch(() => ({ success: true }));
  }

  // Fire tracking pixel events (Meta + GA4) — safe if pixels not configured
  function trackEvent(eventName, data) {
    try {
      if (typeof fbq === "function") fbq("track", eventName, data || {});
    } catch (e) {}
    try {
      if (typeof gtag === "function") gtag("event", eventName, data || {});
    } catch (e) {}
  }

  // Contact form validation + FormSubmit submission
  function initContactForm() {
    const form = $("#contactForm");
    if (!form) return;
    const success = $("#formSuccess");

    // floating labels
    $$(".form-control", form).forEach((input) => {
      on(input, "input", function () {
        const group = this.closest(".form-group");
        if (this.value.trim()) group.classList.add("filled");
        else group.classList.remove("filled");
      });
      on(input, "blur", function () {
        const group = this.closest(".form-group");
        if (this.value.trim()) group.classList.add("filled");
        else group.classList.remove("filled");
      });
    });

    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRe = /^[+()\-\s\d]{7,}$/;

    const validate = () => {
      let ok = true;
      const name = $("#cf-name");
      const email = $("#cf-email");
      const phone = $("#cf-phone");
      const service = $("#cf-service");
      const message = $("#cf-message");

      const setError = (el, has) => {
        const g = el.closest(".form-group");
        if (has) { g.classList.add("error"); ok = false; }
        else g.classList.remove("error");
      };

      setError(name, !name.value.trim());
      setError(email, !emailRe.test(email.value.trim()));
      setError(phone, phone.value.trim() && !phoneRe.test(phone.value.trim()));
      setError(service, !service.value);
      setError(message, message.value.trim().length < 10);

      return ok;
    };

    on(form, "submit", function (e) {
      e.preventDefault();
      if (!validate()) {
        const firstErr = $(".form-group.error", form);
        if (firstErr) firstErr.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      const btn = $("button[type=submit]", form);
      const orig = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = "Sending...";

      submitToFormSubmit(form).then((res) => {
        // success regardless — FormSubmit is the email path; UI always confirms
        success.classList.add("show");
        trackEvent("Lead", { content_name: "Consultation Request", service: $("#cf-service").value });
        form.reset();
        $$(".form-group", form).forEach((g) => g.classList.remove("filled"));
        btn.disabled = false;
        btn.innerHTML = orig;
        setTimeout(() => success.classList.remove("show"), 6000);
      });
    });
  }

  // Newsletter
  function initNewsletter() {
    const form = $("#newsletterForm");
    if (!form) return;
    on(form, "submit", function (e) {
      e.preventDefault();
      const input = $("input[type=email]", form);
      const btn = $("button", form);
      const orig = btn.innerHTML;

      submitToFormSubmit(form).then(() => {
        trackEvent("Subscribe", { content_name: "Author's Guide Newsletter" });
        input.value = "";
        input.placeholder = "Subscribed! Check your inbox.";
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
        setTimeout(() => {
          btn.innerHTML = orig;
          input.placeholder = "Your email address";
        }, 3500);
      });
    });
  }

  // Back to top
  function initBackTop() {
    const btn = $("#backTop");
    if (!btn) return;
    const onScroll = () => {
      if (window.scrollY > 600) btn.classList.add("show");
      else btn.classList.remove("show");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    on(btn, "click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  // Live popup notifications
  function initLivePopup() {
    const popup = $("#livePopup");
    const close = $("#popupClose");
    if (!popup) return;
    let idx = 0;
    let timer = null;
    let visible = false;

    const show = () => {
      const p = POPUPS[idx % POPUPS.length];
      $("#popupAvatar").textContent = p.initials;
      $("#popupTitle").textContent = p.title;
      $("#popupSub").textContent = p.sub;
      popup.classList.remove("hide");
      popup.classList.add("show");
      visible = true;
      setTimeout(hide, 5000);
    };
    const hide = () => {
      popup.classList.remove("show");
      popup.classList.add("hide");
      visible = false;
    };

    on(close, "click", () => {
      hide();
      // stop cycling after dismiss
      if (timer) clearInterval(timer);
      setTimeout(() => { timer = setInterval(cycle, 12000); }, 30000);
    });

    const cycle = () => {
      if (visible) return;
      idx++;
      show();
    };

    // start after delay
    setTimeout(() => {
      show();
      timer = setInterval(cycle, 12000);
    }, 6000);
  }

  // Parallax for hero visual
  function initParallax() {
    const visual = $("[data-parallax]");
    if (!visual || window.innerWidth < 992) return;
    const books = $$(".float-book", visual);
    const chips = $$(".hero__chip", visual);
    const orb = $(".hero__orb", visual);
    on(visual, "mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      books.forEach((b, i) => {
        const depth = (i + 1) * 10;
        b.style.transition = "transform 0.2s ease-out";
        b.style.marginLeft = (x * depth) + "px";
        b.style.marginTop = (y * depth) + "px";
      });
      chips.forEach((c, i) => {
        const depth = (i + 1) * 6;
        c.style.transition = "transform 0.2s ease-out";
        c.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
      });
      if (orb) {
        orb.style.transition = "transform 0.3s ease-out";
        orb.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
      }
    });
    on(visual, "mouseleave", function () {
      books.forEach((b) => { b.style.marginLeft = ""; b.style.marginTop = ""; });
      chips.forEach((c) => { c.style.transform = ""; });
      if (orb) orb.style.transform = "";
    });
  }

  // Footer year
  function initYear() {
    const el = $("#year");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ============================================
     NEW MODULES (v2 — guided scrolling & micro-interactions)
     ============================================ */

  // Stagger + spotlight + clip-reveal + enter-scale-blur observer
  function initAdvancedReveal() {
    const els = $$(".stagger, .clip-reveal, .enter-scale-blur, .split-words");
    if (!els.length || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in-view"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    els.forEach((el) => io.observe(el));
  }

  // Spotlight cursor tracking (cards follow mouse with glow)
  function initSpotlight() {
    if (window.innerWidth < 992) return;
    $$(".spotlight").forEach((card) => {
      on(card, "mousemove", function (e) {
        const rect = this.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        this.style.setProperty("--mx", x + "%");
        this.style.setProperty("--my", y + "%");
      });
    });
  }

  // Scroll-spy section dots (guided navigation)
  function initScrollSpy() {
    const dotsWrap = $("#scrollSpyDots");
    if (!dotsWrap) return;
    const sections = [
      { id: "home", label: "Home" },
      { id: "services", label: "Services" },
      { id: "why", label: "The Network" },
      { id: "process", label: "How It Works" },
      { id: "books", label: "Our Authors" },
      { id: "portfolio", label: "Portfolio" },
      { id: "stats", label: "By The Numbers" },
      { id: "testimonials", label: "Author Voices" },
      { id: "pricing", label: "Pricing" },
      { id: "faq", label: "FAQ" },
      { id: "contact", label: "Contact" },
    ];

    // build dots
    dotsWrap.innerHTML = sections
      .map((s) => `<button class="scroll-spy-dots__dot" data-target="${s.id}" data-label="${s.label}" aria-label="Go to ${s.label}"></button>`)
      .join("");
    const dots = $$(".scroll-spy-dots__dot", dotsWrap);

    // click to scroll
    dots.forEach((dot) => {
      on(dot, "click", function () {
        const target = document.getElementById(this.getAttribute("data-target"));
        if (target) {
          const y = target.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      });
    });

    // show dots after scrolling past hero
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) dotsWrap.classList.add("visible");
      else dotsWrap.classList.remove("visible");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // active section tracking — use scroll position for reliability
    const sectionEls = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean);
    const updateActive = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.3;
      let current = sections[0].id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= scrollPos) current = s.id;
      }
      dots.forEach((d) =>
        d.classList.toggle("active", d.getAttribute("data-target") === current)
      );
    };
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
  }

  // Active nav link highlight on scroll
  function initNavSpy() {
    const navLinks = $$(".nav__links .nav__link");
    if (!navLinks.length) return;
    const navMap = {};
    navLinks.forEach((l) => {
      const href = l.getAttribute("href");
      if (href && href.startsWith("#")) navMap[href.slice(1)] = l;
    });
    const updateActive = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.3;
      const sections = $$("section[id]");
      let current = "";
      sections.forEach((s) => {
        if (s.offsetTop <= scrollPos) current = s.id;
      });
      navLinks.forEach((l) => l.classList.remove("active"));
      if (current && navMap[current]) navMap[current].classList.add("active");
    };
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
  }

  // Global parallax layers (data-parallax-layer with speed)
  function initParallaxLayers() {
    if (window.innerWidth < 992) return;
    const layers = $$("[data-parallax-layer]");
    if (!layers.length) return;
    let ticking = false;
    const update = () => {
      const scrollY = window.scrollY;
      layers.forEach((layer) => {
        const speed = parseFloat(layer.getAttribute("data-parallax-layer")) || 0.2;
        const rect = layer.getBoundingClientRect();
        const offset = (rect.top + scrollY - scrollY) * speed;
        layer.style.transform = `translateY(${(scrollY - (rect.top + scrollY)) * speed * -0.1}px)`;
      });
      ticking = false;
    };
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
  }

  // Counter bump animation when stats come into view
  function initCounterBump() {
    const nums = $$(".stat-block__num");
    if (!nums.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target;
            el.classList.add("count-pop", "bump");
            setTimeout(() => el.classList.remove("bump"), 350);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    nums.forEach((n) => io.observe(n));
  }

  // Interactive process steps — click to expand detail panel, next-step nav
  function initProcessInteractive() {
    const tl = $("#processTimeline");
    if (!tl) return;
    const steps = $$(".process__step", tl);

    const openStep = (index) => {
      steps.forEach((s, i) => {
        const isOpen = i === index;
        s.classList.toggle("active", isOpen);
        const btn = $(".process__step-btn", s);
        if (btn) btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
      // scroll the detail panel into view after expansion
      setTimeout(() => {
        const activeDetail = $(".process__step.active .process__detail", tl);
        if (activeDetail) {
          const rect = activeDetail.getBoundingClientRect();
          if (rect.top < 80 || rect.bottom > window.innerHeight) {
            activeDetail.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }
      }, 350);
    };

    const closeAll = () => {
      steps.forEach((s) => {
        s.classList.remove("active");
        const btn = $(".process__step-btn", s);
        if (btn) btn.setAttribute("aria-expanded", "false");
      });
    };

    // click step button to toggle
    steps.forEach((step, i) => {
      const btn = $(".process__step-btn", step);
      on(btn, "click", function (e) {
        if (step.classList.contains("active")) closeAll();
        else openStep(i);
      });
      // next button inside detail
      const nextBtn = $(".process__next[data-step-next]", step);
      if (nextBtn) {
        on(nextBtn, "click", function (e) {
          e.stopPropagation();
          const nextIdx = parseInt(this.getAttribute("data-step-next"), 10);
          openStep(nextIdx);
        });
      }
    });

    // all tabs start closed — user clicks "Tap to explore" to open
    // (no auto-open; gives users control)
  }

  // Magnetic nav links — attract toward cursor
  function initMagneticNav() {
    if (window.innerWidth < 992) return;
    $$(".nav__link").forEach((link) => {
      on(link, "mousemove", function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        this.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
      });
      on(link, "mouseleave", function () {
        this.style.transform = "";
      });
    });
  }

  // Service card glow trail — track cursor for radial glow
  function initCardGlowTrail() {
    if (window.innerWidth < 992) return;
    $$(".service-card").forEach((card) => {
      on(card, "mousemove", function (e) {
        const rect = this.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        this.style.setProperty("--mx", x + "%");
        this.style.setProperty("--my", y + "%");
      });
    });
  }

  // Section progress indicator (bottom-left)
  function initSectionProgress() {
    const prog = $("#sectionProgress");
    if (!prog) return;
    const numEl = $("#sectionProgressNum");
    const labelEl = $("#sectionProgressLabel");
    const barEl = $("#sectionProgressBar");
    const sections = [
      { id: "home", label: "Home" },
      { id: "services", label: "Services" },
      { id: "why", label: "Network" },
      { id: "process", label: "Process" },
      { id: "books", label: "Authors" },
      { id: "portfolio", label: "Portfolio" },
      { id: "stats", label: "Numbers" },
      { id: "testimonials", label: "Voices" },
      { id: "pricing", label: "Pricing" },
      { id: "faq", label: "FAQ" },
      { id: "contact", label: "Contact" },
    ];

    const update = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.3;
      let current = 0;
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPos) current = i;
      }
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((window.scrollY / docHeight) * 100, 100);
      numEl.textContent = String(current + 1).padStart(2, "0");
      labelEl.textContent = sections[current].label;
      barEl.style.width = progress + "%";
      if (window.scrollY > window.innerHeight * 0.5) prog.classList.add("visible");
      else prog.classList.remove("visible");
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  // Section-head in-view observer (triggers animated underline)
  function initSectionHeadReveal() {
    const heads = $$(".section-head");
    if (!heads.length || !("IntersectionObserver" in window)) {
      heads.forEach((h) => h.classList.add("in-view"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    heads.forEach((h) => io.observe(h));
  }

  /* ============================================
     INIT
     ============================================ */
  function init() {
    // render data first
    renderLogos();
    renderServices();
    renderProcess();
    renderBooks();
    renderPortfolio();
    renderStats();
    renderTestimonials();
    renderPricing();
    renderFAQ();

    // modules
    initPreloader();
    initNav();
    initMobileMenu();
    initSmoothScroll();
    initScrollProgress();
    initCursorGlow();
    initReveal();
    initRotatingWords();
    initMagnetic();
    initRipple();
    initTilt();
    initBooksCarousel();
    initPortfolioFilter();
    initTestimonials();
    initFAQ();
    initContactForm();
    initNewsletter();
    initBackTop();
    initLivePopup();
    initParallax();
    initYear();
    // new v2 modules
    initAdvancedReveal();
    initSpotlight();
    initScrollSpy();
    initNavSpy();
    initParallaxLayers();
    initCounterBump();
    initProcessInteractive();
    // new v3 modules
    initMagneticNav();
    initCardGlowTrail();
    initSectionProgress();
    initSectionHeadReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
