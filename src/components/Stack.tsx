import {
  siCss,
  siElectron,
  siFlask,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siMysql,
  siNodedotjs,
  siPytest,
  siPython,
  siReact,
  siSqlite,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVite,
  type SimpleIcon,
} from 'simple-icons'
import { useI18n } from '../i18n'
import { Reveal } from './motion'

type Tech = { icon: SimpleIcon; name: string }

const front: Tech[] = [
  { icon: siReact, name: 'React' },
  { icon: siTypescript, name: 'TypeScript' },
  { icon: siJavascript, name: 'JavaScript' },
  { icon: siTailwindcss, name: 'Tailwind CSS' },
  { icon: siVite, name: 'Vite' },
  { icon: siHtml5, name: 'HTML5' },
  { icon: siCss, name: 'CSS' },
  { icon: siReact, name: 'React Native' },
]

const back: Tech[] = [
  { icon: siNodedotjs, name: 'Node.js' },
  { icon: siPython, name: 'Python' },
  { icon: siFlask, name: 'Flask' },
  { icon: siMysql, name: 'MySQL' },
  { icon: siSupabase, name: 'Supabase' },
  { icon: siSqlite, name: 'SQLite' },
]

const tools: Tech[] = [
  { icon: siGit, name: 'Git' },
  { icon: siGithub, name: 'GitHub' },
  { icon: siElectron, name: 'Electron' },
  { icon: siPytest, name: 'pytest' },
]

function Logo({ icon, large = false }: { icon: SimpleIcon; large?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`shrink-0 fill-current ${large ? 'size-8 md:size-9' : 'size-7'}`}>
      <path d={icon.path} />
    </svg>
  )
}

function TechList({ items, cols, large = false }: { items: Tech[]; cols: string; large?: boolean }) {
  return (
    <ul className={`grid gap-x-6 ${large ? 'gap-y-7' : 'gap-y-5'} ${cols}`}>
      {items.map((tech) => (
        <li key={tech.name} className="group flex items-center gap-3">
          <span className="transition-colors duration-300 group-hover:text-accent">
            <Logo icon={tech.icon} large={large} />
          </span>
          <span className={large ? 'text-base font-semibold md:text-lg' : 'text-sm font-medium'}>{tech.name}</span>
        </li>
      ))}
    </ul>
  )
}

export function Stack() {
  const { t } = useI18n()
  return (
    <section id="stack" className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 lg:py-36">
      <Reveal className="max-w-[65ch]">
        <h2 className="display text-[clamp(3.5rem,8vw,7.5rem)]">{t.stack.title}</h2>
        <p className="mt-6 text-lg leading-relaxed text-muted">{t.stack.sub}</p>
      </Reveal>

      <Reveal delay={0.1} className="mt-14 grid gap-px border border-line bg-line lg:grid-cols-4 lg:grid-rows-[auto_auto]">
        <div className="flex flex-col justify-between gap-12 bg-accent-soft p-6 md:p-10 lg:col-span-2 lg:row-span-2">
          <div className="flex flex-col gap-10">
            <h3 className="display text-6xl md:text-7xl">{t.stack.front}</h3>
            <TechList items={front} cols="grid-cols-2" large />
          </div>
          <p className="max-w-[40ch] border-t border-fg/15 pt-6 text-sm leading-relaxed text-muted">{t.stack.thisSite}</p>
        </div>
        <div className="flex flex-col gap-8 bg-bg p-6 md:p-10 lg:col-span-2">
          <h3 className="display text-4xl md:text-5xl">{t.stack.back}</h3>
          <TechList items={back} cols="grid-cols-2 sm:grid-cols-3" />
        </div>
        <div className="flex flex-col gap-8 bg-bg p-6 md:p-10">
          <h3 className="display text-4xl md:text-5xl">{t.stack.tools}</h3>
          <TechList items={tools} cols="grid-cols-2 lg:grid-cols-1" />
        </div>
        <div className="flex flex-col justify-between gap-8 bg-accent p-6 text-accent-fg md:p-10">
          <h3 className="display text-4xl md:text-5xl">{t.stack.design}</h3>
          <ul className="flex flex-col gap-1 text-lg font-semibold">
            {t.stack.designItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="text-sm leading-snug opacity-90">{t.stack.designNote}</p>
        </div>
      </Reveal>
    </section>
  )
}
