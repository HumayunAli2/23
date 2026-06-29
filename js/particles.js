/* ============================================
   PARTICLES.JS — Hero canvas particle system
   Lightweight, dependency-free, optimized
   ============================================ */
(function () {
  "use strict";

  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = 0,
    height = 0,
    particles = [],
    mouse = { x: -9999, y: -9999 },
    raf = null,
    running = true;

  const COLORS = ["#B30000", "#E63946", "#FF5A5F", "#8B0000"];
  const isMobile = window.innerWidth < 768;
  const PARTICLE_COUNT = isMobile ? 16 : 36;
  const CONNECT_DIST = isMobile ? 70 : 110;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function Particle() {
    this.reset(true);
  }

  Particle.prototype.reset = function (initial) {
    this.x = rand(0, width);
    this.y = initial ? rand(0, height) : height + 20;
    this.r = rand(1.2, 3.4);
    this.vx = rand(-0.35, 0.35);
    this.vy = rand(-0.6, -0.15);
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.alpha = rand(0.25, 0.7);
    this.pulse = rand(0, Math.PI * 2);
    this.pulseSpeed = rand(0.01, 0.03);
  };

  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.pulse += this.pulseSpeed;

    // mouse repulsion
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 120 && dist > 0) {
      const force = (120 - dist) / 120;
      this.x += (dx / dist) * force * 1.6;
      this.y += (dy / dist) * force * 1.6;
    }

    if (this.y < -20 || this.x < -20 || this.x > width + 20) {
      this.reset(false);
    }
  };

  Particle.prototype.draw = function () {
    const a = this.alpha + Math.sin(this.pulse) * 0.15;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = Math.max(0, Math.min(1, a));
    ctx.fill();

    // glow
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r * 2.6, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = Math.max(0, Math.min(1, a * 0.12));
    ctx.fill();
    ctx.globalAlpha = 1;
  };

  function init() {
    resize();
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
  }

  function connect() {
    // Optimize: skip connections on mobile (expensive O(n²))
    if (isMobile) return;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distSq = dx * dx + dy * dy;
        if (distSq < CONNECT_DIST * CONNECT_DIST) {
          const dist = Math.sqrt(distSq);
          const a = (1 - dist / CONNECT_DIST) * 0.2;
          ctx.strokeStyle = "rgba(230, 57, 70, " + a + ")";
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    if (!running) return;
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    connect();
    raf = requestAnimationFrame(loop);
  }

  function start() {
    if (raf) cancelAnimationFrame(raf);
    running = true;
    loop();
  }

  function stop() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
  }

  // mouse tracking on the hero section
  const hero = canvas.parentElement;
  hero.addEventListener("mousemove", function (e) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  hero.addEventListener("mouseleave", function () {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  // touch
  hero.addEventListener(
    "touchmove",
    function (e) {
      const rect = canvas.getBoundingClientRect();
      const t = e.touches[0];
      mouse.x = t.clientX - rect.left;
      mouse.y = t.clientY - rect.top;
    },
    { passive: true }
  );

  // pause when offscreen / tab hidden for performance
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop();
    else start();
  });

  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(init, 250);
  });

  // respect reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  init();
  start();
})();
