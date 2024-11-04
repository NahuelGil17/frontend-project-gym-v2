import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable, catchError, tap, throwError } from 'rxjs';

import { ExerciseStateModel } from './exercise.model';
import { Exercise } from '../interfaces/exercise.interface';
import { ExerciseService } from '../services/exercise.service';
import {
  CreateExercise,
  GetExercisesByName,
  GetExercisesByPage,
} from './exercise.actions';
import { environment } from '../../../../environments/environment.prod';

@State<ExerciseStateModel>({
  name: 'excercise',
  defaults: {
    exercises: [],
    totalExercises: 0,
    page: null,
    filters: null,
    loading: false,
  },
})
@Injectable({ providedIn: 'root' })
export class ExerciseState {
  @Selector()
  static exerciseLoading(state: ExerciseStateModel): boolean {
    return state.loading || false;
  }

  @Selector()
  static exercises(state: ExerciseStateModel): Exercise[] {
    return state.exercises || [];
  }

  @Selector()
  static totalExercises(state: ExerciseStateModel): number {
    return state.totalExercises || 0;
  }

  constructor(private exerciseService: ExerciseService) {}

  @Action(GetExercisesByPage, { cancelUncompleted: true })
  getExercises(
    ctx: StateContext<ExerciseStateModel>,
    action: GetExercisesByPage,
  ): Observable<Exercise[]> {
    ctx.patchState({ loading: true });
    return this.exerciseService
      .getExercisesByPage(action.payload.page, action.payload.limit)
      .pipe(
        tap((response) => {
          const exercises = response.data.data;
          ctx.patchState({
            exercises,
            loading: false,
            totalExercises: response.data.total,
          });
        }),
        catchError((error: HttpErrorResponse) => {
          ctx.patchState({ loading: false });
          return throwError(error);
        }),
      );
  }

  @Action(GetExercisesByName, { cancelUncompleted: true })
  getExercisesByName(
    ctx: StateContext<ExerciseStateModel>,
    action: GetExercisesByName,
  ): Observable<Exercise[]> {
    ctx.patchState({ loading: true });
    return this.exerciseService
      .getExercisesByName(
        action.pageInformation.page,
        action.pageInformation.limit,
        action.filtersInformation,
      )
      .pipe(
        tap((response) => {
          const exercises = response.data.data;
          ctx.patchState({
            exercises,
            loading: false,
            totalExercises: response.data.total,
          });
        }),
        catchError((error: HttpErrorResponse) => {
          ctx.patchState({ loading: false });
          return throwError(error);
        }),
      );
  }

  @Action(CreateExercise, { cancelUncompleted: true })
  createExercise(
    ctx: StateContext<ExerciseStateModel>,
    action: CreateExercise,
  ): Observable<Exercise> {
    ctx.patchState({ loading: true });
    return this.exerciseService.createExercise(action.payload).pipe(
      tap(() => {
        ctx.patchState({ loading: false });
        ctx.dispatch(
          new GetExercisesByPage({
            page: 1,
            limit: environment.exerciseTableLimit,
          }),
        );
      }),
      catchError((error: HttpErrorResponse) => {
        ctx.patchState({ loading: false });
        return throwError(error);
      }),
    );
  }
}
