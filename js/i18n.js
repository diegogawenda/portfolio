// Language switch (English <-> Spanish).
//
// English is the source of truth and lives in index.html, so the page works
// (and is indexed) without JavaScript. Spanish is applied on top of it: every
// text node, aria-label and alt whose whitespace-normalised English text is a
// key in `es` gets swapped for its translation, and the original is kept so the
// switch is fully reversible. Strings not listed (names, tools, job titles,
// numbers) intentionally stay as they are.

const es = {
  // Header / nav
  'About': 'Sobre mí',
  'Expertise': 'Especialidades',
  'QA Lab': 'Laboratorio QA',
  'Experience': 'Experiencia',
  'Work': 'Proyectos',
  'Contact': 'Contacto',
  'Toggle navigation': 'Mostrar u ocultar la navegación',
  'Portrait of Diego Gawenda': 'Retrato de Diego Gawenda',

  // Hero
  'Principal Quality Engineer · AI-Augmented Testing': 'Principal Quality Engineer · Testing Aumentado con IA',
  'Quality is a system, not a checklist.': 'La calidad es un sistema, no una lista de verificación.',
  '15+ years driving test strategy, automation architecture, and team scaling across fintech and SaaS. Built QA teams of up to 12 engineers, cut regression time by 75%, and reduced production risk by 50% through shift-left practices and AI-augmented test design.':
    'Más de 15 años impulsando la estrategia de testing, la arquitectura de automatización y el crecimiento de equipos en fintech y SaaS. Formé equipos de QA de hasta 12 ingenieros, reduje el tiempo de regresión un 75% y el riesgo en producción un 50% con prácticas shift-left y diseño de pruebas asistido por IA.',
  'Get in touch': 'Contáctame',

  // Metrics
  'Impact metrics': 'Métricas de impacto',
  'Years in QA': 'Años en QA',
  'Regression time cut': 'Menos tiempo de regresión',
  'Automation ROI increase': 'Aumento del ROI de automatización',
  'Production risk reduced': 'Riesgo en producción reducido',
  'Engineers led': 'Ingenieros liderados',

  // About
  'A little about me': 'Un poco sobre mí',
  'I build quality into the system, not bolted onto the end.': 'Construyo la calidad dentro del sistema, no la agrego al final.',
  'My career has moved from hands-on manual and automated testing toward test strategy, automation architecture, and team scaling — always with the same question at the center: how do we catch problems before they reach production, without slowing engineering down? That question has taken me from a 10-person distributed QA team at a UK manufacturing software company to building automation frameworks from zero at two different startups, to leading quality for a fintech unicorn\'s multiple product squads.':
    'Mi carrera pasó del testing manual y automatizado en la práctica hacia la estrategia de testing, la arquitectura de automatización y el crecimiento de equipos, siempre con la misma pregunta en el centro: ¿cómo detectamos los problemas antes de que lleguen a producción, sin frenar a ingeniería? Esa pregunta me llevó desde un equipo de QA distribuido de 10 personas en una empresa de software industrial del Reino Unido, a construir frameworks de automatización desde cero en dos startups, hasta liderar la calidad de varios squads de producto en un unicornio fintech.',
  'My professional journey →': 'Mi recorrido profesional →',

  // Expertise
  'Quality from every angle.': 'Calidad desde todos los ángulos.',
  'Test Strategy & Leadership': 'Estrategia de Testing y Liderazgo',
  'Defining production-readiness criteria and testing culture for growing engineering teams.':
    'Definir criterios de preparación para producción y cultura de testing en equipos de ingeniería en crecimiento.',
  'Test Strategy': 'Estrategia de Testing',
  'Test Architecture': 'Arquitectura de Testing',
  'Shift-Left Testing': 'Testing Shift-Left',
  'Risk-Based Testing': 'Testing Basado en Riesgo',
  'AI-Augmented Testing': 'Testing Aumentado con IA',
  'Team Scaling': 'Escalado de Equipos',
  'Stakeholder Management': 'Gestión de Stakeholders',
  'Quality Metrics': 'Métricas de Calidad',
  'Automation Engineering': 'Ingeniería de Automatización',
  'Frameworks built from zero across web and mobile ecosystems, wired into CI/CD.':
    'Frameworks construidos desde cero para web y mobile, integrados en CI/CD.',
  'API, Data & Contracts': 'APIs, Datos y Contratos',
  'Coverage beyond the UI — services, contracts, and the data behind them.':
    'Cobertura más allá de la interfaz: servicios, contratos y los datos que hay detrás.',
  'API Testing': 'Testing de APIs',
  'Contract Testing': 'Testing de Contratos',
  'Delivery & Quality Gates': 'Entrega y Quality Gates',
  'CI/CD pipelines and quality gates embedded directly into engineering workflows.':
    'Pipelines de CI/CD y quality gates integrados directamente en los flujos de ingeniería.',
  'Test Data Management': 'Gestión de Datos de Prueba',
  'Performance Testing': 'Testing de Performance',
  'Accessibility (a11y)': 'Accesibilidad (a11y)',

  // QA Lab
  'This portfolio tests itself.': 'Este portfolio se prueba a sí mismo.',
  'A real Playwright suite runs against this site on every deploy — navigation, responsiveness, accessibility, and the live metrics you scrolled past above. No hand-picked numbers: what\'s below is whatever the last CI run produced.':
    'Una suite real de Playwright se ejecuta contra este sitio en cada deploy: navegación, diseño responsivo, accesibilidad y las métricas en vivo que viste más arriba. Sin números elegidos a mano: lo que ves abajo es lo que produjo la última ejecución de CI.',
  'Tests': 'Tests',
  'Browsers': 'Navegadores',
  'Pass rate': 'Tasa de éxito',
  'Live test results': 'Resultados de tests en vivo',
  'Loading latest results…': 'Cargando los últimos resultados…',
  'Results publish after the first CI run on GitHub Actions.': 'Los resultados se publican después de la primera ejecución de CI en GitHub Actions.',
  'Last run:': 'Última ejecución:',
  'View full report ↗': 'Ver el reporte completo ↗',
  'View suite on GitHub ↗': 'Ver la suite en GitHub ↗',

  // How I work
  'How I work': 'Cómo trabajo',
  'I take ownership of quality, end to end.': 'Me hago cargo de la calidad, de punta a punta.',
  'Strategy': 'Estrategia',
  'Define production-readiness criteria and shift-left practices before a single line of test code is written.':
    'Definir criterios de preparación para producción y prácticas shift-left antes de escribir una sola línea de código de test.',
  'Execution': 'Ejecución',
  'Build automation frameworks from zero and wire them into CI/CD as real quality gates, not afterthoughts.':
    'Construir frameworks de automatización desde cero e integrarlos en CI/CD como quality gates reales, no como algo de último momento.',
  'Scaling': 'Escalado',
  'Grow and coach QA teams, aligning strategy and standards across every product squad.':
    'Hacer crecer y acompañar equipos de QA, alineando estrategia y estándares en todos los squads de producto.',

  // Experience
  'A career built around quality.': 'Una carrera construida en torno a la calidad.',
  'Sep 2026 – Present': 'Sep 2026 – Actualidad',
  'Leading the effort to build an AI agent-based Quality Enabler framework that converts requirements directly into test plans and automated tests covering their flows.':
    'Lidero el desarrollo de un framework Quality Enabler basado en agentes de IA que convierte los requerimientos directamente en planes de prueba y tests automatizados que cubren sus flujos.',
  'Feb 2024 – Aug 2026': 'Feb 2024 – Ago 2026',
  'Reduced regression testing time by 75% by integrating a mobile automation suite into GitHub Actions, enabling daily release cycles instead of weekly.':
    'Reduje el tiempo de regresión un 75% al integrar una suite de automatización mobile en GitHub Actions, lo que permitió ciclos de release diarios en lugar de semanales.',
  'Increased release predictability by 80% by rebuilding the QA workload estimation process.':
    'Aumenté la previsibilidad de los releases un 80% al rediseñar el proceso de estimación de carga de trabajo de QA.',
  'Cut functional testing rework by 20% by introducing shift-left testing practices.':
    'Reduje el retrabajo en testing funcional un 20% al introducir prácticas de testing shift-left.',
  'Jul 2022 – Dec 2023': 'Jul 2022 – Dic 2023',
  'Improved team productivity by 50% by building an end-to-end Playwright automation framework from scratch.':
    'Mejoré la productividad del equipo un 50% al construir desde cero un framework de automatización end-to-end con Playwright.',
  'Reduced defects reaching QA by 20% by embedding automated checks earlier in the pipeline.':
    'Reduje un 20% los defectos que llegaban a QA al incorporar verificaciones automáticas más temprano en el pipeline.',
  'Oct 2020 – Jul 2022': 'Oct 2020 – Jul 2022',
  'Increased automation ROI by 80% by eliminating low-value flaky tests through daily monitoring.':
    'Aumenté el ROI de automatización un 80% al eliminar tests inestables (flaky) de poco valor mediante monitoreo diario.',
  'Led and coached a QA team of 12 engineers across multiple product squads.':
    'Lideré y acompañé a un equipo de QA de 12 ingenieros en varios squads de producto.',
  'Jun 2016 – Aug 2020': 'Jun 2016 – Ago 2020',
  'Reduced production issues by 50% by rolling out QA processes for a team built from zero to 10 engineers.':
    'Reduje los incidentes en producción un 50% al implementar procesos de QA para un equipo que hice crecer de cero a 10 ingenieros.',
  'Cut rework from 40% to 20% by defining clearer acceptance criteria and definition-of-done standards.':
    'Reduje el retrabajo del 40% al 20% al definir criterios de aceptación y estándares de definition-of-done más claros.',
  'Aug 2007 – Jun 2016': 'Ago 2007 – Jun 2016',
  'Reduced development error rate by 40% by introducing root-cause analysis into defect resolution.':
    'Reduje la tasa de errores de desarrollo un 40% al incorporar el análisis de causa raíz en la resolución de defectos.',
  'Managed a distributed QA team of 10 engineers across multiple countries.':
    'Gestioné un equipo de QA distribuido de 10 ingenieros en varios países.',

  // Case studies
  'Selected work': 'Proyectos destacados',
  'Three problems, three systems built to solve them.': 'Tres problemas, tres sistemas construidos para resolverlos.',
  'Case study — Flex': 'Caso de estudio — Flex',
  'From monthly to weekly releases at fintech speed': 'De releases mensuales a semanales a velocidad fintech',
  'Challenge:': 'Desafío:',
  'Approach:': 'Enfoque:',
  'Outcome:': 'Resultado:',
  'A rent-payment fintech shipping weekly, with mobile regression eating days before every release.':
    'Una fintech de pagos de alquiler que lanzaba cada semana, con una regresión mobile que consumía días antes de cada release.',
  'Designed and integrated a mobile automation suite directly into GitHub Actions, rebuilt the QA workload estimation process, and introduced shift-left checks earlier in development.':
    'Diseñé e integré una suite de automatización mobile directamente en GitHub Actions, rediseñé el proceso de estimación de carga de QA e introduje verificaciones shift-left más temprano en el desarrollo.',
  'Regression time cut 75%, unlocking daily release cycles instead of weekly, with 80% more predictable delivery forecasts.':
    'El tiempo de regresión bajó un 75%, lo que habilitó ciclos de release diarios en lugar de semanales, con pronósticos de entrega un 80% más predecibles.',
  '75% faster regression → daily releases': '75% menos de regresión → releases diarios',
  'Case study — Almanac': 'Caso de estudio — Almanac',
  'Automation built from zero': 'Automatización construida desde cero',
  'An async collaboration platform relying entirely on manual regression testing, slowing every release.':
    'Una plataforma de colaboración asíncrona que dependía por completo de regresión manual, lo que frenaba cada release.',
  'Built an end-to-end Playwright/TypeScript automation framework from scratch and embedded automated checks earlier in the development pipeline.':
    'Construí desde cero un framework de automatización end-to-end con Playwright/TypeScript e incorporé verificaciones automáticas más temprano en el pipeline de desarrollo.',
  'Team productivity improved 50%, with 20% fewer defects reaching QA.':
    'La productividad del equipo mejoró un 50%, con un 20% menos de defectos llegando a QA.',
  '0 → full E2E framework, 50% productivity gain': 'De 0 a un framework E2E completo, 50% más de productividad',
  'Case study — dLocal': 'Caso de estudio — dLocal',
  'Scaling quality across squads': 'Escalando la calidad entre squads',
  'A fintech unicorn\'s growing automation suite was accumulating flaky, low-value tests, eroding trust in CI signal across multiple product squads.':
    'La suite de automatización en crecimiento de un unicornio fintech acumulaba tests inestables y de poco valor, lo que erosionaba la confianza en la señal de CI en varios squads de producto.',
  'Implemented daily flaky-test monitoring to identify and eliminate low-value tests, and led and coached a 12-engineer QA team through cross-team knowledge-transfer sessions.':
    'Implementé un monitoreo diario de tests inestables para identificar y eliminar los de poco valor, y lideré y acompañé a un equipo de QA de 12 ingenieros con sesiones de transferencia de conocimiento entre equipos.',
  'Automation ROI increased 80%, with 20% better cross-team efficiency.':
    'El ROI de automatización aumentó un 80%, con un 20% más de eficiencia entre equipos.',
  '80% automation ROI across 12 engineers': '80% de ROI de automatización con 12 ingenieros',

  // Education
  'Education': 'Formación',
  'Building the technical foundation.': 'Construyendo la base técnica.',
  'Software Engineering': 'Ingeniería de Software',
  'Universidad de la República': 'Universidad de la República',
  'Software Testing Leader': 'Líder en Testing de Software',
  'Languages:': 'Idiomas:',
  'Spanish (native) · English (professional working proficiency) · Portuguese · German':
    'Español (nativo) · Inglés (competencia profesional de trabajo) · Portugués · Alemán',

  // Process
  'How quality moves': 'Cómo se mueve la calidad',
  'Quality is a process, not a phase.': 'La calidad es un proceso, no una fase.',
  'Discover': 'Descubrir',
  'Understand the risk before writing a single test.': 'Entender el riesgo antes de escribir un solo test.',
  'Define': 'Definir',
  'Set production-readiness criteria and definition-of-done.': 'Fijar los criterios de preparación para producción y la definition-of-done.',
  'Automate': 'Automatizar',
  'Build frameworks that scale with the codebase, not against it.': 'Construir frameworks que escalen con el código, no en su contra.',
  'Monitor': 'Monitorear',
  'Track flaky tests and quality metrics as a living signal.': 'Seguir los tests inestables y las métricas de calidad como una señal viva.',
  'Improve': 'Mejorar',
  'Feed production learnings back into strategy.': 'Devolver los aprendizajes de producción a la estrategia.',

  // Recommendations
  'Working with Diego': 'Trabajar con Diego',
  'Here\'s what the people I\'ve worked with say.': 'Esto dicen las personas con las que he trabajado.',
  'Ownership & composure': 'Responsabilidad y templanza',
  'He didn\'t just execute on what was asked. He genuinely cared about the quality of the product and brought that perspective into every test, every bug report, and every team conversation.':
    'No se limitó a ejecutar lo que se le pedía. Le importaba de verdad la calidad del producto y llevó esa perspectiva a cada test, cada reporte de bug y cada conversación del equipo.',
  'Head of Quality Engineering, managed Diego directly at Flex': 'Head of Quality Engineering, fue el manager directo de Diego en Flex',
  'September 2026': 'Septiembre de 2026',
  'Reliability & craft': 'Confiabilidad y oficio',
  'One of the best QA engineers I\'ve ever had the pleasure of working with… Diego is intelligent, reliable, detail oriented, and a great communicator.':
    'Uno de los mejores ingenieros de QA con los que tuve el placer de trabajar… Diego es inteligente, confiable, detallista y un gran comunicador.',
  'CEO & Cofounder, Blaze, worked with Diego at Almanac and Blaze': 'CEO y cofundador de Blaze, trabajó con Diego en Almanac y Blaze',
  'December 2023': 'Diciembre de 2023',
  'Leadership & initiative': 'Liderazgo e iniciativa',
  'Diego was the champion for several internal initiatives that made our quality and development processes better, like our automated end-to-end suite of tests that shortened our deployment times.':
    'Diego fue el impulsor de varias iniciativas internas que mejoraron nuestros procesos de calidad y desarrollo, como nuestra suite automatizada de tests end-to-end que acortó los tiempos de despliegue.',
  'Co-Founder & Managing Partner, Trupropel, managed Diego directly': 'Cofundador y Managing Partner de Trupropel, fue el manager directo de Diego',
  'August 2020': 'Agosto de 2020',
  'Recommendations excerpted from': 'Recomendaciones extraídas de',

  // Contact / footer
  'Let\'s fix your testing problem — for good.': 'Resolvamos tu problema de testing, de una vez por todas.',
  'From flaky test suites to shift-left strategy, I help teams ship faster with fewer surprises.':
    'Desde suites de tests inestables hasta estrategia shift-left, ayudo a los equipos a entregar más rápido y con menos sorpresas.',
  '"Quality is not the last step. It\'s part of how you build."': '"La calidad no es el último paso. Es parte de cómo se construye."',
  'Diego Gawenda. Built with plain HTML, CSS & JS —': 'Diego Gawenda. Hecho con HTML, CSS y JS puro —',
  'source on GitHub': 'código fuente en GitHub',
};

