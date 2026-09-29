export type Lang = 'pt' | 'en'

export const links = {
  email: 'hiramgalindojr11@gmail.com',
  linkedin: 'https://www.linkedin.com/in/hiram-galindo-jr-b0bb33330/',
  github: 'https://github.com/HiramJr001',
  backoffice: 'https://github.com/HiramJr001/backoffice-os',
  nfse: 'https://github.com/HiramJr001/Auto-NFSe.gov-Downloader',
  cv: '/cv/Hiram_Galindo_Jr_CV.pdf',
}

// Trecho real de baixar_nfse_lote.py (Auto-NFSe.gov-Downloader).
export const nfseSnippet = `def montar_sessao(cert_path: str, cert_senha: str) -> requests.Session:
    """Cria uma sessão requests configurada com mTLS via certificado .pfx"""
    sessao = requests.Session()
    sessao.mount(
        "https://adn.nfse.gov.br",
        Pkcs12Adapter(pkcs12_filename=cert_path, pkcs12_password=cert_senha),
    )
    sessao.headers.update({"Accept": "application/json"})
    return sessao`

export type Stat = { num?: number; text?: string; prefix?: string; suffix?: string; label: string }

export type ProjectImage = { src: string; alt: string; width: number; height: number }

export type Project = {
  id: 'hub' | 'guardian' | 'ui' | 'nfse'
  name: string
  desc: string
  tags: string[]
  href: string
  images?: ProjectImage[]
  steps?: string[]
  inProduction?: boolean
}

