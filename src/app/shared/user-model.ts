export class UserModel {
  id: number;
  name: string;
  email: string;
  address: string;
  dateOfBirth: string;
  gender: string;

  constructor(param?: UserModel) {
    if (param) {
      Object.assign(this, param);
    }
  }

  static get exampleUser(): UserModel {
    return {
      id: 0,
      name: 'Legyek Réka Matilda',
      email: 'legyekrekamatilda@valami.hu',
      address: 'Futrinka utca',
      dateOfBirth: '2015.01.08',
      gender: 'female',
    };
  }
}
