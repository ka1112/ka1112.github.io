const players = {
  p1ng: {
    name: "joker",
    role: "FORTNITE DIV",
    image: "assets/p1ng.jpg",
    socials: { x: "https://x.com/vexgixac2" },
    achievements: [
      "PR(Asia) 157位 (2026年8月03日時点)",
      "FNCSメジャー2 グランドファイナル 39位"
    ]
  },
  guppa: {
    name: "guppafv",
    role: "FORTNITE DIV",
    image: "assets/guppa.jpg",
    socials: { x: "https://x.com/BackFxxks" },
    achievements: [
      "PR(Asia) 253位 (2026年8月03日時点)",
      "Reload Elite Series Heats1 13位"
    ]
  },
  makaron: {
    name: "マカロン",
    role: "FORTNITE DIV",
    image: "assets/makaron.jpg",
    socials: { x: "https://x.com/makaroonv" },
    achievements: [
      "PR(Asia) 546位 (2026年8月03日時点)",
      "FNCS Div2 21位"
    ]
  },
  comingsoon: {
    name: "ComingSoon",
    role: "FORTNITE DIV",
    image: null,
    socials: {},
    achievements: ["ComingSoon"]
  }
};

const cards = Array.from(document.querySelectorAll(".hero-card"));
const dotsContainer = document.querySelector("[data-carousel-dots]");
let activeIndex = 0;
let carouselTimer;

function setCarousel(index) {
  if (!cards.length || !dotsContainer) return;
  activeIndex = (index + cards.length) % cards.length;

  cards.forEach((card, cardIndex) => {
    card.classList.remove("active", "prev", "next", "far");
    const prevIndex = (activeIndex - 1 + cards.length) % cards.length;
    const nextIndex = (activeIndex + 1) % cards.length;
    if (cardIndex === activeIndex) card.classList.add("active");
    else if (cardIndex === prevIndex) card.classList.add("prev");
    else if (cardIndex === nextIndex) card.classList.add("next");
    else card.classList.add("far");
  });

  Array.from(dotsContainer.children).forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === activeIndex);
  });
}

function startCarousel() {
  if (!cards.length) return;
  window.clearInterval(carouselTimer);
  carouselTimer = window.setInterval(() => setCarousel(activeIndex + 1), 5000);
}

if (cards.length && dotsContainer) {
  cards.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `${index + 1}枚目へ移動`);
    dot.addEventListener("click", () => {
      setCarousel(index);
      startCarousel();
    });
    dotsContainer.appendChild(dot);
  });

  document.querySelector("[data-carousel-prev]")?.addEventListener("click", () => {
    setCarousel(activeIndex - 1);
    startCarousel();
  });

  document.querySelector("[data-carousel-next]")?.addEventListener("click", () => {
    setCarousel(activeIndex + 1);
    startCarousel();
  });

  setCarousel(0);
  startCarousel();
}

const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const modal = document.querySelector("[data-modal]");
const modalName = document.querySelector("#modal-name");
const modalRole = document.querySelector("[data-modal-role]");
const modalPhoto = document.querySelector("[data-modal-photo]");
const modalAchievements = document.querySelector("[data-modal-achievements]");
const modalSocials = document.querySelector("[data-modal-socials]");
const closeModal = document.querySelector("[data-modal-close]");

function openPlayerModal(playerKey) {
  const player = players[playerKey];
  if (!player || !modal || !modalName || !modalRole || !modalPhoto || !modalAchievements || !modalSocials) return;

  modalName.textContent = player.name;
  modalRole.textContent = player.role;

  modalPhoto.className = "modal-photo";
  modalPhoto.innerHTML = "";
  if (player.image) {
    const image = document.createElement("img");
    image.src = player.image;
    image.alt = player.name;
    modalPhoto.appendChild(image);
  } else {
    modalPhoto.classList.add("placeholder");
    modalPhoto.textContent = "ComingSoon";
  }

  modalAchievements.innerHTML = "";
  player.achievements.forEach((achievement) => {
    const item = document.createElement("span");
    item.textContent = achievement;
    modalAchievements.appendChild(item);
  });

  modalSocials.innerHTML = "";
  if (player.socials.x) {
    const xLink = document.createElement("a");
    xLink.href = player.socials.x;
    xLink.target = "_blank";
    xLink.rel = "noreferrer";
    xLink.setAttribute("aria-label", `${player.name} X`);
    xLink.innerHTML = '<img class="social-icon social-icon-x" src="assets/xlogo.jpg" alt="">';
    modalSocials.appendChild(xLink);
  }
  if (player.socials.youtube) {
    const youtubeLink = document.createElement("a");
    youtubeLink.href = player.socials.youtube;
    youtubeLink.target = "_blank";
    youtubeLink.rel = "noreferrer";
    youtubeLink.setAttribute("aria-label", `${player.name} YouTube`);
    youtubeLink.innerHTML = '<img class="social-icon" src="assets/youtube.png" alt="">';
    modalSocials.appendChild(youtubeLink);
  }

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  closeModal?.focus();
}

