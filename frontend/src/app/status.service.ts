import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private messagesSubject = new BehaviorSubject<string[]>([]);
  messages$ = this.messagesSubject.asObservable();

  addLog(message: string) {
    this.addMessage(`${message}`);
  }

  addError(message: string) {
    this.addMessage(`Error: ${message}`);
  }

  private addMessage(message: string) {
    const messages = this.messagesSubject.value;
    this.clear();
    messages.push(message);
    this.messagesSubject.next(messages);
  }

  clear() {
    while(this.messagesSubject.value.length > 0) {
      this.messagesSubject.value.shift();
    }
  }
}
