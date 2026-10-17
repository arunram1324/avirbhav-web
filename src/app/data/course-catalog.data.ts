export interface SyllabusModule {
  id: number;
  title: string;
  duration: string;
  topics: string[];
  tools: string[];
  hasAi?: boolean;
}

export interface PricingPlan {
  name: string;
  badge: string;
  badgeColor: string;
  isPopular?: boolean;
  price: string;
  originalPrice: string;
  savings: string;
  period: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaType: string;
}

export interface CourseDetailData {
  id: string;
  slug: string;
  titlePrefix: string;
  titleHighlight: string;
  shortTitle: string;
  badge: string;
  category: string;
  heroPill3: string;
  tagline: string;
  heroCardHeading: string;
  heroCardPills: string[];
  heroMasteries: string[];
  statBar: { value: string; label: string }[];
  overviewHeading: string;
  overviewHighlight: string;
  overviewSubheading: string;
  alumniCaseTitle: string;
  averageSalary: string;
  salarySubtext: string;
  portfolioCase: {
    clientType: string;
    title: string;
    desc: string;
    author: string;
    authorRole: string;
    verifiedBadge: string;
  };
  studentQuote: {
    quote: string;
    author: string;
    role: string;
  };
  genAiQuestion: string;
  genAiAnswer: string;
  timelinePhases: {
    phase: string;
    weeks: string;
    title: string;
    desc: string;
  }[];
  syllabusModules: SyllabusModule[];
  whyFaqs: { q: string; a: string }[];
  faqs: { q: string; a: string }[];
}

