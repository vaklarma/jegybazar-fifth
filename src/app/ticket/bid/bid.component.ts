import {Component, OnInit} from '@angular/core';
import {TicketService} from '../../shared/ticket.service';
import {TicketModel} from '../../shared/ticket-model';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css']
})
export class BidComponent implements OnInit {
  ticket: TicketModel;
  next = 'Menjünk';

  constructor(private _ticketService: TicketService) {
  }

  ngOnInit() {
    this._ticketService.getOne('-Ky0Hz4uP2Es-j9q_Cmw').subscribe(
      ticket => {
        this.ticket = ticket;

      }
    );
  }

}
