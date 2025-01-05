import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundTripDPComponent } from './round-trip-dp.component';

describe('RoundTripDPComponent', () => {
  let component: RoundTripDPComponent;
  let fixture: ComponentFixture<RoundTripDPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoundTripDPComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoundTripDPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
