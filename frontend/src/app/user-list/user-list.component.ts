// user-list.component.ts

import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {User} from "../model/user";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = []; // Assuming you have a User model

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.list().subscribe(data => {
      this.users = data;
    });
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.delete(userId).subscribe(() => {
        this.loadUsers(); // Refresh the list after deletion
      });
    }
  }
}
