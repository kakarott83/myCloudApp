import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Customer } from '../shared/model/customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  myCustomer: Customer;
  // ToDo soll aus Service kommen
  countries: string[] = ['Deutschland', 'Österreich','Schweiz']
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  customerForm = this.fb.group({
    customerName: [''],
    customerCity: [''],
    customerCountry: ['']
  });

  submit() {
    console.log(this.customerForm.value)
    this.customerForm.setValue({
      customerName: '',
      customerCity: '',
      customerCountry: ''
    });
  }

}
