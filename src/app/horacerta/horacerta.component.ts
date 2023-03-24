import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import * as fromSWSelectors from '../store/swstore/swstore.selectors';
import * as formSWActions from '../store/swstore/swstore.actions';

@Component({
  selector: 'app-horacerta',
  templateUrl: './horacerta.component.html',
  styleUrls: ['./horacerta.component.css'],
})
export class HoracertaComponent implements OnInit, OnDestroy {
  public hora: Observable<string> = new Observable<string>();

  private destroy$: Subject<number> = new Subject<number>();

  constructor(private store: Store) {
    this.hora = this.store.select(fromSWSelectors.selectHoraCerta);
  }

  ngOnInit(): void {
    this.hora.pipe(takeUntil(this.destroy$)).subscribe((valor) => {
      console.log(valor);
      if (valor === 'Não iniciado') {
        this.store.dispatch(formSWActions.loadHora());
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(1);
    this.destroy$.complete();
  }
}
