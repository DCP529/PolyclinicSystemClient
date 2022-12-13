import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public get isLoggedIn(): boolean {
    return this.as.isAuthenticated()
  }

  constructor(private as: AuthService) {

  }

  login(email: string, password: string) {
    this.as.login(email, password)
      .subscribe(res => {

      }, error => {
        alert('Wrong login or password.')
      }
      )
  }

  registerQuery(email: string, password: string, repeatPassword: string) {
    this.as.registerQuery(email, password, repeatPassword)
      .subscribe(res => {

      }, error => {
        alert('Wrong login or password.')
      }
      )
  }

  public get registerButtonClick(): void {
    
    return this.as.registerButtonClick();
  }

  logout() {
    this.as.logout()
  }
}
