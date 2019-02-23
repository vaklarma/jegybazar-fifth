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


// ez jo pelda lehet smart es dumb componentre

  public eventsGrouppedBy3$: Observable<EventModel[][]>;

  constructor(private _eventService: EventService,
              public userService: UserService) {
  }

  ngOnInit() {

    this.eventsGrouppedBy3$ = this._eventService.getAllEvents()
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
      .pipe(map(data => {
        return data.reduce((acc: Array<any>, curr: EventModel, ind: number) => {
          if (ind % 3 === 0) {
            acc.push([]);
          }
          acc[acc.length - 1].push(curr);
          return acc;
        }, []);
      }));
  }

  ngAfterViewInit(): void {
    console.log(this.searchInput);
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
          console.log(text);
          if (text.length === 0) {
            text = null;
          }
          this.filteredText$.next(text);
        }
      );
  }

}

