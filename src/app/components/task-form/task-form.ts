import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './task-form.html',
  styles: [`
    form { display: flex; flex-direction: column; max-width: 500px; margin: 0 auto; }
    mat-form-field { margin-bottom: 15px; }
    .actions { display: flex; gap: 10px; justify-content: flex-end; }
  `]
})
export class TaskFormComponent implements OnInit {
  @Input() initialData?: Task;
  @Input() submitLabel: string = 'Submit';
  @Output() formSubmit = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<void>();
  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      id: [null],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      status: ['pending', [Validators.required]],
      priority: ['medium', [Validators.required]]
    });
  }

  ngOnInit(): void { if (this.initialData) this.taskForm.patchValue(this.initialData); }
  onSubmit() { if (this.taskForm.valid) this.formSubmit.emit(this.taskForm.value); }
  onCancel() { this.cancel.emit(); }
}
