import {Identified} from "./identified";

export class Permission extends Identified {
  name: string = ""; // e.g., "READ_POST", "EDIT_USER"
  description: string = "";
}
