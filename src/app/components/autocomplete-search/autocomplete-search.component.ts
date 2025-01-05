import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

interface Airport {
  code: string;
  cityName: string;
  name: string;
}

@Component({
  selector: 'app-autocomplete-search',
  imports: [CommonModule, FormsModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './autocomplete-search.component.html',
  styleUrl: './autocomplete-search.component.css'
})
export class AutocompleteSearchComponent implements OnInit {
  @Input() portType!: string;
  @Input() defValue!: string;
  @Input() airports!: Airport[];
  @Output() setFlightDetails = new EventEmitter<any>();

  value: string = '';
  lastValidValue: string = '';
  isItemSelected: boolean = false;
  suggestions: Airport[] = [];

  placeholder: string = "Type to search...";

  constructor() { }

  ngOnInit(): void {
    this.value = this.defValue;
    this.lastValidValue = this.defValue;
  }

  getSuggestions(inputValue: string): Airport[] {
    const regex = new RegExp(inputValue.trim(), 'i');
    return this.airports.filter(
      airport => regex.test(airport.cityName) || regex.test(airport.name) || regex.test(airport.code)
    );
  }

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.suggestions = this.getSuggestions(input.value);
    this.isItemSelected = false;
    this.setFlightDetails.emit({
      ...(this.portType === 'origin' && { departureAirport: input.value }),
      ...(this.portType === 'destination' && { arrivalAirport: input.value }),
    });
  }

  onOptionSelected(event: any) {
    const selectedValue = event.option.value;
    this.lastValidValue = selectedValue;
    this.isItemSelected = true;
    this.setFlightDetails.emit({
      ...(this.portType === 'origin' && { departureAirport: selectedValue }),
      ...(this.portType === 'destination' && { arrivalAirport: selectedValue }),
    });
  }

  onBlur() {
    if (!this.isItemSelected) {
      this.value = this.lastValidValue;
      this.setFlightDetails.emit({
        ...(this.portType === 'origin' && { departureAirport: this.lastValidValue }),
        ...(this.portType === 'destination' && { arrivalAirport: this.lastValidValue }),
      });
    }
  }

  onSelect(event: any) {
    // Emit the event with the selected value
    this.setFlightDetails.emit(event);
  }
}
