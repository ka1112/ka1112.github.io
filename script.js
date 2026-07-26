const players = {
  p1ng: {
    name: "p1ng",
    role: "FORTNITE DIV",
    image: "assets/p1ng.jpg",
    socials: { x: "https://x.com/vexgixac2" },
    achievements: [
      "PR(Asia) 166位 (2026年7月24日時点)",
      "FNCSメジャー2 ヒート2 5位"
    ]
  },
  guppa: {
    name: "guppa",
    role: "FORTNITE DIV",
    image: "assets/guppa.jpg",
    socials: { x: "https://x.com/BackFxxks" },
    achievements: [
      "PR(Asia) 279位 (2026年7月24日時点)",
      "Reload Elite Series Heats1 13位"
    ]
  },
  makaron: {
    name: "マカロン",
    role: "FORTNITE DIV",
    image: "assets/makaron.jpg",
    socials: { x: "https://x.com/makaroonv" },
    achievements: [
      "PR(Asia) 537位 (2026年7月24日時点)",
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
