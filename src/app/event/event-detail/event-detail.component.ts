import {Component, OnInit} from '@angular/core';
import {EventModel} from '../../shared/event-model';
import {EventService} from '../../shared/event.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event: EventModel;
  samplepictureUrl = 'http://localhost:4200/assets/newevent.png';

  constructor(private _eventService: EventService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _location: Location) {
  }

  ngOnInit() {
    const evId = +this._route.snapshot.params['id'];


    if (evId) {
      this.event = this._eventService.getEventById(evId);
    } else {
      this.event = new EventModel(EventModel.emptyEvent);
    }

  }

  onSubmit(form) {
    console.log('detail');
    if (this.event.id) {

      this._eventService.update(this.event);
    } else {

      this._eventService.create(this.event);
    }
this._location.back();

  }

}
