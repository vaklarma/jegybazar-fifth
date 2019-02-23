import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnChanges, SimpleChanges} from '@angular/core';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewChecked, AfterViewInit, OnChanges {
  isCollapsed = true;
  isLoggedIn;
  userName;


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

  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
    if (this.userService.userId
      && this.isLoggedIn) {
      this.userService.getUserNameToNavbar().subscribe(
        data => this.userName = data
      );
    }

  }

  ngAfterViewInit(): void {
    this.cdr.detach();
  }

  logout() {
    this.userService.logout();
  }


}
