import { ArrowDownIcon, ArrowRightIcon, DownloadSimpleIcon } from '@phosphor-icons/react'
import { motion, useReducedMotion, type Transition } from 'motion/react'
import { links } from '../content'
import { useI18n } from '../i18n'
import { Magnetic } from './motion'

const ease = [0.16, 1, 0.3, 1] as const

/**
 * Abertura editorial com a tipografia do site: assinatura com retrato,
 * título condensado em caixa alta, ações e um índice curto dos projetos.
 */
export function Hero() {
  const { t } = useI18n()
  const reduce = useReducedMotion()

  // Entrada em sequência de leitura: assinatura, título, apoio, ações, índice.
  const rise = (delay: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 18 } as const),
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease } satisfies Transition,
  })

  return (
    <section id="top" className="px-4 pt-28 pb-10 md:px-8">
      <div className="mx-auto flex min-h-[calc(100dvh-9.5rem)] max-w-[1400px] flex-col">
        {/* Assinatura */}
        <motion.div className="flex items-center gap-5 md:gap-6" {...rise(0.05)}>
          <Portrait alt={t.hero.photoAlt} />
          <div>
            <p className="display text-3xl md:text-4xl">
              Hiram Galindo <span className="text-accent">Jr</span>
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted">
              {/* Indicador real de disponibilidade. */}
              <span className="relative flex size-2 shrink-0">
                {!reduce && <span className="absolute inset-0 animate-ping bg-accent opacity-60" />}
                <span className="relative size-2 bg-accent" />
              </span>
              {t.hero.status}
            </p>
          </div>
        </motion.div>

        <Headline text={t.hero.headline} accent={t.hero.headlineAccent} />

        <motion.p className="mt-5 max-w-[54ch] text-lg leading-relaxed text-muted md:text-xl" {...rise(0.9)}>
          {t.hero.sub}
        </motion.p>

        <motion.div className="mt-8 flex flex-wrap items-center gap-3" {...rise(1)}>
          <Magnetic>
            <a href="#projetos" className="btn btn-primary">
              {t.hero.cta}
              <ArrowDownIcon size={18} weight="bold" />
            </a>
          </Magnetic>
          <a href={links.cv} download className="btn btn-ghost">
            <DownloadSimpleIcon size={18} />
            {t.nav.cv}
          </a>
        </motion.div>

        {/* Índice de projetos, preso ao pé da primeira tela */}
        <motion.nav aria-label={t.hero.indexLabel} className="mt-auto pt-8" {...rise(1.1)}>
          <p className="pb-3 text-sm text-muted">{t.hero.indexLabel}</p>
          <ul className="divide-y divide-line border-t border-line">
            {t.hero.index.map((item) => (
              <li key={item.name}>
                <a
                  href="#projetos"
                  className="group grid grid-cols-[1fr_auto] items-center gap-x-6 py-3.5 md:grid-cols-12"
                >
                  <span className="display text-2xl transition-transform duration-300 group-hover:translate-x-1 md:col-span-4 md:text-3xl">
                    {item.name}
                  </span>
                  <span className="hidden text-muted md:col-span-6 md:block">{item.note}</span>
                  <span className="flex items-center gap-3 font-mono text-xs text-muted md:col-span-2 md:justify-end">
                    {item.year}
                    <ArrowRightIcon
                      size={18}
                      weight="bold"
                      className="text-fg transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>
      </div>
    </section>
  )
}

/** Retrato centrado no rosto, com moldura fina e bloco de destaque deslocado atrás. */
function Portrait({ alt }: { alt: string }) {
  const reduce = useReducedMotion()
  return (
    <div className="relative w-20 shrink-0 md:w-24">
      <motion.span
        aria-hidden
        className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-accent md:translate-x-2 md:translate-y-2"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      />
      <img
        src="/hiram-avatar.webp"
        alt={alt}
        width={480}
        height={600}
        fetchPriority="high"
        className="relative aspect-[4/5] w-full border border-fg object-cover"
      />
    </div>
  )
}

/**
 * Título condensado em caixa alta. Cada palavra sobe de uma máscara, no
 * mesmo gesto do nome da versão anterior; o final fica na cor de destaque.
 */
function Headline({ text, accent }: { text: string; accent: string }) {
  const reduce = useReducedMotion()
  const words = [
    ...text.split(' ').map((w) => ({ w, accent: false })),
    ...accent.split(' ').map((w) => ({ w, accent: true })),
  ]

  return (
    <h1
      aria-label={`${text} ${accent}`}
      className="display mt-10 max-w-[13em] text-[clamp(2.75rem,6.3vw,6.25rem)] text-balance md:mt-8"
    >
      {words.map(({ w, accent: isAccent }, i) => (
        <span key={i} aria-hidden>
          {/* Folga vertical na máscara para acentos (Ó) e a cauda do Q. */}
          <span className="-mt-[0.12em] -mb-[0.1em] inline-block overflow-hidden pt-[0.12em] pb-[0.1em] align-top">
            <motion.span
              className={`inline-block ${isAccent ? 'text-accent' : ''}`}
              initial={reduce ? false : { y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 + i * 0.06, ease }}
            >
              {w}
            </motion.span>
          </span>{' '}
        </span>
      ))}
    </h1>
  )
}
