import { Component } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Observable } from 'rxjs';
import { ToastMessage } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html'
})
export class ToastComponent {
  toasts$: Observable<ToastMessage[]> = this.notification.toasts$;

  constructor(private notification: NotificationService) {}

  dismiss(id: number) {
    this.notification.dismiss(id);
  }
}
