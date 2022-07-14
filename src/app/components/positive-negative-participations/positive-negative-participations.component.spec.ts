import { ComponentFixture, TestBed } from "@angular/core/testing";

import { PositiveNegativeParticipationsComponent } from "./positive-negative-participations.component";

describe("PlusMinusParticipationsComponent", () => {
  let component: PositiveNegativeParticipationsComponent;
  let fixture: ComponentFixture<PositiveNegativeParticipationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PositiveNegativeParticipationsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositiveNegativeParticipationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
