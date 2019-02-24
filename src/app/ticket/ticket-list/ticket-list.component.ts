import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {TicketModel} from '../../shared/ticket-model';
import {TicketService} from '../../shared/ticket.service';
import {UserService} from '../../shared/user.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketListComponent implements OnInit, OnChanges {
  tickets$: Observable<TicketModel[]>;
  isExistTickets = new BehaviorSubject<boolean>(false);

  constructor(private _ticketService: TicketService,
              public userService: UserService) {

  }

  ngOnInit() {

    this.tickets$ = this._ticketService.getAllTickets();
    this.tickets$.subscribe(
      data => this.isExistTickets.next(true)

  );

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('változások: ', changes);
  }

}
