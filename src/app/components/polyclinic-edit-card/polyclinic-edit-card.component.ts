import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Guid } from 'guid-typescript';
import { City } from 'src/app/models/City';
import { Doctor } from 'src/app/models/Doctor';
import { Polyclinic } from 'src/app/models/Polyclinic';
import { CityService } from 'src/app/services/city.service';
import { PolyclinicService } from 'src/app/services/polyclinic.service';

@Component({
  selector: 'app-polyclinic-edit-card',
  templateUrl: './polyclinic-edit-card.component.html',
  styleUrls: ['./polyclinic-edit-card.component.scss']
})
export class PolyclinicEditCardComponent {
  @Input() polyclinic!: Polyclinic
  @Input() cityId!: Guid
  @Input() selectedFile!: File;
  city!: City
  image!: any 

  constructor(private ps: PolyclinicService,
    private sanitizer: DomSanitizer, private cs: CityService) {
  }

  GetInfo(): boolean {
    this.polyclinic.image = this.selectedFile;
    this.image = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.polyclinic.image));

    this.cs.getCities().subscribe(x => {
      this.city = x.filter(x => x.cityId == this.cityId)[0]})
    return true;
  }

  updatePolyclinic(name: string, address: string, contactNumber: string) {
    var polyclinic = new Polyclinic()
    polyclinic.name = name
    polyclinic.address = address
    polyclinic.contactNumber = Number(contactNumber)

    this.ps.getPolyclinic().subscribe(polyclinics => {      
      var getPolyclinic = polyclinics.filter(x => x.name == this.polyclinic.name)
      polyclinic.cityId = getPolyclinic[0].cityId
      this.ps.updatePolyclinic(getPolyclinic[0].polyclinicId, polyclinic, this.selectedFile)
        .subscribe(res => {
          alert('Polyclinic update successfully!')
        }, error => {
          alert('Wrong name or this city already not exists!')
        }
        )
    })
  }

  deletePolyclinic() {
    this.ps.deletePolyclinic(this.polyclinic)
      .subscribe(res => {
        alert('Polyclinic deleted successfully!')
      }, error => {
        alert('Wrong name or this city already not exists!')
      }
      )
  }

  deleteDoctorForPolyclinic(polyclinic: Polyclinic, doctor: Doctor){
    this.ps.deleteDoctorForPolyclinic(polyclinic, doctor)
    .subscribe(res => {
      alert('Polyclinic deleted successfully!')
    }, error => {
      alert('Wrong name or this city already not exists!')
    }
    )
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0]
  }
}
