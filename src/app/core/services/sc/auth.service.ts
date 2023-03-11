import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseService } from '../base/base.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { User } from '../../models/sc/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = this.base.apiUrl + 'auth/';
  token: string;
  jwtHelper = new JwtHelperService();
  userToken: any;
  // currentUser: User;
  decodedToken: any;
  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>|null;
  public user: User;

  constructor(private http: HttpClient, public router: Router, private base: BaseService) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user')!)
    );
    this.currentUser! = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model);
  }

  // login(username: string, password: string) {
  //   return this.http
  //     .post<any>(`${environment.apiUrl}/authenticate`, {
  //       username,
  //       password
  //     })
  //     .pipe(
  //       map((user) => {
  //         // store user details and jwt token in local storage to keep user logged in between page refreshes
  //         localStorage.setItem('currentUser', JSON.stringify(user));
  //         this.currentUserSubject.next(user);
  //         return user;
  //       })
  //     );
  // }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.currentUserSubject.next(null!);

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    localStorage.clear();
    this.router.navigate(['/auth/login']);

    // return this.afAuth.auth.signOut().then(() => {
    //   // this.showLoader = false;
    //   localStorage.clear();
    //   // this.cookieService.deleteAll('user', '/auth/login');
    //   this.router.navigate(['/auth/login']);
    // });
    return of({ success: false });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return (user != null && user.emailVerified != false) ? true : false;
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token!);
  }
}
