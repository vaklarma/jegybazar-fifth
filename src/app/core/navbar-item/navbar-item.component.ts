import {AfterViewChecked, Component, DoCheck, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar-item',
  templateUrl: './navbar-item.component.html',
  styleUrls: ['./navbar-item.component.css']
})
export class NavbarItemComponent {
  @Input() url: string;
  @Input() name: string;

  constructor() { }


}