function hideModal() {
  if (!modal) return;
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-player]").forEach((button) => {
  button.addEventListener("click", () => openPlayerModal(button.dataset.player));
});

closeModal?.addEventListener("click", hideModal);
modal?.addEventListener("click", (event) => {
  if (event.target === modal) hideModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal?.classList.contains("open")) hideModal();
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".section-reveal").forEach((section) => {
  revealObserver.observe(section);
});
function updateMarqueeSpeed() {
  document.querySelectorAll(".marquee-track").forEach((track) => {
    const moveDistance = track.scrollWidth / 2;

    // 1秒間に動く距離。数値が小さいほど遅い
    const speed = 28;

    const duration = moveDistance / speed;
    track.style.animationDuration = `${duration}s`;
  });
}

window.addEventListener("load", updateMarqueeSpeed);

let marqueeResizeTimer;

window.addEventListener("resize", () => {
  window.clearTimeout(marqueeResizeTimer);

  marqueeResizeTimer = window.setTimeout(() => {
    updateMarqueeSpeed();
  }, 150);
});

// Subtle WebGL atmosphere
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !window.WebGLRenderingContext) return;

  const canvas = document.createElement("canvas");
  canvas.className = "webgl-field";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);

  const gl = canvas.getContext("webgl", {
    alpha: true,
    antialias: false,
    depth: false,
    powerPreference: "low-power",
    preserveDrawingBuffer: false
  });
  if (!gl) {
    canvas.remove();
    return;
  }

  const vertexSource = `
    attribute vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fragmentSource = `
    precision mediump float;
    uniform vec2 u_resolution;
    uniform float u_time;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(
        mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
        u.y
      );
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      vec2 centered = uv - 0.5;
      centered.x *= u_resolution.x / u_resolution.y;

      float sweepA = smoothstep(0.018, 0.0, abs(centered.x * 0.72 - centered.y + sin(u_time * 0.2) * 0.14));
      float sweepB = smoothstep(0.012, 0.0, abs(centered.x * -0.45 - centered.y + cos(u_time * 0.14) * 0.18));
      float side = smoothstep(0.95, 0.1, length(centered + vec2(0.28, -0.18)));
      float grain = noise(gl_FragCoord.xy * 0.42 + u_time * 10.0);
      float scan = smoothstep(0.975, 1.0, sin((uv.y + u_time * 0.028) * 205.0));
      float ember = smoothstep(0.92, 1.0, noise(uv * vec2(18.0, 7.0) + vec2(u_time * 0.08, -u_time * 0.03)));

      float red = sweepA * 0.24 + sweepB * 0.09 + scan * 0.055 + ember * 0.05;
      float white = side * 0.08 + grain * 0.026 + sweepB * 0.04;
      vec3 color = vec3(white) + vec3(red, 0.0, 0.018);
      float alpha = clamp(sweepA * 0.28 + sweepB * 0.15 + side * 0.15 + scan * 0.1 + ember * 0.08 + grain * 0.045, 0.0, 0.34);

      gl_FragColor = vec4(color, alpha);
    }
  `;

  function createShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  const vertexShader = createShader(gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentSource);
  if (!vertexShader || !fragmentShader) {
    canvas.remove();
    return;
  }

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    canvas.remove();
    return;
  }

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1,
     1, -1,
    -1,  1,
    -1,  1,
     1, -1,
     1,  1
  ]), gl.STATIC_DRAW);

  const positionLocation = gl.getAttribLocation(program, "a_position");
  const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
  const timeLocation = gl.getUniformLocation(program, "u_time");
  let animationId = 0;
  let lastFrame = 0;
  let webglStarted = false;

  function resizeCanvas() {
    const isMobile = window.innerWidth <= 640;
    const scale = Math.min(window.devicePixelRatio || 1, isMobile ? 1.1 : 1.45);
    const width = Math.max(1, Math.floor(window.innerWidth * scale));
    const height = Math.max(1, Math.floor(window.innerHeight * scale));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }
  }

  function render(now) {
    animationId = window.requestAnimationFrame(render);
    const frameInterval = window.innerWidth <= 640 ? 42 : 33;
    if (now - lastFrame < frameInterval) return;
    lastFrame = now;

    resizeCanvas();
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    gl.uniform1f(timeLocation, now * 0.001);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  window.addEventListener("resize", resizeCanvas, { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      window.cancelAnimationFrame(animationId);
    } else if (webglStarted) {
      lastFrame = 0;
      animationId = window.requestAnimationFrame(render);
    }
  });

  function startWebgl() {
    if (webglStarted) return;
    webglStarted = true;
    lastFrame = 0;
    animationId = window.requestAnimationFrame(render);
  }

  resizeCanvas();
  window.addEventListener("weiser:transition-ready", startWebgl, { once: true });
  window.setTimeout(startWebgl, 4300);
})();
// Page transition
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  const transition = document.querySelector("[data-page-transition]") || (() => {
    const fallback = document.createElement("div");
    fallback.className = "page-transition is-preparing";
    fallback.setAttribute("data-page-transition", "");
    fallback.setAttribute("aria-hidden", "true");
    fallback.innerHTML = '<div class="page-transition-mark"><span>Weiser Osaka</span></div>';
    document.body.prepend(fallback);
    return fallback;
  })();

  const hasSeenIntro = sessionStorage.getItem("weiser-page-intro-seen") === "true";
  const enterDuration = hasSeenIntro ? 1200 : 3600;
  const fontWaitLimit = hasSeenIntro ? 220 : 700;
  const fontReady = document.fonts && document.fonts.ready
    ? Promise.race([
        document.fonts.ready,
        new Promise((resolve) => window.setTimeout(resolve, fontWaitLimit))
      ])
    : Promise.resolve();

  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }

  fontReady.then(() => {
    if (hasSeenIntro) transition.classList.add("is-short");
    transition.classList.remove("is-done", "is-leaving", "is-preparing");

    window.requestAnimationFrame(() => {
      transition.classList.add("is-entering");

      window.setTimeout(() => {
        transition.classList.add("is-done");
        transition.classList.remove("is-entering", "is-short");
        sessionStorage.setItem("weiser-page-intro-seen", "true");
        window.dispatchEvent(new CustomEvent("weiser:transition-ready"));
      }, enterDuration);
    });
  });

  window.addEventListener("pageshow", (event) => {
    if (!event.persisted) return;
    transition.classList.add("is-done");
    transition.classList.remove("is-leaving", "is-entering", "is-short");
  });

  let isNavigating = false;

  document.addEventListener("click", (event) => {
    if (isNavigating) return;

    const link = event.target.closest("a[href]");
    if (!link) return;

    const rawHref = link.getAttribute("href");
    if (!rawHref || rawHref.startsWith("#") || rawHref.startsWith("mailto:") || rawHref.startsWith("tel:")) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    if (link.target && link.target !== "_self") return;
    if (link.hasAttribute("download")) return;

    const url = new URL(rawHref, window.location.href);
    const current = new URL(window.location.href);
    const isExternal = url.origin !== current.origin;
    const isSameDocumentHash = url.pathname === current.pathname && url.search === current.search && url.hash;
    if (isExternal || isSameDocumentHash) return;

    event.preventDefault();
    isNavigating = true;
    transition.classList.remove("is-leaving", "is-entering", "is-short");
    transition.classList.add("is-done");

    window.requestAnimationFrame(() => {
      transition.classList.remove("is-done");
      transition.classList.add("is-leaving");

      window.setTimeout(() => {
        window.location.assign(url.href);
      }, 1200);
    });
  }, true);
})();
