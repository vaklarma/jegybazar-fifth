import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TicketModel} from '../../shared/ticket-model';
import {TicketService} from '../../shared/ticket.service';
import {UserService} from '../../shared/user.service';
import {BehaviorSubject, fromEvent, Subscription} from 'rxjs';
import {delay, distinctUntilChanged, flatMap, map} from 'rxjs/operators';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css'],

})
export class TicketListComponent implements OnInit, AfterViewInit, OnDestroy {
  isLoggedIn: boolean;
  tickets: TicketModel[];
  isExistTickets$ = new BehaviorSubject<boolean>(false);

  @ViewChild('ticketSearchInput') searchInput: ElementRef;
  filteredText$ = new BehaviorSubject<string>(null);
  private ticketSubscription: Subscription;
  private isLoggedInSubscription: Subscription;

  constructor(private _ticketService: TicketService,
              userService: UserService,
              private cdr: ChangeDetectorRef) {

    this.isLoggedInSubscription = userService.isLoggedIn$
      .subscribe(
        isLoggedIn => this.isLoggedIn = isLoggedIn
      );
  }

  ngOnInit() {

    this.ticketSubscription = this._ticketService.getAllTickets()
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
      )
      .subscribe(
        tickets => {
          this.tickets = tickets;
          this.isExistTickets$.next(true);
          this.cdr.detectChanges();
        }
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

    this.cdr.detach();
  }

  ngOnDestroy(): void {
    this.ticketSubscription.unsubscribe();
    this.isLoggedInSubscription.unsubscribe();
  }

}
