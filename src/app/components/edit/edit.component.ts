import { HttpErrorResponse } from '@angular/common/http';
import { Component, ComponentFactoryResolver } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Guid } from 'guid-typescript';
import { City } from 'src/app/models/City';
import { Doctor } from 'src/app/models/Doctor';
import { Polyclinic } from 'src/app/models/Polyclinic';
import { Specialization } from 'src/app/models/Specialization';
import { AuthService } from 'src/app/services/auth.service';
import { CityService } from 'src/app/services/city.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { PolyclinicService } from 'src/app/services/polyclinic.service';
import { SpecializationService } from 'src/app/services/specialization.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {

  selectedFile!: File;

  doctors: Doctor[] = []
  specializations: Specialization[] = []
  polyclinics: Polyclinic[] = []
  cities: City[] = []
  doctorName: string[] = []

  constructor(
    private jwtHelper: JwtHelperService,
    private cs: CityService,
    private ps: PolyclinicService,
    private ds: DoctorService,
    private ss: SpecializationService,
    private as: AuthService,
    private router: Router
  ) {
    var result = this.jwtHelper.decodeToken(this.as.isAdminRole());

    if (result.role == "User") {
      this.router.navigate(['/home']);
    }

    ss.getSpecialization().subscribe(x => this.specializations = x);
    cs.getCities().subscribe(x => this.cities = x);

    ps.getPolyclinic().subscribe(x => {
      this.polyclinics = x
      this.polyclinics.forEach(x => {
        this.ps.getImage(x.polyclinicId).subscribe((image: Blob) => {
          x.image = image;
        }, (err: HttpErrorResponse) => {
          console.log(err)
        })
      })
    });

    ds.getDoctor("", "").subscribe(x => {
      this.doctors = x
      this.doctors.forEach(x => {
        this.doctorName.push(x.fio);
        this.ds.getImage(x.doctorId).subscribe((image: Blob) => {
          this.ss.getSpecialization().subscribe(z => {
            x.specializations = z.filter(item => item.doctorId == x.doctorId)
          })
          x.image = image;
        }, (err: HttpErrorResponse) => {
          console.log(err)
        })
      })
    });
  }

  addCity(cityName: string) {

    return this.cs.addCities(cityName)
      .subscribe(res => {
        alert('City added successfully')
        this.router.navigate(['edit']);
      }, error => {
        alert('Wrong name or this city already exists!')
      }
      )
  }

  addSpecialization(specializationName: string, doctorFIO: string, experience: string) {

    var specialization = new Specialization();
    specialization.name = specializationName;
    specialization.experienceSpecialization = Number(experience)

    this.ds.getDoctor(doctorFIO, "").subscribe(data => {
      specialization.doctorId = data[0].doctorId;

      return this.ss.addSpecialization(specialization)
        .subscribe(res => {
          alert('Specialization added successfully')
          this.router.navigate(['edit']);
        }, error => {
          alert('Wrong parameters!')
        }
        )
    });
  }

  addPolyclinic(name: string, address: string, contactNumber: string, cityName: string) {
    var polyclinic = new Polyclinic();
    polyclinic.name = name
    polyclinic.address = address
    polyclinic.contactNumber = Number(contactNumber)

    this.cs.getCities().subscribe(city => {

      city.forEach(x => {
        if (x.name == cityName && x.cityId != null) {
          polyclinic.cityId = x.cityId
        }
      })
      return this.ps.addPolyclinic(polyclinic, this.selectedFile)
        .subscribe(res => {
          alert('Polyclinic added successfully!')
        }, error => {
          alert('Wrong name or this city already not exists!')
        }
        )
    });
  }

  addsDoctorForPolyclinic(polyclinicName: string, doctorName: string) {

    this.ps.getPolyclinic().subscribe(x => {
      this.ds.getDoctor(doctorName, '').subscribe(d => {
            var polyclinics;
            polyclinics = x
            polyclinics.filter(c => c.name == polyclinicName)

            return this.ps.addDoctorForPolyclinic(polyclinics[0], d[0]).subscribe(res => {
              alert('Polyclinic added successfully!')
            }, error => {
              alert('Wrong name or this city already not exists!')
            }
            )
          })
        })
  }

  addDoctor(doctorName: string, admissionCost: string, contactNumber: string, shortDescription: string, fullDescription: string) {

    var doctor = new Doctor();
    doctor.doctorId = Guid.create()
    doctor.fio = doctorName
    doctor.admissionCost = Number(admissionCost)
    doctor.contactNumber = Number(contactNumber)
    doctor.shortDescription = shortDescription
    doctor.fullDescription = fullDescription

    return this.ds.addDoctor(doctor, this.selectedFile)
      .subscribe(res => {
        alert('Doctor added successfully!')
      }, error => {
        alert('Wrong name or this city already not exists!')
      }
      )
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0]
  }
}
