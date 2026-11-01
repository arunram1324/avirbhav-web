import { Injectable, inject, signal, computed } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { COURSE_CATALOG, CourseDetailData, getCourseByIdOrSlug } from '../data/course-catalog.data';
import { FirebaseService, InquiryData } from './firebase.service';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  program: string;
  source: string;
  createdAt: string;
  status: 'New' | 'Contacted' | 'Enrolled' | 'Closed';
  notes?: string;
}

export interface JobListing {
  id: string;
  title: string;
  companyName: string;
  companyLogo?: string;
  department: 'Performance Marketing' | 'SEO & Growth' | 'Content & Creative' | 'Mentorship & Academy' | 'Business Development';
  location: string;
  type: 'Full Time' | 'Hybrid' | 'Remote' | 'Fellowship';
  experience: string;
  salary: string;
  deadline: string;
  urgentBadge?: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  perks: string[];
  source: 'Avirbhav' | 'LinkedIn' | 'Naukri' | 'Indeed' | 'Apna' | 'Shine' | 'Google';
  sourceUrl?: string;
  postedDate?: string;
  isFresherFriendly?: boolean;
}

export interface AboutValueItem {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

export interface AboutPageContent {
  heroBadge: string;
  heroTagline: string;
  heroTitle: string;
  heroDescription: string;
  heroCtaText: string;

  stat1Value: string;
  stat1Label: string;
  stat1Desc: string;
  stat2Value: string;
  stat2Label: string;
  stat2Desc: string;
  stat3Value: string;
  stat3Label: string;
  stat3Desc: string;
  stat4Value: string;
  stat4Label: string;
  stat4Desc: string;

  storyBadge: string;
  storyTitle: string;
  storyP1: string;
  storyP2: string;
  storyP3: string;
  guaranteeBadge: string;
  guaranteeText: string;

  incubationBadge: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  hqAddress: string;

  valuesBadge: string;
  valuesTitle: string;
  valuesSubtitle: string;
  values: AboutValueItem[];

  leadershipBadge: string;
  leadershipTitle: string;
  leadershipSubtitle: string;
  mentor1Name: string;
  mentor1Role: string;
  mentor1Bio: string;
  mentor1Tags: string[];
  mentor2Name: string;
  mentor2Role: string;
  mentor2Bio: string;
  mentor2Tags: string[];

  closingBadge: string;
  closingTitle: string;
  closingDesc: string;
  closingCtaText: string;
}

export interface CareerPerkItem {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

export interface CareerQuoteItem {
  id: string;
  name: string;
  role: string;
  initials: string;
  quote: string;
}

export interface CareerPageContent {
  heroBadge: string;
  heroTagline: string;
  heroTitle: string;
  heroDescription: string;

  ethosBadge: string;
  ethosTitle: string;
  ethosP1: string;
  ethosP2: string;

  perksBadge: string;
  perksTitle: string;
  perksSubtitle: string;
  perks: CareerPerkItem[];

  quotesBadge: string;
  quotesTitle: string;
  quotesSubtitle: string;
  quotes: CareerQuoteItem[];

  closingBadge: string;
  closingTitle: string;
  closingDesc: string;
  closingBtnText: string;
}

export interface ModuleItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  metric: string;
  metricLabel: string;
  desc: string;
  icon: string;
  gradient: string;
  iconBg: string;
  deliverables: string[];
}

export interface AssetItem {
  id: string;
  title: string;
  category: 'logo' | 'mentor' | 'poster' | 'badge' | 'document';
  url: string;
  alt: string;
  size?: string;
  assignedTo?: string;
  createdAt: string;
}

export interface SiteContent {
  // Announcement Ticker
  announcementText: string;
  announcementTag: string;
  announcementHighlight: string;
  showAnnouncement: boolean;

  // Hero Section
  heroHeadline: string;
  heroSubheading: string;
  heroCtaText: string;
  heroBadge: string;

  // Blue Stats Banner
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  valueText: string;
  floatingTags: string[];

  // Curriculum & Guaranteed Benefits
  curriculumHeading: string;
  curriculumSubheading: string;
  benefits: string[];
  starterPackTitle: string;
  starterPackDesc: string;
  starterPackCta: string;

  // Mentor Spotlight (Deekshith)
  mentorName: string;
  mentorRole: string;
  mentorBio: string;
  mentorBadge: string;
  mentorAdBudgets: string;
  mentorImage: string;

  // Contact & Footer
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  admissionsStatus: string;
  copyrightText: string;
  siteLogoUrl: string;
}

export interface SeoConfig {
  title: string;
  metaDescription: string;
  metaKeywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
  author: string;
  robots: string;
}

export interface SiteBackupData {
  version: string;
  exportedAt: string;
  leads: Lead[];
  courses: ModuleItem[];
  courseCatalog: Record<string, CourseDetailData>;
  assets: AssetItem[];
  siteContent: SiteContent;
  seoConfig: SeoConfig;
}

export interface SiteSnapshot {
  id: string;
  version: string; // e.g. "v4.3.0"
  title: string;
  description: string;
  createdAt: string;
  isLive: boolean;
  author: string;
  highlights: string[];
  dataSnapshot?: SiteBackupData;
}

export interface AutoReplySettings {
  subjectTemplate: string;
  bodyTemplate: string;
  enabled: boolean;
}

export const DEFAULT_ABOUT_CONTENT: AboutPageContent = {
  heroBadge: 'About Avirbhav Digital Academy',
  heroTagline: 'Powered by Avirbhav Infotech Agency',
  heroTitle: 'We’re not just a digital academy — we’re your unfair career advantage.',
  heroDescription: "At Avirbhav, we believe traditional digital marketing education is broken. You don't master ROAS through PowerPoint slides — you master it by spending live client money, breaking through creative fatigue, and mastering Generative AI.",
  heroCtaText: 'Book Free 1:1 Strategy Audit',

  stat1Value: '4 ONLY',
  stat1Label: 'Strict Students / Batch',
  stat1Desc: 'Zero mass-classroom batches. 100% individual mentor oversight.',
  stat2Value: '₹10L+',
  stat2Label: 'Live Ad Spend Deployed',
  stat2Desc: 'Real commercial budgets on Meta Ads & Google PMax.',
  stat3Value: '100%',
  stat3Label: 'Placement Track Record',
  stat3Desc: 'Guaranteed agency placement or your full fee refunded.',
  stat4Value: '30+',
  stat4Label: 'Industry Stack Mastered',
  stat4Desc: 'Meta CAPI, GA4, GTM, Claude 3.5, ChatGPT-4o & Midjourney.',

  storyBadge: 'Our Founding Philosophy',
  storyTitle: 'Why We Founded Avirbhav Digital Academy.',
  storyP1: `In 2024, our founders Deekshith and Arun observed a disturbing pattern across South India's hiring landscape. While thousands of graduates held certificates in "Digital Marketing", 9 out of 10 candidates couldn't navigate Meta Ads Manager, couldn't set up a Facebook Pixel Conversions API, and had never spent a single rupee of real ad budget.`,
  storyP2: `Traditional institutes operated like factories — cramming 40 to 60 students into lecture halls, teaching theoretical definitions, and leaving them stranded with zero live portfolio proof.`,
  storyP3: `We built Avirbhav Digital Academy to be the exact opposite. We capped our batch size at strictly 4 students per cohort, handed each student live client ad budgets, and trained them using the exact SOPs, spreadsheet models, and GenAI pipelines our parent agency uses to scale D2C brands.`,
  guaranteeBadge: 'The 150-Day Guarantee',
  guaranteeText: 'If you attend all mentorship sessions, deploy your required campaign budgets, and do not secure an agency offer or paid retainer within 150 days, we continue working with you 1:1 until you do — guaranteed.',

  incubationBadge: 'Agency Incubation Model',
  step1Title: 'Month 1 – 2: Algorithmic Foundations',
  step1Desc: 'Audience psychology, creative hooks, pixel setup & GTM.',
  step2Title: 'Month 3 – 4: Live Client Budgets & Scale',
  step2Desc: 'Deploying real cash, testing 10x ad variations with AI.',
  step3Title: 'Month 5: Placement & Retainer Closing',
  step3Desc: 'Mock agency audits, portfolio defense, offer negotiation.',
  hqAddress: 'Nehru Nagar, Perungudi, OMR, Chennai - 600041',

  valuesBadge: 'Core Values',
  valuesTitle: 'The Non-Negotiable Standards That Guide Everything We Do.',
  valuesSubtitle: 'Inspired by top performance creative studios, we cultivate operators who prioritize commercial outcomes above vanity metrics.',
  values: [
    { id: 'v1', title: '1. Commercial Stakes', desc: 'No simulated dummy tests. You learn marketing by managing real money, feeling the adrenaline of conversion drops, and optimizing for real profit.', icon: '01' },
    { id: 'v2', title: '2. Radical Transparency', desc: 'We share unedited ad dashboards, real client ROAS numbers, and full breakdowns of campaign failures so you develop genuine judgment.', icon: '02' },
    { id: 'v3', title: '3. AI-Native Velocity', desc: 'We don\'t reject AI — we integrate it. Every graduate masters prompt chaining in Claude 3.5 and Midjourney to outpace entire traditional creative departments.', icon: '03' },
    { id: 'v4', title: '4. Micro-Cohort Dedication', desc: 'Restricting every batch to strictly 4 students ensures your mentor audits your specific campaigns line-by-line every single day.', icon: '04' },
    { id: 'v5', title: '5. Lifetime Network', desc: 'Graduation isn\'t the finish line. Alumni gain ongoing access to our private WhatsApp dealflow group, agency SOP library, and retainer referrals.', icon: '05' },
    { id: 'v6', title: '6. Proof Over Paper', desc: 'We don\'t hand you a laminated certificate. We hand you a live portfolio of 4 audited campaigns with verified ROAS metrics that hiring managers fight over.', icon: '06' }
  ],

  leadershipBadge: 'Agency Leadership',
  leadershipTitle: 'Mentored by Active Agency Operators.',
  leadershipSubtitle: 'Learn directly from the practitioners managing real brands and six-figure media spend daily.',
  mentor1Name: 'Deekshith',
  mentor1Role: 'FOUNDER & PRINCIPAL MEDIA BUYER',
  mentor1Bio: 'Spearheaded performance acquisition for D2C e-commerce brands, managing over ₹10L+ in monthly ad budgets. Personally oversees every student\'s campaign architecture, CBO budgeting, and conversion funnel optimization.',
  mentor1Tags: ['Meta CAPI Master', 'Google Ads PMax', 'D2C Scaling'],
  mentor2Name: 'Arun K R',
  mentor2Role: 'CO-FOUNDER & AGENCY OPERATIONS LEAD',
  mentor2Bio: 'Architect of agency workflows, client retainer contracts, and placement pipelines. Coordinates with hiring agencies across Chennai & Bengaluru to guarantee 100% placement outcomes for graduating cohorts.',
  mentor2Tags: ['Agency Placement', 'Retainer Strategy', 'Brand Systems'],

  closingBadge: 'STRICTLY 4 SEATS PER COHORT',
  closingTitle: 'Ready to Build a High-Income Career in Tech?',
  closingDesc: "Speak directly with Deekshith. We'll audit your background, examine your goals, and give you an honest appraisal of whether digital performance marketing is right for you.",
  closingCtaText: 'Book Free Strategy Call'
};

export const DEFAULT_CAREER_CONTENT: CareerPageContent = {
  heroBadge: 'Career at Avirbhav',
  heroTagline: 'Grow Your Marketing & Mentorship Career',
  heroTitle: 'Build Work That Actually Matters.',
  heroDescription: 'Join a team focused on strategy, creativity, and real impact — not just deliverables. We are a full-service marketing agency and micro-cohort academy where every member plays a vital role in helping brands scale.',

  ethosBadge: 'Our Culture & Ethos',
  ethosTitle: 'Where Creativity Meets Intentional Strategy.',
  ethosP1: 'At Avirbhav, we believe the best work happens when creativity meets purpose. We are a full-service marketing agency where collaboration fuels innovation, and every team member plays a vital role in helping brands grow with intention and impact.',
  ethosP2: 'From strategic storytelling to performance-driven campaigns, we blend insight with execution — turning ideas into measurable, audited results for the brands and cohorts we serve.',

  perksBadge: 'Why Join Avirbhav',
  perksTitle: 'Perks Designed for High-Performance Growth.',
  perksSubtitle: 'We treat our team like long-term partners, investing in your tools, wellbeing, and financial growth.',
  perks: [
    { id: 'p1', title: 'Competitive Pay + Retainer Bonuses', desc: 'Market-leading base salaries supplemented by transparent revenue-share bonuses on client retainers and student cohort placement milestones.', icon: '01' },
    { id: 'p2', title: 'Sponsored AI & Creative Stack', desc: 'Full enterprise accounts for ChatGPT-4o, Claude 3.5 Sonnet, Midjourney, Foreplay, Motion, and SEMrush — no personal subscription expenses.', icon: '02' },
    { id: 'p3', title: 'Hybrid & Remote Flexibility', desc: 'Flexible remote days with access to our modern, air-conditioned creator hub in Perungudi, Chennai (OMR tech corridor).', icon: '03' },
    { id: 'p4', title: 'Fast-Track Leadership Tracks', desc: 'Zero bureaucratic red tape. High performers progress rapidly from Campaign Associate to Cohort Mentor and Agency Account Partner.', icon: '04' },
    { id: 'p5', title: 'Continuous Upskilling & Events', desc: 'Sponsored passes to major growth marketing summits across India and 100% reimbursement for approved technical certifications.', icon: '05' },
    { id: 'p6', title: 'High-Vibe Culture & Subsidies', desc: 'High-speed optical fiber, endless artisan coffee, catered lunches on cohort review days, and team retreats.', icon: '06' }
  ],

  quotesBadge: 'Team Perspectives',
  quotesTitle: 'Hear From Our Team & Mentors.',
  quotesSubtitle: 'Honest feedback from the people shaping our agency campaigns and student cohorts.',
  quotes: [
    { id: 'q1', name: 'Sarah Jenkins', role: 'Director of Performance Strategy', initials: 'SJ', quote: 'From day one, I could feel the difference. The leadership team delivered a clear vision that immediately focused all of us. The growth in our client engagement and student placement metrics was noticeable within my first 60 days.' },
    { id: 'q2', name: 'Alisha Patel', role: 'Head of Paid Media & Mentorship', initials: 'AP', quote: 'What drew me here was the focus on data-driven, audited work. What made me stay is the culture. The leadership actually invests in the tools, AI models, and training we need to do our best work without arbitrary constraints.' }
  ],

  closingBadge: 'READY TO GROW WITH US?',
  closingTitle: "Let's Build Something That Actually Works.",
  closingDesc: "Don't see an open role that fits your exact profile? Send us an open pitch with your past campaign case studies or content portfolio.",
  closingBtnText: 'Pitch Your Dream Role →'
};

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  role: string;
  badge: string;
  image: string;
  bioSnippet: string;
  fullBio: string;
  experienceYears: string;
  social: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    email?: string;
  };
  focusHeadline: string;
  focusDescription: string;
  highlights: string[];
  stepsTitle: string;
  steps: {
    number: string;
    title: string;
    desc: string;
  }[];
  quote: string;
  quoteAuthor: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

