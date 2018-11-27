import {Injectable} from '@angular/core';
import {EventModel} from './event-model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Injectable()
export class EventService {


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

  // A gond az, hogy a firebase id az event ben is az id és ha nem tesszük bele ugyanazt, akkor nem lesz belistázva.
  // ezért PATCH - el módosítani kell az ID -t, miután megtörtént a POST . Azért utána, mert addig nem tudjuk, hogy mi az ID, amit a
  // firebase generált.
  // Ha már tudjuk, akkor betesszük
  //
  // "-Ky0CqiDVsXAbshfMZ6H" : {
  //   "address" : "marcsa var 42.",
  //   "dateOfBirth" : "2000-01-01",
  //   "email" : "marcsa@marcsa.hu",
  //   "gender" : "female",
  //   "id" : "-Ky0CqiDVsXAbshfMZ6H",
  //   "name" : "Marcsa",
  //   "profilePictureUrl" : "https://i.pinimg.com/236x/2c/80/53/2c80536d805ca08bd1f87d9db9fb9955--funny-wallpapers-wallpaper-iphone.jpg"
  // },

  modifyIdAfterPost(param) {
    console.log('Modify service: ', param.name);
    return this._http.patch(`${environment.firebase.baseUrl}/events/${param.name}.json`, {'id': `${param.name}`});
  }


  delete(param: EventModel) {
    console.log(param.id);
    return this._http.delete(`${environment.firebase.baseUrl}/events/${param.id}.json`);
  }

}


