import {Component, OnInit} from '@angular/core';
import {EventService} from '../../shared/event.service';
import {EventModel} from '../../shared/event-model';
import {TicketService} from '../../shared/ticket.service';
import {TicketModel} from '../../shared/ticket-model';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {
  public events: EventModel[];
  public ticket: TicketModel;

  constructor(private _eventService: EventService,
              private _ticketService: TicketService) {
  }

  ngOnInit() {
    this.ticket = new TicketModel(TicketModel.emptyTicket);
    this.events = this._eventService.getAllEvents();
  }

  onSubmit() {
    console.log('submitted');
    console.log(this.ticket);
  }

}
