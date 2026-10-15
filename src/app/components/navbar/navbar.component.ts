import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="w-full bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100 transition-all">
      <div class="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 h-20 sm:h-24 flex items-center justify-between">
        
        <!-- Logo -->
        <a href="#" class="flex items-center gap-3.5 group select-none">
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
          <div class="flex flex-col">
            <span class="text-xs sm:text-sm font-semibold tracking-wider text-slate-800 uppercase leading-none">Avirbhav Infotech</span>
            <span class="text-[10px] text-slate-400 font-medium tracking-wide">Digital Academy</span>
          </div>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="hidden md:flex items-center gap-8 lg:gap-11 text-slate-700 font-medium text-base">
          <a href="#home" class="text-brand-blue font-semibold hover:text-brand-blueHover transition-colors">Home</a>
          
          <!-- Programs Dropdown -->
          <div class="relative group" (mouseenter)="isProgramsOpen.set(true)" (mouseleave)="isProgramsOpen.set(false)">
            <button class="flex items-center gap-1.5 hover:text-brand-blue transition-colors focus:outline-none py-2">
              <span>Programs</span>
              <svg class="w-4 h-4 text-slate-400 group-hover:text-brand-blue transition-transform duration-200 group-hover:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
              </svg>
            </button>

            <!-- Dropdown Menu -->
            @if (isProgramsOpen()) {
              <div class="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2.5 z-50 fade-in">
                <button 
                  type="button"
                  (click)="viewCourse.emit('01'); isProgramsOpen.set(false)" 
                  class="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50/70 transition-colors text-left cursor-pointer group">
                  <div class="w-8 h-8 rounded-lg bg-blue-500/10 text-brand-blue flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors">SMM</div>
                  <div>
                    <div class="font-bold text-slate-900 text-sm group-hover:text-brand-blue transition-colors flex items-center gap-1.5">
                      <span>Social Media Marketing</span>
                      <span class="text-[10px] px-1.5 py-0.2 rounded-full bg-yellow-100 text-amber-800 font-bold">HOT</span>
                    </div>
                    <div class="text-xs text-slate-500">AI Automation & Virality Blueprint</div>
                  </div>
                </button>
                <a href="#curriculum" (click)="isProgramsOpen.set(false)" class="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <div class="w-8 h-8 rounded-lg bg-blue-50 text-brand-blue flex items-center justify-center font-bold text-xs shrink-0">DM</div>
                  <div>
                    <div class="font-semibold text-slate-900 text-sm">Digital Marketing 150D</div>
                    <div class="text-xs text-slate-500">Comprehensive agency-style program</div>
                  </div>
                </a>
                <a href="#curriculum" (click)="isProgramsOpen.set(false)" class="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <div class="w-8 h-8 rounded-lg bg-yellow-50 text-amber-600 flex items-center justify-center font-bold text-xs shrink-0">SEO</div>
                  <div>
                    <div class="font-semibold text-slate-900 text-sm">SEO & Web Ranking</div>
                    <div class="text-xs text-slate-500">Technical & organic traffic growth</div>
                  </div>
                </a>
                <a href="#curriculum" (click)="isProgramsOpen.set(false)" class="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <div class="w-8 h-8 rounded-lg bg-blue-50 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0">ADS</div>
                  <div>
                    <div class="font-semibold text-slate-900 text-sm">Meta & Google Ads</div>
                    <div class="text-xs text-slate-500">High-ROI performance campaigns</div>
                  </div>
                </a>
                <a href="#curriculum" (click)="isProgramsOpen.set(false)" class="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <div class="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs shrink-0">AI</div>
                  <div>
                    <div class="font-semibold text-slate-900 text-sm">AI Marketing Tools</div>
                    <div class="text-xs text-slate-500">ChatGPT, Midjourney & Automations</div>
                  </div>
                </a>
              </div>
            }
          </div>

          <a href="#about" class="hover:text-brand-blue transition-colors">About</a>
          <a href="#career" class="hover:text-brand-blue transition-colors">Career</a>
        </nav>

        <!-- Header CTA Button -->
        <div class="hidden sm:flex items-center gap-4">
          <button 
            (click)="openBooking.emit('Header CTA')"
            class="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blueHover text-white font-semibold text-sm sm:text-base px-6 sm:px-7 py-2.5 sm:py-3 rounded-full shadow-brand hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
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
        <div class="sm:hidden bg-white border-b border-slate-100 px-6 py-5 flex flex-col gap-4 fade-in">
          <a href="#home" (click)="isMobileMenuOpen.set(false)" class="text-brand-blue font-semibold text-base py-1">Home</a>
          <a href="#curriculum" (click)="isMobileMenuOpen.set(false)" class="text-slate-700 font-medium text-base py-1">Programs</a>
          <a href="#about" (click)="isMobileMenuOpen.set(false)" class="text-slate-700 font-medium text-base py-1">About</a>
          <a href="#career" (click)="isMobileMenuOpen.set(false)" class="text-slate-700 font-medium text-base py-1">Career</a>
          <button 
            (click)="openBooking.emit('Mobile Menu CTA'); isMobileMenuOpen.set(false)"
            class="w-full inline-flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-blueHover text-white font-semibold text-base px-6 py-3 rounded-full mt-2 shadow-brand">
            <span>Book Now</span>
            <svg class="w-4 h-4 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </button>
        </div>
      }
    </header>
  `
})
export class NavbarComponent {
  @Output() openBooking = new EventEmitter<string>();
  @Output() viewCourse = new EventEmitter<string>();

  isProgramsOpen = signal(false);
  isMobileMenuOpen = signal(false);
}
