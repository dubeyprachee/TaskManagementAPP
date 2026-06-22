import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskFormComponent } from '../task-form/task-form';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [TaskFormComponent],
  template: `
    <div style="padding: 20px;">
      <h2>Create New Task</h2>
      <app-task-form submitLabel="Create Task" (formSubmit)="onCreate($event)" (cancel)="onCancel()"></app-task-form>
    </div>
  `
})
export class TaskCreateComponent {
  constructor(private taskService: TaskService, private router: Router) {}
  onCreate(task: Task) { this.taskService.createTask(task).subscribe(() => this.router.navigate(['/tasks'])); }
  onCancel() { this.router.navigate(['/tasks']); }
}
