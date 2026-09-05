/* ============================================================
   partials.js
   Single source of truth for the site header and footer.
   Every page includes this file once and gets the same
   header/nav/footer injected automatically — nothing is
   duplicated page to page.
   ============================================================ */

(function () {
  const NAV_ITEMS = [
    { label: "Home", href: "index.html", page: "home" },
    { label: "About", href: "about.html", page: "about" },
    { label: "Services", href: "services.html", page: "services" },
    { label: "Portfolio", href: "portfolio.html", page: "portfolio" },
    { label: "Testimonials", href: "testimonials.html", page: "testimonials" },
    { label: "Contact", href: "contact.html", page: "contact" },
  ];

  function buildHeader(activePage) {
    const items = NAV_ITEMS.map(item => {
      const isActive = item.page === activePage;
      return `<li><a href="${item.href}"${isActive ? ' class="active"' : ''}>${item.label}</a></li>`;
    }).join("\n        ");

    return `
<div class="nav-wrap">
  <div class="logo">
    <a href="index.html" style="display:flex;align-items:center;gap:10px;">
      <div class="mark">AD</div>
      <div class="logo-text"><b>ATUL DHANGAR</b><span>CONTENT · STRATEGY · GROWTH</span></div>
    </a>
  </div>
  <nav id="nav">
    <ul>
        ${items}
    </ul>
  </nav>
  <div class="nav-cta">
    <a href="contact.html" class="btn btn-solid" style="padding:12px 22px;">Let's Talk <i class="fa-solid fa-arrow-right"></i></a>
    <button class="burger" id="burger"><i class="fa-solid fa-bars"></i></button>
  </div>
</div>`;
  }

  function buildFooter() {
    return `
<div class="footer-grid">
  <div class="footer-logo">
    <div class="logo">
    <a href="index.html" style="display:flex;align-items:center;gap:10px;">
      <div class="mark">AD</div>
      <div class="logo-text"><b>ATUL DHANGAR</b><span>CONTENT · STRATEGY · GROWTH</span></div>
    </a>
  </div>
  </div>
  <div class="footer-contact">
    <div><i class="fa-solid fa-location-dot"></i> Barwani, Madhya Pradesh, India</div>
    <div><i class="fa-regular fa-envelope"></i> atul.dhangar@gmail.com</div>
    <div><i class="fa-solid fa-phone"></i> +91 98765 43210</div>
    <div><i class="fa-solid fa-phone"></i> +91 9754489483</div>
  </div>
  <div class="footer-social">
    <a href="#"><i class="fa-brands fa-instagram"></i></a>
    <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
    <a href="#"><i class="fa-brands fa-youtube"></i></a>
    <a href="#"><i class="fa-brands fa-behance"></i></a>
  </div>
</div>
<div class="footer-bottom">
  <span>© 2026 Atul. All rights reserved.</span>
  <span><a href="https://www.linkedin.com/in/akash-dhangar-33a932250/" target="_blank">Developed By :- Akash Dhangar </a></span>
  <span><a href="index.html">Create</a><a href="about.html">Connect</a><a href="services.html">Grow</a></span>
</div>`;
  }

  document.addEventListener("DOMContentLoaded", function () {
    const activePage = document.body.dataset.page || "";

    const headerMount = document.getElementById("site-header");
    if (headerMount) {
      headerMount.innerHTML = buildHeader(activePage);
    }

    const footerMount = document.getElementById("site-footer");
    if (footerMount) {
      footerMount.innerHTML = buildFooter();
    }

    // mobile nav toggle (works regardless of which page injected the header)
    const burger = document.getElementById("burger");
    const nav = document.getElementById("nav");
    if (burger && nav) {
      burger.addEventListener("click", () => nav.classList.toggle("open"));
      nav.querySelectorAll("a").forEach(a =>
        a.addEventListener("click", () => nav.classList.remove("open"))
      );
    }

    // let the rest of the app know header/footer are ready
    document.dispatchEvent(new CustomEvent("partials:ready"));
  });
})();
