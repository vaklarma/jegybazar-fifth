import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UserModel} from './user-model';

import {Observable} from 'rxjs/Observable';
import {first, flatMap, tap} from 'rxjs/operators';
import {from, ReplaySubject} from 'rxjs';

import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable()
export class UserService {
  isLoggedIn$ = new ReplaySubject<boolean>(1);
  currentUserName: string;

  public _user = new ReplaySubject<UserModel>(1);

  constructor(private _router: Router,
              private afAuth: AngularFireAuth,
              private afDb: AngularFireDatabase,
  ) {
    this.afAuth.authState.subscribe(
      user => {
        if (user != null) {
          this.getUserById(user.uid)
            .subscribe(
              (remoteUser: UserModel) => {
                this.isLoggedIn$.next(true);
                this._user.next(remoteUser);
                this.currentUserName = remoteUser.name;
              });
          this._router.navigate(['/user']);
        } else {
          this.isLoggedIn$.next(false);
          this._user.next(null);

        }
      }
    );
  }

  login(email: string, password: string): Observable<any> {
    return from(
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
    );
  }

  register(param: UserModel, password: string) {
    return from(
      this.afAuth.auth.createUserWithEmailAndPassword(param.email, password)
    )
      .pipe(
        tap(
          user => {
            this.save({...param, id: user.user.uid});
          }
        )
      );
  }

  save(param: UserModel) {
    return this.afDb.object(`users/${param.id}`)
      .set(param)
      .then(
        user => user
      );


  }

  getUserById(fbid: string) {

    return this.afDb.object(`users/${fbid}`).valueChanges();
  }

  getCurrentUser() {
    return this._user.asObservable();
  }

  logout() {
    this.afAuth.auth.signOut();
    this.isLoggedIn$.next(false);
    this.currentUserName = null;
    this._router.navigate(['/user/login']);
  }


  addTicket(ticketId: string): Observable<any> {
    return this._user
      .pipe(
        first()
      )
      .pipe(flatMap(
        user => {
          return this.afDb.list(`users/${user.id}/tickets`)
            .push(ticketId);
        }
      ));
  }
}


