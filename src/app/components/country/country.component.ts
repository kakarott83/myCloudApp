import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faBaby } from '@fortawesome/free-solid-svg-icons';
import { count } from 'rxjs/operators';
import { Country } from '../../shared/model/country';
import { FireStoreService } from '../../shared/services/firestore.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  myCountry = Country;

  constructor(
    private fb: FormBuilder,
    private fs: FireStoreService) { }

  ngOnInit(): void {
  }

  countryForm = this.fb.group({
    name: [''],
    code: [''],
    rate: [''],
    partRate: ['']
  })

  submit() {
    this.fs.addCountry(this.countryForm.value);
    this.countryForm.setValue({
      name: '',
      code: '',
      rate: '',
      partRate: ''
    })
  }

}
