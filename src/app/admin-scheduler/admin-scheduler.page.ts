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

export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  month(event: Appointments): string {
    let ampm = "AM";
    let hr = event.start.getHours();
    let min = event.start.getMinutes().toString();
    if (hr > 12) {
      hr -= 12;
      ampm = "PM";
    }
    if (min < '10') {
      min = '0' + min;
    }
    let desc = '';
    if (event.desc != null) {
      desc = event.desc;
    }
    return `${event.title}, Start: ${hr}:${min} ${ampm} | '${desc}'`;
  }
}

@Component({
  selector: 'app-admin-scheduler',
  templateUrl: './admin-scheduler.page.html',
  styleUrls: ['./admin-scheduler.page.scss'],
  providers: [{
    provide: CalendarEventTitleFormatter,
    useClass: CustomEventTitleFormatter
  }]
})
export class AdminSchedulerPage implements OnInit {

  excludeDays: number[] = [];
  dayStartHour = 8;

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
  events: CalendarEvent[] = [];

  constructor(public scheduleServices: ScheduleService) {

  }

  ngOnInit() {
    this.scheduleServices.calendarEvents$.subscribe((events: Array<any>) => {
      console.log('inside subsctibe');
      events.forEach(element => {
        element.start = new Date(element.start.seconds * 1000);
        element.end = new Date(element.end.seconds * 1000);
        if (element.start < new Date()) {
          element.color = colors.red;
        }
      });
      this.events = events;
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

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event): void {
    this.modalData = { event, action };
    //this.modal.open(this.modalContent, { size: 'lg' });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  testRefresh() {
    //this.addEvent();
  }

  addEvent(appointment): void {
    const test = new Date();
    const start = new Date(appointment.start.seconds * 1000);
    const end = new Date(appointment.end.seconds * 1000);
    console.log('start:', start);
    console.log('end: ', end);
    this.events = [
      ...this.events,
      {
        title: appointment.title,
        start: startOfDay(start),
        end: endOfDay(end),
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


}
