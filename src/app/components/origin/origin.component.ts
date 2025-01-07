import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AutocompleteSearchComponent } from '../autocomplete-search/autocomplete-search.component';

@Component({
  selector: 'app-origin',
  imports: [AutocompleteSearchComponent],
  templateUrl: './origin.component.html',
  styleUrl: './origin.component.css'
})
export class OriginComponent {
  @Input() defOrigin!: string;
  @Input() airports!: any[];
  @Output() setFlightDetails = new EventEmitter<any>();

  constructor() { }

  onSelect(event: any) {
    // Emit the event with the selected value
    this.setFlightDetails.emit(event);
  }
}
