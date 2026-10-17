import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  AcademyDataService, 
  Lead, 
  ModuleItem, 
  AssetItem, 
  SiteContent, 
  SeoConfig 
} from '../../services/academy-data.service';
import { CourseDetailData, SyllabusModule } from '../../data/course-catalog.data';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  academyService = inject(AcademyDataService);

  // Active Admin Tab: 6 comprehensive tabs
  activeTab = signal<'leads' | 'courses' | 'assets' | 'content' | 'seo' | 'backup'>('leads');

  // Auth signals
  loginEmail = '';
  loginPassword = '';
  loginError = signal('');
  showPassword = signal(false);

  // Toast notification
  toastMessage = signal('');

  // Search & Filter for Leads
  searchQuery = '';
  selectedStatusFilter = signal<'All' | 'New' | 'Contacted' | 'Enrolled' | 'Closed'>('All');

  // Lead Modal & Form
  isLeadModalOpen = signal(false);
  editingLeadId = signal<string | null>(null);
  leadForm: {
    name: string;
    phone: string;
    email: string;
    program: string;
    status: Lead['status'];
    notes: string;
  } = {
    name: '',
    phone: '',
    email: '',
    program: 'Digital Marketing 150 Days',
    status: 'New',
    notes: ''
  };

  // Course Deep Editor Modal & Form
  isCourseModalOpen = signal(false);
  editingCourseId = signal<string | null>(null);
  courseActiveSubTab = signal<'basic' | 'stats' | 'modules' | 'faqs'>('basic');

  courseFormDetail: CourseDetailData = {
    id: '',
    slug: '',
    titlePrefix: '',
    titleHighlight: '',
    shortTitle: '',
    badge: 'Specialized Track',
    category: 'Marketing Service',
    heroPill3: '⚡ AI-Enhanced Mastery',
    tagline: '',
    heroCardHeading: '',
    heroCardPills: ['Practical Projects', 'Agency SOPs', '1:1 Mentorship'],
    heroMasteries: ['Brand Strategy', 'Performance Ads', 'Organic Growth'],
    statBar: [
      { value: '4 Only', label: 'Strict Students / Batch' },
      { value: '5 Months', label: '150 Days Mastery' },
      { value: '30+ Tools', label: 'GenAI & Ad Stack' },
      { value: '₹10L+', label: 'Live Client Ad Spend' }
    ],
    overviewHeading: 'Launch a career in tech',
    overviewHighlight: 'that lasts',
    overviewSubheading: 'Master performance marketing, paid acquisition, and client retention.',
    alumniCaseTitle: 'Real Client Campaign Results',
    averageSalary: '₹6.5L – 12L',
    salarySubtext: 'Average starting package across performance agencies and tech startups',
    portfolioCase: {
      clientType: 'D2C E-Commerce Brand',
      title: 'Scalable Growth Blueprint',
      desc: 'Scaled revenue by 340% while maintaining a 4.2x ROAS in 90 days.',
      author: 'Avirbhav Alumni Team',
      authorRole: 'Performance Marketer',
      verifiedBadge: 'Verified Agency Audit ✓'
    },
    studentQuote: {
      quote: 'The 4-student batch size made all the difference. Deekshith audited my ad accounts directly and helped me close my first retainer.',
      author: 'Vikram Sundaram',
      role: 'Associate Growth Manager @ MediaNet'
    },
    genAiQuestion: 'How does Generative AI integrate into this program?',
    genAiAnswer: 'You will master ChatGPT-4o, Midjourney, Claude 3.5, and automated zapier pipelines to produce 10x ad variations in minutes.',
    timelinePhases: [
      { phase: '01', weeks: 'Weeks 1 – 6', title: 'Foundations & Algorithm Blueprints', desc: 'Deep dive into audience psychology, platform algorithms, and ad account structures.' },
      { phase: '02', weeks: 'Weeks 7 – 14', title: 'Live Client Budgets & Funnel Architecture', desc: 'Deploy live ad spend on Meta and Google Ads, setting up tracking pixels and CAPI.' },
      { phase: '03', weeks: 'Weeks 15 – 22', title: 'Scaling, AI Automations & Placement', desc: 'Master multi-touch retargeting, portfolio preparation, and placement interviews.' }
    ],
    syllabusModules: [],
    whyFaqs: [],
    faqs: []
  };

  // Helper strings for comma-separated inputs
  courseHeroPillsString = '';
  courseHeroMasteriesString = '';

  // Asset Library State
  selectedAssetCategory = signal<'All' | 'logo' | 'mentor' | 'poster' | 'badge' | 'document'>('All');
  assetSearchQuery = '';
  isUploadAssetModalOpen = signal(false);
  assetUploadForm: {
    title: string;
    category: AssetItem['category'];
    url: string;
    alt: string;
    size?: string;
  } = {
    title: '',
    category: 'poster',
    url: '',
    alt: '',
    size: ''
  };

  // Site Content Form
  contentForm: SiteContent = { ...this.academyService.siteContent() };
  floatingTagsString = '';
  benefitsString = '';

  // SEO Form
  seoForm: SeoConfig = { ...this.academyService.seoConfig() };

  // Backup Import State
  backupJsonInput = '';

  // Computed metrics
  newLeadsCount = computed(() => {
    return this.academyService.leads().filter(l => l.status === 'New').length;
  });

  enrolledCount = computed(() => {
    return this.academyService.leads().filter(l => l.status === 'Enrolled').length;
  });

  filteredLeads = computed(() => {
    const list = this.academyService.leads();
    const query = this.searchQuery.toLowerCase().trim();
    const status = this.selectedStatusFilter();

    return list.filter(lead => {
      const matchQuery = !query || 
        lead.name.toLowerCase().includes(query) ||
        lead.phone.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        lead.program.toLowerCase().includes(query) ||
        (lead.notes && lead.notes.toLowerCase().includes(query));

      const matchStatus = status === 'All' || lead.status === status;
      return matchQuery && matchStatus;
    });
  });

  filteredAssets = computed(() => {
    const list = this.academyService.assets();
    const cat = this.selectedAssetCategory();
    const q = this.assetSearchQuery.toLowerCase().trim();

    return list.filter(a => {
      const matchCat = cat === 'All' || a.category === cat;
      const matchQ = !q || a.title.toLowerCase().includes(q) || a.alt.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  });

  constructor() {
    this.refreshForms();
    if (typeof window !== 'undefined') {
      const updateFromHash = () => {
        const hash = window.location.hash || '';
        if (hash.includes('assets')) this.activeTab.set('assets');
        else if (hash.includes('courses')) this.activeTab.set('courses');
        else if (hash.includes('content')) this.activeTab.set('content');
        else if (hash.includes('seo')) this.activeTab.set('seo');
        else if (hash.includes('backup')) this.activeTab.set('backup');
        else if (hash.includes('leads')) this.activeTab.set('leads');
      };
      updateFromHash();
      window.addEventListener('hashchange', updateFromHash);
      window.addEventListener('popstate', updateFromHash);
    }
  }

  private refreshForms(): void {
    const content = this.academyService.siteContent();
    this.contentForm = { ...content };
    this.floatingTagsString = (content.floatingTags || []).join(', ');
    this.benefitsString = (content.benefits || []).join('\n');
    this.seoForm = { ...this.academyService.seoConfig() };
  }

  // --- Auth Handlers ---

  fillDemoCredentials(): void {
    this.loginEmail = 'admin@avirbhav.com';
    this.loginPassword = 'admin123';
    this.loginError.set('');
  }

  handleLogin(): void {
    if (!this.loginEmail || !this.loginPassword) {
      this.loginError.set('Please enter both Email and Password.');
      return;
    }

    const success = this.academyService.login(this.loginEmail, this.loginPassword);
    if (success) {
      this.loginError.set('');
      this.refreshForms();
      this.showToast('Welcome back, Admin! Session authenticated.');
    } else {
      this.loginError.set('Invalid credentials. Use admin@avirbhav.com / admin123.');
    }
  }

  handleLogout(): void {
    this.academyService.logout();
    this.loginEmail = '';
    this.loginPassword = '';
    this.showToast('Logged out successfully.');
  }

  navigateToLiveSite(path: string = '/'): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('app-navigate', { detail: { path } }));
    }
  }

  // --- Leads CRUD Handlers ---

  openAddLeadModal(): void {
    this.editingLeadId.set(null);
    this.leadForm = {
      name: '',
      phone: '',
      email: '',
      program: this.academyService.courses()[0]?.title || 'Digital Marketing 150 Days',
      status: 'New',
      notes: ''
    };
    this.isLeadModalOpen.set(true);
  }

  openEditLeadModal(lead: Lead): void {
    this.editingLeadId.set(lead.id);
    this.leadForm = {
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      program: lead.program,
      status: lead.status,
      notes: lead.notes || ''
    };
    this.isLeadModalOpen.set(true);
  }

  saveLeadModal(): void {
    if (!this.leadForm.name.trim() || !this.leadForm.phone.trim()) {
      alert('Please enter student name and phone number.');
      return;
    }

    const leadId = this.editingLeadId();
    if (leadId) {
      this.academyService.updateLead(leadId, {
        name: this.leadForm.name,
        phone: this.leadForm.phone,
        email: this.leadForm.email,
        program: this.leadForm.program,
        status: this.leadForm.status,
        notes: this.leadForm.notes
      });
      this.showToast(`Updated details for ${this.leadForm.name}`);
    } else {
      this.academyService.addLead({
        name: this.leadForm.name,
        phone: this.leadForm.phone,
        email: this.leadForm.email,
        program: this.leadForm.program,
        source: 'Admin Walk-in Entry',
        notes: this.leadForm.notes
      });
      this.showToast(`New lead recorded: ${this.leadForm.name}`);
    }

    this.isLeadModalOpen.set(false);
  }

  changeLeadStatus(id: string, status: Lead['status']): void {
    this.academyService.updateLeadStatus(id, status);
    this.showToast(`Lead status updated to ${status}`);
  }

  deleteLead(id: string): void {
    if (confirm('Are you sure you want to delete this lead?')) {
      this.academyService.deleteLead(id);
      this.showToast('Lead deleted successfully.');
    }
  }

  // --- Course Deep CRUD Handlers ---

  openCreateCourseModal(): void {
    this.editingCourseId.set(null);
    const catalog = this.academyService.courseCatalog();
    const count = Object.keys(catalog).length + 1;
    const newId = count < 10 ? `0${count}` : `${count}`;

    this.courseFormDetail = {
      id: newId,
      slug: `course-${newId}`,
      titlePrefix: 'New Course Program',
      titleHighlight: 'Track',
      shortTitle: 'New Course',
      badge: 'Specialized',
      category: 'Digital Marketing & Growth',
      heroPill3: '⚡ AI-Enhanced Mastery',
      tagline: 'Comprehensive agency-standard curriculum with hands-on live client ad spend and 100% placement guarantee.',
      heroCardHeading: 'Master High-Income Skills In 150 Days.',
      heroCardPills: ['Live Client Ad Spend', 'Strictly 4 Students / Batch', 'Agency SOPs'],
      heroMasteries: ['Strategic Planning', 'Execution Blueprints', 'Scaling & Automation'],
      statBar: [
        { value: '4 Only', label: 'Strict Students / Batch' },
        { value: '5 Months', label: '150 Days Mastery' },
        { value: '25+ Tools', label: 'Tech & AI Stack' },
        { value: '₹10L+', label: 'Live Client Ad Spend' }
      ],
      overviewHeading: 'Launch a career in tech',
      overviewHighlight: 'that lasts',
      overviewSubheading: 'Gain the skills, network, and portfolio that high-paying brands and agencies are looking for.',
      alumniCaseTitle: 'Recent Graduate Case Study',
      averageSalary: '₹6.5L – 12L',
      salarySubtext: 'Average starting package across performance agencies and tech startups',
      portfolioCase: {
        clientType: 'E-Commerce Brand',
        title: 'Performance Marketing Blueprint',
        desc: 'Deployed high-converting ads and scaled monthly revenue by 320%.',
        author: 'Avirbhav Student Team',
        authorRole: 'Growth Strategist',
        verifiedBadge: 'Verified Result ✓'
      },
      studentQuote: {
        quote: 'The agency-style practical learning gave me the confidence to handle large brand accounts right from day one.',
        author: 'Arun Kumar',
        role: 'Performance Marketer'
      },
      genAiQuestion: 'How is Artificial Intelligence integrated into this track?',
      genAiAnswer: 'You will learn to leverage AI for copy, creative brainstorming, ad audience research, and automated reporting.',
      timelinePhases: [
        { phase: '01', weeks: 'Weeks 1 – 6', title: 'Foundational Systems & Strategy', desc: 'Platform mechanics, market research, and audience identification.' },
        { phase: '02', weeks: 'Weeks 7 – 14', title: 'Hands-on Execution & Live Campaigns', desc: 'Deploying real ad budgets, conversion tracking, and campaign optimization.' },
        { phase: '03', weeks: 'Weeks 15 – 22', title: 'Scaling, Automation & Client Retainers', desc: 'Advanced analytics, client pitching, portfolio building, and interview preparation.' }
      ],
      syllabusModules: [
        {
          id: 1,
          title: 'Module 1: Market Fundamentals & Strategy',
          duration: '2 Weeks • 12 Hrs',
          tools: ['ChatGPT-4o', 'Miro', 'Notion'],
          topics: ['Market Analysis', 'Ideal Customer Profile', 'Competitor Teardowns'],
          hasAi: true
        },
        {
          id: 2,
          title: 'Module 2: Practical Campaign Execution',
          duration: '3 Weeks • 18 Hrs',
          tools: ['Meta Ads', 'Google Ads', 'Canva Pro'],
          topics: ['Ad Account Setup', 'Tracking Pixels', 'Creative A/B Testing'],
          hasAi: false
        }
      ],
      whyFaqs: [
        { q: 'Why is the cohort capped at 4 students?', a: 'To ensure 100% individual attention from senior mentors and personalized ad budget reviews.' }
      ],
      faqs: [
        { q: 'Are prior coding skills required?', a: 'No prior technical background is required. We start from foundational fundamentals.' },
        { q: 'Is placement assistance provided?', a: 'Yes! We guarantee placement assistance and mock interview rounds with hiring agency partners.' }
      ]
    };

    this.courseHeroPillsString = this.courseFormDetail.heroCardPills.join(', ');
    this.courseHeroMasteriesString = this.courseFormDetail.heroMasteries.join(', ');
    this.courseActiveSubTab.set('basic');
    this.isCourseModalOpen.set(true);
  }

  openEditCourseModal(courseId: string): void {
    this.editingCourseId.set(courseId);
    const detail = this.academyService.getCourseDetail(courseId);

    // Deep copy to prevent unintended mutations before saving
    this.courseFormDetail = JSON.parse(JSON.stringify(detail));
    this.courseHeroPillsString = (this.courseFormDetail.heroCardPills || []).join(', ');
    this.courseHeroMasteriesString = (this.courseFormDetail.heroMasteries || []).join(', ');
    this.courseActiveSubTab.set('basic');
    this.isCourseModalOpen.set(true);
  }

  saveCourseDetailModal(): void {
    if (!this.courseFormDetail.shortTitle.trim() || !this.courseFormDetail.slug.trim()) {
      alert('Please provide Course Title and URL Slug.');
      return;
    }

    // Process helper strings
    this.courseFormDetail.heroCardPills = this.courseHeroPillsString
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    this.courseFormDetail.heroMasteries = this.courseHeroMasteriesString
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    this.academyService.saveCourse(this.courseFormDetail);
    this.showToast(`Saved course: ${this.courseFormDetail.shortTitle} (slug: /courses/${this.courseFormDetail.slug})`);
    this.isCourseModalOpen.set(false);
  }

  deleteCourse(id: string, title: string): void {
    if (confirm(`Are you sure you want to delete course "${title}" (ID: ${id})?\nThis will remove it from both the Home page and the Course details catalog.`)) {
      this.academyService.deleteCourse(id);
      this.showToast(`Course "${title}" removed.`);
    }
  }

  // --- Syllabus Module Helpers inside Drawer ---

  addSyllabusModule(): void {
    const list = this.courseFormDetail.syllabusModules;
    const nextId = list.length + 1;
    list.push({
      id: nextId,
      title: `Module ${nextId}: Advanced Skill Mastery`,
      duration: '2 Weeks • 12 Hrs',
      tools: ['AI Tools', 'Agency Software'],
      topics: ['Hands-on project', 'Practical lab execution'],
      hasAi: true
    });
  }

  deleteSyllabusModule(index: number): void {
    this.courseFormDetail.syllabusModules.splice(index, 1);
  }

  addCourseFaq(): void {
    this.courseFormDetail.faqs.push({
      q: 'New Frequently Asked Question',
      a: 'Detailed explanation for prospective students and parents.'
    });
  }

  deleteCourseFaq(index: number): void {
    this.courseFormDetail.faqs.splice(index, 1);
  }

  // --- Assets Media Library Handlers ---

  openUploadAssetModal(): void {
    this.assetUploadForm = {
      title: '',
      category: 'poster',
      url: '',
      alt: '',
      size: ''
    };
    this.isUploadAssetModalOpen.set(true);
  }

  handleAssetFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file.size > 3 * 1024 * 1024) {
        alert('File size exceeds 3MB limit. Please upload an optimized image.');
        return;
      }
      this.assetUploadForm.title = this.assetUploadForm.title || file.name.replace(/\.[^/.]+$/, "");
      this.assetUploadForm.alt = this.assetUploadForm.alt || file.name;
      this.assetUploadForm.size = `${Math.round(file.size / 1024)} KB`;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.assetUploadForm.url = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  saveNewAsset(): void {
    if (!this.assetUploadForm.title.trim() || !this.assetUploadForm.url.trim()) {
      alert('Please provide an asset title and image (file upload or URL).');
      return;
    }

    const created = this.academyService.addAsset({
      title: this.assetUploadForm.title.trim(),
      category: this.assetUploadForm.category,
      url: this.assetUploadForm.url.trim(),
      alt: this.assetUploadForm.alt.trim() || this.assetUploadForm.title.trim(),
      size: this.assetUploadForm.size || 'Web'
    });

    this.showToast(`Asset "${created.title}" added to Media Library!`);
    this.isUploadAssetModalOpen.set(false);
  }

  deleteAsset(id: string, title: string): void {
    if (confirm(`Delete asset "${title}"?`)) {
      this.academyService.deleteAsset(id);
      this.showToast('Asset deleted from library.');
    }
  }

  assignAsset(target: 'logo' | 'mentor' | 'banner', asset: AssetItem): void {
    this.academyService.assignAsset(target, asset.url);
    const targetLabel = target === 'logo' ? 'Site Header Logo' : target === 'mentor' ? 'Mentor Spotlight (Deekshith)' : 'Promotional Banner';
    this.showToast(`Assigned "${asset.title}" as ${targetLabel}!`);
    this.refreshForms();
  }

  copyAssetUrl(url: string): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        this.showToast('Asset URL copied to clipboard! 📋');
      }).catch(() => {
        this.fallbackCopyText(url);
      });
    } else {
      this.fallbackCopyText(url);
    }
  }

  private fallbackCopyText(text: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      this.showToast('Asset URL copied to clipboard! 📋');
    } catch {
      alert('Failed to copy. Please copy manually: ' + text);
    }
    document.body.removeChild(textArea);
  }

  // --- Site Content & Copy Handlers ---

  saveSiteContent(): void {
    // Process floating tags
    this.contentForm.floatingTags = this.floatingTagsString
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    // Process benefits
    this.contentForm.benefits = this.benefitsString
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    this.academyService.updateSiteContent(this.contentForm);
    this.showToast('All Website Content & Copy saved and updated live!');
  }

  // --- SEO Handlers ---

  saveSeoConfig(): void {
    this.academyService.updateSeoConfig(this.seoForm);
    this.showToast('SEO & Meta tags applied live to website <head>!');
  }

  // --- System Backup & Restore Handlers ---

  handleExportBackup(): void {
    this.academyService.exportBackup();
    this.showToast('Full website backup JSON exported!');
  }

  handleImportBackup(): void {
    if (!this.backupJsonInput.trim()) {
      alert('Please paste a valid JSON backup string or upload a backup file.');
      return;
    }

    if (confirm('Importing this backup will overwrite existing courses, content, and assets. Proceed?')) {
      const success = this.academyService.importBackup(this.backupJsonInput);
      if (success) {
        this.refreshForms();
        this.backupJsonInput = '';
        this.showToast('Backup restored successfully! All sections updated.');
      } else {
        alert('Invalid backup JSON format. Please verify the file.');
      }
    }
  }

  handleBackupFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.backupJsonInput = e.target?.result as string;
      };
      reader.readAsText(file);
    }
  }

  handleFactoryReset(): void {
    const confirmation = prompt('Type RESET to confirm reverting all courses, site content, and assets back to factory defaults:');
    if (confirmation === 'RESET') {
      this.academyService.resetToDefaults();
    }
  }

  // --- Excel Export ---

  exportAllToExcel(): void {
    this.academyService.exportLeadsToExcel(this.filteredLeads());
  }

  showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => {
      if (this.toastMessage() === msg) {
        this.toastMessage.set('');
      }
    }, 4000);
  }

  formatDate(isoString: string): string {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoString;
    }
  }

  getWhatsAppLink(lead: Lead): string {
    const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
    const phoneWithCountry = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const msg = encodeURIComponent(`Hi ${lead.name}, this is Deekshith from Avirbhav Digital Academy regarding your enquiry for "${lead.program}". Are you free for a quick strategy call?`);
    return `https://wa.me/${phoneWithCountry}?text=${msg}`;
  }

  getModuleTools(mod: SyllabusModule): string {
    return (mod.tools || []).join(', ');
  }

  setModuleTools(mod: SyllabusModule, value: string): void {
    mod.tools = value.split(',').map(s => s.trim()).filter(s => s.length > 0);
  }

  getModuleTopics(mod: SyllabusModule): string {
    return (mod.topics || []).join(', ');
  }

  setModuleTopics(mod: SyllabusModule, value: string): void {
    mod.topics = value.split(',').map(s => s.trim()).filter(s => s.length > 0);
  }
}
