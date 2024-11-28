import { Injectable, OnDestroy } from '@angular/core';
import { CompatClient, Stomp, StompSubscription } from '@stomp/stompjs';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService implements OnDestroy {
  private connection: CompatClient | undefined = undefined;
  private logSubscription: StompSubscription | undefined;
  private ticketCountSubscription: StompSubscription | undefined;

  private logs: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private ticketCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {
    this.connection = Stomp.client('ws://localhost:8080/websocket');
    this.connection.connect({}, () => {
      this.subscribeLogs();
      this.subscribeTicketCount();
    });
  }

  private subscribeLogs(): void {
    if (this.connection) {
      this.logSubscription = this.connection.subscribe('/tickets/logs', message => {
        const currentLogs = this.logs.value;
        this.logs.next([...currentLogs, message.body]);
      });
    }
  }

  private subscribeTicketCount(): void {
    if (this.connection) {
      this.ticketCountSubscription = this.connection.subscribe('/tickets/ticketCount', message => {
        this.ticketCount.next(parseInt(message.body, 10));
      });
    }
  }

  public getLogs(): Observable<string[]> {
    return this.logs.asObservable();
  }

  public getTicketCount(): Observable<number> {
    return this.ticketCount.asObservable();
  }

  ngOnDestroy(): void {
    if (this.logSubscription) {
      this.logSubscription.unsubscribe();
    }
    if (this.ticketCountSubscription) {
      this.ticketCountSubscription.unsubscribe();
    }
  }
}