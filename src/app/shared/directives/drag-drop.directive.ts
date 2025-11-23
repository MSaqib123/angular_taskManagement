import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[dragDrop]',
  standalone: true
})
export class DragDropDirective {
  @Output() orderChanged = new EventEmitter<string[]>();

  constructor(private el: ElementRef) {}

  @HostListener('dragstart', ['$event'])
  onDragStart(e: DragEvent) {
    const target = e.target as HTMLElement;
    if (target.classList.contains('task-card')) {
      target.classList.add('dragged');
      this.el.nativeElement.classList.add('dragging');
      e.dataTransfer?.setData('text/plain', target.dataset['id']!);
    }
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(e: DragEvent) {
    const target = e.target as HTMLElement;
    if (target.classList.contains('task-card')) {
      target.classList.remove('dragged');
      this.el.nativeElement.classList.remove('dragging');
    }
  }

  @HostListener('dragover', ['$event'])
  onDragOver(e: DragEvent) {
    e.preventDefault();
  }

  @HostListener('drop', ['$event'])
  onDrop(e: DragEvent) {
    e.preventDefault();
    const draggedId = e.dataTransfer?.getData('text/plain');
    const target = (e.target as HTMLElement).closest('.task-card') as HTMLElement | null;
    if (!target || target.dataset['id'] === draggedId) return;

    const allTasks = Array.from(this.el.nativeElement.querySelectorAll('.task-card')) as HTMLElement[];
    let newOrder = allTasks.map(task => task.dataset['id']!).filter(id => id !== draggedId);
    const targetIndex = newOrder.indexOf(target.dataset['id']!);
    newOrder.splice(targetIndex, 0, draggedId!);
    this.orderChanged.emit(newOrder);
  }
}