import { createReducer, on } from '@ngrx/store';
import { Film } from 'src/app/models/film';
import { Person } from 'src/app/models/person';
import * as fromSWActions from './swstore.actions';

export interface StarState {
  loadedId: number;
  loadedPerson: Person;
  loadedFilms: Film[];
  loadedPeople: Person[];
}

export const initialState: StarState = {
  loadedId: 0,
  loadedPerson: new Person(),
  loadedFilms: [],
  loadedPeople: [],
};

export const swreducer = createReducer(
  initialState,
  on(
    fromSWActions.loadPersonSuccess,
    (state, action): StarState => ({
      ...state,
      loadedPerson: action.loaded,
    })
  ),
  on(fromSWActions.setLoadedId, (state, action): StarState => {
    return {
      ...state,
      loadedId: action.id,
    };
  }),
  on(fromSWActions.loadPeopleSuccess, (state, action): StarState => {
    return {
      ...state,
      loadedPeople: action.loaded,
    };
  }),
  on(fromSWActions.loadFilmsSuccess, (state, action): StarState => {
    return {
      ...state,
      loadedFilms: action.list,
    };
  })
);
