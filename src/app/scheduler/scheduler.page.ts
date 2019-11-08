import { Component, OnInit, AfterContentInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { ScheduleService } from '../core/schedule.service';
import { Appointments } from '../interfaces/appointments.interface';
import { MyWeekday } from '../interfaces/weekDay.interface';
import { ModalController } from '@ionic/angular';
import { SetAppointmentComponent } from './set-appointment/set-appointment.component';
import { ReplaySubject } from 'rxjs';


@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.page.html',
  styleUrls: ['./scheduler.page.scss'],
})
export class SchedulerPage implements OnInit, AfterContentInit {

  datePickerForm: FormGroup;
  exampleOptions: FlatpickrOptions;
  availableSlots: Array<Number>;
  appointments: Array<Appointments>;
  selectedDate: Date;

  constructor(public authService: AuthService, private scheduleService: ScheduleService, public modalController: ModalController) { }

  ngOnInit() {
    this.datePickerForm = new FormGroup({
      'datePicker': new FormControl(''),
    });
    this.exampleOptions = {
      dateFormat: 'D, F J',
      placeholder: 'Pick a date!',
      onChange: (e) => {
        this.onDateSelected(e);
      }
    };
    this.datePickerForm.get('datePicker');
  }

  ngAfterContentInit() {
    console.log('afterContentInit');
    //this.appointmentsSubj.next([]);
    this.scheduleService.userAppointments$.subscribe((appointments) => {
      console.log('inside appointments');
      console.log(appointments);
    });
  }

  async presentAppointmentModal(timeSlot: number) {
    const typeModal = await this.modalController.create({
      component: SetAppointmentComponent,
      componentProps: {
        timeSlot,
        selectedDate: this.selectedDate,
        hasSaved: false
      }
    });
    typeModal.onDidDismiss().then((event) => {
      if (event.data !== null) {
        if (event.data.hasSaved) {
          console.log('triger refresh');
          location.reload();
        }
      }
    });
    return await typeModal.present();
  }


  async onDateSelected(event) {
    this.appointments = [];
    console.log('onDateSelected');
    this.selectedDate = new Date(event);
    const dayWorkHours = await this.scheduleService.getWorkHoursForDay(this.selectedDate);
    const docsArray: any = await this.scheduleService.getScheduleBasedOnDate(this.selectedDate);
    if (docsArray.docs.length > 0) {
      const appointments: Array<Appointments> = [];
      docsArray.docs.forEach(appointment => {
        appointments.push(appointment.data());
      });
      this.appointments = appointments;
    } else {
      console.log('No Appointments in this date');
    }
    this.setAvailableTimeSlots(dayWorkHours);
  }

  setAvailableTimeSlots(dayWorkHours: MyWeekday) {
    const availableSlots = [];
    for (let index = dayWorkHours.start; index < dayWorkHours.end; index += .5) {
      availableSlots.push(index);
    }
    console.log(availableSlots);
    this.availableSlots = availableSlots;
  }

  isSlotUnavailable(timeSlot: number) {
    if (this.appointments.find(a => a['hourSlot'] === timeSlot)) {
      return true;
    } else {
      return false;
    }
  }

  onDeleteAppointment(appointment: Appointments) {
    this.scheduleService.deleteAppointment(appointment);
  }

}
