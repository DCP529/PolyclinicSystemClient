import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { STORE_API_URL } from '../app-injection-tokens';
import { Doctor } from '../models/Doctor';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private baseUrl = `${this.apiUrl}/Doctor`

  constructor(private http: HttpClient, @Inject(STORE_API_URL) private apiUrl: string, private as: AuthService) { }

  config = {
    headers: {
      'Authorization': 'Bearer ' + this.as.isAdminRole(),
      'Accept': '*/*',
      "X-Testing": "testing"
    }
  };

  getDoctor(FIO: string, Specialization: string): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.baseUrl}?FIO=${FIO}&Specialization=${Specialization}`)
  }

  getDoctorById(doctorId: Guid): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.baseUrl}?DoctorId=${doctorId}`)
  }

  addDoctor(doctor: Doctor, file: File): Observable<HttpStatusCode> {
    const fd = new FormData();
    fd.append('Image', file);
    return this.http.post<HttpStatusCode>(`${this.baseUrl}?DoctorId=${doctor.doctorId}&FIO=${doctor.fio}&AdmissionCost=${doctor.admissionCost}&ContactNumber=${doctor.contactNumber}&ShortDescription=${doctor.shortDescription}&FullDescription=${doctor.fullDescription}`, fd, this.config)
  }

  deleteDoctor(doctorFIO: string): Observable<HttpStatusCode> {
    return this.http.delete<HttpStatusCode>(`${this.baseUrl}?doctorFIO=${doctorFIO}`, this.config)
  }

  updateDoctor(doctor: Doctor, file: File): Observable<HttpStatusCode> {
    const fd = new FormData();
    fd.append('Image', file);
    return this.http.put<HttpStatusCode>(`${this.baseUrl}?DoctorId=${doctor.doctorId}&FIO=${doctor.fio}&AdmissionCost=${doctor.admissionCost}&ContactNumber=${doctor.contactNumber}&ShortDescription=${doctor.shortDescription}&FullDescription=${doctor.fullDescription}`, fd, this.config)
  }

  getImage(doctorId: Guid): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/GetDoctorImageAsync?doctorId=${doctorId}`, { responseType: 'blob' })
  }
}

