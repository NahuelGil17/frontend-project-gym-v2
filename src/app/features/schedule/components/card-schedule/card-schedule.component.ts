import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { IHour } from '@features/schedule/interfaces/schedule.interface';
import { HourPipe } from '@features/schedule/pipes/hour.pipe';

@Component({
  selector: 'app-card-schedule',
  standalone: true,
  imports: [HourPipe, NgClass],
  templateUrl: './card-schedule.component.html',
  styleUrl: './card-schedule.component.css',
})
export class CardScheduleComponent {
  hour = input<IHour>();
  day = input<any>();
  edit = output<any>();
  delete = output<any>();

  defaultHour: IHour = {
    startTime: '00',
    endTime: '00',
    maxCount: 0,
    clients: [{ clients: '' }],
  };

  constructor() {}

  editarHorario(hour: IHour, day: any) {
    this.edit.emit({ hour, name: day.day });
  }

  eliminarHorario(hour: IHour) {
    this.delete.emit(hour);
  }

  getBackgroundClass(hour: any): string {
    const clientsCount = hour.clients?.length || 0;
    const maxCount = hour?.maxCount || 0;

    if (clientsCount === maxCount) {
      return 'bg-red-500';
    }
    if (clientsCount >= maxCount / 2) {
      return 'bg-yellow-200';
    }
    return 'bg-green-300';
  }

  getTextClass(hour: any): string {
    const clientsCount = hour.clients?.length || 0;
    const maxCount = hour?.maxCount || 0;

    if (clientsCount === maxCount) {
      return 'text-black';
    }
    if (clientsCount >= maxCount / 2) {
      return 'text-black';
    }
    return 'text-white';
  }
}
