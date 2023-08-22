import {Component, OnInit} from '@angular/core';
import {RestService} from '../rest.service';
import {User} from "../model/user";
import {Router} from '@angular/router';
import {Role} from "../model/role";
import {CdkDragDrop, CdkDragEnd} from "@angular/cdk/drag-drop";

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
    users: User[] = [];
    roles: Array<Role> = new Array<Role>(); // Assuming you have a User model

    // displayedColumns: string[] = ['login', 'email', 'actions']; // Add other column names as needed

    constructor(private restService: RestService, private router: Router) {
    }

    ngOnInit(): void {
        this.list();
    }

    list(): void {
        this.restService.list("/users").then(response => {
            this.users.splice(0, this.users.length);
            for (let entry of response.data._embedded.users) {
                this.users.push(entry);
            }
        });
        this.restService.list("/roles").then(response => {
            this.roles.splice(0, this.roles.length);
            for (let entry of response.data._embedded.roles) {
                this.roles.push(entry);
            }
        });
    }

    get targets(): string[] {
      // Create an array of the ids of the target lists
      return this.users.map(list => list.id);
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

    onRemove(user: User, role: Role) {
        user.roles.splice(user.roles.indexOf(role), 1);// some logic
        this.restService.call("/api/users/" + user.id + "/roles", user.roles).then(() => {

        });
    }

    dragEnded(event: CdkDragEnd) {
      if (!event.source.dropContainer) {
        event.source._dragRef.reset();
      }
    }

    onDrop(event: CdkDragDrop<any, any>) {
      let dropped = this.users.filter(value => {
        return value.id == event.container.id;
      });
      for (let user of dropped) {
        let contained = user.roles.filter(value => {
          return value.id == event.item.data.id;
        });
        if(contained.length == 0) {
          user.roles.push(event.item.data)
          this.restService.call("/api/users/" + user.id + "/roles", user.roles).then(() => {
          });
        }
      }
      console.log("Dropped: ", event.container.id)
    }
}
