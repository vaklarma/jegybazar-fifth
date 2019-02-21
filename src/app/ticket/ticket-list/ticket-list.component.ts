import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {TicketModel} from '../../shared/ticket-model';
import {TicketService} from '../../shared/ticket.service';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  tickets$: Observable<TicketModel[]>;
  isExistTickets = true;

  constructor(private _ticketService: TicketService,
              public userService: UserService) {
  }

  ngOnInit() {
    this.tickets$ = this._ticketService.getAllTickets();
    this.tickets$.subscribe(
      data => {
        if (data) {
          this.isExistTickets = true;
        }
      }
    );
  }

}
