import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AlertModule, CollapseModule} from 'ngx-bootstrap';
import {AppRoutingModule} from './app-routing.module';
import {EventService} from './shared/event.service';
import {UserService} from './shared/user.service';
import {TicketService} from './shared/ticket.service';
import {LoggedInGuard} from './shared/logged-in.guard';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SidebarComponent} from './dashboard/sidebar/sidebar.component';
import {AccordionModule} from 'ngx-bootstrap/accordion';
import {HttpClientModule} from '@angular/common/http';
import {TicketDetailsCardComponent} from './ticket/ticket-details-card/ticket-details-card.component';
import {BiddingCardComponent} from './ticket/bidding-card/bidding-card.component';
import {MomentModule} from 'ngx-moment';
import 'moment/locale/hu';
import {BidFormComponent} from './ticket/bid-form/bid-form.component';
import {TicketBidInfoComponent} from './dashboard/ticket-bid-info/ticket-bid-info.component';
import * as firebase from 'firebase';
import {environment} from '../environments/environment';
import {EventcardModule} from './event/eventcard/eventcard.module';
import {CoreModule} from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,

    ...AppRoutingModule.routableComponents,
    SidebarComponent,
    TicketDetailsCardComponent,
    BiddingCardComponent,
    BidFormComponent,

    TicketBidInfoComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    HttpClientModule,
    AccordionModule.forRoot(),
    MomentModule,
    EventcardModule,
    CoreModule
  ],
  providers: [
    EventService,
    UserService,
    TicketService,
    LoggedInGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    firebase.initializeApp(environment.firebase);
  }
}
