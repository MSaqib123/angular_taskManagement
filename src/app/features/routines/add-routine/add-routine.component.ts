import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routine } from '../../../core/models/routine.model';

@Component({
  selector: 'app-add-routine',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-routine.component.html'
})
export class AddRoutineComponent {
  @Output() routineAdded = new EventEmitter<Partial<Routine>>();
  form!: FormGroup;
  
  constructor(private fb: FormBuilder) {
     this.form = this.fb.group({
      title: ['', Validators.required],
      notes: [''],
      startTime: ['', Validators.required],
      endTime: ['']
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.routineAdded.emit(this.form.value);
      this.form.reset();
    }
  }
}