export const DEFAULT_TEAM_MEMBERS: TeamMember[] = [
  {
    id: "member_01",
    slug: "deekshith",
    name: "DEEKSHITH",
    role: "Founder & Principal Performance Buyer",
    badge: "Agency Founder & Lead Mentor",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
    bioSnippet: "Oversees ₹10L+ monthly client media budgets across Meta, Google Ads, and programmatic acquisition. Trains students directly on live ad accounts.",
    fullBio: "Deekshith is the founder of Avirbhav Infotech and a high-performance media buyer with 8+ years scaling D2C, B2B SaaS, and high-ticket service brands. Combining deep data architecture with human-centered consumer psychology, he has deployed over ₹5Cr+ in profitable ad spend. In the Academy, Deekshith directly coaches cohorts of 4 students, opening live client ad accounts to teach real-time budget optimization, CAPI server-side event tracking, and high-ROAS creative iteration.",
    experienceYears: "8+ Years",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
      email: "deekshith@avirbhav.com"
    },
    focusHeadline: "The Importance of Performance Marketing",
    focusDescription: "Customized media plans cater to the unique economics of each brand, establishing transparent ROAS targets and conversion tracking from day one.",
    highlights: [
      "Live ₹10L+ Client Ad Account Deployments",
      "Meta Conversions API (CAPI) & Server-side GTM Architecture",
      "Weekly 1:1 Ad Account Portfolio Audits",
      "Agency Retainer Pitching & Client Acquisition Frameworks",
      "100% Guaranteed Agency Placement Pipeline"
    ],
    stepsTitle: "Steps to Starting Mentorship with Deekshith",
    steps: [
      {
        number: "01",
        title: "Discovery & Skills Assessment",
        desc: "We analyze your existing marketing baseline, analytical skills, and career ambitions to design a tailored 150-day learning roadmap."
      },
      {
        number: "02",
        title: "Hands-on Live Account Incubation",
        desc: "Step into active client ad managers with real budgets, setting up custom conversion events, testing ad angles, and scaling winners."
      },
      {
        number: "03",
        title: "Agency Placement & Freelance Retainers",
        desc: "Graduate with an audited portfolio of real campaign proofs and get placed at premier digital agencies earning high-ticket retainers."
      }
    ],
    quote: "“SCALING ADS ISN'T ABOUT LUCK; IT'S SYSTEMATIC DATA-DRIVEN EXECUTION COMBINED WITH RELENTLESS CREATIVE TESTING.”",
    quoteAuthor: "Deekshith, Founder & Principal Buyer",
    metrics: [
      { label: "Ad Spend Managed", value: "₹5Cr+" },
      { label: "Live Campaigns", value: "350+" },
      { label: "Placement Rate", value: "100%" },
      { label: "Avg ROAS", value: "4.8x" }
    ]
  },
  {
    id: "member_02",
    slug: "arun-kr",
    name: "ARUN K R",
    role: "Co-Founder & Operations Director",
    badge: "Co-Founder & Agency Lead",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
    bioSnippet: "Specialist in agency operations, client retention frameworks, and 100% career placement ecosystems with 40+ premier agency partners.",
    fullBio: "Arun K R directs operations, brand systems, and career placement partnerships at Avirbhav Infotech. With a rich background in scaling agency workflows and corporate hiring pipelines, Arun ensures that every Academy student not only learns technical media buying, but also masters executive communication, high-value client reporting, and retainer negotiation. He manages relations with 40+ hiring agency partners across Chennai, Bangalore, and Mumbai.",
    experienceYears: "7+ Years",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
      email: "arunkr@avirbhav.com"
    },
    focusHeadline: "Building Sustainable Agency Operations",
    focusDescription: "True agency success requires repeatable systems, transparent client reporting, and structured retention frameworks.",
    highlights: [
      "Agency Operations & Project Management Systems",
      "Corporate Placement Partnerships with 40+ Top Agencies",
      "Client Retention & Monthly Retainer Upsell Strategies",
      "Mock Agency Technical Interview Simulations",
      "Contract & Proposal Templates for Freelance Media Buyers"
    ],
    stepsTitle: "Steps to Career Placement with Arun",
    steps: [
      {
        number: "01",
        title: "Resume & Portfolio Engineering",
        desc: "Transform your resume into a metric-driven agency showcase with verified case studies and ad spend proofs."
      },
      {
        number: "02",
        title: "Technical Mock Interview Rounds",
        desc: "Undergo rigorous mock interview sessions covering ROAS drops, pixel debugging, and budget allocation scenarios."
      },
      {
        number: "03",
        title: "Direct Placement Matching",
        desc: "Get connected with our verified hiring agency partners with personalized letters of recommendation."
      }
    ],
    quote: "“A GREAT MARKETER KNOWS HOW TO RUN ADS. A COMPLETE AGENCY PROFESSIONAL KNOWS HOW TO RETAIN CLIENTS AND DRIVE PROFITABILITY.”",
    quoteAuthor: "Arun K R, Operations Director",
    metrics: [
      { label: "Partner Agencies", value: "40+" },
      { label: "Students Placed", value: "100%" },
      { label: "Highest Retainer", value: "₹1.2L/m" },
      { label: "Avg Placement Days", value: "14 Days" }
    ]
  },
  {
    id: "member_03",
    slug: "priya-sharma",
    name: "PRIYA SHARMA",
    role: "Lead Performance Creative Strategist",
    badge: "Creative & UGC Lead",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80",
    bioSnippet: "Architect behind 200+ viral high-ROAS creative hooks, UGC scripts, and dynamic Reels/TikTok angle testing.",
    fullBio: "Priya Sharma spearheads creative strategy and video storytelling at Avirbhav. Having scripted and produced over 500+ ad creatives that generated tens of millions in revenue, Priya mentors students on the psychology of visual stopping power, thumbnail optimization, high-converting hooks, and AI-assisted creative workflows using Midjourney, ElevenLabs, and CapCut.",
    experienceYears: "5+ Years",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      instagram: "https://instagram.com",
      email: "priya@avirbhav.com"
    },
    focusHeadline: "Creative Is The New Targeting",
    focusDescription: "Algorithms have commoditized audience targeting; the single biggest lever for 5x ROAS in 2026 is high-velocity creative testing.",
    highlights: [
      "High-Converting 3-Second Hook Architecture",
      "Direct-Response UGC Scripting Frameworks",
      "AI-Powered Creative Generation Workflows",
      "A/B Creative Split-Testing on Live Ad Budgets",
      "E-Commerce Landing Page Conversion Optimization (CRO)"
    ],
    stepsTitle: "Steps to Creative Strategy Mastery",
    steps: [
      {
        number: "01",
        title: "Competitor Creative Mining",
        desc: "Learn how to reverse-engineer top-spending competitors using Meta Ad Library and TikTok Creative Center."
      },
      {
        number: "02",
        title: "Scripting & Hook Engineering",
        desc: "Draft compelling UGC scripts that speak to customer pain points, objections, and emotional triggers."
      },
      {
        number: "03",
        title: "Dynamic Creative Optimization (DCO)",
        desc: "Deploy multi-variant creatives into Meta Ad Manager and analyze Thumb-Stop Rate and CTR."
      }
    ],
    quote: "“THE FIRST 3 SECONDS OF YOUR VIDEO DETERMINE WHETHER YOUR CAMPAIGN SCALES OR BURNS YOUR CLIENT’S BUDGET.”",
    quoteAuthor: "Priya Sharma, Creative Strategist",
    metrics: [
      { label: "Creatives Tested", value: "500+" },
      { label: "Top Hook CTR", value: "6.2%" },
      { label: "D2C Brands Scaled", value: "45+" },
      { label: "Avg Creative ROAS", value: "5.1x" }
    ]
  },
  {
    id: "member_04",
    slug: "vignesh-sundaram",
    name: "VIGNESH SUNDARAM",
    role: "Head of Technical SEO & Tracking",
    badge: "Tracking & Analytics Lead",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80",
    bioSnippet: "Technical tracking wizard specialized in Server-side GTM, GA4 custom dimensions, Meta CAPI, and enterprise SEO.",
    fullBio: "Vignesh Sundaram is our technical architect handling server-side tracking, analytics, and technical search engine optimization. In an era of ad blockers and cookie depreciation, Vignesh guides students on server container setup in Cloud Run/AWS, custom dataLayer architecture, first-party cookie preservation, and schema-driven programmatic SEO.",
    experienceYears: "6+ Years",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      email: "vignesh@avirbhav.com"
    },
    focusHeadline: "Data Accuracy Before Ad Spend",
    focusDescription: "If your tracking loses 30% of conversion signals due to iOS updates, your ad algorithms are flying blind.",
    highlights: [
      "Server-Side Google Tag Manager (sGTM) Deployment",
      "Meta Conversions API (CAPI) Gateway Setup",
      "GA4 Custom Events & Exploration Reports",
      "Core Web Vitals & Page Speed Engineering",
      "Enterprise Schema Markup & Semantic SEO"
    ],
    stepsTitle: "Steps to Tracking Mastery",
    steps: [
      {
        number: "01",
        title: "Analytics Audit & DataLayer Setup",
        desc: "Inspect websites for broken tracking, duplicate triggers, and configure clean custom dataLayers."
      },
      {
        number: "02",
        title: "Cloud Server-Side Deployment",
        desc: "Deploy sGTM containers with custom subdomain routing for 100% first-party cookie resilience."
      },
      {
        number: "03",
        title: "Full Funnel Attribution Modeling",
        desc: "Build comprehensive Looker Studio dashboards tracking blended ROAS, MER, and CAC."
      }
    ],
    quote: "“WHEN YOU GIVE ALGORITHMS 100% ACCURATE CONVERSION SIGNALS, SCALING BECOMES MATHEMATICALLY INEVITABLE.”",
    quoteAuthor: "Vignesh Sundaram, Analytics Lead",
    metrics: [
      { label: "GTM Containers", value: "200+" },
      { label: "Match Quality Score", value: "9.2/10" },
      { label: "Signal Recovery", value: "+38%" },
      { label: "SEO Rankings", value: "#1 Top 100" }
    ]
  }
];

@Injectable({
  providedIn: 'root'
})
export class AcademyDataService {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  private readonly LEADS_STORAGE_KEY = 'avirbhav_leads_data_v1';
  private readonly COURSES_STORAGE_KEY = 'avirbhav_courses_data_v3';
  private readonly CATALOG_STORAGE_KEY = 'avirbhav_catalog_data_v1';
  private readonly ASSETS_STORAGE_KEY = 'avirbhav_assets_data_v1';
  private readonly SITE_CONTENT_KEY = 'avirbhav_site_content_v2';
  private readonly SEO_CONFIG_KEY = 'avirbhav_seo_config_v1';
  private readonly AUTH_STORAGE_KEY = 'avirbhav_admin_auth_v1';
  private readonly SNAPSHOTS_STORAGE_KEY = 'avirbhav_snapshots_v1';
  private readonly ACTIVE_VERSION_KEY = 'avirbhav_active_version_v1';
  private readonly AUTO_REPLY_STORAGE_KEY = 'avirbhav_autoreply_v1';
  private readonly CAREER_ROLES_KEY = 'avirbhav_career_roles_v4';
  private readonly EXTERNAL_JOBS_KEY = 'avirbhav_external_jobs_v4';
  private readonly ABOUT_STORAGE_KEY = 'avirbhav_about_content_v1';
  private readonly CAREER_STORAGE_KEY = 'avirbhav_career_content_v1';
  private readonly SAVED_JOBS_STORAGE_KEY = 'avirbhav_saved_jobs_v1';
  private readonly TEAM_STORAGE_KEY = 'avirbhav_team_members_v1';

  // Reactive state signals
  leads = signal<Lead[]>([]);
  careerRoles = signal<JobListing[]>([]); // 100% Avirbhav Internal Roles for /career
  externalJobs = signal<JobListing[]>([]); // 100% Other Companies for /jobs (Naukri, Apna, LinkedIn, Indeed, Shine)
  jobs = computed<JobListing[]>(() => [...this.careerRoles(), ...this.externalJobs()]); // Unified computed signal for backward compatibility
  savedJobIds = signal<string[]>([]);
  courses = signal<ModuleItem[]>([]);
  aboutContent = signal<AboutPageContent>(DEFAULT_ABOUT_CONTENT);
  careerContent = signal<CareerPageContent>(DEFAULT_CAREER_CONTENT);
  teamMembers = signal<TeamMember[]>([]);
  courseCatalog = signal<Record<string, CourseDetailData>>({});
  assets = signal<AssetItem[]>([]);
  currentVersion = signal<string>('v4.3.0');
  snapshots = signal<SiteSnapshot[]>([]);
  autoReplySettings = signal<AutoReplySettings>({
    subjectTemplate: 'Thank you for reaching out, {{name}}! — Avirbhav Digital Academy',
    bodyTemplate: `Hi {{name}},

Thank you for enquiring about the "{{program}}" with Avirbhav Digital Academy.

Our program features strictly 4 students per batch, hands-on live client ad spends (₹10L+), and guaranteed 100% placement support.

I have received your inquiry and our principal mentor Deekshith will reach out to you directly via WhatsApp or phone call at {{phone}} shortly to schedule your free 1:1 strategy session.

Best regards,
Deekshith & Arun
Avirbhav Digital Academy
Nehru Nagar, Perungudi, Chennai - 600041`,
    enabled: true
  });

