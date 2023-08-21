import {Component} from '@angular/core';
import {RestService} from "../rest.service";
import {Router} from "@angular/router";
import {Role} from "../model/role";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HateoasResourceService, ResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {Permission} from "../model/permission";
import {CdkDragDrop, CdkDragEnd} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent {
  roles: Array<Role> = new Array<Role>(); // Assuming you have a User model
  permissions: Permission[] = []; // Assuming you have a User model
  roleForm: FormGroup;
  permissionForm: FormGroup;


  constructor(private fb: FormBuilder,
              private resourceService: HateoasResourceService,
              private restService: RestService, private router: Router) {
    this.roleForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(128)]],
    });
    this.permissionForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(128)]],
    });
  }

  ngOnInit(): void {
    this.list();
  }

  list(): void {
    this.resourceService.getPage(Role)
      .subscribe((collection: ResourceCollection<Role>) => {
        this.roles.splice(0, this.roles.length);
        for (let entry of collection.resources) {
          this.roles.push(entry);// some logic
        }
      });
    this.resourceService.getPage(Permission)
      .subscribe((collection: ResourceCollection<Permission>) => {
        this.permissions.splice(0, this.roles.length);
        for (let entry of collection.resources) {
          this.permissions.push(entry);// some logic
        }
      });
  }

  deleteRole(id: string): void {
    if (confirm('Are you sure you want to delete this role?')) {
      this.resourceService.deleteResourceById(Role, id).subscribe((deletedResource: Role) => {
          let deleted = this.roles.filter(value => {
            return value.id == id;
          });
          for (let entry of deleted) {
            this.roles.splice(this.roles.indexOf(entry), 1);// some logic
          }
        }
      );
    }
  }

  deletePermission(id: string): void {
    if (confirm('Are you sure you want to delete this permission?')) {
      this.resourceService.deleteResourceById(Permission, id).subscribe((deletedResource: Permission) => {
          let deleted = this.permissions.filter(value => {
            return value.id == id;
          });
          for (let entry of deleted) {
            this.permissions.splice(this.permissions.indexOf(entry), 1);// some logic
          }
        }
      );
    }
  }


  onAddRole(): void {
    if (this.roleForm.valid) {
      const role = this.roleForm.value;
      this.resourceService.createResource(Role, {body: role}).subscribe((createdResource: Role) => {
          this.roles.push(createdResource);
        }
      );
    }
  }

  onAddPermission(): void {
    if (this.permissionForm.valid) {
      const permission = this.permissionForm.value;
      this.resourceService.createResource(Permission, {body: permission}).subscribe((createdResource: Permission) => {
          this.permissions.push(createdResource);
        }
      );
    }
  }

  protected readonly onsubmit = onsubmit;

  get targets(): string[] {
    // Create an array of the ids of the target lists
    return this.roles.map(list => list.id);
  }

  dragEnded(event: CdkDragEnd) {
    if (!event.source.dropContainer) {
      event.source._dragRef.reset();
    }
  }

  onDrop(event: CdkDragDrop<any, any>) {
    let dropped = this.roles.filter(value => {
      return value.id == event.container.id;
    });
    for (let role of dropped) {
      role.permissions.push(event.item.data)
      this.restService.update("/roles", role.id, role).then(() => {
      });
      //
      // this.resourceService.updateResource(role).subscribe((createdResource: Role) => {
      //   console.log(createdResource);
      //   }
      // );
    }
    console.log("Dropped: ", event.container.id)
  }

  onDragOver(event: DragEvent, id: string) {
    console.log("Over: ", event)
  }
}
