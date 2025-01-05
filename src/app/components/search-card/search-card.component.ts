import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { addDays } from 'date-fns';
import { FlightsComponent } from '../flights/flights.component';
import { FlightComponent } from '../flight/flight.component';

@Component({
  selector: 'app-search-card',
  imports: [CommonModule, FormsModule, MatIconModule, FlightsComponent, FlightComponent],
  templateUrl: './search-card.component.html',
  styleUrl: './search-card.component.css'
})
export class SearchCardComponent implements OnInit {
  airports: any[] = [];
  isLoading = true;
  travelType = 'Round Trip';
  travelers: { adults: number; children: number; infants: number } = {
    adults: 1,
    children: 0,
    infants: 0
  };
  ticketClass = 'Economy';
  maxTravelers = 7;
  flightDetails = {
    departureAirport: 'DAC',
    arrivalAirport: 'CXB',
    startFlyDate: addDays(new Date(), 1),
    endFlyDate: addDays(addDays(new Date(), 1), 2)
  };
  constructor(private router: Router) { }

  ngOnInit() {
    const storedAirports = localStorage.getItem('airports');
    if (storedAirports) {
      this.airports = JSON.parse(storedAirports);
      this.isLoading = false;
      return;
    }

    fetch('https://cors-anywhere.herokuapp.com/https://ota-api.a4aero.com/api/settings/airports', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
      .then(response => {
        if (response.ok) return response.json();
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        this.airports = data.data;
        localStorage.setItem('airports', JSON.stringify(data.data));
        this.isLoading = false;
      })
      .catch(err => {
        console.error('Failed to fetch airports:', err);
        this.isLoading = false;
      });
  }

  setTravelType(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.travelType = inputElement.value;
    }
  }

  setTicketClass(cls: string) {
    this.ticketClass = cls;
  }

  updateTravelers(type: 'adults' | 'children' | 'infants', action: string) {
    const totalGroupTravelers = this.travelers.adults + this.travelers.children;

    if (action === 'increment') {
      if (type === 'infants' && this.travelers.infants < this.travelers.adults) {
        this.travelers[type]++;
      } else if (type !== 'infants' && totalGroupTravelers < this.maxTravelers) {
        this.travelers[type]++;
      }
    } else if (action === 'decrement') {
      if (type === 'adults' && this.travelers.adults > 1 && totalGroupTravelers > 1) {
        this.travelers[type]--;
      } else if (type !== 'adults' && this.travelers[type] > 0) {
        this.travelers[type]--;
      } else if (type === 'infants' && this.travelers[type] > 0) {
        this.travelers[type]--;
      }
    }
  }

  getTotalTravelers() {
    return this.travelers.adults + this.travelers.children + this.travelers.infants;
  }

  handleSearchFlight(event: Event) {
    event.preventDefault();

    const queryParams = new URLSearchParams({
      departure: this.flightDetails.departureAirport,
      arrival: this.flightDetails.arrivalAirport,
      startDate: this.flightDetails.startFlyDate.toISOString().split('T')[0],
      ...(this.travelType === 'Round Trip' && {
        endDate: this.flightDetails.endFlyDate.toISOString().split('T')[0]
      }),
      travelType: this.travelType,
      adults: this.travelers.adults.toString(),
      children: this.travelers.children.toString(),
      infants: this.travelers.infants.toString(),
      ticketClass: this.ticketClass
    });

    this.router.navigate(['/flight-search'], { queryParams: queryParams });
  }

  setFlightDetails(details: any) {
    this.flightDetails = { ...this.flightDetails, ...details };
  }
}
