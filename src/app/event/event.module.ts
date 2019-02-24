import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EventRoutingModule} from './event-routing.module';
import {EventComponent} from './event.component';
import {EventListComponent} from './event-list/event-list.component';
import {EventDetailComponent} from './event-detail/event-detail.component';
import {FormsModule} from '@angular/forms';
import {AlertModule} from 'ngx-bootstrap';
import {EventcardModule} from './eventcard/eventcard.module';
import {CoreModule} from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    EventRoutingModule,
    EventcardModule,
    FormsModule,
    AlertModule,
    CoreModule
  ],
  declarations: [
    EventComponent,
    EventListComponent,
    EventDetailComponent,
  ],

})
export class EventModule {
}
