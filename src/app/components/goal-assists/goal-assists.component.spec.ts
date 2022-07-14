import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalAssistsComponent } from './goal-assists.component';

describe('GoalAssistsComponent', () => {
  let component: GoalAssistsComponent;
  let fixture: ComponentFixture<GoalAssistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalAssistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalAssistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
