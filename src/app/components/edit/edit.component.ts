import { Component, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Guid } from 'guid-typescript';
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

  private doctor: Doctor[] = []

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

  updateCity(cityName: string, updateName: string) {

    return this.cs.updateCities(cityName, updateName)
      .subscribe(res => {
        alert('City updated successfully!')
        this.router.navigate(['edit']);
      }, error => {
        alert('Wrong name or id!')
      }
      )
  }

  deleteCity(cityName: string) {
    return this.cs.deleteCities(cityName)
      .subscribe(res => {
        alert('City deleted successfully!')
      }, error => {
        alert('Wrong name or this city already not exists!')
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

  updateSpecialization(specializationOldName: string, name: string, doctorName: string, experience: string) {

    var specialization = new Specialization();
    specialization.name = name;
    specialization.experienceSpecialization = Number(experience)

    this.ds.getDoctor(doctorName, '').subscribe(doctor => {
      doctor.forEach(x => {
        console.log(x)
        specialization.doctorId = x.doctorId

        return this.ss.updateSpecialization(specializationOldName, specialization)
          .subscribe(res => {
            alert('Specialization updated successfully!')
            this.router.navigate(['edit']);
          }, error => {
            alert('Wrong parameters!')
          })
      })
    });


  }

  deleteSpecialization(specializationName: string) {
    console.log(specializationName)
    return this.ss.deleteSpecialization(specializationName)
      .subscribe(res => {
        alert('Specialization deleted successfully!')
      }, error => {
        alert('Wrong name or this specialization already not exists!')
      }
      )
  }

  addPolyclinic(name: string, address: string, contactNumber: string, cityName: string, doctorName: string) {
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

      this.ds.getDoctor(doctorName, '').subscribe(doctor => {

        polyclinic.doctorId = doctor[0].doctorId

        return this.ps.addPolyclinic(polyclinic, this.selectedFile)
          .subscribe(res => {
            alert('Polyclinic added successfully!')
          }, error => {
            alert('Wrong name or this city already not exists!')
          }
          )
      });
    })
  }

  updatePolyclinic(name: string, address: string, contactNumber: string) {

    this.ps.getPolyclinic().subscribe(polyclinics => {
      console.log(name);
      console.log(polyclinics);
   var polyclinic = polyclinics.filter(x => x.name == name)
console.log(polyclinic);
    this.ps.updatePolyclinic(polyclinic[0].polyclinicId, name, address, Number(contactNumber), polyclinic[0].cityId, this.selectedFile)
      .subscribe(res => {
        alert('Polyclinic update successfully!')
      }, error => {
        alert('Wrong name or this city already not exists!')
      }
      ) 
    })
  }

  deletePolyclinic(name: string) {

    var polyclinic = new Polyclinic();
    polyclinic.name = name

    this.ps.deletePolyclinic(polyclinic)
      .subscribe(res => {
        alert('Polyclinic deleted successfully!')
      }, error => {
        alert('Wrong name or this city already not exists!')
      }
      )
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

  updateDoctor(name: string, admissionCost: string, contactNumber: string, shortDescription: string, fullDescription: string) {

    var doctor = new Doctor();
    doctor.fio = name
    doctor.admissionCost = Number(admissionCost)
    doctor.contactNumber = Number(contactNumber)
    doctor.shortDescription = shortDescription
    doctor.fullDescription = fullDescription

    return this.ds.updateDoctor(doctor, this.selectedFile)
      .subscribe(res => {
        alert('Doctor added successfully!')
      }, error => {
        alert('Wrong name or this city already not exists!')
      }
      )
  }

  deleteDoctor(name: string) {
    this.ds.deleteDoctor(name)
      .subscribe(res => {
        alert('Doctor deleted successfully!')
      }, error => {
        alert('Wrong name or this city already not exists!')
      }
      )
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0]
  }
}
