import { Component } from '@angular/core';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogTerminalComponent } from './components/log-terminal/log-terminal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ConfigurationComponent,
    DashboardComponent,
    LogTerminalComponent
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {

}