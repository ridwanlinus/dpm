document.documentElement.classList.add('js');

(function () {
  "use strict";

  var header = document.getElementById("site-header");
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("primary-nav");
  var body = document.body;

  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Buka menu navigasi");
    body.classList.remove("nav-open");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Tutup menu navigasi" : "Buka menu navigasi");
      body.classList.toggle("nav-open", isOpen);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) closeNav();
    });
  }

  /* Project filter */
  var filters = document.querySelectorAll(".filter");
  var projects = document.querySelectorAll(".project");

  filters.forEach(function (button) {
    button.addEventListener("click", function () {
      var filter = button.getAttribute("data-filter");

      filters.forEach(function (item) {
        var active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });

      projects.forEach(function (project) {
        var categories = project.getAttribute("data-cat") || "";
        var show = filter === "all" || categories.indexOf(filter) !== -1;
        project.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* WhatsApp contact form */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var nama = form.elements.nama.value.trim();
      var perusahaan = form.elements.perusahaan.value.trim();
      var kebutuhan = form.elements.kebutuhan.value;
      var pesan = form.elements.pesan.value.trim();

      var text = "Halo PT. Diande Putra Mandiri,\n\n" +
        "Saya " + nama + (perusahaan ? " dari " + perusahaan : "") + ".\n" +
        "Kebutuhan: " + kebutuhan + "\n\n" +
        pesan + "\n\n" +
        "Mohon informasi lebih lanjut. Terima kasih.";

      window.open("https://wa.me/6281211166224?text=" + encodeURIComponent(text), "_blank", "noopener");
    });
  }

  /* Reveal on scroll */
  var revealItems = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealItems.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealItems.forEach(function (item) { observer.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add("is-visible"); });
  }
})();
