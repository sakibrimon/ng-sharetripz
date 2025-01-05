import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AutocompleteSearchComponent } from '../autocomplete-search/autocomplete-search.component';

@Component({
  selector: 'app-destination',
  imports: [AutocompleteSearchComponent],
  templateUrl: './destination.component.html',
  styleUrl: './destination.component.css'
})
export class DestinationComponent {
  @Input() defDestination!: string;
  @Input() airports!: any[];
  @Output() setFlightDetails = new EventEmitter<any>();

  constructor() { }

  onSelect(event: any) {
    // Emit the event with the selected value
    this.setFlightDetails.emit(event);
  }
}
