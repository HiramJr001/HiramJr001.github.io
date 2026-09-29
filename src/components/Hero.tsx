import { ArrowDownIcon, DownloadSimpleIcon } from '@phosphor-icons/react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { useEffect, useRef, useState, type PointerEvent, type RefObject } from 'react'
import { links } from '../content'
import { useMediaQuery } from '../hooks'
import { useI18n } from '../i18n'

const ease = [0.16, 1, 0.3, 1] as const

// Entrada do laranja: cobre a foto e "escorre" para a célula de baixo.
const pour = { duration: 1.1, delay: 0.35, ease }

/**
 * Abertura montada no mesmo sistema de bento da página (células com
 * divisórias de 1px, cantos retos, um bloco chapado na cor de destaque).
 */
export function Hero() {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const sectionRef = useRef<HTMLElement>(null)

  // Profundidade: a foto se desloca poucos pixels contra o ponteiro.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 60, damping: 18 })
  const sy = useSpring(py, { stiffness: 60, damping: 18 })

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce || !finePointer) return
    const r = e.currentTarget.getBoundingClientRect()
    px.set(((e.clientX - r.left) / r.width - 0.5) * -12)
    py.set(((e.clientY - r.top) / r.height - 0.5) * -8)
  }
  const onPointerLeave = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <section
      id="top"
      ref={sectionRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="px-4 pt-20 pb-10 md:px-8 lg:pb-12"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px border border-line bg-line lg:h-[calc(100dvh-8rem)] lg:max-h-[860px] lg:min-h-[560px] lg:grid-cols-12 lg:grid-rows-[1fr_auto]">
        {/* Nome */}
        <div className="order-1 col-span-2 flex flex-col justify-between gap-8 bg-bg p-6 md:gap-12 md:p-10 lg:col-span-8 lg:row-start-1">
          <motion.p
            className="flex items-center gap-3 text-sm text-muted"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {/* Indicador real de disponibilidade. */}
            <span className="relative flex size-2.5 shrink-0">
              {!reduce && <span className="absolute inset-0 animate-ping bg-accent opacity-60" />}
              <span className="relative size-2.5 bg-accent" />
            </span>
            {t.hero.status}
          </motion.p>
          <KineticName lines={[{ text: 'Hiram' }, { text: 'Galindo Jr', accentFrom: 8 }]} />
        </div>

        {/* Retrato */}
        <div className="relative order-3 aspect-[4/5] overflow-hidden bg-surface lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:aspect-auto">
          <HeroPhoto target={sectionRef} px={sx} py={sy} alt={t.hero.photoAlt} />
        </div>

        {/* Apoio */}
        {/* As células ficam opacas; só o conteúdo anima, para a cor da grade não vazar. */}
        <div className="order-2 col-span-2 flex items-end bg-bg p-6 md:p-10 lg:col-span-5 lg:row-start-2 lg:p-8">
          <motion.p
            className="max-w-[46ch] text-base leading-relaxed text-muted md:text-lg"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease }}
          >
            <strong className="font-semibold text-fg">{t.hero.role}</strong> {t.hero.sub}
          </motion.p>
        </div>

        {/* Currículo: célula neutra, mesma estrutura do bloco de ação */}
        <a
          href={links.cv}
          download
          className="group order-5 col-span-2 flex bg-bg transition-colors duration-300 hover:bg-surface lg:col-span-3 lg:row-start-2"
        >
          <motion.span
            className="flex w-full items-end justify-between gap-6 p-6 md:p-8 lg:flex-col lg:items-stretch"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1, ease }}
          >
            <DownloadSimpleIcon
              size={28}
              className="order-2 text-accent transition-transform duration-300 group-hover:translate-y-0.5 lg:order-1 lg:self-end"
            />
            <span className="display order-1 text-4xl lg:order-2 lg:text-5xl">{t.nav.cv}</span>
          </motion.span>
        </a>

        {/* Ação principal como bloco de cor, no mesmo idioma da célula Design */}
        <a
          href="#projetos"
          className="group relative order-4 flex overflow-hidden bg-bg lg:col-span-4 lg:col-start-9 lg:row-start-2"
        >
          <motion.span
            aria-hidden
            className="absolute inset-0 origin-bottom bg-accent transition-colors duration-300 group-hover:bg-fg"
            initial={reduce ? false : { scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={pour}
          />
          <motion.span
            className="relative flex w-full flex-col justify-between gap-6 p-5 text-accent-fg transition-colors duration-300 group-hover:text-bg md:p-8"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <ArrowDownIcon
              size={30}
              weight="bold"
              className="self-end transition-transform duration-300 group-hover:translate-y-1"
            />
            <span className="display text-4xl lg:text-5xl">{t.hero.cta}</span>
          </motion.span>
        </a>
      </div>
    </section>
  )
}

