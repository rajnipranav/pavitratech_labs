'use client';

import { useEffect, useRef } from 'react';

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let mouse = { x: 0, y: 0 };
    let t = 0;

    // ── Stars ──────────────────────────────────────────────────────────────
    const STAR_COUNT = 180;
    interface Star { x: number; y: number; r: number; o: number; speed: number }
    let stars: Star[] = [];

    function initStars(w: number, h: number) {
      stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.2,
        o: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 0.15 + 0.05,
      }));
    }

    // ── Hexagon helper ─────────────────────────────────────────────────────
    function hexPath(
      cx: number, cy: number, radius: number, rotation: number
    ) {
      ctx!.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i + rotation;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        i === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y);
      }
      ctx!.closePath();
    }

    // ── Orbiting nodes ─────────────────────────────────────────────────────
    interface Node { orbit: number; speed: number; angle: number; r: number; color: string }
    const NODE_COLORS = ['#6366F1', '#818CF8', '#00f2ff', '#F5B544', '#34D399'];
    let nodes: Node[] = [
      { orbit: 0.22, speed: 0.008, angle: 0,          r: 4, color: '#6366F1' },
      { orbit: 0.30, speed: -0.006, angle: Math.PI / 3, r: 3, color: '#00f2ff' },
      { orbit: 0.38, speed: 0.004, angle: Math.PI,     r: 5, color: '#F5B544' },
      { orbit: 0.45, speed: -0.003, angle: Math.PI * 1.5, r: 3, color: '#34D399' },
    ];

    function resize() {
      canvas!.width  = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
      initStars(canvas!.width, canvas!.height);
    }

    function onMouse(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }

    function draw() {
      const w = canvas!.width;
      const h = canvas!.height;
      t += 0.012;

      ctx!.clearRect(0, 0, w, h);

      // Background gradient
      const bg = ctx!.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.75);
      bg.addColorStop(0, '#161629');
      bg.addColorStop(1, '#0B0B14');
      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, w, h);

      // Stars
      const px = (mouse.x / w - 0.5) * 18;
      const py = (mouse.y / h - 0.5) * 18;
      for (const s of stars) {
        ctx!.beginPath();
        ctx!.arc(s.x + px * s.r * 0.3, s.y + py * s.r * 0.3, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${s.o + 0.1 * Math.sin(t * s.speed * 60)})`;
        ctx!.fill();
      }

      const cx = w / 2 + px * 0.3;
      const cy = h / 2 + py * 0.3;
      const minDim = Math.min(w, h);

      // Ambient glow behind hexagons
      const glow = ctx!.createRadialGradient(cx, cy, 0, cx, cy, minDim * 0.42);
      glow.addColorStop(0, 'rgba(99,102,241,0.13)');
      glow.addColorStop(0.5, 'rgba(0,242,255,0.05)');
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx!.fillStyle = glow;
      ctx!.beginPath();
      ctx!.arc(cx, cy, minDim * 0.42, 0, Math.PI * 2);
      ctx!.fill();

      // Hexagons (3 rings, rotating)
      const hexSizes = [
        { r: minDim * 0.38, rot: t * 0.18,  alpha: 0.18, lineW: 1.2 },
        { r: minDim * 0.27, rot: -t * 0.26, alpha: 0.28, lineW: 1.0 },
        { r: minDim * 0.16, rot: t * 0.40,  alpha: 0.40, lineW: 1.5 },
      ];
      for (const { r, rot, alpha, lineW } of hexSizes) {
        hexPath(cx, cy, r, rot);
        ctx!.strokeStyle = `rgba(99,102,241,${alpha})`;
        ctx!.lineWidth = lineW;
        ctx!.stroke();
      }

      // Inner hex fill
      hexPath(cx, cy, minDim * 0.14, t * 0.40);
      ctx!.fillStyle = 'rgba(99,102,241,0.04)';
      ctx!.fill();

      // Orbiting nodes
      for (const node of nodes) {
        node.angle += node.speed;
        const nx = cx + node.orbit * minDim * Math.cos(node.angle);
        const ny = cy + node.orbit * minDim * Math.sin(node.angle);

        // Connector line
        ctx!.beginPath();
        ctx!.moveTo(cx, cy);
        ctx!.lineTo(nx, ny);
        ctx!.strokeStyle = `${node.color}44`;
        ctx!.lineWidth = 0.8;
        ctx!.stroke();

        // Node glow
        const ng = ctx!.createRadialGradient(nx, ny, 0, nx, ny, node.r * 3);
        ng.addColorStop(0, node.color + 'cc');
        ng.addColorStop(1, 'transparent');
        ctx!.fillStyle = ng;
        ctx!.beginPath();
        ctx!.arc(nx, ny, node.r * 3, 0, Math.PI * 2);
        ctx!.fill();

        // Node dot
        ctx!.beginPath();
        ctx!.arc(nx, ny, node.r, 0, Math.PI * 2);
        ctx!.fillStyle = node.color;
        ctx!.fill();
      }

      // Center dot
      const cdg = ctx!.createRadialGradient(cx, cy, 0, cx, cy, 18);
      cdg.addColorStop(0, 'rgba(99,102,241,0.9)');
      cdg.addColorStop(1, 'rgba(99,102,241,0)');
      ctx!.fillStyle = cdg;
      ctx!.beginPath();
      ctx!.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.beginPath();
      ctx!.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx!.fillStyle = '#818CF8';
      ctx!.fill();

      // HUD text decorations
      ctx!.font = `11px 'JetBrains Mono', monospace`;
      ctx!.fillStyle = 'rgba(99,102,241,0.35)';
      const labels = [
        { text: 'SYS_ACTIVE', x: cx - 120, y: cy - minDim * 0.42 + 22 },
        { text: `CYCLE_${Math.floor(t * 4) % 1000}`, x: cx + 40, y: cy - minDim * 0.42 + 22 },
        { text: 'LABS.TECHADYANT', x: cx - 70, y: cy + minDim * 0.42 - 10 },
      ];
      for (const l of labels) {
        ctx!.fillText(l.text, l.x, l.y);
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', onMouse);
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="hero-canvas"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
}
