import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;
  currentUser;
  userName: string;

  constructor(public userService: UserService) {


  }

  ngOnInit() {
this.userName = this.userService.currentUser;
    console.log('navbar username: ', this.currentUser);
  }

  logout() {
    this.userService.logout();
  }
}
