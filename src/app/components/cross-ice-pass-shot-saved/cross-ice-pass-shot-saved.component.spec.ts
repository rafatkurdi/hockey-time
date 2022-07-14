import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossIcePassShotSavedComponent } from './cross-ice-pass-shot-saved.component';

describe('CrossIcePassShotSavedComponent', () => {
  let component: CrossIcePassShotSavedComponent;
  let fixture: ComponentFixture<CrossIcePassShotSavedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrossIcePassShotSavedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossIcePassShotSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
