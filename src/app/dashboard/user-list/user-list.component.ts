import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/user.service';
import {UserModel} from '../../shared/user-model';
import {Observable} from 'rxjs';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public userList: Observable<UserModel[]>;

  constructor(private _userService: UserService) {
  }

  ngOnInit() {
    this.userList =  this._userService.getfbAllUser();
  
  }


}
