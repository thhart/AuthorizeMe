import {Permission} from './permission';

export class  Role {
  // constructor(id: string, name: string, permissions: Permission[]) {
  //   super();
  //   this.id = id;
  //   this.name = name;
  //   this.permissions = permissions;
  // }

  id: string = "";
  name: string = ""; // e.g., "USER", "ADMIN"
  permissions: Permission[] = []; // Assuming you have a Permission model defined
}

