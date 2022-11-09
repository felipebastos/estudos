import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  filter,
  from,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { Person } from './models/person';
import { SwService } from './swservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  public person: Observable<Person> = new Observable<Person>();
  public people: Observable<Person[]> = new Observable<Person[]>();
  public everyone: Observable<Person[]> = new Observable<Person[]>();

  public idToLoad: number = 0;
  public pageToLoad: number = 0;
  public filtro: string = '';

  private destroy$: Subject<any> = new Subject<any>();

  constructor(private swapi: SwService) {}

  ngOnInit(): void {
    this.person = this.swapi.getPerson();
    this.people = this.swapi.getPeople();
  }

  ngOnDestroy(): void {
    this.destroy$.next(0);
    this.destroy$.complete();
  }

  onIdChange(): void {
    this.person = this.swapi.getPerson(this.idToLoad);
  }

  onPageChange(): void {
    if (this.pageToLoad > 0) {
      this.people = this.swapi.getPagePeople(this.pageToLoad);
    } else {
      this.people = this.swapi.getPeople();
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
