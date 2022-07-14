import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotShotsSavedComponent } from './slot-shots-saved.component';

describe('SlotShotsSavedComponent', () => {
  let component: SlotShotsSavedComponent;
  let fixture: ComponentFixture<SlotShotsSavedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlotShotsSavedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotShotsSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
