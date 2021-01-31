import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Travel } from '../shared/model/travel';
import { FireStoreService } from '../shared/services/firestore.service';

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrls: ['./travel-list.component.css']
})
export class TravelListComponent implements OnInit {

  myTravel: Travel
  myTravels: Observable<Travel[]>;
  constructor(private fsService: FireStoreService) {
   }

  ngOnInit(): void {
    this.myTravels = this.fsService.GetAllTravels();
  }

  selected(travel: Travel) {
    this.myTravel = travel;
  }

}
