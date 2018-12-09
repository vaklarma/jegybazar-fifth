import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {EventModel} from './event-model';
import {map} from 'rxjs/operators';

@Injectable()
export class EventService {
  newEvId;

  constructor(private _http: HttpClient) {
  }

  getAllEvents(): Observable<EventModel[]> {
    return this._http.get(`${environment.firebase.baseUrl}/events.json`)
      .pipe(map(data => Object.values(data).map(evm => new EventModel(evm))));
  }

  getEventById(id: string) {
    return this._http.get<EventModel>(`${environment.firebase.baseUrl}/events/${id}.json`);
  }

  save(param: EventModel) {

    if (param.id) { // udpate ag
      return this._http.put(`${environment.firebase.baseUrl}/events/${param.id}.json`, param);
    } else { // create ag

      return this._http.post<EventModel>(`${environment.firebase.baseUrl}/events.json`, param);


    }
  }

  modifyIdAfterPost(param) {
    console.log('Modify service: ', param.name);
    return this._http.patch(`${environment.firebase.baseUrl}/events/${param.name}.json`, {'id': `${param.name}`});
  }

  delete(param: EventModel) {
    return this._http.delete(`${environment.firebase.baseUrl}/events/${param.id}.json`);
  }
}

