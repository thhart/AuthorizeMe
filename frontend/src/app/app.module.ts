import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ButtonsComponent} from './buttons/buttons.component';
import {HeaderComponent} from './header/header.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {WelcomeContentComponent} from './welcome-content/welcome-content.component';
import {MessageContentComponent} from './message-content/message-content.component';

import {TokenService} from './token.service';
import {RegisterFormComponent} from './register-form/register-form.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './token.interceptor';
import {ErrorDialogComponent} from './error-dialog/error-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import {HttpErrorInterceptor} from './http-error-interceptor.service';
import {MatIconModule} from "@angular/material/icon";
import {UserListComponent} from './user-list/user-list.component';
import {RestService} from "./rest.service";
import {UserNewComponent} from './user-new/user-new.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {RoleListComponent} from './role-list/role-list.component';
import {MatButtonModule} from '@angular/material/button';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { StatusBarComponent } from './status-bar/status-bar.component';

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
        UserListComponent,
        UserNewComponent,
        RoleListComponent,
        StatusBarComponent
    ],
    imports: [
        DragDropModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        HttpClientModule,
        MatIconModule
    ],
    providers: [TokenService, RestService,
        {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},

        // {provide: ErrorHandler, useClass: ErrorHandlerService},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
    }
}
