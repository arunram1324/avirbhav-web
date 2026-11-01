import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademyDataService } from '../../services/academy-data.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="w-full bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100 transition-all">
      <div class="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 h-20 sm:h-24 flex items-center justify-between">
        
        <!-- Logo -->
        <a (click)="onNavigate('/')" class="flex items-center gap-3.5 group select-none cursor-pointer">
          @if (academyService.siteContent().siteLogoUrl && academyService.siteContent().siteLogoUrl !== '/images/logo.png') {
            <img [src]="academyService.siteContent().siteLogoUrl" alt="Avirbhav Logo" class="h-9 sm:h-10 w-auto object-contain" />
          } @else {
            <div class="relative w-11 h-9 sm:w-12 sm:h-10 flex items-center justify-center">
              <!-- Geometric AV Logo -->
              <svg class="w-full h-full" viewBox="0 0 70 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- A triangle in yellow -->
                <path d="M5 45L25 5L45 45H32L25 30L18 45H5Z" fill="#FBEC52" />
                <!-- V triangle in cyan blue -->
                <path d="M30 5H43L50 26L57 5H70L55 45H45L30 5Z" fill="#0CA9FF" />
                <!-- Corner box accent -->
                <rect x="2" y="2" width="66" height="46" rx="2" stroke="#E2E8F0" stroke-width="1.5" stroke-dasharray="3 3" class="opacity-0 group-hover:opacity-100 transition-opacity" />
              </svg>
            </div>
          }
          <div class="flex flex-col">
            <span class="text-xs sm:text-sm font-semibold tracking-wider text-slate-800 uppercase leading-none">Avirbhav Infotech</span>
            <span class="text-[10px] text-slate-400 font-medium tracking-wide">Digital Academy</span>
          </div>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="hidden md:flex items-center gap-7 lg:gap-10 text-slate-700 font-medium text-sm lg:text-base">
          <!-- Home -->
          <a 
            (click)="onNavigate('/')" 
            [class.text-brand-blue]="activeRoute === 'home'"
            [class.font-semibold]="activeRoute === 'home'"
            class="hover:text-brand-blue transition-colors cursor-pointer py-2">
            Home
          </a>
          
          <!-- Programs Dropdown -->
          <div class="relative group" (mouseenter)="isProgramsOpen.set(true)" (mouseleave)="isProgramsOpen.set(false)">
            <button 
              type="button"
              class="flex items-center gap-1.5 hover:text-brand-blue transition-colors focus:outline-none py-2 cursor-pointer">
              <span>Programs</span>
              <svg class="w-4 h-4 text-slate-400 group-hover:text-brand-blue transition-transform duration-200 group-hover:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
              </svg>
            </button>

            <!-- Dropdown Menu -->
            @if (isProgramsOpen()) {
              <div class="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-2.5 z-50 fade-in max-h-96 overflow-y-auto">
                @for (course of academyService.courses(); track course.id) {
                  <button 
                    type="button"
                    (click)="viewCourse.emit(course.id); isProgramsOpen.set(false)" 
                    class="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50/70 transition-colors text-left cursor-pointer group">
                    <div class="w-8 h-8 rounded-lg bg-blue-500/10 text-brand-blue flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                      {{ course.icon || course.id }}
                    </div>
                    <div>
                      <div class="font-bold text-slate-900 text-sm group-hover:text-brand-blue transition-colors flex items-center gap-1.5">
                        <span>{{ course.title }}</span>
                        <span class="text-[10px] px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-800 font-bold uppercase">{{ course.badge }}</span>
                      </div>
                      <div class="text-xs text-slate-500 line-clamp-1">{{ course.desc }}</div>
                    </div>
                  </button>
                }
              </div>
            }
          </div>

          <!-- About (Dedicated Page) -->
          <a 
            (click)="onNavigate('/about')" 
            [class.text-brand-blue]="activeRoute === 'about'"
            [class.font-semibold]="activeRoute === 'about'"
            class="hover:text-brand-blue transition-colors cursor-pointer py-2">
            About
          </a>

          <!-- The Squad (Consult-X Layout) -->
          <a 
            (click)="onNavigate('/team')" 
            [class.text-brand-blue]="activeRoute === 'team' || activeRoute === 'team-member'"
            [class.font-semibold]="activeRoute === 'team' || activeRoute === 'team-member'"
            class="hover:text-brand-blue transition-colors cursor-pointer py-2 inline-flex items-center gap-1.5">
            <span>The Squad</span>
            <span class="px-1.5 py-0.2 rounded-full bg-slate-900 text-amber-300 font-extrabold text-[10px]">
              {{ academyService.teamMembers().length }}
            </span>
          </a>

          <!-- Career (Dedicated Page) -->
          <a 
            (click)="onNavigate('/career')" 
            [class.text-brand-blue]="activeRoute === 'career'"
            [class.font-semibold]="activeRoute === 'career'"
            class="hover:text-brand-blue transition-colors cursor-pointer py-2 inline-flex items-center gap-1.5">
            <span>Career</span>
            <span class="px-1.5 py-0.2 rounded-full bg-blue-50 text-brand-blue font-bold text-[10px]">
              {{ academyService.careerRoles().length }}
            </span>
          </a>

          <!-- Jobs (Dedicated Page next to Career) -->
          <a 
            (click)="onNavigate('/jobs')" 
            [class.text-brand-blue]="activeRoute === 'jobs'"
            [class.font-semibold]="activeRoute === 'jobs'"
            class="hover:text-brand-blue transition-colors cursor-pointer py-2 inline-flex items-center gap-1.5">
            <span>Jobs</span>
            <span class="px-1.5 py-0.2 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
              {{ academyService.externalJobs().length }}
            </span>
          </a>
        </nav>

        <!-- Header CTA Button -->
        <div class="hidden sm:flex items-center gap-4">
          <button 
            (click)="openBooking.emit('Header CTA')"
            class="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blueHover text-white font-semibold text-sm sm:text-base px-6 sm:px-7 py-2.5 sm:py-3 rounded-full border border-sky-400/30 transition-colors duration-150 cursor-pointer">
            <span>Book Now</span>
            <svg class="w-4 h-4 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </button>
        </div>

        <!-- Mobile Menu Toggle Button -->
        <div class="flex sm:hidden items-center">
          <button 
            (click)="isMobileMenuOpen.set(!isMobileMenuOpen())"
            aria-label="Toggle Navigation Menu"
            class="p-2 text-slate-700 hover:text-brand-blue focus:outline-none">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              @if (!isMobileMenuOpen()) {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              } @else {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              }
            </svg>
          </button>
        </div>

      </div>

      <!-- Mobile Dropdown Drawer -->
      @if (isMobileMenuOpen()) {
        <div class="sm:hidden bg-white border-b border-slate-100 px-6 py-5 flex flex-col gap-3.5 fade-in">
          <a (click)="onNavigate('/'); isMobileMenuOpen.set(false)" [class.text-brand-blue]="activeRoute === 'home'" class="font-medium text-base py-1 cursor-pointer">Home</a>
          <a (click)="onNavigate('/#curriculum'); isMobileMenuOpen.set(false)" class="text-slate-700 font-medium text-base py-1 cursor-pointer">Programs & Tracks</a>
          <a (click)="onNavigate('/about'); isMobileMenuOpen.set(false)" [class.text-brand-blue]="activeRoute === 'about'" class="font-medium text-base py-1 cursor-pointer">About Us</a>
          <a (click)="onNavigate('/team'); isMobileMenuOpen.set(false)" [class.text-brand-blue]="activeRoute === 'team' || activeRoute === 'team-member'" class="font-medium text-base py-1 cursor-pointer flex items-center justify-between">
            <span>The Squad (Mentors)</span>
            <span class="px-2 py-0.5 rounded-full bg-slate-900 text-amber-300 font-bold text-xs">{{ academyService.teamMembers().length }}</span>
          </a>
          <a (click)="onNavigate('/career'); isMobileMenuOpen.set(false)" [class.text-brand-blue]="activeRoute === 'career'" class="font-medium text-base py-1 cursor-pointer flex items-center justify-between">
            <span>Career (Avirbhav)</span>
            <span class="px-2 py-0.5 rounded-full bg-blue-50 text-brand-blue font-bold text-xs">{{ academyService.careerRoles().length }} Openings</span>
          </a>
          <a (click)="onNavigate('/jobs'); isMobileMenuOpen.set(false)" [class.text-brand-blue]="activeRoute === 'jobs'" class="font-medium text-base py-1 cursor-pointer flex items-center justify-between">
            <span>Jobs (Other Companies)</span>
            <span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs">{{ academyService.externalJobs().length }} Openings</span>
          </a>
          <button 
            (click)="openBooking.emit('Mobile Menu CTA'); isMobileMenuOpen.set(false)"
            class="w-full inline-flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-blueHover text-white font-semibold text-base px-6 py-3 rounded-full mt-2 border border-sky-400/30 transition-colors duration-150">
            <span>Book 1:1 Strategy Slot</span>
            <svg class="w-4 h-4 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </button>
        </div>
      }
    </header>
  `,
  styles: [`
    .fade-in {
      animation: fadeIn 0.15s ease-out forwards;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-3px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class NavbarComponent {
  academyService = inject(AcademyDataService);
  
  @Input() activeRoute: string = 'home';
  @Output() openBooking = new EventEmitter<string>();
  @Output() viewCourse = new EventEmitter<string>();
  @Output() navigate = new EventEmitter<string>();

  isProgramsOpen = signal(false);
  isMobileMenuOpen = signal(false);

  onNavigate(path: string): void {
    this.navigate.emit(path);
  }
}
