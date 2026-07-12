document.addEventListener("DOMContentLoaded", () => {
  const mobileBreakpoint = 900;
  const menuButton = document.querySelector(".menu-btn");
  const navigation = document.querySelector(".nav");
  const dropdown = document.querySelector(".dropdown");
  const dropdownButton = dropdown?.querySelector(".drop-btn");
  const dropdownMenu = dropdown?.querySelector(".dropdown-menu");

  // Accessible navigation state.
  if (navigation) {
    navigation.id = "site-navigation";
    navigation.setAttribute("aria-label", "Navigasi utama");
  }
  if (menuButton) {
    menuButton.type = "button";
    menuButton.setAttribute("aria-controls", "site-navigation");
  }
  if (dropdownButton && dropdownMenu) {
    dropdownMenu.id = "bidang-menu";
    dropdownButton.type = "button";
    dropdownButton.setAttribute("aria-haspopup", "true");
    dropdownButton.setAttribute("aria-controls", "bidang-menu");
    dropdownButton.setAttribute("aria-expanded", "false");
  }

  const setMenu = (open) => {
    if (!menuButton || !navigation) return;
    navigation.classList.toggle("open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute(
      "aria-label",
      open ? "Tutup navigasi" : "Buka navigasi",
    );
    menuButton.textContent = open ? "×" : "☰";
  };

  const setDropdown = (open) => {
    if (!dropdown || !dropdownButton) return;
    dropdown.classList.toggle("open", open);
    dropdownButton.setAttribute("aria-expanded", String(open));
  };

  menuButton?.addEventListener("click", () =>
    setMenu(!navigation?.classList.contains("open")),
  );
  dropdownButton?.addEventListener("click", () =>
    setDropdown(!dropdown?.classList.contains("open")),
  );
  dropdownButton?.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setDropdown(true);
      dropdownMenu?.querySelector("a")?.focus();
    }
  });

  navigation?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (innerWidth <= mobileBreakpoint) setMenu(false);
      setDropdown(false);
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".dropdown")) setDropdown(false);
    if (
      innerWidth <= mobileBreakpoint &&
      navigation?.classList.contains("open") &&
      !event.target.closest(".nav-wrap")
    )
      setMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    setDropdown(false);
    setMenu(false);
    menuButton?.focus();
  });

  addEventListener(
    "resize",
    () => {
      if (innerWidth > mobileBreakpoint) setMenu(false);
    },
    { passive: true },
  );

  // Current-page indicator.
  const currentPage = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  // Code-copy controls.
  document.querySelectorAll(".copy-btn").forEach((button) =>
    button.addEventListener("click", async () => {
      const code = button
        .closest(".code-wrap")
        ?.querySelector("code")?.innerText;
      if (!code) return;
      try {
        await navigator.clipboard.writeText(code);
        button.textContent = "Tersalin ✓";
      } catch {
        button.textContent = "Salin manual";
      }
      setTimeout(() => {
        button.textContent = "Salin kode";
      }, 1600);
    }),
  );

  // Reveal animation with a no-motion fallback.
  const revealItems = document.querySelectorAll(".reveal");
  if (
    matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window)
  ) {
    revealItems.forEach((item) => item.classList.add("visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        }),
      { threshold: 0.12 },
    );
    revealItems.forEach((item) => observer.observe(item));
  }

  document.querySelectorAll("[data-year]").forEach((item) => {
    item.textContent = new Date().getFullYear();
  });

  // Dataset provenance shown on every field page.
  const metadataByPage = {
    "field-one": [
      "Data ilustratif",
      "Contoh rancangan",
      "Persen dan jumlah",
      "Belum ditetapkan",
      "Bapperida Provinsi Bengkulu",
    ],
    "field-two": [
      "BPS Provinsi Bengkulu",
      "Mei 2026; tren 2024–2026",
      "Persen dan andil",
      "10 Juli 2026",
      "Bidang Perekonomian dan SDA",
    ],
    "field-three": [
      "Data ilustratif",
      "Contoh rancangan",
      "Indeks, persen, dan jumlah",
      "Belum ditetapkan",
      "Bapperida Provinsi Bengkulu",
    ],
    "field-four": [
      "Data ilustratif",
      "Contoh rancangan",
      "Persen dan jumlah wilayah",
      "Belum ditetapkan",
      "Bapperida Provinsi Bengkulu",
    ],
  };
  const pageClass = Object.keys(metadataByPage).find((name) =>
    document.body.classList.contains(name),
  );
  const dataSection = document.querySelector("#data .container");
  if (pageClass && dataSection) {
    const labels = [
      "Sumber",
      "Periode",
      "Satuan",
      "Diperbarui",
      "Penanggung jawab",
    ];
    const metadata = document.createElement("dl");
    metadata.className = "data-meta-grid";
    metadata.setAttribute("aria-label", "Metadata dataset");
    metadata.innerHTML = labels
      .map(
        (label, index) =>
          `<div><dt>${label}</dt><dd>${metadataByPage[pageClass][index]}</dd></div>`,
      )
      .join("");
    dataSection
      .querySelector(".section-head")
      ?.insertAdjacentElement("afterend", metadata);
  }

  // Lazy map card in the official contact block.
  document.querySelectorAll(".footer-contact").forEach((contact) => {
    if (contact.querySelector(".map-card")) return;
    const map = document.createElement("div");
    map.className = "map-card";
    map.innerHTML = `<iframe title="Peta lokasi Bapperida Provinsi Bengkulu" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=BAPPERIDA+Provinsi+Bengkulu,+Jl.+Pembangunan+No.15,+Padang+Harapan,+Bengkulu&output=embed"></iframe><div class="map-card-info"><span class="map-pin" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" stroke-width="2"/></svg></span><span>Kantor Bapperida<br><a href="https://www.google.com/maps/search/?api=1&query=BAPPERIDA+Provinsi+Bengkulu+Jl.+Pembangunan+No.15" target="_blank" rel="noopener">Buka Google Maps ↗</a></span></div>`;
    contact.appendChild(map);
  });

  const backToTop = document.querySelector(".back-to-top");
  const toggleBackToTop = () =>
    backToTop?.classList.toggle("show", scrollY > 500);
  toggleBackToTop();
  addEventListener("scroll", toggleBackToTop, { passive: true });

  // Subtle coastal parallax; disabled when reduced motion is requested.
  const hero = document.querySelector(".hero");
  if (hero && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let ticking = false;
    const shiftHero = () => {
      hero.style.setProperty(
        "--hero-shift",
        `${Math.min(scrollY * 0.055, 28)}px`,
      );
      ticking = false;
    };
    addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(shiftHero);
          ticking = true;
        }
      },
      { passive: true },
    );
  }
});
