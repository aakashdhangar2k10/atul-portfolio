/* ============================================================
   app.js
   One shared script for the whole site. Every feature below
   checks that its elements exist before running, so this same
   file is safely included on every page with nothing extra
   to add per-page.
   ============================================================ */

document.addEventListener("partials:ready", initApp);
// fallback in case partials.js is ever removed from a page
document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("site-header")) initApp();
});

function initApp() {
  initScrollReveal();
  initEntranceReveals();
  initSkillBars();
  initFaqAccordion();
  initContactForm();
  initPortfolio();
  initTestimonials();
  initPanoramaViewer();
  initStatCounters();
}

/* ---------- scroll reveal (used on every page) ---------- */
function initScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal, .reveal-stagger");
  if (!revealEls.length) return;
  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach(el => io.observe(el));
}

/* ---------- one-off entrance animations on load ---------- */
function initEntranceReveals() {
  window.addEventListener("load", () => {
    // home hero
    const heroLeft = document.getElementById("heroLeft");
    if (heroLeft) heroLeft.classList.add("in");
    document.querySelectorAll(".float-badge").forEach(b => (b.style.opacity = "1"));

    // about page hero photo
    const ahPhoto = document.getElementById("ahPhoto");
    if (ahPhoto) ahPhoto.classList.add("in");

    // any page with a breadcrumb reveal
    const crumb = document.getElementById("crumb");
    if (crumb) crumb.classList.add("in");

    // services / portfolio / testimonials / contact top hero
    const topReveal = document.getElementById("topReveal");
    if (topReveal) topReveal.classList.add("in");
  });
}

/* ---------- about page: animated skill bars ---------- */
function initSkillBars() {
  const bars = document.querySelectorAll(".skill-bar");
  if (!bars.length) return;
  const barIO = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const pct = bar.dataset.pct;
          bar.querySelector(".sb-fill").style.width = pct + "%";
          barIO.unobserve(bar);
        }
      });
    },
    { threshold: 0.4 }
  );
  bars.forEach(b => barIO.observe(b));
}

/* ---------- services page: FAQ accordion ---------- */
function initFaqAccordion() {
  const items = document.querySelectorAll(".faq-item");
  if (!items.length) return;
  items.forEach(item => {
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");
    q.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(openItem => {
        openItem.classList.remove("open");
        openItem.querySelector(".faq-a").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });
}

/* ---------- contact page: demo form submit ---------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const success = document.getElementById("formSuccess");
    if (success) success.classList.add("show");
    this.reset();
  });
}

/* ---------- portfolio page: filters, load more, lightbox ---------- */
function initPortfolio() {
  const pfGrid = document.getElementById("pfGrid");
  if (!pfGrid) return;

  // filters
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      document.querySelectorAll(".pf-item").forEach(item => {
        const matches = filter === "all" || item.dataset.cat.includes(filter);
        if (item.classList.contains("extra") && !item.classList.contains("show")) {
          return; // not yet revealed by Load More — leave hidden regardless of filter
        }
        item.style.display = matches ? "" : "none";
      });
    });
  });

  // lightbox
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const lbCat = document.getElementById("lbCat");
  const lbTitle = document.getElementById("lbTitle");
  const lbDesc = document.getElementById("lbDesc");
  const lbClose = document.getElementById("lbClose");

  function attachLightbox(item) {
    if (item.dataset.lbBound) return;
    item.dataset.lbBound = "1";
    item.addEventListener("click", () => {
      const link = item.dataset.link;
      if (link) {
        window.location.href = link;
        return;
      }
      lbImg.src = item.querySelector("img").src;
      lbImg.alt = item.querySelector("img").alt;
      lbCat.textContent = item.dataset.catLabel || "";
      lbTitle.textContent = item.dataset.title || "";
      lbDesc.textContent = item.dataset.desc || "";
      lightbox.classList.add("open");
    });
  }
  document.querySelectorAll(".pf-item").forEach(attachLightbox);
  if (lbClose) lbClose.addEventListener("click", () => lightbox.classList.remove("open"));
  if (lightbox) {
    lightbox.addEventListener("click", e => {
      if (e.target === lightbox) lightbox.classList.remove("open");
    });
  }
  window.addEventListener("keydown", e => {
    if (e.key === "Escape" && lightbox) lightbox.classList.remove("open");
  });

  // load more — reveal extra dummy project cards with a staggered fade-in
  const loadBtn = document.getElementById("loadMoreBtn");
  if (loadBtn) {
    loadBtn.addEventListener("click", () => {
      const extras = document.querySelectorAll(".pf-item.extra");
      extras.forEach((item, i) => {
        item.classList.add("show");
        setTimeout(() => item.classList.add("in"), 30 + i * 90);
        attachLightbox(item);
      });
      loadBtn.innerHTML = 'That\u2019s All For Now <i class="fa-solid fa-check"></i>';
      loadBtn.disabled = true;
      loadBtn.style.opacity = ".6";
      loadBtn.style.cursor = "default";
    });
  }
}

