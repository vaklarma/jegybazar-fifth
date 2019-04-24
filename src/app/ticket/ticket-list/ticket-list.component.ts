import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {TicketModel} from '../../shared/ticket-model';
import {TicketService} from '../../shared/ticket.service';
import {UserService} from '../../shared/user.service';
import {BehaviorSubject, fromEvent} from 'rxjs';
import {delay, distinctUntilChanged, flatMap, map} from 'rxjs/operators';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketListComponent implements OnInit, AfterViewInit {
  tickets$: Observable<TicketModel[]>;
  isExistTickets$ = new BehaviorSubject<boolean>(false);

  @ViewChild('ticketSearchInput') searchInput: ElementRef;
  filteredText$ = new BehaviorSubject<string>(null);

  constructor(private _ticketService: TicketService,
              public userService: UserService) {

  }

  ngOnInit() {

    this.tickets$ = this._ticketService.getAllTickets()
      .pipe(
        flatMap(
          tickets => {
            return this.filteredText$
              .pipe(
                map(
                  filterText => {
                    if (filterText === null) {
                      return tickets;
                    } else {
                      return tickets.filter(
                        ticket => {
                          return ticket.event.name.toLocaleLowerCase().indexOf(filterText.toLowerCase()) > -1;
                        }
                      );
                    }
                  }
                )
              );
          }
        )
      );
    this.tickets$.subscribe(
      data => this.isExistTickets$.next(true)
    );
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(delay(600))
      .pipe(
        map((event: Event) => {
            return (event.srcElement as HTMLInputElement).value;
          }
        )
      )
      .pipe(
        distinctUntilChanged()
      )
      .subscribe(
        data => this.filteredText$.next(data)
      );


  }

}
