import {
  ArrowUpIcon,
  ArrowUpRightIcon,
  CheckIcon,
  CopyIcon,
  DownloadSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  WarningIcon,
} from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { links } from '../content'
import { useI18n } from '../i18n'
import { Magnetic, Reveal } from './motion'

type CopyState = 'idle' | 'copied' | 'failed'

const year = new Date().getFullYear()

export function Contact() {
  const { t } = useI18n()
  const [copyState, setCopyState] = useState<CopyState>('idle')
  const reduce = useReducedMotion()

  useEffect(() => {
    if (copyState === 'idle') return
    const id = window.setTimeout(() => setCopyState('idle'), 2200)
    return () => window.clearTimeout(id)
  }, [copyState])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(links.email)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }
  }

  const title = t.contact.title.replace(/\?$/, '')

  return (
    <section id="contato" className="border-t border-line">
      <div className="mx-auto max-w-[1400px] px-4 pt-24 pb-10 md:px-8 lg:pt-36">
        <Reveal>
          <h2 className="display text-[clamp(4.5rem,13vw,12.5rem)]">
            {title}
            <span className="text-accent">?</span>
          </h2>
          <p className="mt-8 max-w-[44ch] text-lg leading-relaxed text-muted">{t.contact.sub}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <Magnetic strength={0.2}>
              <a
                href={`mailto:${links.email}`}
                className="btn btn-primary h-14 px-6 text-base md:text-lg"
              >
                {links.email}
              </a>
            </Magnetic>
            <button
              type="button"
              onClick={copyEmail}
              aria-live="polite"
              className="btn btn-ghost h-14 min-w-[12rem] justify-center"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copyState}
                  className="inline-flex items-center gap-2"
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  {copyState === 'copied' && <CheckIcon size={18} className="text-accent" weight="bold" />}
                  {copyState === 'failed' && <WarningIcon size={18} />}
                  {copyState === 'idle' && <CopyIcon size={18} />}
                  {copyState === 'copied'
                    ? t.contact.copied
                    : copyState === 'failed'
                      ? t.contact.copyFailed
                      : t.contact.copy}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>

          <ul className="flex flex-wrap gap-x-8 gap-y-4">
            <li>
              <a href={links.linkedin} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 font-semibold">
                <LinkedinLogoIcon size={22} />
                <span className="link-underline">LinkedIn</span>
                <ArrowUpRightIcon size={14} weight="bold" className="text-accent" />
              </a>
            </li>
            <li>
              <a href={links.github} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 font-semibold">
                <GithubLogoIcon size={22} />
                <span className="link-underline">GitHub</span>
                <ArrowUpRightIcon size={14} weight="bold" className="text-accent" />
              </a>
            </li>
            <li>
              <a href={links.cv} download className="group inline-flex items-center gap-2 font-semibold">
                <DownloadSimpleIcon size={22} />
                <span className="link-underline">{t.nav.cv}</span>
              </a>
            </li>
          </ul>
        </Reveal>

        <footer className="mt-24 flex flex-col gap-4 border-t border-line pt-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {t.contact.rights} {t.contact.built}
          </p>
          <div className="flex items-center gap-6">
            <p className="font-mono text-xs">{t.contact.hint}</p>
            <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-fg">
              <ArrowUpIcon size={14} />
              {t.contact.backToTop}
            </a>
          </div>
        </footer>
      </div>
    </section>
  )
}
