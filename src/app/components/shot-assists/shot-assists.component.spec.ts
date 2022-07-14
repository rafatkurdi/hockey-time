import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShotAssistsComponent } from './shot-assists.component';

describe('ShotAssistsComponent', () => {
  let component: ShotAssistsComponent;
  let fixture: ComponentFixture<ShotAssistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShotAssistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShotAssistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
