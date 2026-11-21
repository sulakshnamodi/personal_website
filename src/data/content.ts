// All site copy lives here. Edit this file to change text, links or images.
// Images are served from /public/images — a neutral placeholder shows if a file is missing.

export const site = {
  name: 'Sulakshna Devi Umrit',
  shortName: 'Sulakshna Umrit',
  title: 'Sulakshna Umrit — Quantitative Researcher & Data Analyst',
  description:
    'Sulakshna Devi Umrit is a quantitative researcher and data analyst in Oslo, building autonomous research for the social sciences — agentic AI, survey statistics, multilevel models and machine learning.',
  locale: 'en_GB',
  ogImage: '/og-image.png',
  ogImageAlt: 'Sulakshna Umrit — Quantitative Researcher & Data Analyst',
  cv: {
    href: '/cv/Sulakshna_Umrit_CV_Data_AI.pdf',
    label: 'CV',
  },
  profiles: {
    linkedin: 'https://www.linkedin.com/in/sulakshna-umrit-127314253',
    github: 'https://github.com/sulakshnamodi',
  },
};

export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#stack' },
  { label: 'CV ↗', href: site.cv.href, external: true },
  { label: 'Contact', href: '#contact' },
];

export const hero = {
  eyebrow: ['Data Analyst', 'Quantitative Researcher'],
  title: 'Building autonomous research —', // non-breaking space keeps the dash on the first line
  titleAccent: 'for the social sciences.',
  primaryLink: { label: 'View work', href: '#work' },
  secondaryLink: { label: 'Get in touch', href: '#contact' },
  portrait: { src: '/images/portrait.jpg', alt: 'Portrait of Sulakshna Devi Umrit' },
  caption: 'Sulakshna Devi Umrit',
  facts: [
    { label: 'Based in', value: 'Oslo, Norway' },
    { label: 'Research', value: 'University of Oslo' },
    { label: 'Data & AI', value: 'Traveling Waves' },
    { label: 'Chef', value: 'Strawberry Group' },
  ],
};

export const about = {
  title: 'About',
  photos: {
    tall: { src: '/images/about-mauritius.jpg', alt: 'Mauritius', label: 'Mauritius' },
    top: { src: '/images/about-kitchen.jpg', alt: 'In the kitchen', label: 'In the kitchen' },
    bottom: { src: '/images/about-oslo.jpg', alt: 'Life in Oslo', label: 'Life in Oslo' },
  },
  lead: 'Sulakshna grew up in Mauritius, where Creole, French and English share a sentence — and every story comes with food.',
  body: 'She started out as a teacher, spending seven years showing children and teenagers how computers think. Watching people learn made her curious about the data behind it, so she moved to Oslo to study it. Today she builds AI tools that help researchers get answers from social science data — and makes sure those answers hold up.',
  rows: [
    { label: 'Languages', value: 'Creole, French and English — and Norwegian, one word at a time.' },
    {
      label: 'Kitchen',
      value: 'Part-time chef at Strawberry Group. Cooking is just analysis with better snacks: balance, timing and a lot of tasting.',
    },
    // TODO: confirm "Off duty" hobbies with Sulakshna.
    { label: 'Off duty', value: 'Long walks, recipes from home and a growing list of favourite Norwegian words.' },
  ],
};

export const experience = {
  title: 'Experience',
  meta: 'Now',
  items: [
    {
      kind: 'Data & AI',
      org: 'Traveling Waves',
      role: 'Data Science Intern',
      when: '2026 —',
      logo: '/images/logo-traveling-waves.png',
      detail:
        'Designing LLM agents that run real statistical analyses on OECD PIAAC data, building RAG search over survey codebooks, and testing every answer against verified results.',
    },
    {
      kind: 'Research',
      org: 'University of Oslo',
      role: 'Research Assistant',
      when: '2026 —',
      logo: '/images/logo-uio.png',
      detail:
        'Auditing effect sizes and statistical data across ~180 meta-analyses of child interventions, turning published research into an accurate, analysis-ready dataset.',
    },
    {
      kind: 'Research',
      org: 'University of Stavanger',
      role: 'Research Assistant',
      when: '2026 —',
      logo: '/images/logo-uis.png',
      detail:
        'Systematic screening, data extraction, and methodological quality appraisal of research reviews for a Ministry-commissioned umbrella review examining physical activity and executive functions among children in Grades 1–4.',
    },
  ],
};

