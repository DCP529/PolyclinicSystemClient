import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { City } from 'src/app/models/City';
import { Doctor } from 'src/app/models/Doctor';
import { Polyclinic } from 'src/app/models/Polyclinic';
import { Specialization } from 'src/app/models/Specialization';
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

  constructor(
    private cs: CityService,
    private ps: PolyclinicService,
    private ds: DoctorService,
    private ss: SpecializationService,
    private router: Router
  ) {

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

  addSpecialization(name: string, doctorId: string, experience: string) {

    var specialization = new Specialization();
    specialization.doctorId = Guid.parse(doctorId);
    specialization.name = name;
    specialization.experienceSpecialization = Number(experience)

    return this.ss.addSpecialization(specialization)
      .subscribe(res => {
        alert('Specialization added successfully')
        this.router.navigate(['edit']);
      }, error => {
        alert('Wrong parameters!')
      }
      )
  }

  updateSpecialization(specializationId: string,name: string, doctorId: string, experience: string) {

    var specialization = new Specialization();
    specialization.specializationId = Guid.parse(specializationId);
    specialization.doctorId = Guid.parse(doctorId);
    specialization.name = name;
    specialization.experienceSpecialization = Number(experience)

    return this.ss.updateSpecialization(specialization)
      .subscribe(res => {
        alert('Specialization updated successfully!')
        this.router.navigate(['edit']);
      }, error => {
        alert('Wrong parameters!')
      }
      )
  }

  deleteSpecialization(specializationName: string) {
    return this.ss.deleteSpecialization(specializationName)
      .subscribe(res => {
        alert('Specialization deleted successfully!')
      }, error => {
        alert('Wrong name or this specialization already not exists!')
      }
      )
  }

  logout() {
    this.router.navigate(['/home']);
  }

  addPolyclinic(name: string, address: string, contactNumber: string, cityName: string) {

    var city = new City();
    city.id = Guid.create()
    city.name = cityName

    var polyclinic = new Polyclinic();
    polyclinic.name = name
    polyclinic.address = address
    polyclinic.contactNumber = Number(contactNumber)
    polyclinic.city = city

    return this.ps.addPolyclinic(polyclinic, this.selectedFile)
      .subscribe(res => {
        alert('Polyclinic added successfully!')
      }, error => {
        alert('Wrong name or this city already not exists!')
      }
      )
  }

  updatePolyclinic(polyclinicId: string, name: string, address: string, contactNumber: string, cityName: string) {

    this.ps.updatePolyclinic(Guid.parse(polyclinicId), name, address, Number(contactNumber), cityName, this.selectedFile)
      .subscribe(res => {
        alert('Polyclinic deleted successfully!')
      }, error => {
        alert('Wrong name or this city already not exists!')
      }
      )
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

  addDoctor(name: string, admissionCost: string, contactNumber: string, shortDescription: string, fullDescription: string) {

    var doctor = new Doctor();
    doctor.fio = name
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

  updateDoctor(id: string, name: string, admissionCost: string, contactNumber: string, shortDescription: string, fullDescription: string) {

    var doctor = new Doctor();
    doctor.doctorId = Guid.parse(id)
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
