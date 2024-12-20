import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from '@core/services/snackbar.service';
import {
  ClearClients,
  DeleteHour,
} from '@features/schedule/state/schedule.actions';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { CardScheduleComponent } from '../card-schedule/card-schedule.component';
import { ScheduleFormComponent } from '../schedule-form/schedule-form.component';
import { ScheduleState } from '@features/schedule/state/schedule.state';
import { AsyncPipe } from '@angular/common';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';

@Component({
  selector: 'app-calendar-schedule',
  standalone: true,
  imports: [CardScheduleComponent, AsyncPipe, LoaderComponent],
  templateUrl: './calendar-schedule.component.html',
  styleUrl: './calendar-schedule.component.css',
})
export class CalendarScheduleComponent implements AfterViewInit {
  @Input() schedule: any;
  scheduleUpdated = output<any>({
    alias: 'scheduleUpdated',
  });
  loading$ = this.store.select(ScheduleState.scheduleLoading);

  constructor(
    private store: Store,
    private actions: Actions,
    private snackbar: SnackBarService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
  ) {}

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  editarHorario(event: Event) {
    // Lógica para abrir un formulario de edición
    this.dialog
      .open(ScheduleFormComponent, {
        width: '500px',
        data: {
          title: 'Editar horario',
          day: event,
        },
      })
      .afterClosed()
      .subscribe(() => {
        // Despacha la acción para limpiar el estado de clientes
        this.store.dispatch(new ClearClients());
      });
  }

  eliminarHorario(event: { _id: string }) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        title: 'Eliminar horario',
        contentMessage: '¿Estás seguro de que deseas eliminar este horario?',
      },
    });
    dialogRef.componentInstance.confirm.subscribe((value) => {
      if (!value) return;
      const _id = event._id;
      this.store.dispatch(new DeleteHour(_id));
      this.actions.pipe(ofActionSuccessful(DeleteHour)).subscribe(() => {
        this.snackbar.showSuccess('Horario eliminado', 'Cerrar');
        // Filtra y emite el nuevo horario al componente padre
        const updatedSchedule = this.schedule().map((day: any) => {
          return {
            ...day,
            hours: day.hours.filter((hour: any) => hour._id !== _id),
          };
        });
        this.scheduleUpdated.emit(updatedSchedule);
      });
    });
  }
}
