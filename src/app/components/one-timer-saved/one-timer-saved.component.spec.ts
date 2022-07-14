import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneTimerSavedComponent } from './one-timer-saved.component';

describe('OneTimerSavedComponent', () => {
  let component: OneTimerSavedComponent;
  let fixture: ComponentFixture<OneTimerSavedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneTimerSavedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneTimerSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
