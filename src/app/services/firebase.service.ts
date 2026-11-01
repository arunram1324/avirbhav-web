import { Injectable, signal } from '@angular/core';
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { 
  getFirestore, 
  Firestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  addDoc, 
  deleteDoc, 
  updateDoc, 
  onSnapshot, 
  serverTimestamp, 
  query, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { 
  getStorage, 
  FirebaseStorage, 
  ref, 
  uploadBytesResumable, 
  getDownloadURL,
  deleteObject 
} from 'firebase/storage';
import { getAuth, signInAnonymously, Auth } from 'firebase/auth';
import { environment } from '../../environments/environment';

export interface InquiryData {
  id: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  program?: string;
  source?: string;
  status: 'New' | 'Contacted' | 'Enrolled' | 'Closed';
  notes?: string;
  createdAt?: string | Date;
}

export interface UploadProgress {
  progress: number;
  downloadUrl?: string;
  storagePath?: string;
  isUploading: boolean;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app: FirebaseApp | null = null;
  private db: Firestore | null = null;
  private storage: FirebaseStorage | null = null;
  private auth: Auth | null = null;

  // Status signals
  isFirebaseConfigured = signal<boolean>(false);
  connectionStatus = signal<'connected' | 'mock_fallback' | 'error'>('mock_fallback');

  constructor() {
    this.initFirebase();
  }

  private initFirebase(): void {
    try {
      const config = environment.firebase;
      const isPlaceholder = !config.apiKey || config.apiKey.includes('YOUR_API_KEY');

      if (!isPlaceholder && typeof window !== 'undefined') {
        if (!getApps().length) {
          this.app = initializeApp(config);
        } else {
          this.app = getApps()[0];
        }
        this.db = getFirestore(this.app);
        this.storage = getStorage(this.app);

        try {
          this.auth = getAuth(this.app);
          signInAnonymously(this.auth).catch((authErr) => {
            console.info('[FirebaseService] Auth note (can be enabled in Firebase console):', authErr?.message || authErr);
          });
        } catch (e) {
          console.info('[FirebaseService] Auth init skipped');
        }

        this.isFirebaseConfigured.set(true);
        this.connectionStatus.set('connected');
        console.log('[FirebaseService] Initialized with Cloud Firestore & Storage.');
      } else {
        this.isFirebaseConfigured.set(false);
        this.connectionStatus.set('mock_fallback');
        console.info('[FirebaseService] Running in fallback mode. Replace environment.firebase keys to enable live cloud sync.');
      }
    } catch (err) {
      console.warn('[FirebaseService] Could not connect to Firebase, using local fallback:', err);
      this.connectionStatus.set('error');
    }
  }

  // ==========================================
  // 1. WEBSITE CONTENT COLLECTION
  // ==========================================

  /**
   * Fetch content document from 'website_content' collection
   * (e.g. 'home', 'about', 'career', 'site_settings')
   */
  async getWebsiteContent<T>(docId: string): Promise<T | null> {
    if (!this.db || !this.isFirebaseConfigured()) {
      return null;
    }
    try {
      const docRef = doc(this.db, 'website_content', docId);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return snapshot.data() as T;
      }
      return null;
    } catch (err) {
      console.error(`[FirebaseService] Error fetching website_content/${docId}:`, err);
      return null;
    }
  }

  /**
   * Save or update content document in 'website_content'
   * Automatically sanitizes payloads to strip undefined values.
   */
  async saveWebsiteContent(docId: string, data: any): Promise<void> {
    if (!this.db || !this.isFirebaseConfigured()) {
      console.log(`[FirebaseService (Local)] Simulated save to website_content/${docId}:`, data);
      return;
    }
    try {
      const sanitized = JSON.parse(JSON.stringify(data));
      const docRef = doc(this.db, 'website_content', docId);
      await setDoc(docRef, {
        ...sanitized,
        updatedAt: serverTimestamp()
      }, { merge: true });
      console.log(`[FirebaseService] Saved website_content/${docId} to Firestore.`);
    } catch (err) {
      console.error(`[FirebaseService] Error saving website_content/${docId}:`, err);
      throw err;
    }
  }

  /**
   * Real-time listener for 'website_content' document updates
   */
  listenToWebsiteContent<T>(docId: string, callback: (data: T | null) => void): () => void {
    if (!this.db || !this.isFirebaseConfigured()) {
      return () => {};
    }
    const docRef = doc(this.db, 'website_content', docId);
    return onSnapshot(docRef, (snap) => {
      if (snap.exists()) {
        callback(snap.data() as T);
      } else {
        callback(null);
      }
    }, (err) => {
      console.warn(`[FirebaseService] website_content/${docId} listener error:`, err);
    });
  }

  // ==========================================
  // 2. INQUIRIES COLLECTION
  // ==========================================

  /**
   * Push contact form enquiry or lead to 'inquiries' collection with serverTimestamp()
   */
  async submitInquiry(inquiry: Omit<InquiryData, 'id' | 'createdAt'>): Promise<string> {
    const payload = {
      name: inquiry.name.trim(),
      email: inquiry.email.trim(),
      phone: inquiry.phone.trim(),
      message: (inquiry.message || '').trim(),
      program: inquiry.program || 'Digital Marketing 150 Days',
      source: inquiry.source || 'Website Contact Form',
      status: inquiry.status || 'New',
      notes: inquiry.notes || '',
      createdAt: serverTimestamp()
    };

    if (!this.db || !this.isFirebaseConfigured()) {
      const mockId = 'inq_' + Date.now();
      console.log('[FirebaseService (Local Fallback)] Saved inquiry to local buffer:', { id: mockId, ...payload });
      return mockId;
    }

    try {
      const collRef = collection(this.db, 'inquiries');
      const docRef = await addDoc(collRef, payload);
      console.log('[FirebaseService] Successfully created inquiry in Firestore with ID:', docRef.id);
      return docRef.id;
    } catch (err) {
      console.error('[FirebaseService] Error submitting inquiry to Firestore:', err);
      throw err;
    }
  }

  /**
   * Real-time listener for all inquiries (for Admin Enquiry Manager)
   */
  listenToInquiries(callback: (inquiries: InquiryData[]) => void): () => void {
    if (!this.db || !this.isFirebaseConfigured()) {
      return () => {};
    }

    try {
      const collRef = collection(this.db, 'inquiries');
      const q = query(collRef, orderBy('createdAt', 'desc'));

      return onSnapshot(q, (snap) => {
        const list: InquiryData[] = [];
        snap.forEach((docSnap) => {
          const raw = docSnap.data();
          let createdDateStr = new Date().toISOString();
          if (raw['createdAt']) {
            if (raw['createdAt'] instanceof Timestamp) {
              createdDateStr = raw['createdAt'].toDate().toISOString();
            } else if (raw['createdAt'].seconds) {
              createdDateStr = new Date(raw['createdAt'].seconds * 1000).toISOString();
            } else {
              createdDateStr = raw['createdAt'].toString();
            }
          }

          list.push({
            id: docSnap.id,
            name: raw['name'] || '',
            email: raw['email'] || '',
            phone: raw['phone'] || '',
            message: raw['message'] || '',
            program: raw['program'] || '',
            source: raw['source'] || '',
            status: raw['status'] || 'New',
            notes: raw['notes'] || '',
            createdAt: createdDateStr
          });
        });
        callback(list);
      }, (err) => {
        console.warn('[FirebaseService] Error listening to inquiries:', err);
      });
    } catch (err) {
      console.error('[FirebaseService] Failed to bind inquiries listener:', err);
      return () => {};
    }
  }

  /**
   * Update inquiry status ('New', 'Contacted', 'Enrolled', 'Closed')
   */
  async updateInquiryStatus(id: string, status: InquiryData['status']): Promise<void> {
    if (!this.db || !this.isFirebaseConfigured()) {
      console.log(`[FirebaseService (Local)] Updated inquiry ${id} to ${status}`);
      return;
    }
    try {
      const docRef = doc(this.db, 'inquiries', id);
      await updateDoc(docRef, { status, updatedAt: serverTimestamp() });
    } catch (err) {
      console.error(`[FirebaseService] Error updating inquiry ${id}:`, err);
      throw err;
    }
  }

  /**
   * Delete inquiry from Firestore
   */
  async deleteInquiry(id: string): Promise<void> {
    if (!this.db || !this.isFirebaseConfigured()) {
      console.log(`[FirebaseService (Local)] Deleted inquiry ${id}`);
      return;
    }
    try {
      const docRef = doc(this.db, 'inquiries', id);
      await deleteDoc(docRef);
    } catch (err) {
      console.error(`[FirebaseService] Error deleting inquiry ${id}:`, err);
      throw err;
    }
  }

  // ==========================================
  // 3. FIREBASE STORAGE (IMAGE UPLOADS)
  // ==========================================

  /**
   * Upload an image file to Firebase Storage and retrieve the public download URL
   */
  uploadImage(
    file: File, 
    folder: string = 'website_content/images', 
    onProgress?: (progress: number) => void
  ): Promise<{ downloadUrl: string; storagePath: string }> {
    return new Promise((resolve, reject) => {
      // Fallback if Storage is not configured
      if (!this.storage || !this.isFirebaseConfigured()) {
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result as string;
          if (onProgress) onProgress(100);
          console.log('[FirebaseService (Local Preview)] Generated local data URL for image:', file.name);
          resolve({
            downloadUrl: dataUrl,
            storagePath: `${folder}/${Date.now()}_${file.name}`
          });
        };
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
        return;
      }

      try {
        const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const storagePath = `${folder}/${Date.now()}_${cleanName}`;
        const storageRef = ref(this.storage, storagePath);

        const uploadTask = uploadBytesResumable(storageRef, file, {
          contentType: file.type || 'image/jpeg'
        });

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (onProgress) onProgress(Math.round(progress));
          },
          (error) => {
            console.error('[FirebaseService] Storage upload failed:', error);
            reject(error);
          },
          async () => {
            try {
              const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
              console.log('[FirebaseService] Upload completed. Download URL:', downloadUrl);
              resolve({ downloadUrl, storagePath });
            } catch (err) {
              reject(err);
            }
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Delete uploaded asset from Firebase Storage
   */
  async deleteImage(storagePath: string): Promise<void> {
    if (!this.storage || !this.isFirebaseConfigured()) {
      console.log(`[FirebaseService (Local)] Simulated delete for ${storagePath}`);
      return;
    }
    try {
      const storageRef = ref(this.storage, storagePath);
      await deleteObject(storageRef);
      console.log(`[FirebaseService] Deleted asset at ${storagePath}`);
    } catch (err) {
      console.warn(`[FirebaseService] Failed to delete image at ${storagePath}:`, err);
    }
  }
}
