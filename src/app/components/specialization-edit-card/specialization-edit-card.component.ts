import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { Specialization } from 'src/app/models/Specialization';
import { DoctorService } from 'src/app/services/doctor.service';
import { SpecializationService } from 'src/app/services/specialization.service';

@Component({
  selector: 'app-specialization-edit-card',
  templateUrl: './specialization-edit-card.component.html',
  styleUrls: ['./specialization-edit-card.component.scss']
})
export class SpecializationEditCardComponent implements OnInit {
  @Input() specialization!: Specialization
  doctorName!: string
  @Input() doctorId!: Guid

  constructor(private ds: DoctorService, private ss: SpecializationService, private router: Router) {
  }

  ngOnInit(): void {
    this.GetDoctorName();
  }

  async GetDoctorName() {
    console.log(this.doctorId)
    this.ds.getDoctorById(this.doctorId).subscribe(x =>
      this.doctorName = x[0].fio)
  }

  updateSpecialization(name: string, doctorName: string, experience: string) {

    var specialization = new Specialization();
    specialization.name = name;
    specialization.experienceSpecialization = Number(experience)

    this.ds.getDoctor(doctorName, '').subscribe(doctor => {
      doctor.forEach(x => {
        console.log(x)
        specialization.doctorId = x.doctorId

        this.ss.getSpecialization().subscribe(x => {

          var getSpecialization = x.filter(x => x.name == name && x.doctorId == specialization.doctorId)
          
          specialization.specializationId = getSpecialization[0].specializationId

          return this.ss.updateSpecialization(this.specialization.name, specialization)
            .subscribe(res => {
              alert('Specialization updated successfully!')
              this.router.navigate(['edit']);
            }, error => {
              alert('Wrong parameters!')
            })
        })
      });
    })


  }

  deleteSpecialization() {
    return this.ss.deleteSpecialization(this.specialization.name)
      .subscribe(res => {
        alert('Specialization deleted successfully!')
      }, error => {
        alert('Wrong name or this specialization already not exists!')
      }
      )
  }

}
