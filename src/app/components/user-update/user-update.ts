import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/task.model';

@Component({
  selector: 'app-user-update',
  template: `
    <div style="padding: 20px;">
      <h2>Update User</h2>
      <app-user-form *ngIf="user" [initialData]="user" submitLabel="Update User" (formSubmit)="onUpdate($event)" (cancel)="onCancel()"></app-user-form>
    </div>
  `
})
export class UserUpdateComponent implements OnInit {
  user?: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.userService.getUserById(id).subscribe(user => this.user = user);
    }
  }

  onUpdate(user: User) {
    this.userService.updateUser(user).subscribe(() => this.router.navigate(['/users']));
  }

  onCancel() {
    this.router.navigate(['/users']);
  }
}