const pageMeta = {
  title: 'Diego Gawenda — Principal Quality Engineer · Testing Aumentado con IA',
  description:
    'Diego Gawenda — Principal Quality Engineer especializado en Testing Aumentado con IA. Más de 15 años impulsando la estrategia de testing, la arquitectura de automatización y el crecimiento de equipos en fintech y SaaS.',
};

// Inline SVG flags (emoji flags don't render on Windows). The button shows the
// flag and name of the language you would switch TO.
const FLAGS = {
  es: '<svg class="lang-flag" viewBox="0 0 750 500" width="20" height="14" aria-hidden="true" focusable="false"><rect width="750" height="500" fill="#AA151B"/><rect y="125" width="750" height="250" fill="#F1BF00"/></svg>',
  en: '<svg class="lang-flag" viewBox="0 0 60 30" width="24" height="12" aria-hidden="true" focusable="false"><clipPath id="flagGbBox"><path d="M0,0 v30 h60 v-30 z"/></clipPath><clipPath id="flagGbCorners"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath><g clip-path="url(#flagGbBox)"><path d="M0,0 v30 h60 v-30 z" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#flagGbCorners)" stroke="#C8102E" stroke-width="4"/><path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/><path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/></g></svg>',
};

const langSwitch = {
  // Current language -> what the button offers
  en: { target: 'es', name: 'Español', code: 'ES', aria: 'Ver este sitio en español' },
  es: { target: 'en', name: 'English', code: 'EN', aria: 'View this site in English' },
};

