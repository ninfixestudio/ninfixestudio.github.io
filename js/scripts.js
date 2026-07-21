// ---------- Footer year ----------
  document.getElementById('year').textContent = new Date().getFullYear();

  // ---------- Mobile nav ----------
  const burger = document.getElementById('burgerBtn');
  const navLinks = document.getElementById('navLinks');
  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', isOpen);
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }));

  // ---------- Boot terminal typing sequence ----------
  const bootLines = [
    "> initializing studio profile...",
    "> loading founder.json ... OK",
    "> mounting /projects ... 4 found",
    "> studio: NINFIXE_STUDIO",
    "> status: accepting collaborations ✔"
  ];
  const bootBody = document.getElementById('bootBody');
  bootBody.innerHTML = '';
  let li = 0;
  function typeLine(){
    if(li >= bootLines.length){
      const cur = document.createElement('span');
      cur.className = 'type-cursor';
      bootBody.appendChild(cur);
      return;
    }
    const div = document.createElement('div');
    div.className = 'line';
    bootBody.appendChild(div);
    const text = bootLines[li];
    let ci = 0;
    const speed = prefersReducedMotion() ? 0 : 16;
    function tick(){
      if(ci <= text.length){
        div.textContent = text.slice(0, ci);
        ci++;
        if(speed) setTimeout(tick, speed); else tick();
      } else {
        li++;
        setTimeout(typeLine, speed ? 220 : 0);
      }
    }
    tick();
  }
  function prefersReducedMotion(){
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  typeLine();

  // ---------- Matrix rain background ----------
  const canvas = document.getElementById('matrixCanvas');
  const ctx = canvas.getContext('2d');
  let cols, drops;
  const glyphs = '01アイウエオカキクケコ<>[]{}#$%&';
  function resizeCanvas(){
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const fontSize = 14;
    cols = Math.floor(canvas.width / fontSize);
    drops = new Array(cols).fill(0);
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  let matrixRunning = !prefersReducedMotion();
  function drawMatrix(){
    if(!matrixRunning) return;
    ctx.fillStyle = 'rgba(10,13,18,0.08)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = '#ffb400';
    ctx.font = '14px monospace';
    for(let i=0;i<cols;i++){
      const text = glyphs[Math.floor(Math.random()*glyphs.length)];
      ctx.fillText(text, i*14, drops[i]*14);
      if(drops[i]*14 > canvas.height && Math.random() > 0.975){
        drops[i] = 0;
      }
      drops[i]++;
    }
    requestAnimationFrame(drawMatrix);
  }
  if(matrixRunning) requestAnimationFrame(drawMatrix);

  // ---------- Tabs ----------
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tab-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      tab.setAttribute('aria-selected','true');
      const target = document.querySelector('.tab-panel[data-panel="'+tab.dataset.status+'"]');
      target.classList.add('active');
      animateProgress(target);
    });
  });

  function animateProgress(scope){
    scope.querySelectorAll('.card-progress-fill').forEach(el => {
      const val = el.dataset.progress;
      requestAnimationFrame(() => { el.style.width = val + '%'; });
    });
  }
  animateProgress(document.querySelector('.tab-panel.active'));

  // ---------- Scroll reveal ----------
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // ---------- Skill bars animate on view ----------
  const skillSection = document.getElementById('skills');
  const skillIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        document.querySelectorAll('.skill-bar-fill').forEach(el => {
          el.style.width = el.dataset.value + '%';
        });
        skillIO.disconnect();
      }
    });
  }, { threshold: 0.3 });
  skillIO.observe(skillSection);

  // ---------- Contact form (client-side demo) ----------
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cf-name').value.trim();
    formMsg.textContent = '> sending...';
    setTimeout(() => {
      formMsg.textContent = '> transmission received. thanks, ' + (name || 'friend') + " — I'll reply soon ✔";
      form.reset();
    }, 900);
  });

  // ---------- Back to top ----------
  const toTop = document.getElementById('toTop');
  window.addEventListener('scroll', () => {
    toTop.classList.toggle('show', window.scrollY > 600);
  });
  toTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
