import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TryBlocComponent } from './try-bloc.component';

describe('TryBlocComponent', () => {
  let component: TryBlocComponent;
  let fixture: ComponentFixture<TryBlocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TryBlocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TryBlocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
