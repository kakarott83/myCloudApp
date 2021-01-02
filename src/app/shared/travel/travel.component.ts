import { Component, OnInit } from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit {
  
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
  constructor(private _adapter: DateAdapter<any>) {
    this._adapter.setLocale('de');
   }

  ngOnInit(): void {
  }

}
