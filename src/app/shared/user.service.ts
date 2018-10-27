import {Injectable} from '@angular/core';
import {UserModel} from './user-model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedin = false;
  private _user: UserModel;
  private _allUser: UserModel[];

  constructor(private _router: Router) {
    this._allUser = [
      new UserModel({
        'id': 1,
        'name': 'Első user',
        'email': 'Első@valami.hu',
        'address': 'Futrinka utca',
        'dateOfBirth': '2015.01.08',
        'gender': 'female',
      }),
      new UserModel({
        'id': 2,
        'name': 'Második user',
        'email': 'Második@valami.hu',
        'address': 'Futrinka utca',
        'dateOfBirth': '2015.01.08',
        'gender': 'female',
      }),
      new UserModel({
        'id': 3,
        'name': 'Harmadik user',
        'email': 'Harmadik@valami.hu',
        'address': 'Futrinka utca',
        'dateOfBirth': '2015.01.08',
        'gender': 'female',
      }),
    ];
  }

  login(email: string, password: string): boolean {
    if (email === 'angular' && password === 'angular') {
      this._user = new UserModel(UserModel.exampleUser);
      this.isLoggedin = true;
      this._router.navigate(['/user']);
    }
    return false;

  }

  register(param?: UserModel) {
    if (param) {
      this._user = new UserModel(param);
    } else {
      this._user = new UserModel(UserModel.exampleUser);
    }
    this.isLoggedin = true;
    this._router.navigate(['/user']);
  }

  logout() {
    delete (this._user);
    this.isLoggedin = false;
    this._router.navigate(['/home']);

  }

  getCurrentUser() {
    if (this._user) {
      return this._user;

    } else {
      return new UserModel(UserModel.emptyUser);
    }

  }


  getAllUser(): UserModel[] {
    return this._allUser;
  }

  getUserById(id: number) {
    const user = this._allUser.filter(u => u.id === id);
    return user.length > 0 ? user[0] : new UserModel(UserModel.emptyUser);
  }
}
