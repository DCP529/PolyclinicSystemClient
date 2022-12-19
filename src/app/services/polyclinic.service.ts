import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { STORE_API_URL } from '../app-injection-tokens';
import { Polyclinic } from '../models/Polyclinic';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PolyclinicService {

  private baseUrl = `${this.apiUrl}/Polyclinic`

  constructor(private http: HttpClient, @Inject(STORE_API_URL) private apiUrl: string, private as: AuthService) { }

  getPolyclinic(): Observable<Polyclinic[]> {
    return this.http.get<Polyclinic[]>(`${this.baseUrl}`)
  }

  config = {
    headers: {
      'Authorization': 'Bearer ' + this.as.isAdminRole(),
      'Accept': '*/*',
      "X-Testing": "testing"
    }
  };

  addPolyclinic(polyclinic: Polyclinic, file: File): Observable<HttpStatusCode> {
    const fd = new FormData();
    fd.append('Image', file);
    return this.http.post<HttpStatusCode>(`${this.baseUrl}?Name=${polyclinic.name}
    &Address=${polyclinic.address}
    &ContactNumber=${polyclinic.contactNumber}
    &City.Name=${polyclinic.city}`, fd, this.config)
  }

  deletePolyclinic(polyclinic: Polyclinic): Observable<HttpStatusCode> {
    return this.http.delete<HttpStatusCode>(`${this.baseUrl}?Name=${polyclinic.name}`, this.config)
  }

  updatePolyclinic(polyclinicId:Guid, name:string, address:string, contactNumber: number, cityName: string, file: File): Observable<HttpStatusCode> {
    const fd = new FormData();
    fd.append('Image', file);
    return this.http.put<HttpStatusCode>(`${this.baseUrl}?Name=${name}
    &Address=${address}
    &polyclinicId=${polyclinicId}
    &ContactNumber=${contactNumber}
    &City.Name=${cityName}`, fd, this.config)
  }

  getImage(polyclinicId: Guid): Observable<ImageBitmap> {
    return this.http.get<ImageBitmap>(`${this.baseUrl}?polyclinicId=${polyclinicId}`, this.config)
  }
}

