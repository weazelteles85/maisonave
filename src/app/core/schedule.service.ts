import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { MyWeekday } from '../interfaces/weekDay.interface';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Appointments } from '../interfaces/appointments.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  weekDays$: Observable<Array<MyWeekday>>;
  localWeekDays: Array<MyWeekday> = [];
  isSundayFirst = true;
  userAppointments$: Observable<any> = new Observable<any>();
  calendarEvents$: Observable<any> = new Observable<any>();

  constructor(public afs: AngularFirestore, private authServices: AuthService) {
    this.weekDays$ = <Observable<Array<MyWeekday>>>this.afs.doc('admin/workHours').valueChanges();
    this.weekDays$.subscribe((weekdaysObj) => {
      this.localWeekDays = weekdaysObj['weekDays'];
    });
    this.getUserAppointments();
    this.getCalendarEvents();
  }

  updateWorkSchedule(weekDays: Array<MyWeekday>) {
    const data = { weekDays };
    const docRef: AngularFirestoreDocument<any> = this.afs.doc(`admin/workHours`);
    docRef.set(data, { merge: true });
  }

  getUserAppointments() {
    this.authServices.user$.subscribe((user) => {
      this.userAppointments$ = this.afs.collection('appointments', ref => ref.
      where('userID', '==', user.UserID)).valueChanges();
    });
  }

  getCalendarEvents() {
    console.log('set observer');
    this.calendarEvents$ = this.afs.collection('appointments').valueChanges();
  }

  getScheduleBasedOnDate(date: Date) {
    const end = this.addDays(date, 1);
    return this.afs.collection('appointments', ref => ref
      .where('start', '>', date)
      .where('start', '<', end)
    ).get().toPromise();
  }

  addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  getWorkHoursForDay(date: Date) {
    console.log(date.getDay());
    const dayOfWeek = new Date(date).toLocaleString('en-us', { weekday: 'long' });
    console.log(dayOfWeek);
    return this.afs.collection('admin').doc('workHours').get().pipe(map((value) => {
      if (date.getDay() === 0) {
        return value.data()['weekDays'][date.getDay()];
      } else {
        return value.data()['weekDays'][date.getDay()];
      }
    })).toPromise();
  }

  setNewAppointment(appointment: Appointments) {
   const docId = this.afs.createId();
   appointment.appointmentID = docId;
   const docRef = this.afs.collection('appointments').doc(docId);
   docRef.set(appointment, {merge: true});
  }

  deleteAppointment(appointment: Appointments) {
    this.afs.collection('appointments').doc(appointment.appointmentID).delete();
  }

}
