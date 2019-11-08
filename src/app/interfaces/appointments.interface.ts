import { CalendarEvent } from 'calendar-utils';

export interface Appointments extends CalendarEvent {
    appointmentID: string;
    userID: string;
    userName: string;
    desc: string;
    date: Date;
    hourSlot: number;
  }
