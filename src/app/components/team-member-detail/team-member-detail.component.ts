import { Component, EventEmitter, Input, Output, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademyDataService, TeamMember } from '../../services/academy-data.service';

@Component({
  selector: 'app-team-member-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-member-detail.component.html',
  styleUrls: ['./team-member-detail.component.css']
})
export class TeamMemberDetailComponent {
  academyService = inject(AcademyDataService);

  @Input() slug: string = 'deekshith';
  @Output() goBack = new EventEmitter<void>();
  @Output() openBooking = new EventEmitter<string>();
  @Output() navigate = new EventEmitter<string>();

  member = computed<TeamMember | undefined>(() => {
    return this.academyService.getTeamMemberBySlug(this.slug);
  });

  onGoBack(): void {
    this.goBack.emit();
  }

  onBookConsultation(): void {
    const name = this.member()?.name || 'Mentor';
    this.openBooking.emit(`Mentor Detail: ${name}`);
  }

  onNavigate(path: string): void {
    this.navigate.emit(path);
  }
}
