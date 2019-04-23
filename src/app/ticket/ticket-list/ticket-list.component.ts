import {AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {TicketModel} from '../../shared/ticket-model';
import {TicketService} from '../../shared/ticket.service';
import {UserService} from '../../shared/user.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketListComponent implements OnInit, AfterViewInit {
  tickets$: Observable<TicketModel[]>;
  isExistTickets$ = new BehaviorSubject<boolean>(false);

  @ViewChild('searchInput') searchInput: ElementRef;
  filteredText$ = new BehaviorSubject<string>(null);

  constructor(private _ticketService: TicketService,
              public userService: UserService) {

  }

  ngOnInit() {

    this.tickets$ = this._ticketService.getAllTickets();
    this.tickets$.subscribe(
      data => this.isExistTickets$.next(true)
    );
  }



  ngAfterViewInit(): void {



    console.log(this.searchInput);


    // setTimeout(() => {
    //   console.log(this.searchInput);
    // }, 50);

  }
}
