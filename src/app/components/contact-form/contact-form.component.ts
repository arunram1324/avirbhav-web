import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { AcademyDataService } from '../../services/academy-data.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  private fb = inject(FormBuilder);
  private firebaseService = inject(FirebaseService);
  private academyService = inject(AcademyDataService);

  @Input() initialProgram = 'Digital Marketing 150 Days';
  @Input() sourceTag = 'Website Contact Form';
  @Output() formSubmitted = new EventEmitter<void>();

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+ \-]{10,15}$/)]],
    program: ['Digital Marketing 150 Days', Validators.required],
    message: ['', [Validators.required, Validators.minLength(5)]]
  });

  isSubmitting = signal<boolean>(false);
  isSuccess = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  programs: string[] = [
    'Digital Marketing 150 Days',
    'Meta & Google Performance Ads Lead',
    'SEO & Organic Growth Blueprint',
    'AI Marketing & Automation Mastery',
    'Creative & Reels Strategy Track',
    'Corporate Agency Training'
  ];

  ngOnInit(): void {
    if (this.initialProgram) {
      this.contactForm.patchValue({ program: this.initialProgram });
    }
  }

  // Field validation helpers
  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) return 'This field is required';
    if (field.errors['email']) return 'Please enter a valid email address';
    if (field.errors['pattern']) return 'Please enter a valid 10-digit phone number';
    if (field.errors['minlength']) {
      return `Minimum ${field.errors['minlength'].requiredLength} characters required`;
    }
    return 'Invalid input';
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set(null);

    const formVal = this.contactForm.value;

    try {
      // 1. Submit to Firebase Firestore 'inquiries' collection
      await this.firebaseService.submitInquiry({
        name: formVal.name,
        email: formVal.email,
        phone: formVal.phone,
        message: formVal.message,
        program: formVal.program,
        source: this.sourceTag,
        status: 'New',
        notes: `Direct Enquiry from Contact Form: "${formVal.message}"`
      });

      // 2. Also register in local academy data buffer
      this.academyService.addLead({
        name: formVal.name,
        email: formVal.email,
        phone: formVal.phone,
        program: formVal.program,
        source: this.sourceTag,
        notes: formVal.message
      });

      this.isSubmitting.set(false);
      this.isSuccess.set(true);
      this.contactForm.reset({
        program: this.initialProgram
      });
      this.formSubmitted.emit();
    } catch (err: any) {
      console.error('[ContactFormComponent] Submission failed:', err);
      // Fallback: still store in academy data service so enquiry is never lost
      this.academyService.addLead({
        name: formVal.name,
        email: formVal.email,
        phone: formVal.phone,
        program: formVal.program,
        source: this.sourceTag,
        notes: formVal.message
      });

      this.isSubmitting.set(false);
      this.isSuccess.set(true);
      this.contactForm.reset({
        program: this.initialProgram
      });
      this.formSubmitted.emit();
    }
  }

  resetSuccess(): void {
    this.isSuccess.set(false);
  }
}
