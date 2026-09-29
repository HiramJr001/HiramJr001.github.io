import { ArrowUpRightIcon, GithubLogoIcon } from '@phosphor-icons/react'
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useLayoutEffect, useRef, useState } from 'react'
import { links, nfseSnippet, type Project } from '../content'
import { useMediaQuery } from '../hooks'
import { useI18n } from '../i18n'
import { Reveal } from './motion'

export function Projects() {
  const desktop = useMediaQuery('(min-width: 1024px)')
  const reduce = useReducedMotion()
  return desktop && !reduce ? <HorizontalProjects /> : <StackedProjects />
}

/**
 * Rolagem horizontal fixada: a seção prende no topo e a rolagem vertical
 * move a trilha para o lado. Altura da seção = distância horizontal + 1 tela.
 */
function HorizontalProjects() {
  const { t } = useI18n()
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const distance = useMotionValue(0)
  const [height, setHeight] = useState<string>('100dvh')

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return
    const measure = () => {
      const d = Math.max(0, track.scrollWidth - window.innerWidth)
      distance.set(d)
      setHeight(`calc(100dvh + ${d}px)`)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [distance])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(() => -scrollYProgress.get() * distance.get())

  return (
    <section id="projetos" ref={sectionRef} className="relative" style={{ height }}>
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex h-full w-max items-stretch gap-[6vw] pt-24 pr-[8vw] pb-16 pl-[max(2rem,calc((100vw-1400px)/2+2rem))]"
        >
          <div className="flex w-[34vw] max-w-[520px] shrink-0 flex-col justify-center">
            <h2 className="display text-[clamp(5rem,10vw,10rem)]">{t.projects.title}</h2>
            <p className="mt-6 max-w-[36ch] text-lg leading-relaxed text-muted">{t.projects.intro}</p>
          </div>

          {t.projects.items.map((p) => (
            <ProjectPanel key={p.id} project={p} />
          ))}

          <div className="flex w-[30vw] shrink-0 items-center">
            <a href={links.github} target="_blank" rel="noreferrer" className="group display text-[clamp(4rem,7vw,7rem)]">
              <span className="link-underline">{t.projects.more}</span>
              <ArrowUpRightIcon
                className="ml-2 inline-block text-accent transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                size="0.7em"
                weight="bold"
              />
            </a>
          </div>
        </motion.div>

        <motion.div
          aria-hidden
          className="absolute bottom-8 left-[max(2rem,calc((100vw-1400px)/2+2rem))] h-0.5 w-40 origin-left bg-accent"
          style={{ scaleX: scrollYProgress }}
        />
      </div>
    </section>
  )
}

function StackedProjects() {
  const { t } = useI18n()
  return (
    <section id="projetos" className="mx-auto max-w-[1400px] px-4 py-24 md:px-8">
      <Reveal>
        <h2 className="display text-[clamp(4.5rem,18vw,8rem)]">{t.projects.title}</h2>
        <p className="mt-6 max-w-[36ch] text-lg leading-relaxed text-muted">{t.projects.intro}</p>
      </Reveal>
      <div className="mt-16 flex flex-col gap-20">
        {t.projects.items.map((p) => (
          <Reveal key={p.id}>
            <ProjectPanel project={p} stacked />
          </Reveal>
        ))}
      </div>
      <a
        href={links.github}
        target="_blank"
        rel="noreferrer"
        className="display mt-20 inline-flex items-center gap-3 text-6xl"
      >
        {t.projects.more}
        <ArrowUpRightIcon className="text-accent" size="0.7em" weight="bold" />
      </a>
    </section>
  )
}

function ProjectPanel({ project: p, stacked = false }: { project: Project; stacked?: boolean }) {
  const { t } = useI18n()
  const width = stacked ? 'w-full' : p.id === 'nfse' ? 'w-[min(62vw,900px)]' : 'w-[min(72vw,1080px)]'

  return (
    <article className={`flex min-w-0 shrink-0 flex-col justify-center gap-8 ${width}`}>
      <Visual project={p} stacked={stacked} />

      <div className="grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <h3 className="display text-[clamp(3rem,5vw,4.75rem)]">{p.name}</h3>
            {p.inProduction && (
              <span className="flex items-center gap-2 border border-line px-2.5 py-1 font-mono text-xs text-muted">
                <span className="size-1.5 bg-accent" />
                {t.projects.inProduction}
              </span>
            )}
          </div>
          <p className="mt-4 max-w-[52ch] leading-relaxed text-muted">{p.desc}</p>
        </div>
        <div className="flex flex-col gap-4 md:col-span-5 md:items-end">
          <ul className="flex flex-wrap gap-2 md:justify-end">
            {p.tags.map((tag) => (
              <li key={tag} className="border border-line px-2.5 py-1 font-mono text-xs text-fg">
                {tag}
              </li>
            ))}
          </ul>
          <a
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-semibold"
          >
            <GithubLogoIcon size={18} />
            <span className="link-underline">{t.projects.code}</span>
            <ArrowUpRightIcon
              size={14}
              weight="bold"
              className="text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </article>
  )
}

function Visual({ project: p, stacked }: { project: Project; stacked: boolean }) {
  const { t } = useI18n()
  const imgH = stacked ? '' : 'max-h-[52dvh]'

  if (p.id === 'nfse') {
    return (
      <figure className="flex min-w-0 flex-col gap-3">
        <pre className="no-scrollbar overflow-x-auto border border-line bg-surface p-6 font-mono [font-variant-ligatures:none] text-[13px] leading-relaxed text-fg md:p-8 md:text-sm">
          <code>{nfseSnippet}</code>
        </pre>
        <figcaption className="font-mono text-xs text-muted">{t.projects.snippetCaption}</figcaption>
      </figure>
    )
  }

  if (p.id === 'guardian' && p.steps && p.images) {
    const img = p.images[0]
    return (
      <div className="grid gap-6 md:grid-cols-12">
        <ol className="flex flex-col justify-end md:col-span-4">
          {p.steps.map((step, i) => (
            <li key={step} className="flex items-baseline gap-4 border-t border-line py-3 first:border-t-0">
              <span className="font-mono text-xs text-accent">{i}</span>
              <span className="text-base font-medium">{step}</span>
            </li>
          ))}
        </ol>
        <img
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          loading="lazy"
          className={`w-full border border-line object-cover object-top md:col-span-8 ${imgH}`}
        />
      </div>
    )
  }

  if (p.id === 'ui' && p.images?.length === 2) {
    const [dark, light] = p.images
    return (
      <div className="relative pb-[8%]">
        <img
          src={dark.src}
          alt={dark.alt}
          width={dark.width}
          height={dark.height}
          loading="lazy"
          className={`w-[82%] border border-line object-cover object-top ${stacked ? '' : 'max-h-[44dvh]'}`}
        />
        <img
          src={light.src}
          alt={light.alt}
          width={light.width}
          height={light.height}
          loading="lazy"
          className={`absolute right-0 bottom-0 w-[48%] border border-line object-cover object-top shadow-[0_24px_60px_-20px_rgb(0_0_0/0.45)] ${stacked ? '' : 'max-h-[26dvh]'}`}
        />
      </div>
    )
  }

  const img = p.images?.[0]
  if (!img) return null
  return (
    <img
      src={img.src}
      alt={img.alt}
      width={img.width}
      height={img.height}
      loading="lazy"
      className={`w-full border border-line object-cover object-top ${imgH}`}
    />
  )
}
