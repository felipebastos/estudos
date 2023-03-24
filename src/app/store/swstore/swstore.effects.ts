import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  delay,
  interval,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
  timeInterval,
  timeout,
} from 'rxjs';
import { SwService } from 'src/app/star/swservice.service';
import { ApihoraService } from 'src/app/horacerta/apihora.service';
import * as fromSWActions from './swstore.actions';

@Injectable()
export class SWEffects {
  loadPerson$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromSWActions.loadPerson),
      mergeMap((action) => {
        return this.swservice.getPerson(action.id).pipe(
          switchMap((loaded) => {
            return of(
              fromSWActions.loadPersonSuccess({ loaded }),
              fromSWActions.setLoadedId({ id: action.id }),
              fromSWActions.loadFilms({ list: loaded.films })
            );
          })
        );
      })
    );
  });

  loadPeople$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromSWActions.loadPeople),
      mergeMap((action) => {
        return this.swservice.getPeopleRx().pipe(
          map((loaded) => {
            return fromSWActions.loadPeopleSuccess({ loaded });
          })
        );
      })
    );
  });

  loadPagePeople$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromSWActions.loadPagePeople),
      mergeMap((action) => {
        return this.swservice
          .getPagePeople(action.page)
          .pipe(
            map((people) => fromSWActions.loadPeopleSuccess({ loaded: people }))
          );
      })
    );
  });

  loadFilms$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromSWActions.loadFilms),
      mergeMap((action) => {
        return this.swservice
          .getFilms(action.list)
          .pipe(
            map((films) => fromSWActions.loadFilmsSuccess({ list: films }))
          );
      })
    );
  });

  loadHora$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromSWActions.loadHora),
      mergeMap(() => {
        return interval(5000).pipe(
          switchMap(() => {
            return this.apihora.getHora().pipe(
              map((result) => {
                return fromSWActions.loadHoraSucesso({ tempo: result.tempo });
              })
            );
          })
        );
      })
    );
  });

  constructor(
    private swservice: SwService,
    private apihora: ApihoraService,
    private actions$: Actions
  ) {}
}
