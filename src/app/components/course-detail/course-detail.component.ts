import { Component, EventEmitter, Input, Output, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AcademyDataService } from '../../services/academy-data.service';
import { CourseDetailData, getCourseByIdOrSlug, SyllabusModule, PricingPlan } from '../../data/course-catalog.data';

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

  courseIdSignal = signal<string>('01');
  @Input() set courseId(val: string) {
    this.courseIdSignal.set(val || '01');
  }
  get courseId(): string {
    return this.courseIdSignal();
  }

  courseData = computed<CourseDetailData>(() => {
    return this.academyService.getCourseDetail(this.courseIdSignal());
  });

  get syllabusModules(): SyllabusModule[] {
    return this.courseData().syllabusModules;
  }

  get whyFaqs(): { q: string; a: string }[] {
    return this.courseData().whyFaqs;
  }

  get faqs(): { q: string; a: string }[] {
    return this.courseData().faqs;
  }

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
      program: this.courseData().shortTitle + ' (150-Day Mastery)',
      source: `Course Details - ${this.courseData().shortTitle} (Exclusive 4-Member ${this.learningMode} Batch)`,
      notes: `Learning Mode: ${this.learningMode}. Fast-track reservation requested for 4-member batch.`
    });

    this.formSubmitted.set(true);

    // Redirect to WhatsApp
    const phoneClean = this.leadPhone.replace(/[^0-9]/g, '');
    const cleanPhoneWithCountry = phoneClean.length === 10 ? `91${phoneClean}` : phoneClean;
    const msg = encodeURIComponent(
      `Hi Deekshith, I want to reserve a seat in the 4-Member ${this.courseData().shortTitle} Batch (${this.learningMode})! Name: ${this.leadName}. Please confirm seat availability & batch timings.`
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

