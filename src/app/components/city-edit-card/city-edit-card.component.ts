import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/app/models/City';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-city-edit-card',
  templateUrl: './city-edit-card.component.html',
  styleUrls: ['./city-edit-card.component.scss']
})
export class CityEditCardComponent {
  @Input() city!: City

  constructor(private cs: CityService, private router: Router) {  
  }

  updateCity(updateName: string) {
console.log(this.city.name)
console.log(updateName);
    return this.cs.updateCities(this.city.name, updateName)
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
}
