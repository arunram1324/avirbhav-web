import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademyDataService } from '../../services/academy-data.service';

@Component({
  selector: 'app-stats-banner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="relative bg-brand-blue text-white overflow-hidden py-16 sm:py-24 lg:py-28">
      <div class="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        
        <!-- Top Stats Row (3 Columns matching Figma & Dynamically editable) -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-12 pb-16 sm:pb-24 lg:pb-32 border-b border-white/20">
          
          <!-- Stat 1 -->
          <div class="flex flex-col items-start sm:items-start">
            <span class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white">
              {{ academyService.siteContent().stat1Value }}
            </span>
            <span class="text-base sm:text-lg font-medium text-white/90 mt-2 sm:mt-3">
              {{ academyService.siteContent().stat1Label }}
            </span>
          </div>

          <!-- Stat 2 -->
          <div class="flex flex-col items-start sm:items-start">
            <span class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white">
              {{ academyService.siteContent().stat2Value }}
            </span>
            <span class="text-base sm:text-lg font-medium text-white/90 mt-2 sm:mt-3">
              {{ academyService.siteContent().stat2Label }}
            </span>
          </div>

          <!-- Stat 3 -->
          <div class="flex flex-col items-start sm:items-start">
            <span class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white">
              {{ academyService.siteContent().stat3Value }}
            </span>
            <span class="text-base sm:text-lg font-medium text-white/90 mt-2 sm:mt-3">
              {{ academyService.siteContent().stat3Label }}
            </span>
          </div>

        </div>

        <!-- Bottom Value Proposition & Pill Badges (2-column layout matching Figma) -->
        <div class="pt-12 sm:pt-16 lg:pt-20 flex flex-col lg:flex-row lg:items-end justify-between gap-12 lg:gap-8">
          
          <!-- Left Column: Value Copy & Dual CTAs -->
          <div class="max-w-xl flex flex-col items-start">
            <p class="text-lg sm:text-xl lg:text-2xl font-normal leading-relaxed text-white/95">
              {{ academyService.siteContent().valueText }}
            </p>

            <!-- Dual CTA Action Buttons -->
            <div class="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
              <!-- Enquiry Now Button (Solid White) -->
              <button 
                (click)="openEnquiry.emit('Enquiry Now CTA')"
                class="group inline-flex items-center gap-2.5 bg-white text-brand-blue hover:bg-slate-100 font-bold text-sm sm:text-base px-7 sm:px-9 py-3 sm:py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
                <span>Enquiry Now</span>
                <svg class="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </button>

              <!-- Book your Slot Button (Transparent Outline) -->
              <button 
                (click)="openBooking.emit('Book your Slot CTA')"
                class="group inline-flex items-center gap-2.5 bg-transparent hover:bg-white/10 text-white font-semibold text-sm sm:text-base px-7 sm:px-9 py-3 sm:py-3.5 rounded-full border-2 border-white transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
                <span>Book your Slot</span>
                <svg class="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Right Column: Pill Badges Stack matching Figma -->
          <div class="flex flex-wrap items-center lg:justify-end gap-3 max-w-lg">
            @for (tag of (academyService.siteContent().floatingTags || ['Clarity in positioning', 'Performance-Driven Marketing', 'Media Planning', 'Growth Systems']); track tag) {
              <div class="inline-flex items-center px-6 py-2.5 rounded-full border border-white/80 bg-white/10 backdrop-blur-md text-white font-medium text-sm sm:text-base hover:bg-white/20 transition-colors shadow-sm select-none">
                {{ tag }}
              </div>
            }
          </div>

        </div>

      </div>
    </section>
  `
})
export class StatsBannerComponent {
  academyService = inject(AcademyDataService);
  @Output() openEnquiry = new EventEmitter<string>();
  @Output() openBooking = new EventEmitter<string>();
}
