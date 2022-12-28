import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup

  constructor(private as: AuthService,
    private router: Router) {

  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

  submit(){
    if(this.form.invalid){
      return
    }
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