const pt = {
  meta: {
    title: 'Hiram Galindo Jr | Dev front-end',
  },
  nav: {
    projects: 'Projetos',
    stack: 'Stack',
    journey: 'Jornada',
    education: 'Formação',
    contact: 'Contato',
    cv: 'Currículo',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    toLight: 'Mudar para o tema claro',
    toDark: 'Mudar para o tema escuro',
    switchLang: 'Switch to English',
    home: 'Início',
  },
  hero: {
    status: 'Em busca da minha primeira vaga em um time de tecnologia',
    role: 'Dev front-end.',
    sub: 'Construo interfaces que viram ferramenta de trabalho de verdade, usadas todo dia em produção.',
    cta: 'Ver projetos',
    photoAlt: 'Retrato de Hiram Galindo Jr',
  },
  stats: [
    { num: 80000, suffix: '+', label: 'PDFs analisados pelo Document Guardian' },
    { num: 80, prefix: '~', suffix: '%', label: 'menos tempo em tarefas de folha e RH' },
    { num: 17, label: 'ferramentas no Hub do BackOffice OS' },
    { num: 2, suffix: ' anos', label: 'construindo software usado em produção' },
    { text: 'C1', label: 'de inglês, falado e escrito' },
  ] as Stat[],
  projects: {
    title: 'Projetos',
    intro:
      'Software que roda todo dia num escritório de contabilidade. Da interface ao instalador, feito por mim.',
    more: 'Mais no GitHub',
    code: 'Código',
    inProduction: 'Em produção',
    snippetCaption: 'Trecho real de baixar_nfse_lote.py',
    items: [
      {
        id: 'hub',
        name: 'BackOffice OS',
        desc: 'Suíte de operações internas para escritórios contábeis. São 17 ferramentas num app desktop que a equipe usa todo dia.',
        tags: ['JavaScript', 'Electron', 'Python', 'SQLite'],
        href: links.backoffice,
        inProduction: true,
        images: [
          {
            src: '/projects/hub-home.png',
            alt: 'Tela inicial do Hub do BackOffice OS, com radar de notícias contábeis, agenda e checklist do dia',
            width: 1898,
            height: 1048,
          },
        ],
      },
      {
        id: 'guardian',
        name: 'Document Guardian',
        desc: 'Encontra datas de vencimento em mais de 80.000 PDFs. Uma cascata de filtros garante que o OCR só rode quando é preciso.',
        tags: ['Python', 'PyMuPDF', 'Tesseract', 'Flask'],
        href: links.backoffice,
        steps: ['Poda de pastas', 'Ranking pelo nome do arquivo', 'Texto nativo do PDF', 'OCR como último recurso'],
        images: [
          {
            src: '/projects/guardian-results.png',
            alt: 'Painel do Document Guardian com log da varredura, contadores de documentos vencidos e vigentes e tabela por empresa',
            width: 1898,
            height: 1048,
          },
        ],
      },
      {
        id: 'ui',
        name: 'Interface do Hub',
        desc: 'Temas claro e escuro com contraste WCAG AA, busca por comando com Ctrl K e ferramentas agrupadas por tarefa.',
        tags: ['JavaScript', 'CSS', 'pdf.js', 'SheetJS'],
        href: links.backoffice,
        images: [
          {
            src: '/projects/hub-tools.png',
            alt: 'Grade de ferramentas do Hub agrupadas em Documentos e Prazos e rotina',
            width: 1898,
            height: 1048,
          },
          {
            src: '/projects/hub-home-light.png',
            alt: 'Tela inicial do Hub no tema claro',
            width: 1898,
            height: 1048,
          },
        ],
      },
      {
        id: 'nfse',
        name: 'NFS-e Downloader',
        desc: 'Baixa em lote notas fiscais da API nacional para dezenas de empresas, com autenticação mTLS e retomada por checkpoint.',
        tags: ['Python', 'requests', 'mTLS'],
        href: links.nfse,
      },
    ] as Project[],
  },
  stack: {
    title: 'Ferramentas que uso todo dia',
    sub: 'Tudo aqui já foi para produção. O front é onde eu mais gosto de estar.',
    front: 'Front-end',
    back: 'Back-end e dados',
    tools: 'Ferramentas',
    design: 'Design',
    designItems: ['UI/UX', 'Design systems', 'Identidade visual'],
    designNote: 'Refiz a identidade visual da Inovare e as visualizações do perfil dobraram.',
    thisSite: 'Este site foi feito com React, TypeScript, Tailwind CSS v4 e Motion. O código está no meu GitHub.',
  },
  journey: {
    title: 'Como cheguei até aqui',
    about:
      'Sou o Hiram, dev front-end de Ituverava, SP. Aprendi a construir software resolvendo problemas reais do escritório onde trabalho. Agora quero fazer isso dentro de um time de tecnologia, remoto ou com mudança.',
    items: [
      {
        when: 'Out 2024',
        title: 'Entrei na Inovare Contabilidade',
        desc: 'Comecei como assistente de escritório e assumi toda a TI: hardware, rede, impressoras e suporte.',
      },
      {
        when: 'Primeiras entregas',
        title: 'Site e nova identidade visual',
        desc: 'Fiz o primeiro site da empresa e refiz a marca. O engajamento no site e no Instagram dobrou.',
      },
      {
        when: '2025',
        title: 'Nasce o BackOffice OS',
        desc: 'Um pipeline com IA passou a extrair dados de holerites, notas e admissões direto para o Excel.',
      },
      {
        when: 'Dez 2025',
        title: 'Formado em Análise e Desenvolvimento de Sistemas',
        desc: 'Tecnólogo pela Unifran, Universidade de Franca.',
      },
      {
        when: '2026',
        title: 'Em produção, todo dia',
        desc: 'O BackOffice OS virou rotina da equipe e ganhou o NFS-e Downloader para as notas fiscais.',
      },
      {
        when: 'Agora',
        title: 'Pronto para o próximo passo',
        desc: 'Procuro minha primeira vaga de front-end num time de tecnologia, para aprender com gente melhor que eu.',
      },
    ],
  },
  education: {
    title: 'Formação',
    degree: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
    school: 'Unifran, Universidade de Franca',
    date: 'Concluído em dezembro de 2025',
    coursesLabel: 'Disciplinas que mais uso',
    courses: [
      'Estruturas de dados',
      'Banco de dados',
      'Orientação a objetos',
      'Engenharia de software',
      'Desenvolvimento web e mobile',
      'Computação em nuvem',
      'Computação paralela e distribuída',
    ],
    languagesLabel: 'Idiomas',
    languages: [
      { name: 'Português', level: 'Nativo' },
      { name: 'Inglês', level: 'C1, avançado' },
    ],
  },
  contact: {
    title: 'Vamos conversar?',
    sub: 'Estou aberto a vagas de front-end, remotas ou presenciais. Respondo rápido.',
    copy: 'Copiar e-mail',
    copied: 'E-mail copiado',
    copyFailed: 'Não deu para copiar',
    rights: 'Hiram Galindo Jr.',
    built: 'Feito por mim com React, Tailwind e Motion.',
    hint: 'Dev curioso? Abra o console.',
    backToTop: 'Voltar ao topo',
  },
  console: {
    hello: 'Oi, dev curioso.',
    body: 'Se você abriu o console, a gente provavelmente vai se dar bem.',
    cta: 'Me chama:',
  },
}

export type Copy = typeof pt

