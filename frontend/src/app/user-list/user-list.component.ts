import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import {User} from "../model/user";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = []; // Assuming you have a User model

  constructor(private restService: RestService, private router: Router) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void {
    this.restService.list("/users").then(response => {
      this.users = response.data._embedded.users;
    });
  }

  delete(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      let promise = this.restService.delete("/users", userId);
      promise.then(response => {
        this.list(); // Refresh the list after deletion
      }, error => {
        console.log(error);
      }).catch(error => {
        console.log(error);
      });
    }
  }
}
