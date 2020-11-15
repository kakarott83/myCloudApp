import { Component, OnInit } from '@angular/core';
import { FireStoreService } from '../../shared/services/firestore.service'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    public fsService: FireStoreService
  ) { }

  ngOnInit(): void {
  }

}
