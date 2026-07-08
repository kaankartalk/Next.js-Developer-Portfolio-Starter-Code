import { useEffect, useRef } from 'react'

export default function SpaceBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width, height, animationId
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const STAR_COUNT = window.innerWidth < 700 ? 90 : 170
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.3 + 0.3,
      baseAlpha: Math.random() * 0.5 + 0.35,
      twinkleSpeed: Math.random() * 0.02 + 0.006,
      phase: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.04,
      driftY: (Math.random() - 0.5) * 0.04,
    }))

    const PLANETS = [
      { colors: ['#5598e7', '#184f95'], r: 22, hasRing: false },
      { colors: ['#9085e9', '#4a3aa7'], r: 30, hasRing: true },
      { colors: ['#eda100', '#c98500'], r: 16, hasRing: false },
    ]
    const planets = PLANETS.map((p) => ({
      ...p,
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.14,
      vy: (Math.random() - 0.5) * 0.09,
    }))

    const satellite = {
      cx: width * 0.78,
      cy: height * 0.28,
      radiusX: Math.min(150, width * 0.18),
      radiusY: 55,
      angle: 0,
      speed: 0.007,
    }

    let shootingStars = []
    let shootingCooldown = 120

    function spawnShootingStar() {
      shootingStars.push({
        x: Math.random() * width * 0.5,
        y: Math.random() * height * 0.35,
        vx: 7 + Math.random() * 4,
        vy: 3.5 + Math.random() * 2,
        life: 0,
        maxLife: 35 + Math.random() * 15,
      })
    }

    function draw() {
      ctx.clearRect(0, 0, width, height)

      stars.forEach((s) => {
        s.phase += s.twinkleSpeed
        const alpha = Math.max(0, Math.min(1, s.baseAlpha + Math.sin(s.phase) * 0.3))
        ctx.beginPath()
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
        if (!prefersReducedMotion) {
          s.x += s.driftX
          s.y += s.driftY
          if (s.x < 0) s.x = width
          if (s.x > width) s.x = 0
          if (s.y < 0) s.y = height
          if (s.y > height) s.y = 0
        }
      })

      planets.forEach((p) => {
        const grad = ctx.createRadialGradient(p.x - p.r * 0.3, p.y - p.r * 0.3, p.r * 0.1, p.x, p.y, p.r)
        grad.addColorStop(0, p.colors[0])
        grad.addColorStop(1, p.colors[1])
        ctx.save()
        ctx.globalAlpha = 0.5
        ctx.beginPath()
        ctx.fillStyle = grad
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
        if (p.hasRing) {
          ctx.beginPath()
          ctx.strokeStyle = 'rgba(255,255,255,0.22)'
          ctx.lineWidth = 2
          ctx.ellipse(p.x, p.y, p.r * 1.8, p.r * 0.5, -0.4, 0, Math.PI * 2)
          ctx.stroke()
        }
        ctx.restore()
        if (!prefersReducedMotion) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < -p.r * 3) p.x = width + p.r * 3
          if (p.x > width + p.r * 3) p.x = -p.r * 3
          if (p.y < -p.r * 3) p.y = height + p.r * 3
          if (p.y > height + p.r * 3) p.y = -p.r * 3
        }
      })

      ctx.beginPath()
      ctx.strokeStyle = 'rgba(131, 197, 160, 0.14)'
      ctx.lineWidth = 1
      ctx.ellipse(satellite.cx, satellite.cy, satellite.radiusX, satellite.radiusY, 0, 0, Math.PI * 2)
      ctx.stroke()

      if (!prefersReducedMotion) satellite.angle += satellite.speed
      const sx = satellite.cx + Math.cos(satellite.angle) * satellite.radiusX
      const sy = satellite.cy + Math.sin(satellite.angle) * satellite.radiusY
      ctx.save()
      ctx.translate(sx, sy)
      ctx.font = '18px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('\u{1F6F0}\u{FE0F}', 0, 0)
      ctx.restore()

      if (!prefersReducedMotion) {
        shootingCooldown--
        if (shootingCooldown <= 0 && Math.random() < 0.02) {
          spawnShootingStar()
          shootingCooldown = 150 + Math.random() * 150
        }
        shootingStars.forEach((s) => {
          s.x += s.vx
          s.y += s.vy
          s.life++
          const alpha = 1 - s.life / s.maxLife
          const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 6, s.y - s.vy * 6)
          grad.addColorStop(0, `rgba(255,255,255,${Math.max(0, alpha)})`)
          grad.addColorStop(1, 'rgba(255,255,255,0)')
          ctx.beginPath()
          ctx.strokeStyle = grad
          ctx.lineWidth = 2
          ctx.moveTo(s.x, s.y)
          ctx.lineTo(s.x - s.vx * 6, s.y - s.vy * 6)
          ctx.stroke()
        })
        shootingStars = shootingStars.filter((s) => s.life < s.maxLife)
      }

      animationId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="space-bg-wrap" aria-hidden="true">
      <div className="nebula nebula-a" />
      <div className="nebula nebula-b" />
      <canvas ref={canvasRef} />
      <style jsx>{`
        .space-bg-wrap {
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          background: radial-gradient(ellipse at 20% 10%, #0d1530 0%, #0a0a0a 55%, #060608 100%);
        }
        canvas {
          position: absolute;
          inset: 0;
        }
        .nebula {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          opacity: 0.22;
          mix-blend-mode: screen;
        }
        .nebula-a {
          width: 480px;
          height: 480px;
          top: -80px;
          left: -60px;
          background: radial-gradient(circle, #4a3aa7 0%, transparent 70%);
          animation: drift-a 34s ease-in-out infinite;
        }
        .nebula-b {
          width: 420px;
          height: 420px;
          bottom: -100px;
          right: -60px;
          background: radial-gradient(circle, #1c5cab 0%, transparent 70%);
          animation: drift-b 40s ease-in-out infinite;
        }
        @keyframes drift-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(60px, 40px) scale(1.15); }
        }
        @keyframes drift-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, -30px) scale(1.1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .nebula-a, .nebula-b { animation: none; }
        }
      `}</style>
    </div>
  )
}
