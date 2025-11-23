import { Component, inject } from '@angular/core';
import { RoutineService } from '../../core/services/routine.service';
import { Routine } from '../../core/models/routine.model';
import { AddRoutineComponent } from './add-routine/add-routine.component';
// import { RoutineListComponent } from './routine-list/routine-list.component';
import { CommonModule } from '@angular/common';
import { RoutineListComponent } from "./routine-list/routine-list.component";

@Component({
  selector: 'app-routines',
  standalone: true,
  imports: [CommonModule, AddRoutineComponent, RoutineListComponent],
  templateUrl: './routines.component.html'
})
export class RoutinesComponent {
  private routineService = inject(RoutineService);
  routines = this.routineService.routines;

  addRoutine(routine: Partial<Routine>) {
    this.routineService.addRoutine(routine);
  }

  deleteRoutine(id: string) {
    this.routineService.deleteRoutine(id);
  }
}

