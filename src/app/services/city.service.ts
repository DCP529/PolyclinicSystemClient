import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { STORE_API_URL } from '../app-injection-tokens';
import { City } from '../models/City';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private baseUrl = `${this.apiUrl}/City`

  constructor(private http: HttpClient, @Inject(STORE_API_URL) private apiUrl: string) { }

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(`${this.baseUrl}`)
  }

  addCities(CityName: string): Observable<HttpStatusCode> {
    return this.http.post<HttpStatusCode>(`${this.baseUrl}`, { CityName })
  }

  deleteCities(CityName: string): Observable<HttpStatusCode> {
    let statusCode = this.http.delete<ArrayBuffer>(`${this.baseUrl}/City?cityName=${CityName}`)

    var decodedString = String.fromCharCode.apply(statusCode);
    var obj = JSON.parse(decodedString);
    var message = obj['message'];

    return message;
  }

  updateCities(City: City): Observable<HttpStatusCode> {
    return this.http.put<HttpStatusCode>(`${this.baseUrl}`, { City })
  }
}
