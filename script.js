// ============================================
// A LITTLE UNIVERSE — interactions
// ============================================

// --- Smooth scroll for nav ---
document.querySelectorAll('.nav-links a, #enterBtn').forEach(el => {
  el.addEventListener('click', (e) => {
    const target = el.getAttribute('href') || '#love';
    if (target.startsWith('#')) {
      e.preventDefault();
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// --- Reveal on scroll ---
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal, .reveal-up').forEach(el => io.observe(el));

// Stagger badges / glass / timeline / masonry / memories
function stagger(selector, base = 80) {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('reveal-up');
    el.style.transitionDelay = `${i * base}ms`;
    io.observe(el);
  });
}
stagger('.badge', 100);
stagger('.glass', 90);
stagger('.tl-item', 120);
stagger('.mem', 110);
stagger('.frame', 140);
stagger('.chat-bubble', 200);
stagger('.chaos-img', 200);
stagger('.masonry .m', 60);

// --- Hero parallax on blobs ---
const blobs = document.querySelectorAll('.hero-bg .blob');
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - .5);
  const y = (e.clientY / window.innerHeight - .5);
  blobs.forEach((b, i) => {
    const k = (i + 1) * 14;
    b.style.transform = `translate(${x * k}px, ${y * k}px)`;
  });
});

// --- Cake: blow the candle ---
const flame = document.getElementById('flame');
const blowBtn = document.getElementById('blowBtn');
let lit = true;
function toggleCandle() {
  lit = !lit;
  if (lit) {
    flame.classList.remove('out');
    blowBtn.textContent = 'blow the candle';
  } else {
    flame.classList.add('out');
    blowBtn.textContent = 'relight';
    confettiBurst();
  }
}
blowBtn?.addEventListener('click', toggleCandle);
flame?.addEventListener('click', toggleCandle);

function confettiBurst() {
  const colors = ['#f5d98a', '#c2522a', '#3a0d18', '#b8893a', '#f4c9a6'];
  const stage = document.querySelector('.cake-stage');
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('span');
    p.style.cssText = `
      position:absolute;left:50%;top:30%;width:8px;height:14px;
      background:${colors[i % colors.length]};border-radius:2px;
      pointer-events:none;z-index:50;
    `;
    stage.appendChild(p);
    const ang = Math.random() * Math.PI * 2;
    const dist = 120 + Math.random() * 240;
    const dx = Math.cos(ang) * dist;
    const dy = Math.sin(ang) * dist - 100;
    p.animate([
      { transform: 'translate(0,0) rotate(0)', opacity: 1 },
      { transform: `translate(${dx}px,${dy}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
    ], { duration: 1600, easing: 'cubic-bezier(.2,.7,.2,1)' }).onfinish = () => p.remove();
  }
}

// --- Music: vinyl + waveform ---
const vinyl = document.getElementById('vinyl');
const wave = document.getElementById('wave');
const playBtn = document.getElementById('playBtn');
if (wave) {
  for (let i = 0; i < 48; i++) {
    const s = document.createElement('span');
    s.style.animationDelay = `${(i * 60) % 1200}ms`;
    s.style.height = `${10 + Math.random() * 40}px`;
    wave.appendChild(s);
  }
}
let playing = false;
playBtn?.addEventListener('click', () => {
  playing = !playing;
  vinyl.classList.toggle('playing', playing);
  wave.classList.toggle('playing', playing);
  playBtn.textContent = playing ? '❚❚ pause' : '▶ play';
});

// --- Letter: typewriter on view ---
const letterText = `today the world got a little luckier — it gets another year of you in it.

you turn ordinary days into something quietly cinematic. you remember the small things, you laugh at your own jokes, you make every room you walk into feel a little more like home.

thank you for being the place i return to. thank you for being the soft part of every loud day.

here's to you. all of you. exactly as you are.`;

const letterEl = document.getElementById('letterBody');
let typed = false;
const letterIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !typed) {
      typed = true;
      let i = 0;
      const tick = () => {
        if (i <= letterText.length) {
          letterEl.textContent = letterText.slice(0, i);
          i++;
          setTimeout(tick, 22 + Math.random() * 30);
        } else {
          letterEl.classList.add('done');
        }
      };
      tick();
    }
  });
}, { threshold: 0.4 });
if (letterEl) letterIO.observe(letterEl);

// --- Finale: floating particles ---
const partsHost = document.getElementById('particles');
if (partsHost) {
  for (let i = 0; i < 32; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    const size = 4 + Math.random() * 10;
    p.style.width = p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.background = ['#b8893a','#f5d98a','#c2522a','#3a0d18'][i%4];
    p.style.animationDuration = `${10 + Math.random() * 14}s`;
    p.style.animationDelay = `${-Math.random() * 14}s`;
    p.style.opacity = .4 + Math.random() * .4;
    partsHost.appendChild(p);
  }
}

document.getElementById('replayBtn')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- Nav hide on scroll down, show on up ---
let lastY = 0;
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (nav) {
    nav.style.transition = 'transform .5s cubic-bezier(.2,.7,.2,1), opacity .5s';
    if (y > lastY && y > 200) {
      nav.style.transform = 'translateX(-50%) translateY(-120%)';
      nav.style.opacity = '0';
    } else {
      nav.style.transform = 'translateX(-50%) translateY(0)';
      nav.style.opacity = '1';
    }
  }
  lastY = y;
});