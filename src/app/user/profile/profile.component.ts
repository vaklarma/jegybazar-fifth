import {Component, OnInit} from '@angular/core';
import {UserModel} from '../../shared/user-model';
import {UserService} from '../../shared/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currUser: UserModel;

  constructor(private _userService: UserService) {
  }


  ngOnInit() {
    this.currUser = this._userService.getCurrentUser();
  }


}
