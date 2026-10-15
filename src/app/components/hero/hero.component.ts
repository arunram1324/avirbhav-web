import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademyDataService } from '../../services/academy-data.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="home" class="relative bg-white pt-16 sm:pt-24 lg:pt-32 pb-16 sm:pb-24 overflow-hidden">
      
      <!-- Subtle background ambient glow -->
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-blue-50/50 via-yellow-50/30 to-transparent blur-3xl -z-10 pointer-events-none"></div>

      <div class="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 text-center flex flex-col items-center">
        
        <!-- Micro-Batch USP Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs sm:text-sm font-bold text-brand-blue mb-6 shadow-sm">
          <span class="w-2 h-2 rounded-full bg-brand-blue animate-pulse"></span>
          <span>⚡ Strictly 4 Students Per Batch • 100% Individual Mentorship & Live Ad Spend</span>
        </div>

        <!-- Main Headline (Pixel-perfect Figma match & Dynamically editable) -->
        <h1 class="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-extrabold tracking-tight text-[#0F172A] leading-[1.12] max-w-5xl whitespace-pre-line">
          {{ academyService.siteContent().heroHeadline }}
        </h1>

        <!-- Subheading (Exact Figma 2-line break match & Dynamically editable) -->
        <p class="mt-7 sm:mt-9 text-base sm:text-xl md:text-[21px] font-normal text-slate-700 leading-relaxed max-w-4xl whitespace-pre-line">
          {{ academyService.siteContent().heroSubheading }}
        </p>

        <!-- Hero CTA Button: Yellow Pill matching Figma (#FBEC52) -->
        <div class="mt-8 sm:mt-11">
          <button 
            (click)="openBooking.emit('Hero Yellow Button')"
            class="group inline-flex items-center gap-3 bg-brand-yellow hover:bg-brand-yellowHover text-slate-950 font-bold text-base sm:text-lg px-10 sm:px-14 py-3.5 sm:py-4 rounded-full shadow-yellow-glow hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
            <span>{{ academyService.siteContent().heroCtaText }}</span>
            <svg class="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  `
})
export class HeroComponent {
  academyService = inject(AcademyDataService);
  @Output() openBooking = new EventEmitter<string>();
}
