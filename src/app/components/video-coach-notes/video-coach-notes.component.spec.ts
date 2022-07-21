import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCoachNotesComponent } from './video-coach-notes.component';

describe('VideoCoachNotesComponent', () => {
  let component: VideoCoachNotesComponent;
  let fixture: ComponentFixture<VideoCoachNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoCoachNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoCoachNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
