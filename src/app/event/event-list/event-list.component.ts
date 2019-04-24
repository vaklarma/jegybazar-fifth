import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {EventModel} from '../../shared/event-model';
import {EventService} from '../../shared/event.service';
import {UserService} from '../../shared/user.service';
import {BehaviorSubject, fromEvent, Subscription} from 'rxjs';
import {delay, distinctUntilChanged, flatMap, map} from 'rxjs/operators';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],

})
export class EventListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('searchInput') searchInput: ElementRef;
  filteredText$ = new BehaviorSubject<string>(null);
  isLoggedIn: boolean;
  public events: EventModel[];
  private eventsSubscription: Subscription;
  private isLoggedInSubscription: Subscription;

  constructor(private _eventService: EventService,
              userService: UserService,
              private cdr: ChangeDetectorRef) {

   this.isLoggedInSubscription =  userService.isLoggedIn$
      .subscribe(
        isLoggedIn => this.isLoggedIn = isLoggedIn
      );

  }

  ngOnInit() {

    this.eventsSubscription = this._eventService.getAllEvents()
      .pipe(flatMap(
        events => {
          return this.filteredText$
            .pipe(map(
              filterText => {
                if (filterText === null) {
                  return events;
                } else {
                  return events.filter(
                    event => {
                      return event.name.toLocaleLowerCase().indexOf(filterText.toLowerCase()) > -1;
                    }
                  );
                }
              }
            ));
        }
      ))
      .subscribe(
        events => {
          this.events = events;
          this.cdr.detectChanges();
        }
      );
  }

  ngAfterViewInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(delay(600))
      .pipe(
        map(
          (event: Event) => {
            return (event.srcElement as HTMLInputElement).value;
          }
        )
      )
      .pipe(distinctUntilChanged())
      .subscribe(
        text => {
          if (text.length === 0) {
            text = null;
          }
          this.filteredText$.next(text);
        }
      );

    this.cdr.detach();

  }

  ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe();
    this.isLoggedInSubscription.unsubscribe();
  }

}

