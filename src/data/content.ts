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
  lead: 'Sulakshna grew up in Mauritius, an island where Creole, French and English share the same sentence — and where every story is told around food.',
  body: 'Before data, she spent seven years in classrooms, teaching children and teenagers how computers think. That curiosity about how people learn followed her to Oslo, where it turned into research.',
  rows: [
    { label: 'Origin', value: 'Mauritius → Oslo. Island-raised, now learning to love Norwegian winters.' },
    {
      label: 'Kitchen',
      value: 'Part-time chef at Strawberry Group. Cooking is her other kind of analysis — balance, timing, a lot of tasting.',
    },
    // TODO: confirm "Off duty" copy with Sulakshna.
    { label: 'Off duty', value: 'Recreating recipes from home, long walks, and practising her Norwegian.' },
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
        'Prototyping an AI pipeline for OECD PIAAC data — LLM-executed statistics, RAG over codebooks, and checks against deterministic output.',
    },
    {
      kind: 'Research',
      org: 'University of Oslo',
      role: 'Research Assistant',
      when: '2026 —',
      logo: '/images/logo-uio.png',
      detail:
        'Auditing effect sizes across ~170 meta-analyses of interventions for children’s achievement and behaviour, for a tertiary synthesis.',
    },
    {
      kind: 'Research',
      org: 'University of Stavanger',
      role: 'Research Assistant',
      when: '2026 —',
      logo: '/images/logo-uis.png',
      detail:
        'Screening and coding reviews for a Ministry-commissioned umbrella review on physical activity and executive function in Grades 1–4.',
    },
  ],
};

export const projects = {
  title: 'Selected projects',
  items: [
    {
      tag: 'Agentic AI',
      when: '2026 —',
      title: 'PIAAC GPT',
      line: 'Ask survey data questions in plain language — with answers you can verify.',
      problem: 'LLMs invent statistics when asked about survey data.',
      approach: 'A LangGraph pipeline with RAG over OECD codebooks, where the model writes and runs real Python analysis.',
      result: 'Plain-language answers on PIAAC data, each checked against deterministic output.',
      tags: ['LangGraph', 'RAG', 'Python', 'LLM APIs'],
    },
    {
      tag: 'Master’s thesis',
      when: '2025–26',
      title: 'Adult skills in Norway',
      line: 'Who gets left behind? Mapping inequality in adult skills.',
      problem: 'Averages hide who is left behind in literacy and numeracy.',
      approach: 'Survey-weighted multilevel and MAIHDA models on PIAAC plausible values.',
      result: 'A map of intersectional inequalities across Norway’s adult population.',
      tags: ['HLM', 'MAIHDA', 'Python', 'Plotly'],
    },
    {
      tag: 'Machine learning',
      when: '2025',
      title: 'Mobile usage & behaviour',
      line: 'Predicting engagement from how people use their phones.',
      problem: 'Raw usage logs say little about how people actually engage.',
      approach: 'Feature engineering, behavioural segmentation and supervised ML models.',
      result: 'Distinct user segments and an engagement predictor, shown in dashboards.',
      tags: ['Scikit-learn', 'Pandas', 'Plotly'],
    },
    {
      tag: 'Evidence synthesis',
      when: '2026 —',
      title: 'Meta-analysis audit',
      line: 'Making sure the evidence behind policy adds up.',
      problem: 'Policy rests on meta-analyses whose numbers are rarely checked.',
      approach: 'Extracting and re-deriving effect sizes and SEs across ~170 meta-analyses.',
      result: 'A clean, reproducible dataset for a large tertiary synthesis.',
      tags: ['Hedges’ g', 'RVE', 'R'],
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
  // TODO: replace with the real LinkedIn profile URL.
  elsewhere: [
    { label: 'LinkedIn ↗', href: 'https://www.linkedin.com/' },
    { label: 'GitHub ↗', href: 'https://github.com/sulakshnamodi' },
    { label: 'CV (PDF) ↗', href: site.cv.href },
  ],
  copyright: '© 2026 Sulakshna Devi Umrit',
  backToTop: 'Back to top ↑',
};