/**
 * Foto preenchendo a célula. Na entrada, o laranja que a cobre recolhe para
 * baixo, em direção ao bloco de ação. Ao rolar, a foto desce mais devagar
 * que a página e acompanha o ponteiro de leve.
 */
function HeroPhoto({
  target,
  px,
  py,
  alt,
}: {
  target: RefObject<HTMLElement | null>
  px: MotionValue<number>
  py: MotionValue<number>
  alt: string
}) {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target, offset: ['start start', 'end start'] })
  const scrollY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '4%'])
  const y = useTransform(() => `calc(${scrollY.get()} + ${py.get()}px)`)

  return (
    <>
      {/* Absoluta: a foto não influencia a altura da grade. */}
      <motion.div className="absolute inset-0" style={{ x: px, y }}>
        <motion.img
          src="/hiram-photo.webp"
          alt={alt}
          width={920}
          height={1480}
          fetchPriority="high"
          className="size-full object-cover object-[50%_30%]"
          initial={reduce ? false : { scale: 1.3 }}
          animate={{ scale: 1.12 }}
          transition={{ duration: 1.8, delay: 0.2, ease }}
        />
      </motion.div>
      {!reduce && (
        <motion.div
          aria-hidden
          className="absolute inset-0 origin-bottom bg-accent"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={pour}
        />
      )}
    </>
  )
}

type Line = { text: string; accentFrom?: number }

/**
 * Nome em tipografia cinética: as letras sobem de uma máscara na entrada e,
 * com ponteiro fino, esticam na vertical perto do cursor (só transform).
 */
function KineticName({ lines }: { lines: Line[] }) {
  const reduce = useReducedMotion()
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const px = useMotionValue(-9999)
  const py = useMotionValue(-9999)
  const letterCount = lines.reduce((n, l) => n + l.text.length, 0)
  const introMs = (0.15 + letterCount * 0.045 + 0.9) * 1000
  const [introDone, setIntroDone] = useState(!!reduce)

  useEffect(() => {
    if (reduce) return
    const id = window.setTimeout(() => setIntroDone(true), introMs)
    return () => window.clearTimeout(id)
  }, [reduce, introMs])

  // Motion value para que o transform de cada letra reaja sem re-render.
  const active = useMotionValue(0)
  useEffect(() => {
    active.set(finePointer && !reduce && introDone ? 1 : 0)
  }, [active, finePointer, reduce, introDone])
  let index = 0

  return (
    <h1
      aria-label={lines.map((l) => l.text).join(' ')}
      className="display text-[clamp(3.5rem,9vw,9.5rem)] leading-[0.84] select-none"
      onPointerMove={(e) => {
        px.set(e.clientX)
        py.set(e.clientY)
      }}
      onPointerLeave={() => {
        px.set(-9999)
        py.set(-9999)
      }}
    >
      {lines.map((line) => (
        <span
          key={line.text}
          aria-hidden
          className={`block whitespace-nowrap pt-[0.06em] ${introDone ? '' : 'overflow-hidden'}`}
        >
          {Array.from(line.text).map((ch, ci) => {
            const i = index++
            const accent = line.accentFrom !== undefined && ci >= line.accentFrom
            return (
              <Letter key={ci} ch={ch} i={i} px={px} py={py} active={active} accent={accent} />
            )
          })}
        </span>
      ))}
    </h1>
  )
}

function Letter({
  ch,
  i,
  px,
  py,
  active,
  accent,
}: {
  ch: string
  i: number
  px: MotionValue<number>
  py: MotionValue<number>
  active: MotionValue<number>
  accent: boolean
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)

  const target = useTransform(() => {
    const x = px.get()
    const y = py.get()
    const el = ref.current
    if (!active.get() || !el || x < -9000) return 1
    const r = el.getBoundingClientRect()
    const dist = Math.hypot(x - (r.left + r.width / 2), (y - (r.top + r.height / 2)) * 0.7)
    const falloff = Math.max(0, 1 - dist / 170)
    return 1 + falloff * falloff * 0.32
  })
  const scaleY = useSpring(target, { stiffness: 320, damping: 24 })

  if (ch === ' ') return <span className="inline-block w-[0.16em]" />

  return (
    <motion.span
      className="inline-block"
      initial={reduce ? false : { y: '108%' }}
      animate={{ y: 0 }}
      transition={{ delay: 0.15 + i * 0.045, duration: 0.9, ease }}
    >
      <motion.span
        ref={ref}
        className={`inline-block origin-bottom ${accent ? 'text-accent' : ''}`}
        style={{ scaleY }}
      >
        {ch}
      </motion.span>
    </motion.span>
  )
}
