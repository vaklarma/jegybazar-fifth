import {Component, OnInit} from '@angular/core';
import {EventService} from '../../shared/event.service';
import {EventModel} from '../../shared/event-model';
import {UserService} from '../../shared/user.service';
import {Observable} from 'rxjs';
import {map, reduce} from 'rxjs/operators';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  public eventGroupBy3$: Observable<EventModel[][]>;



  constructor(private _eventService: EventService,
              public userService: UserService) {
  }

  ngOnInit() {

    this.eventGroupBy3$ = this._eventService.getAllEvents()
      .pipe(map(data => {
        return data.reduce((acc, curr: EventModel, ind: number) => {
          if (ind % 3 === 0) {
            // @ts-ignore
            acc.push([]);
          }
          // @ts-ignore
          acc[acc.length - 1].push(curr);
          return acc;
        }, []);
      }));

  }

}
