import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceoffsComponent } from './faceoffs.component';

describe('FaceoffsComponent', () => {
  let component: FaceoffsComponent;
  let fixture: ComponentFixture<FaceoffsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaceoffsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceoffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
