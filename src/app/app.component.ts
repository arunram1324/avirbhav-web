import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { StatsBannerComponent } from './components/stats-banner/stats-banner.component';
import { CurriculumComponent } from './components/curriculum/curriculum.component';
import { BookingModalComponent } from './components/booking-modal/booking-modal.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { CareerPageComponent } from './components/career-page/career-page.component';
import { JobsPageComponent } from './components/jobs-page/jobs-page.component';
import { JobApplyModalComponent } from './components/job-apply-modal/job-apply-modal.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { TeamPageComponent } from './components/team-page/team-page.component';
import { TeamMemberDetailComponent } from './components/team-member-detail/team-member-detail.component';
import { AcademyDataService } from './services/academy-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    StatsBannerComponent,
    CurriculumComponent,
    BookingModalComponent,
    FooterComponent,
    AdminPanelComponent,
    CourseDetailComponent,
    AboutPageComponent,
    CareerPageComponent,
    JobsPageComponent,
    JobApplyModalComponent,
    ContactFormComponent,
    TeamPageComponent,
    TeamMemberDetailComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  academyService = inject(AcademyDataService);
  
  // Student consultation modal
  isBookingModalOpen = signal(false);
  activeModalSource = signal('General');

  // Candidate job application modal
  isJobApplyModalOpen = signal(false);
  selectedJobForApply = signal<{ jobId: string; jobTitle: string }>({ jobId: '', jobTitle: '' });

  // Routing signals
  isAdminView = signal(false);
  currentRoute = signal<'home' | 'about' | 'career' | 'jobs' | 'course' | 'team' | 'team-member'>('home');
  selectedTeamMemberSlug = signal<string | null>(null);
  selectedCourseId = signal<string | null>(null);

  constructor() {
    this.checkRoute();
    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', () => this.checkRoute());
      window.addEventListener('hashchange', () => this.checkRoute());
      // Custom event for internal navigation between admin, course details and live site
      window.addEventListener('app-navigate', ((e: CustomEvent) => {
        if (e.detail?.path) {
          window.history.pushState(null, '', e.detail.path);
          this.checkRoute();
        }
      }) as EventListener);
    }
  }

  private readonly COURSE_ID_TO_SLUG: Record<string, string> = {
    '01': 'social-media-marketing',
    '02': 'instagram-reels-growth',
    '03': 'meta-google-ads',
    '04': 'seo-website-ranking'
  };

  private readonly ADMIN_TAB_HASHES = [
    '#admin',
    '#/admin',
    '#login',
    '#/login',
    '#overview',
    '#leads',
    '#pages',
    '#courses',
    '#assets',
    '#content',
    '#seo',
    '#snapshots',
    '#backup'
  ];

  private checkRoute() {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname || '';
      const hash = window.location.hash || '';
      
      const hasAdminHash = this.ADMIN_TAB_HASHES.some(prefix => 
        hash.startsWith(prefix) || 
        hash.startsWith('#admin/') || 
        hash.startsWith('#/admin/') ||
        hash === prefix
      );

      const isAdmin = pathname.startsWith('/admin') || 
                      pathname.startsWith('/login') || 
                      hasAdminHash;
                      
      this.isAdminView.set(isAdmin);

      // If user landed on an admin hash or route while on root pathname (e.g. https://domain.com/#leads or /#admin),
      // cleanly normalize the URL to /admin#tab so the address bar is always clean and consistent (matching local dev /admin#leads)
      if (isAdmin && !pathname.startsWith('/admin') && !pathname.startsWith('/login')) {
        let cleanTab = 'overview';
        if (hash.includes('leads')) cleanTab = 'leads';
        else if (hash.includes('pages')) cleanTab = 'pages';
        else if (hash.includes('assets')) cleanTab = 'assets';
        else if (hash.includes('courses')) cleanTab = 'courses';
        else if (hash.includes('content')) cleanTab = 'content';
        else if (hash.includes('seo')) cleanTab = 'seo';
        else if (hash.includes('snapshots') || hash.includes('backup')) cleanTab = 'snapshots';
        
        try {
          window.history.replaceState(null, '', `/admin#${cleanTab}`);
        } catch {}
      }

      if (isAdmin) {
        this.selectedCourseId.set(null);
        return;
      }

      // Check About page route (/about or #about-page)
      if (pathname === '/about' || pathname.startsWith('/about/') || hash === '#about-page') {
        this.currentRoute.set('about');
        this.selectedCourseId.set(null);
        return;
      }

      // Check Career page route (/career or #career-page)
      if (pathname === '/career' || pathname.startsWith('/career/') || hash === '#career-page') {
        this.currentRoute.set('career');
        this.selectedCourseId.set(null);
        return;
      }

      // Check Jobs page route (/jobs or #jobs)
      if (pathname === '/jobs' || pathname.startsWith('/jobs/') || hash === '#jobs') {
        this.currentRoute.set('jobs');
        this.selectedCourseId.set(null);
        return;
      }

      // Check The Squad page route (/team or #team)
      if (pathname === '/team' || pathname === '/team/' || hash === '#team' || hash === '#team-page') {
        this.currentRoute.set('team');
        this.selectedTeamMemberSlug.set(null);
        this.selectedCourseId.set(null);
        return;
      }

      // Check Team Member detail route (/team/:slug or #team/:slug)
      if (pathname.startsWith('/team/') || hash.startsWith('#team/')) {
        const slug = pathname.startsWith('/team/') ? pathname.replace('/team/', '').split('/')[0] : hash.replace('#team/', '').split('/')[0];
        if (slug) {
          this.currentRoute.set('team-member');
          this.selectedTeamMemberSlug.set(slug);
          this.selectedCourseId.set(null);
          return;
        }
      }

      // Check Course detail page
      const isCourse = pathname.includes('/courses') || 
                       pathname.includes('/course') || 
                       hash.includes('course');
                       
      if (isCourse) {
        this.currentRoute.set('course');
        let matchedId = '01';
        const catalog = this.academyService.courseCatalog();
        
        for (const [id, course] of Object.entries(catalog)) {
          if (course.slug && (pathname.includes(course.slug) || hash.includes(course.slug))) {
            matchedId = id;
            break;
          }
          if (pathname.includes('/courses/' + id) || hash.includes('course=' + id)) {
            matchedId = id;
            break;
          }
        }
        this.selectedCourseId.set(matchedId);
        return;
      }

      // Default Home page
      this.currentRoute.set('home');
      this.selectedCourseId.set(null);
    }
  }

  navigateTo(path: string) {
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', path);
      this.checkRoute();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  openCourse(courseId: string) {
    const id = courseId || '01';
    this.selectedCourseId.set(id);
    const detail = this.academyService.getCourseDetail(id);
    const slug = detail?.slug || this.COURSE_ID_TO_SLUG[id] || 'social-media-marketing';
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `/courses/${slug}`);
      this.checkRoute();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  closeCourse() {
    this.selectedCourseId.set(null);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '/#curriculum');
      this.checkRoute();
    }
  }

  openModal(source: string) {
    this.activeModalSource.set(source);
    this.isBookingModalOpen.set(true);
  }

  closeModal() {
    this.isBookingModalOpen.set(false);
  }

  openTeamMember(slug: string): void {
    this.selectedTeamMemberSlug.set(slug);
    this.currentRoute.set('team-member');
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `/team/${slug}`);
      this.checkRoute();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  closeTeamMember(): void {
    this.selectedTeamMemberSlug.set(null);
    this.currentRoute.set('team');
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '/team');
      this.checkRoute();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  openJobApplication(job: { jobId: string; jobTitle: string }) {
    this.selectedJobForApply.set(job);
    this.isJobApplyModalOpen.set(true);
  }

  closeJobApplyModal() {
    this.isJobApplyModalOpen.set(false);
  }
}
