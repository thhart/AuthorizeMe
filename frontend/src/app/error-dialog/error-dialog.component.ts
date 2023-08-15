import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent {
  public data: { errorMessage: string };
  public message: string;

  ngOnInit(): void {
    this.cdr.detectChanges();
  }

  constructor(@Inject(MAT_DIALOG_DATA) data: { errorMessage: string }, private cdr : ChangeDetectorRef) {
    this.data = data;
    this.message = data.errorMessage;
    this.cdr.markForCheck();
  }
}
