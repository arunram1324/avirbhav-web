import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AcademyDataService, Lead, ModuleItem, SeoConfig, SiteContent } from '../../services/academy-data.service';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      
      <!-- ========================================== -->
      <!-- 1. ADMIN AUTHENTICATION SCREEN (LOGIN GATE) -->
      <!-- ========================================== -->
      @if (!academyService.isAuthenticated()) {
        <div class="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          
          <div class="w-full max-w-md bg-slate-950/90 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-xl">
            <!-- Glow background effect -->
            <div class="absolute -top-24 -left-24 w-52 h-52 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none"></div>
            <div class="absolute -bottom-24 -right-24 w-52 h-52 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none"></div>

            <!-- Brand Icon & Header -->
            <div class="flex flex-col items-center text-center mb-8 relative z-10">
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-blue to-cyan-400 flex items-center justify-center font-black text-white text-2xl shadow-xl shadow-blue-500/20 mb-4">
                AV
              </div>
              <h1 class="text-2xl font-extrabold text-white tracking-tight">Avirbhav Digital Academy</h1>
              <p class="text-sm text-slate-400 mt-1">Admin Portal Access</p>
            </div>

            <!-- Login Error Alert -->
            @if (loginError()) {
              <div class="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs sm:text-sm flex items-center gap-2.5">
                <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{{ loginError() }}</span>
              </div>
            }

            <!-- Login Form -->
            <form (ngSubmit)="handleLogin()" class="space-y-4 relative z-10">
              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">Admin Email</label>
                <div class="relative">
                  <svg class="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  <input 
                    type="email" 
                    [(ngModel)]="loginEmail" 
                    name="email"
                    required
                    placeholder="admin@avirbhav.com"
                    class="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-800 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none text-sm text-slate-100 placeholder-slate-500 transition-colors" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">Password</label>
                <div class="relative">
                  <svg class="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <input 
                    [type]="showPassword() ? 'text' : 'password'" 
                    [(ngModel)]="loginPassword" 
                    name="password"
                    required
                    placeholder="••••••••"
                    class="w-full pl-11 pr-11 py-3 rounded-xl bg-slate-900 border border-slate-800 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none text-sm text-slate-100 placeholder-slate-500 transition-colors" />
                  
                  <button 
                    type="button" 
                    (click)="showPassword.set(!showPassword())"
                    class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      @if (showPassword()) {
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                      } @else {
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      }
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Quick Demo Credentials Filler -->
              <div class="pt-2">
                <button 
                  type="button"
                  (click)="fillDemoCredentials()"
                  class="w-full py-2 px-3 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-400 hover:text-brand-blue flex items-center justify-center gap-1.5 transition-colors">
                  <span>🔑 Auto-Fill Demo Credentials (admin&#64;avirbhav.com / admin123)</span>
                </button>
              </div>

              <div class="pt-2">
                <button 
                  type="submit" 
                  class="w-full py-3.5 px-6 rounded-xl bg-brand-blue hover:bg-sky-400 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2">
                  <span>Sign In to Admin Portal</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>

              <div class="pt-4 text-center">
                <button 
                  type="button" 
                  (click)="navigateToLiveSite()" 
                  class="text-xs text-slate-400 hover:text-white transition-colors">
                  ← Return to Public Website
                </button>
              </div>
            </form>

          </div>

          <p class="mt-8 text-xs text-slate-600 text-center">
            Avirbhav Infotech & Academy Management System • Protected Route
          </p>
        </div>
      }

      <!-- ========================================== -->
      <!-- 2. ADMIN DASHBOARD (AUTHENTICATED)        -->
      <!-- ========================================== -->
      @else {
        <!-- Top Admin Header -->
        <header class="bg-slate-950 border-b border-slate-800 sticky top-0 z-30 px-6 py-4">
          <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue to-cyan-400 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-blue-500/20">
                AV
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h1 class="text-lg sm:text-xl font-extrabold text-white tracking-tight">Avirbhav Digital Academy</h1>
                  <span class="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-brand-blue text-[11px] font-bold uppercase tracking-wider">
                    Admin Portal
                  </span>
                </div>
                <p class="text-xs text-slate-400">Full Website Management, Leads Registry & SEO Suite</p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <!-- Back to Live Site -->
              <button 
                (click)="navigateToLiveSite()" 
                class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700 transition-all hover:scale-105">
                <span>← View Live Site</span>
              </button>

              <!-- Export Excel -->
              <button 
                (click)="exportAllToExcel()" 
                class="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-600/20 transition-all hover:scale-105">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span class="hidden sm:inline">Export Excel</span>
              </button>

              <!-- Log Out Button -->
              <button 
                (click)="handleLogout()" 
                class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs sm:text-sm font-semibold transition-all">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>

          </div>
        </header>

        <!-- Main Admin Content Container -->
        <main class="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
          
          <!-- Summary KPI Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div class="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-md">
              <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Total Enquiries</span>
              <div class="flex items-baseline justify-between">
                <span class="text-3xl font-extrabold text-white font-heading">{{ academyService.leads().length }}</span>
                <span class="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-brand-blue font-bold">1:1 Bookings</span>
              </div>
            </div>

            <div class="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-md">
              <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">New Leads</span>
              <div class="flex items-baseline justify-between">
                <span class="text-3xl font-extrabold text-brand-yellow font-heading">{{ newLeadsCount() }}</span>
                <span class="text-xs px-2 py-0.5 rounded-full bg-yellow-500/10 text-brand-yellow font-bold">Action Needed</span>
              </div>
            </div>

            <div class="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-md">
              <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Enrolled Students</span>
              <div class="flex items-baseline justify-between">
                <span class="text-3xl font-extrabold text-emerald-400 font-heading">{{ enrolledCount() }}</span>
                <span class="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold">Confirmed</span>
              </div>
            </div>

            <div class="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-md">
              <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Live Course Tracks</span>
              <div class="flex items-baseline justify-between">
                <span class="text-3xl font-extrabold text-cyan-400 font-heading">{{ academyService.courses().length }}</span>
                <span class="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-bold">Active Programs</span>
              </div>
            </div>
          </div>

          <!-- Navigation Tab Switcher (4 TABS) -->
          <div class="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
            <button 
              (click)="activeTab.set('leads')"
              [class.bg-brand-blue]="activeTab() === 'leads'"
              [class.text-white]="activeTab() === 'leads'"
              [class.bg-slate-800]="activeTab() !== 'leads'"
              [class.text-slate-400]="activeTab() !== 'leads'"
              class="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2">
              <span>📋 Bookings & Leads (CRUD)</span>
              <span class="px-2 py-0.5 rounded-full text-[11px] bg-black/20 text-white font-mono">
                {{ academyService.leads().length }}
              </span>
            </button>

            <button 
              (click)="activeTab.set('courses')"
              [class.bg-brand-blue]="activeTab() === 'courses'"
              [class.text-white]="activeTab() === 'courses'"
              [class.bg-slate-800]="activeTab() !== 'courses'"
              [class.text-slate-400]="activeTab() !== 'courses'"
              class="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2">
              <span>🎓 Courses & Programs (CRUD)</span>
              <span class="px-2 py-0.5 rounded-full text-[11px] bg-black/20 text-white font-mono">
                {{ academyService.courses().length }}
              </span>
            </button>

            <button 
              (click)="activeTab.set('content')"
              [class.bg-brand-blue]="activeTab() === 'content'"
              [class.text-white]="activeTab() === 'content'"
              [class.bg-slate-800]="activeTab() !== 'content'"
              [class.text-slate-400]="activeTab() !== 'content'"
              class="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2">
              <span>🎨 Site Content & Branding (CRUD)</span>
            </button>

            <button 
              (click)="activeTab.set('seo')"
              [class.bg-brand-blue]="activeTab() === 'seo'"
              [class.text-white]="activeTab() === 'seo'"
              [class.bg-slate-800]="activeTab() !== 'seo'"
              [class.text-slate-400]="activeTab() !== 'seo'"
              class="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2">
              <span>🔍 SEO & Meta Tags Manager</span>
            </button>
          </div>

          <!-- Toast Notification Banner -->
          @if (toastMessage()) {
            <div class="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm flex items-center justify-between shadow-lg">
              <div class="flex items-center gap-2">
                <span>✅</span>
                <span>{{ toastMessage() }}</span>
              </div>
              <button (click)="toastMessage.set('')" class="text-emerald-400 hover:text-white">✕</button>
            </div>
          }

          <!-- ============================================== -->
          <!-- TAB 1: LEADS & BOOKINGS MANAGER (FULL CRUD)     -->
          <!-- ============================================== -->
          @if (activeTab() === 'leads') {
            <div class="space-y-6">
              
              <!-- Filter Bar & Search & Add Manual Lead -->
              <div class="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                
                <!-- Search Input -->
                <div class="relative w-full md:w-80">
                  <svg class="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input 
                    type="text" 
                    [(ngModel)]="searchQuery" 
                    placeholder="Search by student name, phone..."
                    class="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 focus:border-brand-blue outline-none text-xs sm:text-sm text-slate-100 placeholder-slate-500" />
                </div>

                <!-- Status Filters -->
                <div class="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
                  <span class="text-xs text-slate-400 font-semibold mr-1">Status:</span>
                  @for (filter of ['All', 'New', 'Contacted', 'Enrolled', 'Closed']; track filter) {
                    <button 
                      (click)="selectedStatusFilter.set(filter)"
                      [class.bg-brand-blue]="selectedStatusFilter() === filter"
                      [class.text-white]="selectedStatusFilter() === filter"
                      [class.bg-slate-900]="selectedStatusFilter() !== filter"
                      [class.text-slate-400]="selectedStatusFilter() !== filter"
                      class="px-2.5 py-1.5 rounded-lg text-xs font-bold border border-slate-800 hover:border-slate-700 transition-colors">
                      {{ filter }}
                    </button>
                  }
                </div>

                <!-- Add Manual Lead Button -->
                <button 
                  (click)="openAddLeadModal()"
                  class="w-full md:w-auto px-4 py-2 rounded-xl bg-brand-blue hover:bg-sky-400 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/20">
                  <span>+ Record Walk-in Lead</span>
                </button>
              </div>

              <!-- Leads Table -->
              <div class="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
                <div class="overflow-x-auto">
                  <table class="w-full text-left text-sm text-slate-300">
                    <thead class="bg-slate-900/90 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                      <tr>
                        <th class="px-6 py-4 font-bold">Student Name & Contact</th>
                        <th class="px-6 py-4 font-bold">Course / Program</th>
                        <th class="px-6 py-4 font-bold">Date & Source</th>
                        <th class="px-6 py-4 font-bold">Status</th>
                        <th class="px-6 py-4 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-800/60">
                      @for (lead of filteredLeads(); track lead.id) {
                        <tr class="hover:bg-slate-900/40 transition-colors">
                          <!-- Contact Info -->
                          <td class="px-6 py-4">
                            <div class="font-bold text-white text-base">{{ lead.name }}</div>
                            <div class="text-xs text-brand-blue flex items-center gap-1.5 mt-0.5">
                              <span>📱</span>
                              <a [href]="'tel:' + lead.phone" class="hover:underline">{{ lead.phone }}</a>
                            </div>
                            @if (lead.email) {
                              <div class="text-xs text-slate-400 mt-0.5">
                                ✉️ {{ lead.email }}
                              </div>
                            }
                            @if (lead.notes) {
                              <div class="text-[11px] text-amber-300/80 bg-amber-500/10 border border-amber-500/20 rounded-md px-2 py-0.5 mt-1.5 max-w-xs">
                                📝 {{ lead.notes }}
                              </div>
                            }
                          </td>

                          <!-- Program -->
                          <td class="px-6 py-4">
                            <span class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-500/10 text-cyan-300 border border-blue-500/20">
                              {{ lead.program }}
                            </span>
                          </td>

                          <!-- Date & Source -->
                          <td class="px-6 py-4 text-xs text-slate-400">
                            <div>{{ formatDate(lead.createdAt) }}</div>
                            <span class="text-[11px] text-slate-500 block mt-0.5">Source: {{ lead.source }}</span>
                          </td>

                          <!-- Status Dropdown -->
                          <td class="px-6 py-4">
                            <select 
                              [ngModel]="lead.status"
                              (ngModelChange)="changeLeadStatus(lead.id, $event)"
                              class="text-xs font-bold px-3 py-1.5 rounded-lg border outline-none bg-slate-900 cursor-pointer"
                              [ngClass]="{
                                'border-blue-500/40 text-blue-400': lead.status === 'New',
                                'border-amber-500/40 text-amber-400': lead.status === 'Contacted',
                                'border-emerald-500/40 text-emerald-400': lead.status === 'Enrolled',
                                'border-slate-600 text-slate-400': lead.status === 'Closed'
                              }">
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Enrolled">Enrolled</option>
                              <option value="Closed">Closed</option>
                            </select>
                          </td>

                          <!-- Actions: WhatsApp + Edit + Delete -->
                          <td class="px-6 py-4 text-right">
                            <div class="flex items-center justify-end gap-2">
                              <!-- WhatsApp Connect -->
                              <a 
                                [href]="getWhatsAppLink(lead)"
                                target="_blank"
                                title="Chat on WhatsApp"
                                class="p-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all">
                                💬
                              </a>

                              <!-- Edit Lead -->
                              <button 
                                (click)="openEditLeadModal(lead)"
                                title="Edit Lead"
                                class="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all">
                                ✏️
                              </button>

                              <!-- Delete Lead -->
                              <button 
                                (click)="deleteLead(lead.id)"
                                title="Delete Lead"
                                class="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-all">
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      } @empty {
                        <tr>
                          <td colspan="5" class="px-6 py-12 text-center text-slate-500">
                            No leads found matching your criteria.
                          </td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          }

          <!-- ============================================== -->
          <!-- TAB 2: COURSE BLUEPRINT MANAGER (FULL CRUD)     -->
          <!-- ============================================== -->
          @if (activeTab() === 'courses') {
            <div class="space-y-6">
              
              <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                <div>
                  <h2 class="text-base sm:text-lg font-bold text-white">Curriculum & Course Tracks</h2>
                  <p class="text-xs text-slate-400">Create, edit, or delete modules. Changes immediately update on the live site!</p>
                </div>
                <button 
                  (click)="openAddCourseModal()"
                  class="px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-sky-400 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-blue-500/20">
                  <span>+ Add New Course Track</span>
                </button>
              </div>

              <!-- Courses Cards Grid -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                @for (course of academyService.courses(); track course.id) {
                  <div class="bg-slate-950 border border-slate-800 rounded-2xl p-6 relative flex flex-col justify-between hover:border-slate-700 transition-all">
                    <div>
                      <div class="flex items-center justify-between gap-2 mb-3">
                        <div class="flex items-center gap-2.5">
                          <span class="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-sm font-mono font-bold text-brand-blue">
                            {{ course.id }}
                          </span>
                          <span class="text-xl">{{ course.icon }}</span>
                          <span class="text-xs font-bold text-slate-400">{{ course.category }}</span>
                        </div>
                        <span class="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-brand-blue text-[11px] font-bold">
                          {{ course.badge }}
                        </span>
                      </div>

                      <h3 class="text-lg font-extrabold text-white">{{ course.title }}</h3>
                      
                      <div class="mt-2 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                        <span class="text-sm font-extrabold">{{ course.metric }}</span>
                        <span class="text-slate-400">{{ course.metricLabel }}</span>
                      </div>

                      <p class="mt-3 text-xs text-slate-400 leading-relaxed">{{ course.desc }}</p>

                      <!-- Deliverables -->
                      <div class="mt-4 flex flex-wrap gap-1.5">
                        @for (deliv of course.deliverables; track deliv) {
                          <span class="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                            ✓ {{ deliv }}
                          </span>
                        }
                      </div>
                    </div>

                    <!-- Actions -->
                    <div class="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-end gap-2">
                      <button 
                        (click)="openEditCourseModal(course)"
                        class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors flex items-center gap-1.5">
                        <span>✏️ Edit Course</span>
                      </button>
                      <button 
                        (click)="deleteCourse(course.id)"
                        class="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-bold border border-rose-500/20 transition-colors flex items-center gap-1.5">
                        <span>🗑️ Delete</span>
                      </button>
                    </div>
                  </div>
                }
              </div>

            </div>
          }

          <!-- ============================================== -->
          <!-- TAB 3: SITE CONTENT & BRANDING (FULL CRUD)      -->
          <!-- ============================================== -->
          @if (activeTab() === 'content') {
            <div class="space-y-6">
              
              <div class="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                <div class="flex items-center justify-between mb-6">
                  <div>
                    <h2 class="text-lg font-bold text-white">Website Hero, Stats & Contact Information</h2>
                    <p class="text-xs text-slate-400">Edit core website copy in real time without touching code.</p>
                  </div>
                  <button 
                    (click)="saveSiteContent()"
                    class="px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-sky-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/20 flex items-center gap-2">
                    <span>💾 Save Site Content</span>
                  </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <!-- Section A: Hero Section -->
                  <div class="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                    <h3 class="text-sm font-bold text-brand-yellow uppercase tracking-wider flex items-center gap-2">
                      <span>✨ Hero Section</span>
                    </h3>
                    
                    <div>
                      <label class="block text-xs font-semibold text-slate-300 mb-1">Hero Main Headline (Multiline)</label>
                      <textarea 
                        rows="2" 
                        [(ngModel)]="contentForm.heroHeadline"
                        class="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-brand-blue outline-none"></textarea>
                    </div>

                    <div>
                      <label class="block text-xs font-semibold text-slate-300 mb-1">Hero Subheading</label>
                      <textarea 
                        rows="3" 
                        [(ngModel)]="contentForm.heroSubheading"
                        class="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-brand-blue outline-none"></textarea>
                    </div>

                    <div>
                      <label class="block text-xs font-semibold text-slate-300 mb-1">Hero CTA Button Text</label>
                      <input 
                        type="text" 
                        [(ngModel)]="contentForm.heroCtaText"
                        class="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-brand-blue outline-none" />
                    </div>
                  </div>

                  <!-- Section B: Stats Banner -->
                  <div class="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                    <h3 class="text-sm font-bold text-brand-blue uppercase tracking-wider flex items-center gap-2">
                      <span>📊 Blue Value Banner & Stats</span>
                    </h3>

                    <div class="grid grid-cols-2 gap-3">
                      <div>
                        <label class="block text-xs font-semibold text-slate-300 mb-1">Stat 1 Value</label>
                        <input type="text" [(ngModel)]="contentForm.stat1Value" class="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white" />
                      </div>
                      <div>
                        <label class="block text-xs font-semibold text-slate-300 mb-1">Stat 1 Label</label>
                        <input type="text" [(ngModel)]="contentForm.stat1Label" class="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white" />
                      </div>
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                      <div>
                        <label class="block text-xs font-semibold text-slate-300 mb-1">Stat 2 Value</label>
                        <input type="text" [(ngModel)]="contentForm.stat2Value" class="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white" />
                      </div>
                      <div>
                        <label class="block text-xs font-semibold text-slate-300 mb-1">Stat 2 Label</label>
                        <input type="text" [(ngModel)]="contentForm.stat2Label" class="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white" />
                      </div>
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                      <div>
                        <label class="block text-xs font-semibold text-slate-300 mb-1">Stat 3 Value</label>
                        <input type="text" [(ngModel)]="contentForm.stat3Value" class="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white" />
                      </div>
                      <div>
                        <label class="block text-xs font-semibold text-slate-300 mb-1">Stat 3 Label</label>
                        <input type="text" [(ngModel)]="contentForm.stat3Label" class="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white" />
                      </div>
                    </div>

                    <div>
                      <label class="block text-xs font-semibold text-slate-300 mb-1">Value Statement Copy</label>
                      <textarea 
                        rows="2" 
                        [(ngModel)]="contentForm.valueText"
                        class="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-brand-blue outline-none"></textarea>
                    </div>
                  </div>

                  <!-- Section C: Contact & Footer Info -->
                  <div class="md:col-span-2 p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                    <h3 class="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                      <span>📍 Academy Contact Details</span>
                    </h3>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label class="block text-xs font-semibold text-slate-300 mb-1">Phone / WhatsApp</label>
                        <input type="text" [(ngModel)]="contentForm.phone" class="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white" />
                      </div>
                      <div>
                        <label class="block text-xs font-semibold text-slate-300 mb-1">Official Email</label>
                        <input type="text" [(ngModel)]="contentForm.email" class="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white" />
                      </div>
                      <div>
                        <label class="block text-xs font-semibold text-slate-300 mb-1">Campus Location</label>
                        <input type="text" [(ngModel)]="contentForm.address" class="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          }

          <!-- ============================================== -->
          <!-- TAB 4: SEO & META TAGS MANAGER                -->
          <!-- ============================================== -->
          @if (activeTab() === 'seo') {
            <div class="space-y-6">
              
              <div class="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                <div class="flex items-center justify-between mb-6">
                  <div>
                    <h2 class="text-lg font-bold text-white">Search Engine Optimization & Social Sharing Meta Tags</h2>
                    <p class="text-xs text-slate-400">Configure Page Title, Meta Description, Open Graph & Twitter Cards dynamically.</p>
                  </div>
                  <button 
                    (click)="saveSeoConfig()"
                    class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/20 flex items-center gap-2">
                    <span>🚀 Save & Apply Live Meta Tags</span>
                  </button>
                </div>

                <!-- Live Preview Cards -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  
                  <!-- Google Search Preview -->
                  <div class="p-5 rounded-xl bg-white text-slate-900 border border-slate-200 shadow-sm">
                    <span class="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-3">Google SERP Snippet Preview</span>
                    <div class="flex items-center gap-2 text-xs text-slate-600 mb-1">
                      <div class="w-4 h-4 rounded-full bg-blue-500 text-white text-[9px] flex items-center justify-center font-bold">AV</div>
                      <span class="truncate">{{ seoForm.canonicalUrl }}</span>
                    </div>
                    <div class="text-base sm:text-lg font-semibold text-[#1a0dab] hover:underline cursor-pointer line-clamp-1">
                      {{ seoForm.title }}
                    </div>
                    <div class="text-xs text-[#4d5156] mt-1.5 leading-relaxed line-clamp-2">
                      {{ seoForm.metaDescription }}
                    </div>
                  </div>

                  <!-- Social Share Card Preview -->
                  <div class="p-5 rounded-xl bg-slate-900 border border-slate-800 text-white">
                    <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-3">Social Share Preview (WhatsApp / LinkedIn)</span>
                    <div class="rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                      <div class="h-32 bg-gradient-to-tr from-brand-blue to-cyan-500 flex items-center justify-center text-white font-black text-2xl">
                        Avirbhav Digital Academy
                      </div>
                      <div class="p-3">
                        <span class="text-[10px] text-slate-500 uppercase font-bold tracking-wider">AVIRBHAVINFOTECH.COM</span>
                        <div class="text-sm font-bold text-white mt-0.5 line-clamp-1">{{ seoForm.ogTitle }}</div>
                        <div class="text-xs text-slate-400 mt-1 line-clamp-2">{{ seoForm.ogDescription }}</div>
                      </div>
                    </div>
                  </div>

                </div>

                <!-- SEO Inputs Form -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <!-- Primary SEO -->
                  <div class="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                    <h3 class="text-sm font-bold text-brand-blue uppercase tracking-wider">Primary Search Meta</h3>
                    
                    <div>
                      <label class="block text-xs font-semibold text-slate-300 mb-1">
                        Page Title (Shown in Browser Tab & Google)
                      </label>
                      <input 
                        type="text" 
                        [(ngModel)]="seoForm.title"
                        class="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-brand-blue outline-none" />
                    </div>

                    <div>
                      <label class="block text-xs font-semibold text-slate-300 mb-1">
                        Meta Description (Recommended 150-160 characters)
                      </label>
                      <textarea 
                        rows="3" 
                        [(ngModel)]="seoForm.metaDescription"
                        class="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-brand-blue outline-none"></textarea>
                    </div>

                    <div>
                      <label class="block text-xs font-semibold text-slate-300 mb-1">
                        Target Keywords (Comma Separated)
                      </label>
                      <input 
                        type="text" 
                        [(ngModel)]="seoForm.metaKeywords"
                        class="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-brand-blue outline-none" />
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                      <div>
                        <label class="block text-xs font-semibold text-slate-300 mb-1">Author</label>
                        <input type="text" [(ngModel)]="seoForm.author" class="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white" />
                      </div>
                      <div>
                        <label class="block text-xs font-semibold text-slate-300 mb-1">Robots</label>
                        <input type="text" [(ngModel)]="seoForm.robots" class="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white" />
                      </div>
                    </div>
                  </div>

                  <!-- Open Graph & Social Meta -->
                  <div class="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                    <h3 class="text-sm font-bold text-pink-400 uppercase tracking-wider">Open Graph & Social Media Tags</h3>

                    <div>
                      <label class="block text-xs font-semibold text-slate-300 mb-1">Open Graph Title (og:title)</label>
                      <input 
                        type="text" 
                        [(ngModel)]="seoForm.ogTitle"
                        class="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-brand-blue outline-none" />
                    </div>

                    <div>
                      <label class="block text-xs font-semibold text-slate-300 mb-1">Open Graph Description (og:description)</label>
                      <textarea 
                        rows="3" 
                        [(ngModel)]="seoForm.ogDescription"
                        class="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-brand-blue outline-none"></textarea>
                    </div>

                    <div>
                      <label class="block text-xs font-semibold text-slate-300 mb-1">OG Banner Image URL (og:image)</label>
                      <input 
                        type="text" 
                        [(ngModel)]="seoForm.ogImage"
                        class="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-brand-blue outline-none" />
                    </div>

                    <div>
                      <label class="block text-xs font-semibold text-slate-300 mb-1">Canonical Web URL</label>
                      <input 
                        type="text" 
                        [(ngModel)]="seoForm.canonicalUrl"
                        class="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-sm text-white focus:border-brand-blue outline-none" />
                    </div>
                  </div>

                </div>

              </div>

            </div>
          }

        </main>

        <!-- ============================================== -->
        <!-- MODAL: ADD / EDIT LEAD MODAL                   -->
        <!-- ============================================== -->
        @if (isLeadModalOpen()) {
          <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div class="bg-slate-950 border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-5 shadow-2xl">
              <div class="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 class="text-lg font-bold text-white">
                  {{ editingLeadId() ? 'Edit Lead Information' : 'Record New Walk-in Lead' }}
                </h3>
                <button (click)="isLeadModalOpen.set(false)" class="text-slate-400 hover:text-white">✕</button>
              </div>

              <div class="space-y-3.5 text-xs sm:text-sm">
                <div>
                  <label class="block font-semibold text-slate-300 mb-1">Student Full Name *</label>
                  <input type="text" [(ngModel)]="leadForm.name" class="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white" />
                </div>
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block font-semibold text-slate-300 mb-1">Phone / WhatsApp *</label>
                    <input type="text" [(ngModel)]="leadForm.phone" class="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white" />
                  </div>
                  <div>
                    <label class="block font-semibold text-slate-300 mb-1">Email Address</label>
                    <input type="email" [(ngModel)]="leadForm.email" class="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white" />
                  </div>
                </div>
                <div>
                  <label class="block font-semibold text-slate-300 mb-1">Program of Interest</label>
                  <select [(ngModel)]="leadForm.program" class="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white">
                    @for (course of academyService.courses(); track course.id) {
                      <option [value]="course.title">{{ course.title }}</option>
                    }
                  </select>
                </div>
                <div>
                  <label class="block font-semibold text-slate-300 mb-1">Lead Status</label>
                  <select [(ngModel)]="leadForm.status" class="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white">
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Enrolled">Enrolled</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <div>
                  <label class="block font-semibold text-slate-300 mb-1">Notes / Requirement</label>
                  <textarea rows="2" [(ngModel)]="leadForm.notes" class="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white"></textarea>
                </div>
              </div>

              <div class="pt-3 border-t border-slate-800 flex justify-end gap-3">
                <button (click)="isLeadModalOpen.set(false)" class="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold">Cancel</button>
                <button (click)="saveLeadModal()" class="px-5 py-2 rounded-lg bg-brand-blue text-white text-xs font-bold shadow-md shadow-blue-500/20">Save Lead</button>
              </div>
            </div>
          </div>
        }

        <!-- ============================================== -->
        <!-- MODAL: ADD / EDIT COURSE MODAL                 -->
        <!-- ============================================== -->
        @if (isCourseModalOpen()) {
          <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div class="bg-slate-950 border border-slate-800 rounded-2xl w-full max-w-xl p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div class="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 class="text-lg font-bold text-white">
                  {{ editingCourseId() ? 'Edit Course Track' : 'Create New Course Track' }}
                </h3>
                <button (click)="isCourseModalOpen.set(false)" class="text-slate-400 hover:text-white">✕</button>
              </div>

              <div class="space-y-3 text-xs sm:text-sm">
                <div>
                  <label class="block font-semibold text-slate-300 mb-1">Course Title *</label>
                  <input type="text" [(ngModel)]="courseForm.title" class="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white" />
                </div>
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block font-semibold text-slate-300 mb-1">Category & Subtitle *</label>
                    <input type="text" [(ngModel)]="courseForm.category" class="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white" />
                  </div>
                  <div>
                    <label class="block font-semibold text-slate-300 mb-1">Badge Tag</label>
                    <input type="text" [(ngModel)]="courseForm.badge" class="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white" />
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block font-semibold text-slate-300 mb-1">Metric Highlight (e.g. ₹10L+ / #1)</label>
                    <input type="text" [(ngModel)]="courseForm.metric" class="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white" />
                  </div>
                  <div>
                    <label class="block font-semibold text-slate-300 mb-1">Metric Label</label>
                    <input type="text" [(ngModel)]="courseForm.metricLabel" class="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white" />
                  </div>
                </div>
                <div>
                  <label class="block font-semibold text-slate-300 mb-1">Description</label>
                  <textarea rows="3" [(ngModel)]="courseForm.desc" class="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white"></textarea>
                </div>
                <div>
                  <label class="block font-semibold text-slate-300 mb-1">Icon Emoji (e.g. 📊, 🚀, 🤖)</label>
                  <input type="text" [(ngModel)]="courseForm.icon" class="w-24 p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-center text-lg" />
                </div>
                <div>
                  <label class="block font-semibold text-slate-300 mb-1">Key Deliverables (Comma-separated)</label>
                  <input type="text" [(ngModel)]="courseDeliverablesString" class="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white" />
                </div>
              </div>

              <div class="pt-3 border-t border-slate-800 flex justify-end gap-3">
                <button (click)="isCourseModalOpen.set(false)" class="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold">Cancel</button>
                <button (click)="saveCourseModal()" class="px-5 py-2 rounded-lg bg-brand-blue text-white text-xs font-bold shadow-md shadow-blue-500/20">Save Course</button>
              </div>
            </div>
          </div>
        }

      }

    </div>
  `
})
export class AdminPanelComponent {
  academyService = inject(AcademyDataService);

  // Authentication Signals & Form
  loginEmail = '';
  loginPassword = '';
  showPassword = signal(false);
  loginError = signal('');

  // Dashboard Tabs: 'leads' | 'courses' | 'content' | 'seo'
  activeTab = signal<'leads' | 'courses' | 'content' | 'seo'>('leads');
  toastMessage = signal('');

  // Leads Signals & Filter
  searchQuery = '';
  selectedStatusFilter = signal<string>('All');
  isLeadModalOpen = signal(false);
  editingLeadId = signal<string | null>(null);
  leadForm = {
    name: '',
    phone: '',
    email: '',
    program: '',
    status: 'New' as Lead['status'],
    notes: ''
  };

  // Courses Signals & Modals
  isCourseModalOpen = signal(false);
  editingCourseId = signal<string | null>(null);
  courseDeliverablesString = '';
  courseForm: Omit<ModuleItem, 'id'> = {
    title: '',
    category: '',
    badge: 'Specialized',
    metric: '',
    metricLabel: '',
    desc: '',
    icon: '🚀',
    gradient: 'from-blue-950/70 via-indigo-950/80 to-slate-950',
    iconBg: 'bg-blue-500/10 text-blue-400',
    deliverables: []
  };

  // Site Content Form
  contentForm: SiteContent = { ...this.academyService.siteContent() };

  // SEO Form
  seoForm: SeoConfig = { ...this.academyService.seoConfig() };

  // Computed metrics
  newLeadsCount = computed(() => {
    return this.academyService.leads().filter(l => l.status === 'New').length;
  });

  enrolledCount = computed(() => {
    return this.academyService.leads().filter(l => l.status === 'Enrolled').length;
  });

  filteredLeads = computed(() => {
    const list = this.academyService.leads();
    const query = this.searchQuery.toLowerCase().trim();
    const status = this.selectedStatusFilter();

    return list.filter(lead => {
      const matchQuery = !query || 
        lead.name.toLowerCase().includes(query) ||
        lead.phone.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        lead.program.toLowerCase().includes(query) ||
        (lead.notes && lead.notes.toLowerCase().includes(query));

      const matchStatus = status === 'All' || lead.status === status;
      return matchQuery && matchStatus;
    });
  });

  constructor() {
    this.refreshForms();
    if (typeof window !== 'undefined') {
      const hash = window.location.hash || '';
      if (hash.includes('seo')) this.activeTab.set('seo');
      else if (hash.includes('content')) this.activeTab.set('content');
      else if (hash.includes('courses')) this.activeTab.set('courses');
    }
  }

  private refreshForms(): void {
    this.contentForm = { ...this.academyService.siteContent() };
    this.seoForm = { ...this.academyService.seoConfig() };
  }

  // --- Auth Handlers ---

  fillDemoCredentials(): void {
    this.loginEmail = 'admin@avirbhav.com';
    this.loginPassword = 'admin123';
    this.loginError.set('');
  }

  handleLogin(): void {
    if (!this.loginEmail || !this.loginPassword) {
      this.loginError.set('Please enter both Email and Password.');
      return;
    }

    const success = this.academyService.login(this.loginEmail, this.loginPassword);
    if (success) {
      this.loginError.set('');
      this.refreshForms();
      this.showToast('Welcome back, Admin! Session authenticated.');
    } else {
      this.loginError.set('Invalid credentials. Use admin@avirbhav.com / admin123.');
    }
  }

  handleLogout(): void {
    this.academyService.logout();
    this.loginEmail = '';
    this.loginPassword = '';
    this.showToast('Logged out successfully.');
  }

  navigateToLiveSite(): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('app-navigate', { detail: { path: '/' } }));
    }
  }

  // --- Leads CRUD Handlers ---

  openAddLeadModal(): void {
    this.editingLeadId.set(null);
    this.leadForm = {
      name: '',
      phone: '',
      email: '',
      program: this.academyService.courses()[0]?.title || 'Digital Marketing 150 Days',
      status: 'New',
      notes: ''
    };
    this.isLeadModalOpen.set(true);
  }

  openEditLeadModal(lead: Lead): void {
    this.editingLeadId.set(lead.id);
    this.leadForm = {
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      program: lead.program,
      status: lead.status,
      notes: lead.notes || ''
    };
    this.isLeadModalOpen.set(true);
  }

  saveLeadModal(): void {
    if (!this.leadForm.name.trim() || !this.leadForm.phone.trim()) {
      alert('Please enter student name and phone number.');
      return;
    }

    const leadId = this.editingLeadId();
    if (leadId) {
      this.academyService.updateLead(leadId, {
        name: this.leadForm.name,
        phone: this.leadForm.phone,
        email: this.leadForm.email,
        program: this.leadForm.program,
        status: this.leadForm.status,
        notes: this.leadForm.notes
      });
      this.showToast(`Updated details for ${this.leadForm.name}`);
    } else {
      this.academyService.addLead({
        name: this.leadForm.name,
        phone: this.leadForm.phone,
        email: this.leadForm.email,
        program: this.leadForm.program,
        source: 'Admin Walk-in Entry',
        notes: this.leadForm.notes
      });
      this.showToast(`New lead recorded: ${this.leadForm.name}`);
    }

    this.isLeadModalOpen.set(false);
  }

  changeLeadStatus(id: string, status: Lead['status']): void {
    this.academyService.updateLeadStatus(id, status);
    this.showToast(`Lead status updated to ${status}`);
  }

  deleteLead(id: string): void {
    if (confirm('Are you sure you want to delete this lead?')) {
      this.academyService.deleteLead(id);
      this.showToast('Lead deleted successfully.');
    }
  }

  // --- Courses CRUD Handlers ---

  openAddCourseModal(): void {
    this.editingCourseId.set(null);
    this.courseDeliverablesString = 'Practical Live Projects, Case Study Audit, Agency Framework';
    this.courseForm = {
      title: '',
      category: 'Specialized Track • Growth',
      badge: 'New Track',
      metric: '100%',
      metricLabel: 'Hands-on Execution',
      desc: '',
      icon: '🚀',
      gradient: 'from-blue-950/70 via-indigo-950/80 to-slate-950',
      iconBg: 'bg-blue-500/10 text-blue-400',
      deliverables: []
    };
    this.isCourseModalOpen.set(true);
  }

  openEditCourseModal(course: ModuleItem): void {
    this.editingCourseId.set(course.id);
    this.courseDeliverablesString = course.deliverables.join(', ');
    this.courseForm = {
      title: course.title,
      category: course.category,
      badge: course.badge,
      metric: course.metric,
      metricLabel: course.metricLabel,
      desc: course.desc,
      icon: course.icon,
      gradient: course.gradient,
      iconBg: course.iconBg,
      deliverables: [...course.deliverables]
    };
    this.isCourseModalOpen.set(true);
  }

  saveCourseModal(): void {
    if (!this.courseForm.title.trim() || !this.courseForm.category.trim()) {
      alert('Please fill in course title and category.');
      return;
    }

    const delivs = this.courseDeliverablesString
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const payload = {
      ...this.courseForm,
      deliverables: delivs.length > 0 ? delivs : ['Practical Training', 'Portfolio Case Studies']
    };

    const courseId = this.editingCourseId();
    if (courseId) {
      this.academyService.updateCourse(courseId, payload);
      this.showToast(`Updated course: ${payload.title}`);
    } else {
      this.academyService.addCourse(payload);
      this.showToast(`New course track added: ${payload.title}`);
    }

    this.isCourseModalOpen.set(false);
  }

  deleteCourse(id: string): void {
    if (confirm('Are you sure you want to remove this course track?')) {
      this.academyService.deleteCourse(id);
      this.showToast('Course removed from live curriculum.');
    }
  }

  // --- Site Content & SEO Handlers ---

  saveSiteContent(): void {
    this.academyService.updateSiteContent(this.contentForm);
    this.showToast('Website content & contact info updated successfully!');
  }

  saveSeoConfig(): void {
    this.academyService.updateSeoConfig(this.seoForm);
    this.showToast('SEO & Meta tags applied live to website <head>!');
  }

  exportAllToExcel(): void {
    this.academyService.exportLeadsToExcel(this.filteredLeads());
  }

  showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => {
      if (this.toastMessage() === msg) {
        this.toastMessage.set('');
      }
    }, 3500);
  }

  formatDate(isoString: string): string {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoString;
    }
  }

  getWhatsAppLink(lead: Lead): string {
    const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
    const phoneWithCountry = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const msg = encodeURIComponent(`Hi ${lead.name}, this is Deekshith from Avirbhav Digital Academy regarding your enquiry for "${lead.program}". Are you free for a quick strategy call?`);
    return `https://wa.me/${phoneWithCountry}?text=${msg}`;
  }
}
