import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { TicketService } from '../../services/ticket.service';
import { Configuration } from '../../models/configuration.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatCardModule]
})
export class ConfigurationComponent {
  configForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private snackBar: MatSnackBar
  ) {
    this.configForm = this.fb.group({
      totalTickets: [50, [Validators.required, Validators.min(1)]],
      ticketReleaseRate: [1, [Validators.required, Validators.min(1)]],
      customerRetrievalRate: [1, [Validators.required, Validators.min(1)]],
      maxTicketCapacity: [100, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.configForm.valid) {
      const config: Configuration = this.configForm.value;
      this.ticketService.configure(config).subscribe(
        () => this.showMessage('Configuration submitted successfully', 'success'),
        error => this.showMessage('Error submitting configuration', 'error')
      );
    } else {
      this.showMessage('Please correct the form errors before submitting', 'error');
    }
  }

  startSimulation() {
    this.ticketService.startSimulation().subscribe(
      () => this.showMessage('Simulation started', 'success'),
      error => this.showMessage('Error starting simulation', 'error')
    );
  }

  stopSimulation() {
    this.ticketService.stopSimulation().subscribe(
      () => this.showMessage('Simulation stopped', 'success'),
      error => this.showMessage('Error stopping simulation', 'error')
    );
  }

  addVendor() {
    this.ticketService.addVendor().subscribe(
      () => this.showMessage('Vendor added', 'success'),
      error => this.showMessage('Error adding vendor', 'error')
    );
  }

  removeVendor() {
    this.ticketService.removeVendor().subscribe(
      () => this.showMessage('Vendor removed', 'success'),
      error => this.showMessage('Error removing vendor', 'error')
    );
  }

  addCustomer(isVip: boolean) {
    this.ticketService.addCustomer(isVip).subscribe(
      () => this.showMessage(`${isVip ? 'VIP' : 'Regular'} customer added`, 'success'),
      error => this.showMessage('Error adding customer', 'error')
    );
  }

  removeCustomer() {
    this.ticketService.removeCustomer().subscribe(
      () => this.showMessage('Customer removed', 'success'),
      error => this.showMessage('Error removing customer', 'error')
    );
  }

  private showMessage(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: type === 'success' ? ['success-snackbar'] : ['error-snackbar']
    });
  }
}