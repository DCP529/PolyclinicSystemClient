import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { STORE_API_URL } from '../app-injection-tokens';
import { Doctor } from '../models/Doctor';
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
    return this.http.post<HttpStatusCode>(`${this.baseUrl}?Name=${polyclinic.name}&Address=${polyclinic.address}&ContactNumber=${polyclinic.contactNumber}`, fd, this.config)
  }

  addDoctorForPolyclinic(polyclinic: Polyclinic, doctor: Doctor) : Observable<HttpStatusCode>{ 
    return this.http.post<HttpStatusCode>(`${this.baseUrl}/AddDoctorForPolyclinic?polyclinicId=${polyclinic.polyclinicId}&DoctorId=${doctor.doctorId}&FIO=${doctor.fio}&AdmissionCost=${doctor.admissionCost}&ContactNumber=${doctor.contactNumber}&ShortDescription=${doctor.shortDescription}}&FullDescription=${doctor.fullDescription}&Archived=false`, {}, this.config)
  }

  deletePolyclinic(polyclinic: Polyclinic): Observable<HttpStatusCode> {
    return this.http.delete<HttpStatusCode>(`${this.baseUrl}?Name=${polyclinic.name}`, this.config)
  }

  deleteDoctorForPolyclinic(polyclinic: Polyclinic, doctor: Doctor){
    return this.http.delete<HttpStatusCode>(`${this.baseUrl}/DeleteDoctorForPolyclinic?polyclinicId=${polyclinic.polyclinicId}&doctorId=${doctor.doctorId}`, this.config)
  }

  updatePolyclinic(polyclinicId: Guid, polyclinic: Polyclinic, file: File): Observable<HttpStatusCode> {
    const fd = new FormData();
    fd.append('Image', file);

    return this.http.put<HttpStatusCode>(`${this.baseUrl}?Name=${polyclinic.name}&Address=${polyclinic.address}&polyclinicId=${polyclinicId}&ContactNumber=${polyclinic.contactNumber}&CityId=${polyclinic.cityId}`, fd, this.config)
  }

  getImage(polyclinicId: Guid): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/GetPolyclinicImageAsync?polyclinicId=${polyclinicId}`, { responseType: 'blob' })
  }
}

