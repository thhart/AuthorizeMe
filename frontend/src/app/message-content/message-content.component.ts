import { Component } from '@angular/core';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-message-content',
  templateUrl: './message-content.component.html',
  styleUrls: ['./message-content.component.css']
})
export class MessageContentComponent {
  data: string[] = [];

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    this.tokenService.request(
        "GET",
        "/messages",
        {}).then(
        (response) => {
            this.data = response.data;
        });
  }

}
