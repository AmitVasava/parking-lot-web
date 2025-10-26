import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  id: number;
  text: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private _toasts = new BehaviorSubject<ToastMessage[]>([]);
  toasts$ = this._toasts.asObservable();

  private counter = 0;

  show(message: string, type: ToastMessage['type'] = 'info') {
    const newToast: ToastMessage = {
      id: ++this.counter,
      text: message,
      type
    };

    const updatedToasts = [...this._toasts.value, newToast];
    this._toasts.next(updatedToasts);

    // Auto remove after 3 seconds
    setTimeout(() => this.dismiss(newToast.id), 3000);
  }

  dismiss(id: number) {
    const filtered = this._toasts.value.filter(t => t.id !== id);
    this._toasts.next(filtered);
  }

  clearAll() {
    this._toasts.next([]);
  }
}
