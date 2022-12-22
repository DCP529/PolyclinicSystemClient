import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { STORE_API_URL } from '../app-injection-tokens';
import { Specialization } from '../models/Specialization';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class SpecializationService {

  private baseUrl = `${this.apiUrl}/Specialization`

  constructor(private http: HttpClient, @Inject(STORE_API_URL) private apiUrl: string, private as: AuthService) { }

  config = {
    headers: {
      'Authorization': 'Bearer ' + this.as.isAdminRole(),
      'Accept': '*/*',
      "X-Testing": "testing"
    }
  };

  getSpecialization(): Observable<Specialization[]> {
    return this.http.get<Specialization[]>(`${this.baseUrl}`)
  }

  addSpecialization(specialization: Specialization): Observable<HttpStatusCode> {
    return this.http.post<HttpStatusCode>(`${this.baseUrl}?Name=${specialization.name}
    &DoctorId=${specialization.doctorId}
    &ExperienceSpecialization=${specialization.experienceSpecialization}`, this.config)
  }

  deleteSpecialization(specializationName: string): Observable<HttpStatusCode> {
    return this.http.delete<HttpStatusCode>(`${this.baseUrl}?Name=${specializationName}`, this.config)
  }

  updateSpecialization(specialization: Specialization): Observable<HttpStatusCode> {
    return this.http.put<HttpStatusCode>(`${this.baseUrl}?SpecializationId=${specialization.specializationId}
    &Name=${specialization.name}
    &DoctorId=${specialization.doctorId}
    &ExperienceSpecialization=${specialization.experienceSpecialization}`, this.config)
  }
}


