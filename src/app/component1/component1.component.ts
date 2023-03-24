import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { Film } from '../models/film';
import { Person } from '../models/person';
import * as fromSWSelectors from '../store/swstore/swstore.selectors';
import * as fromSWActions from '../store/swstore/swstore.actions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-component1',
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.css'],
})
export class Component1Component implements OnInit, OnDestroy {
  public person: Observable<Person> = new Observable<Person>();
  public films$: Observable<Film[]> = new Observable<Film[]>();
  public id$: Observable<number> = new Observable<number>();

  public idToLoad: number = 0;

  private destroy$: Subject<any> = new Subject<any>();

  constructor(private readonly store: Store, private route: ActivatedRoute) {
    this.person = this.store.select(fromSWSelectors.selectLoadedPerson);
    this.id$ = this.store.select(fromSWSelectors.selectLoadedId);
    this.films$ = this.store.select(fromSWSelectors.selectLoadedFilms);
  }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .pipe(
        map((params) => {
          return params['id'];
        })
      )
      .subscribe((valor) => {
        if (valor) {
          this.idToLoad = valor;
          this.onIdChange();
        } else {
          this.id$.pipe(takeUntil(this.destroy$)).subscribe((valor) => {
            this.idToLoad = valor;
          });
          // TODO: teste
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(0);
    this.destroy$.complete();
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .pipe(
        map((params) => {
          return params['id'];
        })
      )
      .subscribe((valor) => {
        if (valor) {
          this.idToLoad = valor;
          this.onIdChange();
        } else {
          this.id$.pipe(takeUntil(this.destroy$)).subscribe((valor) => {
            this.idToLoad = valor;
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(0);
    this.destroy$.complete();
  }

  onIdChange(): void {
    this.store.dispatch(fromSWActions.loadPerson({ id: this.idToLoad }));
  }
}
