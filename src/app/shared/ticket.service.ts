import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/combineLatest';
import {combineLatest, forkJoin, from, Observable, of, zip} from 'rxjs';
import {first, flatMap, map, tap} from 'rxjs/operators';
import {EventModel} from './event-model';
import {EventService} from './event.service';
import {TicketModel} from './ticket-model';
import {UserModel} from './user-model';
import {UserService} from './user.service';
import {AngularFireDatabase} from '@angular/fire/database';


@Injectable()
export class TicketService {

  constructor(private _eventService: EventService,
              private _userService: UserService,
              private afDb: AngularFireDatabase,
              private _http: HttpClient) {
  }


  // Mi is tortenik itt, mert izi :) - logikai lepesekkel, hogy hogyan epulunk fel
  // 1. lepesben lekerjuk http.get-el az osszes ticketet, amik objectben erkeznek meg
  //    {key1: ticketObject1, key2: TicketObject2, key3: ticketObject3, ...}
  // 2. lepesben ezt atalakitjuk tombbe Object.values() segitsegevel
  //    [ticketObject1, ticketObject2, ticketObject3, ...]
  // 3. lepesben vegigmegyunk minden ticketObjectX-en es az Observable.zip() segitsegevel minden ticketObjectX-t atalakitunk
  //    3.a) krealunk 3 streamet: ticketObjectX-nek, illetve Eventnek es Usernek a ticketObjectX-ben tarolt id-k alapjan
  //      ticketObjectX-nek azert kell observable-t generalni, hogy alkalmazni tudjuk ra is a .zip()-et
  //    3.b) miutan a 2 uj streamunk is visszatert ertekkel egybefuzzuk az utolso parameterkent megadott fat arrow function-el
  //    3.c) es csinalunk belole egy uj streamet, amiben 1 ertek van, es ez az osszefuzott verzio
  //         ezen a ponton van egy [zipStream1, zipStream2, zipStream3, ...]
  // 4. osszeallitjuk a vegso streamunket
  //    4.a) Observable.forkJoin segitsegevel az osszes tombben kapott streamunk utolso elemet osszefuzzuk 1 tombbe
  //         es a keletkezett uj streamen ezt az 1 elemet emitteljuk
  //    4.b) mivel minket csak az osszefuzott ertek erdekel a streamen ezert a switchmap-el erre valtunk
  // ----------
  // Gondolatkiserlet: itt azert erdemes megnezni a devtoolbar network tabjat XHR szuresben,
  //                   es vegiggondolni, hogy hogy lehetne spórolni ezekkel a keresekkel!
  // -----
  // puffancs uzeni: "elkepzelheto", hogy egyszerubb megoldas is van, de szerintem ez szep
  //                 es mar nagyon vagytam valami agyzsibbasztora a projektben :)

  getAllTickets(): Observable<any> {

    return this.afDb.list<TicketModel>(`tickets/`)
      .valueChanges()
      .pipe(
        map(
          ticketsArray => ticketsArray.map(
            ticket =>
              zip(
                of(ticket),
                this._eventService.getEventById(ticket.eventId),
                this._userService.getUserById(ticket.sellerUserId),
                (t: TicketModel, e: EventModel, u: UserModel) => {
                  //   return t.setEvent(e).setSeller(u);
                  return {
                    ...t,
                    event: e,
                    seller: u
                  };
                })
          )))
      .switchMap(zipStreamArray => forkJoin(zipStreamArray));
  }

  getOneOnce(id: string) {
    return this.getOne(id).pipe(first());
  }

  getOne(id: string): Observable<TicketModel> {

    return this.afDb.object<TicketModel>(`tickets/${id}`)
      .valueChanges()
      .pipe(
        flatMap(
          ticketFirebaseRemoteModel => {
            return combineLatest(
              of(new TicketModel(ticketFirebaseRemoteModel)),
              this._eventService.getEventById(ticketFirebaseRemoteModel.eventId),
              this._userService.getUserById(ticketFirebaseRemoteModel.sellerUserId),
              (t: TicketModel, e: EventModel, u: UserModel) => {
                return t.setEvent(e).setSeller(u);
              });
          }
        ));
  }

  create(ticket: TicketModel) {

    return from(this.afDb.list(`tickets`)
      .push(ticket))
      .pipe(
        map(
          resp => resp.key
        )
      )
      .pipe(
        tap(
          ticketId => combineLatest(
            this._eventService.addTicket(ticket.eventId, ticketId),
            this._userService.addTicket(ticketId)
          )
        ));
  }

  modify(ticket: TicketModel) {
    // return this._http
    //   .put(`${environment.firebase.baseUrl}/tickets/${ticket.id}.json`, ticket);

    return from(this.afDb.object(`tickets/${ticket.id}`)
      .update(ticket));

  }

  deleteTicket(joinedTickets) {
// ??? What happen when it has error during delete ?? I don't know....
    for (let i = 0; i < joinedTickets.length; i++) {
      from(
        this.afDb.list(`tickets/${joinedTickets[i]}`).remove()
      );
    }
    return of(true);
  }


}

