import { Component, EventEmitter, Output, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AcademyDataService, JobListing } from '../../services/academy-data.service';

@Component({
  selector: 'app-jobs-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './jobs-page.component.html',
  styleUrls: ['./jobs-page.component.css']
})
export class JobsPageComponent {
  academyService = inject(AcademyDataService);

  @Output() openJobApplication = new EventEmitter<{ jobId: string; jobTitle: string }>();
  @Output() openBooking = new EventEmitter<string>();
  @Output() navigate = new EventEmitter<string>();

  // Google Jobs Tab Signal: All, Saved, Naukri, Apna, LinkedIn, Indeed & Shine
  activeTab = signal<'all' | 'saved' | 'naukri' | 'apna' | 'linkedin' | 'others'>('all');

  // Filter Signals
  searchQuery = signal('');
  selectedDepartment = signal<string>('All');
  selectedLocation = signal<string>('All');
  selectedSource = signal<string>('All');
  onlyFresher = signal<boolean>(false);

  expandedJobId = signal<string | null>(null);
  copiedJobId = signal<string | null>(null);
  alertSubscribed = signal<boolean>(false);
  isRefreshing = signal<boolean>(false);

  departments: string[] = [
    'All',
    'Performance Marketing',
    'SEO & Growth',
    'Content & Creative',
    'Business Development'
  ];

  locations: string[] = [
    'All',
    'Chennai',
    'Remote',
    'Bengaluru',
    'Hybrid'
  ];

  // Strictly other companies aggregator sources (no Avirbhav)
  sources: string[] = [
    'All',
    'Naukri',
    'Apna',
    'LinkedIn',
    'Indeed',
    'Shine'
  ];

  // Query strictly other companies' openings
  filteredJobs = computed(() => {
    const list = this.academyService.externalJobs();
    const tab = this.activeTab();
    const query = this.searchQuery().trim().toLowerCase();
    const dept = this.selectedDepartment();
    const loc = this.selectedLocation();
    const src = this.selectedSource();
    const fresherOnly = this.onlyFresher();

    return list.filter(job => {
      // Tab filter
      if (tab === 'saved') {
        if (!this.academyService.isJobSaved(job.id)) return false;
      } else if (tab === 'naukri') {
        if (job.source !== 'Naukri') return false;
      } else if (tab === 'apna') {
        if (job.source !== 'Apna') return false;
      } else if (tab === 'linkedin') {
        if (job.source !== 'LinkedIn') return false;
      } else if (tab === 'others') {
        if (job.source !== 'Indeed' && job.source !== 'Shine') return false;
      }

      // Fresher filter
      if (fresherOnly && !job.isFresherFriendly) return false;

      // Department filter
      if (dept !== 'All' && job.department !== dept) return false;

      // Location filter
      if (loc !== 'All') {
        if (!job.location.toLowerCase().includes(loc.toLowerCase())) return false;
      }

      // Source filter
      if (src !== 'All' && job.source !== src) return false;

      // Search query filter
      if (query) {
        const titleMatch = job.title.toLowerCase().includes(query);
        const compMatch = (job.companyName || '').toLowerCase().includes(query);
        const descMatch = job.description.toLowerCase().includes(query);
        const locMatch = job.location.toLowerCase().includes(query);
        const srcMatch = (job.source || '').toLowerCase().includes(query);
        const reqMatch = (job.requirements || []).some(r => r.toLowerCase().includes(query));
        return titleMatch || compMatch || descMatch || locMatch || srcMatch || reqMatch;
      }

      return true;
    });
  });

  savedJobsCount = computed(() => {
    const savedIds = this.academyService.savedJobIds();
    return this.academyService.externalJobs().filter(j => savedIds.includes(j.id)).length;
  });

  naukriCount = computed(() => {
    return this.academyService.externalJobs().filter(j => j.source === 'Naukri').length;
  });

