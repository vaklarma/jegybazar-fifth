import {Component, OnInit} from '@angular/core';
import {TicketService} from '../../shared/ticket.service';
import {TicketModel} from '../../shared/ticket-model';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css']
})
export class BidComponent implements OnInit {
  ticket: TicketModel;
  isLoggedIn: boolean;

  // láthatóság nélkül nem hozza létre a TS fordító osztályváltozóként.
  // így csak a konstruktorban használható. Performance okai vannak.
  // Ugyanis tudjuk, hogy nem akarjuk máshol használni, akkor meg minek ugye
  constructor(private _ticketService: TicketService,
               userService: UserService) {
    this.isLoggedIn = userService.isLoggedin;
  }

  ngOnInit() {
    this._ticketService.getOne('-Ky0Hz4uP2Es-j9q_Cmw').subscribe(
      ticket => {
        this.ticket = ticket;
      }
    );
  }


}
