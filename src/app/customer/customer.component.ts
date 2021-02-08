import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Country } from '../shared/model/country';
import { Customer } from '../shared/model/customer';
import { FireStoreService } from '../shared/services/firestore.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  // ToDo soll aus Service kommen
  countries: Country[] = [
    {name: 'Deutschland', code: 'DE'},
    {name: 'Schweiz', code: 'CH'},
    {name: 'Österreich', code: 'AT'}
  ]

  constructor(
    private fb: FormBuilder,
    private fsService: FireStoreService
  ) { }

  ngOnInit(): void {
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
