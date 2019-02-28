import {Injectable} from '@angular/core';
import {ChatService} from './chat.service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {ChatMessageModel} from './model/chat.model';
import {UserService} from '../shared/user.service';
import {delay} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MockedChatService extends ChatService {

  private rooms$ = new BehaviorSubject<BehaviorSubject<ChatMessageModel[]>[]>([]);


  constructor(userService: UserService) {
    super(userService);
  }

  addMessage(roomId: string, msg: string): Observable<boolean> {
    const rooms = this.rooms$.getValue();
    const roomMessages = rooms[roomId].getValue();


    return this.userService.getCurrentUser()
      .pipe(delay(300))
      .switchMap(
        user => {
          roomMessages.push(
            new ChatMessageModel({
              $id: null,
              'msg': msg,
              userId: user.id,
              userName: user.name,
              userPictureUrl: user.profilePictureUrl
            })
          );
          rooms[roomId].next(roomMessages);
          return of(true);
        }
      );


  }

  getRoomMessages(roomId: string): Observable<ChatMessageModel[]> {
    const rooms = this.rooms$.getValue();
    if (rooms[roomId] == null) {
      //First init room
      rooms[roomId] = new BehaviorSubject<ChatMessageModel[]>([]);
      this.rooms$.next(rooms);
    }
    return rooms[roomId].asObservable();
  }
}
