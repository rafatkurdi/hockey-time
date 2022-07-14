import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerSlotShotSavedComponent } from './inner-slot-shot-saved.component';

describe('InnerSlotShotSavedComponent', () => {
  let component: InnerSlotShotSavedComponent;
  let fixture: ComponentFixture<InnerSlotShotSavedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnerSlotShotSavedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerSlotShotSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
