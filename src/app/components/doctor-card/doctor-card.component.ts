import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { Doctor } from 'src/app/models/Doctor';
import { DoctorService } from 'src/app/services/doctor.service';
import { SpecializationService } from 'src/app/services/specialization.service';

@Component({
  selector: 'app-doctor-card',
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.scss']
})
export class DoctorCardComponent {
  doctor!: Doctor
  doctorId!: string

  constructor(private ds: DoctorService,
    private ss: SpecializationService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute) {

      this.route.params.subscribe(params => {
       this.doctorId = params['id']});

      (this.ds.getDoctorById(Guid.parse(this.doctorId))).subscribe((doctors: Doctor[]) => {
        this.doctor = doctors[0]
                  this.ds.getImage(doctors[0].doctorId).subscribe((image: Blob) => {
            this.ss.getSpecialization().subscribe(z  => {
              this.doctor.specializations = z.filter(item => item.doctorId == this.doctor.doctorId)
              console.log(this.doctor.specializations)
            })
            this.doctor.image = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(image));
          }, (err: HttpErrorResponse) => {
            console.log(err)
          })
        });
  }
}