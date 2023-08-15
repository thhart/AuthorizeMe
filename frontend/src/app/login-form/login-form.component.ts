import { Component } from '@angular/core';
import {TokenService} from "../token.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  })
export class LoginFormComponent {
  firstName: string = "";
  lastName: string = "";
  login: string = "";
  password: string = "";
  email: string = "";

  constructor(private router: Router, private tokenService: TokenService) {
  }

  onSubmitLogin(input: LoginFormComponent): void {
    this.tokenService.request(
      "POST",
      "/login",
      {
        login: input.login,
        password: input.password
      }).then(
      response => {
        this.tokenService.setAuthToken(response.data.token);
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('permissions', response.data.permissions)
        this.router.navigate(['/message']); // Navigate to a protected route after login
      }).catch(
      error => {
        this.tokenService.setAuthToken(null);
        localStorage.removeItem('auth_token');
        this.router.navigate(['/welcome']); // Navigate to welcome
      }
    );
  }
}
