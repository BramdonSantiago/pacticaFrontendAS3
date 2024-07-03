import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket, TicketPayload } from '../models/ticket.model';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'any'
})
export class ApiService {
    private url = environment.apiUrl;
    private token = environment.apiToken;

    
    constructor(private httpClient: HttpClient) { }

    getData(): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      });
      return this.httpClient.get(this.url, { headers });
    }

    createTicket(ticketData: Ticket): Observable<Ticket> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      });
      const payload: TicketPayload = {
        data: ticketData
      };
      return this.httpClient.post<Ticket>(this.url, payload, { headers });
    }


    updateTicket(ticketId: number, ticketData: Ticket): Observable<Ticket> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      });
      const payload: TicketPayload = {
        data: ticketData
      };
      return this.httpClient.put<Ticket>(this.url+`/${ticketId}`, payload, { headers });
    }

    deleteTicket(ticketId: number): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      });
      return this.httpClient.delete(this.url+`/${ticketId}`, { headers });
    }



}