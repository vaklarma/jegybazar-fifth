import {AfterViewChecked, Component, DoCheck, OnInit} from '@angular/core';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.css']
})
export class JumbotronComponent implements OnInit, DoCheck, AfterViewChecked {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {
    console.log('Jumbotron AfterViewChecked');

  }

  ngDoCheck(): void {
    console.log('Jumbotron DoCheck');
  }

}
