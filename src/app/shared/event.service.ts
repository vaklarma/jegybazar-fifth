import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {EventModel} from './event-model';
import {map, switchMap} from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {AngularFireDatabase} from '@angular/fire/database';
import {from} from 'rxjs';

@Injectable()
export class EventService {

  constructor(
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

    return from(this.afDb.list(`events/`)
      .push(param))
      .pipe(
        switchMap(
          resp => {
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


    const evId = param.id;
    if (evId) {
      return from(this.afDb.object(`events/${evId}`)
        .update(
          {
            ...param
          }
        ));
    }
    console.log('update event');
  }

  delete(param: EventModel) {

    return from(this.afDb.list(`events/${param.id}`).remove());
  }


  addTicket(eventId: string, ticketId: string): Observable<any> {

    return from(
      this.afDb.object(`events/${eventId}/tickets/${ticketId}`)
        .set(true)
    );
  }

}

