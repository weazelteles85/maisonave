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

  dayTimeSelection: Array<string>;
  weekDays: Array<MyWeekday> = [];
  isSundayFirst = true;

  constructor(public scheduleSer: ScheduleService) { }

  ngOnInit() {
    this.dayTimeSelection = ['6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
      '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'];
    console.log(this.weekDays);
    //this.scheduleSer.updateWorkSchedule(this.weekDays)
  }

  changeStartValue(event, value) {
    // Add loginc to update chedule change on cloud.
  }

  changeEndValue(event, obj) {
    obj.endStr = event.detail.value;
  }


  setSundayAsFirst(weekdays: Array<MyWeekday>) {
    const sunday = weekdays.pop();
    weekdays.unshift(sunday);
    return weekdays;
  }



}
