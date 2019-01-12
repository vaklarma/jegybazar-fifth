import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
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

    return this._userService.isLoggedIn$.map(
      isLoggedIn => {
        if (isLoggedIn === false) {
          this._router.navigate(['/home']);
          console.log('Can activate: false ág');
          return false;

        }
        console.log(' Can activate: igaz ág');
        return true;
      }
    );

    //
    // if (this._userService.isLoggedIn$) {
    //   return true;
    // } else {
    //   console.log(this._location.path());
    //   this._router.navigate([this._location.path()]);
    //   return false;
    // }
  }
}
