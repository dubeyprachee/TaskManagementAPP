import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { User, Task } from '../../models/task.model';

@Component({
  selector: 'app-assign-task-dialog',
  templateUrl: './assign-task-dialog.html',
  styles: [`
    .dialog-content { display: flex; flex-direction: column; min-width: 300px; }
    .actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }
  `]
})
export class AssignTaskDialogComponent implements OnInit {
  users: User[] = [];
  selectedUserId?: number;

  constructor(
    public dialogRef: MatDialogRef<AssignTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task },
    private userService: UserService
  ) {
    this.selectedUserId = data.task.assignedTo;
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  onConfirm(): void {
    this.dialogRef.close(this.selectedUserId);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
