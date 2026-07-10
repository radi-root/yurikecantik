document.addEventListener('DOMContentLoaded',()=>{
  const menu=document.querySelector('.menu-btn'),nav=document.querySelector('.nav');
  menu?.addEventListener('click',()=>{nav.classList.toggle('open');menu.setAttribute('aria-expanded',nav.classList.contains('open'))});
  document.querySelector('.drop-btn')?.addEventListener('click',e=>{if(innerWidth<=900)e.currentTarget.parentElement.classList.toggle('open')});
  const page=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav a').forEach(a=>{if(a.getAttribute('href')===page)a.classList.add('active')});
  document.querySelectorAll('.copy-btn').forEach(btn=>btn.addEventListener('click',async()=>{const code=btn.closest('.code-wrap').querySelector('code').innerText;await navigator.clipboard.writeText(code);btn.textContent='Tersalin ✓';setTimeout(()=>btn.textContent='Salin kode',1600)}));
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
  const toTop=document.querySelector('.back-to-top');
  const toggleTop=()=>toTop?.classList.toggle('show',window.scrollY>500);
  toggleTop();window.addEventListener('scroll',toggleTop,{passive:true});

  document.querySelectorAll('.footer-contact').forEach(contact=>{
    const map=document.createElement('div');
    map.className='map-card';
    map.innerHTML=`<iframe title="Peta lokasi Bapperida Provinsi Bengkulu" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=BAPPERIDA+Provinsi+Bengkulu,+Jl.+Pembangunan+No.15,+Padang+Harapan,+Bengkulu&output=embed"></iframe><div class="map-card-info"><span class="map-pin" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" stroke-width="2"/></svg></span><span>Kantor Bapperida<br><a href="https://www.google.com/maps/search/?api=1&query=BAPPERIDA+Provinsi+Bengkulu+Jl.+Pembangunan+No.15" target="_blank" rel="noopener">Buka Google Maps ↗</a></span></div>`;
    contact.appendChild(map);
  });

  const hero=document.querySelector('.hero');
  if(hero&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    let ticking=false;
    const shiftHero=()=>{hero.style.setProperty('--hero-shift',`${Math.min(scrollY*.055,28)}px`);ticking=false};
    addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(shiftHero);ticking=true}},{passive:true});
  }
});
