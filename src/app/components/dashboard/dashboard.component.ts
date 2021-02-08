import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Travel } from '../../shared/model/travel';
import { User } from 'src/app/shared/services/user';
import { FireStoreService } from '../../shared/services/firestore.service'
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  travels: Observable<Travel[]>;
  users: Observable<User[]>;
  filteredUsers: Observable<User[]>;
  myFilteredTravels: Observable<Travel[]>;
  user: any = JSON.parse(localStorage.getItem('user'));
  faCoffee = faCoffee;
  myNewTravel: Travel = {
    customer: '',
    reason: '',
    end: new Date,
    start: new Date,
    car: 0,
    taxi: 0,
    hotel: 0,
    country: '',
    city: '',
    user: '',
    paid: false,
    submitted:false

  };

  constructor(
    public fsService: FireStoreService
  ) { }

  ngOnInit(): void {
    this.getAllTravels()
    this.getAllUsers()
    this.getFilteredUser('michael.lange@milan-muc.de')
    this.getFilteredTravels(this.user.uid)
  }

  getAllTravels() {
    this.travels = this.fsService.GetAllTravels()
  }

  getAllUsers() {
    this.users = this.fsService.GetAllUsers();
  }

  getFilteredUser(filter: string) {
    this.filteredUsers = this.fsService.GetFilteredUser(filter);
  }

  addTravel(myTravel: Travel) {
    const user = JSON.parse(localStorage.getItem('user'))
    myTravel.user = user.uid;
    this.fsService.addTravel(myTravel);
  }

  getFilteredTravels(filter: string) {
    console.log(filter);
    this.myFilteredTravels = this.fsService.GetFilteredTravelByUser(filter);

  }

}
