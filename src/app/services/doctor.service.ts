import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { STORE_API_URL } from '../app-injection-tokens';
import { Doctor } from '../models/Doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private baseUrl = `${this.apiUrl}/Doctor`

  constructor(private http: HttpClient, @Inject(STORE_API_URL) private apiUrl: string) { }

  getDoctor(FIO: string, Specialization: string): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.baseUrl}?FIO=${FIO}&Specialization=${Specialization}`)
  }

  addDoctor(doctor: Doctor): Observable<HttpStatusCode> {
    return this.http.post<HttpStatusCode>(`${this.baseUrl}`, { doctor })
  }

  deleteDoctor(doctorFIO: string): Observable<HttpStatusCode> {
    let statusCode = this.http.delete<ArrayBuffer>(`${this.baseUrl}?doctorFIO=${doctorFIO}`)

    var decodedString = String.fromCharCode.apply(statusCode);
    var obj = JSON.parse(decodedString);
    var message = obj['message'];

    return message;
  }

  updateDoctor(Doctor: Doctor): Observable<HttpStatusCode> {
    return this.http.put<HttpStatusCode>(`${this.baseUrl}`, { Doctor })
  }

  getImage(doctorId: Guid): Observable<ImageBitmap> {
    return this.http.get<ImageBitmap>(`${this.baseUrl}?doctorId=${doctorId}`)
  }
}

