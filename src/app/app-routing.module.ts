import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './user/login/login.component';
import {PageNotFoundComponent} from './core/page-not-found/page-not-found.component';
import {AboutComponent} from './about/about.component';
import {TicketComponent} from './ticket/ticket.component';
import {ProfileComponent} from './user/profile/profile.component';
import {ProfileEditComponent} from './user/profile-edit/profile-edit.component';
import {TicketListComponent} from './ticket/ticket-list/ticket-list.component';
import {TicketDetailComponent} from './ticket/ticket-detail/ticket-detail.component';
import {BidComponent} from './ticket/bid/bid.component';
import {LoggedInGuard} from './shared/logged-in.guard';
import {UserListComponent} from './dashboard/user-list/user-list.component';
import {UserCardsComponent} from './dashboard/user-cards/user-cards.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NewuserComponent} from './dashboard/newuser/newuser.component';
import {TicketBidInfoComponent} from './dashboard/ticket-bid-info/ticket-bid-info.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {
    path: 'event',
    loadChildren: './event/event.module#EventModule'
  },
  {
    path: 'ticket',
    component: TicketComponent,
    children: [
      {path: '', component: TicketListComponent},
      {path: 'new', component: TicketDetailComponent, canActivate: [LoggedInGuard]},
      {path: ':id', component: BidComponent},
    ]
  },
  {
    path: 'user',
    children: [
      {path: '', component: ProfileComponent, canActivate: [LoggedInGuard]},

      {path: 'edit', component: ProfileEditComponent, canActivate: [LoggedInGuard]},
      {path: 'profile', component: ProfileEditComponent, canActivate: [LoggedInGuard]},
      {path: 'login', component: LoginComponent},
      {path: 'registration', component: ProfileEditComponent},
    ]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {path: 'list', component: UserListComponent},
      {path: 'newuser', component: NewuserComponent},
      {path: 'ticketbidinfo', component: TicketBidInfoComponent},

    ]
  },

  {path: 'about', component: AboutComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static routableComponents = [
    HomeComponent,
    TicketComponent,
    TicketDetailComponent,
    TicketListComponent,
    BidComponent,
    AboutComponent,
    LoginComponent,
    ProfileComponent,
    ProfileEditComponent,
    PageNotFoundComponent,
    UserListComponent,
    UserCardsComponent,
    DashboardComponent,
    NewuserComponent,
  ];
}
