import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { addDays } from 'date-fns';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-round-trip-dp',
  imports: [MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule],
  templateUrl: './round-trip-dp.component.html',
  styleUrl: './round-trip-dp.component.css'
})
export class RoundTripDpComponent implements OnInit {
  @Input() defStartDate!: Date;
  @Input() defEndDate!: Date;
  @Output() setFlightDetails = new EventEmitter<any>();

  startDate: Date;
  endDate: Date;

  constructor() {
    this.startDate = this.defStartDate;
    this.endDate = this.defEndDate;
  }

  ngOnInit() {
    this.setFlightDetails.emit({
      startFlyDate: this.startDate,
      endFlyDate: this.endDate
    });
  }

  handleStartDateChange(event: any) {
    const date = event.value;
    this.startDate = date;
    if (date > this.endDate) {
      this.endDate = addDays(date, 2);
    }
    this.setFlightDetails.emit({
      startFlyDate: date,
      ...(date > this.endDate && { endFlyDate: addDays(date, 2) })
    });
  }

  handleEndDateChange(event: any) {
    const date = event.value;
    this.endDate = date;
    this.setFlightDetails.emit({
      endFlyDate: date
    });
  }
}
