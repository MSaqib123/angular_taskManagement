import { Component, EventEmitter, Input, OnChanges, Output, signal, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-tab-navigation',
  imports: [],
  templateUrl: './tab-navigation.component.html',
  styleUrl: './tab-navigation.component.css'
})
export class TabNavigationComponent {
  
  @Input({ required: true }) currentTab!: string;   // ← receive from parent
  @Output() tabChange = new EventEmitter<string>(); // ← emit to parent

  selectTab(tab: string) {
    this.tabChange.emit(tab);
  }
}
