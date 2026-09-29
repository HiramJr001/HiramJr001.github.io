import { motion, useReducedMotion, useScroll } from 'motion/react'
import { useRef } from 'react'
import { useI18n } from '../i18n'
import { Reveal } from './motion'

export function Journey() {
  const { t } = useI18n()
  const reduce = useReducedMotion()
  const listRef = useRef<HTMLOListElement>(null)
  // A linha da timeline se desenha conforme a leitura avança.
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] })

  return (
    <section id="jornada" className="border-t border-line">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-4 py-24 md:px-8 lg:grid-cols-12 lg:py-36">
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <Reveal>
            <h2 className="display text-[clamp(3.5rem,8vw,7.5rem)]">{t.journey.title}</h2>
            <p className="mt-8 max-w-[46ch] text-lg leading-relaxed text-muted">{t.journey.about}</p>
          </Reveal>
        </div>

        <ol ref={listRef} className="relative lg:col-span-6 lg:col-start-7">
          <span aria-hidden className="absolute top-2 bottom-2 left-[4.5px] w-0.5 bg-line" />
          <motion.span
            aria-hidden
            className="absolute top-2 bottom-2 left-[4.5px] w-0.5 origin-top bg-accent"
            style={{ scaleY: reduce ? 1 : scrollYProgress }}
          />
          {t.journey.items.map((item, i) => {
            const last = i === t.journey.items.length - 1
            return (
              <li key={item.title} className="relative pb-14 pl-12 last:pb-0">
                <span
                  aria-hidden
                  className={`absolute top-1.5 left-0 size-[11px] border ${
                    last ? 'border-accent bg-accent' : 'border-line bg-bg'
                  }`}
                />
                <Reveal>
                  <p className="font-mono text-xs tracking-wide text-accent">{item.when}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">{item.title}</h3>
                  <p className="mt-3 max-w-[52ch] leading-relaxed text-muted">{item.desc}</p>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
