import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements DoCheck, AfterViewChecked, AfterViewInit {
  isCollapsed = true;
  isLoggedIn;
  userName: string;

  constructor(public userService: UserService,
              private cdr: ChangeDetectorRef
  ) {

    this.userService.isLoggedIn$.subscribe(
      isLoggedIn => {
        this.isLoggedIn = isLoggedIn;

        this.cdr.detectChanges();
      }

    );
  }

  ngDoCheck(): void {
  //  console.log('NavbarComponent DoCheck');
  }

  ngAfterViewChecked(): void {
 //   console.log('NavbarComponent AfterViewChecked');
    this.userName = this.userService.currentUser;
  }

  ngAfterViewInit(): void {
    this.cdr.detach();
  }




  logout() {
    this.userService.logout();
  }




}
