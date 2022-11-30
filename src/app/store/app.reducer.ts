import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { StarState, swreducer } from './swstore/swstore.reducer';

export interface AppState {
  sw: StarState;
}

export const AppReducer: ActionReducerMap<AppState> = {
  sw: swreducer,
};

export const selectAppFeature = createFeatureSelector<AppState>('app');
