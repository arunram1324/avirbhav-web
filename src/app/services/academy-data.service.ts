import { Injectable, inject, signal } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { COURSE_CATALOG, CourseDetailData, getCourseByIdOrSlug } from '../data/course-catalog.data';

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

  // Reactive state signals
  leads = signal<Lead[]>([]);
  courses = signal<ModuleItem[]>([]);
  courseCatalog = signal<Record<string, CourseDetailData>>({});
  assets = signal<AssetItem[]>([]);

  siteContent = signal<SiteContent>({
    announcementText: 'Next Micro-Cohort Starts November 1st • Strictly 4 Students Per Batch',
    announcementTag: 'ADMISSIONS OPEN',
    announcementHighlight: '4 SEATS ONLY',
    showAnnouncement: true,

    heroHeadline: 'Launch Your Digital Marketing\nCareer in 150 Days.',
    heroSubheading: 'Master SEO, Ads, and AI with our agency-style training. Get 100% placement guaranteed —without quitting your day job.',
    heroCtaText: 'Book Now',
    heroBadge: '⚡ Strictly 4 Students Per Batch • 100% Individual Mentorship & Live Ad Spend',

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
      icon: summary?.icon || '🚀',
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
    return newAsset;
  }

  updateAsset(id: string, updates: Partial<AssetItem>): void {
    const updated = this.assets().map(a => a.id === id ? { ...a, ...updates } : a);
    this.assets.set(updated);
    this.saveToStorage(this.ASSETS_STORAGE_KEY, updated);
  }

  deleteAsset(id: string): void {
    const updated = this.assets().filter(a => a.id !== id);
    this.assets.set(updated);
    this.saveToStorage(this.ASSETS_STORAGE_KEY, updated);
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