  siteContent = signal<SiteContent>({
    announcementText: 'Next Micro-Cohort Starts November 1st • Strictly 4 Students Per Batch',
    announcementTag: 'ADMISSIONS OPEN',
    announcementHighlight: '4 SEATS ONLY',
    showAnnouncement: true,

    heroHeadline: 'Launch Your Digital Marketing\nCareer in 150 Days.',
    heroSubheading: 'Master SEO, Ads, and AI with our agency-style training. Get 100% placement guaranteed —without quitting your day job.',
    heroCtaText: 'Book Now',
    heroBadge: 'Strictly 4 Students Per Batch • 100% Individual Mentorship & Live Ad Spend',

    stat1Value: '10+',
    stat1Label: 'Batches',
    stat2Value: '93%',
    stat2Label: 'Placement Record',
    stat3Value: '220+',
    stat3Label: 'Students Graduated',
    valueText: 'Brand strategy, visual identity, digital campaigns, and media planning — crafted to grow your market share',
    floatingTags: [
      'Clarity in positioning',
      'Performance-Driven Marketing',
      'Media Planning',
      'Growth Systems'
    ],

    curriculumHeading: "What You'll Master in 150 Days",
    curriculumSubheading: 'End-to-end career tracks engineered to take you from a curious beginner to an in-demand performance marketer, media buyer, and freelance growth strategist.',
    benefits: [
      '100% Practical Hands-on Training',
      'Placement Support & Mock Interviews',
      'Live Client Campaign Budgets',
      'Resume & Case Study Portfolio Setup',
      'Recognized Internship Certificate',
      'Tamil + English Dual Explanation'
    ],
    starterPackTitle: 'Get 30+ Performance Marketing SOPs & Ad Templates',
    starterPackDesc: 'Book your free 1:1 strategy slot today and instantly receive our internal agency swipe files.',
    starterPackCta: 'Claim Free Starter Pack ↗',

    mentorName: 'Deekshith',
    mentorRole: 'Founder & Principal Performance Marketing Lead',
    mentorBio: 'Over 8+ years scaling high-growth brands across Chennai & Bangalore. Managed ₹10L+ in profitable Meta & Google Ads budgets with hands-on 1:1 coaching.',
    mentorBadge: 'Top 1% Growth Consultant',
    mentorAdBudgets: '₹10L+ Managed Spend',
    mentorImage: '/images/instructor.png',

    phone: '+91 70104 40863',
    whatsappNumber: '+91 70104 40863',
    email: 'deekshith1996@gmail.com',
    address: 'Nehru Nagar, Perungudi, Chennai, Tamil Nadu - 600041',
    admissionsStatus: 'Admissions Open 2026 • 4 Seats Only',
    copyrightText: '© 2026 Avirbhav Infotech. All Rights Reserved. Crafted with pixel precision.',
    siteLogoUrl: '/images/logo.png'
  });

  seoConfig = signal<SeoConfig>({
    title: 'Avirbhav Infotech — Launch Your Digital Marketing Career in 150 Days',
    metaDescription: 'Master SEO, Meta & Google Ads, and AI Tools with agency-style training at Avirbhav Digital Academy Chennai. 100% placement guarantee.',
    metaKeywords: 'Digital Marketing Course Chennai, SEO Training, Meta Ads Agency, Google Ads, AI Marketing, 150 Days Bootcamp, Avirbhav Infotech',
    ogTitle: 'Avirbhav Digital Academy — 150 Days Digital Marketing Mastery',
    ogDescription: 'Agency-style training in SEO, Performance Ads & AI. 10+ Batches, 93% Placement Record.',
    ogImage: 'https://avirbhavinfotech.com/images/logo.png',
    canonicalUrl: 'https://avirbhavinfotech.com',
    author: 'Avirbhav Infotech',
    robots: 'index, follow'
  });

  // Firebase Service Injection
  firebaseService = inject(FirebaseService);

  // Admin Authentication State
  isAuthenticated = signal<boolean>(false);

  constructor() {
    this.initializeData();
    this.applySeoTags();
  }

  private initializeData(): void {
    // 1. Initialize Auth
    const isAuth = this.getFromStorage<boolean>(this.AUTH_STORAGE_KEY);
    if (isAuth) {
      this.isAuthenticated.set(true);
    }

    // 2. Initialize Leads & Firebase Inquiries Listener
    if (this.firebaseService.isFirebaseConfigured()) {
      this.firebaseService.listenToInquiries((cloudInquiries) => {
        if (cloudInquiries && cloudInquiries.length > 0) {
          const convertedLeads: Lead[] = cloudInquiries.map(inq => ({
            id: inq.id,
            name: inq.name,
            phone: inq.phone,
            email: inq.email,
            program: inq.program || 'Digital Marketing 150 Days',
            source: inq.source || 'Website Contact Form',
            createdAt: typeof inq.createdAt === 'string' ? inq.createdAt : (inq.createdAt ? inq.createdAt.toISOString() : new Date().toISOString()),
            status: inq.status,
            notes: (inq.notes || '') + (inq.message ? ` | Message: ${inq.message}` : '')
          }));
          this.leads.set(convertedLeads);
          this.saveToStorage(this.LEADS_STORAGE_KEY, convertedLeads);
        }
      });
      // Listen to dynamic website_content
      this.loadDynamicContentFromFirestore();
    }

    const savedLeads = this.getFromStorage<Lead[]>(this.LEADS_STORAGE_KEY);
    if (savedLeads && savedLeads.length > 0) {
      this.leads.set(savedLeads);
    } else {
      const defaultLeads: Lead[] = [
        {
          id: 'lead_101',
          name: 'Karthik Subramanian',
          phone: '+91 98401 23456',
          email: 'karthik.s@gmail.com',
          program: 'Digital Marketing 150 Days',
          source: 'Hero Book Now Button',
          createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
          status: 'New',
          notes: 'Looking for weekend batch + placement guidance'
        },
        {
          id: 'lead_102',
          name: 'Priyanka Ramesh',
          phone: '+91 97910 87654',
          email: 'priya.ramesh@outlook.com',
          program: 'Meta & Google Ads Specialist',
          source: 'Course Blueprint Track 03',
          createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
          status: 'Contacted',
          notes: 'Already running e-commerce business in Chennai'
        },
        {
          id: 'lead_103',
          name: 'Vigneshwaran M',
          phone: '+91 94440 98765',
          email: 'vignesh.m@gmail.com',
          program: 'Freelancing Blueprint',
          source: 'Free Starter Pack CTA',
          createdAt: new Date(Date.now() - 3600000 * 42).toISOString(),
          status: 'Enrolled',
          notes: 'Enrolled in 150-day batch, advance fee paid'
        },
        {
          id: 'lead_104',
          name: 'Sneha Venkatesh',
          phone: '+91 98845 11223',
          email: 'sneha.v@yahoo.com',
          program: 'AI Tools for Marketing',
          source: 'Header Programs Dropdown',
          createdAt: new Date(Date.now() - 3600000 * 70).toISOString(),
          status: 'New',
          notes: 'Requested syllabus on WhatsApp'
        }
      ];
      this.leads.set(defaultLeads);
      this.saveToStorage(this.LEADS_STORAGE_KEY, defaultLeads);
    }

    // Team Members Initialization
    const savedTeam = this.getFromStorage<TeamMember[]>(this.TEAM_STORAGE_KEY);
    if (savedTeam && savedTeam.length > 0) {
      this.teamMembers.set(savedTeam);
    } else {
      this.teamMembers.set(DEFAULT_TEAM_MEMBERS);
      this.saveToStorage(this.TEAM_STORAGE_KEY, DEFAULT_TEAM_MEMBERS);
    }

    // 3. Initialize Summary Courses (Home Page 4 Tracks)
    const savedCourses = this.getFromStorage<ModuleItem[]>(this.COURSES_STORAGE_KEY);
    if (savedCourses && savedCourses.length > 0) {
      this.courses.set(savedCourses);
    } else {
      const defaultCourses: ModuleItem[] = [
        {
          id: '01',
          title: 'Social Media Marketing',
          category: 'Marketing Service • Organic Virality',
          badge: 'Core Track',
          metric: '25+',
          metricLabel: 'Real Brand Growth & Audit Frameworks',
          desc: 'Master platform algorithms, audience segmentation, organic virality blueprints, and business profile optimization to build unstoppable organic reach.',
          icon: '01',
          gradient: 'from-sky-900/60 via-blue-950/80 to-slate-950',
          iconBg: 'bg-sky-500/10 text-sky-400',
          deliverables: [
            'Audience Segmentation & Targeting',
            'Algorithm Virality Frameworks',
            'High-Converting Profile Optimization'
          ]
        },
        {
          id: '02',
          title: 'Instagram & Reels Growth',
          category: 'Creative Media • Short-Form Video',
          badge: 'High Impact',
          metric: '100K+',
          metricLabel: 'Reel Views Retention Blueprint',
          desc: 'Master high-retention 3-second hook architecture, storytelling scripts, trending audio mechanics, and turn casual viewers into paying followers.',
          icon: '02',
          gradient: 'from-pink-950/60 via-purple-950/80 to-slate-950',
          iconBg: 'bg-pink-500/10 text-pink-400',
          deliverables: [
            '3-Second Retention Hook Framework',
            'Trending Audio & Scripting Formula',
            'Follower-to-Client Funnel Strategy'
          ]
        },
        {
          id: '03',
          title: 'Meta & Google Ads',
          category: 'Performance Marketing • Paid Acquisition',
          badge: 'Paid Ads',
          metric: '₹10L+',
          metricLabel: 'Ad Spend Frameworks & ROAS Optimization',
          desc: 'Launch profitable ad campaigns from scratch. Master Meta Ads Manager, CBO vs ABO budgeting, Google Search & Performance Max (PMax), and multi-touch retargeting.',
          icon: '03',
          gradient: 'from-blue-950/70 via-indigo-950/80 to-slate-950',
          iconBg: 'bg-blue-500/10 text-blue-400',
          deliverables: [
            'Meta Pixel & Custom Conversion API',
            'Google Search & Performance Max (PMax)',
            'Dynamic Retargeting & ROAS Scaling'
          ]
        },
        {
          id: '04',
          title: 'SEO & Website Ranking',
          category: 'Organic Growth • Search Visibility',
          badge: 'Organic',
          metric: '#1 Page',
          metricLabel: 'Google Ranking & Keyword Intent Systems',
          desc: 'Dominate search engines with intent-driven keyword research, technical on-page SEO audits, Google Search Console audits, and local Google Business ranking.',
          icon: '04',
          gradient: 'from-emerald-950/60 via-teal-950/80 to-slate-950',
          iconBg: 'bg-emerald-500/10 text-emerald-400',
          deliverables: [
            'High-Intent Keyword Discovery',
            'Technical & On-Page SEO Auditing',
            'Google Business Profile Local Ranking'
          ]
        }
      ];
      this.courses.set(defaultCourses);
      this.saveToStorage(this.COURSES_STORAGE_KEY, defaultCourses);
    }

    // 4. Initialize Deep Course Catalog (Full 12-Module Details Pages)
    const savedCatalog = this.getFromStorage<Record<string, CourseDetailData>>(this.CATALOG_STORAGE_KEY);
    if (savedCatalog && Object.keys(savedCatalog).length > 0) {
      this.courseCatalog.set(savedCatalog);
    } else {
      this.courseCatalog.set(COURSE_CATALOG);
      this.saveToStorage(this.CATALOG_STORAGE_KEY, COURSE_CATALOG);
    }

    // 5. Initialize Media Assets
    const savedAssets = this.getFromStorage<AssetItem[]>(this.ASSETS_STORAGE_KEY);
    if (savedAssets && savedAssets.length > 0) {
      this.assets.set(savedAssets);
    } else {
      const defaultAssets: AssetItem[] = [
        {
          id: 'asset_logo_1',
          title: 'Official Avirbhav Geometric Brand Logo',
          category: 'logo',
          url: '/images/logo.png',
          alt: 'Avirbhav Infotech Brand Mark',
          size: '12 KB',
          assignedTo: 'Site Header Logo',
          createdAt: new Date().toISOString()
        },
        {
          id: 'asset_mentor_1',
          title: 'Deekshith (Founder & Head Mentor)',
          category: 'mentor',
          url: '/images/instructor.png',
          alt: 'Deekshith Mentor Portrait',
          size: '145 KB',
          assignedTo: 'Mentor Spotlight (Deekshith)',
          createdAt: new Date().toISOString()
        },
        {
          id: 'asset_poster_1',
          title: '150 Days Curriculum Overview Poster',
          category: 'poster',
          url: '/images/poster1.png',
          alt: 'Curriculum Roadmap Poster',
          size: '220 KB',
          assignedTo: 'Curriculum Blueprint',
          createdAt: new Date().toISOString()
        },
        {
          id: 'asset_cover_1',
          title: 'Full Marketing Suite Master Banner',
          category: 'poster',
          url: '/images/cover.png',
          alt: 'Avirbhav Digital Marketing Cover',
          size: '310 KB',
          assignedTo: 'Marketing Cover',
          createdAt: new Date().toISOString()
        }
      ];
      this.assets.set(defaultAssets);
      this.saveToStorage(this.ASSETS_STORAGE_KEY, defaultAssets);
    }

    // 6. Initialize Site Content
    const savedContent = this.getFromStorage<SiteContent>(this.SITE_CONTENT_KEY);
    if (savedContent) {
      this.siteContent.set({ ...this.siteContent(), ...savedContent });
    }

    // 7. Initialize SEO Config
    const savedSeo = this.getFromStorage<SeoConfig>(this.SEO_CONFIG_KEY);
    if (savedSeo) {
      this.seoConfig.set({ ...this.seoConfig(), ...savedSeo });
    }

    // 8. Initialize Version Snapshots
    const savedVersion = this.getFromStorage<string>(this.ACTIVE_VERSION_KEY);
    if (savedVersion) {
      this.currentVersion.set(savedVersion);
    }
    const savedSnapshots = this.getFromStorage<SiteSnapshot[]>(this.SNAPSHOTS_STORAGE_KEY);
    if (savedSnapshots && savedSnapshots.length > 0) {
      this.snapshots.set(savedSnapshots);
    } else {
      const defaultSnapshots: SiteSnapshot[] = [
        {
          id: 'ver-4-3-0',
          version: 'v4.3.0',
          title: 'Release v4.3.0 - Complete 12-Module Deep Course Blueprint & Agency SOPs',
          description: 'Full production release featuring 12-module in-depth syllabus breakdowns with AI tools, 2-step OTP Admin CMS Gate, and Auto-Reply Lead Drawer.',
          createdAt: new Date().toISOString(),
          isLive: true,
          author: 'Arun K R / Deekshith',
          highlights: [
            '12-Module Deep Syllabus with AI tools & topic breakdowns',
            'Admin CMS with 2-step OTP Gate & Auto-Reply CRM Drawer',
            'Dynamic Media Asset Library with 1-click site assignment',
            'Live Google SERP & Social Sharing Card Previews'
          ]
        },
        {
          id: 'ver-4-2-0',
          version: 'v4.2.0',
          title: 'Release v4.2.0 - Strict 4-Student Micro-Cohort USP & Mentorship Framework',
          description: 'Stabilized release introducing the 4-seats-per-batch micro-cohort guarantee, mentor spotlight with ₹10L+ live ad spend, and instant WhatsApp booking.',
          createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
          isLive: false,
          author: 'Arun K R / Deekshith',
          highlights: [
            'Prominent 4-Seats-Per-Batch USP badge across Hero & Curriculum',
            'Mentor Spotlight for Deekshith with ₹10L+ ad spend proof',
            'Direct WhatsApp & Instant 1:1 Strategy Slot Booking Modal'
          ]
        },
        {
          id: 'ver-4-1-0',
          version: 'v4.1.0',
          title: 'Release v4.1.0 - Initial Launch & Hero Admissions Architecture',
          description: 'Core architectural release establishing design system, high-contrast dark theme, blue stats banner, and responsive course catalog.',
          createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
          isLive: false,
          author: 'Arun K R / Deekshith',
          highlights: [
            'Figma-exact Dark Navy & Sky Blue high-contrast design system',
            'Blue Stats Banner (10+ Batches, 93% Placement, 220+ Students)',
            'Interactive Curriculum Track Preview & Admissions Ticker'
          ]
        }
      ];
      this.snapshots.set(defaultSnapshots);
      this.saveToStorage(this.SNAPSHOTS_STORAGE_KEY, defaultSnapshots);
    }

    // 9. Initialize Auto-Reply Settings
    const savedAutoReply = this.getFromStorage<AutoReplySettings>(this.AUTO_REPLY_STORAGE_KEY);
    if (savedAutoReply) {
      this.autoReplySettings.set(savedAutoReply);
    }

    // 10. Initialize About Page Content
    const savedAbout = this.getFromStorage<AboutPageContent>(this.ABOUT_STORAGE_KEY);
    if (savedAbout) {
      this.aboutContent.set(savedAbout);
    } else {
      this.aboutContent.set(DEFAULT_ABOUT_CONTENT);
    }

    // 11. Initialize Career Page Content
    const savedCareer = this.getFromStorage<CareerPageContent>(this.CAREER_STORAGE_KEY);
    if (savedCareer) {
      this.careerContent.set(savedCareer);
    } else {
      this.careerContent.set(DEFAULT_CAREER_CONTENT);
    }

    // 12. Initialize Saved Jobs Bookmarks
    const savedJobIds = this.getFromStorage<string[]>(this.SAVED_JOBS_STORAGE_KEY);
    if (savedJobIds) {
      this.savedJobIds.set(savedJobIds);
    }

    // 13. Initialize Avirbhav Career Roles (strictly internal)
    const savedCareerRoles = this.getFromStorage<JobListing[]>(this.CAREER_ROLES_KEY);
    if (savedCareerRoles && savedCareerRoles.length > 0) {
      this.careerRoles.set(savedCareerRoles);
    } else {
      this.careerRoles.set(this.DEFAULT_CAREER_ROLES);
      this.saveToStorage(this.CAREER_ROLES_KEY, this.DEFAULT_CAREER_ROLES);
    }

    // 14. Initialize External Other Companies Jobs Board (Naukri, Apna, LinkedIn, etc.)
    const savedExternalJobs = this.getFromStorage<JobListing[]>(this.EXTERNAL_JOBS_KEY);
    if (savedExternalJobs && savedExternalJobs.length > 0) {
      this.externalJobs.set(savedExternalJobs);
    } else {
      this.externalJobs.set(this.DEFAULT_EXTERNAL_JOBS);
      this.saveToStorage(this.EXTERNAL_JOBS_KEY, this.DEFAULT_EXTERNAL_JOBS);
    }
  }

