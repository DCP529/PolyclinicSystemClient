import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Doctor } from 'src/app/models/Doctor';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctor-edit-card',
  templateUrl: './doctor-edit-card.component.html',
  styleUrls: ['./doctor-edit-card.component.scss']
})
export class DoctorEditCardComponent {
  @Input() doctor!: Doctor
  @Input() selectedFile!: File;
  image!: any

  constructor(private ds: DoctorService,
    private sanitizer: DomSanitizer) {
  }

  updateDoctor(name: string, admissionCost: string, contactNumber: string, shortDescription: string, fullDescription: string) {

    var doctor = new Doctor();
    doctor.fio = name
    doctor.admissionCost = Number(admissionCost)
    doctor.contactNumber = Number(contactNumber)
    doctor.shortDescription = shortDescription
    doctor.fullDescription = fullDescription

    this.ds.getDoctor(name, '').subscribe(x => {
      doctor.doctorId = x[0].doctorId

      console.log(x[0])

      return this.ds.updateDoctor(doctor, this.selectedFile)
        .subscribe(res => {
          alert('Doctor added successfully!')
        }, error => {
          alert('Wrong name or this city already not exists!')
        }
        );
    });


  }

  deleteDoctor() {
    this.ds.deleteDoctor(this.doctor.fio)
      .subscribe(res => {
        alert('Doctor deleted successfully!')
      }, error => {
        alert('Wrong name or this city already not exists!')
      }
      )
  }

  ViewImage(): boolean {
    this.doctor.image = this.selectedFile;
    this.image = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.doctor.image));
    return true;
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0]
  }
}
