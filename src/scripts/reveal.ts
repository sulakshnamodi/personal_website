// Scroll reveal: every [data-fade] element animates in once when it enters the viewport.
// Content starts visible and is animated with `fill: backwards`, so nothing stays hidden if JS fails.
export function initReveal() {
  if (!('IntersectionObserver' in window) || !('animate' in Element.prototype)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ease = 'cubic-bezier(.2,.7,.2,1)';
  const io = new IntersectionObserver(
    (entries) => {
      let i = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        io.unobserve(entry.target);
        entry.target.animate(
          [
            { opacity: 0, transform: 'translateY(10px)', filter: 'blur(4px)' },
            { opacity: 1, transform: 'none', filter: 'blur(0)' },
          ],
          { duration: 1300, delay: i++ * 80, easing: ease, fill: 'backwards' },
        );
      }
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll('[data-fade]').forEach((el) => io.observe(el));
}