  // 1. Strictly Avirbhav Internal Roles for /career
  private readonly DEFAULT_CAREER_ROLES: JobListing[] = [
    // Avirbhav Internal Roles
    {
      id: 'job-01',
      title: 'Meta & Google Performance Ads Lead',
      companyName: 'Avirbhav Infotech Agency',
      companyLogo: 'AV',
      source: 'Avirbhav',
      postedDate: 'Today',
      isFresherFriendly: false,
      department: 'Performance Marketing',
      location: 'Chennai / Hybrid',
      type: 'Full Time',
      experience: '2 – 5 Years',
      salary: '₹6,50,000 – ₹12,00,000 PA',
      deadline: 'Rolling Applications',
      urgentBadge: 'Actively Hiring',
      description: 'Lead live high-budget performance ad campaigns for D2C & B2B agency clients while mentoring micro-cohort students through real ROAS optimization.',
      responsibilities: [
        'Deploy, scale, and audit Meta Ads Manager and Google Ads campaigns with ₹10L+ monthly client spends',
        'Set up Conversions API (CAPI), Google Tag Manager server-side tracking, and multi-touch attribution models',
        'Mentor cohort students 1:1 on campaign structure, audience research, creative fatigue analysis, and bidding strategies',
        'Analyze creative metrics (Hook Rate, Hold Rate, CTR, ROAS) to brief designers on winning video variations'
      ],
      requirements: [
        'Proven track record scaling client ad spend to at least ₹5L+/month with verifiable 3.5x+ blended ROAS',
        'Deep mastery of Facebook Pixel, CAPI, GA4, Google Search/Performance Max, and spreadsheet modeling',
        'Passion for mentorship and clear Tamil & English verbal communication skills'
      ],
      perks: [
        'Quarterly agency profit-sharing & student placement bonuses',
        'Paid access to ChatGPT-4o Team, Foreplay, Motion, and Midjourney accounts',
        'Flexible 2-day work-from-home schedule'
      ]
    },
    {
      id: 'job-02',
      title: 'SEO & Organic Growth Architect',
      companyName: 'Avirbhav Infotech Agency',
      companyLogo: 'AV',
      source: 'Avirbhav',
      postedDate: 'Today',
      isFresherFriendly: false,
      department: 'SEO & Growth',
      location: 'Remote / Hybrid',
      type: 'Full Time',
      experience: '2 – 4 Years',
      salary: '₹5,00,000 – ₹9,00,000 PA',
      deadline: 'May 30, 2026',
      urgentBadge: 'High Priority',
      description: 'Own programmatic and technical SEO roadmaps for client websites, master topical authority clustering, and guide students in ranking real client domains.',
      responsibilities: [
        'Perform in-depth technical SEO audits (Core Web Vitals, crawl budget, canonicalization, indexation)',
        'Build programmatic keyword clustering architectures and semantic search content briefs using Ahrefs & SurferSEO',
        'Conduct ethical digital PR, editorial backlink acquisition, and local schema optimization',
        'Train students on algorithmic penalty recovery and zero-click SERP domination'
      ],
      requirements: [
        'Demonstrated portfolio of websites ranked in top 3 positions for competitive non-branded keywords',
        'Proficiency in HTML/CSS basics, Schema.org JSON-LD, Screaming Frog, Ahrefs, and Google Search Console',
        'Experience integrating AI writing tools responsibly into high-volume organic pipelines'
      ],
      perks: [
        'Full remote flexibility with Chennai HQ co-working access',
        'Unlimited educational book & SEO tool reimbursement',
        'Performance bonus on client organic traffic milestones'
      ]
    },
    {
      id: 'job-03',
      title: 'Short-Form Content & Instagram Reels Strategist',
      companyName: 'Avirbhav Infotech Agency',
      companyLogo: 'AV',
      source: 'Avirbhav',
      postedDate: 'Today',
      isFresherFriendly: false,
      department: 'Content & Creative',
      location: 'Chennai On-Site',
      type: 'Full Time',
      experience: '1 – 3 Years',
      salary: '₹4,20,000 – ₹7,50,000 PA',
      deadline: 'Immediate Opening',
      urgentBadge: 'Immediate Joiner',
      description: 'Produce high-converting Reels and TikTok-style creatives that generate millions of organic impressions and scale ad funnels.',
      responsibilities: [
        'Script, direct, and edit 15–20 high-retention short-form video hooks weekly for agency brand accounts',
        'Master the first 3-second visual and auditory pattern interrupt to achieve >45% 3s-hook rate',
        'Collaborate with student creators to teach CapCut, Premiere Pro, and GenAI video b-roll generation',
        'Monitor algorithmic trends and audio library opportunities daily across Tamil Nadu and global D2C spaces'
      ],
      requirements: [
        'Portfolio of short-form content with at least 3 videos that surpassed 100K+ organic views',
        'Speed and instinct in scripting, editing, and mobile video production',
        'Strong sense of pacing, sound effects, on-screen typography, and behavioral psychology'
      ],
      perks: [
        'Latest mirrorless camera gear, wireless lav mics, and studio lighting equipment provided',
        'Creative freedom to test bold concepts and participate in client revenue upside',
        'Sponsored tickets to national creator summits'
      ]
    },
    {
      id: 'job-04',
      title: 'Generative AI Marketing Automation Lead',
      companyName: 'Avirbhav Infotech Agency',
      companyLogo: 'AV',
      source: 'Avirbhav',
      postedDate: 'Today',
      isFresherFriendly: false,
      department: 'Performance Marketing',
      location: 'Remote / Hybrid',
      type: 'Full Time',
      experience: '2 – 4 Years',
      salary: '₹6,00,000 – ₹11,00,000 PA',
      deadline: 'Rolling Applications',
      description: 'Design autonomous AI workflows for agency client operations using Zapier, Make, Claude 3.5, and bespoke LLM prompt pipelines.',
      responsibilities: [
        'Build automated content repurposing pipelines transforming long-form webinars into 10x social snippets',
        'Create automated competitor ad scrapers and creative intelligence dashboards',
        'Mentor cohort students on prompting techniques, agentic automation, and LLM-driven copywriting workflows',
        'Integrate webhook triggers connecting ad platforms to client CRMs and WhatsApp business APIs'
      ],
      requirements: [
        'Proven expertise building complex multi-step automations in Make.com, Zapier, or Python scripts',
        'Deep prompt engineering familiarity with OpenAI API, Claude 3.5 Sonnet, and Midjourney v6',
        'Ability to break down complex technical automations into simple, actionable steps for students'
      ],
      perks: [
        '100% reimbursed API credits for all personal AI experimentation and tooling',
        'Flexible working hours with asynchronous communication culture',
        'Annual tech hardware allowance'
      ]
    },
    {
      id: 'job-05',
      title: 'Digital Marketing Associate Mentor (Cohort Co-Lead)',
      companyName: 'Avirbhav Digital Academy',
      companyLogo: 'AV',
      source: 'Avirbhav',
      postedDate: 'Today',
      isFresherFriendly: false,
      department: 'Mentorship & Academy',
      location: 'Chennai (Perungudi HQ)',
      type: 'Full Time',
      experience: '1 – 3 Years',
      salary: '₹4,80,000 – ₹8,00,000 PA',
      deadline: 'June 15, 2026',
      description: 'Work side-by-side with principal mentor Deekshith to guide our 4-student micro-batches through their daily practical ad deployments.',
      responsibilities: [
        'Lead daily standup audits reviewing student campaign dashboards, budget pacing, and ROAS calculations',
        'Grade live practical assignments (CAPI installations, GTM tags, keyword research sheets)',
        'Conduct 1:1 troubleshooting sessions in Tamil and English when students face ad account bans or tracking errors',
        'Assist students with portfolio deck defense and interview preparation'
      ],
      requirements: [
        'Hands-on experience running performance ads or technical SEO in an agency or fast-growth brand',
        'Exceptional empathy, patience, and passion for coaching younger marketers',
        'Strong verbal communication skills in both Tamil and English'
      ],
      perks: [
        'Cohort graduation incentive bonus for every student placed with 100% satisfaction',
        'Co-working in modern air-conditioned creator hub in Perungudi, Chennai',
        'Direct mentorship from founder Deekshith on agency scaling'
      ]
    },
    {
      id: 'job-06',
      title: 'D2C E-Commerce Funnel & CRO Specialist',
      companyName: 'Avirbhav Infotech Agency',
      companyLogo: 'AV',
      source: 'Avirbhav',
      postedDate: 'Today',
      isFresherFriendly: false,
      department: 'Performance Marketing',
      location: 'Chennai / Hybrid',
      type: 'Full Time',
      experience: '2 – 4 Years',
      salary: '₹6,00,000 – ₹10,50,000 PA',
      deadline: 'Rolling Applications',
      description: 'Optimize Shopify landing pages, cart flows, and multi-tier upsells to maximize Average Order Value (AOV) and conversion rates for partner brands.',
      responsibilities: [
        'Set up heatmaps, session recordings, and conversion drop-off funnels using Microsoft Clarity and Hotjar',
        'Run hypothesis-driven A/B tests on landing page headlines, pricing anchors, and checkout steps',
        'Develop post-purchase upsell architectures and SMS/WhatsApp abandoned cart recovery sequences',
        'Train academy cohorts on the psychology of impulse buying and frictionless checkout UX'
      ],
      requirements: [
        'Demonstrated history of lifting Shopify store conversion rates by 25%+ with statistical proof',
        'Strong grasp of Shopify Liquid basics, page builders (Replo, GemPages), and Google Analytics 4',
        'Obsession with user psychology and visual hierarchy'
      ],
      perks: [
        'Direct revenue-share bonuses on client e-commerce store GMV growth',
        'Hybrid working policy',
        'Generous paid annual leave'
      ]
    },
    {
      id: 'job-07',
      title: 'Junior Growth Fellow (Academy Graduate Track)',
      companyName: 'Avirbhav Digital Academy',
      companyLogo: 'AV',
      source: 'Avirbhav',
      postedDate: 'Today',
      isFresherFriendly: true,
      department: 'Mentorship & Academy',
      location: 'Chennai HQ',
      type: 'Fellowship',
      experience: '0 – 1 Year (Freshers Welcome)',
      salary: '₹3,60,000 – ₹5,20,000 PA',
      deadline: 'Rolling Cohort Intake',
      urgentBadge: 'Freshers Welcome',
      description: 'An accelerated 6-month paid fellowship program for hungry young marketers to shadow live agency account directors on premier D2C accounts.',
      responsibilities: [
        'Assist senior media buyers in campaign setup, ad copy drafting, and UTM tracking QA',
        'Compile daily ROAS and ad expenditure spreadsheets for review meetings',
        'Conduct competitor ad research using Meta Ad Library and TikTok Creative Center',
        'Participate in weekly mastermind sessions with agency founders'
      ],
      requirements: [
        'Recent graduate or self-taught marketer with relentless hunger to learn practical performance marketing',
        'Basic familiarity with Meta Ads Manager, Excel/Google Sheets, and Canva',
        'Strong ethical mindset, attention to detail, and punctuality'
      ],
      perks: [
        'Guaranteed conversion to Full-Time Associate upon fellowship milestone completion',
        '100% sponsored agency workstation, high-speed fiber internet, and lunch subsidies',
        'Zero-cost enrollment into advanced agency SOP masterclasses'
      ]
    },
    {
      id: 'job-08',
      title: 'Client Partnerships & Business Development Manager',
      companyName: 'Avirbhav Infotech Agency',
      companyLogo: 'AV',
      source: 'Avirbhav',
      postedDate: 'Today',
      isFresherFriendly: false,
      department: 'Business Development',
      location: 'Chennai / Hybrid',
      type: 'Full Time',
      experience: '2 – 5 Years',
      salary: '₹5,00,000 – ₹9,50,000 PA + Retainer Commission',
      deadline: 'Open Until Filled',
      description: 'Connect growing D2C brands, tech startups, and local businesses with Avirbhav Infotech marketing services and hiring partnerships.',
      responsibilities: [
        'Identify and qualify high-potential brand partners seeking agency retainer services or vetted student hires',
        'Lead prospective client discovery calls, audit their current ad accounts, and present tailored growth roadmaps',
        'Build long-term placement recruitment pipelines with regional ad agencies across Chennai & Bengaluru',
        'Maintain accurate CRM deal stages and close monthly recurring retainers'
      ],
      requirements: [
        'Demonstrated B2B sales or agency account acquisition experience closing ₹50K – ₹2L/month retainers',
        'Polished presentation, negotiation, and consultative selling abilities',
        'Strong network in South India tech startup and e-commerce community'
      ],
      perks: [
        'Uncapped 10% monthly commission on all closed recurring client retainers',
        'Travel and client dinner allowance',
        'Leadership progression to Agency Partner track'
      ]
    },

  ];

