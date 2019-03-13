import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnChanges, SimpleChanges} from '@angular/core';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewChecked, AfterViewInit, OnChanges {
  isCollapsed = true;
  userName: string;


  constructor(public userService: UserService,
              private cdr: ChangeDetectorRef
  ) {

  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();

// it simulates when the server is slow
    setTimeout(() => {
      this.userName = this.userService.currentUserName;
    }, 2000);
  }

  ngAfterViewInit(): void {
    this.cdr.detach();
  }

  logout() {
    this.userService.logout();
  }


}
