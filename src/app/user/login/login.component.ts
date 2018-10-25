import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public errorMsg: string;

  constructor(private _userService: UserService) {
  }

  ngOnInit() {
  }


  login(email: string, password: string) {

    if (!this._userService.login(email, password)) {
      this.errorMsg = 'Hiba a belépéskor !';
    }


  }

  clearError() {
    console.log('Error before : ', this.errorMsg);
    delete(this.errorMsg);
    console.log('Error: ', this.errorMsg);
  }
}
