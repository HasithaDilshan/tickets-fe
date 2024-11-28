import { Routes } from '@angular/router';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomePageComponent } from './components/home-page/home-page.component';

export const routes: Routes = [
    { path: 'home', component: HomePageComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
  ];