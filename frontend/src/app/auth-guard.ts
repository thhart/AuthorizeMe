import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public ok: boolean = false;
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.tokenService.isUserAuthenticated().then(isAuthenticated => {
        // console.log(isAuthenticated);
        if( ! isAuthenticated) {
          this.ok = false;
          this.router.navigate(['/welcome']);
        }
      });
      this.ok = true;
      return true;
    } else {
      this.ok = false;
      this.router.navigate(['/welcome']);
      return false;
    }
  }
}
