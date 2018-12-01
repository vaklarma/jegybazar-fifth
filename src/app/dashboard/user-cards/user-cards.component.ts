import {Component, Input, OnInit} from '@angular/core';
import {EventModel} from '../../shared/event-model';
import {UserModel} from '../../shared/user-model';

@Component({
  selector: 'app-user-cards',
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.css']
})
export class UserCardsComponent implements OnInit {
  @Input() oneUser: UserModel;
  constructor() { }

  ngOnInit() {
  }

}
