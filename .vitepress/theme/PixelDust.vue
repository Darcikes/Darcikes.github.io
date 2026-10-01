<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

// ============================================================
//  可调参数 —— 改这里就能在「低调版 / 满配版」之间切换
//  低调：COUNT 50 / SPEED 0.15 / ALPHA 0.35 / INTERACT false
// ============================================================
const COUNT = 140            // 方块数量
const SPEED = 0.22           // 漂移速度基准（px/帧）
const SIZE_MIN = 1           // 方块最小边长（CSS px）
const SIZE_MAX = 3           // 方块最大边长（CSS px）
const ALPHA = 0.55           // 最高不透明度
const INTERACT = true        // 鼠标跟随开关
const INTERACT_RADIUS = 130  // 鼠标影响半径（px）
const INTERACT_PULL = 0.06   // 吸附强度

type Particle = {
  x: number
  y: number
  size: number
  vx: number
  vy: number
  phase: number
  twinkle: number
  color: string
}

const canvasRef = ref<HTMLCanvasElement | null>(null)

let ctx: CanvasRenderingContext2D | null = null
let particles: Particle[] = []
let frame = 0
let width = 0
let height = 0
let paused = false
let reduced = false
let colors: string[] = []
let resizeObserver: ResizeObserver | null = null
let themeObserver: MutationObserver | null = null
const pointer = { x: -1e4, y: -1e4 }

function readColors() {
  const style = getComputedStyle(document.documentElement)
  const pick = (name: string, fallback: string) =>
    style.getPropertyValue(name).trim() || fallback
  colors = [
    pick('--vp-c-brand-1', '#3451b2'),
    pick('--vp-c-brand-2', '#3451b2'),
    pick('--vp-c-text-3', '#8f8f8f'),
    pick('--vp-c-divider', '#c2c2c2'),
  ]
}

function spawn(): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    size: SIZE_MIN + Math.random() * (SIZE_MAX - SIZE_MIN),
    vx: (Math.random() - 0.5) * SPEED,
    vy: (Math.random() - 0.5) * SPEED,
    phase: Math.random() * Math.PI * 2,
    twinkle: 0.008 + Math.random() * 0.02,
    color: colors[Math.floor(Math.random() * colors.length)] ?? '#3451b2',
  }
}

function resize() {
  const canvas = canvasRef.value
  if (!canvas) return
  const rect = canvas.parentElement?.getBoundingClientRect()
  width = Math.max(1, Math.floor(rect?.width ?? window.innerWidth))
  height = Math.max(1, Math.floor(rect?.height ?? window.innerHeight))
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = width * dpr
  canvas.height = height * dpr
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  particles = Array.from({ length: COUNT }, spawn)
  draw()
}

function draw() {
  if (!ctx) return
  ctx.clearRect(0, 0, width, height)

  for (const p of particles) {
    p.x += p.vx
    p.y += p.vy
    p.phase += p.twinkle

    // 出界回绕
    if (p.x < -4) p.x = width + 4
    if (p.x > width + 4) p.x = -4
    if (p.y < -4) p.y = height + 4
    if (p.y > height + 4) p.y = -4

    // 鼠标跟随：靠近光标的方块被轻轻吸住并提亮
    let boost = 0
    if (INTERACT && pointer.x > -1e3) {
      const dx = pointer.x - p.x
      const dy = pointer.y - p.y
      const dist = Math.hypot(dx, dy)
      if (dist < INTERACT_RADIUS && dist > 0.001) {
        const pull = (1 - dist / INTERACT_RADIUS) * INTERACT_PULL
        p.vx += (dx / dist) * pull
        p.vy += (dy / dist) * pull
        boost = (1 - dist / INTERACT_RADIUS) * 0.6
      }
    }

    // 限速，避免吸附后越飘越快
    const speed = Math.hypot(p.vx, p.vy)
    const maxSpeed = SPEED * 2.5
    if (speed > maxSpeed) {
      p.vx = (p.vx / speed) * maxSpeed
      p.vy = (p.vy / speed) * maxSpeed
    }

    const alpha = Math.max(0.06, (ALPHA * (0.55 + 0.45 * Math.sin(p.phase))) + boost)
    ctx.globalAlpha = Math.min(1, alpha)
    ctx.fillStyle = p.color
    ctx.fillRect(p.x, p.y, p.size, p.size)
  }

  ctx.globalAlpha = 1
  if (!paused) frame = requestAnimationFrame(draw)
}

function start() {
  paused = false
  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(draw)
}

function stop() {
  paused = true
  cancelAnimationFrame(frame)
}

const onPointerMove = (e: PointerEvent) => {
  const canvas = canvasRef.value
  if (!canvas) return
  const rect = canvas.getBoundingClientRect()
  pointer.x = e.clientX - rect.left
  pointer.y = e.clientY - rect.top
}

const onPointerLeave = () => {
  pointer.x = -1e4
  pointer.y = -1e4
}

const onVisibility = () => {
  if (document.hidden) stop()
  else if (!reduced) start()
}

onMounted(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
  reduced = motion.matches

  readColors()
  resize()

  resizeObserver = new ResizeObserver(() => resize())
  if (canvasRef.value?.parentElement) {
    resizeObserver.observe(canvasRef.value.parentElement)
  }

  // 深色 / 浅色切换时重新取色
  themeObserver = new MutationObserver(() => {
    readColors()
    particles.forEach((p) => {
      p.color = colors[Math.floor(Math.random() * colors.length)] ?? p.color
    })
    if (reduced) draw()
  })
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })

  if (INTERACT) {
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)
  }
  document.addEventListener('visibilitychange', onVisibility)

  // 减少动态偏好：只画一帧静态图，不启动动画循环
  if (reduced) draw()
  else start()
})

onBeforeUnmount(() => {
  stop()
  resizeObserver?.disconnect()
  themeObserver?.disconnect()
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerleave', onPointerLeave)
  document.removeEventListener('visibilitychange', onVisibility)
})
</script>

<template>
  <div class="pixel-dust" aria-hidden="true">
    <canvas ref="canvasRef" />
  </div>
</template>

<style>
/* 首页容器建立定位上下文，让尘埃铺满整个首页并沉到内容之下 */
.VPHome {
  position: relative;
}

.VPHomeHero,
.VPHomeFeatures {
  position: relative;
  z-index: 1;
}

.pixel-dust {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.pixel-dust canvas {
  display: block;
}
</style>
