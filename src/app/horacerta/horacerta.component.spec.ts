import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoracertaComponent } from './horacerta.component';

describe('HoracertaComponent', () => {
  let component: HoracertaComponent;
  let fixture: ComponentFixture<HoracertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoracertaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoracertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
