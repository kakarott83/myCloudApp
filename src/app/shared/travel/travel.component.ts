import { Component, Input, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { of } from 'rxjs';
import { Travel } from '../model/travel';
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
  user;

  pickerStart
  pickerEnd
  customers = [
    {name: 'BANK-now'},
    {name: 'AIL'}
  ]

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
    private fsService: FireStoreService
    ) {
    this._adapter.setLocale('de');
    this.user = JSON.parse(localStorage.getItem('user'));
   }

  ngOnInit(): void {
    if(!this.myTravel) {
      this.myTravel = new Travel;
    }

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
   this.myTravel.user = this.user.uid
   this.fsService.addTravel(this.myTravel);
   this.myTravel = this.clearTravel(this.myTravel);
 }

 clearTravel(travel: Travel): Travel {
   travel.customer = '';
   travel.reason = '';
   //travel.end = new Date;
   //travel.start = new Date;
   travel.car = 0;
   travel.taxi = 0;
   travel.hotel = 0;
   travel.country = '';
   travel.city = '';
   travel.user = '',
   travel.paid = false,
   travel.submitted = false

   return travel
 }
}
