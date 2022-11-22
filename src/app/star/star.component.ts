import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  filter,
  from,
  Observable,
  of,
  Subject,
  switchMap,
  take,
  takeUntil,
} from 'rxjs';
import { Film } from '../models/film';
import { Person } from '../models/person';
import { SwService } from './swservice.service';

@Component({
  selector: 'app-star-component',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css'],
})
export class StarComponent implements OnInit, OnDestroy {
  public person: Observable<Person> = new Observable<Person>();
  public films$: Observable<Film[]> = new Observable<Film[]>();
  public people: Observable<Person[]> = new Observable<Person[]>();
  public everyone: Observable<Person[]> = new Observable<Person[]>();

  public idToLoad: number = 0;
  public pageToLoad: number = 0;
  public filtro: string = '';

  private destroy$: Subject<any> = new Subject<any>();

  constructor(private swapi: SwService) {}

  ngOnInit(): void {
    this.person = this.swapi.getPerson();
    this.people = this.swapi.getPeopleRx();
  }

  ngOnDestroy(): void {
    this.destroy$.next(0);
    this.destroy$.complete();
  }

  onIdChange(): void {
    this.person = this.swapi.getPerson(this.idToLoad);
    this.person.pipe(take(1)).subscribe((person) => {
      this.films$ = this.swapi.getFilms(person.films);
    });
  }

  onPageChange(): void {
    if (this.pageToLoad > 0) {
      this.people = this.swapi.getPagePeople(this.pageToLoad);
    } else {
      this.people = this.swapi.getPeopleRx();
    }
  }

  ver(url: string): void {
    const num: number = Number(url.split('/').reverse()[1]);
    this.idToLoad = num;
    this.onIdChange();
  }

  filtre(): void {
    if (this.filtro) {
      this.people.pipe(takeUntil(this.destroy$)).subscribe((lista) => {
        this.people = of(
          lista.filter((cada) => !cada.name.search(this.filtro))
        );
      });
    } else {
      this.people = this.swapi.getPeople();
    }
  }
}
