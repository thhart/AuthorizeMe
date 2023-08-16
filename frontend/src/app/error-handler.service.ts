import {ErrorHandler, Injectable, NgZone} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ErrorDialogComponent} from './error-dialog/error-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

    constructor(private dialog: MatDialog, private zone: NgZone) {
    }

    handleError(error: any): void {
        this.zone.run(() =>
            this.dialog.open(ErrorDialogComponent, {
                data: {errorMessage: error.message || 'An unknown error occurred!'},
                restoreFocus: true,
                panelClass: 'custom-dialog-container',
                position: {
                    top: 'auto',
                    bottom: '0'
                }
            }));
    }
}
