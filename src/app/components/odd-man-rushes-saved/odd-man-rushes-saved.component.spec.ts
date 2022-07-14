import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OddManRushesSavedComponent } from './odd-man-rushes-saved.component';

describe('OddManRushesSavedComponent', () => {
  let component: OddManRushesSavedComponent;
  let fixture: ComponentFixture<OddManRushesSavedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OddManRushesSavedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OddManRushesSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
