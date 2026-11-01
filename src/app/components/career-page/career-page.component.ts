import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademyDataService, JobListing } from '../../services/academy-data.service';

@Component({
  selector: 'app-career-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './career-page.component.html',
  styleUrls: ['./career-page.component.css']
})
export class CareerPageComponent {
  academyService = inject(AcademyDataService);

  get content() {
    return this.academyService.careerContent();
  }

  @Output() openBooking = new EventEmitter<string>();
  @Output() openJobApplication = new EventEmitter<{ jobId: string; jobTitle: string }>();
  @Output() navigate = new EventEmitter<string>();

  get featuredJobs(): JobListing[] {
    return this.academyService.careerRoles();
  }

  applyForRole(job: JobListing): void {
    this.openJobApplication.emit({ jobId: job.id, jobTitle: job.title });
  }

  navigateToJobs(): void {
    this.navigate.emit('/jobs');
  }

  scrollToRoles(): void {
    if (typeof document !== 'undefined') {
      const el = document.getElementById('open-roles-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        this.navigateToJobs();
      }
    }
  }
}
