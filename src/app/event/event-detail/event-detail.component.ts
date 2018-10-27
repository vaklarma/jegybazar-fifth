import {Component, OnInit} from '@angular/core';
import {EventModel} from '../../shared/event-model';
import {EventService} from '../../shared/event.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event: EventModel;

  constructor(private _eventService: EventService,
              private _route: ActivatedRoute,
              private _router: Router) {
  }

  ngOnInit() {
    const evId = +this._route.snapshot.params['id'];


    if (evId) {
      this.event = this._eventService.getEventById(evId);
    } else {
      this.event = new EventModel(EventModel.emptyEvent);
    }


    console.log(this.event);
    console.log(evId);
  }

  onSubmit(form) {
    if (this.event.id) {
      console.log('update ágban vagyunk');
      this._eventService.update(this.event);
    } else {
      console.log('új esemény');
      this._eventService.create(this.event);
    }
    console.log('Submitted', form);
    console.log('Edited Event', this.event);
    this._router.navigate(['/event/list']);
  }

}
