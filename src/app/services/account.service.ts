import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { localStorageKeys, apiUrls, applicationUrls } from '../seedwork';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  //The BehaviorSubject has the characteristic that it stores the “current” value. 
  //This means that you can always directly get the last emitted value from the BehaviorSubject.
  //If you subscribe to it, the BehaviorSubject will directly emit the current value to the subscriber. 
  //Even if the subscriber subscribes much later than the value was stored.
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private router:Router,
    private http:HttpClient
  ) { 
    //this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(localStorageKeys.user)!)); //using the non-null operator "!" also works - only use this when you know what you do
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(localStorageKeys.user) || null));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User{
    return this.userSubject.value;
  }

  login(username:string, password:string): Observable<User>{
    return this.http.post<User>(apiUrls.user.login, {username, password})
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem(localStorageKeys.user, JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout(){
    // remove local cache entry and set the user to 'null'
    localStorage.removeItem(localStorageKeys.user);
    this.userSubject.next(null);
    this.router.navigate(applicationUrls.account.login); // ['/account/login']
  }

  register(user:User){
    // Question: should we add the type it returns here as well?
    return this.http.post(apiUrls.user.register, user);
  }

  getAll(): Observable<User[]>{
    return this.http.get<User[]>(apiUrls.user.users);
  }
}
