import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Subject, Observable, Subscribable } from 'rxjs';
import { AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  public listOfUsers: Observable<Array<any>>;

  constructor() { }

  testLog() {
    console.log('testLog Called');
    this.listOfUsers.subscribe(users => console.log(users));
  }

  
}
