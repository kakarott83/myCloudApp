import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../shared/model/customer';
import { FireStoreService } from '../shared/services/firestore.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  myCustomers: Observable<Customer[]>

  constructor(private fsService: FireStoreService) { }

  ngOnInit(): void {
    this.myCustomers = this.fsService.getCustomers();
  }

}
