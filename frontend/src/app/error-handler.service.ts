import { Injectable, ErrorHandler } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements ErrorHandler {

  constructor(private dialog: MatDialog) {}

  handleError(error: any): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { errorMessage: error.message || 'An unknown error occurred!' },
      panelClass: 'custom-dialog-container',
        position: {
          top: 'auto',
          bottom: '0'
        }
    });
  }
}
