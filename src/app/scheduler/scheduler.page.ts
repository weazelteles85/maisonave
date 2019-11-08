import { Component, OnInit} from '@angular/core';
import { AuthService } from '../core/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { ScheduleService } from '../core/schedule.service';
import { Appointments } from '../interfaces/appointments.interface';
import { MyWeekday } from '../interfaces/weekDay.interface';
import { ModalController } from '@ionic/angular';
import { SetAppointmentComponent } from './set-appointment/set-appointment.component';


@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.page.html',
  styleUrls: ['./scheduler.page.scss'],
})
export class SchedulerPage implements OnInit {

  datePickerForm: FormGroup;
  exampleOptions: FlatpickrOptions;
  availableSlots: Array<number>;

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

  async presentAppointmentModal(timeSlot: number) {
    const typeModal = await this.modalController.create({
      component: SetAppointmentComponent,
      componentProps: {
        timeSlot
      }
    });
    typeModal.onDidDismiss().then((data) => {
      // Maybe refresh current Page
    });
    return await typeModal.present();
  }


  async onDateSelected(event) {
    const date = new Date(event);
    const dayWorkHours = await this.scheduleService.getWorkHoursForDay(date);
    const docsArray: any = await this.scheduleService.getScheduleBasedOnDate(date);
    if (docsArray.docs.length > 0) {
      const appointments: Array<Appointments> = [];
      docsArray.docs.forEach(appointment => {
        appointments.push(appointment.data());
      });
      console.log(appointments);
    } else {
      // No Appointments in this date
      console.log('No Appointments in this date');
      console.log(dayWorkHours);
    }
    this.setAvailableTimeSlots(dayWorkHours);
  }

  setAvailableTimeSlots(dayWorkHours: MyWeekday) {
    this.availableSlots = [];
    for (let index = dayWorkHours.start; index < dayWorkHours.end; index += .5) {
      this.availableSlots.push(index);
    }
    console.log(this.availableSlots);
  }

}
