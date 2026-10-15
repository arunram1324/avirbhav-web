import { Injectable, inject, signal } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

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

export interface SiteContent {
  heroHeadline: string;
  heroSubheading: string;
  heroCtaText: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  valueText: string;
  phone: string;
  email: string;
  address: string;
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

@Injectable({
  providedIn: 'root'
})
export class AcademyDataService {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  private readonly LEADS_STORAGE_KEY = 'avirbhav_leads_data_v1';
  private readonly COURSES_STORAGE_KEY = 'avirbhav_courses_data_v1';
  private readonly SITE_CONTENT_KEY = 'avirbhav_site_content_v1';
  private readonly SEO_CONFIG_KEY = 'avirbhav_seo_config_v1';
  private readonly AUTH_STORAGE_KEY = 'avirbhav_admin_auth_v1';

  // Reactive state signals
  leads = signal<Lead[]>([]);
  courses = signal<ModuleItem[]>([]);
  siteContent = signal<SiteContent>({
    heroHeadline: 'Launch Your Digital Marketing\nCareer in 150 Days.',
    heroSubheading: 'Master SEO, Ads, and AI with our agency-style training. Get 100% placement guaranteed —without quitting your day job.',
    heroCtaText: 'Book Now',
    stat1Value: '10+',
    stat1Label: 'Batches',
    stat2Value: '93%',
    stat2Label: 'Placement Record',
    stat3Value: '220+',
    stat3Label: 'Students Graduated',
    valueText: 'Brand strategy, visual identity, digital campaigns, and media planning — crafted to grow your market share',
    phone: '+91 70104 40863',
    email: 'deekshith1996@gmail.com',
    address: 'Nehru Nagar, Perungudi, Chennai, Tamil Nadu - 600041'
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

    // 2. Initialize Leads
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

    // 3. Initialize Courses
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
          icon: '📱',
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
          icon: '🎬',
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
          icon: '📊',
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
          icon: '🔍',
          gradient: 'from-emerald-950/60 via-teal-950/80 to-slate-950',
          iconBg: 'bg-emerald-500/10 text-emerald-400',
          deliverables: [
            'High-Intent Keyword Discovery',
            'Technical & On-Page SEO Auditing',
            'Google Business Profile Local Ranking'
          ]
        },
        {
          id: '05',
          title: 'AI Tools for Marketing',
          category: 'Modern Tech Stack • Workflow Acceleration',
          badge: 'Modern AI',
          metric: '10x',
          metricLabel: 'Faster Production Velocity with GenAI',
          desc: 'Supercharge your daily marketing workflow using ChatGPT-4o, Midjourney, Claude 3.5, Canva AI, and automated AI stacks to deliver agency-grade output in record time.',
          icon: '🤖',
          gradient: 'from-violet-950/60 via-purple-950/80 to-slate-950',
          iconBg: 'bg-purple-500/10 text-purple-400',
          deliverables: [
            'Prompt Engineering for Ad Copy',
            'Midjourney & AI Visual Generation',
            'Automated Campaign & Research Stacks'
          ]
        },
        {
          id: '06',
          title: 'Freelancing Blueprint',
          category: 'Agency Business • Client Acquisition',
          badge: 'Business',
          metric: '$500+',
          metricLabel: 'International Client Retainer Strategy',
          desc: 'Step-by-step roadmap to land international clients on Upwork, LinkedIn, and cold email. Learn proposal crafting, pricing models, and managing monthly retainers.',
          icon: '💼',
          gradient: 'from-amber-950/60 via-yellow-950/80 to-slate-950',
          iconBg: 'bg-amber-500/10 text-amber-400',
          deliverables: [
            'International Client Cold Outreach',
            'Winning Proposal & Contract Templates',
            'Monthly Retainer Management'
          ]
        },
        {
          id: '07',
          title: 'Content Creation & Copywriting',
          category: 'Conversion Writing • Psychological Messaging',
          badge: 'Creative',
          metric: '40%+',
          metricLabel: 'Higher Click-Through & Conversion Rates',
          desc: 'Write persuasive sales copy that converts strangers into buyers. Learn emotional triggers, value proposition crafting, landing page wireframing, and email sequences.',
          icon: '✍️',
          gradient: 'from-rose-950/60 via-red-950/80 to-slate-950',
          iconBg: 'bg-rose-500/10 text-rose-400',
          deliverables: [
            'AIDA & PAS Copywriting Frameworks',
            'Landing Page Messaging & Storytelling',
            'Automated Email Nurture Sequences'
          ]
        },
        {
          id: '08',
          title: 'Personal Branding & Placement',
          category: 'Career Track • Authority & Placement',
          badge: 'Career',
          metric: '100%',
          metricLabel: 'Placement Support & Portfolio Showcase',
          desc: 'Position yourself as an in-demand marketing expert. Build your LinkedIn authority, package your real client case studies into an irresistible portfolio, and crack agency interviews.',
          icon: '⭐',
          gradient: 'from-amber-900/60 via-indigo-950/80 to-slate-950',
          iconBg: 'bg-yellow-500/10 text-yellow-400',
          deliverables: [
            'LinkedIn Authority & Positioning',
            'Verified Client Case Study Portfolio',
            'Mock Interviews & Placement Assistance'
          ]
        }
      ];
      this.courses.set(defaultCourses);
      this.saveToStorage(this.COURSES_STORAGE_KEY, defaultCourses);
    }

