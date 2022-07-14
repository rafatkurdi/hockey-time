import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReboundsSavedComponent } from './rebounds-saved.component';

describe('ReboundsSavedComponent', () => {
  let component: ReboundsSavedComponent;
  let fixture: ComponentFixture<ReboundsSavedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReboundsSavedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReboundsSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
