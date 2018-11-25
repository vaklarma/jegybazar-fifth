import {Component, OnInit} from '@angular/core';
import {EventModel} from '../../shared/event-model';
import {EventService} from '../../shared/event.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {UserService} from '../../shared/user.service';


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event: EventModel;
  samplepictureUrl = 'http://localhost:4200/assets/newevent.png';
  editForm = false;

  constructor(private _eventService: EventService,
              private _route: ActivatedRoute,
              private _router: Router,
              private _location: Location,
              public userService: UserService) {
  }

  ngOnInit() {

    const evId = this._route.snapshot.params['id'];
    this.event = new EventModel(EventModel.emptyEvent);
    if (evId) {
    this._eventService.getEventById(evId).subscribe(evm => this.event = evm);
      this.editForm = true;
    } else {

    }

  }

  onSubmit() {
    console.log(this.event.id);
    // if (this.event.id) {
    //
    //   this._eventService.update(this.event);
    // } else {
    //
    //   this._eventService.create(this.event);
    // }
   // this._location.back();

  }

  navigateBack() {
    this._location.back();
  }

}
