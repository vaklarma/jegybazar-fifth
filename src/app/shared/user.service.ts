import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UserModel} from './user-model';

import {Observable} from 'rxjs/Observable';
import {switchMap, tap} from 'rxjs/operators';
import {from, of, ReplaySubject} from 'rxjs';

import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';

import 'rxjs/add/operator/catch';
import * as moment from 'moment';


@Injectable()
export class UserService {
  isLoggedIn$ = new ReplaySubject<boolean>(1);
  currentUserName: string;

  public _user = new ReplaySubject<UserModel>(1);
  private currentUserId: string;

  constructor(private _router: Router,
              private afAuth: AngularFireAuth,
              private afDb: AngularFireDatabase,
  ) {
    this.afAuth.authState.subscribe(
      user => {
        if (user != null) {
          this.userOnlineDetect(user);
          this.getUserById(user.uid)
            .subscribe(
              (remoteUser: UserModel) => {
                this.isLoggedIn$.next(true);
                this._user.next(remoteUser);
                this.currentUserName = remoteUser.name;
                this.currentUserId = remoteUser.id;
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
    return from(
      this.afDb.object(`users/${this.currentUserId}/tickets/${ticketId}`)
        .set(true)
    );
  }

  /**
   * Ez a metodus felel azert hogyha online vagyok akkor a barataim csomopontjaiba a sajat useremnel az online-t kezelje
   * //@param user
   */
  private userOnlineDetect(user) {
    // specialis firebase path, a sajat connection allapotomat lehet vele vizsgalni
    this.afDb.object('.info/connected')
      .snapshotChanges()
      .pipe(
        switchMap(
          connected => {
            if (connected.payload.val() === true) {
              return this.afDb.list(`chat/chat_friend_list/${user.uid}`).snapshotChanges();
            }
            return of([]);
          }
        ))
      .subscribe(
        friendsSnapshot => {
          console.log('barátlista:', friendsSnapshot);
          if (friendsSnapshot.length > 0) {
            // Ha vannak barataim akkor ossze allitok egy listat a frissitendo path-okrol
            // (ezzel a modszerrel tobb utvonalat tudunk egyszerre frissiteni)

            // firebase ebben az esetben array like object-et ker, ezert nem tombot hasznalunk
            const updateOnline = {};
            // minden baratunknal a sajat csomopontunkat kigyujtjuk es beallitjuk neki hogy online vagyunk
            friendsSnapshot.forEach(
              snapshot => {
                console.log('snapshot.key', snapshot.key);
                updateOnline[`chat/chat_friend_list/${snapshot.key}/${user.uid}/online`] = true;
              }
            );
            // root csomopont referencia elekerese
            const rootAfDb = this.afDb.database.ref();
            // mivel a root csomoponttol adtuk meg az updateOnline-t ezert arra hivjuk az updatet
            // !FELHIVAS! nagyon vigyazz ezzel mert ha valami rosszul adsz meg akkor akar az egesz adatbazist torolheted!
            rootAfDb.update(updateOnline);

            // amikor majd megkapjuk a disconnect esemenyt akkor szeretnenk torolni az online flag-et, ezert
            // lemasoljuk az updateOnline-t de null ertekkel ami miatt firebase torolni fogja
            const updateOffline = {};
            friendsSnapshot.forEach(
              snapshot => {
                updateOffline[`chat/chat_friend_list/${snapshot.key}/${user.uid}/online`] = false;
                updateOffline[`chat/chat_friend_list/${snapshot.key}/${user.uid}/lastOnline`] = moment().unix();
              }
            );

            // disconnect eseten update-vel frissitjuk az ertekeket(a null miatt majd torlodni fog)
            rootAfDb.ref.onDisconnect().update(updateOffline);
          }
        }
      );
  }

}


