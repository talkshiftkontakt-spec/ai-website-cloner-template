
/* ═══════════════════════════════════════════════
   LEKCJERAZEM.PL — SCRIPTS v3
   ═══════════════════════════════════════════════ */

/* ── 1. NAV SCROLL ── */
const mainNav = document.getElementById("main-nav");
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const s = window.scrollY;
  mainNav.classList.toggle("scrolled", s > 20);
  lastScroll = s;
}, { passive: true });

/* ── 1b. Wysokość nawigacji → padding treści ──
   Nawigacja jest fixed i może się ZAWIJAĆ do kilku linii; ustawiamy padding-top
   <body> na realną wysokość nav, żeby treść nigdy nie chowała się pod nim. */
function syncNavPad(){
  if (mainNav) document.body.style.paddingTop = mainNav.offsetHeight + "px";
}
syncNavPad();
window.addEventListener("load", syncNavPad);
window.addEventListener("resize", syncNavPad, { passive: true });

/* ── 2. HAMBURGER ── */
const burger    = document.getElementById("nav-burger");
const mobileNav = document.getElementById("nav-mobile");

function closeMobileNav() {
  burger.classList.remove("open");
  mobileNav.classList.remove("open");
  burger.setAttribute("aria-expanded","false");
  document.body.style.overflow = "";
}

if (burger) {
  burger.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");
    burger.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  });
}
document.addEventListener("keydown", e => { if(e.key==="Escape") closeMobileNav(); });

/* ── 3. HERO PATH TOGGLE ── */
function switchHero(path, btn) {
  document.querySelectorAll(".ptbtn").forEach(b => b.classList.remove("at","as"));
  const t = path==="tutor";
  btn.classList.add(t ? "at" : "as");
  document.getElementById("hcta-tutor").style.display    = t ? "flex" : "none";
  document.getElementById("hcta-student").style.display  = t ? "none" : "flex";
  document.getElementById("hnote-tutor").style.display   = t ? "flex" : "none";
  document.getElementById("hnote-student").style.display = t ? "none" : "block";
}

/* ── 4. BOARD ANIMATION ── */
(function boardAnimate() {
  const ids    = ["cl1","cl2","cl3","cl4","cl5","cl6"];
  const delays = [600,1000,1400,1800,2200,2600];
  function showLines() {
    ids.forEach((id,i) => setTimeout(() => {
      const el = document.getElementById(id);
      if(el) el.classList.add("show");
    }, delays[i]));
  }
  function hideLines() {
    ids.forEach(id => { const el=document.getElementById(id); if(el) el.classList.remove("show"); });
  }
  showLines();
  setTimeout(function loop() {
    hideLines();
    setTimeout(() => { showLines(); setTimeout(loop, 10000); }, 900);
  }, 10000);
})();

/* ── 5. COUNTER ANIMATION — płynne narastanie od zera, bez „odbicia" w dole skali ──
   Zapętlone: max (pauza) → liczenie od zera do max → max (pauza) → od nowa, w kółko. */
function animateCounter(el, target, onDone) {
  const dur = 4000, start = performance.now();
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }
  function step(now) {
    const p = Math.min((now - start) / dur, 1);
    el.textContent = Math.floor(easeOutCubic(p) * target).toLocaleString("pl-PL") + "+";
    if(p < 1) requestAnimationFrame(step);
    else {
      el.textContent = target.toLocaleString("pl-PL") + "+";
      if(onDone) onDone();
    }
  }
  requestAnimationFrame(step);
}

function loopCounter(el, target, pause) {
  el.textContent = target.toLocaleString("pl-PL") + "+"; // start: pokaż max
  function runOnce() {
    animateCounter(el, target, () => setTimeout(runOnce, pause));
  }
  setTimeout(runOnce, pause); // pauza na max, potem pierwsze liczenie od zera
}

