import { Component, OnInit } from '@angular/core';
import { WeekDay } from 'calendar-utils';
import { MyWeekday } from '../../interfaces/weekDay.interface';
import { ScheduleService } from '../../core/schedule.service';

@Component({
  selector: 'app-set-schedule',
  templateUrl: './set-schedule.component.html',
  styleUrls: ['./set-schedule.component.scss']
})
export class SetScheduleComponent implements OnInit {

  dayTimeSelection: Array<number>;
  weekDays: Array<MyWeekday> = [];
  sundayFirstWeek: Array<MyWeekday> = [];

  constructor(public scheduleSer: ScheduleService) { }

  ngOnInit() {
    this.dayTimeSelection = [
      0, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14,
      14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22,
    ];
    this.scheduleSer.weekDays$.subscribe((weekdaysObj) => {
      this.sundayFirstWeek = weekdaysObj['weekDays'];
      const sunday = this.sundayFirstWeek.pop();
      this.sundayFirstWeek.unshift(sunday);
    });
  }

  changeStartValue(event, weekDay: MyWeekday) {
    const weekdays = this.scheduleSer.localWeekDays;
    console.log('event:', event.detail.value);
    weekdays.find(d => d.day === weekDay.day).start = this.getHourNumberFromString(event.detail.value);
    // IF THE VALUE IS 0 (CLOSED), SET weekDay.end TO 0
    if (weekdays.find(d => d.day === weekDay.day).start === 0) {
      weekdays.find(d => d.day === weekDay.day).end = 0;
    }
    this.scheduleSer.updateWorkSchedule(weekdays);
  }

  changeEndValue(event, weekDay: MyWeekday) {
    const weekdays = this.scheduleSer.localWeekDays;
    weekdays.find(d => d.day === weekDay.day).end = this.getHourNumberFromString(event.detail.value);
    // IF THE VALUE IS 0 (CLOSED), SET weekDay.start TO 0
    if (weekdays.find(d => d.day === weekDay.day).end === 0) {
      weekdays.find(d => d.day === weekDay.day).start = 0;
    }
    this.scheduleSer.updateWorkSchedule(weekdays);
  }

  checkIfSundayFirst() {
    if (this.scheduleSer.isSundayFirst) {
      return this.sundayFirstWeek;
    } else {
      return this.scheduleSer.localWeekDays;
    }
  }

  getHourNumberFromString(time: string) {
    time = time.trim();
    if (time === 'Closed') {
      console.log('returning 0');
      return 0;
    }
    let hour = parseFloat(time.split(':')[0]);
    const minutes = time.split(':')[1];
    const AMPM = time.split(' ')[1];
    console.log(AMPM);
    if (AMPM === 'PM') {
      hour += 12;
    }
    if (minutes === '30') {
      hour += .5;
    }
    console.log('returning: ', hour);
    return hour;
  }



}
