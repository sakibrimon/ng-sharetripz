import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-one-way-dp',
  imports: [MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule],
  templateUrl: './one-way-dp.component.html',
  styleUrl: './one-way-dp.component.css'
})
export class OneWayDpComponent implements OnInit {
  @Input() defStartDate!: Date;
  @Output() setFlightDetails = new EventEmitter<any>();

  startDate: Date;

  constructor() {
    this.startDate = this.defStartDate;
  }

  ngOnInit() {
    this.setFlightDetails.emit({
      startFlyDate: this.startDate
    });
  }

  handleStartDateChange(event: any) {
    const date = event.value;
    this.startDate = date;
    this.setFlightDetails.emit({
      startFlyDate: date
    });
  }
}
