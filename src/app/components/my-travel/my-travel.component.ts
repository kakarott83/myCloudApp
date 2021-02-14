import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatAccordion } from '@angular/material/expansion';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/shared/model/customer';
import { Reason } from 'src/app/shared/model/reason';
import { Travel } from 'src/app/shared/model/travel';
import { CalculateService } from 'src/app/shared/services/calculate.service';
import { FireStoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-my-travel',
  templateUrl: './my-travel.component.html',
  styleUrls: ['./my-travel.component.css']
})
export class MyTravelComponent implements OnInit {

  @Input() myTravelInput: Travel
  @ViewChild(MatAccordion) accordion: MatAccordion;

  user: any;
  customers: Observable<Customer[]>;
  reasons: Reason[]

  amount: number = 100.50;
  rate: number = 75.25;
  spend: number = 25.25;

  constructor(
    private _adapter: DateAdapter<any>,
    private _fsService: FireStoreService,
    private _calculate: CalculateService,
    private _formBuilder: FormBuilder
  ) { 
    this._adapter.setLocale('de');
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
    /*ToDo TravelOjekt*/
    /*if(!this.myTravel) {
        this.myTravel = {
        customer: {name: '', city: '', country: {name: '', code: ''}}
      }
    console.log(this.myTravel,'Obekt');
    }*/
    //Kunden holen
    this.customers = this._fsService.getCustomers();

    //Gründe holen
    this.reasons = this._fsService.getReasons();
  }

  myTravelForm = this._formBuilder.group({
    customer: [''],
    start: [''],
    end: [''],
    reason: [''],
    taxi: [''],
    hotel: [''],
    car: ['']
  })

  onSubmit(): void {
    //this.myTravel.user = this.user.uid;
    //this._fsService.addTravel(this.myTravel);
    console.log(this.myTravelForm.value);
  }

  calculate(): void {
    this.myTravel.amount = this._calculate.calculate(this.myTravel);
  }

  updateTravel(): void {
    console.log(this.myTravelForm.value.customer);
  }

}
