export class Permission {
    constructor(id: string, name: string, description: string) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    id: string;
    name: string; // e.g., "READ_POST", "EDIT_USER"
    description: string;
}
