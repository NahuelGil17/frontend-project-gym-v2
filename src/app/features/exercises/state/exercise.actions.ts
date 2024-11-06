import { ExercisePayload } from '../interfaces/exercise.interface';
import {
  FiltersExercise,
  PageExercise,
} from '../interfaces/filters.excersise.interface';

export class GetExercisesByPage {
  static readonly type = '[Exercise] GetExercisesByPage';
  constructor(public readonly payload: PageExercise) {}
}
export class GetExercisesByName {
  static readonly type = '[Exercise] GetExercisesByName';
  constructor(
    public readonly pageInformation: PageExercise,
    public readonly filtersInformation: FiltersExercise,
  ) {}
}
export class CreateExercise {
  static readonly type = '[Exercise] CreateExercise';
  constructor(public readonly payload: ExercisePayload) {}
}
export class DeleteExercise {
  static readonly type = '[Exercise] DeleteExercise';
  constructor(public readonly id: string) {}
}
