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


  save(param: EventModel) {
    console.log(param);
    if (param.id) {
      return this._http.put(`${environment.firebase.baseUrl}/events/${param.id}.json`, param);
    } else {
      return this._http.post(`${environment.firebase.baseUrl}/events.json`, param);
    }
  }

  updateFirebase(param: EventModel) {
    return this._http.put(`${environment.firebase.baseUrl}/events/${param.id}.json`, param);
  }

  createFireBase(param: EventModel) {
    return this._http.post(`${environment.firebase.baseUrl}/events.json`, param);
  }

  modifyEventIdwithName(param) {
    console.log('Modify service: ', param.name);
    return this._http.patch(`${environment.firebase.baseUrl}/events/${param.name}.json`, {'id': `${param.name}`});
  }

  delete(param: EventModel) {
    console.log(param.id);
    return this._http.delete(`${environment.firebase.baseUrl}/events/${param.id}.json`);
  }

}


