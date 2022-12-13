import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { STORE_API_URL } from '../app-injection-tokens';
import { Specialization } from '../models/Specialization';


@Injectable({
  providedIn: 'root'
})
export class SpecializationService {

  private baseUrl = `${this.apiUrl}/Specialization`

  constructor(private http: HttpClient, @Inject(STORE_API_URL) private apiUrl: string) { }

  getSpecialization(): Observable<Specialization[]> {
    return this.http.get<Specialization[]>(`${this.baseUrl}`)
  }

  addSpecialization(specialization: Specialization): Observable<HttpStatusCode> {
    return this.http.post<HttpStatusCode>(`${this.baseUrl}`, { specialization })
  }

  deleteSpecialization(specializationName: string): Observable<HttpStatusCode> {
    let statusCode = this.http.delete<ArrayBuffer>(`${this.baseUrl}?specializationName=${specializationName}`)

    var decodedString = String.fromCharCode.apply(statusCode);
    var obj = JSON.parse(decodedString);
    var message = obj['message'];

    return message;
  }

  updateSpecialization(Specialization: Specialization): Observable<HttpStatusCode> {
    return this.http.put<HttpStatusCode>(`${this.baseUrl}`, { Specialization })
  }
}


