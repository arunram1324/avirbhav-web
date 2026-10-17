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
    CourseDetailComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  academyService = inject(AcademyDataService);
  
  isBookingModalOpen = signal(false);
  activeModalSource = signal('General');

  isAdminView = signal(false);
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

  private readonly SLUG_TO_COURSE_ID: Record<string, string> = {
    'social-media-marketing': '01',
    'instagram-reels-growth': '02',
    'meta-google-ads': '03',
    'seo-website-ranking': '04'
  };

  private checkRoute() {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname || '';
      const hash = window.location.hash || '';
      
      const isAdmin = pathname.startsWith('/admin') || 
                      pathname.startsWith('/login') || 
                      hash.startsWith('#admin') || 
                      hash.startsWith('#/admin') ||
                      hash.startsWith('#login') ||
                      hash.startsWith('#/login');
                      
      this.isAdminView.set(isAdmin);

      const isCourse = pathname.includes('/courses') || 
                       pathname.includes('/course') || 
                       hash.includes('course');
                       
      if (isCourse && !isAdmin) {
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
      } else if (!isAdmin) {
        this.selectedCourseId.set(null);
      }
    }
  }

  openCourse(courseId: string) {
    const id = courseId || '01';
    this.selectedCourseId.set(id);
    const detail = this.academyService.getCourseDetail(id);
    const slug = detail?.slug || this.COURSE_ID_TO_SLUG[id] || 'social-media-marketing';
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `/courses/${slug}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  closeCourse() {
    this.selectedCourseId.set(null);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '/#curriculum');
    }
  }

  openModal(source: string) {
    this.activeModalSource.set(source);
    this.isBookingModalOpen.set(true);
  }

  closeModal() {
    this.isBookingModalOpen.set(false);
  }
}