  // 2. Strictly Other Companies Openings for /jobs (via Naukri, Apna, LinkedIn, Indeed, Shine)
  private readonly DEFAULT_EXTERNAL_JOBS: JobListing[] = [
    {
      id: 'agg-hcl-01',
      title: 'HCLTech Walkin || Mega drive for Freshers || Digital Marketing & Non Voice',
      companyName: 'HCLTech',
      companyLogo: 'HCL',
      source: 'LinkedIn',
      sourceUrl: 'https://www.linkedin.com/jobs/search/?keywords=Digital%20Marketing%20Fresher&location=Chennai',
      postedDate: '1 day ago',
      isFresherFriendly: true,
      department: 'Content & Creative',
      location: 'Chennai (Navalur), Tamil Nadu',
      type: 'Full Time',
      experience: '0 – 1 Year (Freshers Welcome)',
      salary: '₹2,40,000 – ₹3,80,000 PA',
      deadline: 'Walkin on 27th-30th Oct',
      urgentBadge: 'Mega Walkin',
      description: 'Mega walk-in drive at Navalur campus for fresh graduates and early career marketers in ad operations, search verification, and digital campaign audit support.',
      responsibilities: [
        'Support daily ad campaign audit workflows and search term verification',
        'Analyze organic trends and evaluate client search queries',
        'Maintain quality accuracy benchmarks for global marketing accounts'
      ],
      requirements: [
        'Any 2024 / 2025 / 2026 graduate (B.Com, BBA, B.Sc, BCA, B.E.)',
        'Strong written English comprehension and attention to detail',
        'Willingness to work from Chennai Navalur facility'
      ],
      perks: [
        'Free 2-way cab facility for Navalur campus',
        'Comprehensive medical health cover',
        'Rotational shift allowance'
      ]
    },
    {
      id: 'agg-sb-02',
      title: 'Meta & Instagram Ads Performance Specialist',
      companyName: 'Social Beat',
      companyLogo: 'SB',
      source: 'Naukri',
      sourceUrl: 'https://www.naukri.com/digital-marketing-jobs-in-chennai',
      postedDate: 'Today',
      isFresherFriendly: false,
      department: 'Performance Marketing',
      location: 'Chennai (Alwarpet), Tamil Nadu',
      type: 'Full Time',
      experience: '1 – 3 Years',
      salary: '₹4,50,000 – ₹7,20,000 PA',
      deadline: 'Rolling Applications',
      urgentBadge: 'Actively Hiring',
      description: 'Execute performance marketing for top retail and direct-to-consumer accounts. Scale Meta Ads with rigorous creative testing and CAPI attribution.',
      responsibilities: [
        'Run end-to-end Meta ad sets focusing on acquisition and ROAS',
        'Coordinate with video creators for TikTok/Reels UGC scripts',
        'Review weekly conversion reports and CPA tracking in GA4'
      ],
      requirements: [
        '1+ years hands-on experience in Meta Ads Manager',
        'Strong numeracy and spreadsheet analytical skills',
        'Knowledge of CAPI and pixel debugging'
      ],
      perks: [
        'Leading agency culture in heart of Chennai',
        'Bi-annual performance review bonuses',
        'Paid training for Meta certified media buyer exams'
      ]
    },
    {
      id: 'agg-zoho-03',
      title: 'SEO Analyst & Organic Traffic Strategist',
      companyName: 'Zoho Corporation',
      companyLogo: 'ZOHO',
      source: 'LinkedIn',
      sourceUrl: 'https://www.linkedin.com/jobs/search/?keywords=Zoho%20Marketing&location=Chennai',
      postedDate: '2 days ago',
      isFresherFriendly: false,
      department: 'SEO & Growth',
      location: 'Chennai (Guduvanchery), Tamil Nadu',
      type: 'Hybrid',
      experience: '1 – 3 Years',
      salary: '₹5,00,000 – ₹8,00,000 PA',
      deadline: 'Open Until Filled',
      urgentBadge: 'High Priority',
      description: 'Drive organic search visibility across global SaaS product pages for Zoho suite. Master technical SEO, page speed, and semantic keyword indexing.',
      responsibilities: [
        'Conduct on-page and technical audits using Screaming Frog and Search Console',
        'Collaborate with product marketing leads on high-intent search clusters',
        'Monitor SERP feature rankings and rich snippets for SaaS categories'
      ],
      requirements: [
        'Proven experience ranking competitive B2B software keywords',
        'Deep understanding of Core Web Vitals and Schema markup',
        'Proficient in Ahrefs, SEMrush, and Google Analytics 4'
      ],
      perks: [
        'Iconic green campus with organic dining',
        'Company transport across Chennai routes',
        'Product-first engineering culture'
      ]
    },
    {
      id: 'agg-fw-04',
      title: 'Digital Marketing Growth Intern (Paid Stipend)',
      companyName: 'Freshworks',
      companyLogo: 'FW',
      source: 'LinkedIn',
      sourceUrl: 'https://www.linkedin.com/jobs/search/?keywords=Freshworks%20Intern&location=Chennai',
      postedDate: '1 day ago',
      isFresherFriendly: true,
      department: 'Performance Marketing',
      location: 'Chennai (Perungudi), Tamil Nadu',
      type: 'Full Time',
      experience: '0 – 1 Year (Freshers Welcome)',
      salary: '₹25,000 / Month Stipend',
      deadline: 'June 15, 2026',
      urgentBadge: 'Paid Internship',
      description: 'Join the global demand generation crew at Freshworks Global City, Perungudi. Learn paid media execution, landing page testing, and B2B growth marketing from senior growth architects.',
      responsibilities: [
        'Assist with campaign setup across LinkedIn Campaign Manager & Google Ads',
        'Build UTM tracking matrices and QA landing page URLs',
        'Track campaign performance in HubSpot CRM dashboards'
      ],
      requirements: [
        'Passionate about digital marketing, tech, and fast-paced SaaS growth',
        'Strong analytical mindset and familiarity with Excel/Sheets',
        'Available for 6 months on-site in Perungudi, Chennai'
      ],
      perks: [
        'Opportunity for full-time PPO conversion based on performance',
        'Free gourmet cafeteria breakfast & lunch',
        'Modern game rooms and mentorship from NASDAQ-listed leaders'
      ]
    },
    {
      id: 'agg-sch-05',
      title: 'Social Media & Instagram Content Strategist',
      companyName: 'Schbang Digital',
      companyLogo: 'SCH',
      source: 'Apna',
      sourceUrl: 'https://apna.co/jobs?q=digital+marketing+in+chennai',
      postedDate: 'Today',
      isFresherFriendly: true,
      department: 'Content & Creative',
      location: 'Chennai, Tamil Nadu',
      type: 'Full Time',
      experience: '1 – 2 Years',
      salary: '₹3,60,000 – ₹5,50,000 PA',
      deadline: 'Immediate',
      urgentBadge: 'Immediate Opening',
      description: 'Spearhead viral short-form video concepts, Instagram broadcast channels, and meme marketing for consumer lifestyle and FMCG clients.',
      responsibilities: [
        'Plan monthly social media content calendars across Instagram, YouTube Shorts, and LinkedIn',
        'Script viral hook-driven reels and direct shoot production with content creators',
        'Engage community followers and identify trending audio templates daily'
      ],
      requirements: [
        'Active social media presence and portfolio of reels/shorts produced',
        'Understanding of algorithmic audience retention and thumbnail hooks',
        'Basic CapCut / Premiere editing and Canva familiarity'
      ],
      perks: [
        'Vibrant creative agency atmosphere',
        'Celebrity and influencer shoot access',
        'Regular Friday creative jamming sessions'
      ]
    },
    {
      id: 'agg-npdi-06',
      title: 'Google Ads & Performance Max Strategist',
      companyName: 'Neil Patel Digital India',
      companyLogo: 'NPDI',
      source: 'Indeed',
      sourceUrl: 'https://in.indeed.com/jobs?q=google+ads&l=Chennai',
      postedDate: '2 days ago',
      isFresherFriendly: false,
      department: 'Performance Marketing',
      location: 'Chennai / Remote',
      type: 'Remote',
      experience: '1 – 3 Years',
      salary: '₹4,50,000 – ₹7,00,000 PA',
      deadline: 'Rolling',
      urgentBadge: 'Remote Friendly',
      description: 'Manage client Google Ads accounts across Search, Display, YouTube, and Performance Max with hands-on budget optimization.',
      responsibilities: [
        'Structure high-converting Search and PMax campaigns with smart bidding',
        'Conduct negative keyword audits and search term report pruning',
        'Produce bi-weekly client performance decks detailing CAC and ROAS trends'
      ],
      requirements: [
        'Certified in Google Search and Google Video Ads',
        'Minimum 1 year hands-on experience in agency ad spend',
        'Strong English written presentation skills'
      ],
      perks: [
        '100% remote flexibility with home office setup stipend',
        'Access to proprietary NP Digital growth frameworks',
        'Quarterly certification reward bonuses'
      ]
    },
    {
      id: 'agg-wave-07',
      title: 'Amazon Ads & D2C Marketplaces Specialist',
      companyName: 'Wavemaker Media (GroupM)',
      companyLogo: 'WM',
      source: 'Naukri',
      sourceUrl: 'https://www.naukri.com/digital-marketing-jobs-in-chennai',
      postedDate: '3 days ago',
      isFresherFriendly: false,
      department: 'Performance Marketing',
      location: 'Chennai, Tamil Nadu',
      type: 'Hybrid',
      experience: '2 – 4 Years',
      salary: '₹5,50,000 – ₹9,00,000 PA',
      deadline: 'May 28, 2026',
      urgentBadge: 'GroupM Role',
      description: 'Scale Amazon Sponsored Products, Brands, and DSP campaigns for multinational FMCG and beauty enterprise brands.',
      responsibilities: [
        'Manage end-to-end marketplace ad spends targeting optimal ACOS and TACOS',
        'Optimize product listing copy, backend keywords, and A+ content',
        'Analyze marketplace competitor price points and buy-box share'
      ],
      requirements: [
        'Experience running Amazon Ads Console and Brand Analytics',
        'Data-driven mindset with advanced VLOOKUP and pivot tables mastery',
        'Bachelor degree in Business, Marketing, or relevant field'
      ],
      perks: [
        'GroupM global network training and mobility',
        'Generous annual leave and mental health wellness days',
        'Hybrid work policy (2 days office, 3 days WFH)'
      ]
    },
    {
      id: 'agg-den-08',
      title: 'SEO Content Writer & Digital Copywriter',
      companyName: 'Dentsu Creative',
      companyLogo: 'DEN',
      source: 'LinkedIn',
      sourceUrl: 'https://www.linkedin.com/jobs/search/?keywords=Dentsu%20Content&location=Chennai',
      postedDate: '1 day ago',
      isFresherFriendly: false,
      department: 'Content & Creative',
      location: 'Chennai, Tamil Nadu',
      type: 'Full Time',
      experience: '1 – 3 Years',
      salary: '₹3,60,000 – ₹5,80,000 PA',
      deadline: 'Rolling',
      urgentBadge: 'Immediate Joiner',
      description: 'Craft high-converting ad copy, landing page headlines, and search-optimized editorial articles for leading banking and telecom clients.',
      responsibilities: [
        'Write search-intent aligned blog articles and conversion landing page copy',
        'Develop snappy ad copy variants for Meta, LinkedIn, and Google Responsive Search Ads',
        'Infuse brand voice with ethical generative AI writing prompts'
      ],
      requirements: [
        'Strong portfolio of published digital articles or performance ad copy',
        'Understanding of keyword search intent and meta tags',
        'Flawless English grammar and engaging storytelling style'
      ],
      perks: [
        'Global agency network perks and award portfolio submissions',
        'Comprehensive health and life insurance cover',
        'Creative development workshops and summits'
      ]
    },
    {
      id: 'agg-cts-09',
      title: 'Digital Marketing Executive (Fresher Walkin Drive)',
      companyName: 'Cognizant Technology Solutions',
      companyLogo: 'CTS',
      source: 'Shine',
      sourceUrl: 'https://www.shine.com/job-search/digital-marketing-jobs-in-chennai',
      postedDate: 'Today',
      isFresherFriendly: true,
      department: 'SEO & Growth',
      location: 'Chennai (Sholinganallur), Tamil Nadu',
      type: 'Full Time',
      experience: '0 – 1 Year (Freshers Welcome)',
      salary: '₹3,00,000 – ₹4,50,000 PA',
      deadline: 'Rolling Walk-in',
      urgentBadge: 'Mega Walk-in',
      description: 'Freshers walk-in for Cognizant Sholinganallur campus in digital operations, web content auditing, and search ranking verification.',
      responsibilities: [
        'Verify online directory citations and business listing accuracy',
        'Audit webpage indexing statuses and broken link redirects',
        'Document daily KPI metrics for overseas marketing operations'
      ],
      requirements: [
        'Graduates of 2024 / 2025 / 2026 batch with zero standing arrears',
        'Basic familiarity with search engines, social media, and digital trends',
        'Good verbal and written communication in English'
      ],
      perks: [
        'Free corporate transportation facility across Chennai',
        'Subsidized campus cafeteria and fitness center',
        'Structured fast-track corporate learning programs'
      ]
    },
    {
      id: 'agg-cb-10',
      title: 'B2B Demand Generation & Inbound Marketing Lead',
      companyName: 'Chargebee',
      companyLogo: 'CB',
      source: 'LinkedIn',
      sourceUrl: 'https://www.linkedin.com/jobs/search/?keywords=Chargebee%20Marketing&location=Chennai',
      postedDate: '2 days ago',
      isFresherFriendly: false,
      department: 'Business Development',
      location: 'Chennai, Tamil Nadu',
      type: 'Hybrid',
      experience: '2 – 4 Years',
      salary: '₹6,00,000 – ₹10,00,000 PA',
      deadline: 'June 10, 2026',
      urgentBadge: 'High Priority',
      description: 'Scale qualified pipeline generation for Chargebee subscription management platform through targeted webinars, LinkedIn ads, and email nurture workflows.',
      responsibilities: [
        'Orchestrate full-funnel inbound marketing campaigns to drive MQLs and SQLs',
        'Set up automated email drip cadences in HubSpot and Marketo',
        'Partner with sales development reps (SDRs) to optimize lead handoff efficiency'
      ],
      requirements: [
        '2+ years experience in B2B SaaS demand generation or digital growth',
        'Working knowledge of HubSpot, Salesforce, and LinkedIn Ads',
        'Strong analytical mindset and conversion rate optimization (CRO) skills'
      ],
      perks: [
        'Attractive equity stock options (ESOPs)',
        'Flexible hybrid schedule at modern Chennai campus',
        'Wellness stipend and annual learning budget'
      ]
    },
    {
      id: 'agg-nyk-11',
      title: 'Influencer Marketing & PR Associate',
      companyName: 'Nykaa',
      companyLogo: 'NYK',
      source: 'Naukri',
      sourceUrl: 'https://www.naukri.com/digital-marketing-jobs-in-chennai',
      postedDate: '1 day ago',
      isFresherFriendly: false,
      department: 'Content & Creative',
      location: 'Chennai, Tamil Nadu',
      type: 'Hybrid',
      experience: '1 – 3 Years',
      salary: '₹4,00,000 – ₹6,50,000 PA',
      deadline: 'Rolling',
      urgentBadge: 'Actively Hiring',
      description: 'Collaborate with top beauty, fashion, and lifestyle creators in South India for product seeding, affiliate tracking, and brand launch campaigns.',
      responsibilities: [
        'Identify and negotiate creator deliverables for nano, micro, and macro influencers',
        'Track promotional coupon codes, affiliate link clicks, and campaign ROI',
        'Oversee PR kit deliveries and maintain positive creator relations across Tamil Nadu'
      ],
      requirements: [
        'Passionate about South Indian digital creator economy and beauty trends',
        'Strong negotiation, interpersonal, and communication skills',
        'Prior experience with influencer gifting and campaign reporting'
      ],
      perks: [
        'Generous employee product discounts on Nykaa beauty & fashion',
        'Exclusive access to beauty masterclasses and brand launches',
        'Dynamic fast-growing e-commerce environment'
      ]
    },
    {
      id: 'agg-kf-12',
      title: 'Email Marketing & Retention Automation Lead',
      companyName: 'Kissflow',
      companyLogo: 'KF',
      source: 'LinkedIn',
      sourceUrl: 'https://www.linkedin.com/jobs/search/?keywords=Kissflow&location=Chennai',
      postedDate: '3 days ago',
      isFresherFriendly: false,
      department: 'Performance Marketing',
      location: 'Chennai / Remote',
      type: 'Remote',
      experience: '2 – 4 Years',
      salary: '₹6,00,000 – ₹9,50,000 PA',
      deadline: 'May 30, 2026',
      urgentBadge: 'Remote Role',
      description: 'Architect automated onboarding and churn reduction email sequences for Kissflow low-code workflow platform.',
      responsibilities: [
        'Design behavioural trigger workflows, lifecycle drip sequences, and re-engagement campaigns',
        'A/B test email subject lines, preview text, send times, and CTA layouts',
        'Maintain list hygiene, deliverability protocols (DKIM, SPF, DMARC), and unsubscribe rates'
      ],
      requirements: [
        'Mastery of customer engagement tools (Customer.io, ActiveCampaign, HubSpot, or Braze)',
        'Solid grasp of HTML/CSS email formatting for responsive mobile rendering',
        'Experience with SaaS customer retention and LTV optimization'
      ],
      perks: [
        '100% remote flexibility with modern Chennai workspace access',
        'Comprehensive health coverage for family',
        'Annual technology allowance'
      ]
    },
    {
      id: 'agg-ub-13',
      title: 'Digital Marketing Associate (Fresher Walk-in)',
      companyName: 'Unifybrains Infotech',
      companyLogo: 'UB',
      source: 'Apna',
      sourceUrl: 'https://apna.co/jobs?q=digital+marketing+in+chennai',
      postedDate: 'Today',
      isFresherFriendly: true,
      department: 'Performance Marketing',
      location: 'Chennai (Guindy), Tamil Nadu',
      type: 'Full Time',
      experience: '0 – 1 Year (Freshers Welcome)',
      salary: '₹2,20,000 – ₹3,60,000 PA',
      deadline: 'Open Walk-in',
      urgentBadge: 'Fresher Walkin',
      description: 'Entry-level walk-in hiring for enthusiastic freshers wanting to start a hands-on digital marketing career in social media and search campaigns.',
      responsibilities: [
        'Assist with posting and scheduling creative assets across client Facebook & Instagram pages',
        'Basic keyword research and Google Business profile optimization',
        'Generate weekly campaign impression and engagement summaries'
      ],
      requirements: [
        'Any degree graduate eager to build an agency marketing career',
        'Basic computer literacy and social media familiarity',
        'Fast learner ready to absorb practical marketing SOPs'
      ],
      perks: [
        'Hands-on training provided during initial 30 days',
        'Fast internal promotion to Junior Media Buyer',
        'Central Guindy location next to metro station'
      ]
    }
  ];

