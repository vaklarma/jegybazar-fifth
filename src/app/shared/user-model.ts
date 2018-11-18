export class UserModel {
  id: number;
  name: string;
  email: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  profilePictureUrl: string;

  constructor(param?: UserModel) {
    if (param) {
      Object.assign(this, param);
    }
  }

  static get exampleUser(): UserModel {
    return {
      id: 0,
      name: 'rékuci',
      email: 'legyekrekamatilda@valami.hu',
      address: 'Futrinka utca',
      dateOfBirth: '2015.01.08',
      gender: 'female',
      profilePictureUrl: 'https://demos.subinsb.com/isl-profile-pic/image/person.png'
    };
  }

  static get emptyUser(): UserModel {
    return {
      id: 0,
      name: 'empty user from UserModel',
      email: '',
      address: '',
      dateOfBirth: '',
      gender: '',
      profilePictureUrl: '',
    };
  }
}
