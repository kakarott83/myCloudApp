import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Travel } from '../model/travel';
import { FireStoreService } from '../services/firestore.service'

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit {
  
  myTravel = new Travel;

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
   }

  ngOnInit(): void {
  }

  onSubmit(): void {
   console.log(this.myTravel)
   this.fsService.addTravel(this.myTravel)
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
   travel.user = ''

   return travel
 }
}
