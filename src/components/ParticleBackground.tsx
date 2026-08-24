import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  depth: number;
  size: number;
  opacity: number;
  hue: number;
  twinkleSpeed: number;
  phase: number;
  speed: number;
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  hue: number;
  opacity: number;
  driftSpeed: number;
  phase: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerTarget = { x: 0, y: 0 };
    const pointerCurrent = { x: 0, y: 0 };

    let width = window.innerWidth;
    let height = window.innerHeight;
    let stars: Star[] = [];
    let nebulae: Nebula[] = [];
    let previousTime = 0;

    const createScene = () => {
      const starCount = Math.min(
        180,
        Math.max(70, Math.round((width * height) / 12000)),
      );

      stars = Array.from({ length: starCount }, () => {
        const depth = Math.random();

        return {
          x: Math.random() * width,
          y: Math.random() * height,
          depth,
          size: 0.35 + depth * 1.45,
          opacity: 0.18 + depth * 0.58,
          hue: Math.random() > 0.76 ? 187 : Math.random() > 0.58 ? 255 : 215,
          twinkleSpeed: 0.35 + Math.random() * 0.9,
          phase: Math.random() * Math.PI * 2,
          speed: 0.65 + depth * 2.1,
        };
      });

      nebulae = [
        { x: 0.18, y: 0.22, radius: 0.52, hue: 255, opacity: 0.075, driftSpeed: 0.08, phase: 0.4 },
        { x: 0.8, y: 0.34, radius: 0.46, hue: 210, opacity: 0.06, driftSpeed: 0.065, phase: 2.1 },
        { x: 0.62, y: 0.84, radius: 0.42, hue: 187, opacity: 0.045, driftSpeed: 0.09, phase: 4.2 },
      ];
    };

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      createScene();
    };

    const drawNebulae = (time: number) => {
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      nebulae.forEach((nebula, index) => {
        const horizontalDrift = Math.sin(time * nebula.driftSpeed + nebula.phase) * width * 0.045;
        const verticalDrift = Math.cos(time * nebula.driftSpeed * 0.72 + nebula.phase) * height * 0.035;
        const parallaxStrength = 10 + index * 5;
        const centerX = nebula.x * width + horizontalDrift - pointerCurrent.x * parallaxStrength;
        const centerY = nebula.y * height + verticalDrift - pointerCurrent.y * parallaxStrength;
        const radius = Math.max(width, height) * nebula.radius;
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);

        gradient.addColorStop(0, `hsla(${nebula.hue}, 92%, 62%, ${nebula.opacity})`);
        gradient.addColorStop(0.34, `hsla(${nebula.hue}, 88%, 52%, ${nebula.opacity * 0.46})`);
        gradient.addColorStop(0.72, `hsla(${nebula.hue}, 82%, 42%, ${nebula.opacity * 0.12})`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });

      ctx.restore();
    };

    const drawStars = (time: number, deltaTime: number, shouldMove: boolean) => {
      stars.forEach((star) => {
        if (shouldMove) {
          star.x += star.speed * deltaTime;
          star.y += star.speed * 0.24 * deltaTime;

          if (star.x > width + 8) star.x = -8;
          if (star.y > height + 8) star.y = -8;
        }

        const parallaxStrength = 4 + star.depth * 20;
        const x = star.x - pointerCurrent.x * parallaxStrength;
        const y = star.y - pointerCurrent.y * parallaxStrength;
        const twinkle = 0.68 + Math.sin(time * star.twinkleSpeed + star.phase) * 0.32;
        const opacity = star.opacity * twinkle;

        ctx.beginPath();
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${star.hue}, 100%, 82%, ${opacity})`;

        if (star.depth > 0.76) {
          ctx.shadowBlur = 7 + star.depth * 5;
          ctx.shadowColor = `hsla(${star.hue}, 100%, 72%, ${opacity * 0.7})`;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      });
    };

    const drawVignette = () => {
      const radius = Math.max(width, height) * 0.78;
      const vignette = ctx.createRadialGradient(
        width * 0.5,
        height * 0.42,
        radius * 0.18,
        width * 0.5,
        height * 0.42,
        radius,
      );

      vignette.addColorStop(0, 'hsla(222, 47%, 4%, 0)');
      vignette.addColorStop(0.72, 'hsla(222, 47%, 4%, 0.08)');
      vignette.addColorStop(1, 'hsla(222, 47%, 3%, 0.48)');

      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
    };

    const renderScene = (timestamp: number, shouldMove = true) => {
      const time = timestamp / 1000;
      const deltaTime = previousTime ? Math.min((timestamp - previousTime) / 1000, 0.04) : 0;
      previousTime = timestamp;

      pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * 0.025;
      pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * 0.025;

      ctx.clearRect(0, 0, width, height);
      drawNebulae(time);
      drawStars(time, deltaTime, shouldMove);
      drawVignette();
    };

    const animate = (timestamp: number) => {
      renderScene(timestamp);
      animationRef.current = requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerTarget.x = (event.clientX / width - 0.5) * 2;
      pointerTarget.y = (event.clientY / height - 0.5) * 2;
    };

    const resetPointer = () => {
      pointerTarget.x = 0;
      pointerTarget.y = 0;
    };

    const startScene = () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      previousTime = 0;

      if (motionPreference.matches) {
        renderScene(0, false);
        return;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resizeCanvas();
      if (motionPreference.matches) renderScene(0, false);
    };

    resizeCanvas();
    startScene();

    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', resetPointer);
    motionPreference.addEventListener('change', startScene);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener('mouseleave', resetPointer);
      motionPreference.removeEventListener('change', startScene);

      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.82 }}
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
