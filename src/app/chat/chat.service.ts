import {Injectable, Optional} from '@angular/core';
import {UserService} from '../shared/user.service';
import {Observable} from 'rxjs';
import {ChatMessageModel} from './model/chat.model';
import {AngularFireDatabase} from '@angular/fire/database';
import {delay, first, map, switchMap} from 'rxjs/operators';
import * as moment from 'moment';
import {ChatFriendModel} from './model/chat-friend.model';
import {ChatCallModell} from './model/chat-call.modell';

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

  getMyFriendList(): Observable<ChatFriendModel[]> {
    return this.userService.getCurrentUser()
      .pipe(
        first()
      )
      .pipe(
        switchMap(
          user => {
            return this.afDb.list(`${ChatService.PATH}/chat_friend_list/${user.id}`)
              .snapshotChanges()
              .pipe(
                map(
                  friends =>
                    friends.map(
                      friend => {
                        return new ChatFriendModel(Object.assign(friend, {
                          id: friend.payload.key, ...friend.payload.val(),
                          name: friend.payload.key, ...friend.payload.val(),
                          profilePictureUrl: friend.payload.key, ...friend.payload.val(),
                        }));
                      }
                    )
                )
              );
          }
        )
      );
  }

  addChatWait(roomId: string, friend: ChatFriendModel) {
    this.userService.getCurrentUser()
      .pipe(
        first()
      )
      .subscribe(
        user => {
          this.afDb.object(`chat_wait/${friend.id}/${user.id}`)
            .set({
                'id': friend.id,
                'roomId': roomId,
                'friend': new ChatFriendModel({id: user.id, name: user.name, profilePictureUrl: user.profilePictureUrl})
              }
            );
        });
  }


  getChatCallWatcher(): Observable<ChatCallModell[]> {
    return this.userService.getCurrentUser()
      .pipe(
        first()
      )
      .pipe(
        switchMap(
          user => {
            // console.log(user);
            return this.afDb.list<ChatCallModell>(`chat_wait/${user.id}`)
              .valueChanges()
              .pipe(
                map(
                  calls => {
                    return calls.map(
                      call => {
                        console.log('Belső map', call.$id);
                        return call;
                      }
                    );
                  }
                )
              )
              ;
          }
        )
      );
  }

  // getChatCallWatcher(): Observable<ChatCallModell[]> {
  //   return this.userService.getCurrentUser()
  //     .pipe(
  //       first()
  //     )
  //     .pipe(
  //       switchMap(
  //         user => {
  //           // console.log(user);
  //           return this.afDb.list(`chat_wait/${user.id}`)
  //             .snapshotChanges()
  //             .pipe(
  //               map(
  //                 calls => {
  //                   console.log(calls);
  //                   return calls.map(
  //                     call =>
  //                       new ChatCallModell(Object.assign(call, {
  //                         $id: call.payload.key, ...call.payload.val(),
  //                         roomId: call.payload.key, ...call.payload.val(),
  //                         friend: new ChatFriendModel(Object.assign(call, {
  //                           $id: call.payload.key, ...call.payload.val(),
  //                           name: call.payload.key, ...call.payload.val(),
  //                           profilePictureUrl: call.payload.key, ...call.payload.val(),
  //                         }))
  //                       }))
  //                   );
  //                 }
  //               )
  //             )
  //             ;
  //         }
  //       )
  //     );
  //
  // }

  removeWatcher(id: string) {
    this.userService.getCurrentUser()
      .pipe(
        first()
      )
      .pipe(
        delay(1000)
      )
      .subscribe(
        user => {
          this.afDb.object(`chat_wait/${user.id}/${id}`)
            .remove()
            .then();
        }
      );
  }
}
