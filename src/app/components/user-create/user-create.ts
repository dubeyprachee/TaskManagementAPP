import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/task.model';

@Component({
  selector: 'app-user-create',
  template: `
    <div style="padding: 20px;">
      <h2>Create User</h2>
      <app-user-form submitLabel="Create User" (formSubmit)="onCreate($event)" (cancel)="onCancel()"></app-user-form>
    </div>
  `
})
export class UserCreateComponent {
  constructor(private userService: UserService, private router: Router) {}

  onCreate(user: User) {
    this.userService.createUser(user).subscribe(() => this.router.navigate(['/users']));
  }

  onCancel() {
    this.router.navigate(['/users']);
  }
}
