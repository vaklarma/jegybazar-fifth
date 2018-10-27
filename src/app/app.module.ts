import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NavbarComponent} from './core/navbar/navbar.component';
import {JumbotronComponent} from './core/jumbotron/jumbotron.component';
import {EventcardComponent} from './event/eventcard/eventcard.component';
import {FooterComponent} from './core/footer/footer.component';
import {AlertModule, CollapseModule} from 'ngx-bootstrap';
import {EventComponent} from './event/event.component';
import {AppRoutingModule} from './app-routing.module';
import {EventService} from './shared/event.service';
import {UserService} from './shared/user.service';
import {TicketService} from './shared/ticket.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    JumbotronComponent,
    EventcardComponent,
    FooterComponent,
    EventComponent,
    ...AppRoutingModule.routableComponents

  ],
  imports: [
    BrowserModule,
    CollapseModule.forRoot(),
    AppRoutingModule,
    AlertModule.forRoot(),



  ],
  providers: [EventService, UserService, TicketService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
