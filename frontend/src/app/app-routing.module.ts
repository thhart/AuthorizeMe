import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth-guard';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' }, // default route
  { path: 'message', component: MessageContentComponent,  canActivate: [AuthGuard] },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'welcome', component: WelcomeContentComponent },
];

// Import your components
import { MessageContentComponent } from './message-content/message-content.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { WelcomeContentComponent } from './welcome-content/welcome-content.component';

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
