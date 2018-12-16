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
import {LoggedInGuard} from './shared/logged-in.guard';
import {FormsModule} from '@angular/forms';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './shared/auth-interceptor';
import { TicketDetailsCardComponent } from './ticket/ticket-details-card/ticket-details-card.component';
import { BiddingCardComponent } from './ticket/bidding-card/bidding-card.component';
import {Moment} from 'moment';
import {MomentModule} from 'ngx-moment';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    JumbotronComponent,
    EventcardComponent,
    FooterComponent,
    EventComponent,
    ...AppRoutingModule.routableComponents,
    SidebarComponent,
    TicketDetailsCardComponent,
    BiddingCardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CollapseModule.forRoot(),
    AppRoutingModule,
    AlertModule.forRoot(),
    HttpClientModule,
    AccordionModule.forRoot(),
    MomentModule
  ],
  providers: [
    EventService,
    UserService,
    TicketService,
    LoggedInGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
