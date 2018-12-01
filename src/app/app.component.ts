import {Component} from '@angular/core';
import {UserService} from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _userService: UserService) {
    console.log('Userservice isloggedIn: ', this._userService.isLoggedin);


    //  this._userService.login('angular', 'angular');
    // console.log('auto login az app.component.ts - ből');
  }
}
