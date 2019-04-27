export class ChatFriendModel {
  $id: string;
  name: string;
  profilePictureUrl: string;

  constructor(data?: ChatFriendModel) {
    if (data != null) {
      Object.assign(this, data);
    }
    const $idPropertyDescriptor = Object.getOwnPropertyDescriptor(this, '$id');
    $idPropertyDescriptor.enumerable = false;
    Object.defineProperty(this, '$id', $idPropertyDescriptor);
  }
}
