import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { City } from 'src/app/models/City';
import { Doctor } from 'src/app/models/Doctor';
import { AuthService } from 'src/app/services/auth.service';
import { CityService } from 'src/app/services/city.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { PolyclinicService } from 'src/app/services/polyclinic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  doctors: Doctor[] = []
  citySearch: string = ''
  cities: City[] = []
  doctorsCount: number[] = []
  doctorSpecialization: string[] = [
    "Нарколог",
    "Лор",
    "Алерголог",
    "Практолог",
    "Гениколог",
    "Детский врач",
    "Хирург",
    "Окулист",
    "Капдиолог"
  ];

  constructor(private jwtHelper: JwtHelperService,
    private as: AuthService,
    private cs: CityService,
    private ps: PolyclinicService,
    private ds: DoctorService) {
    for (var i = 0; i < this.doctorSpecialization.length; i++) {
      this.ds.getDoctor('', this.doctorSpecialization[i]).subscribe(doctors => {
        console.log(this.doctorSpecialization[i])
        console.log(doctors);
        this.doctorsCount.push(doctors.length)
      });
    }

    this.cs.getCities().subscribe(x => {
      console.log(x);
      this.cities = x
    })
  }

  public get isAdminPanel(): boolean {
    var result = this.jwtHelper.decodeToken(this.as.isAdminRole());

    if (result.role == "User") {
      return false
    }

    return true
  }

  public get isLoggedIn(): boolean {
    return this.as.isAuthenticated()
  }

  logout() {
    this.as.logout()
  }

  searchDoctorsByCity(cityName: string) {
    this.citySearch = cityName;

    this.cs.getCities().subscribe(getCityList => {

      var city = getCityList.filter(city => city.name == cityName)

      this.ps.getPolyclinic().subscribe(getPolyclinics => {

        var polyclinics = getPolyclinics.filter(polyclinic => polyclinic.cityId == city[0].cityId)

        this.ds.getDoctor('', '').subscribe(getDoctors => {
          polyclinics.forEach(element => {
            var doctors = getDoctors.filter(getDoctors => getDoctors.doctorId == element.doctorId);

            doctors.forEach(item => {
              this.doctors.push(item)
            })
          });

          this.doctorsCount = []

          for (var i = 0; i < this.doctorSpecialization.length; i++) {
            this.ds.getDoctor('', this.doctorSpecialization[i]).subscribe(doctors => {
              if (doctors.length != 0) {
                for (var i = 0; i < this.doctors.length; i++) {
                  var result = this.doctors.filter(doctor => doctor.doctorId == doctors[i].doctorId)
                  this.doctorsCount.push(result.length)
                }
              }
            })
          }
        })
      }
      )
    }
    )
  }
}