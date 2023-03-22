import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SophiaComponent } from './sophia.component';

describe('SophiaComponent', () => {
  let component: SophiaComponent;
  let fixture: ComponentFixture<SophiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SophiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SophiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
