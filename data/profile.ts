/* ============================================================
   EDIT THIS FILE to update the site's content.
   ============================================================ */

export const profile = {
  name: { first: "Sahil", last: "Bhat" },
  tagline: "senior software engineer",
  email: "sahilb911@gmail.com",
  phone: "+916006127768",
  phoneDisplay: "+91 6006127768",

  /* Shown on the RANDOM STATS page. SA had a FAT stat; now you do too. */
  bodyFatPercent: 18,

  /* Fallback career totals for the Messi card. The page also tries a live
     lookup from TheSportsDB (free API) for bio/team info. If you get an
     API-Football key (api-football.com), wire it in app/random-stats/page.tsx. */
  messi: {
    goals: 916,
    assists: 410,
    matches: 1157,
    asOf: "July 2026",
  },
};

/* MAP page — waypoints on the full-earth map */
export const locations = [
  {
    id: "gurgaon",
    label: "Current safehouse",
    place: "Gurugram, Haryana",
    lat: 28.4595,
    lng: 77.0266,
    color: "#d8a929",
    blurb: "Present base of operations. Senior Software Engineer @ EZ Lab.",
  },
  {
    id: "jammu",
    label: "Home turf",
    place: "Jammu, Jammu & Kashmir",
    lat: 32.7266,
    lng: 74.857,
    color: "#5cab6d",
    blurb: "Where it all started. Home.",
  },
  {
    id: "mumbai",
    label: "College",
    place: "St. Francis Institute of Technology, Mumbai",
    lat: 19.244,
    lng: 72.8511,
    color: "#4a7fd1",
    blurb: "Bachelor of Engineering, Information Technology. Also: Orrigem & Helper4U.",
  },
];

/* EXPERIENCE — work history (most recent first) */
export const experience: {
  company: string;
  role: string;
  period: string;
  place: string;
  url?: string;
  points: string[];
}[] = [
  {
    company: "EZ Lab Private Limited",
    role: "Senior Software Engineer",
    period: "Oct 2023 – Present",
    place: "Gurugram",
    url: "https://www.ez.works/",
    points: [
      "Led frontend architecture — component design, state strategy, and feature delivery across cross-functional teams.",
      "Shipped a reusable component library adopted across 8 product surfaces, cutting feature development time ~30%.",
      "Architected the end-to-end GraphQL data layer (PostGraphile, PostgreSQL, Express, Apollo) — client data round-trips down ~40%.",
      "Bundle size down ~35%; LCP from 4.1s → 1.8s via code splitting and lazy loading.",
      "Built a proprietary secure file-transfer platform with multi-layered access control (Delivery ID + single-use Secure Keys).",
    ],
  },
  {
    company: "Orrigem",
    role: "Frontend Engineer",
    period: "Sep 2020 – Sep 2023",
    place: "Mumbai",
    points: [
      "Built and maintained responsive web apps across home decor, personal branding, and e-commerce — pixel-perfect UIs in React.",
      "Implemented scalable state management with Redux and Context API for complex, multi-step user flows.",
      "Partnered with QA and design to ship 15+ client launches over 3 years.",
    ],
  },
  {
    company: "Helper4U",
    role: "Software Engineer",
    period: "May 2019 – Nov 2019",
    place: "Mumbai",
    points: [
      "Built a full-featured blogging platform from scratch — reusable React components, auth, rich-text editor, tag/category system.",
      "Recognized for performance and promoted from intern to full-time.",
    ],
  },
];

/* SKILLS — grouped exactly like the resume */
export const skillGroups: { title: string; items: string[] }[] = [
  {
    title: "Frontend",
    items: [
      "React", "Next.js", "TypeScript", "JavaScript (ES6+)", "Redux Toolkit",
      "Tailwind CSS", "SCSS", "Radix UI", "shadcn/ui", "Storybook", "TipTap",
      "Framer Motion", "HTML5", "CSS3", "a11y", "ARIA", "Core Web Vitals",
    ],
  },
  {
    title: "Data & APIs",
    items: [
      "GraphQL", "PostGraphile", "Apollo Client", "REST", "WebSockets",
      "Server-Sent Events", "Pusher", "Caching & optimistic updates", "Zod",
    ],
  },
  {
    title: "Architecture & Security",
    items: [
      "Frontend architecture", "System design", "Code splitting", "Lazy loading",
      "Virtualization", "Design systems", "RLS", "RBAC", "JWT", "Depth limiting",
    ],
  },
  {
    title: "Backend & Tooling",
    items: [
      "Node.js", "Express", "Bun", "Elysia", "Drizzle ORM", "PostgreSQL",
      "MySQL", "Redis", "Firebase", "Vite", "Webpack", "Docker", "CircleCI", "Git",
    ],
  },
];

/* Main company */
export const company = { name: "EZ Works", url: "https://www.ez.works/" };

/* PROJECTS — highlighted work (matches the resume) */
export const projects: {
  name: string;
  tag: string;
  url?: string;
  blurb: string;
  points: string[];
}[] = [
  {
    name: "EZ Workspace",
    tag: "Real-time SaaS workflow platform (JIRA alternative)",
    url: "https://www.theezlab.com/login",
    blurb: "Owned the product frontend end-to-end and led its architecture for a real-time SaaS workflow platform used by enterprise clients.",
    points: [
      "Architected a frontend-owned GraphQL data layer (PostGraphile, PostgreSQL, Express, Apollo) — client round-trips ~40%; hardened with RLS, per-request RBAC, persisted queries, and depth limiting.",
      "Built real-time chat (Bun, Elysia, Drizzle) and app-wide live updates via Pusher with targeted Apollo cache invalidation and push notifications.",
      "Delivered a Gmail-style communication module (TipTap composer, multiple signatures, webhook ingestion, HTML sanitization).",
      "Integrated an AI copilot for natural-language actions and AI document tools (translate/split PPT, PDF, Excel) streamed over Server-Sent Events.",
      "Shipped a reusable component library (Radix UI, CVA, Storybook) across 8 surfaces (~30% faster delivery); bundle ~35%↓, LCP 4.1s → 1.8s; CI/CD via Docker + CircleCI with feature flags.",
    ],
  },
  {
    name: "EZ Secure Transfer",
    tag: "Secure file transfer platform",
    url: "https://ai.ez.works/en",
    blurb: "Designed and built a proprietary secure file-sharing platform for enterprise clients.",
    points: [
      "Multi-layered access control (Delivery ID + single-use Secure Keys) for sensitive transfers.",
      "Integrated AI-powered tooling, polling, advanced security checks, and assignment tracking.",
      "Partnered closely with backend and security teams on robust file-access workflows.",
    ],
  },
  {
    name: "Helper4U Blog",
    tag: "First build",
    blurb: "The first job. Built from scratch, clean enough to earn a full-time offer.",
    points: [
      "Reusable React components, authentication, rich-text editor, and a tag/category system.",
    ],
  },
];

/* Social links. Replace the URLs with your real profiles. */
export const socials = [
  { id: "linkedin", label: "LinkedIn", handle: "Sahil Bhat", url: "https://www.linkedin.com/in/sahil-bhat-11055a179/", color: "#4a7fd1", note: "Work history and the professional side." },
  { id: "instagram", label: "Instagram", handle: "@sahiil911", url: "https://www.instagram.com/sahiil911", color: "#c2571c", note: "Life outside the editor." },
];
