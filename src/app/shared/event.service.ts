import {Injectable} from '@angular/core';
import {EventModel} from './event-model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';



@Injectable()
export class EventService {
  private _events: EventModel[];


  constructor(private _http: HttpClient) {
  }

  getAllEvents(): Observable<EventModel[]> {
    return this._http.get(`${environment.firebase.baseUrl}/events.json`)
      .pipe(map(data => Object.values(data).map(evm => new EventModel(evm))));
  }

  getEventById(id: number) {
    return this._http.get<EventModel>(`${environment.firebase.baseUrl}/events/${id}.json`);

  }

  update(param: EventModel) {

    this._events = this._events.map(ev => {
      if (ev.id === param.id) {
        return {...param};
      } else {
        return ev;
      }
    });
    console.log(this._events);
  }

  create(param: EventModel) {
    this._events = [
      ...this._events,
      {
        id: this._events.reduce((x, y) => x.id > y.id ? x : y).id + 1,
        ...param,
      }
    ];
  }

  createFireBase(param: EventModel) {
    console.log(param);
    return this._http.post(`${environment.firebase.baseUrl}/events.json`, param);

  }

  modifyEventIdwithName(param) {
    console.log('Modify service: ', param.name);
    return this._http.patch(`${environment.firebase.baseUrl}/events/${param.name}.json`, {'id': `${param.name}`});
  }

}


