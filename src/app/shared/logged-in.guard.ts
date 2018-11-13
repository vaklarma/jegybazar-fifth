import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from './user.service';
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(private _userService: UserService,
              private _router: Router,
              private _location: Location) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._userService.isLoggedin) {
      return true;
    } else {
      console.log(this._location.path());
      this._router.navigate([this._location.path()]);
      return false;
    }
  }
}
