import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent {
  public message: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: { errorMessage: string }, private cdr: ChangeDetectorRef) {
    this.message = data.errorMessage;
  }
}
