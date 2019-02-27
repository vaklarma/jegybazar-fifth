import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './user/login/login.component';
import {PageNotFoundComponent} from './core/page-not-found/page-not-found.component';
import {TicketComponent} from './ticket/ticket.component';
import {ProfileComponent} from './user/profile/profile.component';
import {ProfileEditComponent} from './user/profile-edit/profile-edit.component';
import {TicketListComponent} from './ticket/ticket-list/ticket-list.component';
import {TicketDetailComponent} from './ticket/ticket-detail/ticket-detail.component';
import {BidComponent} from './ticket/bid/bid.component';
import {LoggedInGuard} from './shared/logged-in.guard';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {
    path: '',
    loadChildren: './event/event.module#EventModule',
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

  {path: '', loadChildren: './about/about.module#AboutModule'},
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
    LoginComponent,
    ProfileComponent,
    ProfileEditComponent,
    PageNotFoundComponent,
  ];
}
