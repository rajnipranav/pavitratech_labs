// Hero Specific JavaScript extracted from techpavitra-hero.html

document.addEventListener('DOMContentLoaded', () => {
  // --- Canvas ---
  const cv = document.getElementById('bg');
  if (cv) {
    const ctx = cv.getContext('2d');
    let W, H, mouseX, mouseY, animT = 0;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      W = window.innerWidth;
      H = window.innerHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.scale(dpr, dpr);
      mouseX = W / 2; mouseY = H / 2;
    }
    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

    // Stars
    const stars = Array.from({length: 160}, () => ({
      x: Math.random(), y: Math.random(),
      s: Math.random() * 1.5 + 0.5,
      o: Math.random() * 0.5 + 0.1,
      tw: Math.random() * Math.PI * 2
    }));

    function drawHex(x, y, r, rot, strokeColor, lw, fillColor) {
      ctx.save();
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = rot + i * Math.PI / 3;
        const px = x + Math.cos(a) * r;
        const py = y + Math.sin(a) * r;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      if (fillColor) { ctx.fillStyle = fillColor; ctx.fill(); }
      if (strokeColor) {
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lw;
        ctx.stroke();
      }
      ctx.restore();
    }

    function loop() {
      animT += 0.006;
      ctx.clearRect(0, 0, W, H);

      // Background gradient
      const bg = ctx.createRadialGradient(W * 0.5, H * 0.5, 0, W * 0.5, H * 0.5, W * 0.8);
      bg.addColorStop(0, '#0f0f1a'); 
      bg.addColorStop(1, '#0b0b14'); 
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Stars
      stars.forEach(s => {
        s.tw += 0.012;
        const o = s.o * (0.6 + 0.4 * Math.sin(s.tw));
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.s, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 200, 230, ${o})`; 
        ctx.fill();
      });

      // Responsive positioning
      const isMobile = W < 768;
      const mx = (mouseX / W - 0.5);
      const my = (mouseY / H - 0.5);
      
      // Desktop: Right-aligned (W * 0.7) | Mobile: Centered below text (W * 0.5, H * 0.75)
      const targetCx = isMobile ? W * 0.5 : W * 0.7;
      const targetCy = isMobile ? H * 0.75 : H * 0.5;
      
      const cx = targetCx + mx * (isMobile ? 20 : 50);
      const cy = targetCy + my * (isMobile ? 15 : 40);
      const baseR = Math.min(W, H) * (isMobile ? 0.25 : 0.35);

      // Ambient glow
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseR * 1.5);
      glow.addColorStop(0, 'rgba(99, 102, 241, 0.08)'); 
      glow.addColorStop(1, 'rgba(11, 11, 20, 0)'); 
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      // Outer rotating hex ring (subtle tech look)
      drawHex(cx, cy, baseR * 1.2, animT * 0.04, 'rgba(99, 102, 241, 0.1)', 1);
      
      // Connecting lines (geometric)
      for (let i = 0; i < 6; i++) {
        const a = animT * 0.04 + i * Math.PI / 3;
        const x1 = cx + Math.cos(a) * baseR * 1.2;
        const y1 = cy + Math.sin(a) * baseR * 1.2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x1, y1);
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.05)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Outer hex
      drawHex(cx, cy, baseR, animT * 0.1, 'rgba(0, 242, 255, 0.2)', 0.8);
      
      // Mid hex (cyan)
      drawHex(cx, cy, baseR * 0.6, -animT * 0.15, 'rgba(0, 242, 255, 0.4)', 1);

      // Inner hex (indigo)
      drawHex(cx, cy, baseR * 0.3, animT * 0.3, 'rgba(129, 140, 248, 0.5)', 1.2);

      // Core element
      const pulse = 1 + Math.sin(animT * 2) * 0.1;
      const ds = baseR * 0.08 * pulse;
      drawHex(cx, cy, ds, animT * 0.5, 'rgba(0, 242, 255, 0.8)', 1.5, 'rgba(0, 242, 255, 0.1)');

      // Orbiting nodes
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 + animT * 0.1;
        const px = cx + Math.cos(a) * baseR;
        const py = cy + Math.sin(a) * baseR;
        
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 242, 255, 0.6)';
        ctx.fill();
        
        // Glow
        const g = ctx.createRadialGradient(px, py, 0, px, py, 10);
        g.addColorStop(0, 'rgba(0, 242, 255, 0.2)');
        g.addColorStop(1, 'rgba(0, 242, 255, 0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, 10, 0, Math.PI * 2);
        ctx.fill();
      }

      // HUD elements
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(0, 242, 255, 0.3)';
      ctx.fillText(`SYS_COORD: ${Math.round(cx)}:${Math.round(cy)}`, 40, H - 40);
      ctx.fillText(`CORE_SYNC: ${Math.round(animT * 100) % 100}%`, W - 160, H - 40);

      requestAnimationFrame(loop);
    }
    loop();
  }
});
