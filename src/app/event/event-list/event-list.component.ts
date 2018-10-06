import {Component, OnInit} from '@angular/core';
import {EventService} from '../../shared/event.service';
import {EventModel} from '../../shared/event-model';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  public eventGroupBy3: EventModel[];


  constructor(private _eventservice: EventService) {
  }

  ngOnInit() {
    this.eventGroupBy3 = this._eventservice.getAllEvents()
      .reduce((acc, curr: EventModel, ind: number) => {
        if (ind % 3 === 0) {
          acc.push([]);
        }
      acc[acc.length - 1].push(curr);
        return acc;
      }, []);
    console.log(this.eventGroupBy3);
  }

}
