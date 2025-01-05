import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneWayDPComponent } from './one-way-dp.component';

describe('OneWayDPComponent', () => {
  let component: OneWayDPComponent;
  let fixture: ComponentFixture<OneWayDPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneWayDPComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneWayDPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