const dictionaries = { es };
const ATTRS = ['aria-label', 'alt'];
const normalise = (s) => s.replace(/\s+/g, ' ').trim();

const originalText = new WeakMap(); // Text node -> its English data
const originalAttrs = new WeakMap(); // Element -> { attr: English value }
const english = { title: document.title, description: null };

let current = 'en';

function translateText(node, dict) {
  if (!originalText.has(node)) originalText.set(node, node.data);
  const source = originalText.get(node);
  const hit = dict && dict[normalise(source)];
  if (!hit) {
    node.data = source;
    return;
  }
  const lead = source.match(/^\s*/)[0];
  const trail = source.match(/\s*$/)[0];
  node.data = lead + hit + trail;
}

function translateAttrs(el, dict) {
  ATTRS.forEach((attr) => {
    if (!el.hasAttribute(attr)) return;
    const saved = originalAttrs.get(el) || {};
    if (!(attr in saved)) saved[attr] = el.getAttribute(attr);
    originalAttrs.set(el, saved);
    const hit = dict && dict[normalise(saved[attr])];
    el.setAttribute(attr, hit || saved[attr]);
  });
}

function applyLanguage(lang) {
  const dict = dictionaries[lang] || null;
  current = dict ? lang : 'en';

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) =>
      n.parentElement && !['SCRIPT', 'STYLE'].includes(n.parentElement.tagName) && n.data.trim()
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT,
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((n) => translateText(n, dict));
  document.querySelectorAll('[aria-label], [alt]').forEach((el) => translateAttrs(el, dict));

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && english.description === null) english.description = metaDesc.content;
  document.title = dict ? pageMeta.title : english.title;
  if (metaDesc) metaDesc.content = dict ? pageMeta.description : english.description;

  document.documentElement.lang = current;

  const toggle = document.getElementById('langToggle');
  if (toggle) {
    const next = langSwitch[current];
    toggle.innerHTML =
      FLAGS[next.target] +
      `<span class="lang-name">${next.name}</span><span class="lang-code">${next.code}</span>`;
    toggle.setAttribute('aria-label', next.aria);
    toggle.setAttribute('lang', next.target);
  }

  document.dispatchEvent(new CustomEvent('i18n:change', { detail: { lang: current } }));
}

function storedLanguage() {
  try {
    const fromUrl = new URLSearchParams(location.search).get('lang');
    if (fromUrl && (fromUrl === 'en' || dictionaries[fromUrl])) return fromUrl;
    return localStorage.getItem('lang');
  } catch (err) {
    return null;
  }
}

function saveLanguage(lang) {
  try {
    localStorage.setItem('lang', lang);
  } catch (err) {
    // Storage can be blocked (private mode); the switch still works for this visit.
  }
}

/** Translate a runtime string (QA Lab messages). Falls back to English. */
function t(text) {
  const dict = dictionaries[current];
  return (dict && dict[text]) || text;
}

window.i18n = { t, get lang() { return current; }, apply: applyLanguage };

const toggle = document.getElementById('langToggle');
if (toggle) {
  toggle.addEventListener('click', () => {
    const next = current === 'en' ? 'es' : 'en';
    applyLanguage(next);
    saveLanguage(next);
  });
}

const initial = storedLanguage();
if (initial && initial !== 'en') applyLanguage(initial);
