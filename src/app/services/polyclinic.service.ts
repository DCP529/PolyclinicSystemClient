import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { STORE_API_URL } from '../app-injection-tokens';
import { Polyclinic } from '../models/Polyclinic';

@Injectable({
  providedIn: 'root'
})
export class PolyclinicService {

  private baseUrl = `${this.apiUrl}/Polyclinic`

  constructor(private http: HttpClient, @Inject(STORE_API_URL) private apiUrl: string) { }

  getPolyclinic(): Observable<Polyclinic[]> {
    return this.http.get<Polyclinic[]>(`${this.baseUrl}`)
  }

  addPolyclinic(polyclinic: Polyclinic): Observable<HttpStatusCode> {
    return this.http.post<HttpStatusCode>(`${this.baseUrl}`, { polyclinic })
  }

  deletePolyclinic(polyclinic: Polyclinic): Observable<HttpStatusCode> {
    let statusCode = this.http.delete<HttpStatusCode>(`${this.baseUrl}?
    Name=${polyclinic.name}
    &Address=${polyclinic.address}
    &ContactNumber=${polyclinic.contactNumber}
    &PolyclinicId=${polyclinic.polyclinicId}`)

    var decodedString = String.fromCharCode.apply(statusCode);
    var obj = JSON.parse(decodedString);
    var message = obj['message'];

    return message;
  }

  updatePolyclinic(polyclinic: Polyclinic): Observable<HttpStatusCode> {
    return this.http.put<HttpStatusCode>(`${this.baseUrl}`, { polyclinic })
  }

  getImage(polyclinicId: Guid): Observable<ImageBitmap> {
    return this.http.get<ImageBitmap>(`${this.baseUrl}?polyclinicId=${polyclinicId}`)
  }
}

