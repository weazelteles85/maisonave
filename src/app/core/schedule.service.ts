import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyWeekday } from '../interfaces/weekDay.interface';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  weekDays$: Observable<Array<MyWeekday>>;
  localWeekDays: Array<MyWeekday> = [];
  isSundayFirst = true;

  constructor(public afs: AngularFirestore) {
    this.weekDays$ = <Observable<Array<MyWeekday>>>this.afs.doc('admin/workHours').valueChanges();
    this.weekDays$.subscribe((weekdaysObj) => {
      this.localWeekDays = weekdaysObj['weekDays'];
    });
  }

  updateWorkSchedule(weekDays: Array<MyWeekday>) {
    const data = { weekDays };
    const docRef: AngularFirestoreDocument<any> = this.afs.doc(`admin/workHours`);
    docRef.set(data, { merge: true });
  }

  getScheduleBasedOnDate(date: Date) {
    return this.afs.collection('appointments', ref => ref
      .where('appointment', '==', date)
    ).get().toPromise();
  }

  getWorkHoursForDay(date: Date) {
    console.log(date.getDay());
    const dayOfWeek = new Date(date).toLocaleString('en-us', { weekday: 'long' });
    console.log(dayOfWeek);
    return this.afs.collection('admin').doc('workHours').get().pipe(map((value) => {
      if (date.getDay() === 0) {
        return value.data()['weekDays'][date.getDay() + 6];
      } else {
        return value.data()['weekDays'][date.getDay() - 1];
      }
    })).toPromise();
  }

}
