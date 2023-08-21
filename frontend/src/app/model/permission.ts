import {HateoasResource, Resource} from "@lagoshny/ngx-hateoas-client";

@HateoasResource('permissions')
export class Permission extends Resource {
  // constructor(id: string, name: string, description: string) {
  //   super();
  //   this.id = id;
  //   this.name = name;
  //   this.description = description;
  // }

  id: string = "";
  name: string = ""; // e.g., "READ_POST", "EDIT_USER"
  description: string = "";
}
