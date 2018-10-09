import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;

  constructor(private _usercervice: UserService) {
  }

  ngOnInit() {
  }

  logout() {
this._usercervice.logout();
  }
}
