import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
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
export class ChatComponent implements OnInit {
  windows$ = new BehaviorSubject<ChatWindowConfig[]>([]);


  constructor(private userService: UserService) {
  }

  ngOnInit() {
    // this.openChat({
    //   title: 'test ablak',
    //   roomId: 'testelo',
    //   friend: new ChatFriendModel({$id: 'sdcsdc', name: 'valaki', profilePictureUrl: 'dsdcsdc'})
    // });
    // this.openChat({title: 'test ablak2', roomId: 'testelo2', friend: new ChatFriendModel()});
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
    console.log('closewindow');
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
        user => this.openChat({title: friend.name, roomId: `${user.id}-${friend.$id}`, closeable: true, 'friend': friend})
      );
  }
}
