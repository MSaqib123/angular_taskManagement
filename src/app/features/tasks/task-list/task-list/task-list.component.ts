import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../../core/models/task.model';
import { DragDropDirective } from '../../../../shared/directives/drag-drop.directive';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, DragDropDirective],
  templateUrl: './task-list.component.html'
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() toggle = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  @Output() orderUpdated = new EventEmitter<string[]>();

  formatTime(time?: string): string {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const period = +hours >= 12 ? 'PM' : 'AM';
    const hour = +hours % 12 || 12;
    return `${hour}:${minutes} ${period}`;
  }
}