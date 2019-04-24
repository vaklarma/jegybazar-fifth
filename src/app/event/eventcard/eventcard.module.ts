import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EventcardComponent} from './eventcard.component';
import {RouterModule} from '@angular/router';
import {TooltipModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TooltipModule.forRoot(),
  ],
  declarations: [
    EventcardComponent,
  ],
  exports: [
    EventcardComponent
  ],
})
export class EventcardModule { }
