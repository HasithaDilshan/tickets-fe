import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuration } from '../models/configuration.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://localhost:8080/api/tickets';

  constructor(private http: HttpClient) { }

  configure(config: Configuration): Observable<void> {
    const transformedConfig = {
      ...config,
      ticketReleaseRate: 1000 / config.ticketReleaseRate,
      customerRetrievalRate: 1000 / config.customerRetrievalRate
    };

    return this.http.post<void>(`${this.apiUrl}/configure`, transformedConfig);
  }

  startSimulation(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/start`, {});
  }

  stopSimulation(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/stop`, {});
  }

  addVendor(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/vendor/add`, {});
  }

  removeVendor(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/vendor/remove`, {});
  }

  addCustomer(isVip: boolean): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/customer/add`, {}, { params: { isVip: isVip.toString() } });
  }

  removeCustomer(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/customer/remove`, {});
  }
}