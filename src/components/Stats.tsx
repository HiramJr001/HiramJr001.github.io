import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useMemo, useRef } from 'react'
import type { Stat } from '../content'
import { useI18n } from '../i18n'

export function Stats() {
  const { t } = useI18n()
  return (
    <section className="border-y border-line">
      <dl className="mx-auto grid max-w-[1400px] grid-cols-2 lg:grid-cols-5">
        {t.stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-col gap-3 px-4 py-10 md:px-8 lg:px-6 lg:py-14 ${
              i % 2 === 1 ? 'border-l border-line' : ''
            } ${i >= 2 ? 'border-t border-line lg:border-t-0' : ''} ${
              i > 0 ? 'lg:border-l' : ''
            } last:col-span-2 lg:last:col-span-1`}
          >
            <dt className="order-2 max-w-[20ch] text-sm leading-snug text-muted">{stat.label}</dt>
            <dd className="display order-1 text-[clamp(2.6rem,4.6vw,5.25rem)] whitespace-nowrap text-fg">
              <StatValue stat={stat} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function StatValue({ stat }: { stat: Stat }) {
  const { lang } = useI18n()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const fmt = useMemo(() => new Intl.NumberFormat(lang === 'pt' ? 'pt-BR' : 'en-US'), [lang])
  const to = stat.num ?? 0
  const animated = stat.num !== undefined && to >= 10 && !reduce

  // A contagem escreve direto no DOM, sem re-render por frame.
  useEffect(() => {
    const el = ref.current
    if (!el || !animated) return
    if (!inView) {
      el.textContent = fmt.format(0)
      return
    }
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = fmt.format(Math.round(v))
      },
    })
    return () => controls.stop()
  }, [inView, animated, to, fmt])

  if (stat.text) return <span>{stat.text}</span>

  return (
    <>
      {stat.prefix && <span className="text-accent">{stat.prefix}</span>}
      <span ref={ref}>{fmt.format(to)}</span>
      {stat.suffix && (
        // Sufixo em palavra ("anos") fica menor que o número; símbolos mantêm o tamanho.
        <span className={`text-accent ${stat.suffix.startsWith(' ') ? 'text-[0.45em]' : ''}`}>{stat.suffix}</span>
      )}
    </>
  )
}
