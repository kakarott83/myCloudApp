import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-travel',
  templateUrl: './my-travel.component.html',
  styleUrls: ['./my-travel.component.css']
})
export class MyTravelComponent implements OnInit {

  amount: number = 100.50;
  rate: number = 75.25;
  spend: number = 25.25;
  constructor() { }

  ngOnInit(): void {
  }

}
