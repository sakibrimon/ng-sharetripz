import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { OriginComponent } from '../origin/origin.component';
import { DestinationComponent } from '../destination/destination.component';
import { RoundTripDpComponent } from '../round-trip-dp/round-trip-dp.component';
import { OneWayDpComponent } from '../one-way-dp/one-way-dp.component';

@Component({
  selector: 'app-flight',
  imports: [CommonModule, MatIconModule, OriginComponent, DestinationComponent, RoundTripDpComponent, OneWayDpComponent],
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.css'
})
export class FlightComponent implements OnInit {
  @Input() travelType!: string;
  @Input() defOrigin!: string;
  @Input() defDestination!: string;
  @Input() defStartDate!: Date;
  // @Input() defEndDate?: Date;
  @Input() defEndDate!: Date;
  @Input() airports!: any[];
  @Output() setFlightDetails = new EventEmitter<any>();

  ports: { origin: any; destination: any } | null = null;

  constructor() { }

  ngOnInit() {
    this.ports = {
      origin: {
        defOrigin: this.defOrigin,
        airports: this.airports,
        setFlightDetails: this.setFlightDetails
      },
      destination: {
        defDestination: this.defDestination,
        airports: this.airports,
        setFlightDetails: this.setFlightDetails
      }
    };
  }

  swapPorts() {
    if (this.ports) {
      const temp = this.ports.origin;
      this.ports.origin = this.ports.destination;
      this.ports.destination = temp;
      this.setFlightDetails.emit({
        departureAirport: this.ports.origin.defOrigin,
        arrivalAirport: this.ports.destination.defDestination
      });
    }
  }

  onSelect(event: any) {
    this.setFlightDetails.emit(event);
  }
}
