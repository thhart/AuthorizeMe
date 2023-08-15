import {Component} from '@angular/core';
import {TokenService} from "../token.service";

@Component({
  selector: 'app-welcome-content',
  templateUrl: './welcome-content.component.html',
  styleUrls: ['./welcome-content.component.css']
})
export class WelcomeContentComponent {
  componentToShow: string = "welcome";

  constructor(private tokenService: TokenService) {
  }

  showComponent(componentToShow: string): void {
    this.componentToShow = componentToShow;
  }


  onRegister(input: any): void {
    this.tokenService.request(
      "POST",
      "/register",
      {
        firstName: input.firstName,
        lastName: input.lastName,
        login: input.login,
        password: input.password,
        email: input.email
      }).then(
      response => {
        this.tokenService.setAuthToken(response.data.token);
        this.componentToShow = "messages";
      }).catch(
      error => {
        this.tokenService.setAuthToken(null);
        this.componentToShow = "welcome";
      }
    );
  }

}
