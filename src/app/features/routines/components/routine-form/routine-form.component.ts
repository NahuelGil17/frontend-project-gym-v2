import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { BtnDirective } from '@shared/directives/btn/btn.directive';
import { InputDirective } from '@shared/directives/btn/input.directive';
import { Observable, Subject, takeUntil } from 'rxjs';
import { RoutineState } from '@features/routines/state/routine.state';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import {
  CreateRoutine,
  GetRoutineById,
  GetRoutinesByPage,
  UpdateRoutine,
} from '@features/routines/state/routine.actions';
import { SnackBarService } from '@core/services/snackbar.service';
import { Routine } from '@features/routines/interfaces/routine.interface';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-routine-form',
  styleUrls: ['./routine-form.component.css'],
  templateUrl: './routine-form.component.html',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    NgIf,
    BtnDirective,
    InputDirective,
    CommonModule,
    LoaderComponent,
  ],
})
export class RoutineFormComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private actions: Actions,
    private snackbar: SnackBarService,
    private route: ActivatedRoute,
  ) {}

  loading$: Observable<boolean> = this.store.select(
    RoutineState.routineLoading,
  );
  routineForm!: FormGroup;
  private destroy = new Subject<void>();
  title = 'Agregar ejercicio';
  btnTitle = 'Crear';

  categories = [
    { value: 'cardio', viewValue: 'Cardio' },
    { value: 'room', viewValue: 'Sala' },
  ];
  routineId: string = '';
  isEdit: boolean = false;

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.routineId = params.get('id') ?? '';
      this.isEdit = !!this.routineId;

      if (this.isEdit && this.routineId) {
        this.store.dispatch(new GetRoutineById(this.routineId));
        this.actions
          .pipe(ofActionSuccessful(GetRoutineById), takeUntil(this.destroy))
          .subscribe(() => {
            const routineEditing = this.store.selectSnapshot(
              RoutineState.routineEditing,
            );
            if (routineEditing) this.setDataForEdit(routineEditing);
          });
      }
    });

    this.routineForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required, Validators.min(1)]],
      isCustom: ['', Validators.required],
      days: ['', [Validators.required, Validators.min(1)]],
    });
  }

  setDataForEdit(routineEditing: Routine): void {
    this.title = 'Editar ejercicio';
    this.btnTitle = 'Guardar';
    this.routineForm.patchValue(routineEditing);
  }

  cancel(): void {
    console.log('cancel');
  }

  save(): void {
    if (this.routineForm.valid) {
      if (this.isEdit && this.routineId) this.update();
      else this.create();
    }
  }

  update(): void {
    this.store.dispatch(
      new UpdateRoutine(this.routineForm.value, this.routineId),
    );
    this.actions
      .pipe(ofActionSuccessful(UpdateRoutine), takeUntil(this.destroy))
      .subscribe(() => {
        this.store.dispatch(
          new GetRoutinesByPage({
            page: 1,
          }),
        );
        this.snackbar.showSuccess('Ejercicio actualizado correctamente', 'OK');
      });
  }

  create(): void {
    this.store.dispatch(new CreateRoutine(this.routineForm.value));
    this.actions
      .pipe(ofActionSuccessful(CreateRoutine), takeUntil(this.destroy))
      .subscribe(() => {
        this.store.dispatch(
          new GetRoutinesByPage({
            page: 1,
          }),
        );
        this.snackbar.showSuccess('Ejercicio creado correctamente', 'OK');
      });
  }

  addSubroutines(): void {
    console.log('addSubroutines');
  }
}