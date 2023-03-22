import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { Film } from '../models/film';
import { Person } from '../models/person';
import * as fromSWActions from '../store/swstore/swstore.actions';
import * as fromSWSelectors from '../store/swstore/swstore.selectors';

@Component({
  selector: 'app-star-component',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css'],
})
export class StarComponent implements OnInit, OnDestroy {
  public person: Observable<Person> = new Observable<Person>();
  public films$: Observable<Film[]> = new Observable<Film[]>();
  public id$: Observable<number> = new Observable<number>();
  public people: Observable<Person[]> = new Observable<Person[]>();

  public idToLoad: number = 0;
  public pageToLoad: number = 0;
  public filtro: string = '';

  private destroy$: Subject<any> = new Subject<any>();

  constructor(private readonly store: Store, private router: Router) {
    this.person = this.store.select(fromSWSelectors.selectLoadedPerson);
    this.people = this.store.select(fromSWSelectors.selectLoadedPeople);
    this.films$ = this.store.select(fromSWSelectors.selectLoadedFilms);
    this.id$ = this.store.select(fromSWSelectors.selectLoadedId);
  }

  ngOnInit(): void {
    this.id$.pipe(takeUntil(this.destroy$)).subscribe((valor) => {
      this.idToLoad = valor;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(0);
    this.destroy$.complete();
  }

  onLoadPeople() {
    this.store.dispatch(fromSWActions.loadPeople());
  }

  onIdChange(): void {
    this.store.dispatch(fromSWActions.loadPerson({ id: this.idToLoad }));
  }

  onPageChange(): void {
    if (this.pageToLoad > 0) {
      this.store.dispatch(
        fromSWActions.loadPagePeople({ page: this.pageToLoad })
      );
    } else {
      this.store.dispatch(fromSWActions.loadPeople());
    }
  }

  ver(url: string): void {
    const num: number = Number(url.split('/').reverse()[1]);
    this.idToLoad = num;
    this.onIdChange();

    this.router.navigate([`/person`], { queryParams: { id: num } });
  }

  filtre(): void {
    if (this.filtro) {
      this.people.pipe(takeUntil(this.destroy$)).subscribe((lista) => {
        this.people = of(
          lista.filter((cada) => !cada.name.search(this.filtro))
        );
      });
    } else {
      this.store.dispatch(fromSWActions.loadPeople());
    }
  }
}
