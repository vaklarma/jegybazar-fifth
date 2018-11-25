export class EventModel {
 // id?: number;
  id?: string;
  name: string;
  date: string;
  pictureURL: string;
  description: string;

  constructor(param?: EventModel) {
    Object.assign(this, param);
  }
  static get emptyEvent() {
    return {
      'id': '',
    'name': '',
    'date': '',
    'pictureURL': '',
    'description': ''

  };
  }
}
