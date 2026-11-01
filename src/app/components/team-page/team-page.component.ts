import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademyDataService, TeamMember } from '../../services/academy-data.service';

@Component({
  selector: 'app-team-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.css']
})
export class TeamPageComponent {
  academyService = inject(AcademyDataService);

  @Output() openBooking = new EventEmitter<string>();
  @Output() viewMember = new EventEmitter<string>();
  @Output() navigate = new EventEmitter<string>();

  onSelectMember(slug: string): void {
    this.viewMember.emit(slug);
  }

  onBookConsultation(source: string = 'The Squad Page'): void {
    this.openBooking.emit(source);
  }

  onNavigate(path: string): void {
    this.navigate.emit(path);
  }
}
