import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {
    userForm: FormGroup = new FormGroup({});

    constructor(private fb: FormBuilder, private restService: RestService, private router: Router) { }

    ngOnInit(): void {
        this.userForm = this.fb.group({
            login: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
            email: ['', [Validators.required, Validators.email, Validators.maxLength(128)]],
            password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(128)]]
            // Add other fields and their validators as needed
        });
    }

    onAddUser(): void {
        if (this.userForm.valid) {
            const newUser = this.userForm.value;
            this.restService.add("/users", newUser).then(() => {
              this.router.navigate(['/users']);
                // Handle successful addition, e.g., navigate to user list or show a success message
            }).catch(error => {
                // Handle error, e.g., show an error message
            });
        } else {
           console.log(this.userForm.errors);
        }
    }
}
