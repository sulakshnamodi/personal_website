// Hero background — "distribution": a rippling 28px dot grid with one soft bell curve
// growing from the left, bottom or right edge (whichever the pointer is nearest).
// Under prefers-reduced-motion, time is frozen but the curve still follows the pointer.

type Edge = 'b' | 'l' | 'r';

const DOT = '26,166,183';
const GAP = 28;

export function initHeroCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  let w = 0;
  let h = 0;

  const size = () => {
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  size();
  new ResizeObserver(() => requestAnimationFrame(size)).observe(canvas);

  // Pointer, smoothed position (sx, sy) and presence (a: 0..1)
  const m = { x: -999, y: -999, sx: -999, sy: -999, on: 0, a: 0 };
  window.addEventListener(
    'pointermove',
    (e) => {
      const r = canvas.getBoundingClientRect();
      m.x = e.clientX - r.left;
      m.y = e.clientY - r.top;
      m.on = m.x > 0 && m.y > 0 && m.x < w && m.y < h ? 1 : 0;
      if (m.sx < -900) {
        m.sx = m.x;
        m.sy = m.y;
      }
    },
    { passive: true },
  );
  document.addEventListener('pointerleave', () => {
    m.on = 0;
  });

  const t0 = performance.now();
  const N = { u: 0.6, v: 0.5, wt: { b: 1, l: 0, r: 0 } as Record<Edge, number> };
  const gauss = (z: number, mu: number, sg: number) => Math.exp(-((z - mu) ** 2) / (2 * sg * sg));

  let raf = 0;
  let visible = true;

  const draw = (now: number) => {
    const t = reduce.matches ? 0 : (now - t0) / 1000;
    m.sx += (m.x - m.sx) * 0.12;
    m.sy += (m.y - m.sy) * 0.12;
    m.a += (m.on - m.a) * 0.06;
    ctx.clearRect(0, 0, w, h);

    // Bell curve state
    const on = m.a > 0.05;
    const tu = on ? Math.max(0, Math.min(1, m.sx / w)) : 0.55 + Math.sin(t * 0.22) * 0.15;
    const tv = on ? Math.max(0, Math.min(1, m.sy / h)) : 0.5 + Math.cos(t * 0.17) * 0.2;
    N.u += (tu - N.u) * 0.06;
    N.v += (tv - N.v) * 0.06;
    const dists: Record<Edge, number> = { b: 1 - tv, l: tu, r: 1 - tu };
    const pick: Edge = on
      ? (Object.keys(dists) as Edge[]).reduce((p, k) => (dists[k] < dists[p] ? k : p), 'b' as Edge)
      : 'b';
    for (const k of Object.keys(N.wt) as Edge[]) N.wt[k] += ((k === pick ? 1 : 0) - N.wt[k]) * 0.05;

    const sgx = w * (0.05 + N.v * 0.06);
    const sgy = h * (0.07 + N.u * 0.08);
    const bells = (
      [
        { kind: 'b', mu: N.u * w, sg: sgx * 0.85, amp: h * 0.18 },
        { kind: 'l', mu: N.v * h, sg: sgy * 0.85, amp: w * 0.09 },
        { kind: 'r', mu: N.v * h, sg: sgy * 0.85, amp: w * 0.1 },
      ] as { kind: Edge; mu: number; sg: number; amp: number }[]
    )
      .filter((B) => N.wt[B.kind] > 0.01)
      .map((B) => ({ ...B, hgt: (z: number) => B.amp * N.wt[B.kind] * gauss(z, B.mu, B.sg) }));

    const inside = (x: number, y: number) => {
      let best = 0;
      for (const B of bells) {
        const along = B.kind === 'b' ? x : y;
        const dist = B.kind === 'b' ? h - y : B.kind === 'l' ? x : w - x;
        const H = B.hgt(along);
        if (H > 3 && dist <= H) best = Math.max(best, 1 - (dist / H) * 0.5);
      }
      return best;
    };

    // Dot grid
    const cols = Math.ceil(w / GAP);
    const rows = Math.ceil(h / GAP);
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const x = GAP / 2 + i * GAP;
        const y0 = GAP / 2 + j * GAP;
        const y = y0 + Math.sin(x * 0.01 + t * 0.5) * 2;
        const v =
          Math.sin(x * 0.006 + t * 0.35) + Math.cos(y0 * 0.008 - t * 0.25) + Math.sin((x + y0) * 0.004 + t * 0.2);
        const k = (v + 3) / 6;
        let alpha = 0.04 + k * 0.14;
        let rad = 0.6 + k * 1.1;
        const q = inside(x, y);
        if (q) {
          alpha += 0.1 + q * 0.18;
          rad += q * 0.6;
        }
        ctx.fillStyle = `rgba(${DOT},${Math.min(0.75, alpha).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, rad, 0, 6.283);
        ctx.fill();
      }
    }

    // Curve outline
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = 'rgba(17,17,17,0.22)';
    for (const B of bells) {
      ctx.beginPath();
      const L = B.kind === 'b' ? w : h;
      for (let z = 0; z <= L; z += 3) {
        const H = B.hgt(z);
        const px = B.kind === 'b' ? z : B.kind === 'l' ? H : w - H;
        const py = B.kind === 'b' ? h - H : z;
        if (z) ctx.lineTo(px, py);
        else ctx.moveTo(px, py);
      }
      ctx.stroke();
    }

    raf = visible ? requestAnimationFrame(draw) : 0;
  };

  // Only animate while the hero is on screen.
  new IntersectionObserver((entries) => {
    visible = entries[0]?.isIntersecting ?? true;
    if (visible && !raf) raf = requestAnimationFrame(draw);
  }).observe(canvas);

  raf = requestAnimationFrame(draw);
}