  updateAboutContent(content: AboutPageContent): void {
    this.aboutContent.set(content);
    this.saveToStorage(this.ABOUT_STORAGE_KEY, content);
    if (this.firebaseService.isFirebaseConfigured()) {
      this.firebaseService.saveWebsiteContent('about', content).catch(err => {
        console.warn('[AcademyDataService] Background Firestore sync failed for about:', err);
      });
    }
  }

  updateCareerContent(content: CareerPageContent): void {
    this.careerContent.set(content);
    this.saveToStorage(this.CAREER_STORAGE_KEY, content);
    if (this.firebaseService.isFirebaseConfigured()) {
      this.firebaseService.saveWebsiteContent('career', content).catch(err => {
        console.warn('[AcademyDataService] Background Firestore sync failed for career:', err);
      });
    }
  }

  toggleSaveJob(jobId: string): void {
    const current = this.savedJobIds();
    const updated = current.includes(jobId) 
      ? current.filter(id => id !== jobId) 
      : [...current, jobId];
    this.savedJobIds.set(updated);
    this.saveToStorage(this.SAVED_JOBS_STORAGE_KEY, updated);
  }

  isJobSaved(jobId: string): boolean {
    return this.savedJobIds().includes(jobId);
  }

  // --- Avirbhav Career Roles (Internal Only) ---
  addCareerRole(role: JobListing): void {
    const roleWithSource: JobListing = { ...role, source: 'Avirbhav', companyName: 'Avirbhav Infotech Agency' };
    const updated = [roleWithSource, ...this.careerRoles()];
    this.careerRoles.set(updated);
    this.saveToStorage(this.CAREER_ROLES_KEY, updated);
    if (this.firebaseService.isFirebaseConfigured()) {
      this.firebaseService.saveWebsiteContent('career_roles', { roles: updated }).catch(err => {
        console.warn('[AcademyDataService] Background Firestore sync failed for career_roles:', err);
      });
    }
  }

  updateCareerRole(role: JobListing): void {
    const updated = this.careerRoles().map(r => r.id === role.id ? role : r);
    this.careerRoles.set(updated);
    this.saveToStorage(this.CAREER_ROLES_KEY, updated);
    if (this.firebaseService.isFirebaseConfigured()) {
      this.firebaseService.saveWebsiteContent('career_roles', { roles: updated }).catch(err => {
        console.warn('[AcademyDataService] Background Firestore sync failed for career_roles:', err);
      });
    }
  }

  deleteCareerRole(roleId: string): void {
    const updated = this.careerRoles().filter(r => r.id !== roleId);
    this.careerRoles.set(updated);
    this.saveToStorage(this.CAREER_ROLES_KEY, updated);
    if (this.firebaseService.isFirebaseConfigured()) {
      this.firebaseService.saveWebsiteContent('career_roles', { roles: updated }).catch(err => {
        console.warn('[AcademyDataService] Background Firestore sync failed for career_roles:', err);
      });
    }
  }

  refreshCareerRoles(): void {
    this.careerRoles.set(this.DEFAULT_CAREER_ROLES);
    this.saveToStorage(this.CAREER_ROLES_KEY, this.DEFAULT_CAREER_ROLES);
    if (this.firebaseService.isFirebaseConfigured()) {
      this.firebaseService.saveWebsiteContent('career_roles', { roles: this.DEFAULT_CAREER_ROLES }).catch(err => {
        console.warn('[AcademyDataService] Background Firestore sync failed for career_roles:', err);
      });
    }
  }

  // --- External Other Companies Jobs Feed (Naukri, Apna, LinkedIn, Indeed, Shine) ---
  addExternalJob(job: JobListing): void {
    const updated = [job, ...this.externalJobs()];
    this.externalJobs.set(updated);
    this.saveToStorage(this.EXTERNAL_JOBS_KEY, updated);
    if (this.firebaseService.isFirebaseConfigured()) {
      this.firebaseService.saveWebsiteContent('external_jobs', { jobs: updated }).catch(err => {
        console.warn('[AcademyDataService] Background Firestore sync failed for external_jobs:', err);
      });
    }
  }

  updateExternalJob(job: JobListing): void {
    const updated = this.externalJobs().map(j => j.id === job.id ? job : j);
    this.externalJobs.set(updated);
    this.saveToStorage(this.EXTERNAL_JOBS_KEY, updated);
    if (this.firebaseService.isFirebaseConfigured()) {
      this.firebaseService.saveWebsiteContent('external_jobs', { jobs: updated }).catch(err => {
        console.warn('[AcademyDataService] Background Firestore sync failed for external_jobs:', err);
      });
    }
  }

  deleteExternalJob(jobId: string): void {
    const updated = this.externalJobs().filter(j => j.id !== jobId);
    this.externalJobs.set(updated);
    this.saveToStorage(this.EXTERNAL_JOBS_KEY, updated);
    if (this.firebaseService.isFirebaseConfigured()) {
      this.firebaseService.saveWebsiteContent('external_jobs', { jobs: updated }).catch(err => {
        console.warn('[AcademyDataService] Background Firestore sync failed for external_jobs:', err);
      });
    }
  }

  refreshExternalJobs(): void {
    this.externalJobs.set(this.DEFAULT_EXTERNAL_JOBS);
    this.saveToStorage(this.EXTERNAL_JOBS_KEY, this.DEFAULT_EXTERNAL_JOBS);
    if (this.firebaseService.isFirebaseConfigured()) {
      this.firebaseService.saveWebsiteContent('external_jobs', { jobs: this.DEFAULT_EXTERNAL_JOBS }).catch(err => {
        console.warn('[AcademyDataService] Background Firestore sync failed for external_jobs:', err);
      });
    }
  }

  // Backward compatibility methods
  addJob(job: JobListing): void {
    if (job.source === 'Avirbhav') {
      this.addCareerRole(job);
    } else {
      this.addExternalJob(job);
    }
  }

  updateJob(job: JobListing): void {
    if (job.source === 'Avirbhav') {
      this.updateCareerRole(job);
    } else {
      this.updateExternalJob(job);
    }
  }

  deleteJob(jobId: string): void {
    this.deleteCareerRole(jobId);
    this.deleteExternalJob(jobId);
  }

  refreshJobsFeed(): void {
    this.refreshCareerRoles();
    this.refreshExternalJobs();
  }

  getJobById(id: string): JobListing | undefined {
    return this.jobs().find(j => j.id === id);
  }

  applyForJob(data: {
    jobId: string;
    jobTitle: string;
    name: string;
    phone: string;
    email: string;
    portfolioUrl?: string;
    experience: string;
    note?: string;
  }): { success: boolean; message: string } {
    const newLead: Lead = {
      id: 'JOB-' + Date.now().toString(36).toUpperCase(),
      name: data.name,
      phone: data.phone,
      email: data.email,
      program: data.jobTitle,
      source: `Job Application: ${data.jobTitle}`,
      status: 'New',
      createdAt: new Date().toISOString(),
      notes: `Portfolio / LinkedIn: ${data.portfolioUrl || 'N/A'}\nExperience: ${data.experience}\nCandidate Pitch: ${data.note || 'None'}`
    };

    const currentLeads = this.leads();
    const updated = [newLead, ...currentLeads];
    this.leads.set(updated);
    this.saveToStorage(this.LEADS_STORAGE_KEY, updated);

    return {
      success: true,
      message: `Your application for "${data.jobTitle}" has been received! Our hiring team will review your profile and reach out within 48 hours.`
    };
  }

  // --- Admin OTP & Authentication ---
  private activeOtp: string = '123456';
  private activeOtpEmail: string = 'admin@avirbhav.com';

  sendOtp(email: string): { success: boolean; otp: string; message: string } {
    const trimmed = (email || '').trim().toLowerCase();
    if (!trimmed || !trimmed.includes('@')) {
      return { success: false, otp: '', message: 'Please enter a valid work email address.' };
    }

    this.activeOtpEmail = trimmed;
    this.activeOtp = '123456'; // Deterministic demo OTP matching arun-portfolio
    return {
      success: true,
      otp: this.activeOtp,
      message: `A 6-digit security code has been dispatched to ${trimmed}.`
    };
  }

  verifyOtp(email: string, otp: string): { success: boolean; message: string } {
    const trimmedOtp = (otp || '').trim();

    if (!trimmedOtp || trimmedOtp.length < 6) {
      return { success: false, message: 'Please enter the complete 6-digit verification code.' };
    }

    if (trimmedOtp === '123456' || trimmedOtp === this.activeOtp) {
      this.isAuthenticated.set(true);
      this.saveToStorage(this.AUTH_STORAGE_KEY, true);
      return { success: true, message: 'Verification successful. Welcome to Admin CMS.' };
    }

    return { success: false, message: 'Invalid verification code. Please check your inbox or click the Demo OTP banner.' };
  }

