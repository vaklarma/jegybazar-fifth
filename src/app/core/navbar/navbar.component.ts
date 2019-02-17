import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck, AfterViewChecked, AfterViewInit, OnChanges {
  isCollapsed = true;
  isLoggedIn;
  userName: string;

  constructor(public userService: UserService,
             ) {

    // this.userService.isLoggedIn$.subscribe(
    //   isLoggedIn => {
    //     this.isLoggedIn = isLoggedIn;
    //     this.cdr.detectChanges();
      //  debugger;
// }
//     );
  }

  ngDoCheck(): void {
    console.log('NavbarComponent DoCheck');
  }

  ngAfterViewChecked(): void {
    console.log('NavbarComponent AfterViewChecked');
  }

  ngAfterViewInit(): void {
 //   this.cdr.detach();
  }


  ngOnInit() {
    this.userName = this.userService.currentUser;

  }

  logout() {
    this.userService.logout();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('változás: ', changes);
  }


}
