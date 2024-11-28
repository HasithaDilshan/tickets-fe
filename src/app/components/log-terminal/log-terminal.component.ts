import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebSocketService } from '../../services/websocket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-log-terminal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './log-terminal.component.html',
  styleUrls: ['./log-terminal.component.css']
})
export class LogTerminalComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('logContainer') private logContainer!: ElementRef;

  logs: string[] = [];
  ticketCount: number = 0;
  private logSubscription: Subscription | undefined;
  private ticketCountSubscription: Subscription | undefined;

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.logSubscription = this.webSocketService.getLogs().subscribe(logs => {
      this.logs = logs;
    });

    this.ticketCountSubscription = this.webSocketService.getTicketCount().subscribe(count => {
      this.ticketCount = count;
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnDestroy(): void {
    if (this.logSubscription) {
      this.logSubscription.unsubscribe();
    }
    if (this.ticketCountSubscription) {
      this.ticketCountSubscription.unsubscribe();
    }
  }

  scrollToBottom(): void {
    try {
      this.logContainer.nativeElement.scrollTop = this.logContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  clearLogs(): void {
    this.logs = [];
  }
}