export const projects = {
  title: 'Selected projects',
  items: [
    {
      tag: 'Agentic AI',
      when: '2026 —',
      title: 'Agentic research pipeline',
      line: 'An AI assistant that analyses survey data — with a researcher in the loop.',
      problem: 'AI chatbots often make up numbers when asked about research data.',
      approach:
        'Helping build a pipeline where the AI finds the right variables in OECD codebooks and writes and runs real Python analysis — while a researcher reviews each step and steers the work.',
      result:
        'A working prototype on OECD PIAAC data, where AI answers are checked against standard statistics and approved by a human before they count.',
      tags: ['LangGraph', 'RAG', 'Python', 'Human-in-the-loop', 'LLM APIs'],
    },
    {
      tag: 'Master’s thesis',
      when: '2025–26',
      title: 'Adult skills in Norway',
      line: 'Who gets left behind? Mapping inequality in adult skills.',
      problem: 'National averages hide which groups of adults struggle with reading and maths.',
      approach:
        'Analysed Norway’s OECD PIAAC survey in Python, using survey weights and multilevel models to compare groups defined by several traits at once.',
      result: 'Interactive charts and a report showing where skill gaps lie — and what they mean for the job market.',
      tags: ['Python', 'Multilevel models', 'MAIHDA', 'Plotly'],
    },
    {
      tag: 'Research audit',
      when: '2026 —',
      title: 'Meta-analysis audit',
      line: 'Making sure the evidence behind policy adds up.',
      problem: 'Big conclusions about what helps children rest on numbers that are rarely double-checked.',
      approach: 'Checking effect sizes and statistical data across ~180 meta-analyses against the original papers.',
      result: 'An accurate, analysis-ready dataset for a large synthesis of child interventions.',
      tags: ['Meta-analysis', 'Effect sizes', 'Data auditing'],
    },
    {
      tag: 'Evidence synthesis',
      when: '2026 —',
      title: 'Physical activity in school',
      line: 'Does moving more help young children focus? Gathering the evidence.',
      problem: 'Schools need clear evidence on whether physical activity improves children’s attention and self-control.',
      approach:
        'Screening and quality-checking research reviews against strict criteria, extracting their findings with a standard protocol, and agreeing decisions as a team.',
      result: 'Part of a Ministry-commissioned review turning research into practical guidance for Grades 1–4 in Norway.',
      tags: ['Umbrella review', 'Screening', 'Data extraction', 'Quality appraisal'],
    },
  ],
};

export const stack = {
  title: 'Technical Stack',
  groups: [
    { icon: '∑', name: 'Data & Computing', items: ['Python', 'NumPy', 'Pandas', 'SciPy', 'R'] },
    { icon: '◎', name: 'Machine Learning', items: ['Scikit-learn', 'PyTorch', 'Predictive analytics', 'Feature engineering'] },
    { icon: '✦', name: 'AI & LLMs', items: ['LangGraph', 'RAG', 'Agentic workflows', 'Tool calling', 'Local LLMs', 'OpenRouter'] },
    { icon: 'σ', name: 'Statistics', items: ['Multilevel models', 'MAIHDA', 'Meta-analysis', 'Survey weighting'] },
    { icon: '◐', name: 'Visualisation', items: ['Plotly', 'Matplotlib', 'Seaborn'] },
    { icon: '⌘', name: 'Engineering', items: ['Docker', 'Git', 'GitHub', 'MySQL', 'PHP', 'HTML / CSS'] },
  ],
};

export const contact = {
  titleStart: 'Let’s',
  titleAccent: 'collaborate.',
  intro: 'Open to roles in data analysis, AI engineering and quantitative research.',
  fields: {
    name: { label: 'Name', placeholder: 'Your name' },
    email: { label: 'Email', placeholder: 'you@company.com' },
    message: { label: 'Message', placeholder: 'Tell me a little about the role or project' },
  },
  submit: 'Send message',
  sending: 'Sending…',
  errorRequired: 'Please fill in all fields.',
  errorGeneric: 'Something went wrong — please try again in a moment.',
  successTitle: 'Thank you — message sent.',
  successBody: 'I’ll get back to you soon.',
  sendAnother: 'Send another',
};

export const footer = {
  name: 'Sulakshna Devi Umrit',
  lines: ['Quantitative Researcher · Data Analyst', 'Oslo, Norway'],
  siteLinks: [
    { label: 'Work', href: '#work' },
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Stack', href: '#stack' },
    { label: 'Contact', href: '#contact' },
  ],
  elsewhere: [
    { label: 'LinkedIn ↗', href: site.profiles.linkedin },
    { label: 'GitHub ↗', href: site.profiles.github },
    { label: 'CV (PDF) ↗', href: site.cv.href },
  ],
  copyright: '© 2026 Sulakshna Devi Umrit',
  backToTop: 'Back to top ↑',
};
