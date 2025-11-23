import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { Routine } from '../models/routine.model';

@Injectable({ providedIn: 'root' })
export class RoutineService {
  routines = signal<Routine[]>([]);

  constructor(private api: ApiService) {
    this.loadRoutines();
    setInterval(() => this.checkAlarms(), 60000);
  }

  loadRoutines() {
    this.api.get<Routine[]>('routines').subscribe(routines => this.routines.set(routines));
  }

  addRoutine(routine: Partial<Routine>) {
    this.api.post<string>('routines', routine).subscribe(() => this.loadRoutines());
  }

  deleteRoutine(id: string) {
    this.api.delete(`routines/${id}`).subscribe(() => this.loadRoutines());
  }

  private checkAlarms() {
    const now = new Date();
    const currentTime = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Karachi', hour12: false }).slice(0, 5);
    this.api.get<Routine[]>('routines/due', { time: currentTime }).subscribe(due => {
      due.forEach(r => this.showNotification(r.title, { body: r.notes ?? '', icon: 'https://via.placeholder.com/32', requireInteraction: true }));
    });
  }

  private async showNotification(title: string, options: NotificationOptions) {
    if (!('Notification' in window)) return;
    if (Notification.permission !== 'granted') {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') return;
    }
    new Notification(title, options);
  }
}