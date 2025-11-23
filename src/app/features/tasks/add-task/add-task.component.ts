import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from '../../../core/models/task.model';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-task.component.html'
})
export class AddTaskComponent {
    @Output() taskAdded = new EventEmitter<Partial<Task>>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      category: ['personal', Validators.required],
      dueDate: [null],
      priority: ['low', Validators.required],
      recurrence: ['none', Validators.required],
      startTime: [null],
      endTime: [null]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.taskAdded.emit(this.form.value);
      this.form.reset({
        category: 'personal',
        priority: 'low',
        recurrence: 'none'
      });
    }
  }
}