/* THE RAW — shared interaction layer */

// Horizontal browse row controls
function browseScroll(dir, rowId) {
  const row = document.getElementById(rowId || 'indRow');
  if (!row) return;
  const card = row.firstElementChild;
  const step = card ? card.getBoundingClientRect().width + 18 : 360;
  row.scrollBy({ left: dir * step, behavior: 'smooth' });
}

// Scroll-triggered fade-up reveals (raw-reveal)
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const els = document.querySelectorAll('.sec-head, .statement-copy, .who-card, .svc-item, .ind-card, .g-cell, .g-stat, .proof-stat, .case-card, .step, .proof-head, .f1-copy, .contact-left, .contact-grid>div:last-child, .sw-card, .stat-block, .ed-row, .case-story, .case-stats, .case-gallery image-slot, .page-hero>*, .about-body>*, .ig-copy>*, .partnership-hero-copy, .partner-split-card, .partner-lane, .campaign-card, .partner-step, .cooking-copy, .cooking-ticket, .cooking-stat');
  const counts = new Map();
  els.forEach(el => {
    const p = el.parentElement, i = counts.get(p) || 0;
    counts.set(p, i + 1);
    el.classList.add('raw-reveal');
    el.dataset.rd = Math.min(i * 70, 280);
    el.style.transitionDelay = el.dataset.rd + 'ms';
  });
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      io.unobserve(en.target);
      const el = en.target;
      el.classList.add('is-visible');
      // hand the element back to its own transitions once the reveal lands
      setTimeout(() => { el.classList.remove('raw-reveal', 'is-visible'); el.style.transitionDelay = ''; }, +el.dataset.rd + 650);
    });
  }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });
  els.forEach(el => io.observe(el));
})();
