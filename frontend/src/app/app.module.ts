import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ButtonsComponent} from './buttons/buttons.component';
import {HeaderComponent} from './header/header.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {WelcomeContentComponent} from './welcome-content/welcome-content.component';
import {MessageContentComponent} from './message-content/message-content.component';

import {TokenService} from './token.service';
import {RegisterFormComponent} from './register-form/register-form.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './token.interceptor';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import { ErrorHandler } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';
import { HttpErrorInterceptor } from './http-error-interceptor.service';
import {MatIconModule} from "@angular/material/icon";
import { UserListComponent } from './user-list/user-list.component';
import {UserService} from "./user.service";

@NgModule({
  declarations: [
    AppComponent,
    ButtonsComponent,
    HeaderComponent,
    LoginFormComponent,
    WelcomeContentComponent,
    MessageContentComponent,
    RegisterFormComponent,
    ErrorDialogComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule
  ],
  providers: [TokenService, UserService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: ErrorHandlerService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