  apnaCount = computed(() => {
    return this.academyService.externalJobs().filter(j => j.source === 'Apna').length;
  });

  linkedinCount = computed(() => {
    return this.academyService.externalJobs().filter(j => j.source === 'LinkedIn').length;
  });

  othersCount = computed(() => {
    return this.academyService.externalJobs().filter(j => j.source === 'Indeed' || j.source === 'Shine').length;
  });

  setActiveTab(tab: 'all' | 'saved' | 'naukri' | 'apna' | 'linkedin' | 'others'): void {
    this.activeTab.set(tab);
  }

  setDepartment(dept: string): void {
    this.selectedDepartment.set(dept);
  }

  setLocation(loc: string): void {
    this.selectedLocation.set(loc);
  }

  setSource(src: string): void {
    this.selectedSource.set(src);
  }

  toggleFresher(): void {
    this.onlyFresher.update(v => !v);
  }

  toggleSave(jobId: string, event?: Event): void {
    if (event) event.stopPropagation();
    this.academyService.toggleSaveJob(jobId);
  }

  isSaved(jobId: string): boolean {
    return this.academyService.isJobSaved(jobId);
  }

  toggleAlert(): void {
    this.alertSubscribed.update(v => !v);
  }

  refreshFeed(): void {
    this.isRefreshing.set(true);
    setTimeout(() => {
      this.academyService.refreshExternalJobs();
      this.isRefreshing.set(false);
    }, 400);
  }

  toggleExpand(id: string): void {
    if (this.expandedJobId() === id) {
      this.expandedJobId.set(null);
    } else {
      this.expandedJobId.set(id);
    }
  }

  applyNow(job: JobListing): void {
    if (job.sourceUrl) {
      window.open(job.sourceUrl, '_blank', 'noopener,noreferrer');
    } else {
      this.openJobApplication.emit({ jobId: job.id, jobTitle: job.title + ' (' + (job.companyName || 'Hiring Company') + ')' });
    }
  }

  applyDirectModal(job: JobListing, event?: Event): void {
    if (event) event.stopPropagation();
    this.openJobApplication.emit({ jobId: job.id, jobTitle: job.title + ' (' + (job.companyName || 'Hiring Company') + ')' });
  }

  copyJobLink(job: JobListing, event?: Event): void {
    if (event) event.stopPropagation();
    if (typeof window !== 'undefined' && navigator.clipboard) {
      const shareUrl = window.location.origin + '/jobs#' + job.id;
      navigator.clipboard.writeText(shareUrl).then(() => {
        this.copiedJobId.set(job.id);
        setTimeout(() => this.copiedJobId.set(null), 2000);
      });
    }
  }

  resetAllFilters(): void {
    this.searchQuery.set('');
    this.selectedDepartment.set('All');
    this.selectedLocation.set('All');
    this.selectedSource.set('All');
    this.onlyFresher.set(false);
  }

  navigateToCareer(): void {
    this.navigate.emit('/career');
  }

  getSourceColor(source?: string): string {
    switch (source) {
      case 'LinkedIn':
        return 'text-[#0A66C2] bg-[#0A66C2]/10 border-[#0A66C2]/20';
      case 'Naukri':
        return 'text-[#2D5BFF] bg-[#2D5BFF]/10 border-[#2D5BFF]/20';
      case 'Indeed':
        return 'text-[#003A9B] bg-[#003A9B]/10 border-[#003A9B]/20';
      case 'Apna':
        return 'text-[#00A859] bg-[#00A859]/10 border-[#00A859]/20';
      case 'Shine':
        return 'text-[#8E44AD] bg-[#8E44AD]/10 border-[#8E44AD]/20';
      default:
        return 'text-slate-800 bg-slate-100 border-slate-200';
    }
  }

  getCompanyInitial(name?: string): string {
    if (!name) return 'C';
    return name.charAt(0).toUpperCase();
  }
}