export const COURSE_CATALOG: Record<string, CourseDetailData> = {
  // ========================================================
  // COURSE 01: SOCIAL MEDIA MARKETING & AI AUTOMATION
  // ========================================================
  '01': {
    id: '01',
    slug: 'social-media-marketing',
    titlePrefix: 'Social Media Marketing & AI Automation',
    titleHighlight: 'Program',
    shortTitle: 'Social Media Marketing',
    badge: 'Core Track',
    category: 'Marketing Service • Organic Virality',
    heroPill3: '⚡ AI-Enhanced Mastery',
    tagline: 'Develop the in-demand skills of a high-performance digital marketer, learn how to leverage GenAI tools & automations, and work with personal mentors in an exclusive 4-student cohort. Complete hands-on client projects with a job guarantee at graduation.',
    heroCardHeading: 'Become a Digital Marketing Expert — Before You Finish College.',
    heroCardPills: ['Earn As A Freelancer', 'Land An Internship', 'Build Your Personal Brand'],
    heroMasteries: [
      'Social Media Marketing',
      'Instagram & Reels Growth Strategy',
      'Meta & Google Ads',
      'SEO & Website Ranking'
    ],
    statBar: [
      { value: '4 Only', label: 'Strict Students / Batch' },
      { value: '5 Months', label: '150 Days Mastery' },
      { value: '30+ Tools', label: 'GenAI & Ad Stack' },
      { value: '₹10L+', label: 'Live Client Ad Spend' }
    ],
    overviewHeading: 'Launch a career in tech',
    overviewHighlight: 'that lasts',
    overviewSubheading: 'Launch a new career as a full-stack digital marketer in as little as 5 months with personalized 1-on-1 mentorship.',
    alumniCaseTitle: 'How Karthik Scaled ₹10L Ad Spend in Month 3',
    averageSalary: '₹6.5L – 12L',
    salarySubtext: 'Starting CTC & high-ticket freelancing retainers achieved by Avirbhav academy graduates.',
    portfolioCase: {
      clientType: 'CLIENT CASE STUDY',
      title: 'E-Commerce Brand Scale: 0 to ₹35L Revenue',
      desc: 'Built using Meta Ads Manager, Klaviyo funnels, and viral Reels content.',
      author: 'Priya Ramanathan',
      authorRole: 'Graduated Batch 08 • Now at SocialBeat',
      verifiedBadge: 'Verified ROAS 4.8x'
    },
    studentQuote: {
      quote: '"Crowded institutes pack 40 people in a class where you can\'t ask questions. At Avirbhav, with strictly 4 students per batch, Deekshith sir literally sat beside me, auditing my ad campaigns and video scripts every single day."',
      author: 'Dani Rodriguez / Vignesh',
      role: 'From Non-Tech Background to Performance Marketer'
    },
    genAiQuestion: 'Will the Social Media Marketing Program teach me how to use GenAI tools & automations?',
    genAiAnswer: 'Yes! You will learn to use AI in a way that is reflective of how high-growth modern agencies operate. We train you on ChatGPT-4o, Claude 3.5 Sonnet, Midjourney v6, and n8n workflow automations—empowering you to 10x your speed and output while keeping strategic human creativity intact.',
    timelinePhases: [
      {
        phase: 'PHASE 1',
        weeks: 'Weeks 1 – 4',
        title: 'Intro to Marketing Strategy & Psychology',
        desc: 'Consumer behavior, brand positioning, buyer personas & offer design.'
      },
      {
        phase: 'PHASE 2',
        weeks: 'Weeks 5 – 16',
        title: 'Full-Stack Video, AI & Meta Ads Immersion',
        desc: 'Viral 3s hooks, CapCut, AI copywriting, and real ₹10L+ Meta ad campaigns.'
      },
      {
        phase: 'PHASE 3',
        weeks: 'Weeks 17 – 24',
        title: 'Automation, Attribution & Placement',
        desc: 'n8n workflows, GA4 dashboards, freelance retainer contracts & mock interviews.'
      }
    ],
    syllabusModules: [
      {
        id: 1,
        title: 'Foundation on Business, Brand Positioning & Audience Psychology',
        duration: 'Week 1 - 2',
        topics: [
          'Consumer cognitive biases, attention economy & emotional purchase triggers',
          'Niche selection & market opportunity audit with real client data',
          'Brand positioning architecture: 0 to 1 identity systems that dominate niches',
          'Crafting high-converting value propositions and core offers that sell themselves'
        ],
        tools: ['Notion', 'Miro', 'Google Trends', 'AnswerThePublic']
      },
      {
        id: 2,
        title: 'The Social Algorithm Engine: Instagram, YouTube, LinkedIn & X',
        duration: 'Week 3 - 4',
        topics: [
          'Deconstructing recommendation algorithms: Watch time, shares, saves & velocity',
          'Instagram Graph API & profile conversion funnels (turning viewers into paying followers)',
          'YouTube Shorts algorithm mechanics vs long-form search intent ranking',
          'LinkedIn thought leadership architecture for high-ticket B2B client acquisition'
        ],
        tools: ['Instagram Insights', 'YouTube Studio', 'Shield Analytics', 'Metricool']
      },
      {
        id: 3,
        title: '3-Second Retention Hook & Short-Form Video Mastery (Reels / Shorts)',
        duration: 'Week 5 - 6',
        topics: [
          'The psychology of the 3-second visual and audio hook',
          'Storyboarding viral short-form narratives using the Problem-Agitation-Solution formula',
          'Audio trend forecasting and sound synchronization techniques',
          'Batching 30 high-converting reels in a single weekend shoot'
        ],
        tools: ['CapCut Pro', 'Teleprompter AI', 'Epidemic Sound', 'Descript']
      },
      {
        id: 4,
        title: 'AI Content & Copywriting Systems (ChatGPT-4o, Claude 3.5 & Perplexity)',
        duration: 'Week 7 - 8',
        hasAi: true,
        topics: [
          'Advanced prompt engineering for persuasive marketing copy that converts',
          'Training custom GPTs on brand voice, customer personas and competitive tone',
          'AI-driven viral scriptwriting for video creators and founder brands',
          'Building automated content repurposing pipelines (1 idea → 10 visual assets)'
        ],
        tools: ['ChatGPT-4o', 'Claude 3.5 Sonnet', 'Perplexity AI', 'Copy.ai']
      },
      {
        id: 5,
        title: 'AI-Powered Graphic Designing & Visual Identity Systems',
        duration: 'Week 9 - 10',
        hasAi: true,
        topics: [
          'Visual hierarchy, typography psychology and high-contrast social aesthetics',
          'Canva AI Mastery: Magic Switch, Bulk Create, Background remover & Brand kits',
          'Midjourney prompt mastery for hyper-realistic commercial ad visuals',
          'Designing carousel slide-decks that generate 10x bookmark rates on Instagram'
        ],
        tools: ['Canva Pro AI', 'Midjourney v6', 'Adobe Express', 'Figma']
      },
      {
        id: 6,
        title: 'Video Editing & Motion Graphics for High-Retention Social Ads',
        duration: 'Week 11 - 12',
        topics: [
          'Dynamic jump cuts, zoom keyframes, motion blur & text tracking',
          'Sound design mastery: Whooshes, risers, pop SFX & emotional ambient beds',
          'Color grading LUTs for mobile display brightness optimization',
          'Export presets for zero compression loss on Meta and YouTube platforms'
        ],
        tools: ['CapCut Desktop', 'Adobe Premiere Pro', 'ElevenLabs AI', 'Motion Array']
      },
      {
        id: 7,
        title: 'Organic Virality Blueprints & Community Building',
        duration: 'Week 13 - 14',
        topics: [
          'The 4 Pillars of Organic Reach: Relatability, controversy, education & aspirational lifestyle',
          'Collaborative posts, broadcast channels & Instagram Story engagement funnels',
          'Building raving Discord & WhatsApp communities around branded accounts',
          'Crisis management and managing comment section psychology'
        ],
        tools: ['ManyChat', 'Telegram', 'WhatsApp Business API', 'Discord']
      },
      {
        id: 8,
        title: 'Meta Ads Manager: Facebook & Instagram Paid Acquisition',
        duration: 'Week 15 - 16',
        topics: [
          'Campaign Objectives: Leads, Sales, Traffic, Engagement & App Installs',
          'Meta Pixel setup, Conversions API (CAPI) & custom event tracking',
          'Creative testing framework: ABO vs CBO scaling rules for profitable ROAS',
          'Managing real client budget: Spending ₹10L+ live under mentor supervision'
        ],
        tools: ['Meta Ads Manager', 'Meta Business Suite', 'Events Manager', 'Triple Whale']
      },
      {
        id: 9,
        title: 'Influencer Marketing & Brand Collaboration Deals',
        duration: 'Week 17 - 18',
        topics: [
          'Identifying nano & micro influencers with genuine engagement vs bot followers',
          'Outreach email templates, contract negotiation and barter deal frameworks',
          'Affiliate commission tracking and UTM link attribution modeling',
          'Running collaborative whitelisted ads through creator Meta handles'
        ],
        tools: ['HypeAuditor', 'Modash', 'Bitly Enterprise', 'DocuSign']
      },
      {
        id: 10,
        title: 'Social Media Automation & Lead Funnels (n8n, Make & Zapier)',
        duration: 'Week 19 - 20',
        hasAi: true,
        topics: [
          'Building zero-code webhook automations for instant lead capture',
          'Automating Instagram DM keyword triggers with ManyChat to drive lead magnet downloads',
          'Connecting Meta Leads directly to Google Sheets, Notion & CRM with n8n',
          'Automated WhatsApp follow-up messaging sequences that double booking rates'
        ],
        tools: ['n8n', 'Make.com', 'ManyChat', 'Zapier']
      },
      {
        id: 11,
        title: 'Analytics, Conversion Attribution & Monthly Client Reporting SOPs',
        duration: 'Week 21 - 22',
        topics: [
          'Google Analytics 4 (GA4): Setting up custom conversion events and user paths',
          'Calculating true Blended ROAS, Customer Acquisition Cost (CAC) & Customer Lifetime Value (LTV)',
          'Building automated client dashboards with Looker Studio',
          'Conducting monthly growth review calls that retain agency clients for years'
        ],
        tools: ['Google Analytics 4', 'Looker Studio', 'Supermetrics', 'Google Tag Manager']
      },
      {
        id: 12,
        title: 'Freelancing, High-Ticket Retainers & Placement Masterclass',
        duration: 'Week 23 - 24',
        topics: [
          'Packaging your agency portfolio with verified case studies and ad dashboards',
          'Positioning yourself on LinkedIn and Upwork to command $500–$2,000/mo international retainers',
          'Mock interviews with hiring managers from top Chennai and Bangalore agencies',
          'Contract templates, invoice setup and GST compliance for independent growth consultants'
        ],
        tools: ['LinkedIn Creator', 'Upwork', 'Bonsai', 'Razorpay']
      }
    ],
    whyFaqs: [
      {
        q: 'Who is this program for?',
        a: 'If you have the ambition to transform your career into digital marketing, freelancing, or high-growth agency roles, this program is designed for you. You don\'t need any prior marketing or tech experience as we build from psychological core fundamentals to advanced Meta ad budgets and AI automation. Perfect for fresh graduates, career switchers, and business owners looking to scale.'
      },
      {
        q: 'Why digital marketing & AI automation in 2026?',
        a: 'Traditional digital marketing that relies purely on manual work is dying. Modern high-income marketers use AI workflows to produce 10x more content, test 5x more ad hooks, and automate client lead flows with n8n and ManyChat. By mastering both human marketing psychology and modern AI tools, you become irreplaceable.'
      },
      {
        q: 'Why Avirbhav Digital Academy instead of large crowded institutes?',
        a: 'Most institutes pack 30 to 50 students into lecture halls where mentors don\'t even know your name, and you only touch dummy demo accounts. At Avirbhav, every cohort is capped at strictly 4 students (1:4 mentor ratio). Founder Deekshith Ravisankar reviews your ad accounts and video scripts desk-to-desk, and you spend real ₹10L+ client money.'
      }
    ],
    faqs: [
      {
        q: 'Why does Avirbhav strictly admit only 4 members per batch?',
        a: 'Performance marketing cannot be learned in a crowded classroom of 30+ students. To master live ad budgets, audit campaign metrics, and receive personalized feedback on creative hooks, you need direct desk-to-desk mentorship. With 4 students, founder Deekshith Ravisankar sits directly beside you, auditing every single ad and script before it goes live.'
      },
      {
        q: 'Do I need prior marketing or technical knowledge to join this program?',
        a: 'No prior experience is required. We start from ground zero—consumer psychology, offer design, and visual communication—before advancing to Meta Ads Manager, GA4 attribution, and AI automations.'
      },
      {
        q: 'Is this training practical or purely theoretical?',
        a: 'It is 100% practical. You will not sit through slide decks. From Week 2, you are executing live ad campaigns with real money (₹10L+ budget allocation), editing real client videos, and automating real business workflows.'
      },
      {
        q: 'Can working professionals attend on weekends?',
        a: 'Yes! We offer a dedicated Weekend Intensive Cohort (Sunday 09:30 AM – 01:00 PM) specifically crafted for working professionals and entrepreneurs, alongside our weekday morning and evening slots.'
      },
      {
        q: 'How does Avirbhav ensure 100% placement support?',
        a: 'Because our cohorts are capped at 4 students, our placement support is 100% personalized. We rebuild your LinkedIn profile, produce an agency-grade case study portfolio with verified ROAS screenshots, and introduce you directly to hiring managers across 40+ partner agencies in Chennai and Bangalore.'
      },
      {
        q: 'What is the medium of instruction?',
        a: 'Our sessions are conducted in a student-friendly mix of Tamil and English, ensuring complete conceptual clarity with zero language barrier, while teaching all official agency terminology used in global companies.'
      }
    ]
  },

  // ========================================================
  // COURSE 02: INSTAGRAM & REELS GROWTH MASTERY
  // ========================================================
  '02': {
    id: '02',
    slug: 'instagram-reels-growth',
    titlePrefix: 'Instagram & Short-Form Video',
    titleHighlight: 'Growth Mastery',
    shortTitle: 'Instagram & Reels Growth',
    badge: 'High Impact',
    category: 'Creative Media • Short-Form Video',
    heroPill3: '🎬 Viral Creator Blueprint',
    tagline: 'Master 3-second retention hooks, viral scriptwriting formulas, trending audio mechanics, and short-form video editing in CapCut & Premiere. Build an unstoppable audience of 100K+ followers and monetize through brand deals and high-ticket creator retainers.',
    heroCardHeading: 'Create Viral Short-Form Videos & Land High-Ticket Creator Retainers.',
    heroCardPills: ['Master Viral Hooks', 'Land Creator Retainers', 'Build 100K Audience'],
    heroMasteries: [
      '3-Second Retention Hooks',
      'CapCut & Premiere Editing',
      'Viral Scripting & Sound Sync',
      'Brand Collabs & Creator Funnels'
    ],
    statBar: [
      { value: '4 Only', label: 'Strict Creator Squad' },
      { value: '5 Months', label: 'Hands-on Production' },
      { value: '20+ Tools', label: 'Editing & AI Stack' },
      { value: '10M+', label: 'Reels Views Generated' }
    ],
    overviewHeading: 'Master the short-form',
    overviewHighlight: 'attention economy',
    overviewSubheading: 'Learn how to script, shoot, edit, and scale viral Reels and YouTube Shorts with dedicated 1:4 mentor attention.',
    alumniCaseTitle: 'How Vignesh Hit 100K Followers in 60 Days with 3s Hooks',
    averageSalary: '₹5.5L – 10L',
    salarySubtext: 'Starting CTC as Video Strategist & High-Ticket $2K/mo Creator Retainers.',
    portfolioCase: {
      clientType: 'CREATOR CASE STUDY',
      title: 'Fitness Creator: 1.2K to 142K Followers in 90 Days',
      desc: 'Produced 45 retention-tested Reels using CapCut, dynamic text animations, and viral audio syncing.',
      author: 'Vigneshwaran M',
      authorRole: 'Graduated Batch 07 • Now Independent Video Growth Partner',
      verifiedBadge: '18M Organic Views'
    },
    studentQuote: {
      quote: '"I used to spend 6 hours editing one reel that got 300 views. At Avirbhav, Deekshith taught me the 3-second visual contrast rule and trending sound timing. My third reel in class crossed 850,000 views!"',
      author: 'Keerthana Swaminathan',
      role: 'Content Creator & Short-Form Video Editor'
    },
    genAiQuestion: 'Can AI help me produce viral Reels and Shorts faster?',
    genAiAnswer: 'Absolutely! You will master ElevenLabs for crystal-clear voiceovers, ChatGPT-4o for hook ideation, Descript for filler-word removal, and Runway/Midjourney for eye-catching b-roll visuals that boost viewer retention.',
    timelinePhases: [
      {
        phase: 'PHASE 1',
        weeks: 'Weeks 1 – 4',
        title: 'Hook Psychology & Scripting Architecture',
        desc: 'Attention spans, visual pattern interrupts, and the Problem-Agitate-Solve framework.'
      },
      {
        phase: 'PHASE 2',
        weeks: 'Weeks 5 – 16',
        title: 'CapCut & Premiere Pro Editing Immersion',
        desc: 'Speed ramping, keyframe zooming, motion text tracking, and sound design layers.'
      },
      {
        phase: 'PHASE 3',
        weeks: 'Weeks 17 – 24',
        title: 'Monetization, Funnels & Brand Sponsorships',
        desc: 'ManyChat automation, DM funnel conversions, and high-ticket retainer client acquisition.'
      }
    ],
    syllabusModules: [
      {
        id: 1,
        title: 'Attention Economics & The 3-Second Hook Science',
        duration: 'Week 1 - 2',
        topics: [
          'The neurochemistry of social scrolling: Dopamine, curiosity gaps & micro-commitments',
          'Visual pattern interrupts: Camera whips, object drops, and contrasting wardrobe choices',
          'Verbal hooks vs Text-on-screen hooks: Crafting the perfect opening sentence',
          'Auditing top 100 viral reels across niche categories with proprietary swipe files'
        ],
        tools: ['Notion', 'Instagram Insights', 'TikTok Creative Center', 'SwipeFile']
      },
      {
        id: 2,
        title: 'Viral Scriptwriting Formulas & Narrative Pacing',
        duration: 'Week 3 - 4',
        topics: [
          'The PAS Framework (Problem, Agitate, Solve) for 45-second educational videos',
          'Storytelling loop techniques: Open loops that keep viewers glued till the end',
          'Writing for the ear: Short sentences, conversational Tamil-English cadence, and punchlines',
          'Using ChatGPT-4o to brainstorm 50 hook variations in 5 minutes'
        ],
        tools: ['ChatGPT-4o', 'Teleprompter AI', 'Google Docs', 'Claude 3.5']
      },
      {
        id: 3,
        title: 'Smartphone Cinematography & Studio Lighting on a Budget',
        duration: 'Week 5 - 6',
        topics: [
          'iPhone & Android camera settings: 4K 60fps, exposure lock & stabilization rules',
          'Three-point lighting setup: Key light, fill light, and ambient background RGB tubes',
          'Wireless audio capture: Lapel mics, noise cancellation, and room acoustic treatment',
          'Framing rules for 9:16 vertical video: Safe zones for UI overlays and captions'
        ],
        tools: ['Blackmagic Camera App', 'Hollyland Wireless Mic', 'Godox LED', 'Neewer Ring']
      },
      {
        id: 4,
        title: 'CapCut Pro Desktop Mastery: Fast-Paced Dynamic Editing',
        duration: 'Week 7 - 8',
        topics: [
          'Trimming dead air, breath cuts & jump cuts for non-stop pacing',
          'Keyframe animation: Dynamic zooms, pans, and subject tracking',
          'Auto-captions with custom brand styling, highlighted trigger words & emoji popups',
          'Green screen replacement and multi-layer overlay blending'
        ],
        tools: ['CapCut Pro Desktop', 'ElevenLabs', 'Descript', 'CapCut Web']
      },
      {
        id: 5,
        title: 'Sound Design Mastery: Audio Synchronization & Trending Sounds',
        duration: 'Week 9 - 10',
        topics: [
          'Layering audio: Dialogue normalization, background beat drops, and Foley SFX',
          'Trending sound forecasting: Riding audio waves before they peak on Instagram',
          'Impact sound effects: Whooshes, pops, mouse clicks, bass drops, and vinyl scratches',
          'Copyright compliance and commercial audio licensing'
        ],
        tools: ['Epidemic Sound', 'Freesound', 'Instagram Music Library', 'CapCut SFX']
      },
      {
        id: 6,
        title: 'Adobe Premiere Pro for Vertical Video & Motion Graphics',
        duration: 'Week 11 - 12',
        topics: [
          'Setting up custom 9:16 vertical workspace presets in Premiere Pro',
          'Essential Graphics: Lower thirds, callout arrows, and subscribe button animations',
          'Color grading vertical footage: Lumetri color curves and skin tone correction',
          'Render queue optimization for instant mobile export without color degradation'
        ],
        tools: ['Adobe Premiere Pro', 'After Effects', 'Envato Elements', 'Motion Array']
      },
      {
        id: 7,
        title: 'High-Retention Carousel Design & Static Visual Systems',
        duration: 'Week 13 - 14',
        topics: [
          'The anatomy of a 10-slide high-save Instagram carousel',
          'Seamless slide transitions: Panoramas that bridge across slides 1, 2, and 3',
          'Canva AI bulk design: Creating a month of carousel assets in under 2 hours',
          'Typography hierarchy: Choosing headline fonts that stop thumb scrolling'
        ],
        tools: ['Canva Pro AI', 'Figma', 'Photoshop', 'Coolors']
      },
      {
        id: 8,
        title: 'Instagram Algorithm Mechanics & Feed Distribution Architecture',
        duration: 'Week 15 - 16',
        topics: [
          'Watch time vs Completion rate: Why the 100%+ completion benchmark triggers virality',
          'Shares and DMs: The two highest-weighted algorithmic signals in 2026',
          'Posting schedules, caption keywords (SEO for Instagram), and hashtag clusters',
          'Diagnosing shadowbans, view drops, and algorithmic resets'
        ],
        tools: ['Instagram Graph API', 'Metricool', 'Sprout Social', 'Meta Creator Studio']
      },
      {
        id: 9,
        title: 'DM Funnels & Automated Follower-to-Customer Systems',
        duration: 'Week 17 - 18',
        hasAi: true,
        topics: [
          'Setting up ManyChat keyword automation: "Comment GUIDE to get the link in DM"',
          'Building conversational chat funnels that capture email & WhatsApp numbers',
          'Instagram Story engagement sequences: Polls, quizzes, and countdown stickers',
          'Broadcast Channels: Nurturing a super-fan community that buys on command'
        ],
        tools: ['ManyChat', 'WhatsApp Business', 'ConvertKit', 'Notion CRM']
      },
      {
        id: 10,
        title: 'YouTube Shorts & Multi-Platform Syndication (TikTok, LinkedIn & X)',
        duration: 'Week 19 - 20',
        topics: [
          'YouTube Shorts algorithm: Search-driven vs browse-driven recommendations',
          'Creating YouTube Shorts thumbnails and title tags that boost click-through rate (CTR)',
          'Repurposing vertical video for LinkedIn Thought Leadership without looking out of place',
          'Managing multi-platform posting pipelines with automated schedulers'
        ],
        tools: ['YouTube Studio', 'Buffer', 'Later', 'VidIQ']
      },
      {
        id: 11,
        title: 'Brand Sponsorships, Media Kits & Rate Card Negotiations',
        duration: 'Week 21 - 22',
        topics: [
          'Designing an irresistible Media Kit showcasing demographic engagement & views',
          'Calculating your CPM rate: How much to charge for 1 Reel, 3 Stories, and 1 Link in Bio',
          'Pitching brands with custom video concepts instead of boring generic emails',
          'Deliverables contracts, usage rights, whitelisting fees, and payment milestones'
        ],
        tools: ['Canva Media Kit', 'DocuSign', 'Notion Invoicing', 'PayPal']
      },
      {
        id: 12,
        title: 'High-Ticket Creator Retainers & Video Growth Agency Launch',
        duration: 'Week 23 - 24',
        topics: [
          'Positioning yourself as a "Video Growth Partner" rather than just a freelance video editor',
          'Packaging monthly retainers: "12 Reels + Scripts + Audio Research for ₹50,000/mo"',
          'Signing local Chennai businesses (cafes, gyms, real estate, doctors) on retainer',
          'Client onboarding SOPs, asset handover systems, and weekly feedback loops'
        ],
        tools: ['Bonsai', 'Trello', 'Google Drive', 'Zoom']
      }
    ],
    whyFaqs: [
      {
        q: 'Can beginners without camera confidence join this track?',
        a: 'Yes! You do not need to be an extrovert or face the camera if you prefer not to. We teach faceless channel mechanics, voiceover animation, screen capture tutorials, and behind-the-scenes editing alongside on-camera performance coaching.'
      },
      {
        q: 'Do I need expensive DSLR cameras or studio lights?',
        a: 'Not at all. In 2026, 95% of viral Reels are shot directly on smartphones (iPhone or modern Android). We teach you professional lighting and camera apps that make a ₹20K phone look like a Netflix production.'
      },
      {
        q: 'How fast can I start getting paid for short-form video skills?',
        a: 'By Week 8, you will be producing high-retention short-form videos with CapCut Pro. Brands and business owners are desperately hiring editors at ₹1,500–₹3,000 per Reel, meaning you can easily earn your course tuition back while still studying.'
      }
    ],
    faqs: [
      {
        q: 'Why does Avirbhav limit this creator cohort to 4 members?',
        a: 'Video editing and storytelling require frame-by-frame critique. In a class of 30, a mentor cannot review your timeline cuts, sound balance, or 3-second hook pacing. At Avirbhav, Deekshith sits beside you, trimming frames and correcting your scripts in real-time.'
      },
      {
        q: 'What video editing software will I master in this program?',
        a: 'You will master CapCut Pro Desktop, Adobe Premiere Pro, ElevenLabs AI Voice, Teleprompter AI, and ManyChat automated DM funnels.'
      },
      {
        q: 'Will I work on real creators and brand accounts?',
        a: 'Yes. You will produce real video content for live brand accounts and creators under Avirbhav\'s studio network, giving you undeniable portfolio proof.'
      },
      {
        q: 'Is placement support included for video creators?',
        a: 'Yes! We connect you with content agencies, D2C brands, and creator companies looking for in-house short-form video leads and growth strategists.'
      },
      {
        q: 'Can I do this part-time or on weekends?',
        a: 'Yes, we offer both Flexible weekday evening slots and an Intensive Weekend Batch with hands-on studio shooting labs.'
      },
      {
        q: 'What is the refund policy?',
        a: 'We offer a 100% money-back guarantee if you complete all assignments, attend live sessions, and do not receive placement opportunities or client retainers within 180 days.'
      }
    ]
  },

  // ========================================================
  // COURSE 03: META & GOOGLE ADS SPECIALIST
  // ========================================================
  '03': {
    id: '03',
    slug: 'meta-google-ads',
    titlePrefix: 'Meta & Google Performance Ads',
    titleHighlight: 'Specialist Program',
    shortTitle: 'Meta & Google Ads',
    badge: 'Paid Ads',
    category: 'Performance Marketing • Paid Acquisition',
    heroPill3: '💰 ₹10L+ Client Ad Budgets',
    tagline: 'Manage real ₹10L+ client ad budgets under 1:4 desk-to-desk mentorship with Deekshith Ravisankar. Master Meta Ads Manager, CBO/ABO budgeting, Google Search, PMax, Conversion API, and ROAS scaling for high-ticket e-commerce & lead gen brands.',
    heroCardHeading: 'Scale Real ₹10L+ Client Ad Budgets & Become an Elite Media Buyer.',
    heroCardPills: ['Manage ₹10L+ Budget', 'Master CBO/ABO Scaling', 'Hit 4.5x ROAS'],
    heroMasteries: [
      'Meta Ads Manager Mastery',
      'Google Search & PMax',
      'Conversion API & Server Tracking',
      'ROAS Scaling & Attribution'
    ],
    statBar: [
      { value: '4 Only', label: 'Strict Media Buyers' },
      { value: '5 Months', label: 'Live Ad Spend Lab' },
      { value: '25+ Tools', label: 'Ad Tech & Tracking Stack' },
      { value: '₹10L+', label: 'Real Ad Money Allocated' }
    ],
    overviewHeading: 'Master media buying with',
    overviewHighlight: 'real client budgets',
    overviewSubheading: 'Learn how to spend real money profitably on Facebook, Instagram, Google Search, and YouTube with a verified 1:4 mentor ratio.',
    alumniCaseTitle: 'How Karthik Scaled a D2C Brand from 1.8x to 4.5x ROAS',
    averageSalary: '₹7L – 14L',
    salarySubtext: 'Starting CTC as Senior Media Buyer + Monthly Performance Bonuses.',
    portfolioCase: {
      clientType: 'PERFORMANCE CASE STUDY',
      title: 'D2C Fashion Brand: ₹50K to ₹8.5L Monthly Ad Spend',
      desc: 'Engineered ABO-to-CBO scaling rules and custom Conversion API tracking to achieve consistent 4.2x ROAS.',
      author: 'Karthik Subramanian',
      authorRole: 'Graduated Batch 06 • Now Performance Lead at Swiggy Partner Brand',
      verifiedBadge: 'Verified 4.2x ROAS'
    },
    studentQuote: {
      quote: '"Other institutes make you watch screen recordings of ads from 2021. At Avirbhav, Deekshith handed me access to a live client ad account with ₹3,00,000 monthly spend on Day 30. You learn 100x faster when real money is on the line."',
      author: 'Aravind Krishnan',
      role: 'Media Buyer & Performance Marketing Consultant'
    },
    genAiQuestion: 'How is AI changing performance advertising in 2026?',
    genAiAnswer: 'Meta Advantage+ and Google Performance Max use AI for automated bidding and audience matching. We train you on the human inputs that AI cannot do: psychological angle testing, creative diversification, and server-side first-party data tracking.',
    timelinePhases: [
      {
        phase: 'PHASE 1',
        weeks: 'Weeks 1 – 4',
        title: 'Media Buying Math, Pixel & Conversion Tracking',
        desc: 'CAC, LTV, Blended ROAS, Meta Pixel & Server-Side Conversions API (CAPI).'
      },
      {
        phase: 'PHASE 2',
        weeks: 'Weeks 5 – 16',
        title: 'Meta & Google Ads Campaign Architecture',
        desc: 'Testing hooks, angles, ABO scaling, Google Search intent & Performance Max (PMax).'
      },
      {
        phase: 'PHASE 3',
        weeks: 'Weeks 17 – 24',
        title: 'Scaling, Omnichannel Attribution & Agency Retainers',
        desc: 'Triple Whale attribution, custom dashboards, and high-ticket media buyer retainer contracts.'
      }
    ],
    syllabusModules: [
      {
        id: 1,
        title: 'The Financial Math of Paid Advertising & Unit Economics',
        duration: 'Week 1 - 2',
        topics: [
          'Deconstructing Customer Acquisition Cost (CAC) vs Customer Lifetime Value (LTV)',
          'Return on Ad Spend (ROAS), Cost Per Lead (CPL) & Gross Margin calculations',
          'Break-even ROAS formula: Why 2x ROAS can be profitable for brand A and bankrupt brand B',
          'Building financial projection models in Google Sheets for client pitches'
        ],
        tools: ['Google Sheets', 'Notion', 'Calculators', 'Miro']
      },
      {
        id: 2,
        title: 'Meta Business Manager Setup & Enterprise Security Architecture',
        duration: 'Week 3 - 4',
        topics: [
          'Business Manager verification, domain verification & payment threshold limits',
          'Preventing ad account bans, policy compliance & contingency backup profiles',
          'Asset sharing: Assigning partner permissions, pixel access, and catalog rights',
          'Two-factor authentication and agency security SOPs'
        ],
        tools: ['Meta Business Suite', 'Events Manager', 'Brand Rights Protection']
      },
      {
        id: 3,
        title: 'Server-Side Conversions API (CAPI) & Advanced Event Tracking',
        duration: 'Week 5 - 6',
        topics: [
          'The death of third-party browser cookies: Why traditional pixels under-report sales by 30%',
          'Server-side tagging via Google Tag Manager (GTM) and Stape.io',
          'Deduplicating browser and server events with unique Event IDs',
          'Configuring custom parameters: Content ID, value, currency, and customer lifetime tier'
        ],
        tools: ['Google Tag Manager', 'Stape.io', 'Meta Pixel Helper', 'Cloudflare']
      },
      {
        id: 4,
        title: 'High-Converting Ad Creative Testing Matrix & Angle Ideation',
        duration: 'Week 7 - 8',
        hasAi: true,
        topics: [
          'The 3 Core Ad Angles: Pain point relief, aspirational transformation & logical value',
          'Dynamic Creative Testing (DCT): Testing 3 hooks × 2 bodies × 2 visuals in 1 ad set',
          'UGC (User Generated Content) script generation using ChatGPT-4o and customer reviews',
          'Creating high-contrast image ads and native TikTok-style video creatives'
        ],
        tools: ['Canva Pro AI', 'Foreplay.co', 'ChatGPT-4o', 'CapCut']
      },
      {
        id: 5,
        title: 'Meta Campaign Architecture: ABO vs CBO Scaling Rules',
        duration: 'Week 9 - 10',
        topics: [
          'Advantage Campaign Budget (CBO) vs Ad Set Budget (ABO) strategic allocation',
          'Cold traffic audience strategies: Broad targeting (open targeting) vs Lookalikes (LAL)',
          'Horizontal scaling (testing new creatives) vs Vertical scaling (raising budgets by 20%/day)',
          'Automated bid rules: Surfing, kill rules, and anti-fatigue frequency caps'
        ],
        tools: ['Meta Ads Manager', 'Revealbot', 'Supermetrics', 'Madgicx']
      },
      {
        id: 6,
        title: 'Google Search Ads: High-Intent Keyword Domination',
        duration: 'Week 11 - 12',
        topics: [
          'Search match types: Exact match, phrase match & broad match with smart bidding',
          'Negative keyword hygiene: Blocking irrelevant search terms and saving 35% ad spend',
          'Responsive Search Ads (RSA): Writing 15 headlines and 4 descriptions that win ad auctions',
          'Quality Score mechanics: Improving CTR, ad relevance, and landing page experience'
        ],
        tools: ['Google Ads Keyword Planner', 'Google Ads Editor', 'SpyFu']
      },
      {
        id: 7,
        title: 'Google Performance Max (PMax) & Google Shopping Automation',
        duration: 'Week 13 - 14',
        topics: [
          'Setting up Google Merchant Center (GMC) and product feed optimization',
          'Asset groups in PMax: Search themes, audience signals & custom intent segments',
          'PMax optimization: Excluding brand search cannibalization and junk display placements',
          'E-commerce dynamic product remarketing across Gmail, YouTube, and Discovery'
        ],
        tools: ['Google Merchant Center', 'Google Ads', 'Feedonomics', 'Shopify']
      },
      {
        id: 8,
        title: 'YouTube Video Ads & Omnichannel Retargeting Funnels',
        duration: 'Week 15 - 16',
        topics: [
          'In-stream skippable ads: The 5-second hook that weeds out non-buyers and saves budget',
          'Sequencing ad funnels: Retargeting cart abandoners with customer testimonials',
          'Cross-platform retargeting: Show YouTube ads to people who visited via Meta ads',
          'Exclusion lists: Filtering out existing buyers to maximize acquisition efficiency'
        ],
        tools: ['YouTube Ads', 'Google Ads', 'Meta Events Manager', 'Vimeo']
      },
      {
        id: 9,
        title: 'Landing Page Conversion Rate Optimization (CRO) & A/B Testing',
        duration: 'Week 17 - 18',
        topics: [
          'Why ads fail because of bad landing pages: The Above-the-Fold formula',
          'Heatmap analysis: Tracking where users drop off using Microsoft Clarity and Hotjar',
          'A/B split testing headlines, CTA button colors, pricing anchors, and trust badges',
          'Mobile speed optimization: Achieving under 2.5s page load times for ad clicks'
        ],
        tools: ['Microsoft Clarity', 'Hotjar', 'Google PageSpeed Insights', 'Unbounce']
      },
      {
        id: 10,
        title: 'Multi-Touch Attribution & GA4 Custom Conversions',
        duration: 'Week 19 - 20',
        topics: [
          'First-click vs Last-click vs Data-driven attribution models in Google Analytics 4',
          'UTM tracking taxonomy: Standardizing source, medium, campaign, content & term',
          'Triple Whale & Northbeam first-party attribution tracking platforms overview',
          'Reconciling ad platform reported revenue with Shopify/Stripe bank reality'
        ],
        tools: ['Google Analytics 4', 'Triple Whale', 'Google Tag Manager', 'Shopify Analytics']
      },
      {
        id: 11,
        title: 'Managing Real Client Budgets: Live ₹10L+ Spend Execution',
        duration: 'Week 21 - 22',
        topics: [
          'Real-time account auditing under founder Deekshith Ravisankar\'s direct desk review',
          'Daily media buyer checklist: Anomaly detection, CPA spikes, and creative fatigue',
          'Weekly budget reallocation: Shifting funds from underperforming ad sets to winning hooks',
          'Building automated weekly client dashboards on Looker Studio'
        ],
        tools: ['Looker Studio', 'Meta Ads Manager', 'Google Ads', 'Slack']
      },
      {
        id: 12,
        title: 'Agency Media Buyer Retainer Pitching & Career Placement',
        duration: 'Week 23 - 24',
        topics: [
          'How to pitch e-commerce brands: "I will audit your ad account for free and scale ROAS"',
          'Pricing media buyer retainers: Base fee (₹40K/mo) + 10% performance bonus on ad spend',
          'Mock interviews for Senior Media Buyer & Performance Marketing Specialist agency roles',
          'Case study portfolio creation: Showcasing real spend dashboards with confidential data obfuscated'
        ],
        tools: ['LinkedIn Creator', 'Upwork', 'Bonsai', 'Canva Portfolio']
      }
    ],
    whyFaqs: [
      {
        q: 'Do I get to spend real client money during this program?',
        a: 'YES! This is Avirbhav\'s biggest differentiator. You are allocated real ₹10L+ client ad accounts across e-commerce, education, and service businesses under 1:4 desk-to-desk mentor supervision. You do not graduate on dummy accounts.'
      },
      {
        q: 'Is media buying a math-heavy subject?',
        a: 'It requires basic business arithmetic (calculating percentages, profit margins, and return ratios), but you don\'t need advanced algebra or coding. We provide automated Google Sheets templates that do all the heavy calculations for you.'
      },
      {
        q: 'What salaries do Media Buyers command in 2026?',
        a: 'Because media buyers directly generate revenue for companies, they are among the highest-paid marketing professionals. Entry to mid-level buyers command ₹6.5L–₹14L CTC, plus monthly profit-share bonuses from e-commerce brands.'
      }
    ],
    faqs: [
      {
        q: 'Why does Avirbhav limit this performance cohort to 4 members?',
        a: 'When you are managing real ad accounts spending thousands of rupees every day, mistakes can be costly. With strictly 4 students, founder Deekshith Ravisankar audits every campaign setting, bid strategy, and audience parameter before you click publish.'
      },
      {
        q: 'What certifications will I earn upon graduation?',
        a: 'You will graduate with official Meta Certified Digital Marketing Associate / Media Buying Professional certifications, Google Ads Search & Display certifications, and the Avirbhav Master Performance Marketer Diploma.'
      },
      {
        q: 'Will I learn both Meta Ads and Google Ads?',
        a: 'Yes! The program provides deep, comprehensive training across both Meta (Facebook, Instagram, Messenger) and Google (Search, Performance Max, YouTube, Display).'
      },
      {
        q: 'What happens if a campaign underperforms?',
        a: 'Underperforming campaigns are part of real-world learning. Deekshith will analyze the failure with you, inspect the drop-off metrics (hook rate, hold rate, CTR, landing page conversion), and help you pivot to winning creatives.'
      },
      {
        q: 'Can working professionals attend?',
        a: 'Yes, we provide flexible weekday morning/evening options and a weekend batch designed for marketing executives, agency founders, and business owners.'
      },
      {
        q: 'Is there a job guarantee?',
        a: 'Yes! We provide a 100% money-back job guarantee. If you complete all 12 modules and follow our 1:4 placement coaching without landing a role or client retainer within 180 days, you receive a full tuition refund.'
      }
    ]
  },

  // ========================================================
  // COURSE 04: SEO & WEBSITE RANKING
  // ========================================================
  '04': {
    id: '04',
    slug: 'seo-website-ranking',
    titlePrefix: 'Technical SEO & Search Visibility',
    titleHighlight: 'Mastery Program',
    shortTitle: 'SEO & Website Ranking',
    badge: 'Organic',
    category: 'Organic Growth • Search Visibility',
    heroPill3: '🚀 #1 Page Google Rankings',
    tagline: 'Dominate Google search results with intent-driven keyword research, technical on-page audits, schema markup, high-authority backlink outreach, and programmatic local SEO. Rank #1 on search engines without paying for ad clicks.',
    heroCardHeading: 'Master Technical SEO & Rank Real Business Websites on Google Page 1.',
    heroCardPills: ['Rank #1 on Google', 'Build Domain Authority', 'Audit Real Websites'],
    heroMasteries: [
      'Keyword Intent Discovery',
      'Technical & On-Page Audits',
      'Google Search Console & GA4',
      'Local Map Pack & Backlink Systems'
    ],
    statBar: [
      { value: '4 Only', label: 'Strict SEO Cohort' },
      { value: '5 Months', label: 'Live Site Auditing' },
      { value: '20+ Tools', label: 'SEO & Crawling Tools' },
      { value: '50K+', label: 'Monthly Organic Clicks' }
    ],
    overviewHeading: 'Capture sustainable traffic',
    overviewHighlight: 'from search engines',
    overviewSubheading: 'Learn how to rank real websites on Google with technical SEO audits, high-intent topic clusters, and white-hat link building.',
    alumniCaseTitle: 'How Sneha Ranked 48 Commercial Keywords on Google Page 1',
    averageSalary: '₹6L – 11L',
    salarySubtext: 'Starting CTC as SEO Strategist & International $1.5K/mo SEO Retainers.',
    portfolioCase: {
      clientType: 'SEO CASE STUDY',
      title: 'B2B SaaS: Ranked 48 Commercial Keywords #1',
      desc: 'Fixed Core Web Vitals, built intent topic clusters, and earned 35 high-authority backlinks to drive 35K organic visitors/mo.',
      author: 'Sneha Venkatesh',
      authorRole: 'Graduated Batch 08 • Now Organic Growth Lead at Chennai FinTech',
      verifiedBadge: '35K Monthly Clicks'
    },
    studentQuote: {
      quote: '"Most courses teach you to stuff keywords in meta tags. At Avirbhav, we crawled enterprise websites with Screaming Frog, resolved canonical loops, and built programmatic internal links. Seeing my client website hit Rank #1 on Google was magical."',
      author: 'Rahul Sundaram',
      role: 'Technical SEO Consultant'
    },
    genAiQuestion: 'How does Google\'s AI Search (SGE) affect SEO in 2026?',
    genAiAnswer: 'Search Generative Experience (SGE) rewards authoritative first-hand experience (E-E-A-T) and direct answers. We teach you how to optimize for AI Overviews, semantic entities, and conversational search queries so your content gets cited as the primary source.',
    timelinePhases: [
      {
        phase: 'PHASE 1',
        weeks: 'Weeks 1 – 4',
        title: 'Search Intent, Crawlers & Technical Audits',
        desc: 'Keyword intent clustering, search bot indexing, and Screaming Frog crawl audits.'
      },
      {
        phase: 'PHASE 2',
        weeks: 'Weeks 5 – 16',
        title: 'On-Page Architecture, Schema & Local Google Maps',
        desc: 'Semantic content briefs, Core Web Vitals, Schema JSON-LD, and Google Business ranking.'
      },
      {
        phase: 'PHASE 3',
        weeks: 'Weeks 17 – 24',
        title: 'Digital PR, Backlink Outreach & Agency Retainers',
        desc: 'White-hat HARO outreach, competitor link gaps, and managing high-ticket SEO monthly retainers.'
      }
    ],
    syllabusModules: [
      {
        id: 1,
        title: 'How Search Engines Work: Crawling, Indexing & Ranking Algorithms',
        duration: 'Week 1 - 2',
        topics: [
          'Googlebot architecture: Discovery, crawl budget management & rendering engines',
          'The 200+ Google ranking factors that actually matter in 2026 vs outdated myths',
          'Understanding Google Helpful Content Update & E-E-A-T (Experience, Expertise, Authoritativeness, Trust)',
          'Setting up Google Search Console and inspecting indexation issues'
        ],
        tools: ['Google Search Console', 'Google Trends', 'Bing Webmaster Tools']
      },
      {
        id: 2,
        title: 'High-Intent Keyword Research & Topic Clustering',
        duration: 'Week 3 - 4',
        topics: [
          'Informational vs Navigational vs Commercial vs Transactional search intent',
          'Keyword gap analysis: Stealing profitable competitor search keywords with Semrush',
          'Building Topic Clusters & Pillar Page architecture that establishes topical authority',
          'Long-tail keyword discovery: Finding zero-competition keywords with high buyer intent'
        ],
        tools: ['Semrush', 'Ahrefs', 'AnswerThePublic', 'AlsoAsked']
      },
      {
        id: 3,
        title: 'Technical SEO Auditing with Screaming Frog & Sitebulb',
        duration: 'Week 5 - 6',
        topics: [
          'Configuring Screaming Frog SEO Spider to crawl up to 100,000 URLs',
          'Fixing 404 broken links, 301 redirect chains, and circular redirection loops',
          'Canonicalization tag hierarchy: Resolving duplicate content issues on e-commerce catalogs',
          'Robots.txt syntax and XML Sitemap optimization for maximum crawl efficiency'
        ],
        tools: ['Screaming Frog', 'Sitebulb', 'HTTP Status Code Checker', 'Postman']
      },
      {
        id: 4,
        title: 'Core Web Vitals & Mobile Technical Performance',
        duration: 'Week 7 - 8',
        topics: [
          'Mastering LCP (Largest Contentful Paint), INP (Interaction to Next Paint) & CLS (Cumulative Layout Shift)',
          'Eliminating render-blocking CSS/JS and optimizing web fonts loading',
          'Next-gen image formatting (WebP/AVIF), responsive srcset, and lazy loading',
          'Auditing real client websites using Google Lighthouse and Chrome DevTools'
        ],
        tools: ['Google PageSpeed Insights', 'Chrome DevTools', 'Cloudflare', 'TinyPNG']
      },
      {
        id: 5,
        title: 'On-Page SEO Mastery: Content Optimization & Semantic Entities',
        duration: 'Week 9 - 10',
        hasAi: true,
        topics: [
          'Title tag & Meta description copywriting that maximizes Click-Through Rate (CTR)',
          'H1, H2, H3 hierarchy and semantic HTML structuring for search bots',
          'Internal linking strategies: Funneling link equity from high-authority pages to money pages',
          'Using SurferSEO and Claude 3.5 to optimize content for NLP entity models'
        ],
        tools: ['SurferSEO', 'Clearscope', 'Claude 3.5', 'Yoast SEO']
      },
      {
        id: 6,
        title: 'Schema Markup & Rich Snippets Implementation (JSON-LD)',
        duration: 'Week 11 - 12',
        topics: [
          'Structuring data with JSON-LD: Organization, LocalBusiness, FAQ, Product, and Article schemas',
          'Winning Google Rich Results: Star ratings, pricing badges, and collapsible FAQ dropdowns',
          'Testing schemas with Google Rich Results Test & Schema Validator',
          'Automating schema deployment via Google Tag Manager without editing website source code'
        ],
        tools: ['Schema.org', 'Google Rich Results Test', 'TechnicalSEO.com Schema Generator']
      },
      {
        id: 7,
        title: 'Local SEO & Google Business Profile Domination (3-Pack Map Ranking)',
        duration: 'Week 13 - 14',
        topics: [
          'Claiming, verifying, and fully optimizing Google Business Profile (GBP)',
          'Local citation building: NAP (Name, Address, Phone) consistency across directories',
          'Review velocity strategies: Legally generating 50+ genuine 5-star reviews from happy clients',
          'Local geotargeted landing pages for multi-location businesses'
        ],
        tools: ['Google Business Profile', 'BrightLocal', 'Whitespark', 'Google Maps API']
      },
      {
        id: 8,
        title: 'E-Commerce SEO: Scaling Shopify & WooCommerce Catalogs',
        duration: 'Week 15 - 16',
        topics: [
          'Category page optimization: Writing copy that ranks while driving checkout sales',
          'Faceted navigation SEO: Preventing filter parameters (?color=blue&size=m) from indexing',
          'Product schema with live stock status and customer review feeds',
          'Out-of-stock product handling strategies that preserve hard-earned SEO equity'
        ],
        tools: ['Shopify SEO', 'WooCommerce', 'Semrush E-commerce', 'Ahrefs']
      },
      {
        id: 9,
        title: 'White-Hat Link Building & Digital PR Outreach',
        duration: 'Week 17 - 18',
        topics: [
          'The Link Building Manifesto: Why spammy Fiverr links hurt and how to spot toxic domains',
          'Competitor backlink replication: Stealing the high-authority links your competitors have',
          'HARO (Help A Reporter Out) & Connectively: Landing mentions on Forbes, Business Insider & Hindu',
          'The Skyscraper Technique: Creating industry-defining link magnets that attract organic links'
        ],
        tools: ['Ahrefs Site Explorer', 'Hunter.io', 'Connectively / HARO', 'Buzzstream']
      },
      {
        id: 10,
        title: 'Google Search Console Deep Dive & Keyword Cannibalization Fixes',
        duration: 'Week 19 - 20',
        topics: [
          'Mining GSC Performance data: Identifying high-impression, low-CTR keywords to quickly double traffic',
          'Detecting keyword cannibalization: When 2 pages compete for the same query and both sink',
          'URL Inspection tool: Diagnosing live rendering issues, canonical mismatches & mobile usability errors',
          'Automating GSC anomaly alerts in Google Looker Studio'
        ],
        tools: ['Google Search Console', 'Looker Studio', 'Screaming Frog', 'Sheets API']
      },
      {
        id: 11,
        title: 'SEO for AI Search (SGE / Google AI Overviews) & Programmatic SEO',
        duration: 'Week 21 - 22',
        hasAi: true,
        topics: [
          'Optimizing for Google SGE: How to get your brand quoted inside AI-generated answer boxes',
          'Programmatic SEO: Generating 500+ location/niche landing pages using structured databases',
          'Voice search optimization and conversational long-tail queries',
          'Future-proofing your organic strategy against AI model crawlers'
        ],
        tools: ['Perplexity AI', 'Google SGE', 'Airtable', 'Webflow']
      },
      {
        id: 12,
        title: 'SEO Client Retainers, Reporting Dashboards & Placement Pitching',
        duration: 'Week 23 - 24',
        topics: [
          'Structuring monthly SEO retainers: Fixing recurring technical issues + content + link building',
          'Building automated client ranking reports in Looker Studio with zero manual screenshots',
          'Conducting professional SEO audits that close ₹30K–₹75K/mo agency retainers',
          'Mock interviews for SEO Analyst, Technical SEO Specialist & Growth Lead roles'
        ],
        tools: ['Looker Studio', 'Bonsai', 'Notion Audit Templates', 'LinkedIn']
      }
    ],
    whyFaqs: [
      {
        q: 'Is SEO still relevant with AI Search engines like ChatGPT and Perplexity?',
        a: 'SEO is more critical than ever! Search engines and AI models need crawled web sources to cite as verified answers. By mastering modern technical SEO, schema markup, and first-hand E-E-A-T authority, your content becomes the trusted data source that AI quotes.'
      },
      {
        q: 'Do I need to know how to code to do Technical SEO?',
        a: 'You do not need to be a software engineer. We teach you how to read HTML tags, edit JSON-LD schema snippets, and use tools like Screaming Frog and Google Tag Manager to diagnose and fix technical issues with zero complex programming.'
      },
      {
        q: 'How long does it take to see results from SEO?',
        a: 'While high-competition keywords take 3–6 months, our local SEO, technical audit fixes, and low-competition intent keyword strategies frequently generate page #1 rankings and traffic spikes within 30 to 45 days.'
      }
    ],
    faqs: [
      {
        q: 'Why does Avirbhav admit only 4 students in the SEO cohort?',
        a: 'SEO audits are intensely hands-on. Crawling an enterprise website with Screaming Frog produces thousands of URL rows with redirect issues, canonical warnings, and schema bugs. In a 4-member squad, Deekshith walks through your audit line-by-line, showing you exactly how to remediate each issue.'
      },
      {
        q: 'What SEO tools will I receive access to in this course?',
        a: 'You will work hands-on with Semrush, Ahrefs, Screaming Frog SEO Spider, Google Search Console, Google Tag Manager, Sitebulb, and SurferSEO.'
      },
      {
        q: 'Will I audit and rank real business websites?',
        a: 'Yes! Every student audits live commercial websites and local businesses, identifying technical bottlenecks and seeing their recommendations implemented.'
      },
      {
        q: 'What career roles does this program prepare me for?',
        a: 'You will be prepared for roles like Technical SEO Specialist, Organic Growth Manager, Local SEO Lead, and independent international SEO consultant commanding $1,000–$2,500/mo retainers.'
      },
      {
        q: 'Are weekend classes available?',
        a: 'Yes, we provide flexible weekday morning/evening batches and an intensive weekend cohort for working professionals.'
      },
      {
        q: 'What is the refund guarantee?',
        a: 'We offer a 100% full tuition refund if you complete all 12 modules, attend live mentor reviews, and do not receive placement offers or client retainers within 180 days.'
      }
    ]
  }
};

export function getCourseByIdOrSlug(idOrSlug: string): CourseDetailData {
  if (!idOrSlug) return COURSE_CATALOG['01'];
  if (COURSE_CATALOG[idOrSlug]) {
    return COURSE_CATALOG[idOrSlug];
  }
  const normalized = idOrSlug.trim().toLowerCase();
  const found = Object.values(COURSE_CATALOG).find(
    c => c.slug === normalized || c.id === normalized
  );
  return found || COURSE_CATALOG['01'];
}
