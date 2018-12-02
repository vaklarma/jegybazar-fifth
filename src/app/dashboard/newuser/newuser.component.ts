import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/user.service';
import {UserModel} from '../../shared/user-model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {
  userList: Observable<UserModel[]>;
  isCollapsed = true;

  constructor(private _userService: UserService) {

    this.userList = this._userService.getfbAllUser();

  }

  ngOnInit() {
  }

  delUser(param) {
    this._userService.deleteOneUser(param).subscribe(
      data => console.log(data)
    );
  }
  newUser() {
    console.log('új felhasználó');
  }
}
