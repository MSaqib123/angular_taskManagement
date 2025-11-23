import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DragDropDirective } from './shared/directives/drag-drop.directive';
import { TabNavigationComponent } from "./shared/components/tab-navigation/tab-navigation/tab-navigation.component";
import { RoutinesComponent } from "./features/routines/routines.component";
import { TasksComponent } from "./features/tasks/tasks.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DragDropDirective, TabNavigationComponent, RoutinesComponent, TasksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular_taskManagement';
  currentTab = signal<'tasks-tab' | 'routines-tab'>('tasks-tab');

}
