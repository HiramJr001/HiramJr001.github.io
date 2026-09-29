import { DownloadSimpleIcon, ListIcon, MoonIcon, SunIcon, XIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { links } from '../content'
import { useTheme } from '../hooks'
import { useI18n } from '../i18n'

export function Nav() {
  const { t, lang, setLang } = useI18n()
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()

  const items = [
    { href: '#projetos', label: t.nav.projects },
    { href: '#stack', label: t.nav.stack },
    { href: '#jornada', label: t.nav.journey },
    { href: '#formacao', label: t.nav.education },
    { href: '#contato', label: t.nav.contact },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-4 md:px-8">
        <a href="#top" aria-label={t.nav.home} className="display text-[1.9rem] leading-none">
          HG<span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {items.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="link-underline text-sm text-muted transition-colors hover:text-fg">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
            aria-label={t.nav.switchLang}
            className="h-10 px-2 font-mono text-xs tracking-wide text-muted transition-colors hover:text-fg"
          >
            <span className={lang === 'pt' ? 'text-fg' : undefined}>PT</span>
            <span className="px-1">/</span>
            <span className={lang === 'en' ? 'text-fg' : undefined}>EN</span>
          </button>
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === 'dark' ? t.nav.toLight : t.nav.toDark}
            className="grid size-10 place-items-center text-muted transition-colors hover:text-fg"
          >
            {theme === 'dark' ? <SunIcon size={20} /> : <MoonIcon size={20} />}
          </button>
          <a href={links.cv} download className="btn btn-ghost ml-2 hidden h-10 px-4 text-sm sm:inline-flex">
            <DownloadSimpleIcon size={16} />
            {t.nav.cv}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            className="grid size-10 place-items-center lg:hidden"
          >
            {open ? <XIcon size={22} /> : <ListIcon size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="border-t border-line bg-bg lg:hidden"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className="flex flex-col px-4 py-6">
              {items.map((item) => (
                <li key={item.href}>
                  <a href={item.href} onClick={() => setOpen(false)} className="display block py-2 text-5xl">
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-4 sm:hidden">
                <a href={links.cv} download className="btn btn-primary w-full justify-center">
                  <DownloadSimpleIcon size={18} />
                  {t.nav.cv}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
