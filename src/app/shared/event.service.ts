import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {EventModel} from './event-model';
import {map} from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

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

  // save(param: EventModel) {
  //   // return this._http.post(`${environment.firebase.baseUrl}/tickets.json`, param)
  //   // // ez itt amiatt kell, hogy meglegyen a fbid objektumon belul is,
  //   // // mert kesobb epitunk erre az infora
  //   // // viszont ezt csak a post valaszaban kapjuk vissza
  //   // // es legalabb hasznaljuk a patch-et is :)
  //   //   .switchMap((fbPostReturn: { name: string }) => this._http.patch(
  //   //     `${environment.firebase.baseUrl}/tickets/${fbPostReturn.name}.json`,
  //   //     {id: fbPostReturn.name}
  //   //   ));
  //
  //
  //   if (param.id) { // udpate ag
  //     return this._http.put(`${environment.firebase.baseUrl}/events/${param.id}.json`, param)
  //       .subscribe();
  //   } else { // create ag
  //     return this._http.post<EventModel>(`${environment.firebase.baseUrl}/events.json`, param)
  //       .switchMap((fbPostResponse: { name: string }) => this._http.patch(
  //         `${environment.firebase.baseUrl}/events/${fbPostResponse.name}.json`,
  //         {id: fbPostResponse.name}
  //       ));
  //
  //
  //     // return this._http.post<EventModel>(`${environment.firebase.baseUrl}/events.json`, param);
  //     // return this._http.post<EventModel>(`${environment.firebase.baseUrl}/events.json`, param)
  //     //   .subscribe(
  //     //     (data) => {
  //     //       console.log('subscribe alól', data);
  //     //       this.modifyIdAfterPost(data).subscribe();
  //     //
  //     //     });
  //
  //   }
  // }
  save(param: EventModel) {
    console.log(param);
    if (param.id) { // udpate ag
      return this._http.put(`${environment.firebase.baseUrl}/events/${param.id}.json`, param);
    } else { // create ag
      return this._http.post(`${environment.firebase.baseUrl}/events.json`, param)
        .pipe(map((fbPostReturn: { name: string }) => fbPostReturn.name))
        .switchMap(fbId => this._http.patch(
          `${environment.firebase.baseUrl}/events/${fbId}.json`,
          {id: fbId}
        ));
    }
  }
  updateEvent(param) {
    return this._http.put(`${environment.firebase.baseUrl}/events/${param.id}.json`, param);
  }

  createEvent(param) {
    return this._http.post<EventModel>(`${environment.firebase.baseUrl}/events.json`, param)
      .switchMap((fbPostResponse: { name: string }) => this._http.patch(
        `${environment.firebase.baseUrl}/events/${fbPostResponse.name}.json`,
        {id: fbPostResponse.name}
      ));

  }

  modifyIdAfterPost(param) {
    console.log('Modify service: ', param.name);
    return this._http.patch(`${environment.firebase.baseUrl}/events/${param.name}.json`, {'id': `${param.name}`});
  }
// TODO: itt függőségeket kell kezelni

  delete(param: EventModel) {
    return this._http.delete(`${environment.firebase.baseUrl}/events/${param.id}.json`);
  }

  addTicket(eventId: string, ticketId: string): Observable<string> {
    return this._http.patch(
      `${environment.firebase.baseUrl}/events/${eventId}/tickets.json`,
      {[ticketId]: true}
    )
      .pipe(map(rel => Object.keys(rel)[0]));
  }

}

