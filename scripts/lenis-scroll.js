/**
 * SafeSociety Ultra-Fluid Scroll Controller
 * Completely frictionless, zero-resistance, instant-response scrolling
 */
document.addEventListener('DOMContentLoaded', () => {
  let lenisInstance = null;

  // Initialize Lenis with ultra-light, snappy parameters (NO resistive dragging)
  if (typeof Lenis !== 'undefined') {
    lenisInstance = new Lenis({
      duration: 0.6, // Fast, snappy response (was sluggish 1.2s)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -8 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false, // NEVER hijack mobile/touch scrolling
      touchMultiplier: 1,
      wheelMultiplier: 1.1, // Effortless, natural mouse wheeling
      infinite: false,
    });

    window.lenis = lenisInstance;

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // Scroll Progress Bar
  const progressBar = document.getElementById('scrollProgressBar');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      if (progressBar) progressBar.style.width = `${progress}%`;
    }

    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      if (window.lenis) {
        window.lenis.scrollTo(0, { duration: 0.8 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      if (window.soundEngine) window.soundEngine.click();
    });
  }

  // Smooth anchor link scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        if (window.lenis) {
          window.lenis.scrollTo(targetEl, { offset: -70, duration: 0.8 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
        if (window.soundEngine) window.soundEngine.click();
      }
    });
  });
});