/* ── 6. SCROLL REVEAL with stagger ──
   Liczniki: w HTML renderujemy wartość KOŃCOWĄ (max) — widzą ją OD RAZU użytkownicy,
   roboty/Google oraz osoby bez JS. NIE zerujemy jej na starcie (żeby nie migało „0").
   Dla prawdziwych użytkowników pokazujemy najpierw gotową liczbę przez LR_COUNT_DELAY (1s),
   a potem licznik zapętla się: liczenie od zera do max (4s) → pauza na max (1s) → od nowa.
   Roboty NIE animują — indeksują stałą, końcową liczbę. */
const LR_BOT = /bot|crawl|spider|slurp|bingpreview|lighthouse|headless|google-inspectiontool|chrome-lighthouse|pagespeed/i
  .test(navigator.userAgent || "");
const LR_COUNT_DELAY = 1000; // ile ms pokazywać gotową liczbę (na starcie i między pętlami)

const srObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(!e.isIntersecting) return;
    e.target.classList.add("vis");
    const tgt = parseInt(e.target.dataset.target);
    if(tgt && !LR_BOT) loopCounter(e.target, tgt, LR_COUNT_DELAY);
    srObs.unobserve(e.target);
  });
}, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
document.querySelectorAll(".sr,.sr-left,.sr-scale,[data-target]").forEach(el => srObs.observe(el));

/* ── 7. FAQ ── */
function toggleFaq(btn) {
  const item   = btn.parentElement;
  const isOpen = item.classList.contains("open");
  document.querySelectorAll(".faq-item.open").forEach(i => i.classList.remove("open"));
  if(!isOpen) item.classList.add("open");
}

/* ── 8. BLOG TABS ── */
function switchBlog(type, btn) {
  document.querySelectorAll(".btab").forEach(b => b.classList.remove("tat","sat"));
  document.querySelectorAll(".blog-arts").forEach(el => el.classList.remove("vis"));
  document.querySelectorAll(".art-preview").forEach(el => el.style.display="none");
  btn.classList.add(type==="tutor" ? "tat" : "sat");
  document.getElementById("blog-"+type).classList.add("vis");
}

/* ── 9. ARTICLE OPEN / CLOSE ── */
function showArt(id, e) {
  e.preventDefault();
  document.querySelectorAll(".art-preview").forEach(el => el.style.display="none");
  const art = document.getElementById("art-"+id);
  if(art){ art.style.display="block"; setTimeout(()=>art.scrollIntoView({behavior:"smooth",block:"start"}),50); }
}
function closeArt(id) {
  const el = document.getElementById("art-"+id);
  if(el) el.style.display="none";
}

/* ── 10. PARALLAX hero visual ── */
window.addEventListener("scroll", () => {
  const vis = document.querySelector(".hero-visual");
  if(!vis) return;
  const s = window.pageYOffset;
  if(s < window.innerHeight * 1.2) vis.style.transform = "translateY(" + s*0.045 + "px)";
}, { passive: true });

/* ── 11. BADGE HOVER ── */
document.querySelectorAll(".fb").forEach(fb => {
  fb.addEventListener("mouseenter", () => {
    fb.style.transform = "scale(1.08) translateY(-3px)";
    fb.style.boxShadow = "0 16px 48px rgba(0,0,0,.22)";
    fb.style.transition = "all .2s";
  });
  fb.addEventListener("mouseleave", () => {
    fb.style.transform = "";
    fb.style.boxShadow = "";
  });
});

/* ── 12. RIPPLE on primary buttons ── */
document.querySelectorAll(".btn-prim,.p-btn-fill,.pcard-cta").forEach(btn => {
  btn.addEventListener("click", function(e) {
    const r = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    r.style.cssText = "position:absolute;border-radius:50%;background:rgba(255,255,255,.3);width:"+size+"px;height:"+size+"px;left:"+(e.clientX-rect.left-size/2)+"px;top:"+(e.clientY-rect.top-size/2)+"px;transform:scale(0);animation:rippleAnim .5s ease;pointer-events:none";
    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(r);
    setTimeout(() => r.remove(), 600);
  });
});