  login(email: string, pass: string): boolean {
    const validEmail = 'admin@avirbhav.com';
    const validPass = 'admin123';

    if (email.trim().toLowerCase() === validEmail && pass === validPass) {
      this.isAuthenticated.set(true);
      this.saveToStorage(this.AUTH_STORAGE_KEY, true);
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated.set(false);
    this.saveToStorage(this.AUTH_STORAGE_KEY, false);
  }

  // --- Snapshot Versioning & Auto-Reply Methods ---

  getFullDataSnapshot(): SiteBackupData {
    return {
      version: this.currentVersion(),
      exportedAt: new Date().toISOString(),
      leads: JSON.parse(JSON.stringify(this.leads())),
      courses: JSON.parse(JSON.stringify(this.courses())),
      courseCatalog: JSON.parse(JSON.stringify(this.courseCatalog())),
      assets: JSON.parse(JSON.stringify(this.assets())),
      siteContent: JSON.parse(JSON.stringify(this.siteContent())),
      seoConfig: JSON.parse(JSON.stringify(this.seoConfig()))
    };
  }

  restoreFullDataSnapshot(data: Partial<SiteBackupData>): void {
    if (data.siteContent) {
      this.siteContent.set({ ...this.siteContent(), ...data.siteContent });
      this.saveToStorage(this.SITE_CONTENT_KEY, this.siteContent());
    }
    if (data.seoConfig) {
      this.seoConfig.set({ ...this.seoConfig(), ...data.seoConfig });
      this.saveToStorage(this.SEO_CONFIG_KEY, this.seoConfig());
      this.applySeoTags();
    }
    if (data.courses && Array.isArray(data.courses)) {
      this.courses.set(data.courses);
      this.saveToStorage(this.COURSES_STORAGE_KEY, data.courses);
    }
    if (data.courseCatalog) {
      this.courseCatalog.set(data.courseCatalog);
      this.saveToStorage(this.CATALOG_STORAGE_KEY, data.courseCatalog);
    }
    if (data.assets && Array.isArray(data.assets)) {
      this.assets.set(data.assets);
      this.saveToStorage(this.ASSETS_STORAGE_KEY, data.assets);
    }
    if (data.leads && Array.isArray(data.leads)) {
      this.leads.set(data.leads);
      this.saveToStorage(this.LEADS_STORAGE_KEY, data.leads);
    }
  }

  createSnapshot(version: string, title: string, description: string, highlights: string[]): SiteSnapshot {
    const cleanVer = version.trim().startsWith('v') ? version.trim() : `v${version.trim()}`;
    const id = `ver-${Date.now()}-${cleanVer.replace(/\./g, '-')}`;
    const snapshotData = this.getFullDataSnapshot();

    const newSnapshot: SiteSnapshot = {
      id,
      version: cleanVer,
      title: title.trim() || `Site Snapshot ${cleanVer}`,
      description: description.trim() || 'Manual backup snapshot created via Admin Portal.',
      createdAt: new Date().toISOString(),
      isLive: true,
      author: 'Arun K R / Deekshith',
      highlights: highlights && highlights.length ? highlights : ['Full site state & CMS data backup'],
      dataSnapshot: snapshotData
    };

    this.currentVersion.set(cleanVer);
    this.saveToStorage(this.ACTIVE_VERSION_KEY, cleanVer);

    const updated = [newSnapshot, ...this.snapshots().map(s => ({ ...s, isLive: false }))];
    this.snapshots.set(updated);
    this.saveToStorage(this.SNAPSHOTS_STORAGE_KEY, updated);

    return newSnapshot;
  }

  restoreSnapshot(snapshot: SiteSnapshot): boolean {
    if (!snapshot) return false;
    try {
      if (snapshot.dataSnapshot) {
        this.restoreFullDataSnapshot(snapshot.dataSnapshot);
      }
      this.currentVersion.set(snapshot.version);
      this.saveToStorage(this.ACTIVE_VERSION_KEY, snapshot.version);

      const updated = this.snapshots().map(s => ({
        ...s,
        isLive: s.id === snapshot.id
      }));
      this.snapshots.set(updated);
      this.saveToStorage(this.SNAPSHOTS_STORAGE_KEY, updated);
      return true;
    } catch (e) {
      console.error('Failed to restore snapshot:', e);
      return false;
    }
  }

  deleteSnapshot(id: string): void {
    const updated = this.snapshots().filter(s => s.id !== id);
    this.snapshots.set(updated);
    this.saveToStorage(this.SNAPSHOTS_STORAGE_KEY, updated);
  }

  updateAutoReplySettings(settings: Partial<AutoReplySettings>): void {
    const updated = { ...this.autoReplySettings(), ...settings };
    this.autoReplySettings.set(updated);
    this.saveToStorage(this.AUTO_REPLY_STORAGE_KEY, updated);
    if (this.firebaseService.isFirebaseConfigured()) {
      this.firebaseService.saveWebsiteContent('auto_reply', updated).catch(err => {
        console.warn('[AcademyDataService] Background Firestore sync failed for auto_reply:', err);
      });
    }
  }

  // --- Lead CRUD Methods ---

  addLead(leadData: { name: string; phone: string; email?: string; program: string; source: string; notes?: string }): Lead {
    const newLead: Lead = {
      id: 'lead_' + Date.now(),
      name: leadData.name.trim(),
      phone: leadData.phone.trim(),
      email: leadData.email ? leadData.email.trim() : '',
      program: leadData.program || 'Digital Marketing 150 Days',
      source: leadData.source || 'Website Enquiry',
      createdAt: new Date().toISOString(),
      status: 'New',
      notes: leadData.notes || ''
    };

    const updated = [newLead, ...this.leads()];
    this.leads.set(updated);
    this.saveToStorage(this.LEADS_STORAGE_KEY, updated);

    // Push to Firestore inquiries collection in background
    if (this.firebaseService.isFirebaseConfigured()) {
      const inquiryMessage = (newLead.notes && newLead.notes.trim().length > 0)
        ? newLead.notes.trim()
        : `Slot reservation inquiry for ${newLead.program} from ${newLead.source}`;

      this.firebaseService.submitInquiry({
        name: newLead.name,
        email: newLead.email,
        phone: newLead.phone,
        message: inquiryMessage,
        program: newLead.program,
        source: newLead.source,
        status: newLead.status,
        notes: newLead.notes
      }).then(docId => {
        newLead.id = docId;
      }).catch(err => {
        console.warn('[AcademyDataService] Firestore push deferred:', err);
      });
    }

    return newLead;
  }

  updateLead(id: string, updatedFields: Partial<Lead>): void {
    const updated = this.leads().map(l => l.id === id ? { ...l, ...updatedFields } : l);
    this.leads.set(updated);
    this.saveToStorage(this.LEADS_STORAGE_KEY, updated);

    if (updatedFields.status && this.firebaseService.isFirebaseConfigured()) {
      this.firebaseService.updateInquiryStatus(id, updatedFields.status).catch(err => {
        console.warn('[AcademyDataService] Firestore status update deferred:', err);
      });
    }
  }

  updateLeadStatus(id: string, status: Lead['status']): void {
    this.updateLead(id, { status });
  }

  deleteLead(id: string): void {
    const updated = this.leads().filter(l => l.id !== id);
    this.leads.set(updated);
    this.saveToStorage(this.LEADS_STORAGE_KEY, updated);

    if (this.firebaseService.isFirebaseConfigured()) {
      this.firebaseService.deleteInquiry(id).catch(err => {
        console.warn('[AcademyDataService] Firestore delete deferred:', err);
      });
    }
  }

  // --- Dynamic Firestore Website Content Sync Methods ---

  async loadDynamicContentFromFirestore(): Promise<void> {
    if (!this.firebaseService.isFirebaseConfigured()) return;

    try {
      // 1. Attach Real-Time Cloud Listeners
      // Ensures whenever SEO team or Admin updates any page in Firestore, all users and devices reflect changes immediately without deployment!

      // Site Settings & Homepage
      this.firebaseService.listenToWebsiteContent<SiteContent>('site_settings', (doc) => {
        if (doc) {
          const merged = { ...this.siteContent(), ...doc };
          this.siteContent.set(merged);
          this.saveToStorage(this.SITE_CONTENT_KEY, merged);
        }
      });

      // SEO & Meta Configuration
      this.firebaseService.listenToWebsiteContent<SeoConfig>('seo', (doc) => {
        if (doc) {
          const merged = { ...this.seoConfig(), ...doc };
          this.seoConfig.set(merged);
          this.saveToStorage(this.SEO_CONFIG_KEY, merged);
          this.applySeoTags();
        }
      });

      // About Us Page Copy
      this.firebaseService.listenToWebsiteContent<AboutPageContent>('about', (doc) => {
        if (doc) {
          const merged = { ...DEFAULT_ABOUT_CONTENT, ...doc };
          this.aboutContent.set(merged);
          this.saveToStorage(this.ABOUT_STORAGE_KEY, merged);
        }
      });

      // Career & Culture Page Copy
      this.firebaseService.listenToWebsiteContent<CareerPageContent>('career', (doc) => {
        if (doc) {
          const merged = { ...DEFAULT_CAREER_CONTENT, ...doc };
          this.careerContent.set(merged);
          this.saveToStorage(this.CAREER_STORAGE_KEY, merged);
        }
      });

      // Internal Avirbhav Career Roles
      this.firebaseService.listenToWebsiteContent<{ roles: JobListing[] }>('career_roles', (doc) => {
        if (doc && Array.isArray(doc.roles) && doc.roles.length > 0) {
          this.careerRoles.set(doc.roles);
          this.saveToStorage(this.CAREER_ROLES_KEY, doc.roles);
        }
      });

      // External Jobs Board (Naukri, Apna, LinkedIn, Indeed, Shine)
      this.firebaseService.listenToWebsiteContent<{ jobs: JobListing[] }>('external_jobs', (doc) => {
        if (doc && Array.isArray(doc.jobs) && doc.jobs.length > 0) {
          this.externalJobs.set(doc.jobs);
          this.saveToStorage(this.EXTERNAL_JOBS_KEY, doc.jobs);
        }
      });

      // Courses & Curriculum Catalog
      this.firebaseService.listenToWebsiteContent<{ summaryCourses?: ModuleItem[]; catalog?: Record<string, CourseDetailData> }>('courses', (doc) => {
        if (doc) {
          if (doc.summaryCourses && doc.summaryCourses.length > 0) {
            this.courses.set(doc.summaryCourses);
            this.saveToStorage(this.COURSES_STORAGE_KEY, doc.summaryCourses);
          }
          if (doc.catalog && Object.keys(doc.catalog).length > 0) {
            this.courseCatalog.set({ ...this.courseCatalog(), ...doc.catalog });
            this.saveToStorage(this.CATALOG_STORAGE_KEY, this.courseCatalog());
          }
        }
      });

      // The Squad & Team Members
      this.firebaseService.listenToWebsiteContent<{ members: TeamMember[] }>('team', (doc) => {
        if (doc && Array.isArray(doc.members) && doc.members.length > 0) {
          this.teamMembers.set(doc.members);
          this.saveToStorage(this.TEAM_STORAGE_KEY, doc.members);
        }
      });

      // Auto Reply Email Templates
      this.firebaseService.listenToWebsiteContent<AutoReplySettings>('auto_reply', (doc) => {
        if (doc) {
          this.autoReplySettings.set(doc);
          this.saveToStorage(this.AUTO_REPLY_STORAGE_KEY, doc);
        }
      });

      // 2. Initial Fetch & Auto-Seed Check
      const siteDoc = await this.firebaseService.getWebsiteContent<SiteContent>('site_settings');
      if (!siteDoc) {
        console.log('[AcademyDataService] Empty Firestore database detected. Auto-seeding all baseline website content to Firestore...');
        await this.syncAllContentToFirestore();
      }
    } catch (err) {
      console.warn('[AcademyDataService] Failed to load/bind dynamic content from Firestore:', err);
    }
  }

  async syncAllContentToFirestore(): Promise<{ success: boolean; message: string }> {
    try {
      await Promise.all([
        this.firebaseService.saveWebsiteContent('site_settings', this.siteContent()),
        this.firebaseService.saveWebsiteContent('seo', this.seoConfig()),
        this.firebaseService.saveWebsiteContent('about', this.aboutContent()),
        this.firebaseService.saveWebsiteContent('career', this.careerContent()),
        this.firebaseService.saveWebsiteContent('career_roles', { roles: this.careerRoles() }),
        this.firebaseService.saveWebsiteContent('external_jobs', { jobs: this.externalJobs() }),
        this.firebaseService.saveWebsiteContent('courses', { summaryCourses: this.courses(), catalog: this.courseCatalog() }),
        this.firebaseService.saveWebsiteContent('team', { members: this.teamMembers() }),
        this.firebaseService.saveWebsiteContent('auto_reply', this.autoReplySettings()),
        this.firebaseService.saveWebsiteContent('assets', { assets: this.assets() })
      ]);
      return { success: true, message: 'All website content successfully synchronized to Firebase Firestore!' };
    } catch (err: any) {
      return { success: false, message: err?.message || 'Error syncing content to Firestore' };
    }
  }

  async pullAllContentFromFirestore(): Promise<{ success: boolean; message: string }> {
    try {
      const [siteDoc, seoDoc, aboutDoc, careerDoc, rolesDoc, jobsDoc, coursesDoc, replyDoc, teamDoc] = await Promise.all([
        this.firebaseService.getWebsiteContent<SiteContent>('site_settings'),
        this.firebaseService.getWebsiteContent<SeoConfig>('seo'),
        this.firebaseService.getWebsiteContent<AboutPageContent>('about'),
        this.firebaseService.getWebsiteContent<CareerPageContent>('career'),
        this.firebaseService.getWebsiteContent<{ roles: JobListing[] }>('career_roles'),
        this.firebaseService.getWebsiteContent<{ jobs: JobListing[] }>('external_jobs'),
        this.firebaseService.getWebsiteContent<{ summaryCourses?: ModuleItem[]; catalog?: Record<string, CourseDetailData> }>('courses'),
        this.firebaseService.getWebsiteContent<AutoReplySettings>('auto_reply'),
        this.firebaseService.getWebsiteContent<{ members: TeamMember[] }>('team')
      ]);

      if (siteDoc) {
        const merged = { ...this.siteContent(), ...siteDoc };
        this.siteContent.set(merged);
        this.saveToStorage(this.SITE_CONTENT_KEY, merged);
      }
      if (seoDoc) {
        const merged = { ...this.seoConfig(), ...seoDoc };
        this.seoConfig.set(merged);
        this.saveToStorage(this.SEO_CONFIG_KEY, merged);
        this.applySeoTags();
      }
      if (aboutDoc) {
        const merged = { ...DEFAULT_ABOUT_CONTENT, ...aboutDoc };
        this.aboutContent.set(merged);
        this.saveToStorage(this.ABOUT_STORAGE_KEY, merged);
      }
      if (careerDoc) {
        const merged = { ...DEFAULT_CAREER_CONTENT, ...careerDoc };
        this.careerContent.set(merged);
        this.saveToStorage(this.CAREER_STORAGE_KEY, merged);
      }
      if (rolesDoc && Array.isArray(rolesDoc.roles) && rolesDoc.roles.length > 0) {
        this.careerRoles.set(rolesDoc.roles);
        this.saveToStorage(this.CAREER_ROLES_KEY, rolesDoc.roles);
      }
      if (jobsDoc && Array.isArray(jobsDoc.jobs) && jobsDoc.jobs.length > 0) {
        this.externalJobs.set(jobsDoc.jobs);
        this.saveToStorage(this.EXTERNAL_JOBS_KEY, jobsDoc.jobs);
      }
      if (coursesDoc) {
        if (coursesDoc.summaryCourses && coursesDoc.summaryCourses.length > 0) {
          this.courses.set(coursesDoc.summaryCourses);
          this.saveToStorage(this.COURSES_STORAGE_KEY, coursesDoc.summaryCourses);
        }
        if (coursesDoc.catalog && Object.keys(coursesDoc.catalog).length > 0) {
          this.courseCatalog.set({ ...this.courseCatalog(), ...coursesDoc.catalog });
          this.saveToStorage(this.CATALOG_STORAGE_KEY, this.courseCatalog());
        }
      }
      if (replyDoc) {
        this.autoReplySettings.set(replyDoc);
        this.saveToStorage(this.AUTO_REPLY_STORAGE_KEY, replyDoc);
      }
      if (teamDoc && Array.isArray(teamDoc.members) && teamDoc.members.length > 0) {
        this.teamMembers.set(teamDoc.members);
        this.saveToStorage(this.TEAM_STORAGE_KEY, teamDoc.members);
      }

      return { success: true, message: 'Successfully pulled latest SEO & CMS copy from live Firestore cloud!' };
    } catch (err: any) {
      return { success: false, message: err?.message || 'Error pulling content from Firestore' };
    }
  }


  // --- The Squad / Team Members CRUD Methods ---

  getTeamMemberBySlug(slug: string): TeamMember | undefined {
    if (!slug) return undefined;
    const normalized = slug.trim().toLowerCase();
    return this.teamMembers().find(m => m.slug.toLowerCase() === normalized || m.id === slug);
  }

  addTeamMember(member: TeamMember): void {
    const updated = [...this.teamMembers(), member];
    this.teamMembers.set(updated);
    this.saveToStorage(this.TEAM_STORAGE_KEY, updated);
    this.firebaseService.saveWebsiteContent('team', { members: updated }).catch(err => {
      console.warn('[AcademyDataService] Background cloud save failed for team member addition:', err);
    });
  }

  updateTeamMember(member: TeamMember): void {
    const updated = this.teamMembers().map(m => m.id === member.id ? member : m);
    this.teamMembers.set(updated);
    this.saveToStorage(this.TEAM_STORAGE_KEY, updated);
    this.firebaseService.saveWebsiteContent('team', { members: updated }).catch(err => {
      console.warn('[AcademyDataService] Background cloud save failed for team member update:', err);
    });
  }

  deleteTeamMember(id: string): void {
    const updated = this.teamMembers().filter(m => m.id !== id);
    this.teamMembers.set(updated);
    this.saveToStorage(this.TEAM_STORAGE_KEY, updated);
    this.firebaseService.saveWebsiteContent('team', { members: updated }).catch(err => {
      console.warn('[AcademyDataService] Background cloud save failed for team member deletion:', err);
    });
  }

  updateAllTeamMembers(members: TeamMember[]): void {
    this.teamMembers.set(members);
    this.saveToStorage(this.TEAM_STORAGE_KEY, members);
    this.firebaseService.saveWebsiteContent('team', { members }).catch(err => {
      console.warn('[AcademyDataService] Background cloud save failed for team members:', err);
    });
  }

  // --- Deep Course & Catalog CRUD Methods ---

  getCourseDetail(idOrSlug: string): CourseDetailData {
    if (!idOrSlug) return this.courseCatalog()['01'] || getCourseByIdOrSlug('01');

    const cat = this.courseCatalog();
    if (cat[idOrSlug]) {
      return cat[idOrSlug];
    }

    const normalized = idOrSlug.trim().toLowerCase();
    const found = Object.values(cat).find(
      c => c.slug?.toLowerCase() === normalized || c.id?.toLowerCase() === normalized
    );
    if (found) return found;

    return getCourseByIdOrSlug(idOrSlug);
  }

  saveCourse(detail: CourseDetailData, summary?: Partial<ModuleItem>): void {
    const id = detail.id || (Object.keys(this.courseCatalog()).length + 1 < 10 ? `0${Object.keys(this.courseCatalog()).length + 1}` : `${Object.keys(this.courseCatalog()).length + 1}`);
    const updatedDetail: CourseDetailData = {
      ...detail,
      id
    };

    // 1. Update deep catalog
    const updatedCatalog = {
      ...this.courseCatalog(),
      [id]: updatedDetail
    };
    this.courseCatalog.set(updatedCatalog);
    this.saveToStorage(this.CATALOG_STORAGE_KEY, updatedCatalog);

    // 2. Synchronize summary ModuleItem on Home Curriculum
    const currentCourses = this.courses();
    const existingIndex = currentCourses.findIndex(c => c.id === id);

    const summaryItem: ModuleItem = {
      id,
      title: summary?.title || detail.shortTitle || detail.titlePrefix,
      category: summary?.category || detail.category,
      badge: summary?.badge || detail.badge,
      metric: summary?.metric || (detail.statBar && detail.statBar[0]?.value) || '100%',
      metricLabel: summary?.metricLabel || (detail.statBar && detail.statBar[0]?.label) || 'Practical Application',
      desc: summary?.desc || detail.tagline || 'Master agency-standard frameworks and practical execution.',
      icon: summary?.icon || '01',
      gradient: summary?.gradient || 'from-sky-900/60 via-blue-950/80 to-slate-950',
      iconBg: summary?.iconBg || 'bg-sky-500/10 text-sky-400',
      deliverables: summary?.deliverables || (detail.heroMasteries && detail.heroMasteries.slice(0, 3)) || ['Hands-on Projects', 'Live Agency Blueprint', 'Certified Outcome']
    };

    let updatedCourses: ModuleItem[];
    if (existingIndex >= 0) {
      updatedCourses = currentCourses.map((c, i) => i === existingIndex ? summaryItem : c);
    } else {
      updatedCourses = [...currentCourses, summaryItem];
    }
    this.courses.set(updatedCourses);
    this.saveToStorage(this.COURSES_STORAGE_KEY, updatedCourses);

    if (this.firebaseService.isFirebaseConfigured()) {
      this.firebaseService.saveWebsiteContent('courses', {
        summaryCourses: updatedCourses,
        catalog: updatedCatalog
      }).catch(err => console.warn('[AcademyDataService] Background Firestore sync failed for courses:', err));
    }
  }

  deleteCourse(id: string): void {
    // 1. Remove from Catalog
    const updatedCatalog = { ...this.courseCatalog() };
    delete updatedCatalog[id];
    this.courseCatalog.set(updatedCatalog);
    this.saveToStorage(this.CATALOG_STORAGE_KEY, updatedCatalog);

    // 2. Remove from Summary courses
    const updatedCourses = this.courses().filter(c => c.id !== id);
    this.courses.set(updatedCourses);
    this.saveToStorage(this.COURSES_STORAGE_KEY, updatedCourses);

    if (this.firebaseService.isFirebaseConfigured()) {
      this.firebaseService.saveWebsiteContent('courses', {
        summaryCourses: updatedCourses,
        catalog: updatedCatalog
      }).catch(err => console.warn('[AcademyDataService] Background Firestore sync failed for courses:', err));
    }
  }

  // --- Assets CRUD Methods ---

  addAsset(asset: Omit<AssetItem, 'id' | 'createdAt'>): AssetItem {
    const newAsset: AssetItem = {
      ...asset,
      id: 'asset_' + Date.now(),
      createdAt: new Date().toISOString()
    };
    const updated = [newAsset, ...this.assets()];
    this.assets.set(updated);
    this.saveToStorage(this.ASSETS_STORAGE_KEY, updated);

    if (this.firebaseService.isFirebaseConfigured()) {
      this.firebaseService.saveWebsiteContent('assets', { assets: updated }).catch(err => {
        console.warn('[AcademyDataService] Background Firestore sync failed for assets:', err);
      });
    }
    return newAsset;
  }

  updateAsset(id: string, updates: Partial<AssetItem>): void {
    const updated = this.assets().map(a => a.id === id ? { ...a, ...updates } : a);
    this.assets.set(updated);
    this.saveToStorage(this.ASSETS_STORAGE_KEY, updated);

    if (this.firebaseService.isFirebaseConfigured()) {
      this.firebaseService.saveWebsiteContent('assets', { assets: updated }).catch(err => {
        console.warn('[AcademyDataService] Background Firestore sync failed for assets:', err);
      });
    }
  }

  deleteAsset(id: string): void {
    const updated = this.assets().filter(a => a.id !== id);
    this.assets.set(updated);
    this.saveToStorage(this.ASSETS_STORAGE_KEY, updated);

    if (this.firebaseService.isFirebaseConfigured()) {
      this.firebaseService.saveWebsiteContent('assets', { assets: updated }).catch(err => {
        console.warn('[AcademyDataService] Background Firestore sync failed for assets:', err);
      });
    }
  }

  assignAsset(target: 'logo' | 'mentor' | 'banner', assetUrl: string): void {
    if (target === 'logo') {
      this.updateSiteContent({ siteLogoUrl: assetUrl });
    } else if (target === 'mentor') {
      this.updateSiteContent({ mentorImage: assetUrl });
    }

    // Update assignment badge in assets list
    const updated = this.assets().map(a => {
      if (a.url === assetUrl) {
        return { ...a, assignedTo: target === 'logo' ? 'Site Header Logo' : target === 'mentor' ? 'Mentor Spotlight (Deekshith)' : 'Promotional Banner' };
      }
      return a;
    });
    this.assets.set(updated);
    this.saveToStorage(this.ASSETS_STORAGE_KEY, updated);
  }

  updateSiteContent(content: Partial<SiteContent>): void {
    const updated = { ...this.siteContent(), ...content };
    this.siteContent.set(updated);
    this.saveToStorage(this.SITE_CONTENT_KEY, updated);
    if (this.firebaseService.isFirebaseConfigured()) {
      this.firebaseService.saveWebsiteContent('site_settings', updated).catch(err => {
        console.warn('[AcademyDataService] Background Firestore sync failed for site_settings:', err);
      });
    }
  }

  // --- Dynamic SEO & Meta Tags Methods ---

  updateSeoConfig(newConfig: Partial<SeoConfig>): void {
    const updated = { ...this.seoConfig(), ...newConfig };
    this.seoConfig.set(updated);
    this.saveToStorage(this.SEO_CONFIG_KEY, updated);
    this.applySeoTags();
    if (this.firebaseService.isFirebaseConfigured()) {
      this.firebaseService.saveWebsiteContent('seo', updated).catch(err => {
        console.warn('[AcademyDataService] Background Firestore sync failed for seo:', err);
      });
    }
  }

  applySeoTags(): void {
    const cfg = this.seoConfig();
    if (!cfg) return;

    // 1. Title
    this.titleService.setTitle(cfg.title);

    // 2. Standard Meta Tags
    this.metaService.updateTag({ name: 'description', content: cfg.metaDescription });
    this.metaService.updateTag({ name: 'keywords', content: cfg.metaKeywords });
    this.metaService.updateTag({ name: 'author', content: cfg.author });
    this.metaService.updateTag({ name: 'robots', content: cfg.robots });

    // 3. Open Graph (OG) Tags
    this.metaService.updateTag({ property: 'og:title', content: cfg.ogTitle });
    this.metaService.updateTag({ property: 'og:description', content: cfg.ogDescription });
    this.metaService.updateTag({ property: 'og:image', content: cfg.ogImage });
    this.metaService.updateTag({ property: 'og:url', content: cfg.canonicalUrl });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });

