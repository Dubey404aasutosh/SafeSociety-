/**
 * SafeSociety Master Application Controller
 * Awwwards-Winning Preloader Reveal, Tabs, Modals & Offline Simulator
 * (Zero Audio Synthesizer Dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. AWWWARDS-WINNING PRELOADER ANIMATION ---
  const preloader = document.getElementById('preloader');
  const preloaderPercent = document.getElementById('preloaderPercent');
  const preloaderStatus = document.getElementById('preloaderStatus');
  const preloaderHairline = document.getElementById('preloaderHairline');

  const statusMilestones = [
    'PERIMETER PROTOCOL: INITIATING',
    'OPTICAL ANPR CORE: ARMED',
    'LOCAL SQLITE EDGE: ENCRYPTED',
    'MULTI-TOWER MESH: SYNCHRONIZED',
    'RESIDENTIAL GRID: READY',
  ];

  let currentPercent = 0;
  let statusIndex = 0;

  // Staggered cinematic progress counter
  const preloaderInterval = setInterval(() => {
    currentPercent += Math.floor(Math.random() * 8) + 4;
    if (currentPercent > 100) currentPercent = 100;

    const formattedPercent = currentPercent < 10 ? `0${currentPercent}` : `${currentPercent}`;
    if (preloaderPercent) preloaderPercent.textContent = formattedPercent;
    if (preloaderHairline) preloaderHairline.style.width = `${currentPercent}%`;

    const milestoneIndex = Math.min(
      statusMilestones.length - 1,
      Math.floor((currentPercent / 100) * statusMilestones.length)
    );
    if (milestoneIndex !== statusIndex && preloaderStatus) {
      statusIndex = milestoneIndex;
      preloaderStatus.textContent = statusMilestones[statusIndex];
    }

    if (currentPercent >= 100) {
      clearInterval(preloaderInterval);
      setTimeout(() => {
        if (preloader) {
          preloader.classList.add('preloader-curtain-split');
          document.body.classList.remove('loading-locked');
        }
      }, 350);
    }
  }, 32);

  // --- 2. WARM SUNBEAM PARTICLE CONSTELLATION CANVAS ---
  const heroCanvas = document.getElementById('heroParticleCanvas');
  if (heroCanvas) {
    const ctx = heroCanvas.getContext('2d');
    let width = (heroCanvas.width = heroCanvas.offsetWidth);
    let height = (heroCanvas.height = heroCanvas.offsetHeight);

    const particles = [];
    const particleCount = Math.min(32, Math.floor(width / 40));
    const mouse = { x: null, y: null, radius: 110 };

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
        this.size = Math.random() * 2 + 1;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
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
        ctx.fillStyle = this.color + '0.4)';
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

          if (dist < 90) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 90, 54, ${0.12 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.7;
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

  // --- 3. 3D TACTILE LIQUID GLASS CARD SPECULAR SHEEN ---
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4.5;
      const rotateY = ((x - centerX) / centerX) * 4.5;

      card.style.transform = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
      card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  // --- 4. ECOSYSTEM PILLARS TAB SYSTEM ---
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
    });
  });

  // --- 5. INTERACTIVE HOTSPOTS ---
  const hotspots = document.querySelectorAll('.hotspot-pin');
  hotspots.forEach((pin) => {
    pin.addEventListener('click', function (e) {
      e.stopPropagation();
      const isActive = this.classList.contains('active');
      hotspots.forEach((p) => p.classList.remove('active'));
      if (!isActive) this.classList.add('active');
    });
  });

  document.addEventListener('click', () => {
    hotspots.forEach((p) => p.classList.remove('active'));
  });

  // --- 6. OFFLINE RESILIENCE SIMULATION TOGGLE (PRD Section 10) ---
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
      } else {
        wifiStatusBadge.textContent = '● OFFLINE EDGE ACTIVE (NO INTERNET)';
        wifiStatusBadge.className = 'sim-badge badge-amber';
        wifiStatusDesc.textContent = 'Gatehouse internet severed. Local SQLite edge cache operating seamlessly with 0 gate delays!';
      }
    });
  }

  // --- 7. FAQ ACCORDION ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        faqItems.forEach((i) => i.classList.remove('active'));
        if (!isOpen) item.classList.add('active');
      });
    }
  });

  // --- 8. PRICING BILLING CYCLE TOGGLE ---
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
    });
  }

  // --- 9. AUDIT BOOKING MODAL CONTROLLER ---
  const openModalBtns = document.querySelectorAll('.open-audit-modal');
  const auditModal = document.getElementById('auditModal');
  const closeModalBtn = document.getElementById('closeAuditModal');
  const auditForm = document.getElementById('auditBookingForm');
  const modalSuccessState = document.getElementById('modalSuccessState');

  function openModal() {
    if (auditModal) {
      auditModal.classList.add('active');
      document.body.classList.add('modal-open');
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
      auditForm.style.display = 'none';
      if (modalSuccessState) modalSuccessState.style.display = 'block';
    });
  }

  // --- 10. MOBILE HAMBURGER NAVIGATION ---
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
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileNavDrawer.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
      });
    });
  }

  if (window.lucide) window.lucide.createIcons();
});
