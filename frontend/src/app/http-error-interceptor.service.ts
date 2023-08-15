import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.dialog.open(ErrorDialogComponent, {
          data: { errorMessage: error.message }
        });
        return throwError(error);
      })
    );
  }
}
