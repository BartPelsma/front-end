import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators';
import { Iuser } from '../models/login.model'; 

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = "https://localhost:5001/api/"
  private currentUserSource = new ReplaySubject<Iuser>(1);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient) { }

  login(model: any){
return this.http.post<Iuser>(this.baseUrl + 'account/login', model).pipe(
  map((response: Iuser) => {
    const user = response;
    if(user){
      localStorage.setItem('user', JSON.stringify(user));
      this.currentUserSource.next(user);
    }
  })
)
  }

  setCurrentUser(user: Iuser){
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user')
    this.currentUserSource.next(null!);
  }
}
