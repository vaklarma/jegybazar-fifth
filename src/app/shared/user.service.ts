import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {FirebaseLoginModel} from './firebase-login-model';
import {FirebaseRegistrationModel} from './firebase-registration-model';
import {UserModel} from './user-model';
import {ReplaySubject} from 'rxjs';
import * as firebase from 'firebase';


@Injectable()
export class UserService {
  isLoggedin = new ReplaySubject(1);
  currentUser;

  private _user = new UserModel();
  private _fbAuthData: FirebaseLoginModel | FirebaseRegistrationModel | undefined;

  constructor(private _router: Router,
              private _http: HttpClient) {
    firebase.auth().onAuthStateChanged(
      user => {
        if (user != null) {
          this.isLoggedin.next(true);
        } else {
          this.isLoggedin.next(false);
        }
        console.log(user);
      }
    );
  }

  get fbIdToken(): string | null {
    return this._fbAuthData ? this._fbAuthData.idToken : null;
  }

  login(email: string, password: string): Observable<UserModel | void> {
    return this._http.post<FirebaseLoginModel>(
      `${environment.firebase.loginUrl}?key=${environment.firebase.apiKey}`,
      {
        'email': email,
        'password': password,
        'returnSecureToken': true
      })
      .do((fbAuthResponse: FirebaseLoginModel) => this._fbAuthData = fbAuthResponse)
      .switchMap(fbLogin => this.getUserById(fbLogin.localId))
      .do(user => this._user = user)

      // .do(user => this.isLoggedin = true)
      .do(user => {
        console.log('sikeres login ezzel a userrel: ', user);
        this.currentUser = this._user.name;
      });
  }

  register(param: UserModel, password: string) {
    return this._http.post<FirebaseRegistrationModel>(
      `${environment.firebase.registrationUrl}?key=${environment.firebase.apiKey}`,
      {
        'email': param.email,
        'password': password,
        'returnSecureToken': true
      }
    )
      .do((fbAuthResponse: FirebaseRegistrationModel) => this._fbAuthData = fbAuthResponse)
      .pipe(map(fbreg => {
        return {
          id: fbreg.localId,
          ...param
        };
      }))
      .switchMap(user => this.save(user))
      //  .do(user => this.isLoggedin = true)
      .do(user => console.log('sikeres reg ezzel a userrel: ', user));
  }

  save(param: UserModel) {
    // na ez itt azert kulonleges, mert a tobbi helyettol elteroen en nem akarom, hogy
    // generaljon nekem kulcsot a firebase, hanem a registraciokor kapott id-t szeretnem
    // kulcs kent hasznalni adatmentesnel kulcskent az adatbazisban
    // illetve put-ra fb a bekuldott adatszerkezetet adja vissz igy tudom tovabb hasznalni
    return this._http.put<UserModel>(`${environment.firebase.baseUrl}/users/${param.id}.json`, param) // return: param
      .do(user => this._user = user);
  }

  // itt ezt azert tettem be igy direktbe (mármint minurtus), es nem asyncronban bekotve, mert amikor ez a valtozo valtozik
  // azt elintezik a kezelok (login, register, logout) es igy biztosra vehetem, hogy rendben van
  // TODO: ez iskolapeldaja lehet egyebkent egy jo kis behaviuorSubject-nek es getValue-nak

  getUserById(fbid: string) {
    return this._http.get<UserModel>(`${environment.firebase.baseUrl}/users/${fbid}.json`);
  }

  getCurrentUser() {
    //  return Observable.of(this._user);
    //   return of(this._user);
    return this._user;
  }

  logout() {
    this._user = new UserModel();
    //   this.isLoggedin = false;
    delete(this._fbAuthData);
    this._router.navigate(['/home']);
    console.log('kileptunk');
  }

  getAllUsers() {
    return this._http.get(`${environment.firebase.baseUrl}/users.json`)
      .pipe(map(usersObject => Object.values(usersObject).map(user => new UserModel(user))));
  }

  addTicket(ticketId: string): Observable<string> {
    return this._http.patch(
      `${environment.firebase.baseUrl}/users/${this._user.id}/tickets.json`,
      {[ticketId]: true}
    )
      .pipe(map(rel => Object.keys(rel)[0]));
  }

  getfbAllUser(): Observable<UserModel[]> {
    return this._http.get<UserModel>(`${environment.firebase.baseUrl}/users/.json`)
      .pipe(map(data => Object.values(data).map(um => new UserModel(um))));
    //   return this._http.get<UserModel[][]>(`${environment.firebase.baseUrl}/users/.json`);


  }

  deleteOneUser(id) {

    return this._http.delete(`${environment.firebase.baseUrl}/users/${id}.json`);
  }

  // TODO: refreshtoken-t lekezelni
  // TODO: auth query parameterre megirni az itnerceptort
  // TODO: rememberme-t lekezelni localstorage-el
}
