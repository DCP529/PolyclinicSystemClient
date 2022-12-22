import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private jwtHelper: JwtHelperService,private as: AuthService, private router: Router) { }
  
  public get isAdminPanel(): boolean{
     var result =  this.jwtHelper.decodeToken(this.as.isAdminRole());

     if(result.role == "User"){
      return false
     }

    return true
  }

  public get isLoggedIn(): boolean {
    return this.as.isAuthenticated()
  }

  logout() {
    this.as.logout()
  }
}

