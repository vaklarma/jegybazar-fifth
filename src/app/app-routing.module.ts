import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {ProfileComponent} from './profile/profile.component';
import {ProfileEditComponent} from './profile-edit/profile-edit.component';
import {EventDetailComponent} from './event-detail/event-detail.component';
import {EventListComponent} from './event-list/event-list.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AboutComponent} from './about/about.component';
import {BidComponent} from './bid/bid.component';
import {TicketDetailComponent} from './ticket-detail/ticket-detail.component';
import {TicketListComponent} from './ticket-list/ticket-list.component';
import {TicketComponent} from './ticket/ticket.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent }
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
static routableComponents = [
  LoginComponent,
  RegistrationComponent,
  ProfileComponent,
  ProfileEditComponent,
  EventDetailComponent,
  EventListComponent,
  PageNotFoundComponent,
  AboutComponent,
  HomeComponent,
  BidComponent,
  TicketDetailComponent,
  TicketListComponent,
  TicketComponent,
];
}
