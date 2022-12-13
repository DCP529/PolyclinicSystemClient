import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private as: AuthService, 
    private router: Router) {

  }

  registerQuery(email: string, password: string, repeatPassword: string) {
    return this.as.registerQuery(email, password, repeatPassword)
    .subscribe(res => {        
      alert('Registration completed successfully!')
    this.router.navigate(['']);
    }, error => {
      alert('Wrong login or password.')
    }
    )
  }
  
  registerButtonClick(): void {
    return this.as.registerButtonClick();
  }

  logout() {
    this.as.logout()
  }

}
