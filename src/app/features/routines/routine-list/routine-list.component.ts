import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routine } from '../../../core/models/routine.model';

@Component({
  selector: 'app-routine-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './routine-list.component.html'
})
export class RoutineListComponent {
  @Input() routines: Routine[] = [];
  @Output() delete = new EventEmitter<string>();

  formatTime(time?: string): string {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const period = +hours >= 12 ? 'PM' : 'AM';
    const hour = +hours % 12 || 12;
    return `${hour}:${minutes} ${period}`;
  }
}