import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromSWSelectors from '../store/swstore/swstore.selectors';
import * as formSWActions from '../store/swstore/swstore.actions';

@Component({
  selector: 'app-horacerta',
  templateUrl: './horacerta.component.html',
  styleUrls: ['./horacerta.component.css'],
})
export class HoracertaComponent implements OnInit {
  public hora: Observable<string> = new Observable<string>();

  constructor(private store: Store) {
    this.hora = this.store.select(fromSWSelectors.selectHoraCerta);
  }

  ngOnInit(): void {
    this.store.dispatch(formSWActions.loadHora());
  }
}