/* inject ripple keyframe once */
(function(){
  const s = document.createElement("style");
  s.textContent = "@keyframes rippleAnim{to{transform:scale(2.5);opacity:0}}";
  document.head.appendChild(s);
})();

/* ── 13. BPILL shimmer on hover ── */
document.querySelectorAll(".bpill").forEach((p,i) => {
  p.style.animationDelay = (i*0.08)+"s";
});

/* ── 14. FEATURE CARD tilt on hover ── */
document.querySelectorAll(".fcard").forEach(card => {
  card.addEventListener("mousemove", e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = "translateY(-6px) rotateY("+x*4+"deg) rotateX("+(-y*3)+"deg)";
    card.style.transition = "transform 0s";
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
    card.style.transition = "";
  });
});

/* ── 15. COOKIE BANNER ── */
function showCookieBanner() {
  if(!localStorage.getItem("lr_cookies")) {
    setTimeout(() => document.getElementById("cookie-banner").classList.add("show"), 2000);
  }
}
function acceptCookies() {
  localStorage.setItem("lr_cookies","accepted");
  document.getElementById("cookie-banner").style.transform = "translateY(120%)";
  document.getElementById("cookie-banner").style.transition = "transform .4s ease";
  setTimeout(() => document.getElementById("cookie-banner").classList.remove("show"), 400);
}
function declineCookies() {
  localStorage.setItem("lr_cookies","declined");
  acceptCookies();
}
showCookieBanner();

/* ── 16. STAT NUMBER hover glow ── */
document.querySelectorAll(".pnum").forEach(el => {
  el.addEventListener("mouseenter", () => {
    const n = el.querySelector(".n");
    if(n) { n.style.textShadow="0 0 30px rgba(232,68,15,.4)"; n.style.transition="text-shadow .3s"; }
  });
  el.addEventListener("mouseleave", () => {
    const n = el.querySelector(".n");
    if(n) n.style.textShadow="";
  });
});

/* ── 17. KARUZELA (.lr-carousel) — sterowana transformem, zawsze przesuwa się
   w lewo i zapętla płynnie (klony pierwszego/ostatniego slajdu na końcach
   toru eliminują „skok" przy zawinięciu). Auto-play co 1s (nadpisywalne
   przez data-interval), kropki, strzałki, przeciąganie dotykiem. ── */
