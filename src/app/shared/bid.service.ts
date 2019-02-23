import {Injectable} from '@angular/core';
import {TicketService} from './ticket.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {flatMap} from 'rxjs/operators';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class BidService {

  constructor(private ticketService: TicketService,
              private userService: UserService,
              private http: HttpClient) {
  }

  bid(ticketId: string, value: number) {
    // TODO replace userId
  //  const userId = 'mBUswvbahhRRDVfbfACIEgx3FKK2';
    let userId;

    this.userService.getCurrentUser().subscribe(
      user => {
        if (user) {
          userId = user.id;
        }
      }
    );

    return this.http
      .put(`${environment.firebase.baseUrl}/bids/${ticketId}/${userId}.json`, value)
      .pipe(flatMap(
        (data) => {
          return this.ticketService.getOneOnce(ticketId);
        }
      ))
      .pipe(flatMap(
        ticket => {
          return this.ticketService.modify(
            Object.assign(ticket, {currentBid: value, bidCounter: ++ticket.bidCounter, details: 'már lett licitálva'}));
        }
      ));
  }
}