/* ---------- testimonials page: filters, load more, rating bars ---------- */
function initTestimonials() {
  const testGrid = document.getElementById("testGrid");
  const ratingBars = document.querySelectorAll(".rc-bar-fill");

  if (ratingBars.length) {
    const barIO = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.w + "%";
            barIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    ratingBars.forEach(b => barIO.observe(b));
  }

  if (!testGrid) return;

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      document.querySelectorAll(".test-card").forEach(card => {
        const matches = filter === "all" || card.dataset.cat === filter;
        if (card.classList.contains("extra") && !card.classList.contains("show")) {
          return;
        }
        card.style.display = matches ? "" : "none";
      });
    });
  });

  const loadBtn = document.getElementById("loadMoreBtn");
  if (loadBtn) {
    loadBtn.addEventListener("click", () => {
      const extras = document.querySelectorAll(".test-card.extra");
      extras.forEach((card, i) => {
        card.classList.add("show");
        setTimeout(() => card.classList.add("in"), 30 + i * 90);
      });
      loadBtn.innerHTML = 'That\u2019s All For Now <i class="fa-solid fa-check"></i>';
      loadBtn.disabled = true;
      loadBtn.style.opacity = ".6";
      loadBtn.style.cursor = "default";
    });
  }
}

/* ---------- 360 tour page: drag-to-pan demo panorama ---------- */
function initPanoramaViewer() {
  const wrap = document.getElementById("panoWrap");
  const track = document.getElementById("panoTrack");
  if (!wrap || !track) return;
  const img = track.querySelector("img");
  let isDown = false,
    startX = 0,
    currentX = 0,
    maxOffset = 0;

  function setBounds() {
    maxOffset = Math.max(0, img.clientWidth - wrap.clientWidth);
  }
  img.addEventListener("load", setBounds);
  window.addEventListener("resize", setBounds);
  setTimeout(setBounds, 300);

  function clamp(v) {
    return Math.min(0, Math.max(-maxOffset, v));
  }
  function pointerDown(x) {
    isDown = true;
    startX = x - currentX;
    wrap.style.cursor = "grabbing";
  }
  function pointerMove(x) {
    if (!isDown) return;
    currentX = clamp(x - startX);
    track.style.transform = `translateX(${currentX}px)`;
  }
  function pointerUp() {
    isDown = false;
    wrap.style.cursor = "grab";
  }

  wrap.addEventListener("mousedown", e => pointerDown(e.clientX));
  window.addEventListener("mousemove", e => pointerMove(e.clientX));
  window.addEventListener("mouseup", pointerUp);
  wrap.addEventListener("touchstart", e => pointerDown(e.touches[0].clientX), { passive: true });
  wrap.addEventListener("touchmove", e => pointerMove(e.touches[0].clientX), { passive: true });
  wrap.addEventListener("touchend", pointerUp);

  let autoPan = setInterval(() => {
    if (isDown) return;
    currentX = clamp(currentX - 1.2);
    track.style.transform = `translateX(${currentX}px)`;
    if (currentX <= -maxOffset) clearInterval(autoPan);
  }, 30);
  wrap.addEventListener("mousedown", () => clearInterval(autoPan));
  wrap.addEventListener("touchstart", () => clearInterval(autoPan));
}

/* ---------- home / portfolio: animated stat counters ---------- */
function initStatCounters() {
  const counters = document.querySelectorAll(".stat-num[data-target]");
  if (!counters.length) return;
  const counterIO = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          let cur = 0;
          const step = Math.max(1, Math.ceil(target / 50));
          const timer = setInterval(() => {
            cur += step;
            if (cur >= target) {
              cur = target;
              clearInterval(timer);
            }
            el.textContent = cur + "+";
          }, 30);
          counterIO.unobserve(el);
        }
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach(c => counterIO.observe(c));
}
