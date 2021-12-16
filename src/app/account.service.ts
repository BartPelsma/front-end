import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map} from 'rxjs/operators';
import { IUserReturn} from './models/loginreturn.model'
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private currentUserSource = new ReplaySubject<IUserReturn>(1);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient, private apiService: ApiService) { }

  login(model: any){
    return this.apiService.Login(model).pipe(
      map((response: any) => {
        const user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }
  setCurrentUser(user: IUserReturn){
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user')
    this.currentUserSource.next(null);
  }
}
