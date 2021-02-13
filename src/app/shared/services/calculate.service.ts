import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Travel } from '../model/travel';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {

  start: moment.Moment;
  end: moment.Moment;
  hotel: Number;
  taxi: Number;
  Auto: Number;
  diff: any;
  amount = 0;

  constructor() { }

  calculate(travel: Travel): number {
    this.start = moment(travel.start);
    this.end = moment(travel.end);
    const days = this.end.diff(this.start, 'days')
    const hours = this.end.diff(this.start, 'hours')
    const startDay = moment(travel.start).format('DDMMYYYY')
    const endDay = moment(travel.end).format('DDMMYYYY')

    console.log(hours,'Stunde');
    console.log(days,'Tage');
    console.log(startDay);

    // größer 8 h keine Übernachtung
    if(hours >= 8 && startDay === endDay) {
      //Tagespauschale 
      this.amount = travel.customer.country.partRate
    }

    if(startDay != endDay && days <= 1) {
      //Anreise
      this.amount = travel.customer.country.partRate;
      //Abreise
      this.amount += travel.customer.country.partRate * 0.8;
    }

    //Übernachtung
    if(days > 1) {
      //Anreise
      this.amount = travel.customer.country.partRate;
      //+ Abreise - 20%
      this.amount += travel.customer.country.rate * 0.8;
      //+ Tag * Pauschale -20%
      this.amount += (days - 2) * (travel.customer.country.rate * 0.8);
    }

    //Ausgaben
    this.amount += ((travel.hotel === undefined || travel.hotel === null) ? 0 : travel.hotel) + ((travel.taxi === undefined || travel.taxi === null) ? 0 : travel.taxi) + ((travel.car === undefined || travel.car === null) ? 0 : travel.car);
    return this.amount;

  }

}
