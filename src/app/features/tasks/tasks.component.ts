import { Component, inject } from '@angular/core';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../core/models/task.model';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskListComponent } from './task-list/task-list/task-list.component';
import { FiltersComponent } from './filters/filters/filters.component';
import { SearchComponent } from './search/search/search.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, AddTaskComponent, TaskListComponent, FiltersComponent, SearchComponent],
  templateUrl: './tasks.component.html'
})
export class TasksComponent {
  private taskService = inject(TaskService);
  filteredTasks = this.taskService.filteredTasks;

  addTask(task: Partial<Task>) {
    this.taskService.addTask(task);
  }

  toggleTask(id: string) {
    this.taskService.toggleTask(id);
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }

  handleOrderUpdate(newOrder: string[]) {
    newOrder.forEach((id, index) => this.taskService.updateOrder(id, index));
  }

  

  updateFilters(filters: Partial<{ category: string; status: string; priority: string; recurrence: string ; }>) {
    this.taskService.updateFilters(filters);
  }

  updateSearch(query: string) {
    this.taskService.updateFilters({ search: query });
  }

  clearCompleted() {
    this.taskService.clearCompleted();
  }
}