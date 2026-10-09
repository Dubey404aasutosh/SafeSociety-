/**
 * SafeSociety Pure Native Scroll, Parallax & Liquid Glass Mouse Engine
 * 100% Native browser scroll physics (ZERO resistance)
 * Liquid Glass cursor lens with organic fluid inertia, refraction highlights & velocity stretching
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. 100% NATIVE SMOOTH ANCHOR NAVIGATION ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- 2. SCROLL PROGRESS BAR & BACK TO TOP ---
  const progressBar = document.getElementById('scrollProgressBar');
  const backToTopBtn = document.getElementById('backToTopBtn');

  // --- 3. HIGH-PERFORMANCE MULTI-LAYER PARALLAX ENGINE ---
  const parallaxElements = document.querySelectorAll('[data-parallax-speed]');
  let latestScrollY = window.scrollY;
  let ticking = false;

  function updateParallax() {
    const scrollY = latestScrollY;
    const windowHeight = window.innerHeight;

    // Progress bar update
    const totalHeight = document.documentElement.scrollHeight - windowHeight;
    if (totalHeight > 0 && progressBar) {
      const progress = (scrollY / totalHeight) * 100;
      progressBar.style.width = `${progress}%`;
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Parallax element positioning
    parallaxElements.forEach((el) => {
      const speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0.2;
      const rect = el.parentElement ? el.parentElement.getBoundingClientRect() : el.getBoundingClientRect();
      const offsetTop = rect.top;

      if (offsetTop < windowHeight + 250 && offsetTop > -rect.height - 250) {
        const yOffset = (offsetTop - windowHeight / 2) * speed;
        el.style.transform = `translate3d(0, ${yOffset.toFixed(1)}px, 0)`;
      }
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    latestScrollY = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  updateParallax();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- 4. LIQUID GLASS MOUSE INTERACTION ENGINE ---
  // Create the floating liquid glass lens if not present
  let glassLens = document.querySelector('.liquid-glass-lens');
  if (!glassLens) {
    glassLens = document.createElement('div');
    glassLens.className = 'liquid-glass-lens';
    glassLens.innerHTML = '<div class="glass-lens-inner"><div class="glass-lens-refraction"></div><div class="glass-lens-specular"></div></div>';
    document.body.appendChild(glassLens);
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let lensX = mouseX;
  let lensY = mouseY;
  let prevX = mouseX;
  let prevY = mouseY;
  let isHoveringInteractive = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Liquid glass hover triggers
  document.querySelectorAll('a, button, .tilt-card, .editorial-card, .btn, .hotspot-pin, .range-slider').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      isHoveringInteractive = true;
      glassLens.classList.add('lens-expanded');
    });
    el.addEventListener('mouseleave', () => {
      isHoveringInteractive = false;
      glassLens.classList.remove('lens-expanded');
    });
  });

  // RAF loop for organic liquid inertia & velocity stretching
  function renderLiquidLens() {
    // Smooth lerp (0.16 factor for silky liquid lag)
    lensX += (mouseX - lensX) * 0.16;
    lensY += (mouseY - lensY) * 0.16;

    // Calculate mouse velocity for fluid squish & stretch
    const deltaX = mouseX - prevX;
    const deltaY = mouseY - prevY;
    const velocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angle = Math.atan2(deltaY, deltaX);

    prevX = mouseX;
    prevY = mouseY;

    const stretch = Math.min(velocity * 0.015, 0.45);
    const scaleX = 1 + stretch;
    const scaleY = 1 - stretch * 0.5;

    // Apply transform with smooth orientation towards movement
    if (velocity > 0.8) {
      glassLens.style.transform = `translate3d(${lensX}px, ${lensY}px, 0) rotate(${angle}rad) scale(${scaleX}, ${scaleY})`;
    } else {
      glassLens.style.transform = `translate3d(${lensX}px, ${lensY}px, 0) scale(1, 1)`;
    }

    requestAnimationFrame(renderLiquidLens);
  }
  requestAnimationFrame(renderLiquidLens);
});
