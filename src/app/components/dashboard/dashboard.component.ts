import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { WebSocketService } from '../../services/websocket.service';
import { Subscription, throttleTime } from 'rxjs';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  chart: Chart | undefined;
  private subscription: Subscription | undefined;
  ticketCount: number = 0;
  private labels: string[] = [];
  private data: number[] = [];

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit() {
    this.createChart();
    this.subscribeToTicketCount();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  createChart() {
    this.chart = new Chart('ticketSalesChart', {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Available Tickets',
          data: this.data,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        animation: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Ticket Count'
            },
            beginAtZero: true
          }
        }
      }
    });
  }

  subscribeToTicketCount() {
    this.subscription = this.webSocketService.getTicketCount().pipe(
      throttleTime(1000) // Throttle updates to once per second
    ).subscribe(count => {
      this.ticketCount = count;
      this.updateChart(count);
    });
  }

  updateChart(count: number) {
    if (this.chart) {
      const now = new Date();
      this.labels.push(now.toLocaleTimeString());
      this.data.push(count);

      // Keep only the last 20 data points for better visibility
      if (this.labels.length > 20) {
        this.labels.shift();
        this.data.shift();
      }

      this.chart.data.labels = this.labels;
      this.chart.data.datasets[0].data = this.data;
      this.chart.update();
    }
  }
}