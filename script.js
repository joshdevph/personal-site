(function () {
  const nav = document.getElementById("site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  if (toggle && nav) {
    const links = nav.querySelectorAll("a[href^='#']");

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      nav.classList.toggle("is-open", open);
      document.body.style.overflow = open ? "hidden" : "";
    }

    toggle.addEventListener("click", function () {
      const open = toggle.getAttribute("aria-expanded") === "true";
      setOpen(!open);
    });

    links.forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });

    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }
})();
