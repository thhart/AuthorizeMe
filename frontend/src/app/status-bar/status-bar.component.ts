import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {StatusService} from '../status.service';

@Component({
    selector: 'app-status-bar',
    templateUrl: './status-bar.component.html',
    styleUrls: ['./status-bar.component.css'],
})
export class StatusBarComponent implements OnInit {
    messages: string[] = [];
    isCollapsed = true; // Initially collapsed
    time = Date.now();

    constructor(private statusService: StatusService, private changeDetector: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
        this.statusService.messages$.subscribe((messages) => {
            this.time = Date.now();
            for(let m of messages) {
                this.messages.push(m);
            }
            while (this.messages.length > 1) {
                this.messages.shift();
            }
            if (this.messages.length > 0 && this.isCollapsed) {
                this.toggleCollapse();
            }
            if (this.messages.length == 0 && !this.isCollapsed) {
                this.toggleCollapse();
            }
            if (this.messages.length > 0) {
                this.isCollapsed = false; // Uncollapse the status bar if there are messages
            }
            this.changeDetector.detectChanges();
            setTimeout(() => {
                if(!this.isCollapsed && Date.now() - this.time > 10000) {
                    this.isCollapsed = true;
                    this.changeDetector.detectChanges();
                }
            }, 10000);
        });
    }

    toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
    }
}
