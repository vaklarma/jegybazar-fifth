import {Injectable} from '@angular/core';
import {TicketService} from './ticket.service';
import {TicketModel} from './ticket-model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketBidinfoService {
  allTickets: Observable<TicketModel[]>;

  constructor(private ticketService: TicketService,
              private http: HttpClient) {
  }

  getTicketAndBid() {
    this.allTickets = this.ticketService.getAllTickets();
  }

  getBids() {
    return this.http.get(`${environment.firebase.baseUrl}/bids.json`);
  }
}
