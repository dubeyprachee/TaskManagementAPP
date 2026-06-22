import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskFormComponent } from '../task-form/task-form';

@Component({
  selector: 'app-task-update',
  standalone: true,
  imports: [CommonModule, TaskFormComponent],
  template: `
    <div style="padding: 20px;">
      <h2>Update Task</h2>
      <app-task-form *ngIf="task" [initialData]="task" submitLabel="Update Task" (formSubmit)="onUpdate($event)" (cancel)="onCancel()"></app-task-form>
    </div>
  `
})
export class TaskUpdateComponent implements OnInit {
  task?: Task;
  constructor(private route: ActivatedRoute, private router: Router, private taskService: TaskService) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) this.taskService.getTaskById(id).subscribe(task => this.task = task);
  }
  onUpdate(task: Task) { this.taskService.updateTask(task).subscribe(() => this.router.navigate(['/tasks'])); }
  onCancel() { this.router.navigate(['/tasks']); }
}
