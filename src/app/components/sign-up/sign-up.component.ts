import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/services/user';
import { FireStoreService } from '../../shared/services/firestore.service'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  myUser: User = {email: null, displayName: null, pw: null}

  constructor(
    public fsService: FireStoreService
  ) { }

  ngOnInit(): void {
  }

}
