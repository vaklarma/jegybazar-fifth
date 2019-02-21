import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements  AfterViewChecked, AfterViewInit, OnChanges {
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

  ngOnChanges(changes: SimpleChanges): void {

    this.cdr.detectChanges();
    this.userName = this.userService.currentUser;
    console.log('Navbar changes:', changes);
  }

  ngAfterViewChecked(): void {

    this.cdr.detectChanges();
    this.userName = this.userService.currentUser;

  }

  ngAfterViewInit(): void {
    this.cdr.detach();
  }

  logout() {
    this.userService.logout();
  }






}
