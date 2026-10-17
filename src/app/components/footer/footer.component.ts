import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademyDataService } from '../../services/academy-data.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer id="about" class="bg-slate-950 text-white pt-16 sm:pt-20 pb-12 border-t border-slate-900">
      <div class="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-14 border-b border-slate-800">
          
          <!-- Column 1: Brand Info -->
          <div class="lg:col-span-2 flex flex-col items-start">
            <div class="flex items-center gap-3">
              <div class="w-10 h-8 flex items-center justify-center">
                <svg class="w-full h-full" viewBox="0 0 70 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 45L25 5L45 45H32L25 30L18 45H5Z" fill="#FBEC52" />
                  <path d="M30 5H43L50 26L57 5H70L55 45H45L30 5Z" fill="#0CA9FF" />
                </svg>
              </div>
              <span class="text-xl font-bold tracking-tight text-white">Avirbhav Infotech</span>
            </div>
            
            <p class="mt-4 text-slate-400 text-sm leading-relaxed max-w-sm">
              Empowering students and business owners to master modern digital marketing, SEO, paid performance advertising, and AI-driven growth systems.
            </p>

            <div class="mt-6 flex items-center gap-4 text-xs font-semibold">
              <span class="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                {{ academyService.siteContent().admissionsStatus }}
              </span>
            </div>
          </div>

          <!-- Column 2: Programs (Dynamically rendered from courses) -->
          <div>
            <h4 class="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">Core Programs</h4>
            <ul class="space-y-2.5 text-sm text-slate-400">
              @for (course of academyService.courses(); track course.id) {
                <li>
                  <button type="button" (click)="viewCourse.emit(course.id)" class="hover:text-brand-blue transition-colors text-left cursor-pointer">
                    {{ course.title }}
                  </button>
                </li>
              }
            </ul>
          </div>

          <!-- Column 3: Quick Navigation (Admin link removed) -->
          <div id="career">
            <h4 class="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">Quick Navigation</h4>
            <ul class="space-y-2.5 text-sm text-slate-400">
              <li><a href="#home" class="hover:text-brand-blue transition-colors">Home</a></li>
              <li><a href="#about" class="hover:text-brand-blue transition-colors">About Academy</a></li>
              <li><a href="#curriculum" class="hover:text-brand-blue transition-colors">Curriculum</a></li>
              <li><a href="https://avirbhavinfotech.com" target="_blank" class="hover:text-brand-blue transition-colors">Official Portal ↗</a></li>
              <li><button (click)="openBooking.emit('Footer Career')" class="hover:text-brand-blue transition-colors text-left">Career Opportunities</button></li>
            </ul>
          </div>

          <!-- Column 4: Contact Details (Dynamically bound) -->
          <div>
            <h4 class="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">Direct Contact</h4>
            <ul class="space-y-3 text-sm text-slate-400">
              <li class="flex items-start gap-2.5">
                <span class="text-brand-blue font-bold">P:</span>
                <a [href]="'tel:' + academyService.siteContent().phone" class="hover:text-white transition-colors">
                  {{ academyService.siteContent().phone }}
                </a>
              </li>
              <li class="flex items-start gap-2.5">
                <span class="text-brand-blue font-bold">E:</span>
                <a [href]="'mailto:' + academyService.siteContent().email" class="hover:text-white transition-colors break-all">
                  {{ academyService.siteContent().email }}
                </a>
              </li>
              <li class="flex items-start gap-2.5">
                <span class="text-brand-blue font-bold">A:</span>
                <span class="leading-snug">{{ academyService.siteContent().address }}</span>
              </li>
            </ul>
          </div>

        </div>

        <!-- Copyright Row -->
        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{{ academyService.siteContent().copyrightText }}</p>
          <div class="flex items-center gap-6">
            <a href="#" class="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" class="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="https://avirbhavinfotech.com" target="_blank" class="hover:text-slate-300 transition-colors">avirbhavinfotech.com</a>
          </div>
        </div>

      </div>
    </footer>
  `
})
export class FooterComponent {
  academyService = inject(AcademyDataService);
  @Output() openBooking = new EventEmitter<string>();
  @Output() viewCourse = new EventEmitter<string>();
}
