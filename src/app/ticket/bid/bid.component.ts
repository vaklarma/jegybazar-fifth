import {Component, OnDestroy, OnInit} from '@angular/core';
import {TicketService} from '../../shared/ticket.service';
import {TicketModel} from '../../shared/ticket-model';
import {UserService} from '../../shared/user.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {share} from 'rxjs/operators';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css']
})
export class BidComponent implements OnInit, OnDestroy {
  ticket$: Observable<TicketModel>;
  isLoggedIn$: any;
  id: any;
  progressRefreshTicket = false;
  private ticketWatcherSubscription: Subscription;

  // Ugyanis tudjuk, hogy nem akarjuk máshol használni, akkor meg minek ugye
  constructor(private _ticketService: TicketService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              userService: UserService) {
    this.isLoggedIn$ = userService.isLoggedIn$;
  }
  // láthatóság nélkül nem hozza létre a TS fordító osztályváltozóként.
  // így csak a konstruktorban használható. Performance okai vannak.

  ngOnDestroy(): void {
    this.ticketWatcherSubscription.unsubscribe();
  }

  ngOnInit() {

    this._activatedRoute.paramMap.subscribe(
      (params: ParamMap) => {
        this.refreshTicket(params.get('id'));
      }
    );
  }


  private refreshTicket(id: string) {
    this.progressRefreshTicket = true;
    const handle404 = () => {
      this._router.navigate(['404']);
    };

    this.ticket$ = this._ticketService.getOne(id).pipe(share());
    this.ticketWatcherSubscription = this.ticket$.subscribe(
      ticket => {
        this.progressRefreshTicket = false;
        if (ticket == null) {
          handle404();

        }
      },
      error => handle404()
    );
  }

  onBid() {
    this.progressRefreshTicket = true;
  }
}
