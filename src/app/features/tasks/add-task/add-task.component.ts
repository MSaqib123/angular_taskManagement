import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
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

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      category: ['personal', Validators.required],
      dueDate: [null],
      priority: ['low', Validators.required],
      recurrence: ['none'], // will add conditional validator
      startTime: [null],
      endTime: [null]
    });

    // Add conditional validator for recurrence
    this.form.get('dueDate')?.valueChanges.subscribe(() => {
      this.updateRecurrenceValidator();
    });

    this.updateRecurrenceValidator(); // initial check
  }

  // Custom validator: recurrence required only if no due date
  private updateRecurrenceValidator() {
    const dueDate = this.form.get('dueDate')?.value;
    const recurrenceControl = this.form.get('recurrence');

    if (!dueDate) {
      recurrenceControl?.setValidators([Validators.required]);
    } else {
      recurrenceControl?.clearValidators();
      recurrenceControl?.setValidators([]); // none allowed when due date exists
    }
    recurrenceControl?.updateValueAndValidity({ emitEvent: false });
  }

  // Helper for template
  shouldShowRecurrenceError(): boolean | undefined {
    const recurrence = this.form.get('recurrence');
    const dueDate = this.form.get('dueDate')?.value;
    return !dueDate && recurrence?.touched && recurrence?.invalid;
  }

  onSubmit() {
    if (this.form.valid) {
      const formValue = { ...this.form.value };

      // Optional: convert empty strings/null to proper values
      if (!formValue.dueDate) formValue.dueDate = null;
      if (!formValue.startTime) formValue.startTime = null;
      if (!formValue.endTime) formValue.endTime = null;

      this.taskAdded.emit(formValue);

      // Reset form with defaults
      this.form.reset({
        title: '',
        category: 'personal',
        priority: 'low',
        recurrence: 'none',
        dueDate: null,
        startTime: null,
        endTime: null
      });
    }
  }
}