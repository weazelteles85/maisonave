import { CalendarEvent } from 'calendar-utils';

export interface Appointments extends CalendarEvent {
    appointmentID: string;
    userID: string;
    userName: string;
    email: string;
    desc: string;
    date: Date;
    hourSlot: number;
    title: string;
    start: Date;
    end?: Date;
  }
