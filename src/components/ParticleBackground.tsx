import { useEffect, useRef } from 'react';
import deepSpaceBackground from '@/assets/aegis-link-deep-space-bg.webp';

interface Star {
  x: number;
  y: number;
  depth: number;
  size: number;
  opacity: number;
  hue: number;
  saturation: number;
  lightness: number;
  twinkleSpeed: number;
  phase: number;
  speed: number;
  isSignal: boolean;
  signalCycle: number;
  signalActiveDuration: number;
  signalOffset: number;
  lastSignalCycle: number;
}

interface Nebula {
  x: number;
  y: number;
  radius: number;
  hue: number;
  opacity: number;
  driftSpeed: number;
  phase: number;
  stretch: number;
  rotation: number;
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
    const universeImage = new Image();

    let width = window.innerWidth;
    let height = window.innerHeight;
    let stars: Star[] = [];
    let nebulae: Nebula[] = [];
    let noisePattern: CanvasPattern | null = null;
    let universeReady = false;
    let previousTime = 0;

    const wrapUnit = (value: number) => ((value % 1) + 1) % 1;

    const gaussianRandom = () => {
      const first = Math.max(Math.random(), Number.EPSILON);
      const second = Math.random();
      return Math.sqrt(-2 * Math.log(first)) * Math.cos(2 * Math.PI * second);
    };

    const createNoisePattern = () => {
      const noiseCanvas = document.createElement('canvas');
      const noiseSize = 144;
      noiseCanvas.width = noiseSize;
      noiseCanvas.height = noiseSize;

      const noiseContext = noiseCanvas.getContext('2d');
      if (!noiseContext) return;

      const noise = noiseContext.createImageData(noiseSize, noiseSize);

      for (let pixel = 0; pixel < noise.data.length; pixel += 4) {
        const value = 175 + Math.random() * 80;
        noise.data[pixel] = value;
        noise.data[pixel + 1] = value;
        noise.data[pixel + 2] = value;
        noise.data[pixel + 3] = Math.random() * 22;
      }

      noiseContext.putImageData(noise, 0, 0);
      noisePattern = ctx.createPattern(noiseCanvas, 'repeat');
    };

