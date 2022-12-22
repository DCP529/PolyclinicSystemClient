import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { STORE_API_URL } from '../app-injection-tokens';
import { City } from '../models/City';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private baseUrl = `${this.apiUrl}/City`

  constructor(private http: HttpClient, @Inject(STORE_API_URL) private apiUrl: string, private as: AuthService) { }

  config = {
    headers: {
      'Authorization': 'Bearer ' + this.as.isAdminRole(),
      'Accept': '*/*',
      "X-Testing": "testing"
    }
  };

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(`${this.baseUrl}`)
  }

  addCities(cityName: string): Observable<HttpStatusCode> {
    return this.http.post<HttpStatusCode>(`${this.baseUrl}?cityName=${cityName}`, {}, this.config)
  }

  deleteCities(cityName: string): Observable<HttpStatusCode> {
    console.log(cityName);
    return this.http.delete<HttpStatusCode>(`${this.baseUrl}?cityName=${cityName}`, this.config)
  }

  updateCities(cityName: string, updateName: string): Observable<HttpStatusCode> {
    return this.http.put<HttpStatusCode>(`${this.baseUrl}?cityName=${cityName}&updateCity=${updateName}`, {}, this.config)
  }
}
