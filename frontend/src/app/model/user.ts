import {Role} from './role';
import {HateoasResource, Resource} from "@lagoshny/ngx-hateoas-client";

@HateoasResource('users')
export class User extends Resource {
  constructor(id: string, login: string, email: string, password: string, roles: Role[]) {
    super();
    this.id = id;
    this.login = login;
    this.email = email;
    this.password = password;
    this.roles = roles;
  }

  id: string;
  login: string;
  email: string;
  password: string;
  roles: Role[];  // Assuming you have a Role model in Angular as well
}
