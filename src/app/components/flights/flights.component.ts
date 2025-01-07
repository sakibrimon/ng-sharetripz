import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { addDays } from 'date-fns';
import { CommonModule } from '@angular/common';
import { getOrdinalSuffix } from '../../../../utils';
import { MatIconModule } from '@angular/material/icon';
import { FlightComponent } from '../flight/flight.component';

@Component({
  selector: 'app-flights',
  imports: [CommonModule, MatIconModule, FlightComponent],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.css'
})
export class FlightsComponent implements OnInit {
  @Input() travelType!: string;
  @Input() defOrigin0!: string;
  @Input() defDestination0!: string;
  @Input() defStartDate0!: Date;
  @Input() defOrigin1!: string;
  @Input() defDestination1!: string;
  @Input() defStartDate1!: Date;
  @Input() airports!: any[];
  @Output() setFlightDetails = new EventEmitter<any>();

  flights: any[] = [];

  constructor() { }

  ngOnInit() {
    this.flights = [
      {
        defOrigin: this.defOrigin0,
        defDestination: this.defDestination0,
        defStartDate: this.defStartDate0
      },
      {
        defOrigin: this.defOrigin1,
        defDestination: this.defDestination1,
        defStartDate: this.defStartDate1
      }
    ];
  }

  handleAddFlights(event: Event) {
    event.preventDefault();
    if (this.flights.length >= 5) return;

    const lastFlight = this.flights[this.flights.length - 1];
    const defOrigin = lastFlight.defDestination;
    const defDestination = this.airports[this.flights.length + 1]?.code || '';
    const newFlight = {
      defOrigin,
      defDestination,
      defStartDate: addDays(lastFlight.defStartDate, 3)
    };

    this.flights.push(newFlight);
  }

  handleRemoveFlight(index: number) {
    this.flights = this.flights.filter((_, i) => i !== index);
  }

  // Using the imported getOrdinalSuffix function
  getOrdinalSuffix(index: number): string {
    return getOrdinalSuffix(index);
  }

  onSelect(event: any) {
    this.setFlightDetails.emit(event);
  }
}
