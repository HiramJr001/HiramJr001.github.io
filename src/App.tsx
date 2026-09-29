import { useEffect } from 'react'
import { Contact } from './components/Contact'
import { Education } from './components/Education'
import { Hero } from './components/Hero'
import { Journey } from './components/Journey'
import { Nav } from './components/Nav'
import { Projects } from './components/Projects'
import { Stack } from './components/Stack'
import { Stats } from './components/Stats'
import { consoleGreeting } from './consoleEgg'
import { useI18n } from './i18n'

export default function App() {
  const { t } = useI18n()

  useEffect(() => {
    consoleGreeting(t.console)
  }, [t.console])

  return (
    <>
      <a
        href="#projetos"
        className="sr-only z-50 bg-accent px-4 py-2 text-accent-fg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {t.hero.cta}
      </a>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Projects />
        <Stack />
        <Journey />
        <Education />
        <Contact />
      </main>
    </>
  )
}
