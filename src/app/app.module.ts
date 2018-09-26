import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {JumbotronComponent} from './jumbotron/jumbotron.component';
import {EventcardComponent} from './eventcard/eventcard.component';
import {FooterComponent} from './footer/footer.component';
import {CollapseModule} from 'ngx-bootstrap';
import { EventComponent } from './event/event.component';
import {AppRoutingModule} from './app-routing.module';



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


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
