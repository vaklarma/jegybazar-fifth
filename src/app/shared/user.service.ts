import {Injectable} from '@angular/core';
import {UserModel} from './user-model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedin = false;
  private _user: UserModel;

  constructor(private _router: Router) {
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
}