document.querySelectorAll(".lr-carousel").forEach(car => {
  const track = car.querySelector(".lr-carousel-track");
  if(!track) return;

  // data-mobile-only="900" → JS aktywuje karuzelę (klony, strzałki, kropki, transform)
  // TYLKO poniżej tej szerokości; powyżej zostawiamy natywny układ (grid/flex) z CSS
  // bez żadnej ingerencji — moduł wygląda dokładnie tak, jak zaprojektowano na desktopie.
  const mobileOnly = parseInt(car.dataset.mobileOnly || "0", 10);
  if(mobileOnly && window.innerWidth > mobileOnly){
    const d = car.querySelector(".lr-carousel-dots"); if(d) d.style.display = "none";
    return;
  }

  const real = Array.prototype.slice.call(track.children);
  const n = real.length;
  if(n < 2){ const d=car.querySelector(".lr-carousel-dots"); if(d) d.style.display="none"; return; }

  // Klony CAŁEGO zestawu na obu końcach — pozwalają pokazywać KILKA kafli naraz
  // (desktop) i zapętlać się płynnie: po ostatnim wchodzi pierwszy, po pierwszym
  // (wstecz) ostatni. Pojedynczy klon wystarczał tylko przy jednej widocznej
  // kafelce — przy 3–4 widocznych brakowało treści z boku i pojawiała się pusta
  // przestrzeń. Pełny zestaw klonów z każdej strony zawsze wypełnia widok.
  const headFrag = document.createDocumentFragment();
  const tailFrag = document.createDocumentFragment();
  real.forEach(node => {
    const h = node.cloneNode(true); h.setAttribute("aria-hidden", "true"); headFrag.appendChild(h);
    const t = node.cloneNode(true); t.setAttribute("aria-hidden", "true"); tailFrag.appendChild(t);
  });
  track.insertBefore(headFrag, real[0]);
  track.appendChild(tailFrag);

  const slides = Array.prototype.slice.call(track.children); // [n klonów, ...n real, n klonów]
  track.style.display = "flex";
  // Tor MUSI mieć overflow:visible — to on jest przesuwany transformem, a oknem
  // przycinającym jest rodzic .lr-carousel (ma overflow:hidden). Gdy tor sam miał
  // overflow:hidden, przycinał karty do własnej szerokości (= szerokość kontenera);
  // przy przewijaniu transformem okno przycinania jechało razem z torem i karty
  // znikały z widoku (pusta karuzela). CSS toru ma overflow-x:hidden jako fallback
  // bez JS — tutaj, po aktywacji karuzeli, celowo go nadpisujemy.
  track.style.overflow = "visible";
  track.style.scrollSnapType = "none";

  const dotsWrap = car.querySelector(".lr-carousel-dots");
  const interval = parseInt(car.dataset.interval) || 1000;
  let idx = n;           // start na pierwszym prawdziwym slajdzie (indeksy 0..n-1 to klony)
  let dots = [];
  let timer = null;
  let lock = false;      // blokada podczas animacji/skoku

  function gapPx(){ const g = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "0"); return isNaN(g) ? 0 : g; }
  function place(withTransition){
    track.style.transition = withTransition ? "transform .6s cubic-bezier(.45,0,.2,1)" : "none";
    let x = 0;
    for(let i=0;i<idx;i++){ x += slides[i].getBoundingClientRect().width + gapPx(); }
    track.style.transform = "translateX(-" + x + "px)";
  }
  function setActive(){ const real_i = ((idx - n) % n + n) % n; dots.forEach((d,i)=> d.classList.toggle("on", i===real_i)); }

  function go(delta){
    if(lock) return;
    lock = true;
    idx += delta;
    place(true);
    setActive();
    // Zabezpieczenie: gdyby z jakiegoś powodu transitionend toru nigdy nie doszedł
    // (np. karta zniknęła z widoku w trakcie animacji), nie blokuj karuzeli na stałe.
    clearTimeout(go._safety);
    go._safety = setTimeout(() => { lock = false; }, 750);
  }

  track.addEventListener("transitionend", (e) => {
    // Reaguj WYŁĄCZNIE na własne przejście transform toru — nie na zdarzenia
    // „wypływające" z dzieci (np. hover na .pb-card ma swój transition na border/
    // box-shadow/transform). Bez tego filtra zdarzenie z karty (krótsze, .22s)
    // potrafiło przedwcześnie zwolnić blokadę w trakcie animacji toru (.6s) i
    // wywołać skok w połowie przesunięcia — stąd „puste"/białe miganie przy pętli.
    if(e.target !== track || e.propertyName !== "transform") return;
    clearTimeout(go._safety);
    if(idx >= 2*n){ idx -= n; place(false); }         // wjechaliśmy w tylny zestaw klonów → skok o zestaw wstecz, bez animacji
    else if(idx < n){ idx += n; place(false); }        // wjechaliśmy w przedni zestaw klonów → skok o zestaw naprzód, bez animacji
    lock = false;
  });

  function next(){ go(1); }
  function prev(){ go(-1); }
  function start(){ stop(); timer = setInterval(next, interval); }
  function stop(){ if(timer){ clearInterval(timer); timer=null; } }

  if(dotsWrap){
    real.forEach((s,i)=>{
      const b = document.createElement("button");
      b.className = "lr-dot"; b.type = "button";
      b.setAttribute("aria-label", "Pokaż slajd " + (i+1));
      b.addEventListener("click", ()=>{ if(!lock){ lock = true; idx = i + n; place(true); setActive(); } start(); });
      dotsWrap.appendChild(b); dots.push(b);
    });
  }

  // strzałki boczne (prev/next)
  function mkArrow(dir, label, path){
    const a = document.createElement("button");
    a.type = "button";
    a.className = "lr-arrow lr-arrow--" + dir;
    a.setAttribute("aria-label", label);
    a.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="'+path+'"/></svg>';
    a.addEventListener("click", ()=>{ dir === "next" ? next() : prev(); start(); });
    car.appendChild(a);
    return a;
  }
  mkArrow("prev", "Poprzedni", "M15 18l-6-6 6-6");
  mkArrow("next", "Następny", "M9 6l6 6-6 6");

  // przeciąganie dotykiem — swipe w lewo = następny, w prawo = poprzedni
  let touchX = null;
  track.addEventListener("touchstart", e => { touchX = e.touches[0].clientX; stop(); }, { passive:true });
  track.addEventListener("touchend", e => {
    if(touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if(Math.abs(dx) > 40){ dx < 0 ? next() : prev(); }
    touchX = null;
    start();
  }, { passive:true });

  car.addEventListener("mouseenter", stop);
  car.addEventListener("mouseleave", start);

  window.addEventListener("resize", () => place(false), { passive:true });

  // start, gdy karuzela jest choć częściowo w widoku; stop, gdy zniknie
  let started = false;
  const io = new IntersectionObserver(es => {
    es.forEach(e => { if(e.isIntersecting){ started = true; start(); } else { stop(); } });
  }, { threshold:0.05 });
  io.observe(car);
  setTimeout(()=>{ if(!started) start(); }, 1500);

  place(false);
  setActive();
});

