import { SubRoutine } from '@features/sub-routines/interfaces/sub-routine.interface';
import {
  FiltersRoutine,
  PageRoutine,
} from '../interfaces/filters.routine.interface';
import { Routine, RoutinePayload } from '../interfaces/routine.interface';

export class GetRoutinesByPage {
  static readonly type = '[Routine] GetRoutinesByPage';
  constructor(public readonly payload: PageRoutine) {}
}
export class GetRoutinesByName {
  static readonly type = '[Routine] GetRoutinesByName';
  constructor(
    public readonly pageInformation: PageRoutine,
    public readonly filtersInformation: FiltersRoutine,
  ) {}
}
export class CreateRoutine {
  static readonly type = '[Routine] CreateRoutine';
  constructor(public readonly payload: RoutinePayload) {}
}
export class DeleteRoutine {
  static readonly type = '[Routine] DeleteRoutine';
  constructor(public readonly id: string) {}
}
export class GetRoutineById {
  static readonly type = '[Routine] GetRoutineById';
  constructor(public readonly id: string) {}
}
export class SetLimitPerPage {
  static readonly type = '[Routine] SetLimitPerPage';
  constructor(public readonly limit: number) {}
}
export class UpdateRoutine {
  static readonly type = '[Routine] UpdateRoutine';
  constructor(
    public readonly payload: Routine,
    public readonly id: string,
  ) {}
}
export class UpdateSubRoutines {
  static readonly type = '[Routine] UpdateSubRoutines';
  constructor(public readonly subRoutines: SubRoutine[]) {}
}
export class SetSelectedRoutine {
  static readonly type = '[Routine] SetSelectedRoutine';
  constructor(public readonly routine: Routine) {}
}
