import {Component, Input, OnInit} from '@angular/core';
import {TokenService} from '../token.service';
import {AuthGuard} from '../auth-guard';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() pageTitle!: string;
  @Input() logoSrc!: string;

  isLoggedIn: boolean = false;

  constructor(private tokenService: TokenService, private router: Router, private authGuard: AuthGuard) {
    this.isLoggedIn = localStorage.getItem('permissions') != null;
    this.authGuard.ok = this.isLoggedIn;
  } // Inject the service

  ngOnInit() {
    // Listen to router events
     this.router.events.subscribe(event => {
       if (event instanceof NavigationEnd) {
         this.isAuthenticated();
       }
     });
  }

  logout() {
    localStorage.removeItem('permissions');
    localStorage.removeItem('auth_token');
    this.isLoggedIn = false;
    this.authGuard.ok = false;
    this.router.navigate(['/welcome']);
  }

  isPermission(permission : string) {
    let item = localStorage.getItem("permissions");
    return item != null && item.includes(permission);
  }

  isAuthenticated() {
    this.isLoggedIn = this.authGuard.ok;

    // this.tokenService.isUserAuthenticated().then(isAuthenticated => {
    //   if (! isAuthenticated) {
    //     this.isLoggedIn = false;
    //   } else {
    //     this.isLoggedIn = true;
    //   }
    // });
  }
}
