import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { ScheduleService } from '../../core/schedule.service';
import { Appointments } from '../../interfaces/appointments.interface';

@Component({
  selector: 'app-set-appointment',
  templateUrl: './set-appointment.component.html',
  styleUrls: ['./set-appointment.component.scss']
})
export class SetAppointmentComponent implements OnInit {

  @Input() timeSlot: number;
  @Input() selectedDate: Date;
  @Input() hasSaved: boolean;
  appointmentForm: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    navParams: NavParams,
    private authService: AuthService,
    private scheduleServices: ScheduleService) {
    console.log(navParams.get('timeSlot'));
    console.log(navParams.get('selectedDate'));
  }

  ngOnInit() {
    this.appointmentForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required]),
      desc: new FormControl()
    });
    this.setFormValues();
  }

  setFormValues() {
    const user = this.authService.localUser;
    this.appointmentForm.get('name').setValue(`${user.NFirst} ${user.NLast}`);
    this.appointmentForm.get('email').setValue(user.Email);
  }

  setAppointment() {
    this.hasSaved = true;
    let start: Date;
    let end: Date;
    if (this.timeSlot % 1 === 0) {
      start = new Date(this.selectedDate.setHours(this.timeSlot));
      end = new Date(this.selectedDate.setHours(this.timeSlot, 30));
    } else {
      start = new Date(this.selectedDate.setHours(this.timeSlot, 30));
      end = new Date(this.selectedDate.setHours(this.timeSlot + 1, 0));
    }
    const appointment: Appointments = {
      appointmentID: '',
      userID: this.authService.localUser.UserID,
      userName: this.appointmentForm.get('name').value,
      title: this.appointmentForm.get('name').value,
      email: this.appointmentForm.get('email').value,
      desc: this.appointmentForm.get('desc').value,
      date: this.selectedDate,
      hourSlot: this.timeSlot,
      start: start,
      end: end
    };
    console.log(appointment.start);
    this.scheduleServices.setNewAppointment(appointment);
    this.modalCtrl.dismiss({hasSaved: this.hasSaved});
  }

  dismiss(text: string) {
    this.modalCtrl.dismiss({
      hasSaved: this.hasSaved
    });
  }

}
