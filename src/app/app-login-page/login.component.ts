import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { IUserLogin } from '../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  model: IUserLogin = {} as IUserLogin;


  constructor(private router: Router, private apiService: ApiService  ) { }

  ngOnInit(): void {
  }

  Login() {
    if(!this.model){
      (      error: any) => {
        console.log(error);}
    }
    else{
      console.log(this.model);
      this.apiService.Login(this.model).subscribe(response => {
        this.router.navigateByUrl('/login')
  
      }, error => {
      console.log(error);})
    }
  }

  Logout(){
    this.apiService
    this.router.navigateByUrl('/')
  }

}
