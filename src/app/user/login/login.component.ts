import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _userservice: UserService) {
  }

  ngOnInit() {
  }

  login(email: string, password: string) {
    this._userservice.login(email, password);

  }
}
