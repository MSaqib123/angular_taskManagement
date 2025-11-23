import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filters.component.html'
})
export class FiltersComponent {
  @Output() filtersChanged = new EventEmitter<{ category: string; status: string; priority: string; recurrence: string }>();
  @Output() clearCompleted = new EventEmitter<void>();

  @ViewChild('categorySelect', { static: true }) categorySelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('statusSelect', { static: true }) statusSelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('prioritySelect', { static: true }) prioritySelect!: ElementRef<HTMLSelectElement>;
  @ViewChild('recurrenceSelect', { static: true }) recurrenceSelect!: ElementRef<HTMLSelectElement>;

  onFilterChange() {
    this.filtersChanged.emit({
      category: this.categorySelect.nativeElement.value,
      status: this.statusSelect.nativeElement.value,
      priority: this.prioritySelect.nativeElement.value,
      recurrence: this.recurrenceSelect.nativeElement.value
    });
  }
}