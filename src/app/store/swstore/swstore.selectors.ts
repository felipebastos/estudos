import { state } from '@angular/animations';
import { createSelector } from '@ngrx/store';
import { AppState, selectAppFeature } from '../app.reducer';
import { StarState } from './swstore.reducer';

export const selectSWState = createSelector(
  selectAppFeature,
  (state: AppState) => state.sw
);

export const selectLoadedPerson = createSelector(
  selectSWState,
  (state: StarState) => state.loadedPerson
);

export const selectLoadedId = createSelector(
  selectSWState,
  (state: StarState) => state.loadedId
);

export const selectLoadedPeople = createSelector(
  selectSWState,
  (state: StarState) => state.loadedPeople
);

export const selectLoadedFilms = createSelector(
  selectSWState,
  (state: StarState) => state.loadedFilms
);

export const selectHoraCerta = createSelector(
  selectSWState,
  (state: StarState) => state.horaCerta
);