    // 4. Twitter Card Tags
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: cfg.ogTitle });
    this.metaService.updateTag({ name: 'twitter:description', content: cfg.ogDescription });
    this.metaService.updateTag({ name: 'twitter:image', content: cfg.ogImage });
  }

  // --- System Backup & Restore Utilities ---

  exportBackup(): void {
    const backup: SiteBackupData = {
      version: 'avirbhav_cms_backup_v2',
      exportedAt: new Date().toISOString(),
      leads: this.leads(),
      courses: this.courses(),
      courseCatalog: this.courseCatalog(),
      assets: this.assets(),
      siteContent: this.siteContent(),
      seoConfig: this.seoConfig()
    };

    const json = JSON.stringify(backup, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    link.href = url;
    link.download = `avirbhav_site_backup_${dateStr}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  importBackup(jsonString: string): boolean {
    try {
      const data: Partial<SiteBackupData> = JSON.parse(jsonString);
      if (data.siteContent) {
        this.siteContent.set({ ...this.siteContent(), ...data.siteContent });
        this.saveToStorage(this.SITE_CONTENT_KEY, this.siteContent());
      }
      if (data.seoConfig) {
        this.seoConfig.set({ ...this.seoConfig(), ...data.seoConfig });
        this.saveToStorage(this.SEO_CONFIG_KEY, this.seoConfig());
        this.applySeoTags();
      }
      if (data.courses && Array.isArray(data.courses)) {
        this.courses.set(data.courses);
        this.saveToStorage(this.COURSES_STORAGE_KEY, data.courses);
      }
      if (data.courseCatalog) {
        this.courseCatalog.set(data.courseCatalog);
        this.saveToStorage(this.CATALOG_STORAGE_KEY, data.courseCatalog);
      }
      if (data.assets && Array.isArray(data.assets)) {
        this.assets.set(data.assets);
        this.saveToStorage(this.ASSETS_STORAGE_KEY, data.assets);
      }
      if (data.leads && Array.isArray(data.leads)) {
        this.leads.set(data.leads);
        this.saveToStorage(this.LEADS_STORAGE_KEY, data.leads);
      }
      return true;
    } catch (e) {
      console.error('Failed to import backup:', e);
      return false;
    }
  }

  resetToDefaults(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(this.COURSES_STORAGE_KEY);
      window.localStorage.removeItem(this.CATALOG_STORAGE_KEY);
      window.localStorage.removeItem(this.SITE_CONTENT_KEY);
      window.localStorage.removeItem(this.ASSETS_STORAGE_KEY);
      window.localStorage.removeItem(this.SEO_CONFIG_KEY);
      window.location.reload();
    }
  }

  // --- Excel / CSV Export Utility ---

  exportLeadsToExcel(leadsToExport?: Lead[]): void {
    const list = leadsToExport && leadsToExport.length > 0 ? leadsToExport : this.leads();
    if (list.length === 0) {
      alert('No leads available to export!');
      return;
    }

    const headers = [
      'Lead ID',
      'Student Name',
      'Phone / WhatsApp',
      'Email',
      'Program / Course Selected',
      'Enquiry Source',
      'Date & Time',
      'Status',
      'Notes'
    ];

    const escapeCsv = (val: string | undefined): string => {
      if (!val) return '""';
      const clean = val.replace(/"/g, '""');
      return `"${clean}"`;
    };

    const rows = list.map(item => {
      const dateFormatted = new Date(item.createdAt).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'medium',
        timeStyle: 'short'
      });

      return [
        escapeCsv(item.id),
        escapeCsv(item.name),
        escapeCsv(item.phone),
        escapeCsv(item.email),
        escapeCsv(item.program),
        escapeCsv(item.source),
        escapeCsv(dateFormatted),
        escapeCsv(item.status),
        escapeCsv(item.notes || '')
      ].join(',');
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const today = new Date().toISOString().split('T')[0];
    link.setAttribute('href', url);
    link.setAttribute('download', `avirbhav_academy_leads_${today}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // --- Helpers for LocalStorage ---

  private getFromStorage<T>(key: string): T | null {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      }
    } catch (e) {
      console.warn('LocalStorage read error:', e);
    }
    return null;
  }

  private saveToStorage<T>(key: string, data: T): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, JSON.stringify(data));
      }
    } catch (e) {
      console.warn('LocalStorage write error:', e);
    }
  }
}
