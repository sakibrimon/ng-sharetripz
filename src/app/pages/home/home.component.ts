import { Component } from '@angular/core';
import { SearchCardComponent } from '../../components/search-card/search-card.component';

@Component({
  selector: 'app-home',
  imports: [SearchCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
