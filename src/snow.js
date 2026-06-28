// Nieve animada sobre el fondo del lanzador, por debajo de la interfaz.
const FLAKE_DENSITY = 0.00009; // copos por píxel del lienzo

export function startSnow(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let flakes = [];
  let width = 0;
  let height = 0;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function createFlake() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 0.8 + Math.random() * 2.6,
      speedY: 12 + Math.random() * 38,
      drift: -8 + Math.random() * 16,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.4 + Math.random() * 0.8,
      opacity: 0.35 + Math.random() * 0.5,
    };
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const target = Math.round(width * height * FLAKE_DENSITY);
    flakes = Array.from({ length: target }, createFlake);
  }

  let lastTime = performance.now();

  function frame(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#ffffff";

    for (const flake of flakes) {
      flake.sway += flake.swaySpeed * dt;
      flake.y += flake.speedY * dt;
      flake.x += (flake.drift + Math.sin(flake.sway) * 14) * dt;

      if (flake.y - flake.radius > height) {
        flake.y = -flake.radius;
        flake.x = Math.random() * width;
      }
      if (flake.x < -flake.radius) flake.x = width + flake.radius;
      else if (flake.x > width + flake.radius) flake.x = -flake.radius;

      ctx.globalAlpha = flake.opacity;
      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    rafId = requestAnimationFrame(frame);
  }

  let rafId = 0;

  function start() {
    if (reduceMotion.matches) {
      resize();
      return;
    }
    lastTime = performance.now();
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(frame);
  }

  resize();
  start();

  window.addEventListener("resize", resize);
  reduceMotion.addEventListener?.("change", start);
}
