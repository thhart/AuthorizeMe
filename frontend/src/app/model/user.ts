import {Role} from './role';
import {Identified} from "./identified";

export class User extends Identified {
  login: string = "";
  email: string = "";
  password: string = "";
  roles: Role[] = [];  // Assuming you have a Role model in Angular as well
}
