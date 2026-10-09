/**
 * SafeSociety Master Application Controller
 * Editorial Luxury Light Theme with Interactive Simulators, Preloader & Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. MINIMALIST LUXURY PRELOADER SEQUENCE ---
  const preloader = document.getElementById('preloader');
  const preloaderPercent = document.getElementById('preloaderPercent');
  const preloaderStatus = document.getElementById('preloaderStatus');
  const preloaderBar = document.getElementById('preloaderBar');

  const statusMessages = [
    'Connecting to Society Gate Matrix...',
    'Loading Resident Whitelist Directory...',
    'Calibrating Optical ANPR OCR Feeds...',
    'Arming Offline Local Edge Mesh (SQLite)...',
    'SafeSociety Residential OS Ready.',
  ];

  let currentPercent = 0;
  let statusIndex = 0;

  const preloaderInterval = setInterval(() => {
    currentPercent += Math.floor(Math.random() * 12) + 6;
    if (currentPercent > 100) currentPercent = 100;

    if (preloaderPercent) preloaderPercent.textContent = `${currentPercent}%`;
    if (preloaderBar) preloaderBar.style.width = `${currentPercent}%`;

    const expectedStatusIdx = Math.min(
      statusMessages.length - 1,
      Math.floor((currentPercent / 100) * statusMessages.length)
    );
    if (expectedStatusIdx !== statusIndex && preloaderStatus) {
      statusIndex = expectedStatusIdx;
      preloaderStatus.textContent = statusMessages[statusIndex];
    }

    if (currentPercent >= 100) {
      clearInterval(preloaderInterval);
      setTimeout(() => {
        if (preloader) {
          preloader.classList.add('preloader-exit');
          document.body.classList.remove('loading-locked');
          if (window.soundEngine) window.soundEngine.success();
        }
      }, 250);
    }
  }, 35);

  // --- 2. AUDIO SYNTHESIZER TOGGLE ---
  const audioToggleBtn = document.getElementById('audioToggleBtn');
  const audioToggleText = document.getElementById('audioToggleText');

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      if (window.soundEngine) {
        const isMuted = window.soundEngine.toggleMute();
        if (isMuted) {
          audioToggleBtn.classList.remove('sound-active');
          if (audioToggleText) audioToggleText.textContent = 'Muted';
        } else {
          audioToggleBtn.classList.add('sound-active');
          if (audioToggleText) audioToggleText.textContent = 'Sound On';
          window.soundEngine.success();
        }
      }
    });
  }

  // Bind subtle tactile hover sound to interactive elements
  document.querySelectorAll('button, a, .interactive-item').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      if (window.soundEngine) window.soundEngine.hover();
    });
    el.addEventListener('click', () => {
      if (window.soundEngine) window.soundEngine.click();
    });
  });

  // --- 3. WARM SUNBEAM PARTICLE CONSTELLATION ---
  const heroCanvas = document.getElementById('heroParticleCanvas');
  if (heroCanvas) {
    const ctx = heroCanvas.getContext('2d');
    let width = (heroCanvas.width = heroCanvas.offsetWidth);
    let height = (heroCanvas.height = heroCanvas.offsetHeight);

    const particles = [];
    const particleCount = Math.min(35, Math.floor(width / 35));
    const mouse = { x: null, y: null, radius: 100 };

    window.addEventListener('resize', () => {
      if (!heroCanvas) return;
      width = heroCanvas.width = heroCanvas.offsetWidth;
      height = heroCanvas.height = heroCanvas.offsetHeight;
    });

    heroCanvas.addEventListener('mousemove', (e) => {
      const rect = heroCanvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    heroCanvas.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.2 + 1.2;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.color = Math.random() > 0.4 ? 'rgba(255, 90, 54, ' : 'rgba(255, 101, 132, ';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= (dx / dist) * force * 2;
            this.y -= (dy / dist) * force * 2;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + '0.45)';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 90, 54, ${0.15 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // --- 4. 3D TACTILE CARD CURSOR GLARE ---
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
      card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  // --- 5. ECOSYSTEM PILLARS TAB SYSTEM ---
  const ecosystemTabs = document.querySelectorAll('.eco-tab-btn');
  const ecosystemPanels = document.querySelectorAll('.eco-panel');

  ecosystemTabs.forEach((tab) => {
    tab.addEventListener('click', function () {
      const targetPanelId = this.getAttribute('data-target');
      ecosystemTabs.forEach((t) => t.classList.remove('active'));
      ecosystemPanels.forEach((p) => p.classList.remove('active'));

      this.classList.add('active');
      const targetPanel = document.getElementById(targetPanelId);
      if (targetPanel) targetPanel.classList.add('active');

      if (window.soundEngine) window.soundEngine.click();
    });
  });

  // --- 6. INTERACTIVE HOTSPOTS ---
  const hotspots = document.querySelectorAll('.hotspot-pin');
  hotspots.forEach((pin) => {
    pin.addEventListener('click', function (e) {
      e.stopPropagation();
      const isActive = this.classList.contains('active');
      hotspots.forEach((p) => p.classList.remove('active'));
      if (!isActive) {
        this.classList.add('active');
        if (window.soundEngine) window.soundEngine.hover();
      }
    });
  });

  document.addEventListener('click', () => {
    hotspots.forEach((p) => p.classList.remove('active'));
  });

  // --- 7. INTERACTIVE OFFLINE RESILIENCE TOGGLE (PRD Section 10) ---
  const wifiToggle = document.getElementById('offlineSimToggle');
  const wifiStatusBadge = document.getElementById('wifiStatusBadge');
  const wifiStatusDesc = document.getElementById('wifiStatusDesc');

  if (wifiToggle) {
    wifiToggle.addEventListener('change', function () {
      const isOnline = this.checked;
      if (isOnline) {
        wifiStatusBadge.textContent = '● CLOUD SYNC ONLINE';
        wifiStatusBadge.className = 'sim-badge badge-emerald';
        wifiStatusDesc.textContent = 'All gates operating on high-speed cloud synchronization.';
        if (window.soundEngine) window.soundEngine.success();
      } else {
        wifiStatusBadge.textContent = '● OFFLINE EDGE ACTIVE (NO INTERNET)';
        wifiStatusBadge.className = 'sim-badge badge-amber';
        wifiStatusDesc.textContent = 'Gatehouse internet severed. Local SQLite edge cache operating seamlessly with 0 gate delays!';
        if (window.soundEngine) window.soundEngine.alert();
      }
    });
  }

  // --- 8. FAQ ACCORDION ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        faqItems.forEach((i) => i.classList.remove('active'));
        if (!isOpen) {
          item.classList.add('active');
          if (window.soundEngine) window.soundEngine.click();
        }
      });
    }
  });

  // --- 9. PRICING BILLING CYCLE TOGGLE ---
  const billingToggle = document.getElementById('billingCycleToggle');
  const priceElements = document.querySelectorAll('.pricing-val');

  if (billingToggle) {
    billingToggle.addEventListener('change', function () {
      const isAnnual = this.checked;
      priceElements.forEach((el) => {
        const monthly = el.getAttribute('data-monthly');
        const annual = el.getAttribute('data-annual');
        el.textContent = isAnnual ? annual : monthly;
      });
      if (window.soundEngine) window.soundEngine.click();
    });
  }

  // --- 10. AUDIT BOOKING MODAL CONTROLLER ---
  const openModalBtns = document.querySelectorAll('.open-audit-modal');
  const auditModal = document.getElementById('auditModal');
  const closeModalBtn = document.getElementById('closeAuditModal');
  const auditForm = document.getElementById('auditBookingForm');
  const modalSuccessState = document.getElementById('modalSuccessState');

  function openModal() {
    if (auditModal) {
      auditModal.classList.add('active');
      document.body.classList.add('modal-open');
      if (window.soundEngine) window.soundEngine.click();
    }
  }

  function closeModal() {
    if (auditModal) {
      auditModal.classList.remove('active');
      document.body.classList.remove('modal-open');
      setTimeout(() => {
        if (auditForm) auditForm.style.display = 'block';
        if (modalSuccessState) modalSuccessState.style.display = 'none';
      }, 300);
    }
  }

  openModalBtns.forEach((btn) => btn.addEventListener('click', openModal));
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  if (auditModal) {
    auditModal.addEventListener('click', (e) => {
      if (e.target === auditModal) closeModal();
    });
  }

  if (auditForm) {
    auditForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (window.soundEngine) window.soundEngine.success();
      auditForm.style.display = 'none';
      if (modalSuccessState) modalSuccessState.style.display = 'block';
    });
  }

  // --- 11. MOBILE HAMBURGER NAVIGATION ---
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuToggle && mobileNavDrawer) {
    mobileMenuToggle.addEventListener('click', () => {
      const isOpen = mobileNavDrawer.classList.contains('active');
      if (isOpen) {
        mobileNavDrawer.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
      } else {
        mobileNavDrawer.classList.add('active');
        mobileMenuToggle.classList.add('active');
      }
      if (window.soundEngine) window.soundEngine.click();
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileNavDrawer.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
      });
    });
  }

  // Initialize Lucide icons
  if (window.lucide) window.lucide.createIcons();
});
