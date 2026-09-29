import { useI18n } from '../i18n'
import { Reveal } from './motion'

export function Education() {
  const { t } = useI18n()
  const e = t.education
  return (
    <section id="formacao" className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1400px] px-4 py-24 md:px-8 lg:py-32">
        <Reveal>
          <h2 className="text-sm font-semibold text-muted">{e.title}</h2>
          <p className="display mt-6 max-w-[16ch] text-[clamp(3rem,7vw,6.5rem)]">{e.degree}</p>
          <p className="mt-6 text-lg">
            <span className="font-semibold">{e.school}</span>
            <span className="text-muted">. {e.date}</span>
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-16 grid gap-12 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-8">
            <h3 className="text-sm font-semibold text-muted">{e.coursesLabel}</h3>
            <ul className="no-scrollbar -mx-4 mt-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:flex-wrap md:px-0">
              {e.courses.map((course) => (
                <li key={course} className="shrink-0 snap-start border border-line bg-bg px-4 py-2.5 text-sm">
                  {course}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-4">
            <h3 className="text-sm font-semibold text-muted">{e.languagesLabel}</h3>
            <dl className="mt-4 flex flex-wrap gap-x-12 gap-y-6">
              {e.languages.map((l) => (
                <div key={l.name}>
                  <dt className="display text-4xl md:text-5xl">{l.name}</dt>
                  <dd className="mt-2 text-sm text-muted">{l.level}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
