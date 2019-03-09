import {Injectable, Optional} from '@angular/core';
import {UserService} from '../shared/user.service';
import {Observable} from 'rxjs';
import {ChatMessageModel} from './model/chat.model';
import {AngularFireDatabase} from '@angular/fire/database';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private static PATH = '/chat';

  constructor(protected userService: UserService,
              @Optional() protected afDb: AngularFireDatabase) {
  }

  addMessage(roomId: string, msg: string): Observable<boolean> {
    return null;
  }

  getRoomMessages(roomId: string): Observable<ChatMessageModel[]> {
    return this.afDb.list(`${ChatService.PATH}/${roomId}`)
      .valueChanges()
      .pipe(
        tap(
          todo => console.log(todo)
        )
      )
      .pipe(
        map(
          list =>
            list.map(
              chatMessage =>
                new ChatMessageModel(Object.assign(chatMessage, {$id: 'sdsdc'}))
            )));
  }
}
