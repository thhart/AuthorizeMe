import {Permission} from './permission';
import {Identified} from "./identified";

export class Role extends Identified {
  name: string = ""; // e.g., "USER", "ADMIN"
  permissions: Permission[] = []; // Assuming you have a Permission model defined
}

