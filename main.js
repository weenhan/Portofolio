(() => {
  const content = window.PORTFOLIO_CONTENT;
  const languageButton = document.getElementById("languageToggle");
  const menuButton = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");
  let language = localStorage.getItem("elia-language") || "id";

  function applyLanguage(nextLanguage) {
    language = nextLanguage;
    document.documentElement.lang = language;
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      const translation = content[language]?.[key];
      if (translation !== undefined) element.innerHTML = translation;
    });
    languageButton.setAttribute("aria-label", language === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia");
    languageButton.innerHTML = language === "id" ? '<strong>ID</strong> <span>/</span> EN' : 'ID <span>/</span> <strong>EN</strong>';
    localStorage.setItem("elia-language", language);
  }

  languageButton.addEventListener("click", () => applyLanguage(language === "id" ? "en" : "id"));

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
    mobileNav.hidden = isOpen;
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.hidden = true;
      menuButton.setAttribute("aria-expanded", "false");
    });
  });

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  // Animasi ringan saat elemen masuk layar, dengan fallback untuk browser lama.
  const revealTargets = document.querySelectorAll(".section-index, .section-content, .interest-card, .timeline-item, .vision-layout, .contact-content");
  revealTargets.forEach((element) => element.classList.add("reveal"));
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach((element) => observer.observe(element));
  } else {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
  }

  applyLanguage(language);
})();
