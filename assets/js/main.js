/**
 * Peker Enerji — shared interactivity
 */
(function () {
  "use strict";

  var header = document.querySelector("[data-header]");
  var toggle = document.querySelector("[data-nav-toggle]");
  var mobileNav = document.querySelector("[data-mobile-nav]");
  var yearEls = document.querySelectorAll("[data-year]");

  yearEls.forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 16);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      mobileNav.classList.toggle("hidden");
      var isOpen = !mobileNav.classList.contains("hidden");
      toggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("overflow-hidden", isOpen);
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.add("hidden");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("overflow-hidden");
      });
    });
  }

  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    reveals.forEach(function (el) {
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  document.querySelectorAll("[data-faq-item]").forEach(function (item) {
    var btn = item.querySelector("[data-faq-btn]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var wasOpen = item.classList.contains("is-open");
      document.querySelectorAll("[data-faq-item].is-open").forEach(function (openItem) {
        openItem.classList.remove("is-open");
        var openBtn = openItem.querySelector("[data-faq-btn]");
        if (openBtn) openBtn.setAttribute("aria-expanded", "false");
      });
      if (!wasOpen) {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  var form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = (form.querySelector("#name") || {}).value || "";
      var phone = (form.querySelector("#phone") || {}).value || "";
      var message = (form.querySelector("#message") || {}).value || "";
      var text =
        "Merhaba, ben " +
        name.trim() +
        ". Tel: " +
        phone.trim() +
        ". " +
        message.trim();
      window.open(
        "https://wa.me/905432641193?text=" + encodeURIComponent(text),
        "_blank",
        "noopener,noreferrer"
      );
    });
  }
})();
