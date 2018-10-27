export class EventModel {
  id: number;
  name: string;
  date: string;
  pictureURL: string;
  description: string;

  constructor(param?: EventModel) {
    Object.assign(this, param);
  }
  static get emptyEvent() {
    return {
      'id': 0,
    'name': '',
    'date': '',
    'pictureURL': '',
    'description': ''

  };
  }
}
