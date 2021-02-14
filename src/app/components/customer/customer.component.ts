import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Country } from '../../shared/model/country';
import { Customer } from '../../shared/model/customer';
import { FireStoreService } from '../../shared/services/firestore.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  countries: Observable<Country[]>

  constructor(
    private fb: FormBuilder,
    private fsService: FireStoreService
  ) { }

  ngOnInit(): void {
    this.countries = this.fsService.getCountries()
  }

  customerForm = this.fb.group({
    name: [''],
    city: [''],
    country: ['']
  });

  submit() {
    this.fsService.addCustomer(this.customerForm.value);
    this.customerForm.setValue({
      name: '',
      city: '',
      country: ''
    });
  }

}
