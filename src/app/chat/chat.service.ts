import {Injectable, Optional} from '@angular/core';
import {UserService} from '../shared/user.service';
import {Observable} from 'rxjs';
import {ChatMessageModel} from './model/chat.model';
import {AngularFireDatabase} from '@angular/fire/database';
import {delay, map, switchMap, tap} from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private static PATH = '/chat';


  constructor(protected userService: UserService,
              @Optional() protected afDb?: AngularFireDatabase) {
  }

  addMessage(roomId: string, msg: string): Observable<boolean> {
    return this.userService.getCurrentUser()
      .pipe(
       // delay(1000)
      )
      .pipe(
        switchMap(
          user => {
            return new Observable<boolean>(
              observer => {
                const room = this.afDb.list(`${ChatService.PATH}/${roomId}`);
                room.push(
                  new ChatMessageModel({
                    $id: null,
                    'msg': msg,
                    userId: user.id,
                    userName: user.name,
                    userPictureUrl: user.profilePictureUrl,
                    created: moment().unix(),
                  })
                ).then(
                  () => {
                    observer.next(true);
                    observer.complete();
                  },
                  error => {
                    observer.next(false);
                    observer.error(error);
                    observer.complete();
                  }
                );
              }
            );
          }
        )
      );
  }

  getRoomMessages(roomId: string): Observable<ChatMessageModel[]> {


    return this.afDb.list(`${ChatService.PATH}/${roomId}`)
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(
            c => (

              new ChatMessageModel(Object.assign(c, {
                $id: c.payload.key, ...c.payload.val(),
                msg: c.payload.key, ...c.payload.val(),
                userId: c.payload.key, ...c.payload.val(),
                userName: c.payload.key, ...c.payload.val(),
                userPictureUrl: c.payload.key, ...c.payload.val(),
                created: +c.payload.key, ...c.payload.val(),

              }))
            )
          )
        )
      );
  }
}
