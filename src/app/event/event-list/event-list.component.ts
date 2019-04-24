import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {EventModel} from '../../shared/event-model';
import {EventService} from '../../shared/event.service';
import {UserService} from '../../shared/user.service';
import {BehaviorSubject, fromEvent} from 'rxjs';
import {delay, distinctUntilChanged, flatMap, map} from 'rxjs/operators';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventListComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput') searchInput: ElementRef;
  filteredText$ = new BehaviorSubject<string>(null);
  public events$: Observable<EventModel[]>;

  constructor(private _eventService: EventService,
              public userService: UserService) {
  }

  ngOnInit() {

    this.events$ = this._eventService.getAllEvents()
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
      ));
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
  }

}