const en: Copy = {
  meta: {
    title: 'Hiram Galindo Jr | Front-end developer',
  },
  nav: {
    projects: 'Projects',
    stack: 'Stack',
    journey: 'Journey',
    education: 'Education',
    contact: 'Contact',
    cv: 'Résumé',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    toLight: 'Switch to light theme',
    toDark: 'Switch to dark theme',
    switchLang: 'Mudar para português',
    home: 'Home',
  },
  hero: {
    status: 'Looking for my first role on a tech team',
    role: 'Front-end developer.',
    sub: 'I build interfaces that become real work tools, used every day in production.',
    cta: 'See projects',
    photoAlt: 'Portrait of Hiram Galindo Jr',
  },
  stats: [
    { num: 80000, suffix: '+', label: 'PDFs scanned by Document Guardian' },
    { num: 80, prefix: '~', suffix: '%', label: 'less time on payroll and HR tasks' },
    { num: 17, label: 'tools inside the BackOffice OS Hub' },
    { num: 2, suffix: ' yrs', label: 'building software used in production' },
    { text: 'C1', label: 'English, spoken and written' },
  ],
  projects: {
    title: 'Projects',
    intro: 'Software that runs every day at an accounting firm. From the interface to the installer, built by me.',
    more: 'More on GitHub',
    code: 'Code',
    inProduction: 'In production',
    snippetCaption: 'Real excerpt from baixar_nfse_lote.py',
    items: [
      {
        ...pt.projects.items[0],
        desc: 'An internal operations suite for accounting firms. 17 tools in one desktop app the team uses every day.',
        images: [{ ...pt.projects.items[0].images![0], alt: 'BackOffice OS Hub home screen with an accounting news feed, agenda and daily checklist' }],
      },
      {
        ...pt.projects.items[1],
        desc: 'Finds expiry dates across 80,000+ PDFs. A cascade of filters makes sure OCR only runs when it is actually needed.',
        steps: ['Folder pruning', 'Filename ranking', 'Native PDF text', 'OCR as a last resort'],
        images: [{ ...pt.projects.items[1].images![0], alt: 'Document Guardian panel with scan log, expired and valid document counters and a per-company table' }],
      },
      {
        ...pt.projects.items[2],
        name: 'Hub interface',
        desc: 'Light and dark themes with WCAG AA contrast, a Ctrl K command search and tools grouped by task.',
        images: [
          { ...pt.projects.items[2].images![0], alt: 'Hub tool grid grouped into Documents and Deadlines and routine' },
          { ...pt.projects.items[2].images![1], alt: 'Hub home screen in the light theme' },
        ],
      },
      {
        ...pt.projects.items[3],
        desc: 'Bulk downloads invoices from Brazil’s national tax API for dozens of companies, with mTLS auth and checkpoint resume.',
      },
    ],
  },
  stack: {
    title: 'Tools I use every day',
    sub: 'Everything here has shipped to production. Front-end is where I like to be most.',
    front: 'Front-end',
    back: 'Back-end and data',
    tools: 'Tooling',
    design: 'Design',
    designItems: ['UI/UX', 'Design systems', 'Visual identity'],
    designNote: 'I rebuilt Inovare’s visual identity and profile views doubled.',
    thisSite: 'This site is built with React, TypeScript, Tailwind CSS v4 and Motion. The code is on my GitHub.',
  },
  journey: {
    title: 'How I got here',
    about:
      'I’m Hiram, a front-end developer from Ituverava, Brazil. I learned to build software by solving real problems at the office where I work. Now I want to do it on a tech team, remote or through relocation.',
    items: [
      {
        when: 'Oct 2024',
        title: 'Joined Inovare Contabilidade',
        desc: 'Started as an office assistant and took over all of IT: hardware, network, printers and support.',
      },
      {
        when: 'First deliveries',
        title: 'Website and a new visual identity',
        desc: 'Built the company’s first website and redesigned the brand. Site and Instagram engagement doubled.',
      },
      {
        when: '2025',
        title: 'BackOffice OS is born',
        desc: 'An AI pipeline started pulling data from pay stubs, invoices and hiring forms straight into Excel.',
      },
      {
        when: 'Dec 2025',
        title: 'Graduated in Systems Analysis and Development',
        desc: 'Associate degree from Unifran, Universidade de Franca.',
      },
      {
        when: '2026',
        title: 'In production, every day',
        desc: 'BackOffice OS became part of the team’s routine and gained the NFS-e Downloader for invoices.',
      },
      {
        when: 'Now',
        title: 'Ready for the next step',
        desc: 'Looking for my first front-end role on a tech team, to learn from people better than me.',
      },
    ],
  },
  education: {
    title: 'Education',
    degree: 'Systems Analysis and Development',
    school: 'Unifran, Universidade de Franca',
    date: 'Completed December 2025',
    coursesLabel: 'Courses I use the most',
    courses: [
      'Data structures',
      'Database systems',
      'Object-oriented programming',
      'Software engineering',
      'Web and mobile development',
      'Cloud computing',
      'Parallel and distributed computing',
    ],
    languagesLabel: 'Languages',
    languages: [
      { name: 'Portuguese', level: 'Native' },
      { name: 'English', level: 'C1, advanced' },
    ],
  },
  contact: {
    title: 'Let’s talk?',
    sub: 'I’m open to front-end roles, remote or on-site. I reply fast.',
    copy: 'Copy email',
    copied: 'Email copied',
    copyFailed: 'Could not copy',
    rights: 'Hiram Galindo Jr.',
    built: 'Built by me with React, Tailwind and Motion.',
    hint: 'Curious dev? Open the console.',
    backToTop: 'Back to top',
  },
  console: {
    hello: 'Hey there, curious dev.',
    body: 'If you opened the console, we will probably get along.',
    cta: 'Reach me:',
  },
}

export const copy: Record<Lang, Copy> = { pt, en }
