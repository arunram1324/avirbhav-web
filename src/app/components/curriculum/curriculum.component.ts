import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcademyDataService, ModuleItem } from '../../services/academy-data.service';

@Component({
  selector: 'app-curriculum',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="curriculum" class="py-20 sm:py-28 lg:py-32 bg-[#FBFBFA] border-b border-slate-200/70 overflow-hidden">
      <div class="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        
        <!-- Framer Style Section Header -->
        <div class="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/80 border border-blue-200/60 text-xs font-bold text-brand-blue uppercase tracking-widest mb-4">
            <span>What we offer / Curriculum</span>
          </div>
          <h2 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {{ academyService.siteContent().curriculumHeading }}
          </h2>
          <p class="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            {{ academyService.siteContent().curriculumSubheading }}
          </p>
        </div>

        <!-- Framer-Style Interactive Services Accordion / Track Showcase -->
        <div class="space-y-4">
          @for (item of modules; track item.id; let i = $index) {
            
            <!-- EXPANDED ACTIVE CARD (Avirbhav Home Light Theme) -->
            @if (activeModuleIndex === i) {
              <div class="relative bg-white text-slate-900 rounded-3xl sm:rounded-[32px] p-6 sm:p-10 lg:p-12 border-2 border-brand-blue/30 shadow-2xl shadow-blue-500/10 overflow-hidden transition-all duration-500 animate-fadeIn ring-4 ring-brand-blue/5">
                
                <!-- Background Ambient Glow -->
                <div class="absolute -top-32 -right-32 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none"></div>
                <div class="absolute -bottom-32 -left-32 w-96 h-96 bg-yellow-300/15 rounded-full blur-3xl pointer-events-none"></div>

                <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  <!-- Left: 3D Visual Card / Badge (Vibrant Brand Blue Gradient) -->
                  <div 
                    (click)="viewCourse.emit(item.id)"
                    class="lg:col-span-4 flex flex-col justify-between h-full min-h-[260px] sm:min-h-[320px] rounded-2xl sm:rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#0CA9FF] via-[#0098EA] to-[#0284C7] text-white border border-blue-400/30 relative overflow-hidden group cursor-pointer shadow-xl shadow-blue-500/20 hover:shadow-2xl transition-all">
                    
                    <div class="flex items-center justify-between">
                      <span class="text-xs font-mono font-bold tracking-widest text-white/90 uppercase">
                        Track {{ item.id }}
                      </span>
                      <span class="text-xs font-bold px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30">
                        {{ item.badge }}
                      </span>
                    </div>

                    <div class="my-auto py-6 flex flex-col items-center text-center">
                      <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-4xl sm:text-5xl shadow-xl shadow-blue-900/15 transform transition-transform group-hover:scale-110 duration-300">
                        {{ item.icon }}
                      </div>
                      <span class="mt-4 text-sm font-bold text-white">
                        150-Day Intensive Module
                      </span>
                      <span class="text-[12px] text-brand-yellow font-extrabold mt-1.5 group-hover:underline flex items-center gap-1">
                        <span>Click for Full Details</span>
                        <span>↗</span>
                      </span>
                    </div>

                    <div class="flex items-center justify-between text-xs text-white/90 border-t border-white/20 pt-3">
                      <span>Live Client Training</span>
                      <span class="font-bold text-white">Avirbhav Certified ✓</span>
                    </div>
                  </div>

                  <!-- Right: Core Content & Deliverables (Clean Light Theme) -->
                  <div class="lg:col-span-8 flex flex-col justify-between">
                    <div>
                      <!-- Category & Action Row -->
                      <div class="flex flex-wrap items-center justify-between gap-4 mb-3">
                        <div class="flex items-center gap-3">
                          <span class="text-base sm:text-lg font-mono font-bold text-brand-blue">{{ item.id }}</span>
                          <span class="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500">
                            {{ item.category }}
                          </span>
                        </div>

                        <!-- CTA Action Buttons -->
                        <div class="flex items-center gap-3">
                          <!-- View Course Details (Reference Site Style: Warm Sunny Yellow Pill) -->
                          <button 
                            (click)="viewCourse.emit(item.id)"
                            class="inline-flex items-center gap-2 bg-brand-yellow hover:bg-brand-yellowHover text-slate-950 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md shadow-yellow-500/20 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer">
                            <span>View Full Syllabus & Batches</span>
                            <span class="text-base leading-none">↗</span>
                          </button>

                          <!-- Quick Enroll Modal (Brand Blue Pill) -->
                          <button 
                            (click)="openBooking.emit(item.title)"
                            class="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blueHover text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-brand transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer">
                            <span>Enroll</span>
                          </button>
                        </div>
                      </div>

                      <!-- Large Service Title (Clickable) -->
                      <h3 
                        (click)="viewCourse.emit(item.id)"
                        class="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight leading-tight hover:text-brand-blue cursor-pointer transition-colors group">
                        <span>{{ item.title }}</span>
                        <span class="text-2xl text-brand-blue ml-2 opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                      </h3>

                      <!-- Metric Highlight -->
                      <div class="mt-4 flex items-baseline gap-2.5">
                        <span class="text-2xl sm:text-3xl font-extrabold text-brand-blue font-heading">
                          {{ item.metric }}
                        </span>
                        <span class="text-sm sm:text-base font-bold text-slate-800">
                          {{ item.metricLabel }}
                        </span>
                      </div>

                      <!-- Description -->
                      <p class="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                        {{ item.desc }}
                      </p>
                    </div>

                    <!-- 3 Deliverables Pill Boxes (Light Theme Pill Cards) -->
                    <div class="mt-8 pt-6 border-t border-slate-200">
                      <div class="flex items-center justify-between mb-3">
                        <span class="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Key Masteries & Deliverables
                        </span>
                        <button 
                          (click)="viewCourse.emit(item.id)" 
                          class="text-xs text-brand-blue hover:underline font-bold cursor-pointer">
                          See all 12 modules →
                        </button>
                      </div>
                      
                      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        @for (deliverable of item.deliverables; track deliverable) {
                          <div 
                            (click)="viewCourse.emit(item.id)"
                            class="p-3.5 sm:p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200/90 hover:border-brand-blue/40 transition-all flex items-center gap-2.5 cursor-pointer shadow-sm group">
                            <div class="w-2 h-2 rounded-full bg-brand-blue shrink-0 group-hover:scale-125 transition-transform"></div>
                            <span class="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-brand-blue leading-snug">
                              {{ deliverable }}
                            </span>
                          </div>
                        }
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            } @else {
              <!-- COLLAPSED ROW (Framer Clean Divider Row) -->
              <div 
                (click)="setActiveModule(i)"
                class="group bg-white hover:bg-slate-50 border border-slate-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-7 transition-all duration-300 cursor-pointer flex items-center justify-between shadow-sm hover:shadow-md">
                
                <div class="flex items-center gap-4 sm:gap-8">
                  <!-- Monospace Index Number -->
                  <span class="text-xl sm:text-2xl font-mono font-bold text-slate-400 group-hover:text-brand-blue transition-colors w-10 sm:w-12 shrink-0">
                    {{ item.id }}
                  </span>

                  <!-- Title & Category Info -->
                  <div>
                    <span class="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                      {{ item.category }}
                    </span>
                    <h3 class="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 group-hover:text-brand-blue transition-colors">
                      {{ item.title }}
                    </h3>
                  </div>
                </div>

                <!-- Right Action Button / Arrow -->
                <div class="flex items-center gap-3">
                  <span class="hidden sm:inline-block text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-brand-blue transition-colors">
                    {{ item.badge }}
                  </span>
                  <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-100 group-hover:bg-brand-blue text-slate-700 group-hover:text-white flex items-center justify-center font-bold text-sm sm:text-base transition-all duration-300 group-hover:scale-105">
                    ↗
                  </div>
                </div>

              </div>
            }

          }
        </div>

        <!-- Deliverables / What You Get Banner -->
        <div class="mt-16 sm:mt-24 bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm">
          <div class="text-center max-w-2xl mx-auto mb-10">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-bold text-emerald-700 mb-3">
              ★ GUARANTEED OUTCOMES
            </div>
            <h3 class="text-2xl sm:text-3xl font-extrabold text-slate-900">What You Get With Every Enrollment</h3>
            <p class="text-sm sm:text-base text-slate-500 mt-2">Comprehensive career acceleration, live portfolio assets, and dedicated mentorship</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            @for (benefit of (academyService.siteContent().benefits || benefits); track benefit) {
              <div class="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-100 hover:border-slate-200 transition-colors">
                <div class="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-sm sm:text-base font-semibold text-slate-800">{{ benefit }}</span>
              </div>
            }
          </div>

          <!-- High-converting Banner for Free Strategy Kit (Avirbhav Brand Blue Theme) -->
          <div class="mt-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-brand-blue via-[#0098EA] to-[#0284C7] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-500/20">
            <div>
              <span class="px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-bold uppercase tracking-wider">
                🎁 Free Starter Pack Included
              </span>
              <h4 class="text-xl sm:text-2xl font-bold mt-2 text-white">{{ academyService.siteContent().starterPackTitle }}</h4>
              <p class="text-xs sm:text-sm text-white/90 mt-1">{{ academyService.siteContent().starterPackDesc }}</p>
            </div>
            
            <button 
              (click)="openBooking.emit('Free Starter Pack Banner')"
              class="shrink-0 inline-flex items-center gap-2 bg-brand-yellow hover:bg-brand-yellowHover text-slate-950 font-bold text-sm px-7 py-3.5 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer">
              <span>{{ academyService.siteContent().starterPackCta }}</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  `
})
export class CurriculumComponent {
  @Output() openBooking = new EventEmitter<string>();
  @Output() viewCourse = new EventEmitter<string>();

  activeModuleIndex = 0;

  setActiveModule(index: number) {
    this.activeModuleIndex = index;
  }

  academyService = inject(AcademyDataService);

  get modules(): ModuleItem[] {
    return this.academyService.courses();
  }

  benefits: string[] = [
    '100% Practical Hands-on Training',
    'Placement Support & Mock Interviews',
    'Live Client Campaign Budgets',
    'Resume & Case Study Portfolio Setup',
    'Recognized Internship Certificate',
    'Tamil + English Dual Explanation'
  ];
}
