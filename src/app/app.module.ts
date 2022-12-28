import { EnvironmentInjector, ENVIRONMENT_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatCardModule} from '@angular/material/card'
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button'
import {MatTableModule} from '@angular/material/table'
import {MatFormFieldModule} from '@angular/material/form-field'
import { JwtModule } from '@auth0/angular-jwt';
import { ACCESS_TOKEN_KEY } from './services/auth.service';
import { HomeComponent } from './components/home/home.component';
import { environment } from './environments/environment';
import { AUTH_API_URL, STORE_API_URL } from './app-injection-tokens';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { EditComponent } from './components/edit/edit.component';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { DoctorFormComponent } from './components/doctor-form/doctor-form.component';
import { DoctorCardComponent } from './components/doctor-card/doctor-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export function tokenGetter(){
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    EditComponent,
    DoctorsComponent,
    DoctorFormComponent,
    DoctorCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.tokenWhiteListedDomains
      }
    })
  ],
  providers: [{
    provide: AUTH_API_URL,
    useValue: environment.authApi
  },
   {
    provide: STORE_API_URL,
    useValue: environment.storeApi
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
