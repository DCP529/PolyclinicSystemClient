import { Component, Input } from '@angular/core';
import { Doctor } from 'src/app/models/Doctor';
import { Specialization } from 'src/app/models/Specialization';

@Component({
  selector: 'app-doctor-form',  
  template: `<app-doctor-card [doctor]="doctor"></app-doctor-card>`,
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.scss']
})
export class DoctorFormComponent {
  @Input() doctor!: Doctor
}
