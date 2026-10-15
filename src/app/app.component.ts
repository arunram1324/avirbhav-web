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

  private checkRoute() {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname || '';
      const hash = window.location.hash || '';
      
      const isAdmin = pathname.startsWith('/admin') || 
                      hash.startsWith('#admin') || 
                      hash.startsWith('#/admin');
                      
      this.isAdminView.set(isAdmin);

      const isCourse = pathname.includes('/courses') || 
                       pathname.includes('/course') || 
                       hash.includes('course');
                       
      if (isCourse && !isAdmin) {
        this.selectedCourseId.set('01');
      } else if (!isCourse && !isAdmin) {
        this.selectedCourseId.set(null);
      }
    }
  }

  openCourse(courseId: string) {
    this.selectedCourseId.set(courseId || '01');
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '/courses/social-media-marketing');
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
