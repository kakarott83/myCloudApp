import { Component, OnInit } from '@angular/core';
import { FireStoreService } from '../../shared/services/firestore.service'

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  constructor(
    public fsService: FireStoreService
  ) { }

  ngOnInit(): void {
  }

}
