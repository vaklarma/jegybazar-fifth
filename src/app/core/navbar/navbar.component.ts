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

  constructor(public userService: UserService) {
  }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser().name;
  }

  logout() {
    this.userService.logout();
  }
}
