import { Component, EventEmitter, Output, signal } from '@angular/core';

@Component({
  selector: 'app-tab-navigation',
  imports: [],
  templateUrl: './tab-navigation.component.html',
  styleUrl: './tab-navigation.component.css'
})
export class TabNavigationComponent {
  currentTab = signal('tasks-tab');
  @Output() tabChange = new EventEmitter<string>();
}
