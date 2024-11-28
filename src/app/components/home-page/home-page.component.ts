import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConfigurationComponent } from '../configuration/configuration.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { LogTerminalComponent } from '../log-terminal/log-terminal.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  imports: [
    CommonModule,
    ConfigurationComponent,
    DashboardComponent,
    LogTerminalComponent,
    MatCardModule
  ]
})
export class HomePageComponent {
  availableTickets: number = 0;
}
