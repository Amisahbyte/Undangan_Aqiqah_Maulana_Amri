/* =========================================================
   UNDANGAN AQIQAH — SCRIPT
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------
     1. LOADING SCREEN
  --------------------------------------------------------- */
  const loadingScreen = document.getElementById('loading-screen');

  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
    }, 2200);
  });
  // Fallback in case 'load' already fired
  setTimeout(() => {
    if (!loadingScreen.classList.contains('fade-out')) {
      loadingScreen.classList.add('fade-out');
    }
  }, 3500);


  /* ---------------------------------------------------------
     2. BUKA UNDANGAN
  --------------------------------------------------------- */
  const mainContent = document.getElementById('main-content');
  const openBtn = document.getElementById('open-invitation');
  const bgMusic = document.getElementById('bg-music');
  const musicToggle = document.getElementById('music-toggle');

  openBtn.addEventListener('click', () => {
    mainContent.classList.remove('hidden-until-open');
    musicToggle.disabled = false;

    // Attempt to play music after user gesture
    bgMusic.play().then(() => {
      musicToggle.classList.add('playing');
      musicToggle.querySelector('.music-icon').textContent = '🎶';
    }).catch(() => {
      // Autoplay blocked or file missing; user can press the button manually
    });

    // Scroll smoothly to the ayat section to reveal the invitation
    document.getElementById('ayat').scrollIntoView({ behavior: 'smooth' });

    // Celebrate opening with a burst of confetti + hearts
    burstConfetti(40);
    burstHearts(14);

    // Re-run fade-in check immediately for visible sections
    initScrollObserver();
  });


  /* ---------------------------------------------------------
     3. MUSIC TOGGLE
  --------------------------------------------------------- */
  musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play().catch(() => {});
      musicToggle.classList.add('playing');
      musicToggle.querySelector('.music-icon').textContent = '🎶';
    } else {
      bgMusic.pause();
      musicToggle.classList.remove('playing');
      musicToggle.querySelector('.music-icon').textContent = '🎵';
    }
  });


  /* ---------------------------------------------------------
     4. FADE IN ON SCROLL
  --------------------------------------------------------- */
  function initScrollObserver() {
    const targets = document.querySelectorAll('.fade-in-on-scroll:not(.visible)');
    if (!('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    targets.forEach(el => observer.observe(el));
  }
  initScrollObserver();


  /* ---------------------------------------------------------
     5. LIGHT PARALLAX ON HERO SHAPES
  --------------------------------------------------------- */
  const heroShapes = document.querySelector('.hero-bg-shapes');
  window.addEventListener('scroll', () => {
    if (!heroShapes) return;
    const offset = window.scrollY * 0.25;
    heroShapes.style.transform = `translateY(${offset}px)`;
  }, { passive: true });


  /* ---------------------------------------------------------
     6. GALLERY AUTO SLIDER (fade)
  --------------------------------------------------------- */
  const slides = document.querySelectorAll('.gallery-slide');
  const dotsContainer = document.getElementById('gallery-dots');
  let currentSlide = 0;

  if (slides.length) {
    slides.forEach((_, i) => {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => showSlide(i));
      dotsContainer.appendChild(dot);
    });

    function showSlide(index) {
      slides[currentSlide].classList.remove('active');
      dotsContainer.children[currentSlide].classList.remove('active');
      currentSlide = index;
      slides[currentSlide].classList.add('active');
      dotsContainer.children[currentSlide].classList.add('active');
    }

    setInterval(() => {
      const next = (currentSlide + 1) % slides.length;
      showSlide(next);
    }, 3500);
  }


  /* ---------------------------------------------------------
     7. COUNTDOWN TIMER
  --------------------------------------------------------- */
  // Ubah tanggal acara di sini (format: 'YYYY-MM-DDTHH:mm:ss')
  const eventDate = new Date('2027-10-10T10:00:00').getTime();

  const cdDays = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMinutes = document.getElementById('cd-minutes');
  const cdSeconds = document.getElementById('cd-seconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance <= 0) {
      cdDays.textContent = '00';
      cdHours.textContent = '00';
      cdMinutes.textContent = '00';
      cdSeconds.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    cdDays.textContent = String(days).padStart(2, '0');
    cdHours.textContent = String(hours).padStart(2, '0');
    cdMinutes.textContent = String(minutes).padStart(2, '0');
    cdSeconds.textContent = String(seconds).padStart(2, '0');
  }

  if (cdDays) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }


  /* ---------------------------------------------------------
     8. UCAPAN & DOA — localStorage
  --------------------------------------------------------- */
  const wishesForm = document.getElementById('wishes-form');
  const wishesList = document.getElementById('wishes-list');
  const STORAGE_KEY = 'aqiqah_wishes_nadia';

  function loadWishes() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  function saveWishes(wishes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
  }

  function renderWishes() {
    const wishes = loadWishes();
    wishesList.innerHTML = '';

    if (!wishes.length) {
      wishesList.innerHTML = '<p class="wishes-empty">Jadilah yang pertama mengirimkan doa 🤍</p>';
      return;
    }

    wishes.slice().reverse().forEach(w => {
      const item = document.createElement('div');
      item.className = 'wish-item';
      item.innerHTML = `
        <p class="wish-name">${escapeHTML(w.name)}</p>
        <p class="wish-message">${escapeHTML(w.message)}</p>
      `;
      wishesList.appendChild(item);
    });
  }

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  if (wishesForm) {
    wishesForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('wish-name');
      const messageInput = document.getElementById('wish-message');

      const name = nameInput.value.trim();
      const message = messageInput.value.trim();
      if (!name || !message) return;

      const wishes = loadWishes();
      wishes.push({ name, message, date: new Date().toISOString() });
      saveWishes(wishes);

      nameInput.value = '';
      messageInput.value = '';
      renderWishes();
      burstConfetti(18);
    });

    renderWishes();
  }


  /* ---------------------------------------------------------
     9. GIFT — COPY ACCOUNT NUMBER
  --------------------------------------------------------- */
  const copyBtn = document.getElementById('copy-account');
  const accountNumber = document.getElementById('account-number');
  const copyFeedback = document.getElementById('copy-feedback');

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const number = accountNumber.textContent.replace(/\s/g, '');
      try {
        await navigator.clipboard.writeText(number);
        copyFeedback.textContent = 'Nomor rekening berhasil disalin ✓';
      } catch (err) {
        // Fallback for older browsers
        const temp = document.createElement('textarea');
        temp.value = number;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        copyFeedback.textContent = 'Nomor rekening berhasil disalin ✓';
      }
      setTimeout(() => { copyFeedback.textContent = ''; }, 2500);
    });
  }


  /* ---------------------------------------------------------
     10. AMBIENT ANIMATIONS — Confetti & Floating Hearts
  --------------------------------------------------------- */
  const confettiContainer = document.getElementById('confetti-container');
  const heartsContainer = document.getElementById('hearts-container');
  const confettiColors = ['#FFD6C9', '#FFC0CB', '#F5D563', '#FFFFFF', '#F0B7C4'];

  function burstConfetti(count = 24) {
    for (let i = 0; i < count; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + 'vw';
      piece.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      const duration = 3 + Math.random() * 2.5;
      piece.style.animationDuration = duration + 's';
      piece.style.transform = `rotate(${Math.random() * 360}deg)`;
      confettiContainer.appendChild(piece);
      setTimeout(() => piece.remove(), duration * 1000 + 200);
    }
  }

  function burstHearts(count = 8) {
    const heartEmojis = ['🤍', '💕', '✨'];
    for (let i = 0; i < count; i++) {
      const heart = document.createElement('div');
      heart.className = 'heart-piece';
      heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
      const duration = 6 + Math.random() * 4;
      heart.style.animationDuration = duration + 's';
      heartsContainer.appendChild(heart);
      setTimeout(() => heart.remove(), duration * 1000 + 200);
    }
  }

  // Gentle ambient loop: occasional soft confetti + hearts after invitation opens
  setInterval(() => {
    if (!mainContent.classList.contains('hidden-until-open')) {
      burstHearts(3);
    }
  }, 6000);

  setInterval(() => {
    if (!mainContent.classList.contains('hidden-until-open')) {
      burstConfetti(6);
    }
  }, 9000);

});
