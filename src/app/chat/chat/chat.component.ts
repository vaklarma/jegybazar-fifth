import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ChatWindowConfig} from '../model/chat-window-config';
import {ChatService} from '../chat.service';
import {ChatFriendModel} from '../model/chat-friend.model';
import {UserService} from '../../shared/user.service';
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush, // it will be very slow without OnPush mode
  providers: [ChatService]
})
export class ChatComponent {
  windows$ = new BehaviorSubject<ChatWindowConfig[]>([]);


  constructor(private userService: UserService,
              private chatService: ChatService) {

    this.chatService.getChatCallWatcher()
      .subscribe(
        data => {
          if (data != null && data.length > 0) {
            data.forEach(
              call => {
               this.openChat({title: call.friend.name, roomId: call.roomId, friend: call.friend});
                this.chatService.removeWatcher(call.friend.id);
              }
            );
          }
        }
      );

  }


  openChat(config: ChatWindowConfig) {
    const windows = this.windows$.getValue();
    if (windows.find(_config => _config.roomId === `friend_list/${config.roomId}`) == null) {
      if (config.id === null) {
        // default
        config.id = `${config.roomId}${new Date().getTime()}`;
      }
      if (config.closeable == null) {
        // default
        config.closeable = true;
      }
      config.roomId = `friend_list/${config.roomId}`;


      windows.push(config);
      this.windows$.next(windows);
    }
  }

  removeChat(id: string) {
    const windows = this.windows$.getValue();
    const configIndex = windows.findIndex(config => config.id === id);
    if (configIndex > -1) {
      windows.splice(configIndex, 1);
      this.windows$.next(windows);
    }
  }

  onSelectFriend(friend: ChatFriendModel) {
    this.userService.getCurrentUser()
      .pipe(
        first()
      )
      .subscribe(
        user => {
          const roomId = `${user.id}-${friend.id}`;
          this.openChat({title: friend.name, roomId: roomId, closeable: true, 'friend': friend});
          this.chatService.addChatWait(roomId, friend);
        }
      );


  }
}
