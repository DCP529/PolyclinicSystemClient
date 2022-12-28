import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/models/Doctor';
import { CityService } from 'src/app/services/city.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { PolyclinicService } from 'src/app/services/polyclinic.service';
import { SpecializationService } from 'src/app/services/specialization.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent {

  cityName!: string
  specializationName!: string
  doctors: Doctor[] = [];

  constructor(
    private ds: DoctorService,
    private cs: CityService,
    private ps: PolyclinicService,
    private ss: SpecializationService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.specializationName = params['specializationName']);
    this.route.params.subscribe(params => this.cityName = params['city']);

    if (this.cityName == null || this.cityName == '') {
      (this.ds.getDoctor("", this.specializationName)).subscribe(doctors => {
        this.doctors = doctors
        doctors.forEach(x => {
          this.ds.getImage(x.doctorId).subscribe((image: Blob) => {
            this.ss.getSpecialization().subscribe(z => {
              x.specializations = z.filter(item => item.doctorId == x.doctorId)
              console.log(x.specializations)
            })
            x.image = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(image));
          }, (err: HttpErrorResponse) => {
            console.log(err)
          })
        })
      });
    }
    else{
      this.cs.getCities().subscribe(getCityList => {

        var city = getCityList.filter(city => city.name == this.cityName)
  
        this.ps.getPolyclinic().subscribe(getPolyclinics => {
  
          var polyclinics = getPolyclinics.filter(polyclinic => polyclinic.cityId == city[0].cityId)
  
          this.ds.getDoctor('', this.specializationName).subscribe(getDoctors => {
            polyclinics.forEach(element => {
              var doctors = getDoctors.filter(getDoctors => getDoctors.doctorId == element.doctorId);
              doctors.forEach(item => {
                console.log(item);
                this.doctors.push(item)
                console.log('3')
              })
            });
  
            this.doctors.forEach(x => {
              this.ds.getImage(x.doctorId).subscribe((image: Blob) => {
                this.ss.getSpecialization().subscribe(z => {
                  x.specializations = z.filter(item => item.doctorId == x.doctorId)
                  console.log(x.specializations)
                })
                x.image = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(image));
              }, (err: HttpErrorResponse) => {
                console.log(err)
              })
            })
          })
        })
      })
    }
  }
}



