import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AcademyDataService, JobListing } from '../../services/academy-data.service';

@Component({
  selector: 'app-job-apply-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (isOpen) {
      <div class="fixed inset-0 z-50 overflow-y-auto">
        <!-- Backdrop -->
        <div 
          class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
          (click)="handleClose()">
        </div>

        <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 text-left transition-all sm:my-8 sm:w-full sm:max-w-lg p-6 sm:p-8 fade-in">
            
            <!-- Close button -->
            <button 
              type="button" 
              (click)="handleClose()"
              class="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-slate-800">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            @if (isSuccess()) {
              <!-- Success State -->
              <div class="text-center py-6 space-y-4">
                <div class="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-white">Application Dispatched!</h3>
                  <p class="text-xs text-slate-400 mt-2 max-w-sm mx-auto leading-relaxed">
                    Thank you for applying for <strong class="text-sky-400">{{ jobTitle }}</strong>. Our talent team will review your profile and reach out via phone or WhatsApp within 48 hours.
                  </p>
                </div>
                <div class="pt-4">
                  <button 
                    type="button" 
                    (click)="handleClose()"
                    class="w-full py-2.5 px-4 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-xs border border-sky-400/30 transition-colors cursor-pointer">
                    Back to Jobs Board
                  </button>
                </div>
              </div>
            } @else {
              <!-- Application Form -->
              <div class="space-y-5">
                <div>
                  <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-[11px] font-semibold uppercase tracking-wider mb-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                    <span>Direct Application</span>
                  </div>
                  <h3 class="text-lg sm:text-xl font-bold text-white tracking-tight">Apply for Position</h3>
                  <p class="text-xs text-slate-400 mt-1">
                    Role: <span class="text-slate-200 font-semibold">{{ jobTitle || 'General Application' }}</span>
                  </p>
                </div>

                @if (errorMessage()) {
                  <div class="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                    <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{{ errorMessage() }}</span>
                  </div>
                }

                <form (ngSubmit)="onSubmit()" class="space-y-4">
                  <div>
                    <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Full Name <span class="text-rose-400">*</span>
                    </label>
                    <input 
                      type="text" 
                      [(ngModel)]="formData.name" 
                      name="name" 
                      required
                      placeholder="e.g. Arun Kumar"
                      class="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-sky-500 transition-colors" />
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        WhatsApp / Phone <span class="text-rose-400">*</span>
                      </label>
                      <input 
                        type="tel" 
                        [(ngModel)]="formData.phone" 
                        name="phone" 
                        required
                        placeholder="+91 98765 43210"
                        class="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-sky-500 transition-colors" />
                    </div>
                    <div>
                      <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Work Email <span class="text-rose-400">*</span>
                      </label>
                      <input 
                        type="email" 
                        [(ngModel)]="formData.email" 
                        name="email" 
                        required
                        placeholder="you@domain.com"
                        class="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-sky-500 transition-colors" />
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Portfolio / LinkedIn URL
                      </label>
                      <input 
                        type="url" 
                        [(ngModel)]="formData.portfolioUrl" 
                        name="portfolioUrl" 
                        placeholder="https://linkedin.com/in/..."
                        class="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-sky-500 transition-colors" />
                    </div>
                    <div>
                      <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                        Experience Level
                      </label>
                      <select 
                        [(ngModel)]="formData.experience" 
                        name="experience"
                        class="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-sky-500 transition-colors">
                        <option value="Fresher / Graduate">Fresher / Graduate</option>
                        <option value="1 – 2 Years">1 – 2 Years</option>
                        <option value="2 – 4 Years">2 – 4 Years</option>
                        <option value="5+ Years">5+ Years</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                      Why are you a great fit for Avirbhav? (Short Pitch)
                    </label>
                    <textarea 
                      [(ngModel)]="formData.note" 
                      name="note" 
                      rows="3"
                      placeholder="Mention past ROAS metrics, client campaigns, or your hunger to learn..."
                      class="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-sky-500 transition-colors resize-none"></textarea>
                  </div>

                  <div class="pt-2">
                    <button 
                      type="submit" 
                      [disabled]="isSubmitting()"
                      class="w-full py-2.5 px-4 rounded-lg bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-slate-950 font-semibold text-xs border border-sky-400/30 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                      @if (isSubmitting()) {
                        <svg class="animate-spin h-4 w-4 text-slate-950" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                        <span>Submitting Application...</span>
                      } @else {
                        <span>Submit Application ↗</span>
                      }
                    </button>
                    <p class="text-[10px] text-slate-500 text-center mt-2">
                      Your details are stored securely in Avirbhav's Talent Pipeline.
                    </p>
                  </div>
                </form>
              </div>
            }

          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .fade-in {
      animation: fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.97); }
      to { opacity: 1; transform: scale(1); }
    }
  `]
})
export class JobApplyModalComponent {
  academyService = inject(AcademyDataService);

  @Input() isOpen = false;
  @Input() jobId = '';
  @Input() jobTitle = '';
  @Output() close = new EventEmitter<void>();

  isSubmitting = signal(false);
  isSuccess = signal(false);
  errorMessage = signal('');

  formData = {
    name: '',
    phone: '',
    email: '',
    portfolioUrl: '',
    experience: '1 – 2 Years',
    note: ''
  };

  handleClose(): void {
    this.isSuccess.set(false);
    this.errorMessage.set('');
    this.close.emit();
  }

  onSubmit(): void {
    if (!this.formData.name || !this.formData.phone || !this.formData.email) {
      this.errorMessage.set('Please fill in your Name, Phone Number, and Email.');
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    setTimeout(() => {
      const res = this.academyService.applyForJob({
        jobId: this.jobId || 'general',
        jobTitle: this.jobTitle || 'General Application',
        name: this.formData.name,
        phone: this.formData.phone,
        email: this.formData.email,
        portfolioUrl: this.formData.portfolioUrl,
        experience: this.formData.experience,
        note: this.formData.note
      });

      this.isSubmitting.set(false);
      if (res.success) {
        this.isSuccess.set(true);
        this.formData = {
          name: '',
          phone: '',
          email: '',
          portfolioUrl: '',
          experience: '1 – 2 Years',
          note: ''
        };
      } else {
        this.errorMessage.set(res.message);
      }
    }, 400);
  }
}
