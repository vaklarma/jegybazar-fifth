import {ChatFriendModel} from './chat-friend.model';

export class ChatCallModell {
  $id: string;
  roomId: string;
  friend?: ChatFriendModel;

  constructor(data?: ChatCallModell) {

    if (data != null) {
      Object.assign(this, data);
      // const $idPropertyDescriptor = Object.getOwnPropertyDescriptor(this, '$id');
      // $idPropertyDescriptor.enumerable = false;
      // Object.defineProperty(this, '$id', $idPropertyDescriptor);
    }


  }
}
