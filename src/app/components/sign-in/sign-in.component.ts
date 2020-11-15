import { Component, OnInit } from '@angular/core';
import { FireStoreService } from '../../shared/services/firestore.service'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(
    public fsService: FireStoreService
  ) { }

  ngOnInit(): void {
  }

}
