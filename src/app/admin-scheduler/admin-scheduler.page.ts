import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit} from '@angular/core';
import {startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth,  addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarEventTitleFormatter, CalendarEventAction, CalendarEventTimesChangedEvent,
  CalendarView } from 'angular-calendar';

//import { FlatpickrOptions } from 'ng2-flatpickr';
import { FormGroup, FormControl } from '@angular/forms';
import { Events } from '@ionic/angular';
import { MyEvents } from '../core/events.interface';

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

class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  month(event: MyEvents): string {
  return `Title: ${event.title}, Time: ${event.start}, End: ${event.end}`;
  }
}

@Component({
  selector: 'app-admin-scheduler',
  templateUrl: './admin-scheduler.page.html',
  styleUrls: ['./admin-scheduler.page.scss'],
})
export class AdminSchedulerPage implements OnInit {

  excludeDays: number[] = [];
  dayStartHour = 8;

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
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

  constructor() { }

  ngOnInit() {
  }

  handleEvent(action: string, event): void {
    this.modalData = { event, action };
    //this.modal.open(this.modalContent, { size: 'lg' });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

}
