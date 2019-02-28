export class ChatMessageModel {
  $id: string;
  msg: string;
  userId: string;
  userName: string;
  userPictureUrl: string;

  constructor(data?: ChatMessageModel) {
    if (data != null) {
      Object.assign(this, data);
    }

    const $idPropertyDescriptor = Object.getOwnPropertyDescriptor(this, '$id');
    $idPropertyDescriptor.enumerable = false;
    Object.defineProperty(this, '$id', $idPropertyDescriptor);

  }
}
