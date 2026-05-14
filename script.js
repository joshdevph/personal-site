(function () {
  const nav = document.getElementById("site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  function setNavOpen(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("is-open", open);
    if (!isContactModalOpen()) {
      document.body.style.overflow = open ? "hidden" : "";
    }
  }

  function isContactModalOpen() {
    const modal = document.getElementById("contact-form-modal");
    return modal && !modal.hidden;
  }

  const contactModal = document.getElementById("contact-form-modal");
  const contactIframe = document.getElementById("contact-form-iframe");
  const contactNavLink = document.getElementById("contact-nav-link");
  const contactOpenBtn = document.getElementById("contact-open-form-btn");
  const contactCloseBtn = document.getElementById("contact-form-modal-close");
  const contactBackdrop = document.getElementById("contact-form-modal-backdrop");

  function openContactFormModal() {
    if (!contactModal) return;
    contactModal.hidden = false;
    contactModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (contactIframe && contactIframe.dataset.src && !contactIframe.getAttribute("src")) {
      contactIframe.setAttribute("src", contactIframe.dataset.src);
    }
    if (contactCloseBtn) {
      contactCloseBtn.focus();
    }
  }

  function closeContactFormModal() {
    if (!contactModal) return;
    contactModal.hidden = true;
    contactModal.setAttribute("aria-hidden", "true");
    if (!nav || !nav.classList.contains("is-open")) {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }
  }

  if (contactNavLink) {
    contactNavLink.addEventListener("click", function (e) {
      e.preventDefault();
      openContactFormModal();
      setNavOpen(false);
    });
  }

  if (contactOpenBtn) {
    contactOpenBtn.addEventListener("click", function () {
      openContactFormModal();
    });
  }

  if (contactCloseBtn) {
    contactCloseBtn.addEventListener("click", closeContactFormModal);
  }

  if (contactBackdrop) {
    contactBackdrop.addEventListener("click", closeContactFormModal);
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = toggle.getAttribute("aria-expanded") === "true";
      setNavOpen(!open);
    });

    nav.querySelectorAll("a[href^='#']").forEach(function (link) {
      if (link.id === "contact-nav-link") return;
      link.addEventListener("click", function () {
        setNavOpen(false);
      });
    });
  }

  window.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (isContactModalOpen()) {
      closeContactFormModal();
      e.preventDefault();
      return;
    }
    setNavOpen(false);
  });
})();
