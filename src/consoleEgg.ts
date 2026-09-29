import { links, type Copy } from './content'

const art = String.raw`
 _   _  ____
| | | |/ ___|
| |_| | |  _
|  _  | |_| |
|_| |_|\____|
`

/** Easter egg: recado para quem abre o DevTools. Reimprime ao trocar de idioma. */
export function consoleGreeting(text: Copy['console']) {
  console.clear()
  console.log(`%c${art}`, 'color:#f26b2a;font-family:monospace;font-weight:700;line-height:1.1')
  console.log(`%c${text.hello}`, 'font-size:16px;font-weight:700')
  console.log(`%c${text.body}`, 'font-size:13px')
  console.log(
    `%c${text.cta}%c ${links.email}  |  ${links.linkedin}`,
    'font-size:13px;font-weight:700;color:#f26b2a',
    'font-size:13px',
  )
}
