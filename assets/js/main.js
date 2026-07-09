(function () {
  const toast = document.querySelector(".search-toast");
  const storageKey = "pdn-location";
  const defaultLocation = "indonesia";
  const locations = {
    indonesia: {
      label: "Indonesia",
      brand: "Pusat Data Nusantara",
      short: "Nasional",
      place: "Indonesia",
      contactAddress: "Jl. Data Raya No. 10, Jakarta",
      email: "layanan@pdn-contoh.id",
      phone: "(021) 555-0123",
      heroLead: "Temukan indikator utama, berita data, publikasi, dan tabel statistik contoh dalam satu tampilan responsif.",
      indicators: [
        ["Ekonomi", "5,18%", "Pertumbuhan ekonomi triwulan II secara tahunan.", "Naik 0,22 poin", "Pertumbuhan Ekonomi Triwulan II 5,18 persen"],
        ["Harga", "0,21%", "Inflasi bulan berjalan berdasarkan indeks harga konsumen.", "Stabil", "Inflasi Bulanan 0,21 persen"],
        ["Tenaga Kerja", "4,77%", "Tingkat pengangguran terbuka periode survei Februari.", "Turun 0,31 poin", "Tingkat Pengangguran Terbuka 4,77 persen"],
        ["Sosial", "282,4 jt", "Estimasi jumlah penduduk pertengahan tahun.", "Bertambah 1,1%", "Jumlah Penduduk 282,4 juta jiwa"]
      ],
      news: [
        ["08 Jul 2026", "Ekspor manufaktur tumbuh seiring permintaan regional", "Rilis dummy menunjukkan peningkatan nilai ekspor pada kelompok barang mesin, tekstil, dan produk olahan."],
        ["06 Jul 2026", "Survei biaya hidup perkotaan memasuki tahap pencacahan", "Petugas lapangan mulai mengumpulkan sampel harga dan pola konsumsi rumah tangga di 40 kota contoh."],
        ["02 Jul 2026", "Dashboard kemiskinan daerah diperbarui", "Visualisasi dummy kini menampilkan perbandingan kabupaten/kota, tren lima tahun, dan metadata indikator."],
        ["28 Jun 2026", "Harga pangan strategis bergerak terkendali", "Pemantauan dummy menunjukkan perubahan harga beras, cabai, dan telur."],
        ["21 Jun 2026", "Pelatihan literasi data untuk sekolah vokasi", "Peserta mempelajari cara membaca tabel, grafik, dan indikator sosial ekonomi."],
        ["15 Jun 2026", "Rilis indikator transportasi triwulanan", "Ringkasan penumpang, angkutan barang, dan aktivitas pelabuhan contoh."]
      ],
      publications: [
        ["Statistik Indonesia Dalam Angka 2026", "Ringkasan nasional lintas sektor dengan tabel dan grafik contoh.", "PDF Dummy", "bi-file-earmark-bar-graph"],
        ["Indikator Kesejahteraan Rakyat 2026", "Profil pendidikan, kesehatan, ketenagakerjaan, dan perumahan.", "PDF Dummy", "bi-file-earmark-person"],
        ["Statistik Perdagangan Luar Negeri 2026", "Data ekspor impor menurut komoditas dan negara tujuan contoh.", "PDF Dummy", "bi-file-earmark-spreadsheet"],
        ["Profil Kemiskinan Semester I 2026", "Analisis dummy garis kemiskinan, jumlah penduduk miskin, dan indeks kedalaman.", "PDF Dummy", "bi-file-earmark-text"],
        ["Statistik Transportasi Nasional 2026", "Ringkasan moda darat, laut, udara, dan aktivitas logistik contoh.", "PDF Dummy", "bi-file-earmark-richtext"],
        ["Direktori Industri Sedang Besar 2026", "Daftar agregat perusahaan industri contoh menurut wilayah dan subsektor.", "XLS Dummy", "bi-file-earmark-zip"]
      ],
      tableRows: [
        ["Pertumbuhan Ekonomi", "Ekonomi", "Triwulan II 2026", "5,18", "Persen"],
        ["Inflasi", "Harga", "Juni 2026", "0,21", "Persen"],
        ["Tingkat Pengangguran Terbuka", "Tenaga Kerja", "Februari 2026", "4,77", "Persen"],
        ["Produksi Padi", "Pertanian", "2026", "55,8", "Juta ton"],
        ["Kunjungan Wisman", "Pariwisata", "Juni 2026", "1,42", "Juta kunjungan"]
      ]
    },
    seluma: {
      label: "Kabupaten Seluma",
      brand: "Pusat Data Nusantara Kabupaten Seluma",
      short: "Seluma",
      place: "Kabupaten Seluma",
      contactAddress: "Jl. Merdeka Raya No. 8, Tais, Kabupaten Seluma",
      email: "layanan.seluma@pdn-contoh.id",
      phone: "(0736) 555-021",
      heroLead: "Temukan indikator utama, berita data, publikasi, dan tabel statistik dummy khusus Kabupaten Seluma.",
      indicators: [
        ["Ekonomi", "4,86%", "Pertumbuhan ekonomi Seluma secara tahunan.", "Naik 0,18 poin", "Pertumbuhan Ekonomi Seluma 4,86 persen"],
        ["Harga", "0,19%", "Inflasi bulanan gabungan pasar contoh Seluma.", "Stabil", "Inflasi Seluma 0,19 persen"],
        ["Tenaga Kerja", "3,92%", "Tingkat pengangguran terbuka dummy Kabupaten Seluma.", "Turun 0,14 poin", "Pengangguran Seluma 3,92 persen"],
        ["Sosial", "214,7 rb", "Estimasi jumlah penduduk Kabupaten Seluma.", "Bertambah 0,8%", "Penduduk Seluma 214,7 ribu jiwa"]
      ],
      news: [
        ["08 Jul 2026", "Produksi padi Seluma meningkat pada musim panen kedua", "Data dummy menunjukkan kenaikan panen di Sukaraja, Talo, dan Semidang Alas."],
        ["06 Jul 2026", "Survei UMKM Seluma mulai memetakan usaha rumah tangga", "Petugas mendata usaha kuliner, kerajinan, dan perdagangan kecil di wilayah contoh."],
        ["02 Jul 2026", "Dashboard kemiskinan Seluma diperbarui", "Visualisasi dummy menampilkan tren kecamatan, komoditas pangan, dan metadata indikator."],
        ["28 Jun 2026", "Harga pangan di Pasar Tais bergerak terkendali", "Pemantauan dummy mencatat perubahan harga beras, cabai merah, dan telur ayam."],
        ["21 Jun 2026", "Literasi data untuk perangkat desa Seluma digelar", "Peserta mempelajari cara membaca tabel penduduk, kemiskinan, dan potensi wilayah."],
        ["15 Jun 2026", "Indikator transportasi lokal Seluma dirilis", "Ringkasan dummy mencakup mobilitas angkutan, pasar, dan akses jalan antarwilayah."]
      ],
      publications: [
        ["Kabupaten Seluma Dalam Angka 2026", "Kompilasi dummy indikator Seluma menurut kecamatan dan sektor.", "PDF Dummy", "bi-file-earmark-bar-graph"],
        ["Statistik Kesejahteraan Rakyat Seluma 2026", "Profil pendidikan, kesehatan, tenaga kerja, dan perumahan Seluma.", "PDF Dummy", "bi-file-earmark-person"],
        ["Profil Pertanian Kabupaten Seluma 2026", "Ringkasan dummy padi, palawija, perkebunan, dan peternakan.", "PDF Dummy", "bi-file-earmark-spreadsheet"],
        ["Profil Kemiskinan Seluma Semester I 2026", "Analisis dummy garis kemiskinan, jumlah penduduk miskin, dan bantuan sosial.", "PDF Dummy", "bi-file-earmark-text"],
        ["Statistik Infrastruktur Seluma 2026", "Ringkasan jalan, sekolah, fasilitas kesehatan, dan layanan dasar contoh.", "PDF Dummy", "bi-file-earmark-richtext"],
        ["Direktori UMKM Seluma 2026", "Daftar agregat usaha mikro kecil contoh menurut kecamatan dan subsektor.", "XLS Dummy", "bi-file-earmark-zip"]
      ],
      tableRows: [
        ["Pertumbuhan Ekonomi Seluma", "Ekonomi", "2026", "4,86", "Persen"],
        ["Inflasi Pasar Tais", "Harga", "Juni 2026", "0,19", "Persen"],
        ["Tingkat Pengangguran Terbuka", "Tenaga Kerja", "Februari 2026", "3,92", "Persen"],
        ["Produksi Padi Seluma", "Pertanian", "2026", "126,4", "Ribu ton"],
        ["Jumlah UMKM Terdata", "Ekonomi Lokal", "Juni 2026", "18,6", "Ribu usaha"]
      ]
    },
    kaur: {
      label: "Kabupaten Kaur",
      brand: "Pusat Data Nusantara Kabupaten Kaur",
      short: "Kaur",
      place: "Kabupaten Kaur",
      contactAddress: "Jl. Lintas Barat No. 12, Bintuhan, Kabupaten Kaur",
      email: "layanan.kaur@pdn-contoh.id",
      phone: "(0739) 555-018",
      heroLead: "Temukan indikator utama, berita data, publikasi, dan tabel statistik dummy khusus Kabupaten Kaur.",
      indicators: [
        ["Ekonomi", "4,73%", "Pertumbuhan ekonomi Kaur secara tahunan.", "Naik 0,16 poin", "Pertumbuhan Ekonomi Kaur 4,73 persen"],
        ["Harga", "0,24%", "Inflasi bulanan gabungan pasar contoh Kaur.", "Naik tipis", "Inflasi Kaur 0,24 persen"],
        ["Tenaga Kerja", "3,68%", "Tingkat pengangguran terbuka dummy Kabupaten Kaur.", "Turun 0,11 poin", "Pengangguran Kaur 3,68 persen"],
        ["Sosial", "135,2 rb", "Estimasi jumlah penduduk Kabupaten Kaur.", "Bertambah 0,7%", "Penduduk Kaur 135,2 ribu jiwa"]
      ],
      news: [
        ["08 Jul 2026", "Produksi perikanan Kaur meningkat di wilayah pesisir", "Data dummy menunjukkan kenaikan tangkapan dan budidaya di sentra pesisir contoh."],
        ["06 Jul 2026", "Survei pariwisata Kaur mencatat kunjungan pantai", "Petugas mendata akomodasi, kunjungan wisata, dan belanja wisatawan contoh."],
        ["02 Jul 2026", "Dashboard kemiskinan Kaur diperbarui", "Visualisasi dummy menampilkan tren kecamatan, akses layanan dasar, dan metadata indikator."],
        ["28 Jun 2026", "Harga ikan dan pangan pokok di Bintuhan dipantau", "Pemantauan dummy mencatat perubahan harga ikan laut, beras, cabai, dan telur."],
        ["21 Jun 2026", "Pelatihan literasi data untuk perangkat kecamatan Kaur", "Peserta mempelajari cara membaca grafik penduduk, pertanian, dan ekonomi lokal."],
        ["15 Jun 2026", "Indikator transportasi pesisir Kaur dirilis", "Ringkasan dummy mencakup mobilitas angkutan, akses pasar, dan aktivitas pelabuhan kecil."]
      ],
      publications: [
        ["Kabupaten Kaur Dalam Angka 2026", "Kompilasi dummy indikator Kaur menurut kecamatan dan sektor.", "PDF Dummy", "bi-file-earmark-bar-graph"],
        ["Statistik Kesejahteraan Rakyat Kaur 2026", "Profil pendidikan, kesehatan, tenaga kerja, dan perumahan Kaur.", "PDF Dummy", "bi-file-earmark-person"],
        ["Profil Perikanan Kabupaten Kaur 2026", "Ringkasan dummy tangkap laut, budidaya, dan perdagangan hasil ikan.", "PDF Dummy", "bi-file-earmark-spreadsheet"],
        ["Profil Kemiskinan Kaur Semester I 2026", "Analisis dummy garis kemiskinan, jumlah penduduk miskin, dan akses layanan.", "PDF Dummy", "bi-file-earmark-text"],
        ["Statistik Pariwisata Kaur 2026", "Ringkasan objek wisata, akomodasi, kunjungan, dan ekonomi kreatif contoh.", "PDF Dummy", "bi-file-earmark-richtext"],
        ["Direktori UMKM Kaur 2026", "Daftar agregat usaha mikro kecil contoh menurut kecamatan dan subsektor.", "XLS Dummy", "bi-file-earmark-zip"]
      ],
      tableRows: [
        ["Pertumbuhan Ekonomi Kaur", "Ekonomi", "2026", "4,73", "Persen"],
        ["Inflasi Pasar Bintuhan", "Harga", "Juni 2026", "0,24", "Persen"],
        ["Tingkat Pengangguran Terbuka", "Tenaga Kerja", "Februari 2026", "3,68", "Persen"],
        ["Produksi Perikanan", "Perikanan", "2026", "42,7", "Ribu ton"],
        ["Kunjungan Wisata Pantai", "Pariwisata", "Juni 2026", "64,5", "Ribu kunjungan"]
      ]
    }
  };

  function getLocationKey() {
    const saved = localStorage.getItem(storageKey);
    return locations[saved] ? saved : defaultLocation;
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2400);
  }

  function searchableText(item) {
    return `${item.dataset.title || ""} ${item.textContent || ""}`.toLowerCase();
  }

  function displayTarget(item) {
    const parent = item.parentElement;
    if (parent && Array.from(parent.classList).some((className) => className.startsWith("col-"))) {
      return parent;
    }
    return item;
  }

  function setText(selector, text) {
    const element = document.querySelector(selector);
    if (element) element.textContent = text;
  }

  function currentPage() {
    const name = window.location.pathname.split("/").pop() || "index.html";
    return name.toLowerCase();
  }

  function pageTitle(page, data) {
    const titles = {
      "index.html": "Beranda",
      "berita.html": "Berita",
      "statistik.html": "Statistik",
      "publikasi.html": "Publikasi",
      "kontak.html": "Kontak"
    };
    return `${data.brand} - ${titles[page] || "Beranda"}`;
  }

  function addLocationSelector(activeKey) {
    const nav = document.querySelector(".navbar-nav");
    if (!nav || document.querySelector(".location-selector")) return;

    const item = document.createElement("li");
    item.className = "nav-item dropdown location-selector";
    item.innerHTML = `
      <button class="nav-link location-trigger" type="button" id="locationDropdown" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false" aria-label="Pilih lokasi">
        <i class="bi bi-geo-alt-fill"></i>
        <span class="visually-hidden location-current">${locations[activeKey].label}</span>
      </button>
      <div class="dropdown-menu dropdown-menu-end location-menu" aria-labelledby="locationDropdown">
        <div class="location-title">Pilih lokasi data</div>
        <label class="visually-hidden" for="locationSearch">Cari lokasi</label>
        <div class="location-search-wrap">
          <i class="bi bi-search"></i>
          <input id="locationSearch" class="form-control location-search" type="search" placeholder="Cari lokasi..." autocomplete="off">
        </div>
        <div class="location-options">
          ${Object.entries(locations).map(([key, location]) => `<button class="dropdown-item location-option" type="button" data-location="${key}">${location.label}</button>`).join("")}
        </div>
      </div>
    `;
    nav.appendChild(item);

    const search = item.querySelector(".location-search");
    const options = Array.from(item.querySelectorAll(".location-option"));

    search.addEventListener("click", (event) => event.stopPropagation());
    search.addEventListener("input", () => {
      const query = search.value.trim().toLowerCase();
      options.forEach((option) => {
        option.classList.toggle("d-none", !option.textContent.toLowerCase().includes(query));
      });
    });

    options.forEach((option) => {
      option.addEventListener("click", () => {
        const nextLocation = option.dataset.location;
        localStorage.setItem(storageKey, nextLocation);
        showLocationLoading(() => applyLocation(nextLocation));
      });
    });
  }

  function showLocationLoading(callback) {
    let overlay = document.querySelector(".location-loading");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "location-loading";
      overlay.innerHTML = `<div class="location-loader"><span></span><p>Memuat data lokasi...</p></div>`;
      document.body.appendChild(overlay);
    }

    overlay.classList.add("show");
    window.setTimeout(() => {
      callback();
      overlay.classList.remove("show");
    }, 520);
  }

  function renderIndicatorCards(data) {
    const cards = document.querySelectorAll(".indicator-card");
    cards.forEach((card, index) => {
      const item = data.indicators[index];
      if (!item) return;
      card.dataset.title = item[4];
      card.innerHTML = `<span class="badge-soft">${item[0]}</span><h3>${item[1]}</h3><p>${item[2]}</p><small><i class="bi bi-arrow-up-right"></i> ${item[3]}</small>`;
    });
  }

  function newsArticle(item, compact) {
    const title = item[1];
    const heading = compact ? "h3" : "h2";
    const link = compact ? `<a href="berita.html">${title}</a>` : title;
    const readMore = compact ? "" : `<a href="#">Baca selengkapnya</a>`;
    const cls = compact ? "news-item" : "content-card";
    return `<article class="${cls} searchable-item" data-title="${title}"><time>${item[0]}</time><${heading}>${link}</${heading}><p>${item[2]}</p>${readMore}</article>`;
  }

  function renderNews(data) {
    const homeList = document.querySelector(".news-list");
    if (homeList) homeList.innerHTML = data.news.slice(0, 3).map((item) => newsArticle(item, true)).join("");

    if (currentPage() === "berita.html") {
      const row = document.querySelector(".section-pad .row.g-4");
      if (row) {
        row.innerHTML = data.news.map((item) => `<div class="col-md-6 col-xl-4">${newsArticle(item, false)}</div>`).join("");
      }
    }
  }

  function publicationCard(item, feature) {
    if (feature) {
      return `<article class="publication-feature searchable-item" data-title="${item[0]}"><i class="bi ${item[3]}"></i><div><h3>${item[0]}</h3><p>${item[1]}</p><a href="publikasi.html">Lihat detail <i class="bi bi-arrow-right"></i></a></div></article>`;
    }
    return `<article class="publication-card searchable-item" data-title="${item[0]}"><i class="bi ${item[3]}"></i><span>${item[2]}</span><h2>${item[0]}</h2><p>${item[1]}</p><button class="btn btn-outline-primary btn-sm"><i class="bi bi-download"></i> Unduh</button></article>`;
  }

  function renderPublications(data) {
    const panel = document.querySelector(".publication-panel");
    if (panel) {
      panel.querySelectorAll(".publication-feature").forEach((item) => item.remove());
      panel.insertAdjacentHTML("beforeend", data.publications.slice(0, 2).map((item) => publicationCard(item, true)).join(""));
    }

    if (currentPage() === "publikasi.html") {
      const row = document.querySelector(".section-pad .row.g-4");
      if (row) {
        row.innerHTML = data.publications.map((item) => `<div class="col-md-6 col-xl-4">${publicationCard(item, false)}</div>`).join("");
      }
    }
  }

  function renderTable(data) {
    const body = document.querySelector(".statistics-table tbody");
    if (!body) return;
    body.innerHTML = data.tableRows.map((row) => {
      const title = row.join(" ");
      return `<tr class="searchable-item" data-title="${title}"><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td><td>${row[4]}</td></tr>`;
    }).join("");
  }

  function renderContact(data) {
    setText(".contact-info h2", `Pusat Layanan Statistik ${data.place}`);
    const info = document.querySelector(".contact-info");
    if (info) {
      info.innerHTML = `<h2>Pusat Layanan Statistik ${data.place}</h2><p><i class="bi bi-geo-alt"></i> ${data.contactAddress}</p><p><i class="bi bi-envelope"></i> ${data.email}</p><p><i class="bi bi-telephone"></i> ${data.phone}</p><p><i class="bi bi-clock"></i> Senin-Jumat, 08.00-16.00 WIB</p>`;
    }
  }

  function applyLocation(key) {
    const data = locations[key] || locations[defaultLocation];
    const page = currentPage();
    document.documentElement.dataset.location = key;
    document.title = pageTitle(page, data);
    setText(".navbar-brand strong", data.brand);
    setText(".site-footer h2", data.brand);
    setText(".hero-content .lead", data.heroLead);
    setText(".page-header .lead", `Gunakan formulir dummy ini untuk contoh permintaan data, konsultasi metadata, atau bantuan publikasi ${data.place}.`);

    const globeLink = document.querySelector(".topbar .bi-globe2")?.parentElement;
    if (globeLink) globeLink.innerHTML = `<i class="bi bi-globe2"></i> ${data.label}`;

    const headings = {
      "berita.html": `Berita Terbaru ${data.place}`,
      "statistik.html": `Statistik Sektoral ${data.place}`,
      "publikasi.html": `Publikasi Statistik ${data.place}`,
      "kontak.html": `Kontak dan Konsultasi Data ${data.place}`
    };
    if (headings[page]) setText(".page-header h1", headings[page]);

    const searchInput = document.querySelector('.site-search input[type="search"]');
    if (searchInput) searchInput.placeholder = `Cari data ${data.short}, berita, statistik, atau publikasi...`;

    const footerBottom = document.querySelector(".footer-bottom");
    if (footerBottom) footerBottom.textContent = `© 2026 ${data.brand}. Konten dummy untuk latihan.`;

    const footerContact = document.querySelector(".site-footer .col-lg-3 p");
    if (footerContact) footerContact.innerHTML = `${data.contactAddress}<br>${data.email}<br>${data.phone}`;

    const currentLocation = document.querySelector(".location-current");
    if (currentLocation) currentLocation.textContent = data.label;

    document.querySelectorAll(".location-option").forEach((option) => {
      option.classList.toggle("active", option.dataset.location === key);
      option.classList.remove("d-none");
    });

    const locationSearch = document.querySelector(".location-search");
    if (locationSearch) locationSearch.value = "";

    document.querySelectorAll(".is-hidden-by-search").forEach((item) => item.classList.remove("is-hidden-by-search"));
    renderIndicatorCards(data);
    renderNews(data);
    renderPublications(data);
    renderTable(data);
    renderContact(data);
  }

  const activeLocation = getLocationKey();
  addLocationSelector(activeLocation);
  applyLocation(activeLocation);

  document.querySelectorAll(".site-search").forEach((form) => {
    const input = form.querySelector('input[type="search"]');
    if (!input) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = input.value.trim().toLowerCase();
      const items = Array.from(document.querySelectorAll(".searchable-item"));

      if (!query) {
        items.forEach((item) => displayTarget(item).classList.remove("is-hidden-by-search"));
        showToast("Masukkan kata kunci untuk mencari data.");
        return;
      }

      let matches = 0;
      items.forEach((item) => {
        const hit = searchableText(item).includes(query);
        displayTarget(item).classList.toggle("is-hidden-by-search", !hit);
        if (hit) matches += 1;
      });

      showToast(matches ? `${matches} hasil ditemukan untuk "${input.value.trim()}".` : `Tidak ada hasil untuk "${input.value.trim()}".`);
    });

    input.addEventListener("input", () => {
      if (input.value.trim()) return;
      document.querySelectorAll(".searchable-item").forEach((item) => displayTarget(item).classList.remove("is-hidden-by-search"));
    });
  });

  document.querySelectorAll(".contact-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      showToast("Pesan dummy berhasil disiapkan. Form ini belum terhubung ke server.");
      form.reset();
    });
  });
})();
