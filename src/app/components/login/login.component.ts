import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private as: AuthService, 
    private router: Router) {

  }

  public get isLoggedIn(): boolean {
    return this.as.isAuthenticated()
  }

  login(email: string, password: string) {
    console.log('fwergthyj')
    this.as.login(email, password)
      .subscribe(res => {
        this.router.navigate(['home']);
      }, error => {
        alert('Wrong login or password.')
      }
      )
  }

  logout() {
    this.as.logout()
  }

  registerButtonClick(): void {
    return this.as.registerButtonClick();
  }
}
