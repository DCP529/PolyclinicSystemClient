import { Inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { AUTH_API_URL } from '../app-injection-tokens';
import { Token } from '../models/Token';

export const ACCESS_TOKEN_KEY: string = 'polyclinic_access_token'

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  constructor(
    private http: HttpClient,
    @Inject(AUTH_API_URL) private apiUrl: string,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) { }

  login(email: string, password: string): Observable<Token> {
    return this.http.post<Token>(`${this.apiUrl}/Authentication/login`, {
      email, password
    }).pipe(
      tap(token => {
        localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token);
      })
    )
  }

  config = {
    headers: {
      'Authorization': 'Basic d2VudHdvcnRobWFuOkNoYW5nZV9tZQ==',
      'Accept': '*/*',
      "X-Testing": "testing"
    }
  };

  registerQuery(Email: string, Password: string, repeatPassword: string): Observable<HttpStatusCode> {
    return this.http.post<HttpStatusCode>(`${this.apiUrl}/Authentication/register?Email=${Email}&Password=${Password}&repeatPassword=${repeatPassword}`
      , this.config)
  }

  isAuthenticated(): boolean {
    var token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return token != null && !this.jwtHelper.isTokenExpired(token)
  }

  registerButtonClick(): void {
    this.router.navigate(['register']);
  }

  logout(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.router.navigate(['']);
  }

  isAdminRole() : string{
    var token = localStorage.getItem(ACCESS_TOKEN_KEY);

    if(token != null){
      return token
    }

    return ''
  }
}
