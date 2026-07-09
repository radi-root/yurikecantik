(function () {
  const toast = document.querySelector(".search-toast");
  const storageKey = "pdn-location";
  const defaultLocation = "indonesia";
  const sourceUrls = {
    bpsApi: "https://webapi.bps.go.id/documentation/",
    selumaHome: "https://selumakab.bps.go.id/id",
    seluma2025: "https://selumakab.bps.go.id/id/publication/2025/02/28/8024086d9ba229aa18537dac/kabupaten-seluma-dalam-angka-2025.html",
    kaurHome: "https://kaurkab.bps.go.id/id",
    kaurPub: "https://kaurkab.bps.go.id/id/publication",
    kaur2025News: "https://kaurkab.bps.go.id/id/news/2025/02/28/116/rilis-kabupaten-kaur-dalam-angka-2025.html",
    kaur2026News: "https://kaurkab.bps.go.id/id/news/2026/02/27/201/-----telah-rilis--kabupaten-kaur-dalam-angka-2026-----.html"
  };
  const strategicCharts = {
    indonesia: {
      lineTitle: "Pertumbuhan Ekonomi Indonesia (% YoY)",
      barTitle: "Inflasi Tahunan Indonesia (% YoY)",
      line: [["2021", 3.7], ["2022", 4.2], ["2023", 4.5], ["2024", 4.8], ["2025", 5.0], ["2026*", 5.12]],
      bar: [["2021", 4.2], ["2022", 3.6], ["2023", 3.2], ["2024", 2.8], ["2025", 2.5], ["2026*", 2.85]]
    },
    seluma: {
      lineTitle: "Publikasi dan Cakupan Data Seluma",
      barTitle: "Ringkasan Metadata Seluma",
      line: [["2021", 6], ["2022", 7], ["2023", 9], ["2024", 10], ["2025", 12], ["2026*", 12]],
      bar: [["Publikasi", 2], ["Sumber", 2], ["Kontak", 1], ["Sektor", 12], ["Portal", 1], ["API", 7]]
    },
    kaur: {
      lineTitle: "Publikasi dan Cakupan Data Kaur",
      barTitle: "Ringkasan Metadata Kaur",
      line: [["2021", 6], ["2022", 8], ["2023", 10], ["2024", 12], ["2025", 13], ["2026*", 13]],
      bar: [["Bab", 13], ["Rilis", 2], ["Kontak", 3], ["Portal", 1], ["PST", 1], ["API", 7]]
    }
  };
  const subjectGroups = [
    {
      id: "sosial",
      label: "Sosial dan Kependudukan",
      icon: "bi-people-fill",
      children: [
        { id: "penduduk", label: "Penduduk" },
        { id: "ketenagakerjaan", label: "Ketenagakerjaan" },
        { id: "kesejahteraan", label: "Kesejahteraan Rakyat" },
        { id: "pendidikan", label: "Pendidikan" },
        { id: "kesehatan", label: "Kesehatan" }
      ]
    },
    {
      id: "ekonomi",
      label: "Ekonomi dan Perdagangan",
      icon: "bi-bar-chart-fill",
      children: [
        { id: "pdrb", label: "Produk Domestik Regional Bruto" },
        { id: "perdagangan", label: "Perdagangan" },
        { id: "industri", label: "Industri" },
        { id: "koperasi", label: "Koperasi" }
      ]
    },
    {
      id: "pertanian",
      label: "Pertanian dan Pertambangan",
      icon: "bi-flower1",
      children: [
        { id: "tanaman", label: "Tanaman Pangan" },
        { id: "perkebunan", label: "Perkebunan" },
        { id: "peternakan", label: "Peternakan" },
        { id: "perikanan", label: "Perikanan" },
        { id: "pertambangan", label: "Pertambangan dan Energi" }
      ]
    },
    {
      id: "pemerintahan",
      label: "Pemerintahan dan Wilayah",
      icon: "bi-building",
      children: [
        { id: "geografi", label: "Geografi dan Iklim" },
        { id: "pemerintah", label: "Pemerintahan" },
        { id: "wilayah", label: "Wilayah Administrasi" }
      ]
    },
    {
      id: "mobilitas",
      label: "Pariwisata dan Transportasi",
      icon: "bi-bus-front-fill",
      children: [
        { id: "pariwisata", label: "Pariwisata" },
        { id: "transportasi", label: "Transportasi" },
        { id: "komunikasi", label: "Komunikasi" }
      ]
    },
    {
      id: "harga",
      label: "Keuangan dan Harga",
      icon: "bi-cash-coin",
      children: [
        { id: "harga", label: "Harga-harga" },
        { id: "keuangan", label: "Keuangan" },
        { id: "pengeluaran", label: "Pengeluaran Penduduk" },
        { id: "neraca", label: "Sistem Neraca Regional" }
      ]
    }
  ];
  const subjectChartProfiles = {
    penduduk: { title: "Penduduk", base: [3.2, 3.5, 3.9, 4.2, 4.5, 4.8], bar: [4.8, 4.3, 3.9, 3.5, 3.2, 2.9] },
    ketenagakerjaan: { title: "Ketenagakerjaan", base: [2.1, 2.4, 2.7, 3.1, 3.4, 3.8], bar: [3.8, 3.3, 3.1, 2.7, 2.5, 2.2] },
    kesejahteraan: { title: "Kesejahteraan Rakyat", base: [4.1, 4.4, 4.8, 5.1, 5.4, 5.6], bar: [2.9, 2.7, 2.5, 2.3, 2.1, 1.9] },
    pendidikan: { title: "Pendidikan", base: [3.8, 4.1, 4.4, 4.8, 5.0, 5.3], bar: [2.4, 2.2, 2.1, 2.0, 1.8, 1.7] },
    kesehatan: { title: "Kesehatan", base: [3.0, 3.4, 3.7, 4.0, 4.4, 4.7], bar: [3.0, 2.8, 2.6, 2.3, 2.2, 2.0] },
    pdrb: { title: "Produk Domestik Regional Bruto", base: [3.7, 4.2, 4.5, 4.8, 5.0, 5.12], bar: [4.2, 3.6, 3.2, 2.8, 2.5, 2.85] },
    perdagangan: { title: "Perdagangan", base: [2.8, 3.1, 3.6, 3.9, 4.3, 4.7], bar: [4.8, 4.1, 3.7, 3.3, 3.0, 2.8] },
    industri: { title: "Industri", base: [3.1, 3.3, 3.7, 4.0, 4.4, 4.6], bar: [4.1, 3.8, 3.4, 3.0, 2.7, 2.5] },
    koperasi: { title: "Koperasi", base: [1.9, 2.3, 2.8, 3.1, 3.5, 3.9], bar: [2.7, 2.5, 2.3, 2.1, 1.9, 1.8] },
    tanaman: { title: "Tanaman Pangan", base: [2.2, 2.7, 3.1, 3.4, 3.8, 4.1], bar: [5.0, 4.5, 4.0, 3.5, 3.2, 2.9] },
    perkebunan: { title: "Perkebunan", base: [2.0, 2.4, 2.9, 3.2, 3.6, 3.8], bar: [4.2, 3.9, 3.5, 3.2, 2.8, 2.6] },
    peternakan: { title: "Peternakan", base: [1.8, 2.2, 2.5, 2.9, 3.2, 3.5], bar: [3.8, 3.4, 3.1, 2.9, 2.6, 2.4] },
    perikanan: { title: "Perikanan", base: [2.4, 2.9, 3.3, 3.8, 4.2, 4.6], bar: [4.7, 4.3, 3.8, 3.4, 3.1, 2.9] },
    pertambangan: { title: "Pertambangan dan Energi", base: [1.5, 1.9, 2.4, 2.8, 3.0, 3.4], bar: [3.4, 3.1, 2.9, 2.6, 2.4, 2.2] },
    geografi: { title: "Geografi dan Iklim", base: [1.0, 1.2, 1.4, 1.7, 1.9, 2.1], bar: [2.1, 2.0, 1.8, 1.7, 1.5, 1.4] },
    pemerintah: { title: "Pemerintahan", base: [2.5, 2.8, 3.0, 3.3, 3.5, 3.7], bar: [3.2, 3.0, 2.8, 2.6, 2.4, 2.2] },
    wilayah: { title: "Wilayah Administrasi", base: [1.4, 1.8, 2.0, 2.2, 2.5, 2.7], bar: [2.6, 2.4, 2.2, 2.0, 1.8, 1.6] },
    pariwisata: { title: "Pariwisata", base: [1.9, 2.5, 3.2, 3.9, 4.5, 5.1], bar: [5.1, 4.5, 3.9, 3.2, 2.5, 1.9] },
    transportasi: { title: "Transportasi", base: [2.3, 2.7, 3.1, 3.6, 4.0, 4.4], bar: [4.4, 4.0, 3.6, 3.1, 2.7, 2.3] },
    komunikasi: { title: "Komunikasi", base: [3.3, 3.8, 4.2, 4.6, 5.0, 5.4], bar: [2.8, 2.6, 2.3, 2.1, 1.9, 1.7] },
    harga: { title: "Harga-harga", base: [4.2, 3.6, 3.2, 2.8, 2.5, 2.85], bar: [4.2, 3.6, 3.2, 2.8, 2.5, 2.85] },
    keuangan: { title: "Keuangan", base: [2.6, 3.0, 3.4, 3.8, 4.1, 4.4], bar: [3.5, 3.2, 2.9, 2.7, 2.4, 2.2] },
    pengeluaran: { title: "Pengeluaran Penduduk", base: [2.9, 3.2, 3.6, 4.0, 4.3, 4.6], bar: [4.0, 3.7, 3.4, 3.0, 2.8, 2.5] },
    neraca: { title: "Sistem Neraca Regional", base: [3.4, 3.9, 4.3, 4.6, 4.9, 5.1], bar: [3.9, 3.5, 3.1, 2.9, 2.6, 2.4] }
  };
  const yearLabels = ["2021", "2022", "2023", "2024", "2025", "2026*"];
  let activeSubjectId = "pdrb";
  const locations = {
    indonesia: {
      label: "Indonesia",
      brand: "Pusat Data Nusantara",
      short: "Nasional",
      place: "Indonesia",
      contactAddress: "Akses data nasional melalui portal dan WebAPI BPS",
      email: "webapi.bps.go.id",
      phone: "Layanan Statistik BPS",
      heroLead: "Temukan ringkasan produk BPS, publikasi, tabel statistik, dan tautan sumber resmi dalam satu tampilan responsif.",
      indicators: [
        ["WebAPI", "7", "Dokumentasi WebAPI BPS memakai kode MFD 7 digit untuk parameter wilayah.", "Rujukan resmi", "WebAPI BPS kode MFD 7 digit", sourceUrls.bpsApi],
        ["Akses Data", "1", "AllStats BPS disebut sebagai aplikasi untuk mengakses indikator, publikasi, tabel dinamis, dan data sekitar.", "Aplikasi resmi", "AllStats BPS akses statistik", sourceUrls.selumaHome],
        ["Produk", "4", "Portal BPS daerah menampilkan kelompok produk utama: BRS, tabel statistik, publikasi, dan infografik.", "Produk statistik", "Produk BPS BRS tabel publikasi infografik", sourceUrls.selumaHome],
        ["Layanan", "2026", "Portal BPS daerah menampilkan rilis publikasi daerah tahun 2026 dan layanan statistik terpadu.", "Terbaru di portal", "Rilis publikasi daerah 2026", sourceUrls.selumaHome]
      ],
      news: [
        ["2026", "Publikasi Kabupaten Seluma Dalam Angka 2026 tersedia", "Halaman resmi BPS Kabupaten Seluma menampilkan informasi bahwa publikasi Kabupaten Seluma Dalam Angka 2026 sudah tersedia.", sourceUrls.selumaHome],
        ["2026", "Publikasi Kabupaten Kaur Dalam Angka 2026 resmi dirilis", "BPS Kabupaten Kaur menyebut publikasi 2026 terdiri dari 13 bab dan mencakup sektor geografi hingga perbandingan antarkabupaten/kota.", sourceUrls.kaur2026News],
        ["2025", "Kabupaten Kaur Dalam Angka 2025 tersedia", "BPS Kabupaten Kaur merilis berita bahwa publikasi 2025 memuat indikator sosial, ekonomi, dan pembangunan daerah.", sourceUrls.kaur2025News],
        ["2025", "Kabupaten Seluma Dalam Angka 2025 menjelaskan cakupan data daerah", "Publikasi Seluma 2025 memuat geografi, pemerintahan, penduduk, ketenagakerjaan, sosial, pertanian, energi, dan sektor lainnya.", sourceUrls.seluma2025],
        ["BPS", "WebAPI BPS menyediakan dokumentasi layanan data", "Dokumentasi WebAPI BPS memuat layanan interoperabilitas, termasuk daftar kode wilayah dan subjek SIMDASI.", sourceUrls.bpsApi],
        ["BPS", "Publikasi digital BPS dapat diakses melalui perpustakaan BPS", "Halaman publikasi BPS Kabupaten Kaur menjelaskan publikasi digital dapat diakses melalui Perpustakaan BPS.", sourceUrls.kaurPub]
      ],
      publications: [
        ["Kabupaten Seluma Dalam Angka 2026", "Publikasi tahunan daerah yang diumumkan tersedia pada portal resmi BPS Kabupaten Seluma.", "BPS", "bi-file-earmark-bar-graph", sourceUrls.selumaHome],
        ["Kabupaten Kaur Dalam Angka 2026", "Publikasi resmi BPS Kabupaten Kaur yang terdiri dari 13 bab dan mencakup berbagai sektor strategis.", "BPS", "bi-file-earmark-bar-graph", sourceUrls.kaur2026News],
        ["Kabupaten Seluma Dalam Angka 2025", "Publikasi tahunan yang menggambarkan Seluma dari geografi, pemerintahan, penduduk, sosial, pertanian, energi, pariwisata, dan sektor lain.", "BPS", "bi-file-earmark-text", sourceUrls.seluma2025],
        ["Kabupaten Kaur Dalam Angka 2025", "Publikasi yang dirilis BPS Kabupaten Kaur untuk data sosial, ekonomi, dan pembangunan daerah.", "BPS", "bi-file-earmark-text", sourceUrls.kaur2025News],
        ["Publikasi BPS Kabupaten Kaur", "Katalog publikasi resmi yang disusun dari sensus, survei, dan kegiatan statistik BPS.", "BPS", "bi-file-earmark-richtext", sourceUrls.kaurPub],
        ["Dokumentasi WebAPI BPS", "Dokumentasi layanan API BPS untuk akses data dan metadata statistik.", "BPS API", "bi-file-earmark-code", sourceUrls.bpsApi]
      ],
      tableRows: [
        ["Kode MFD wilayah", "Metadata", "Dokumentasi WebAPI", "7", "Digit", sourceUrls.bpsApi],
        ["Produk portal BPS daerah", "Diseminasi", "Portal BPS", "4", "Kelompok", sourceUrls.selumaHome],
        ["Bab Kaur Dalam Angka 2026", "Publikasi", "2026", "13", "Bab", sourceUrls.kaur2026News],
        ["Rilis Kaur Dalam Angka 2026", "Berita", "27 Feb 2026", "1", "Rilis", sourceUrls.kaur2026News],
        ["Rilis Kaur Dalam Angka 2025", "Berita", "28 Feb 2025", "1", "Rilis", sourceUrls.kaur2025News]
      ]
    },
    seluma: {
      label: "Kabupaten Seluma",
      brand: "Pusat Data Nusantara Kabupaten Seluma",
      short: "Seluma",
      place: "Kabupaten Seluma",
      contactAddress: "Jl. R.A Kartini Kelurahan Napal, Komplek Kantor Pemerintah Kabupaten Seluma",
      email: "bps1705@bps.go.id",
      phone: "(62-736) 915007",
      heroLead: "Temukan ringkasan publikasi, berita rilis, tabel metadata, dan kontak resmi BPS untuk Kabupaten Seluma.",
      indicators: [
        ["Publikasi", "2026", "Portal resmi BPS Kabupaten Seluma mengumumkan Kabupaten Seluma Dalam Angka 2026 sudah tersedia.", "Tersedia", "Kabupaten Seluma Dalam Angka 2026", sourceUrls.selumaHome],
        ["Publikasi", "2025", "Kabupaten Seluma Dalam Angka 2025 menyajikan data primer BPS dan data sekunder dari instansi pemerintah dan swasta.", "Publikasi tahunan", "Kabupaten Seluma Dalam Angka 2025", sourceUrls.seluma2025],
        ["Kontak", "915007", "Nomor telepon BPS Kabupaten Seluma yang tercantum pada portal resmi.", "Telp (62-736)", "Kontak BPS Seluma", sourceUrls.selumaHome],
        ["Cakupan", "12", "Publikasi Seluma memuat geografi, pemerintahan, penduduk, sosial, pertanian, energi, pariwisata, transportasi, dan sektor lain.", "Lintas sektor", "Cakupan publikasi Seluma", sourceUrls.seluma2025]
      ],
      news: [
        ["2026", "Kabupaten Seluma Dalam Angka 2026 tersedia", "Portal BPS Kabupaten Seluma menyampaikan publikasi Kabupaten Seluma Dalam Angka 2026 sudah dapat diakses.", sourceUrls.selumaHome],
        ["2025", "Kabupaten Seluma Dalam Angka 2025 memuat data primer dan sekunder", "Halaman publikasi BPS Seluma menjelaskan data bersumber dari kegiatan BPS serta instansi pemerintah dan swasta.", sourceUrls.seluma2025],
        ["2025", "Publikasi Seluma menggambarkan keadaan umum daerah", "Cakupan publikasi meliputi geografi, pemerintahan, penduduk, ketenagakerjaan, sosial, pertanian, energi, pariwisata, dan sektor lain.", sourceUrls.seluma2025],
        ["BPS", "BPS Seluma menyediakan indikator strategis melalui Serasi", "Portal resmi BPS Seluma mengarahkan pengguna ke layanan Serasi untuk informasi indikator strategis Kabupaten Seluma.", sourceUrls.selumaHome],
        ["BPS", "BPS Seluma menyediakan akses AllStats", "Portal BPS Seluma menampilkan ajakan menggunakan AllStats untuk akses statistik, publikasi, tabel dinamis, dan indikator.", sourceUrls.selumaHome],
        ["BPS", "Layanan resmi BPS Seluma tersedia melalui PST", "Portal resmi mencantumkan alamat kantor, telepon, dan mailbox BPS Kabupaten Seluma.", sourceUrls.selumaHome]
      ],
      publications: [
        ["Kabupaten Seluma Dalam Angka 2026", "Publikasi terbaru yang diumumkan tersedia pada portal resmi BPS Kabupaten Seluma.", "BPS", "bi-file-earmark-bar-graph", sourceUrls.selumaHome],
        ["Kabupaten Seluma Dalam Angka 2025", "Publikasi tahunan yang menggambarkan keadaan Seluma secara umum dari berbagai sektor.", "BPS", "bi-file-earmark-text", sourceUrls.seluma2025],
        ["Data primer dan sekunder Seluma", "Publikasi 2025 menyajikan data primer BPS dan data sekunder yang dikumpulkan dari instansi pemerintah dan swasta.", "BPS", "bi-file-earmark-spreadsheet", sourceUrls.seluma2025],
        ["Cakupan geografi dan pemerintahan Seluma", "Bagian cakupan publikasi mencakup geografi, pemerintahan, penduduk, dan ketenagakerjaan.", "BPS", "bi-file-earmark-richtext", sourceUrls.seluma2025],
        ["Cakupan sosial dan kesejahteraan rakyat Seluma", "Publikasi mencakup sosial, kesejahteraan rakyat, pertanian, energi, pariwisata, transportasi, dan komunikasi.", "BPS", "bi-file-earmark-person", sourceUrls.seluma2025],
        ["Perbandingan antarkabupaten di Provinsi Bengkulu", "Publikasi Seluma memuat data perbandingan antarkabupaten pada bagian akhir.", "BPS", "bi-file-earmark-zip", sourceUrls.seluma2025]
      ],
      tableRows: [
        ["Kabupaten Seluma Dalam Angka", "Publikasi", "2026", "1", "Publikasi tersedia", sourceUrls.selumaHome],
        ["Kabupaten Seluma Dalam Angka", "Publikasi", "2025", "1", "Publikasi tahunan", sourceUrls.seluma2025],
        ["Nomor telepon BPS Seluma", "Kontak", "Portal resmi", "915007", "Telepon", sourceUrls.selumaHome],
        ["Cakupan sektor publikasi", "Metadata", "2025", "12", "Sektor/bab tematik", sourceUrls.seluma2025],
        ["Sumber data publikasi", "Metadata", "2025", "2", "Primer dan sekunder", sourceUrls.seluma2025]
      ]
    },
    kaur: {
      label: "Kabupaten Kaur",
      brand: "Pusat Data Nusantara Kabupaten Kaur",
      short: "Kaur",
      place: "Kabupaten Kaur",
      contactAddress: "Jl. Peltu M. Ilyas T. Panji Alam, Kompleks Perkantoran Pemkab Kaur, Padang Kempas, Bintuhan",
      email: "bps1704@bps.go.id",
      phone: "(0739) 6180009",
      heroLead: "Temukan ringkasan publikasi, berita rilis, tabel metadata, dan kontak resmi BPS untuk Kabupaten Kaur.",
      indicators: [
        ["Publikasi", "2026", "Kabupaten Kaur Dalam Angka 2026 resmi dirilis pada 27 Februari 2026.", "Rilis resmi", "Kabupaten Kaur Dalam Angka 2026", sourceUrls.kaur2026News],
        ["Cakupan", "13", "Publikasi Kaur 2026 terdiri dari 13 bab yang mencakup sektor strategis daerah.", "Bab publikasi", "13 bab Kaur Dalam Angka 2026", sourceUrls.kaur2026News],
        ["Publikasi", "2025", "Kabupaten Kaur Dalam Angka 2025 diumumkan tersedia melalui berita resmi BPS Kabupaten Kaur.", "Rilis resmi", "Kabupaten Kaur Dalam Angka 2025", sourceUrls.kaur2025News],
        ["Kontak", "6180009", "Nomor telepon BPS Kabupaten Kaur yang tercantum pada portal resmi.", "Telp (0739)", "Kontak BPS Kaur", sourceUrls.kaurHome]
      ],
      news: [
        ["27 Feb 2026", "Kabupaten Kaur Dalam Angka 2026 resmi dirilis", "BPS Kabupaten Kaur menyebut publikasi 2026 menyajikan data dan informasi statistik terbaru dalam tabel dan infografis.", sourceUrls.kaur2026News],
        ["27 Feb 2026", "Kaur Dalam Angka 2026 terdiri dari 13 bab", "Cakupan bab meliputi geografi, pemerintahan, kependudukan, sosial, pertanian, industri, pariwisata, transportasi, harga, perdagangan, dan neraca regional.", sourceUrls.kaur2026News],
        ["28 Feb 2025", "Kabupaten Kaur Dalam Angka 2025 tersedia", "Berita BPS Kaur menjelaskan publikasi 2025 memuat indikator sosial, ekonomi, dan pembangunan Kabupaten Kaur.", sourceUrls.kaur2025News],
        ["BPS", "PST BPS Kabupaten Kaur membuka layanan statistik", "Halaman rilis Kaur mencantumkan layanan PST dan kanal kontak resmi BPS Kabupaten Kaur.", sourceUrls.kaur2026News],
        ["BPS", "Publikasi digital BPS dapat diakses melalui Perpustakaan BPS", "Halaman publikasi BPS Kaur menjelaskan publikasi disusun dari sensus, survei, dan kegiatan statistik lainnya.", sourceUrls.kaurPub],
        ["BPS", "Alamat dan nomor layanan BPS Kabupaten Kaur tersedia di portal resmi", "Portal BPS Kaur mencantumkan alamat kantor, nomor layanan, telepon, dan email.", sourceUrls.kaurHome]
      ],
      publications: [
        ["Kabupaten Kaur Dalam Angka 2026", "Publikasi resmi BPS Kaur yang dirilis 27 Februari 2026 dan terdiri dari 13 bab.", "BPS", "bi-file-earmark-bar-graph", sourceUrls.kaur2026News],
        ["Kabupaten Kaur Dalam Angka 2025", "Publikasi yang memuat perkembangan indikator sosial, ekonomi, dan pembangunan Kabupaten Kaur.", "BPS", "bi-file-earmark-text", sourceUrls.kaur2025News],
        ["Cakupan Kependudukan dan Ketenagakerjaan Kaur", "Salah satu sektor strategis dalam Kabupaten Kaur Dalam Angka 2026.", "BPS", "bi-file-earmark-person", sourceUrls.kaur2026News],
        ["Cakupan Pertanian, Kehutanan, Peternakan, dan Perikanan Kaur", "Sektor strategis yang disebut dalam rilis Kabupaten Kaur Dalam Angka 2026.", "BPS", "bi-file-earmark-spreadsheet", sourceUrls.kaur2026News],
        ["Cakupan Pariwisata Kaur", "Pariwisata termasuk dalam bab publikasi Kabupaten Kaur Dalam Angka 2026.", "BPS", "bi-file-earmark-richtext", sourceUrls.kaur2026News],
        ["Katalog Publikasi BPS Kabupaten Kaur", "Publikasi BPS disusun dari hasil sensus, survei, dan kegiatan statistik lain.", "BPS", "bi-file-earmark-zip", sourceUrls.kaurPub]
      ],
      tableRows: [
        ["Kabupaten Kaur Dalam Angka", "Publikasi", "2026", "13", "Bab", sourceUrls.kaur2026News],
        ["Tanggal rilis Kaur Dalam Angka", "Berita", "2026", "27", "Februari", sourceUrls.kaur2026News],
        ["Kabupaten Kaur Dalam Angka", "Publikasi", "2025", "1", "Publikasi tersedia", sourceUrls.kaur2025News],
        ["Nomor telepon BPS Kaur", "Kontak", "Portal resmi", "6180009", "Telepon", sourceUrls.kaurHome],
        ["Nomor layanan BPS Kaur", "Kontak", "Portal resmi", "082279812491", "WhatsApp/layanan", sourceUrls.kaurHome]
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

  const revealObserver = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.16 })
    : null;

  const counterObserver = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      });
    }, { threshold: 0.45 })
    : null;

  function decorateMotion() {
    const revealTargets = document.querySelectorAll(".quick-grid a, .indicator-card, .news-item, .content-card, .publication-feature, .publication-card, .publication-panel, .table-shell, .contact-info, .contact-form");
    revealTargets.forEach((target, index) => {
      target.classList.add("reveal");
      target.style.transitionDelay = `${Math.min(index % 6, 5) * 45}ms`;
      if (revealObserver) {
        revealObserver.observe(target);
      } else {
        target.classList.add("is-visible");
      }
    });

    document.querySelectorAll(".indicator-card h3").forEach((counter) => {
      counter.dataset.counterFinal = counter.textContent.trim();
      counter.dataset.counterDone = "false";
      if (counterObserver) {
        counterObserver.observe(counter);
      } else {
        animateCounter(counter);
      }
    });
  }

  function parseCounterValue(text) {
    const match = text.match(/[\d.,]+/);
    if (!match) return null;
    const numberText = match[0];
    const normalized = numberText.includes(",") ? numberText.replace(/\./g, "").replace(",", ".") : numberText;
    const value = Number.parseFloat(normalized);
    if (!Number.isFinite(value)) return null;
    return {
      value,
      decimals: numberText.includes(",") ? numberText.split(",")[1].length : 0,
      prefix: text.slice(0, match.index),
      suffix: text.slice(match.index + numberText.length),
      comma: numberText.includes(",")
    };
  }

  function animateCounter(element) {
    if (element.dataset.counterDone === "true") return;
    const finalText = element.dataset.counterFinal || element.textContent.trim();
    const parsed = parseCounterValue(finalText);
    if (!parsed) return;

    element.dataset.counterDone = "true";
    const duration = 900;
    const startTime = performance.now();

    function formatValue(value) {
      const fixed = value.toFixed(parsed.decimals);
      return parsed.comma ? fixed.replace(".", ",") : fixed;
    }

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = `${parsed.prefix}${formatValue(parsed.value * eased)}${parsed.suffix}`;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        element.textContent = finalText;
      }
    }

    requestAnimationFrame(tick);
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
        <div class="location-empty d-none">Lokasi tidak ditemukan.</div>
      </div>
    `;
    nav.appendChild(item);

    const search = item.querySelector(".location-search");
    const options = Array.from(item.querySelectorAll(".location-option"));
    const empty = item.querySelector(".location-empty");

    search.addEventListener("click", (event) => event.stopPropagation());
    search.addEventListener("input", () => {
      const query = search.value.trim().toLowerCase();
      let visible = 0;
      options.forEach((option) => {
        const hit = option.textContent.toLowerCase().includes(query);
        option.classList.toggle("d-none", !hit);
        if (hit) visible += 1;
      });
      empty.classList.toggle("d-none", visible > 0);
    });

    options.forEach((option) => {
      option.addEventListener("click", () => {
        const nextLocation = option.dataset.location;
        localStorage.setItem(storageKey, nextLocation);
        showLocationLoading(() => applyLocation(nextLocation));
      });
    });
  }

  function locationSubjectOffset(locationKey) {
    if (locationKey === "seluma") return 0.35;
    if (locationKey === "kaur") return 0.55;
    return 0;
  }

  function subjectSeries(locationKey, subjectId) {
    const profile = subjectChartProfiles[subjectId] || subjectChartProfiles.pdrb;
    const offset = locationSubjectOffset(locationKey);
    return {
      lineTitle: `${profile.title} ${locations[locationKey]?.place || "Indonesia"} (% YoY)`,
      barTitle: `Komposisi ${profile.title} ${locations[locationKey]?.place || "Indonesia"} (% YoY)`,
      line: yearLabels.map((label, index) => [label, Number((profile.base[index] + offset).toFixed(2))]),
      bar: yearLabels.map((label, index) => [label, Number(Math.max(profile.bar[index] - offset / 2, 0.2).toFixed(2))])
    };
  }

  function renderSubjectPanel() {
    const list = document.querySelector(".subject-list");
    if (!list || list.dataset.ready === "true") return;
    list.dataset.ready = "true";
    list.innerHTML = subjectGroups.map((group, index) => `
      <div class="subject-group ${index === 0 ? "open" : ""}">
        <button class="subject-toggle" type="button" aria-expanded="${index === 0 ? "true" : "false"}">
          <i class="bi ${group.icon}"></i>
          <span>${group.label}</span>
          <i class="bi bi-caret-down-fill"></i>
        </button>
        <div class="subject-children">
          ${group.children.map((child) => `<button class="subject-child ${child.id === activeSubjectId ? "active" : ""}" type="button" data-subject="${child.id}">${child.label}</button>`).join("")}
        </div>
      </div>
    `).join("");

    list.querySelectorAll(".subject-toggle").forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const group = toggle.closest(".subject-group");
        const open = group.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
      });
    });

    list.querySelectorAll(".subject-child").forEach((button) => {
      button.addEventListener("click", () => {
        activeSubjectId = button.dataset.subject;
        list.querySelectorAll(".subject-child").forEach((item) => item.classList.toggle("active", item === button));
        renderChart(activeData());
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
      card.innerHTML = `<span class="badge-soft">${item[0]}</span><h3>${item[1]}</h3><p>${item[2]}</p><small><i class="bi bi-link-45deg"></i> <a href="${item[5]}" target="_blank" rel="noopener">${item[3]}</a></small>`;
    });
  }

  function newsArticle(item, compact, index = 0) {
    const title = item[1];
    const heading = compact ? "h3" : "h2";
    const detailHref = `berita-detail.html?id=${index}`;
    const link = compact ? `<a href="${detailHref}">${title}</a>` : title;
    const readMore = compact ? "" : `<a href="${detailHref}">Baca ringkasan</a><a class="source-link" href="${item[3]}" target="_blank" rel="noopener">Sumber BPS <i class="bi bi-box-arrow-up-right"></i></a>`;
    const cls = compact ? "news-item" : "content-card";
    return `<article class="${cls} searchable-item" data-title="${title}"><time>${item[0]}</time><${heading}>${link}</${heading}><p>${item[2]}</p>${readMore}</article>`;
  }

  function renderNews(data) {
    const homeList = document.querySelector(".news-list");
    if (homeList) homeList.innerHTML = data.news.slice(0, 3).map((item, index) => newsArticle(item, true, index)).join("");

    if (currentPage() === "berita.html") {
      const row = document.querySelector(".section-pad .row.g-4");
      if (row) {
        row.innerHTML = data.news.map((item, index) => `<div class="col-md-6 col-xl-4">${newsArticle(item, false, index)}</div>`).join("");
      }
    }
  }

  function publicationCard(item, feature, index = 0) {
    const detailHref = `publikasi-detail.html?id=${index}`;
    if (feature) {
      return `<article class="publication-feature searchable-item" data-title="${item[0]}"><i class="bi ${item[3]}"></i><div><h3>${item[0]}</h3><p>${item[1]}</p><a href="${detailHref}">Lihat detail <i class="bi bi-arrow-right"></i></a></div></article>`;
    }
    return `<article class="publication-card searchable-item" data-title="${item[0]}"><i class="bi ${item[3]}"></i><span>${item[2]}</span><h2>${item[0]}</h2><p>${item[1]}</p><a class="btn btn-outline-primary btn-sm" href="${detailHref}"><i class="bi bi-eye"></i> Detail</a><a class="source-link" href="${item[4]}" target="_blank" rel="noopener">Sumber BPS <i class="bi bi-box-arrow-up-right"></i></a></article>`;
  }

  function renderPublications(data) {
    const panel = document.querySelector(".publication-panel");
    if (panel) {
      panel.querySelectorAll(".publication-feature").forEach((item) => item.remove());
      panel.insertAdjacentHTML("beforeend", data.publications.slice(0, 2).map((item, index) => publicationCard(item, true, index)).join(""));
    }

    if (currentPage() === "publikasi.html") {
      const row = document.querySelector(".section-pad .row.g-4");
      if (row) {
        row.innerHTML = data.publications.map((item, index) => `<div class="col-md-6 col-xl-4">${publicationCard(item, false, index)}</div>`).join("");
      }
    }
  }

  function renderTable(data) {
    const head = document.querySelector(".statistics-table thead tr");
    if (head) head.innerHTML = "<th>Indikator</th><th>Sektor</th><th>Periode</th><th>Nilai</th><th>Satuan</th><th>Sumber</th>";
    const body = document.querySelector(".statistics-table tbody");
    if (!body) return;
    body.innerHTML = data.tableRows.map((row) => {
      const title = row.join(" ");
      return `<tr class="searchable-item" data-title="${title}"><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td><td>${row[3]}</td><td>${row[4]}</td><td><a href="${row[5]}" target="_blank" rel="noopener">BPS</a></td></tr>`;
    }).join("");
  }

  function renderContact(data) {
    setText(".contact-info h2", `Pusat Layanan Statistik ${data.place}`);
    const info = document.querySelector(".contact-info");
    if (info) {
      info.innerHTML = `<h2>Pusat Layanan Statistik ${data.place}</h2><p><i class="bi bi-geo-alt"></i> ${data.contactAddress}</p><p><i class="bi bi-envelope"></i> ${data.email}</p><p><i class="bi bi-telephone"></i> ${data.phone}</p><p><i class="bi bi-clock"></i> Senin-Jumat, 08.00-16.00 WIB</p>`;
    }
  }

  function activeData() {
    return locations[getLocationKey()] || locations[defaultLocation];
  }

  function renderBreadcrumb(data) {
    const page = currentPage();
    if (page === "index.html") return;
    const labels = {
      "berita.html": "Berita",
      "statistik.html": "Statistik",
      "publikasi.html": "Publikasi",
      "kontak.html": "Kontak",
      "berita-detail.html": "Detail Berita",
      "publikasi-detail.html": "Detail Publikasi"
    };
    const header = document.querySelector(".page-header .container");
    if (!header || header.querySelector(".breadcrumb-shell")) return;
    const productPages = ["berita.html", "statistik.html", "publikasi.html", "berita-detail.html", "publikasi-detail.html"];
    const productCrumb = productPages.includes(page) ? `<li class="breadcrumb-item">Produk</li>` : "";
    header.insertAdjacentHTML("afterbegin", `<nav class="breadcrumb-shell" aria-label="Breadcrumb"><ol class="breadcrumb"><li class="breadcrumb-item"><a href="index.html">Beranda</a></li>${productCrumb}<li class="breadcrumb-item active" aria-current="page">${labels[page] || data.place}</li></ol></nav>`);
  }

  function renderDetailPages(data) {
    const page = currentPage();
    if (!["berita-detail.html", "publikasi-detail.html"].includes(page)) return;
    const params = new URLSearchParams(window.location.search);
    const id = Number.parseInt(params.get("id") || "0", 10);
    const collection = page === "berita-detail.html" ? data.news : data.publications;
    const item = collection[id] || collection[0];
    const isNews = page === "berita-detail.html";
    const title = isNews ? item[1] : item[0];
    const dateOrType = isNews ? item[0] : item[2];
    const desc = isNews ? item[2] : item[1];
    const source = isNews ? item[3] : item[4];

    setText(".page-header h1", title);
    setText(".page-header .lead", `Ringkasan berbasis sumber resmi untuk ${data.place}.`);

    const detail = document.querySelector(".detail-body");
    if (!detail) return;
    detail.innerHTML = `
      <article class="detail-article searchable-item" data-title="${title}">
        <span class="badge-soft">${dateOrType}</span>
        <h2>${title}</h2>
        <p>${desc}</p>
        <p>Konten ini diringkas dari halaman resmi BPS yang menjadi sumber utama. Gunakan tautan sumber untuk membaca informasi lengkap dan mengunduh dokumen bila tersedia.</p>
        <div class="detail-actions">
          <a class="btn btn-primary" href="${source}" target="_blank" rel="noopener"><i class="bi bi-box-arrow-up-right"></i> Buka sumber BPS</a>
          <a class="btn btn-outline-primary" href="${isNews ? "berita.html" : "publikasi.html"}"><i class="bi bi-arrow-left"></i> Kembali</a>
        </div>
      </article>
    `;
  }

  function renderChart(data) {
    const activeKey = getLocationKey();
    const strategic = subjectSeries(activeKey, activeSubjectId) || strategicCharts[activeKey] || strategicCharts[defaultLocation];
    setText("#lineChartTitle", strategic.lineTitle);
    setText("#barChartTitle", strategic.barTitle);

    const lineCanvas = document.querySelector("#strategicLineChart");
    const barCanvas = document.querySelector("#strategicBarChart");
    if (lineCanvas) drawLineChart(lineCanvas, strategic.line);
    if (barCanvas) drawBarChart(barCanvas, strategic.bar);

    const canvas = document.querySelector("#statisticsChart");
    if (!canvas) return;
    const sourceRows = data.tableRows.map((row) => [row[0], row[3]]);
    drawBarChart(canvas, sourceRows, { compact: true });
  }

  function prepareCanvas(canvas, height = 320) {
    const ratio = window.devicePixelRatio || 1;
    const rectWidth = Math.max(canvas.clientWidth, 320);
    canvas.width = rectWidth * ratio;
    canvas.height = height * ratio;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, rectWidth, height);
    return { ctx, width: rectWidth, height };
  }

  function drawGrid(ctx, width, height, pad, max, min = 0) {
    ctx.strokeStyle = "#e6edf5";
    ctx.lineWidth = 1;
    ctx.fillStyle = "#6b7280";
    ctx.font = "12px Arial";
    const steps = 4;
    for (let i = 0; i <= steps; i += 1) {
      const y = pad.top + ((height - pad.top - pad.bottom) / steps) * i;
      const value = max - ((max - min) / steps) * i;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(width - pad.right, y);
      ctx.stroke();
      ctx.fillText(`${value.toFixed(value % 1 ? 1 : 0)}%`, 12, y + 4);
    }
  }

  function drawAxisLabel(ctx, label, x, y, maxWidth = 58) {
    const clean = String(label);
    if (ctx.measureText(clean).width <= maxWidth) {
      ctx.fillText(clean, x, y);
      return;
    }
    const words = clean.split(" ");
    const lines = [];
    let current = "";
    words.forEach((word) => {
      const next = current ? `${current} ${word}` : word;
      if (ctx.measureText(next).width <= maxWidth) {
        current = next;
      } else {
        if (current) lines.push(current);
        current = word;
      }
    });
    if (current) lines.push(current);
    lines.slice(0, 2).forEach((line, index) => {
      const text = index === 1 && lines.length > 2 ? `${line.slice(0, 9)}...` : line;
      ctx.fillText(text, x, y + index * 13);
    });
  }

  function drawLineChart(canvas, rows) {
    const { ctx, width, height } = prepareCanvas(canvas, 280);
    const pad = { top: 42, right: 36, bottom: 46, left: 52 };
    const values = rows.map((row) => row[1]);
    const labels = rows.map((row) => row[0]);
    const min = Math.max(0, Math.floor(Math.min(...values) - 1));
    const max = Math.ceil(Math.max(...values) + 1);
    const plotW = width - pad.left - pad.right;
    const plotH = height - pad.top - pad.bottom;

    drawGrid(ctx, width, height, pad, max, min);

    const points = values.map((value, index) => {
      const x = pad.left + (plotW / (values.length - 1)) * index;
      const y = pad.top + plotH - ((value - min) / (max - min)) * plotH;
      return { x, y, value };
    });

    ctx.beginPath();
    ctx.moveTo(points[0].x, height - pad.bottom);
    points.forEach((point) => ctx.lineTo(point.x, point.y));
    ctx.lineTo(points[points.length - 1].x, height - pad.bottom);
    ctx.closePath();
    ctx.fillStyle = "rgba(31, 92, 166, 0.14)";
    ctx.fill();

    ctx.beginPath();
    points.forEach((point, index) => {
      if (index === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.strokeStyle = "#185aa2";
    ctx.lineWidth = 4;
    ctx.stroke();

    points.forEach((point, index) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = index === points.length - 1 ? "#d21f3c" : "#185aa2";
      ctx.fill();
      ctx.fillStyle = index === points.length - 1 ? "#d21f3c" : "#064b98";
      ctx.font = "bold 12px Arial";
      ctx.fillText(`${String(point.value).replace(".", ",")}%`, point.x - 14, point.y - 14);
      ctx.fillStyle = "#6b7280";
      ctx.font = "12px Arial";
      drawAxisLabel(ctx, labels[index], point.x - 17, height - 30, 48);
    });
  }

  function drawBarChart(canvas, rows, options = {}) {
    const { ctx, width, height } = prepareCanvas(canvas, options.compact ? 280 : 280);
    const pad = { top: 42, right: 36, bottom: 46, left: 52 };
    const values = rows.map((row) => Number.parseFloat(String(row[1]).replace(",", "."))).filter(Number.isFinite);
    const labels = rows.slice(0, values.length).map((row) => row[0]);
    const max = Math.max(...values, 1);
    const plotW = width - pad.left - pad.right;
    const plotH = height - pad.top - pad.bottom;

    drawGrid(ctx, width, height, pad, Math.ceil(max + 1), 0);

    values.forEach((value, index) => {
      const gap = plotW / values.length;
      const barW = gap * 0.58;
      const x = pad.left + index * gap + gap * 0.21;
      const barH = plotH * (value / Math.ceil(max + 1));
      const y = pad.top + plotH - barH;
      const gradient = ctx.createLinearGradient(0, y, 0, height - pad.bottom);
      gradient.addColorStop(0, "#0f9d8a");
      gradient.addColorStop(1, "#0f5d9c");
      ctx.fillStyle = index === values.length - 1 ? "#d21f3c" : gradient;
      ctx.fillRect(x, y, barW, barH);
      ctx.fillStyle = "#172033";
      ctx.font = "bold 12px Arial";
      ctx.fillText(`${String(value).replace(".", ",")}%`, x, y - 10);
      ctx.fillStyle = "#667085";
      ctx.font = "12px Arial";
      drawAxisLabel(ctx, labels[index], x - 4, height - 32, Math.max(48, barW + 16));
    });
  }

  function renderUnifiedFooter(data) {
    const footer = document.querySelector(".site-footer .container");
    if (!footer) return;
    footer.innerHTML = `
      <div class="row g-4">
        <div class="col-lg-4">
          <h2>${data.brand}</h2>
          <p>Portal latihan berbasis ringkasan dan tautan sumber resmi BPS untuk kebutuhan pembelajaran antarmuka data statistik.</p>
          <a class="source-link light" href="${sourceUrls.bpsApi}" target="_blank" rel="noopener">Dokumentasi WebAPI BPS</a>
        </div>
        <div class="col-sm-6 col-lg-2">
          <h3>Menu</h3>
          <a href="index.html">Beranda</a>
          <a href="berita.html">Berita</a>
          <a href="statistik.html">Statistik</a>
          <a href="publikasi.html">Publikasi</a>
        </div>
        <div class="col-sm-6 col-lg-3">
          <h3>Layanan</h3>
          <a href="kontak.html">Konsultasi Data</a>
          <a href="statistik.html">Tabel Statistik</a>
          <a href="publikasi.html">Publikasi BPS</a>
        </div>
        <div class="col-lg-3">
          <h3>Kontak</h3>
          <p>${data.contactAddress}<br>${data.email}<br>${data.phone}</p>
        </div>
      </div>
      <div class="footer-bottom">© 2026 ${data.brand}. Ringkasan memakai sumber resmi BPS.</div>
    `;
  }

  function allSearchRecords(data) {
    return [
      ...data.news.map((item, index) => ({ type: "Berita", title: item[1], desc: item[2], href: `berita-detail.html?id=${index}` })),
      ...data.publications.map((item, index) => ({ type: "Publikasi", title: item[0], desc: item[1], href: `publikasi-detail.html?id=${index}` })),
      ...data.tableRows.map((item) => ({ type: "Statistik", title: item[0], desc: `${item[1]} - ${item[2]} - ${item[3]} ${item[4]}`, href: "statistik.html" }))
    ];
  }

  function showSearchResults(query, results) {
    let panel = document.querySelector(".global-search-results");
    const main = document.querySelector("main");
    if (!panel && main) {
      main.insertAdjacentHTML("afterbegin", `<section class="global-search-results"><div class="container"><div class="search-result-head"><h2>Hasil pencarian</h2><button type="button" class="btn btn-sm btn-outline-primary clear-search">Tutup</button></div><div class="search-result-list"></div></div></section>`);
      panel = document.querySelector(".global-search-results");
      panel.querySelector(".clear-search").addEventListener("click", () => panel.classList.remove("show"));
    }
    if (!panel) return;
    const list = panel.querySelector(".search-result-list");
    list.innerHTML = results.length
      ? results.map((item) => `<a class="search-result-item" href="${item.href}"><span>${item.type}</span><strong>${item.title}</strong><p>${item.desc}</p></a>`).join("")
      : `<div class="empty-state"><i class="bi bi-search"></i><h3>Tidak ada hasil untuk "${query}"</h3><p>Coba kata kunci lain atau pilih lokasi berbeda.</p></div>`;
    panel.classList.add("show");
  }

  function applyLocation(key) {
    const data = locations[key] || locations[defaultLocation];
    const page = currentPage();
    document.documentElement.dataset.location = key;
    document.title = pageTitle(page, data);
    setText(".navbar-brand strong", data.brand);
    setText(".site-footer h2", data.brand);
    setText(".hero-content .lead", data.heroLead);
    setText(".page-header .lead", `Gunakan formulir ini untuk permintaan data, konsultasi metadata, atau bantuan publikasi ${data.place}.`);

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

    renderUnifiedFooter(data);

    const currentLocation = document.querySelector(".location-current");
    if (currentLocation) currentLocation.textContent = data.label;

    document.querySelectorAll(".location-option").forEach((option) => {
      option.classList.toggle("active", option.dataset.location === key);
      option.classList.remove("d-none");
    });

    const locationSearch = document.querySelector(".location-search");
    if (locationSearch) locationSearch.value = "";
    document.querySelector(".location-empty")?.classList.add("d-none");

    document.querySelectorAll(".is-hidden-by-search").forEach((item) => item.classList.remove("is-hidden-by-search"));
    renderIndicatorCards(data);
    renderNews(data);
    renderPublications(data);
    renderTable(data);
    renderContact(data);
    renderSubjectPanel();
    renderBreadcrumb(data);
    renderDetailPages(data);
    renderChart(data);
    decorateMotion();
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

      if (!query) {
        showToast("Masukkan kata kunci untuk mencari data.");
        return;
      }

      const data = activeData();
      const results = allSearchRecords(data).filter((item) => `${item.type} ${item.title} ${item.desc}`.toLowerCase().includes(query));
      showSearchResults(input.value.trim(), results);
    });

    input.addEventListener("input", () => {
      if (input.value.trim()) return;
      document.querySelectorAll(".searchable-item").forEach((item) => displayTarget(item).classList.remove("is-hidden-by-search"));
      document.querySelector(".global-search-results")?.classList.remove("show");
    });
  });

  document.querySelectorAll(".contact-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      showToast("Pesan berhasil disiapkan. Form statis ini belum terhubung ke server.");
      form.reset();
    });
  });
})();
