import {Component, OnInit} from '@angular/core';
import {EventService} from '../../shared/event.service';
import {EventModel} from '../../shared/event-model';
import {TicketService} from '../../shared/ticket.service';
import {TicketModel} from '../../shared/ticket-model';
import {UserService} from '../../shared/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {
  public events: EventModel[];
  public ticket: TicketModel;

  constructor(private _eventService: EventService,
              private _userService: UserService,
              private _ticketService: TicketService,
              private _router: Router) {
  }

  ngOnInit() {
    this.ticket = new TicketModel(TicketModel.emptyTicket);
    this.ticket.sellerUserId = this._userService.getCurrentUser().id;
    this.events = this._eventService.getAllEvents();
  }

  onSubmit() {
    console.log('submitted');
    console.log(this.ticket);
    this._ticketService.create(this.ticket);
    this._router.navigate(['ticket']);

  }

}
