import {Component} from '@angular/core';
import {RestService} from "../rest.service";
import {Role} from "../model/role";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Permission} from "../model/permission";
import {CdkDragDrop, CdkDragEnd} from "@angular/cdk/drag-drop";
import {UtilityService} from "../utility.service";
import {StatusService} from "../status.service";
import {ChangeDetectorRef} from '@angular/core';
import {SyncService} from "../sync.service";

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
    protected readonly onsubmit = onsubmit;

    constructor(private fb: FormBuilder,
                private restService: RestService,
                private utilityService: UtilityService,
                private statusService: StatusService,
                private syncService: SyncService,
                private changeDetector: ChangeDetectorRef
    ) {
        this.roleForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(128)]],
        });
        this.permissionForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(128)]],
        });
        syncService.events$.subscribe(value => {
           this.list();
        });
    }


    get targets(): string[] {
        // Create an array of the ids of the target lists
        return this.roles.map(list => list.id);
    }

    ngOnInit(): void {
        this.list();
    }

    list(): void {
        this.statusService.addLog("Roles are loaded.");
        this.restService.list("/roles").then(response => {
            this.utilityService.syncArrays(this.roles, response.data._embedded.roles);
            this.changeDetector.detectChanges();
        });
        this.restService.list("/permissions").then(response => {
            this.utilityService.syncArrays(this.permissions, response.data._embedded.permissions);
            this.changeDetector.detectChanges();
        });
    }

    deleteRole(id: string): void {
        if (confirm('Are you sure you want to delete this role?')) {
            let promise = this.restService.delete("/roles", id);
            promise.then(response => {
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
            let promise = this.restService.delete("/permissions", id);
            promise.then(response => {
                let deleted = this.permissions.filter(value => {
                    return value.id == id;
                });
                for (let entry of deleted) {
                    this.permissions.splice(this.permissions.indexOf(entry), 1);// some logic
                }
            }, error => {
                console.log(error);
            }).catch(error => {
                console.log(error);
            });

            // this.resourceService.deleteResourceById(Permission, id).subscribe((deletedResource: Permission) => {
            //     let deleted = this.permissions.filter(value => {
            //       return value.id == id;
            //     });
            //     for (let entry of deleted) {
            //       this.permissions.splice(this.permissions.indexOf(entry), 1);// some logic
            //     }
            //   }
            // );
        }
    }

    onAddRole(): void {
        if (this.roleForm.valid) {
            const role = this.roleForm.value;
            this.restService.add("roles", role).then(value => {
                this.roles.push(value.data);
            });
        }
    }

    onAddPermission(): void {
        if (this.permissionForm.valid) {
            const permission = this.permissionForm.value;
            this.restService.add("/permissions", permission).then(value => {
                this.permissions.push(value.data);
            });
        }
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
            let contained = role.permissions.filter(value => {
                return value.id == event.item.data.id;
            });
            if (contained.length == 0) {
                role.permissions.push(event.item.data)
                this.restService.call("/api/roles/" + role.id + "/permissions", role.permissions).then(() => {
                });
            }
        }
        console.log("Dropped: ", event.container.id)
    }

    onDragOver(event: DragEvent, id: string) {
        console.log("Over: ", event)
    }

    onRemove(role: Role, permission: Permission) {
        role.permissions.splice(role.permissions.indexOf(permission), 1);// some logic
        this.restService.call("/api/roles/" + role.id + "/permissions", role.permissions).then(() => {
        });
    };
}
