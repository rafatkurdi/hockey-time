import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalAgainstComponent } from './goal-against.component';

describe('GoalAgainstComponent', () => {
  let component: GoalAgainstComponent;
  let fixture: ComponentFixture<GoalAgainstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalAgainstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalAgainstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
