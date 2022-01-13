import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { IUserLogin } from '../models/login.model';
import { IUserReturn } from '../models/loginreturn.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ViewEncapsulation } from '@angular/core';
import { AccountService } from '../account.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class LoginComponent implements OnInit {
  model: IUserLogin = {} as IUserLogin;
  private currentUserSource = new ReplaySubject<IUserReturn>(1);
  currentUser$ = this.currentUserSource.asObservable();


  constructor(
    private router: Router, 
    private apiService: ApiService,
    public accountService : AccountService,
    private notificationService: MatSnackBar, 
    private translateService: TranslateService ) { }

  ngOnInit(): void {
  }

  Login() {
    if(!this.model){
      (      error: any) => {
        this.showSuccessNotification("Logged in");}
    }
    else{
      console.log(this.model);
      this.accountService.login(this.model).subscribe(response => {
        this.router.navigateByUrl('/products')
  
      }, error => {
      this.showErrorNotification("cannot login")})
    }
  }

    Logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
    }
  

    /*
    Show error notification

    @param translateableMessage: string
    String that has to be presented in the error notification (gets translated)
  */
    private showErrorNotification(translateableMessage: string): void {
      this.notificationService.open(this.translateService.instant(translateableMessage), undefined, {
        panelClass: 'error-snack',
        duration: 2500
       });
    }
    private showSuccessNotification(translatableMessage: string): void {
      this.notificationService.open(this.translateService.instant(translatableMessage), undefined, {
        panelClass: 'success-snack',
        duration: 2500
      });
    }
}