/* ── 18. PRZEPŁYWY (.flow[data-flow]) — kroki zapalają się po kolei w pętli ── */
document.querySelectorAll("[data-flow]").forEach(flow => {
  const steps = Array.prototype.slice.call(flow.querySelectorAll(".flow-step"));
  if(steps.length < 2) return;
  const stepMs = parseInt(flow.dataset.interval) || 1050;
  let i = -1, timer = null;

  function reset(){ steps.forEach(s => s.classList.remove("on","done")); }
  function tick(){
    if(i >= 0 && i < steps.length){ steps[i].classList.remove("on"); steps[i].classList.add("done"); }
    i++;
    if(i < steps.length){ steps[i].classList.add("on"); }
    else { i = -1; setTimeout(()=>{ reset(); }, 900); }   // pauza po ostatnim, potem restart
  }
  function start(){ if(timer) return; timer = setInterval(tick, stepMs); }
  function stop(){ if(timer){ clearInterval(timer); timer = null; } reset(); i = -1; }

  const io = new IntersectionObserver(es => {
    es.forEach(e => { if(e.isIntersecting){ start(); } else { stop(); } });
  }, { threshold:0.3 });
  io.observe(flow);
});

/* ── 19. „JAK TO DZIAŁA" — kroki zapalają się po kolei + linia postępu ── */
document.querySelectorAll(".steps-wrap[data-steps]").forEach(wrap => {
  const cards = Array.prototype.slice.call(wrap.querySelectorAll(".step-card"));
  const fill  = wrap.querySelector(".step-line-fill");
  const n = cards.length;
  if(n < 2) return;
  let i = -1, timer = null;

  function paint(){
    cards.forEach((c, idx) => { c.classList.toggle("active", idx === i); c.classList.toggle("done", i > idx); });
    const prog = i < 0 ? 0 : (i >= n ? 1 : i / (n - 1));
    if(fill) fill.style.setProperty("--steps-prog", prog);
  }
  function tick(){ i++; if(i > n){ i = -1; } paint(); }
  function start(){ if(timer) return; timer = setInterval(tick, 1300); }
  function stop(){ if(timer){ clearInterval(timer); timer = null; } }

  const io = new IntersectionObserver(es => {
    es.forEach(e => { if(e.isIntersecting){ start(); } else { stop(); } });
  }, { threshold: 0.25 });
  io.observe(wrap);
});

