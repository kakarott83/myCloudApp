import { Component, Input, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Observable, of } from 'rxjs';
import { Customer } from '../model/customer';
import { Travel } from '../model/travel';
import { CalculateService } from '../services/calculate.service';
import { FireStoreService } from '../services/firestore.service'

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit {
  
  @Input() type: string;
  @Input() myTravel: Travel;


  // myTravel = new Travel;
  title = 'Neue Reise erfassen';
  subTitle = 'Erstattung';
  user: any;

  pickerStart: any;
  pickerEnd: any;
  customers: Observable<Customer[]>;

  reasons = [
    {type: 'Livegang'},
    {type: 'Vor-Ort-Betreuung'}
  ]

  countries = [
    {name: 'Deutschland'},
    {name: 'Schweiz'},
    {name: 'Österreich'},
  ]

  constructor(
    private _adapter: DateAdapter<any>,
    private fsService: FireStoreService,
    private _calculate: CalculateService
    ) {
    this._adapter.setLocale('de');
    this.user = JSON.parse(localStorage.getItem('user'));
   }

  ngOnInit(): void {
    if(!this.myTravel) {
      this.myTravel = new Travel;
    }

    this.customers = this.fsService.getCustomers();

    switch (this.type)
    {
      case 'add': {
        this.title = 'Neue Reise';
        break;
      }
      case 'edit': {
        this.title = 'Gewählte Reise';
        break;
      }
      default: {
        this.title = 'Neue Reise';
        break;
      }
    };
  }

  onSubmit(): void {
   this.myTravel.user = this.user.uid;
   this.fsService.addTravel(this.myTravel);
   this.myTravel = this.clearTravel(this.myTravel);
 }

 clearTravel(travel: Travel): Travel {
   travel.customer = null;
   travel.reason = '';
   //travel.end = new Date;
   //travel.start = new Date;
   travel.car = 0;
   travel.taxi = 0;
   travel.hotel = 0;
   travel.country = '';
   travel.city = '';
   travel.user = '';
   travel.paid = false;
   travel.submitted = false;
   travel.amount = 0;

   return travel
 }

 calculate() {
   this.myTravel.amount = this._calculate.calculate(this.myTravel);
 }

}
