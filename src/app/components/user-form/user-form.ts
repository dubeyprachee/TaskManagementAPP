import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import type { User } from '../../models/task.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.html',
  styles: [`
    form { display: flex; flex-direction: column; max-width: 500px; margin: 0 auto; }
    mat-form-field { margin-bottom: 15px; }
    .actions { display: flex; gap: 10px; justify-content: flex-end; }
  `]
})
export class UserFormComponent implements OnInit {
  @Input() initialData?: User;
  @Input() submitLabel: string = 'Submit';
  @Output() formSubmit = new EventEmitter<User>();
  @Output() cancel = new EventEmitter<void>();
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      id: [null],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    if (this.initialData) {
      this.userForm.patchValue(this.initialData);
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.formSubmit.emit(this.userForm.value);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
