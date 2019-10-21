import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { User } from '../core/user.model';

@Component({
  selector: 'app-my-files',
  templateUrl: './my-files.page.html',
  styleUrls: ['./my-files.page.scss'],
})
export class MyFilesPage implements OnInit {

  localUser: User;
  isReadOnly = true;
  isPaymentHistory = false;
  isMakePayment = false;

  constructor(private authService:AuthService) {
    this.authService.user$.subscribe(
      (user) => {
        this.localUser = user;
      }
    )
   }

  ngOnInit() {
  }

  onEdit() {
    this.isReadOnly = false;
  }

  onSaveEdit() {
    this.isReadOnly = true;
    this.authService.updateUserData(this.localUser);
  }

  testPage() {
    console.log(this.localUser);
  }



}
