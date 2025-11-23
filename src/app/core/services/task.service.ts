import { Injectable, signal, computed, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private api=inject(ApiService);
  private tasksSignal = signal<Task[]>([]);
  private filtersSignal = signal<{
  category: string;
  status: string;
  priority: string;
  recurrence: string;
  search: string;
}>({ category: 'all', status: 'all', priority: 'all', recurrence: 'all', search: '' });

  filteredTasks = computed(() => {
    let filtered = this.tasksSignal();
    const filters = this.filtersSignal();
    if (filters.search) filtered = filtered.filter(t => t.title.toLowerCase().includes(filters.search.toLowerCase()));
    if (filters.category !== 'all') filtered = filtered.filter(t => t.category === filters.category);
    if (filters.status !== 'all') filtered = filtered.filter(t => t.isCompleted === (filters.status === 'completed'));
    if (filters.priority !== 'all') filtered = filtered.filter(t => t.priority === filters.priority);
    if (filters.recurrence !== 'all') filtered = filtered.filter(t => t.recurrence === filters.recurrence);
    return filtered.sort((a, b) => a.orderIndex - b.orderIndex);
  });

  constructor() {
    this.loadTasks();
  }

  loadTasks() {
    const params = this.filtersSignal();
    // this.api.get<Task[]>('tasks', { search: params.search, category: params.category, status: params.status, priority: null, recurrence: params.recurrence }).subscribe(tasks => this.tasksSignal.set(tasks));
    this.api.get<Task[]>('tasks').subscribe(
      tasks => {
        console.log(tasks);
       return this.tasksSignal.set(tasks);
      }
    );
  }

  addTask(task: Partial<Task>) {
    this.api.post<string>('tasks', task).subscribe(() => this.loadTasks());
  }

  toggleTask(id: string) {
    this.api.put(`tasks/${id}/toggle`, {}).subscribe(() => this.loadTasks());
  }

  deleteTask(id: string) {
    this.api.delete(`tasks/${id}`).subscribe(() => this.loadTasks());
  }

  updateOrder(id: string, newIndex: number) {
    this.api.put('tasks/order', { id, newIndex }).subscribe(() => this.loadTasks());
  }

  clearCompleted() {
    this.api.delete('tasks/completed').subscribe(() => this.loadTasks());
  }


  updateFilters(filters: Partial<ReturnType<typeof this.filtersSignal>>) {
    this.filtersSignal.update(prev => ({ ...prev, ...filters }));
    this.loadTasks();
  }

  
}