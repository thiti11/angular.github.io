import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/api.sercice';

import { User } from 'src/app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  
  [x: string]: any;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private service: ApiService,
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }


  PHP_API_SERVER = this.service.PHP_API_SERVER;

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(Username:string , Password:string) {
    //console.log(data, 'login');

    return this.http.post<any>(`${this.PHP_API_SERVER }`, {Username, Password})
      .pipe(map(user => {
        console.log(user)

        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null!);

 }

 delete(No_ID:number){
  return this.http.post<any>(`${this.PHP_API_SERVER}`,No_ID);
 }



  
}
