import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {EventModel} from './event-model';
import {map, switchMap} from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {AngularFireDatabase} from '@angular/fire/database';
import {from} from 'rxjs';

@Injectable()
export class EventService {

  constructor(
    private _http: HttpClient,
    private afDb: AngularFireDatabase
  ) {
  }

  getAllEvents(): Observable<EventModel[]> {
    return this.afDb.list(`events`)
      .snapshotChanges()
      .pipe(
        map(events =>
          events.map(event => new EventModel(
            Object.assign(event,
              {
                id: event.payload.key, ...event.payload.val(),
                name: event.payload.key, ...event.payload.val(),
                pictureURL: event.payload.key, ...event.payload.val(),
                description: event.payload.key, ...event.payload.val(),
                date: event.payload.key, ...event.payload.val(),
              })
          ))));
  }

  getEventById(id: string) {
    return this.afDb.object<EventModel>(`/events/${id}`)
      .valueChanges();
  }

  createEvent(param: EventModel) {
    console.log(param);

    // return from(this.afDb.object(`events/`)
    //   .set({
    //     '-Ky0E6CbE8qAxNntn8bj': {
    //       'date': '2018-01-03 13:00',
    //       'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo.',
    //       'id': '-Ky0E6CbE8qAxNntn8bj',
    //       'name': 'Téli Sziget Fesztivál',
    //       'pictureURL': 'http://www.fortitudemagazine.co.uk/wp-content/uploads/2017/04/sziget_og_image.jpg',
    //     },
    //     '-Ky0EDGGrXHMYdns10L_': {
    //       'date': '2017-11-23 21:00',
    //       'description': 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    //       'id': '-Ky0EDGGrXHMYdns10L_',
    //       'name': 'Diótörő Balett',
    //       'pictureURL': 'http://www.e-jegyiroda.hu/img/diotoro-jegyek-budapest-szeged-kecskemet-balett-mese-babjatek.jpg',
    //
    //     },
    //     '-Ky0EKWDcRlYVCoRxwUy': {
    //       'date': '2018-02-11 22:00',
    //       'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, necessitatibus.',
    //       'id': '-Ky0EKWDcRlYVCoRxwUy',
    //       'name': 'Macskák Musical',
    //       'pictureURL': 'https://pb2.jegy.hu/imgs/system-4/program/000/016/918/macskak-original-54100.jpg',
    //
    //     },
    //     '-Ky0EOBRvrSTeR2dw1zZ': {
    //       'date': '2017-08-03',
    //       'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo.',
    //       'id': '-Ky0EOBRvrSTeR2dw1zZ',
    //       'name': 'Fezen',
    //       'pictureURL': 'http://www.kate.hu/wp-content/uploads/2015/07/135599150312020929_fezen_2015_datummal.jpg'
    //     },
    //     '-Ky0EgjgM-yrJfRAa3Dr': {
    //       'date': '2017-11-23',
    //       'description': 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    //       'id': '-Ky0EgjgM-yrJfRAa3Dr',
    //       'name': 'SZIN',
    //       'pictureURL': 'https://www.koncert.hu/uploads/concerts/koncert-20140625-11470-szin_2014_2.jpg'
    //     },
    //     '-Ky0EmBImsuc6RPV0BIH': {
    //       'date': '2018-02-11',
    //       'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, necessitatibus.',
    //       'id': '-Ky0EmBImsuc6RPV0BIH',
    //       'name': 'Rockmaraton',
    //       'pictureURL': 'http://www.rockmaraton.hu/media/images/rockmaraton-2018-jegyvasarlas.jpg'
    //     },
    //     '-Ky0Euc2W2JkH-N8qw5z': {
    //       'date': '2017-08-03',
    //       'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo.',
    //       'id': '-Ky0Euc2W2JkH-N8qw5z',
    //       'name': 'Black Hat USA',
    //       'pictureURL': 'https://www.blackhat.com/images/page-graphics/metatag/event-logo-us17.png'
    //     },
    //     '-Ky0F3kr0eHrm5T8HgVP': {
    //       'date': '2017-11-23',
    //       'description': 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
    //       'id': '-Ky0F3kr0eHrm5T8HgVP',
    //       'name': 'TEDx',
    //       'pictureURL': 'https://i0.wp.com/www.tedxwellington.com/wp-content/uploads/2017/02/tedx-bulb.jpg'
    //     },
    //     '-Ky0FG-p593HsAFNPF_-': {
    //       'date': '2018-02-11',
    //       'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, necessitatibus.',
    //       'id': '-Ky0FG-p593HsAFNPF_-',
    //       'name': 'ng-conf',
    //       'pictureURL': 'https://cdn-images-1.medium.com/max/1270/1*2j7MOWb0s5pZpQLu7d-5CQ.png'
    //     }
    //   }));

    return from(this.afDb.list(`events/`)
      .push(param))
      .pipe(
        switchMap(
          resp => {
            console.log('switchMap');
            return from(this.afDb.object(`events/${resp.key}`)
              .update(
                {
                  id: resp.key,
                }
              )
            );
          }
        )
      );
  }

  save(param: EventModel) {
    console.log(param.id);
    if (param.id) { // udpate ag
      console.log('modosit');
      //  return this._http.put(`${environment.firebase.baseUrl}/events/${param.id}.json`, param);
      return from(this.afDb.object(`events/${param.id}`)
        .update(
          {
            ...param
          }
        ));
    }
  }

// TODO: itt függőségeket kell kezelni

  delete(param: EventModel) {
   // return this._http.delete(`${environment.firebase.baseUrl}/events/${param.id}.json`);
    return from(this.afDb.list(`events/${param.id}`).remove());
  }

  addTicket(eventId: string, ticketId: string): Observable<any> {

    return from(
      this.afDb.object(`events/${eventId}/tickets/${ticketId}`)
        .set(true)
    );
  }

}