    // 4. Initialize Site Content
    const savedContent = this.getFromStorage<SiteContent>(this.SITE_CONTENT_KEY);
    if (savedContent) {
      this.siteContent.set({ ...this.siteContent(), ...savedContent });
    }

    // 5. Initialize SEO Config
    const savedSeo = this.getFromStorage<SeoConfig>(this.SEO_CONFIG_KEY);
    if (savedSeo) {
      this.seoConfig.set({ ...this.seoConfig(), ...savedSeo });
    }
  }

  // --- Admin Authentication ---

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
    return newLead;
  }

  updateLead(id: string, updatedFields: Partial<Lead>): void {
    const updated = this.leads().map(l => l.id === id ? { ...l, ...updatedFields } : l);
    this.leads.set(updated);
    this.saveToStorage(this.LEADS_STORAGE_KEY, updated);
  }

  updateLeadStatus(id: string, status: Lead['status']): void {
    this.updateLead(id, { status });
  }

  deleteLead(id: string): void {
    const updated = this.leads().filter(l => l.id !== id);
    this.leads.set(updated);
    this.saveToStorage(this.LEADS_STORAGE_KEY, updated);
  }

  // --- Course / Program CRUD Methods ---

  addCourse(newCourse: Omit<ModuleItem, 'id'>): ModuleItem {
    const currentList = this.courses();
    const nextNum = currentList.length + 1;
    const formattedId = nextNum < 10 ? `0${nextNum}` : `${nextNum}`;

    const created: ModuleItem = {
      ...newCourse,
      id: formattedId
    };

    const updated = [...currentList, created];
    this.courses.set(updated);
    this.saveToStorage(this.COURSES_STORAGE_KEY, updated);
    return created;
  }

  updateCourse(id: string, updatedFields: Partial<ModuleItem>): void {
    const updated = this.courses().map(c => c.id === id ? { ...c, ...updatedFields } : c);
    this.courses.set(updated);
    this.saveToStorage(this.COURSES_STORAGE_KEY, updated);
  }

  deleteCourse(id: string): void {
    const updated = this.courses().filter(c => c.id !== id);
    this.courses.set(updated);
    this.saveToStorage(this.COURSES_STORAGE_KEY, updated);
  }

  // --- Site Content CRUD Methods ---

  updateSiteContent(content: Partial<SiteContent>): void {
    const updated = { ...this.siteContent(), ...content };
    this.siteContent.set(updated);
    this.saveToStorage(this.SITE_CONTENT_KEY, updated);
  }

  // --- Dynamic SEO & Meta Tags Methods ---

  updateSeoConfig(newConfig: Partial<SeoConfig>): void {
    const updated = { ...this.seoConfig(), ...newConfig };
    this.seoConfig.set(updated);
    this.saveToStorage(this.SEO_CONFIG_KEY, updated);
    this.applySeoTags();
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
