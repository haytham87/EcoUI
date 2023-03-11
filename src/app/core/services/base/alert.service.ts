import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Message } from '../../models/message';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private toastrService: ToastrService) {}

  success(message: string) {
    this.toastrService. success(message);
  }

  error(message: string) {
    this.toastrService.error(message);
  }

  warning(message: string) {
    this.toastrService.warning(message);
  }

  message(message: Message) {
    if (message.type === 'Success') {
      this.toastrService.success(message.content);
    } else if (message.type === 'Error') {
      this.toastrService.error(message.content);
    } else if (message.type === 'Warning') {
      this.toastrService.warning(message.content);
    }
    if (message.log !== null) {
      console.log(message.log);
    }
  }
}
