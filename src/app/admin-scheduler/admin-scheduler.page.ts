import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent, CalendarEventTitleFormatter, CalendarEventAction, CalendarEventTimesChangedEvent,
  CalendarView,
  CalendarMonthViewDay
} from 'angular-calendar';

//import { FlatpickrOptions } from 'ng2-flatpickr';
import { FormGroup, FormControl } from '@angular/forms';
import { Events } from '@ionic/angular';
import { ScheduleService } from '../core/schedule.service';
import { Appointments } from '../interfaces/appointments.interface';
//import { MyEvents } from '../core/events.interface';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

// class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
//   month(event: MyEvents): string {
//   return `Title: ${event.title}, Time: ${event.start}, End: ${event.end}`;
//   }
// }

@Component({
  selector: 'app-admin-scheduler',
  templateUrl: './admin-scheduler.page.html',
  styleUrls: ['./admin-scheduler.page.scss'],
})
export class AdminSchedulerPage implements OnInit {

  excludeDays: number[] = [];
  dayStartHour = 8;
  weekStartDay;

  @ViewChild('modalContent', {}) modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: Events;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="far fa-edit"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  activeDayIsOpen: boolean = false;
  datePickerForm: FormGroup;
  events: CalendarEvent[] = [
    {
      title: 'string',
      start: new Date(),
      end: new Date(),
    }
  ];

  constructor(public scheduleServices: ScheduleService) { }

  ngOnInit() {
    this.scheduleServices.calendarEvents$.subscribe((events: Array<Appointments>) => {
      console.log('inside subsctibe');
      console.log(events);
      events.forEach(event => {
        this.events.push({
          title: event.title,
          start: new Date(event.start),
          end: new Date(event.end)
        });
      });
      console.log(events);
      this.refresh.next();
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log('day Clicked');
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
      console.log(this.viewDate);
    }
  }

  changeStartDay(event) {
    if (event.detail.checked) {
      this.weekStartDay = 0;
      this.refresh.next();
    } else {
      this.weekStartDay = 1;
      this.refresh.next();
    }
    console.log(this.weekStartDay);
  }

  handleEvent(action: string, event): void {
    this.modalData = { event, action };
    //this.modal.open(this.modalContent, { size: 'lg' });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  addEvent(date): void {
    console.log(date);
    this.events = [
      ...this.events,
      {
        title: 'Event Title Here',
        start: startOfDay(date),
        end: endOfDay(date.setDate(date.getDate() + 1)),
        color: colors.red,
        draggable: false,
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
        actions: this.actions
      }
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      if (day.date.getDate() % 2 === 1) {
        //day.cssClass = this.cssClass;
      }
    });
  }

}
