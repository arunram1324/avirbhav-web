import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademyDataService } from '../../services/academy-data.service';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent {
  academyService = inject(AcademyDataService);

  get content() {
    return this.academyService.aboutContent();
  }

  @Output() openBooking = new EventEmitter<string>();
  @Output() viewCourse = new EventEmitter<string>();
  @Output() navigate = new EventEmitter<string>();

  openConsultation(): void {
    this.openBooking.emit('About Page CTA');
  }

  navigateToCareer(): void {
    this.navigate.emit('/career');
  }

  navigateToJobs(): void {
    this.navigate.emit('/jobs');
  }
}
