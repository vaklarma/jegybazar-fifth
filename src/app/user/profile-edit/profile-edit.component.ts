import {Component, OnInit} from '@angular/core';
import {UserModel} from '../../shared/user-model';
import {UserService} from '../../shared/user.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  user: UserModel;

  constructor(private _userService: UserService,
              private  _location: Location,
  ) {
  }

  ngOnInit() {
    this.user = this._userService.isLoggedin ? this._userService.getCurrentUser() : new UserModel();
  }

  onSubmit() {
    if (this.user.id) {
      this._userService.updateUser(this.user);
    } else {
      this._userService.register(this.user);
    }
    // this._location.back();
  }


}
