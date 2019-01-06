import {Component, OnInit} from '@angular/core';
import {TicketService} from '../../shared/ticket.service';
import {TicketModel} from '../../shared/ticket-model';
import {UserService} from '../../shared/user.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css']
})
export class BidComponent implements OnInit {
  ticket: TicketModel;
  isLoggedIn: boolean;
  id: any;
  // láthatóság nélkül nem hozza létre a TS fordító osztályváltozóként.
  // így csak a konstruktorban használható. Performance okai vannak.
  // Ugyanis tudjuk, hogy nem akarjuk máshol használni, akkor meg minek ugye
  constructor(private _ticketService: TicketService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              userService: UserService) {
    this.isLoggedIn = true; //userService.isLoggedin;
  }

  ngOnInit() {

    this._activatedRoute.paramMap.subscribe(
      (params: ParamMap) => {
        this.refreshTicket(params.get('id'));
      }
    );
  }

  onRefreshTicket() {
    this.refreshTicket(this.ticket.id);
  }

  private refreshTicket(id: string) {
    const handle404 = () => {
      this._router.navigate(['404']);
    };
    this._ticketService.getOne(id)
      .subscribe(
        ticket => {
          if (ticket == null) {
            handle404();
          } else {
            this.ticket = ticket;
          }
        },
        error => handle404()
      );
  }
}
