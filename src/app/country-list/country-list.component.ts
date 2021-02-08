import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../shared/model/country';
import { FireStoreService } from '../shared/services/firestore.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {

  countries: Observable<Country[]>

  constructor(private fs: FireStoreService) { }

  ngOnInit(): void {
    this.countries = this.fs.getCountries();
  }

}
