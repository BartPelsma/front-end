import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  model: any = {}


  constructor(private router: Router, private apiService: ApiService  ) { }

  ngOnInit(): void {
  }

  Login() {
    this.apiService.Login(this.model).subscribe(response => {
      this.router.navigateByUrl('/login')

    }, error => {
    console.log(error);})
  }

  Logout(){
    this.apiService
    this.router.navigateByUrl('/')
  }

}
