import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyWeekday } from '../interfaces/weekDay.interface';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  weekDays$: Observable<Array<MyWeekday>>;
  localWeekDays: Array<MyWeekday> = [];
  isSundayFirst = true;

  constructor(public afs: AngularFirestore) {
    this.weekDays$ = <Observable<Array<MyWeekday>>>this.afs.doc('admin/workHours').valueChanges();
    this.weekDays$.subscribe((weekdayObj) => {
      this.localWeekDays = weekdayObj['weekDays'];
      if (this.isSundayFirst) {
        console.log(this.localWeekDays);
        this.setSundayAsFirst();
      }
    });
  }

  updateWorkSchedule(weekDays: Array<MyWeekday>) {
    const data = { weekDays };
    const docRef: AngularFirestoreDocument<any> = this.afs.doc(`admin/workHours`);
    docRef.set(data, { merge: true });
  }

  setSundayAsFirst() {
    const sunday = this.localWeekDays.pop();
    this.localWeekDays.unshift(sunday);
  }
}
