import { createAction, props } from '@ngrx/store';
import { Film } from 'src/app/models/film';
import { Person } from 'src/app/models/person';

export const loadPerson = createAction(
  '[SW] Load person',
  props<{ id: number }>()
);
export const loadPersonSuccess = createAction(
  '[SW] Load person success',
  props<{ loaded: Person }>()
);
export const loadPersonFail = createAction('[SW] Load person fail');
export const setLoadedId = createAction(
  '[SW] Set loaded ID',
  props<{ id: number }>()
);
export const loadFilms = createAction(
  '[SW] Load films',
  props<{ list: string[] }>()
);
export const loadFilmsSuccess = createAction(
  '[SW] Load films success',
  props<{ list: Film[] }>()
);
export const loadPeople = createAction('[SW] Load people');
export const loadPeopleSuccess = createAction(
  '[SW] Load people success',
  props<{ loaded: Person[] }>()
);
export const loadPagePeople = createAction(
  '[SW] Load page people',
  props<{ page: number }>()
);