    const createScene = () => {
      const starCount = Math.min(
        210,
        Math.max(100, Math.round((width * height) / 9500)),
      );

      const clusterCenters = [
        { x: 0.14, y: 0.68, spreadX: 0.12, spreadY: 0.2 },
        { x: 0.72, y: 0.26, spreadX: 0.18, spreadY: 0.13 },
        { x: 0.84, y: 0.82, spreadX: 0.13, spreadY: 0.18 },
      ];

      stars = Array.from({ length: starCount }, () => {
        const depth = Math.pow(Math.random(), 1.75);
        const isSignal = Math.random() < (width < 640 ? 0.05 : 0.075);
        const signalCycle = 18 + Math.random() * 10;
        const signalOffset = Math.random() * signalCycle;
        const colorRoll = Math.random();
        const cluster = clusterCenters[Math.floor(Math.random() * clusterCenters.length)];
        const useCluster = Math.random() < 0.24;
        const normalizedX = useCluster
          ? wrapUnit(cluster.x + gaussianRandom() * cluster.spreadX)
          : Math.random();
        const normalizedY = useCluster
          ? wrapUnit(cluster.y + gaussianRandom() * cluster.spreadY)
          : Math.random();

        let hue = 218 + Math.random() * 12;
        let saturation = 26 + Math.random() * 24;
        let lightness = 88 + Math.random() * 8;

        if (colorRoll < 0.11) {
          hue = 38 + Math.random() * 8;
          saturation = 48 + Math.random() * 18;
          lightness = 84 + Math.random() * 8;
        } else if (colorRoll < 0.31) {
          hue = 190 + Math.random() * 14;
          saturation = 58 + Math.random() * 24;
          lightness = 88 + Math.random() * 8;
        } else if (colorRoll < 0.39) {
          hue = 252 + Math.random() * 16;
          saturation = 46 + Math.random() * 18;
          lightness = 88 + Math.random() * 8;
        }

        return {
          x: normalizedX * width,
          y: normalizedY * height,
          depth,
          size: 0.24 + depth * 1.55,
          opacity: 0.16 + depth * 0.72,
          hue,
          saturation,
          lightness,
          twinkleSpeed: 0.42 + Math.random() * 1.05,
          phase: Math.random() * Math.PI * 2,
          speed: 2.8 + depth * 10.8,
          isSignal,
          signalCycle,
          signalActiveDuration: 6 + Math.random() * 4,
          signalOffset,
          lastSignalCycle: Math.floor(signalOffset / signalCycle),
        };
      });

      nebulae = [
        { x: 0.17, y: 0.24, radius: 0.48, hue: 258, opacity: 0.105, driftSpeed: 0.12, phase: 0.4, stretch: 1.55, rotation: -0.3 },
        { x: 0.81, y: 0.31, radius: 0.44, hue: 215, opacity: 0.082, driftSpeed: 0.1, phase: 2.1, stretch: 1.75, rotation: 0.24 },
        { x: 0.62, y: 0.86, radius: 0.4, hue: 188, opacity: 0.068, driftSpeed: 0.14, phase: 4.2, stretch: 1.45, rotation: -0.18 },
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

      createNoisePattern();
      createScene();
    };

    const drawUniverse = (time: number) => {
      if (!universeReady) return;

      const coverScale = Math.max(
        width / universeImage.naturalWidth,
        height / universeImage.naturalHeight,
      ) * 1.08;
      const imageWidth = universeImage.naturalWidth * coverScale;
      const imageHeight = universeImage.naturalHeight * coverScale;
      const driftX = Math.sin(time * 0.035) * width * 0.006 - pointerCurrent.x * 7;
      const driftY = Math.cos(time * 0.029) * height * 0.005 - pointerCurrent.y * 5;
      const imageX = (width - imageWidth) / 2 + driftX;
      const imageY = (height - imageHeight) / 2 + driftY;

      ctx.save();
      ctx.globalAlpha = 0.94;
      ctx.drawImage(universeImage, imageX, imageY, imageWidth, imageHeight);
      ctx.restore();

      const contentVeil = ctx.createRadialGradient(
        width * 0.54,
        height * 0.42,
        0,
        width * 0.54,
        height * 0.42,
        Math.max(width, height) * 0.62,
      );
      contentVeil.addColorStop(0, 'hsla(222, 55%, 4%, 0.2)');
      contentVeil.addColorStop(0.48, 'hsla(222, 55%, 4%, 0.1)');
      contentVeil.addColorStop(1, 'hsla(222, 55%, 4%, 0)');

      ctx.fillStyle = contentVeil;
      ctx.fillRect(0, 0, width, height);
    };

    const drawNebulae = (time: number) => {
      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      nebulae.forEach((nebula, index) => {
        const horizontalDrift = Math.sin(time * nebula.driftSpeed + nebula.phase) * width * 0.07;
        const verticalDrift = Math.cos(time * nebula.driftSpeed * 0.72 + nebula.phase) * height * 0.05;
        const parallaxStrength = 7 + index * 3;
        const pulse = 0.88 + Math.sin(time * 0.28 + nebula.phase) * 0.12;
        const centerX = nebula.x * width + horizontalDrift - pointerCurrent.x * parallaxStrength;
        const centerY = nebula.y * height + verticalDrift - pointerCurrent.y * parallaxStrength;
        const radius = Math.max(width, height) * nebula.radius;

        for (let lobe = 0; lobe < 5; lobe += 1) {
          const lobeAngle = nebula.phase + lobe * 2.17;
          const lobeOffset = radius * (0.08 + lobe * 0.018);
          const lobeRadius = radius * (0.5 + Math.sin(lobeAngle) * 0.055);
          const lobeX = centerX + Math.cos(lobeAngle) * lobeOffset;
          const lobeY = centerY + Math.sin(lobeAngle) * lobeOffset * 0.62;
          const lobeOpacity = nebula.opacity * pulse * (0.4 + (lobe % 2) * 0.08);

          ctx.save();
          ctx.translate(lobeX, lobeY);
          ctx.rotate(nebula.rotation + Math.sin(time * 0.035 + lobeAngle) * 0.045);
          ctx.scale(nebula.stretch * (0.92 + lobe * 0.025), 1);

          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, lobeRadius);
          gradient.addColorStop(0, `hsla(${nebula.hue + lobe * 2}, 88%, 60%, ${lobeOpacity})`);
          gradient.addColorStop(0.3, `hsla(${nebula.hue}, 82%, 50%, ${lobeOpacity * 0.52})`);
          gradient.addColorStop(0.68, `hsla(${nebula.hue - 8}, 74%, 38%, ${lobeOpacity * 0.14})`);
          gradient.addColorStop(1, 'transparent');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(0, 0, lobeRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      ctx.restore();

      ctx.save();
      ctx.globalCompositeOperation = 'source-over';

      nebulae.slice(0, 2).forEach((nebula) => {
        const horizontalDrift = Math.sin(time * nebula.driftSpeed + nebula.phase) * width * 0.07;
        const verticalDrift = Math.cos(time * nebula.driftSpeed * 0.72 + nebula.phase) * height * 0.05;
        const centerX = nebula.x * width + horizontalDrift - pointerCurrent.x * 6;
        const centerY = nebula.y * height + verticalDrift - pointerCurrent.y * 6;
        const radius = Math.max(width, height) * nebula.radius;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(nebula.rotation + 0.2);
        ctx.scale(nebula.stretch, 1);

        const dustLane = ctx.createLinearGradient(0, -radius * 0.18, 0, radius * 0.18);
        dustLane.addColorStop(0, 'hsla(222, 55%, 3%, 0)');
        dustLane.addColorStop(0.5, 'hsla(222, 55%, 3%, 0.16)');
        dustLane.addColorStop(1, 'hsla(222, 55%, 3%, 0)');

        ctx.fillStyle = dustLane;
        ctx.fillRect(-radius, -radius * 0.18, radius * 2, radius * 0.36);
        ctx.restore();
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

        if (star.isSignal) {
          const signalCycleIndex = Math.floor((time + star.signalOffset) / star.signalCycle);

          if (signalCycleIndex !== star.lastSignalCycle) {
            star.x = Math.random() * width;
            star.y = Math.random() * height;
            star.phase = Math.random() * Math.PI * 2;
            star.lastSignalCycle = signalCycleIndex;
          }
        }

        const x = star.x;
        const y = star.y;
        const twinkle = 0.68 + Math.sin(time * star.twinkleSpeed + star.phase) * 0.32;
        const signalTime = (time + star.signalOffset) % star.signalCycle;
        const signalProgress = signalTime / star.signalActiveDuration;
        const signalStrength = star.isSignal && signalProgress <= 1
          ? Math.pow(Math.sin(Math.PI * signalProgress), 1.05)
          : 0;

        if (star.isSignal && signalStrength <= 0.002) return;

        if (star.isSignal) {
          const starOpacity = Math.min(1, signalStrength * (0.92 + star.depth * 0.2));
          const rayCount = 12;
          const starRadius = 3.8 + star.depth * 1.4 + signalStrength * 7.4;
          const innerRadius = starRadius * (0.3 + (1 - signalStrength) * 0.05);
          const glowRadius = 7 + signalStrength * 16;
          const glow = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);

          glow.addColorStop(0, `hsla(${star.hue}, ${star.saturation}%, 96%, ${starOpacity * 0.48})`);
          glow.addColorStop(0.22, `hsla(${star.hue}, ${star.saturation}%, 80%, ${starOpacity * 0.24})`);
          glow.addColorStop(1, `hsla(${star.hue}, ${star.saturation}%, 70%, 0)`);

          ctx.save();
          ctx.globalCompositeOperation = 'screen';
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
          ctx.fill();

          ctx.translate(x, y);
          ctx.rotate(star.phase % (Math.PI / 6));
          ctx.beginPath();

          for (let point = 0; point < rayCount * 2; point += 1) {
            const isRayTip = point % 2 === 0;
            const rayIndex = Math.floor(point / 2);
            const rayLength = [1, 0.82, 0.9][rayIndex % 3];
            const radius = isRayTip ? starRadius * rayLength : innerRadius;
            const angle = -Math.PI / 2 + (point * Math.PI) / rayCount;
            const pointX = Math.cos(angle) * radius;
            const pointY = Math.sin(angle) * radius;

            if (point === 0) ctx.moveTo(pointX, pointY);
            else ctx.lineTo(pointX, pointY);
          }

          ctx.closePath();
          ctx.fillStyle = `hsla(${star.hue}, ${star.saturation}%, ${94 + signalStrength * 5}%, ${starOpacity})`;
          ctx.shadowBlur = 7 + signalStrength * 18;
          ctx.shadowColor = `hsla(${star.hue}, ${star.saturation}%, 84%, ${starOpacity})`;
          ctx.fill();
          ctx.restore();
          return;
        }

        const opacity = star.opacity * twinkle;
        ctx.beginPath();
        ctx.arc(x, y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${star.hue}, ${star.saturation}%, ${star.lightness}%, ${opacity})`;

        if (star.depth > 0.76) {
          ctx.shadowBlur = 7 + star.depth * 5;
          ctx.shadowColor = `hsla(${star.hue}, ${star.saturation}%, 76%, ${opacity * 0.64})`;
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      });
    };

    const drawGrain = () => {
      if (!noisePattern) return;

      ctx.save();
      ctx.globalCompositeOperation = 'soft-light';
      ctx.globalAlpha = 0.025;
      ctx.fillStyle = noisePattern;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
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
      vignette.addColorStop(1, 'hsla(222, 47%, 3%, 0.36)');

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
      if (universeReady) drawUniverse(time);
      else drawNebulae(time);
      drawStars(time, deltaTime, shouldMove);
      drawGrain();
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

    universeImage.onload = () => {
      universeReady = true;
      if (motionPreference.matches) renderScene(0, false);
    };
    universeImage.src = deepSpaceBackground;

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
      universeImage.onload = null;

      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.95 }}
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;
