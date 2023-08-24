import {Injectable} from '@angular/core';
import {StatusService} from "./status.service";
import {Observable, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class SyncService {
    private eventSubject: Subject<string> = new Subject<string>();
    public events$: Observable<string> = this.eventSubject.asObservable();

    private eventSource: EventSource;
    updated = 0;

    constructor(statusService: StatusService) {
        this.eventSource = new EventSource('http://localhost:8080/events');
        this.eventSource.onmessage = (event) => {
            console.log(event.data);
            if (this.updated < event.data) {
                this.updated = event.data;
                this.eventSubject.next(event.data);
                statusService.addLog("Data updated: " + this.updated);
            }
        };

    }
}