/* ── 20. AI MOCK (.ai-mock) — pętla demo: zadanie → kroki rozwiązania → wynik → reset ── */
document.querySelectorAll(".ai-mock").forEach(mock => {
  const steps  = Array.prototype.slice.call(mock.querySelectorAll(".ai-mock-step"));
  const result = mock.querySelector(".ai-mock-result");
  const task   = mock.querySelector(".ai-mock-task");
  if(steps.length < 1) return;

  const stepGap  = 500;   // odstęp między kolejnymi krokami
  const startGap = 300;   // pauza po „otrzymaniu zadania", zanim ruszą kroki
  const holdTime = 2800;  // jak długo trzymać gotowy wynik, zanim zacznie się od nowa
  let timer = null;

  function reset(){
    steps.forEach(s => s.classList.remove("show"));
    if(result) result.classList.remove("show");
    if(task) task.classList.remove("flash");
  }
  function play(){
    reset();
    if(task) requestAnimationFrame(() => task.classList.add("flash"));
    steps.forEach((s, i) => setTimeout(() => s.classList.add("show"), startGap + i * stepGap));
    if(result) setTimeout(() => result.classList.add("show"), startGap + steps.length * stepGap + 200);
  }
  const cycle = startGap + steps.length * stepGap + 200 + 500 + holdTime;

  function start(){ if(timer) return; play(); timer = setInterval(play, cycle); }
  function stop(){ if(timer){ clearInterval(timer); timer = null; } }

  const io = new IntersectionObserver(es => {
    es.forEach(e => { if(e.isIntersecting){ start(); } else { stop(); } });
  }, { threshold: 0.2 });
  io.observe(mock);
});

/* ── NAV DROPDOWN (Funkcje / Materiały) — klik-toggle + docięcie do ekranu ──
   Klik w przycisk → panel się pokazuje i ZOSTAJE. Klik ponownie / w pozycję /
   poza panelem / Esc → chowa. Panel otwiera się w prawo od przycisku i jest
   docinany do widoku (koniec ucinania tekstu). Na mobile (panel display:none)
   klik nawiguje normalnie do strony funkcji. */
(function(){
  const dds = document.querySelectorAll(".nav-dd");
  if(!dds.length) return;

  function closeAll(except){
    dds.forEach(dd => {
      if(dd !== except){
        dd.classList.remove("open");
        const p = dd.querySelector(".nav-dd-panel");
        if(p) p.style.left = "";
      }
    });
  }
  function clamp(panel){
    if(!panel || panel.classList.contains("nav-dd-panel--right")) return; // prawy panel kotwiczony do prawej
    panel.style.left = "";
    const m = 12, vw = document.documentElement.clientWidth;
    let r = panel.getBoundingClientRect();
    if(r.right > vw - m) panel.style.left = (panel.offsetLeft - (r.right - (vw - m))) + "px";
    r = panel.getBoundingClientRect();
    if(r.left < m) panel.style.left = (panel.offsetLeft + (m - r.left)) + "px";
  }

  dds.forEach(dd => {
    const trigger = dd.querySelector(".nav-dd-trigger");
    const panel   = dd.querySelector(".nav-dd-panel");
    if(!trigger || !panel) return;
    trigger.addEventListener("click", e => {
      if(getComputedStyle(panel).display === "none") return; // mobile → pozwól nawigować
      e.preventDefault();
      const willOpen = !dd.classList.contains("open");
      closeAll(dd);
      dd.classList.toggle("open", willOpen);
      if(willOpen) clamp(panel);
    });
    panel.querySelectorAll("a").forEach(a => a.addEventListener("click", () => dd.classList.remove("open")));
  });

  document.addEventListener("click", e => { if(!e.target.closest(".nav-dd")) closeAll(null); });
  document.addEventListener("keydown", e => { if(e.key === "Escape") closeAll(null); });
  window.addEventListener("resize", () => dds.forEach(dd => { if(dd.classList.contains("open")) clamp(dd.querySelector(".nav-dd-panel")); }));
})();
