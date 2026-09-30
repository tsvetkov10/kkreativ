import { useEffect, useRef } from 'react';

export default function CanvasBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    let lastWidth = window.innerWidth;
    
    const mouse = {
      x: null,
      y: null,
      radius: 150
    };

    const isMobile = () => {
      return (
        window.innerWidth < 768 ||
        /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent)
      );
    };

    const resizeCanvas = (force = false) => {
      const currentWidth = window.innerWidth;
      // On mobile, scrolling down/up expands or hides the browser address bar,
      // which fires 'resize' with an identical innerWidth.
      // NEVER clear or reinitialize particles on vertical-only resize!
      if (!force && particles.length > 0 && Math.abs(currentWidth - lastWidth) < 4) {
        return;
      }
      lastWidth = currentWidth;

      // Ensure canvas height covers the full screen height on mobile so no gaps appear
      const fullHeight = Math.max(
        window.innerHeight,
        window.screen?.height || window.innerHeight
      );

      canvas.width = currentWidth;
      canvas.height = fullHeight;
      initParticles();
    };

    // Particle Class
    class Particle {
      constructor(x, y, directionX, directionY, size) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.baseAlpha = 0.15 + Math.random() * 0.25;
        this.alpha = this.baseAlpha;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(212, 175, 55, ${this.alpha})`;
        ctx.fill();
      }

      update() {
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }

        this.x += this.directionX;
        this.y += this.directionY;

        if (mouse.x && mouse.y) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= (dx / distance) * force * 1.5;
            this.y -= (dy / distance) * force * 1.5;
            this.alpha = Math.min(1, this.baseAlpha + force * 0.6);
          } else {
            if (this.alpha > this.baseAlpha) {
              this.alpha -= 0.01;
            }
          }
        } else {
          if (this.alpha > this.baseAlpha) {
            this.alpha -= 0.01;
          }
        }

        this.draw();
      }
    }

    const initParticles = () => {
      particles = [];
      const mobile = isMobile();
      // On mobile screens, use fewer particles to keep GPU load ultra-light
      const divisor = mobile ? 24000 : 11000;
      const numberOfParticles = Math.max(12, Math.floor((canvas.width * canvas.height) / divisor));
      
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 2.5 + 0.5;
        const x = Math.random() * (canvas.width - size * 2) + size;
        const y = Math.random() * (canvas.height - size * 2) + size;
        const directionX = (Math.random() * 0.4) - 0.2;
        const directionY = (Math.random() * 0.4) - 0.2;

        particles.push(new Particle(x, y, directionX, directionY, size));
      }
    };

    const connectParticles = () => {
      // On mobile devices, connecting lines aren't needed or visible with smaller particles,
      // and skipping them saves massive CPU/battery during scroll!
      if (isMobile()) return;

      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 110) {
            const opacity = (1 - (distance / 110)) * 0.08;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => resizeCanvas(false);
    const handleOrientation = () => resizeCanvas(true);

    // Setup listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientation);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    // Initial call
    resizeCanvas(true);
    animate();

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientation);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas id="canvas-bg" ref={canvasRef}></canvas>;
}
