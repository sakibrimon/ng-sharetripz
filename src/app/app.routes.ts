import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'flight-search', component: SearchComponent },
    ]
  },
  { path: '**', component: ErrorPageComponent } // Wildcard route for a 404 page
];
