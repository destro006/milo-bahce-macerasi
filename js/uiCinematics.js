(function () {
  'use strict';

  function hasGsap() {
    return typeof window.gsap !== 'undefined';
  }

  function isReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function animateCoverIn() {
    if (!hasGsap() || isReducedMotion()) return;
    var tl = window.gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.cover-card', { scale: 0.9, autoAlpha: 0, duration: 0.55 })
      .from('.cover-art', { x: -24, autoAlpha: 0, duration: 0.45 }, '<0.12')
      .from('.cover-content > *', { y: 16, autoAlpha: 0, stagger: 0.08, duration: 0.4 }, '<0.08');
  }

  function animateCoverOut(overlayEl, onComplete) {
    if (!hasGsap() || isReducedMotion()) {
      overlayEl.hidden = true;
      if (onComplete) onComplete();
      return;
    }
    window.gsap.to(overlayEl, {
      autoAlpha: 0,
      scale: 1.03,
      duration: 0.42,
      ease: 'power2.inOut',
      onComplete: function () {
        overlayEl.hidden = true;
        window.gsap.set(overlayEl, { clearProps: 'all' });
        if (onComplete) onComplete();
      }
    });
  }

  function showChapterBanner(bannerEl, num, title) {
    if (!bannerEl) return;
    bannerEl.innerHTML = '<span>Bölüm ' + num + '</span><strong>' + title + '</strong>';
    bannerEl.hidden = false;
    if (!hasGsap() || isReducedMotion()) {
      setTimeout(function () { bannerEl.hidden = true; }, 1900);
      return;
    }
    window.gsap.killTweensOf(bannerEl);
    var tl = window.gsap.timeline({
      onComplete: function () {
        bannerEl.hidden = true;
        window.gsap.set(bannerEl, { clearProps: 'all' });
      }
    });
    tl.fromTo(bannerEl, { y: -26, autoAlpha: 0, scale: 0.9 }, { y: 0, autoAlpha: 1, scale: 1, duration: 0.45, ease: 'back.out(1.6)' })
      .to(bannerEl, { y: -14, autoAlpha: 0, duration: 0.35, ease: 'power2.in' }, '+=1.35');
  }

  function animateDialogChange() {
    if (!hasGsap() || isReducedMotion()) return;
    window.gsap.fromTo('#speakerPortrait',
      { scale: 0.82, rotate: -6 },
      { scale: 1, rotate: 0, duration: 0.42, ease: 'back.out(1.8)', overwrite: 'auto' }
    );
    window.gsap.fromTo('#dialogText',
      { y: 6, opacity: 0.35 },
      { y: 0, opacity: 1, duration: 0.32, ease: 'power2.out', overwrite: 'auto' }
    );
  }

  function animateWordChipIn() {
    if (!hasGsap() || isReducedMotion()) return;
    window.gsap.fromTo('#wordChip',
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)', overwrite: 'auto' }
    );
  }

  function animateSeedSlotLit(seedId) {
    if (!hasGsap() || isReducedMotion()) return;
    var slot = document.querySelector('.seed-slot[data-seed="' + seedId + '"]');
    if (!slot) return;
    window.gsap.fromTo(slot,
      { scale: 0.4 },
      { scale: 1.25, duration: 0.45, ease: 'elastic.out(1, 0.4)', yoyo: true, repeat: 1 }
    );
  }

  function animateModalOpen(modalEl) {
    modalEl.hidden = false;
    if (!hasGsap() || isReducedMotion()) return;
    var card = modalEl.querySelector('.modal-card');
    var items = modalEl.querySelectorAll('.flashcard, .map-stop');
    var tl = window.gsap.timeline({ defaults: { ease: 'power2.out' } });
    tl.fromTo(modalEl, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.24 });
    if (card) {
      tl.fromTo(card, { y: 20, scale: 0.94 }, { y: 0, scale: 1, duration: 0.34, ease: 'back.out(1.4)' }, '<');
    }
    if (items.length) {
      tl.fromTo(items, { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.035, duration: 0.25 }, '<0.1');
    }
  }

  function animateModalClose(modalEl) {
    if (!hasGsap() || isReducedMotion()) {
      modalEl.hidden = true;
      return;
    }
    window.gsap.to(modalEl, {
      autoAlpha: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: function () {
        modalEl.hidden = true;
        window.gsap.set(modalEl, { clearProps: 'all' });
      }
    });
  }

  window.MiloCinematics = {
    animateCoverIn: animateCoverIn,
    animateCoverOut: animateCoverOut,
    showChapterBanner: showChapterBanner,
    animateDialogChange: animateDialogChange,
    animateWordChipIn: animateWordChipIn,
    animateSeedSlotLit: animateSeedSlotLit,
    animateModalOpen: animateModalOpen,
    animateModalClose: animateModalClose
  };
})();
