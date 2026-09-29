# Portfólio · Hiram Galindo Jr

Landing page pessoal, bilíngue (PT/EN), com tema claro e escuro.

**No ar:** https://hiramjr001.github.io

**Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, Motion, Phosphor Icons, Simple Icons.

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Editar o conteúdo

Todo o texto da página (PT e EN), links e números ficam em [`src/content.ts`](src/content.ts).

| O quê | Onde |
|---|---|
| Foto do hero | `public/hiram-photo.webp` (retrato vertical, idealmente 920x1480 ou maior) |
| Currículo para download | `public/cv/Hiram_Galindo_Jr_CV.pdf` |
| Prints dos projetos | `public/projects/` |
| Cores (tema claro e escuro) | variáveis no topo de `src/index.css` |

## Publicar

O deploy é automático: todo push na branch `main` roda o workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), que gera o build e publica no GitHub Pages. Em 1 a 2 minutos a versão nova está no ar.

```bash
git add .
git commit -m "Atualiza portfólio"
git push
```

| Arquivo | Para quê |
|---|---|
| `public/og-image.png` | Imagem de prévia (1200x630) quando o link é colado no LinkedIn, WhatsApp etc. |

## Detalhes

- Respeita `prefers-reduced-motion`: sem animações, a seção de projetos vira uma lista vertical.
- A seção de projetos com rolagem horizontal só roda em telas a partir de 1024px; no celular vira lista.
- Tem um recado escondido no console do navegador.
