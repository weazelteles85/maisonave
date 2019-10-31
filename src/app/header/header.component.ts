import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item, Row } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../core/auth.service';
//import { User } from '../core/user';
import { User } from '../core/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private afs:AngularFirestore, public auth: AuthService, private router: Router) { }

  public user: User
  windowSize: number;

  ngOnInit() {
    console.log('Running Version 1.2');
    this.windowSize = window.innerWidth;
    this.auth.user$.subscribe(user => this.user = user);
  }

  onClickLink() {
    console.log('add logic for highlighting active link');
  }

  onLogoutClick() {
    this.router.navigate(['/']);
    this.auth.logOut();
  }

  goToMyFiles() {
    
  }

  goToAdminConsole() {
    if (this.auth.canDelete(this.user)) {
      console.log("Acess Granted")
    }
    else console.log('Acess Denied Must be Admin');
  }


}
