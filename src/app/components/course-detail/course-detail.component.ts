import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AcademyDataService } from '../../services/academy-data.service';

interface SyllabusModule {
  id: number;
  title: string;
  duration: string;
  topics: string[];
  tools: string[];
}

interface BatchSchedule {
  type: string;
  mode: string;
  timings: string[];
  badge: string;
  seatsLeft: string;
}

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent {
  academyService = inject(AcademyDataService);

  @Input() courseId: string = '01';
  @Output() goBack = new EventEmitter<void>();
  @Output() openBookingModal = new EventEmitter<string>();

  // Quick enquiry form inside hero
  leadName = '';
  leadPhone = '';
  leadEmail = '';
  learningMode: 'Offline' | 'Online' = 'Offline';
  formSubmitted = signal(false);
  formError = signal('');

  // CareerFoundry Study Pace & Sidebar navigation
  activePace = signal<'flexible' | 'fulltime'>('flexible');
  activeSidebarSection = signal<string>('overview');
  activeWhyFaqIndex = signal<number | null>(0);

  // Active accordion item index for Syllabus
  activeSyllabusIndex = signal<number>(0);
  
  // Active FAQ index
  activeFaqIndex = signal<number | null>(null);

  // Sidebar navigation items matching CareerFoundry
  sidebarItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'job-guarantee', label: 'Job Guarantee & 4-Student USP' },
    { id: 'curriculum', label: 'Curriculum & Timeline' },
    { id: 'how-it-works', label: 'Human-Centric Mentorship' },
    { id: 'who-it-is-for', label: 'Who It Is For' },
    { id: 'tuition-fee', label: 'Tuition & Batch Fees' },
    { id: 'faq', label: 'FAQs' }
  ];

  // Pricing & Batch Plans (CareerFoundry Style)
  pricingPlans = [
    {
      name: 'One-Time Upfront',
      badge: 'Save 10% On Full Payment',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      price: '₹39,500',
      originalPrice: '₹44,000',
      savings: '₹4,500 Instant Saving',
      period: 'Complete 5-Month Program',
      description: 'Best value for students paying upfront. Full access to all 12 modules, client ad budgets, and certification vouchers.',
      features: [
        '1:4 Desk-to-Desk Mentorship with Deekshith',
        'Real ₹10L+ Client Ad Spend Account Access',
        '15+ Official Global Certifications (Meta, Google, HubSpot)',
        '100% Placement Guarantee or Full Refund',
        'Lifetime Access to Agency SOPs & Notion Templates'
      ],
      ctaText: 'Enroll Now (Save ₹4,500) ↗',
      ctaType: 'primary'
    },
    {
      name: '3-Month Zero-Cost EMI',
      badge: '⭐ Most Popular',
      badgeColor: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
      isPopular: true,
      price: '₹14,000',
      originalPrice: '3 Monthly Installments',
      savings: 'Zero Interest / 0% Extra Charge',
      period: 'per month for 3 months',
      description: 'Split your fee comfortably into 3 equal monthly payments. Zero paperwork, zero hidden financing charges.',
      features: [
        'Book seat today with ₹5,000 token',
        'Remaining balance split in 3 monthly installments',
        'Equal 1:4 mentor access & client ad spend',
        'Dedicated 1-on-1 placement coaching until hired',
        'Flexible batch timings (Weekday / Weekend)'
      ],
      ctaText: 'Apply for 0% EMI ↗',
      ctaType: 'accent'
    },
    {
      name: 'Strict 4-Member Seat Lock',
      badge: '🔥 Strictly 4 Seats Only',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      price: '₹5,000',
      originalPrice: 'Token Advance',
      savings: 'Only 2 Seats Left for Next Batch',
      period: 'Advance Seat Reservation',
      description: 'Lock 1 of exactly 4 seats in the upcoming cohort. Attend Day 1 with complete confidence before paying the remaining fee.',
      features: [
        'Guaranteed seat in next 4-student cohort',
        '100% risk-free: Refundable before Day 1',
        'Instant access to Pre-Course AI Toolkit',
        'Personal 15-minute onboarding with Deekshith',
        'Classroom (Perungudi, Chennai) or Online Live'
      ],
      ctaText: 'Reserve 1 of 4 Seats ↗',
      ctaType: 'primary'
    }
  ];

  // CareerFoundry "Who it is for" Accordions
  whyFaqs = [
    {
      q: 'Who is this program for?',
      a: 'If you have the ambition to transform your career into digital marketing, freelancing, or high-growth agency roles, this program is designed for you. You don’t need any prior marketing or tech experience as we build from psychological core fundamentals to advanced Meta ad budgets and AI automation. Perfect for fresh graduates, career switchers, and business owners looking to scale.'
    },
    {
      q: 'Why digital marketing & AI automation in 2026?',
      a: 'Digital marketing is growing exponentially, but 2026 demands marketers who know AI workflows, algorithmic short-form video retention, and profitable paid acquisition. Our graduates don’t just post content; they build automated lead funnels and run high-budget Meta ad campaigns that generate real revenue for brands.'
    },
    {
      q: 'Why Avirbhav Digital Academy instead of large crowded institutes?',
      a: 'Traditional institutes dump 30 to 50 students in a single lecture room where questions are ignored and ad budgets are simulated on slides. At Avirbhav, our core USP is strictly 4 members per batch. Founder Deekshith Ravisankar sits desk-to-desk with you daily, auditing your real campaigns, allocating real client ad budgets, and coaching you until you are successfully placed.'
    }
  ];

  // Batch Schedules (Strict 4 Members USP)
  batchSchedules: BatchSchedule[] = [
    {
      type: 'WEEKDAY BATCH',
      mode: 'CLASSROOM (PERUNGUDI, CHENNAI)',
      badge: 'Strictly 4 Students / Batch',
      seatsLeft: 'Only 2 Seats Left for Next Batch',
      timings: [
        '07:30 AM to 09:00 AM',
        '09:30 AM to 11:00 AM',
        '11:30 AM to 01:00 PM',
        '02:30 PM to 04:00 PM',
        '04:30 PM to 06:00 PM'
      ]
    },
    {
      type: 'WEEKDAY BATCH',
      mode: 'ONLINE LIVE INTERACTIVE (1:4 RATIO)',
      badge: 'Strictly 4 Students / Batch',
      seatsLeft: 'Only 1 Seat Left for Next Batch',
      timings: [
        '07:30 AM to 09:00 AM',
        '11:30 AM to 01:00 PM',
        '02:30 PM to 04:00 PM',
        '07:30 PM to 09:00 PM'
      ]
    },
    {
      type: 'WEEKEND INTENSIVE',
      mode: 'HYBRID / WORKING PROFESSIONALS',
      badge: 'Strictly 4 Students / Batch',
      seatsLeft: 'Weekend Fast-Track (4 Seats Only)',
      timings: [
        '09:30 AM to 01:00 PM (Morning Strategy)',
        '02:00 PM to 05:30 PM (Live Campaign Lab)'
      ]
    }
  ];

  // Course Highlights Metrics (USP Front & Center)
  highlights = [
    { label: 'Avirbhav Core USP', value: '4 Only', desc: 'Strictly 4 students per batch for 100% individual mentor focus' },
    { label: 'Global Certifications', value: '15+', desc: 'Meta, Google, HubSpot & Avirbhav Master Diploma' },
    { label: 'Capstone Projects', value: '5+', desc: 'Live ad spend on real client brand accounts' },
    { label: 'Real Case Studies', value: '10+', desc: 'Chennai & global brand growth breakdowns' },
    { label: 'Practical Hours', value: '240+', desc: 'Zero boring theory—pure hands-on execution' },
    { label: 'AI Marketing Tools', value: '25+', desc: 'GenAI workflows to 10x agency output' }
  ];

  // 12 Comprehensive Syllabus Modules
  syllabusModules: SyllabusModule[] = [
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
      topics: [
        'Visual hierarchy, typography psychology and high-contrast social aesthetics',
        'Canva AI Mastery: Magic Switch, Bulk Create, Background remover & Brand kits',
        'Midjourney prompt mastery for hyper-realistic commercial ad visuals',
        'Designing carousel slides with 80%+ swipe-through completion rates'
      ],
      tools: ['Canva Pro AI', 'Midjourney v6', 'Figma', 'Photoshop AI']
    },
    {
      id: 6,
      title: 'Video Editing & Motion Graphics for High-Retention Social Ads',
      duration: 'Week 11 - 12',
      topics: [
        'Pacing, jump cuts, visual B-roll inserts, and audio design',
        'Kinetic typography, animated auto-captions and sound effect (SFX) layering',
        'Color grading for mobile displays (OLED & Retina display optimization)',
        'Export presets for zero compression quality loss on Instagram'
      ],
      tools: ['CapCut Desktop', 'Adobe Premiere Pro', 'Submagic', 'ElevenLabs AI']
    },
    {
      id: 7,
      title: 'Organic Virality Blueprints & Community Building',
      duration: 'Week 13 - 14',
      topics: [
        'Collaborations, remix culture and piggybacking on cultural trends',
        'Community engagement loops: DMs, broadcast channels and comment funneling',
        'User-Generated Content (UGC) campaigns that generate viral word-of-mouth',
        'Crisis management and managing negative sentiment online'
      ],
      tools: ['ManyChat', 'Instagram Broadcast', 'Telegram Channels', 'SocialBlade']
    },
    {
      id: 8,
      title: 'Meta Ads Manager: Facebook & Instagram Paid Acquisition',
      duration: 'Week 15 - 16',
      topics: [
        'Campaign Budget Optimization (CBO) vs Ad Set Budget (ABO)',
        'Custom Audiences, Lookalikes (1%-10%) and Conversions API (CAPI) setup',
        'Creative testing matrix: Hook variations, copy angles and thumbnail testing',
        'Scaling winning ads from ₹1,000/day to ₹50,000/day profitably without burning ROAS'
      ],
      tools: ['Meta Ads Manager', 'Meta Pixel Helper', 'Google Tag Manager', 'Triple Whale']
    },
    {
      id: 9,
      title: 'Influencer Marketing & Brand Collaboration Deals',
      duration: 'Week 17 - 18',
      topics: [
        'Identifying fake followers vs high-engagement micro-influencers',
        'Cold outreach email & DM negotiation scripts that get 40%+ reply rates',
        'Contract drafting, deliverables timeline and licensing rights',
        'Affiliate tracking, discount codes and performance-driven payouts'
      ],
      tools: ['HypeAuditor', 'Modash', 'Notion CRM', 'DocuSign']
    },
    {
      id: 10,
      title: 'Social Media Automation & Lead Funnels (n8n, Make & Zapier)',
      duration: 'Week 19 - 20',
      topics: [
        'Automated Instagram DM responses with keyword triggers (ManyChat)',
        'Building no-code lead capture pipelines syncing DMs directly to Google Sheets & CRM',
        'Automated daily performance alerts to WhatsApp and Slack via n8n',
        'AI auto-reply agents that qualify leads before routing to sales calls'
      ],
      tools: ['n8n', 'Make.com', 'ManyChat', 'Zapier']
    },
    {
      id: 11,
      title: 'Analytics, Conversion Attribution & Monthly Client Reporting SOPs',
      duration: 'Week 21 - 22',
      topics: [
        'Setting up Google Analytics 4 (GA4) with UTM parameter tagging',
        'Building client-facing executive dashboards in Looker Studio',
        'Attribution modeling: First-click vs Last-click vs Data-driven attribution',
        'How to deliver a 30-minute monthly client review that secures contract renewals'
      ],
      tools: ['Google Analytics 4', 'Looker Studio', 'Supermetrics', 'Bitly']
    },
    {
      id: 12,
      title: 'Freelancing, High-Ticket Retainers & Placement Masterclass',
      duration: 'Week 23 - 24',
      topics: [
        'Positioning yourself as a high-ticket Social Media Growth Consultant ($1k - $3k/mo)',
        'Winning proposals and contract templates that protect your retainers',
        'Upwork, LinkedIn and cold email client acquisition frameworks',
        'Portfolio showcase build + Agency mock interviews with 100% placement support'
      ],
      tools: ['Upwork', 'LinkedIn Sales Navigator', 'Loom', 'Stripe / Wise']
    }
  ];

  // Industry Tools Grid
  toolsCovered = [
    { name: 'Meta Ads Manager', cat: 'Paid Advertising', icon: '📊' },
    { name: 'Google Analytics 4', cat: 'Tracking & Attribution', icon: '📈' },
    { name: 'Canva Pro AI', cat: 'Visual Design', icon: '🎨' },
    { name: 'Midjourney v6', cat: 'GenAI Imagery', icon: '🖼️' },
    { name: 'ChatGPT-4o', cat: 'Copy & Scripting', icon: '🤖' },
    { name: 'CapCut Desktop', cat: 'Short-Form Video', icon: '🎬' },
    { name: 'ManyChat', cat: 'DM Automation', icon: '💬' },
    { name: 'n8n & Make', cat: 'Workflow Automation', icon: '⚡' },
    { name: 'Notion', cat: 'Content Calendar', icon: '📝' },
    { name: 'Semrush', cat: 'Competitive Audit', icon: '🔍' },
    { name: 'ElevenLabs', cat: 'Voice Synthesis', icon: '🎙️' },
    { name: 'Looker Studio', cat: 'Client Reporting', icon: '📑' }
  ];

  // Certifications
  certifications = [
    {
      title: 'Meta Certified Digital Marketing Associate',
      issuer: 'Meta Blueprint',
      badge: 'Official Meta Credential',
      desc: 'Validated expertise in Meta Ads Manager, audience targeting, and campaign optimization.'
    },
    {
      title: 'Google Analytics 4 Certification',
      issuer: 'Google Skillshop',
      badge: 'Google Official',
      desc: 'Demonstrated mastery in event tracking, attribution models, and conversion measurement.'
    },
    {
      title: 'HubSpot Social Media & Content Marketing',
      issuer: 'HubSpot Academy',
      badge: 'Inbound Certified',
      desc: 'Global certification in organic content strategy, distribution funnels, and viral psychology.'
    },
    {
      title: 'Avirbhav Academy Certificate of Mastery',
      issuer: 'Avirbhav Infotech (ISO Certified)',
      badge: 'Verifiable Digital Credential',
      desc: 'Comprehensive graduation diploma featuring unique QR code verification and case study audit report.'
    }
  ];

  // FAQs emphasizing 4 members per batch USP
  faqs = [
    {
      q: 'Why does Avirbhav strictly admit only 4 members per batch?',
      a: 'Crowded classroom institutes pack 30 to 50 students in a batch where individual doubts are ignored. At Avirbhav, our core USP is 100% individual mentor attention. With only 4 members per batch, mentor Deekshith Ravisankar personally audits your campaigns, ad budgets, video scripts, and portfolio daily.'
    },
    {
      q: 'Do I need prior marketing or technical knowledge to join this program?',
      a: 'No prior experience is required! We start from fundamental brand psychology and business foundations, moving step-by-step into hands-on video editing, AI tools, and paid ads.'
    },
    {
      q: 'Is this training practical or purely theoretical?',
      a: '100% practical hands-on. You will work on real client budget accounts, create live ad campaigns, edit 30+ actual video reels, and build an agency-ready portfolio.'
    },
    {
      q: 'Can working professionals attend on weekends?',
      a: 'Yes! We offer a dedicated Weekend Intensive batch (Sunday 09:30 AM to 01:00 PM) plus weekday evening online batches (07:30 PM - 09:00 PM) designed specifically for working individuals.'
    },
    {
      q: 'How does Avirbhav ensure 100% placement support?',
      a: 'We have direct hiring partnerships with 40+ leading digital marketing agencies and e-commerce brands in Chennai and Bangalore. With only 4 students graduating per batch, our placement team gives each student dedicated attention until they receive multiple offer letters.'
    },
    {
      q: 'What is the medium of instruction?',
      a: 'Sessions are taught in clear, easy-to-understand Tamil + English (Bilingual mode), ensuring complex technical and marketing concepts are thoroughly understood.'
    }
  ];

  getFormattedId(id: number): string {
    return id < 10 ? '0' + id : '' + id;
  }

  toggleSyllabus(index: number): void {
    if (this.activeSyllabusIndex() === index) {
      this.activeSyllabusIndex.set(-1);
    } else {
      this.activeSyllabusIndex.set(index);
    }
  }

  toggleFaq(index: number): void {
    if (this.activeFaqIndex() === index) {
      this.activeFaqIndex.set(null);
    } else {
      this.activeFaqIndex.set(index);
    }
  }

  handleHeroFormSubmit(): void {
    if (!this.leadName.trim() || !this.leadPhone.trim()) {
      this.formError.set('Please provide both your Name and Mobile Number.');
      return;
    }

    this.formError.set('');
    
    // Save to AcademyDataService
    const created = this.academyService.addLead({
      name: this.leadName.trim(),
      phone: this.leadPhone.trim(),
      email: this.leadEmail ? this.leadEmail.trim() : '',
      program: 'Social Media Marketing with AI Automation (Mastery)',
      source: `Course Details (Exclusive 4-Member ${this.learningMode} Batch)`,
      notes: `Learning Mode: ${this.learningMode}. Fast-track reservation requested for 4-member batch.`
    });

    this.formSubmitted.set(true);

    // Redirect to WhatsApp
    const phoneClean = this.leadPhone.replace(/[^0-9]/g, '');
    const cleanPhoneWithCountry = phoneClean.length === 10 ? `91${phoneClean}` : phoneClean;
    const msg = encodeURIComponent(
      `Hi Deekshith, I want to reserve a seat in the 4-Member Social Media Marketing Batch (${this.learningMode})! Name: ${this.leadName}. Please confirm seat availability & batch timings.`
    );
    
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        window.open(`https://wa.me/917010440863?text=${msg}`, '_blank');
      }, 800);
    }
  }

  downloadBrochure(): void {
    this.openBookingModal.emit('Course Detail Brochure Download');
  }

  triggerBooking(source: string): void {
    this.openBookingModal.emit(source);
  }

  setPace(pace: 'flexible' | 'fulltime'): void {
    this.activePace.set(pace);
  }

  scrollToSection(id: string): void {
    this.activeSidebarSection.set(id);
    if (typeof window !== 'undefined') {
      const el = document.getElementById(id);
      if (el) {
        const yOffset = -90; // offset for fixed headers
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }

  toggleWhyFaq(index: number): void {
    if (this.activeWhyFaqIndex() === index) {
      this.activeWhyFaqIndex.set(null);
    } else {
      this.activeWhyFaqIndex.set(index);
    }
  }
}

