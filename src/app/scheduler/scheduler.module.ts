import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SchedulerPage } from './scheduler.page';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
import { TimeFormatPipe } from '../shared/time-format.pipe';
import { SharedModule } from '../shared/shared.module';
import { SetAppointmentComponent } from './set-appointment/set-appointment.component';


const routes: Routes = [
  {
    path: '',
    component: SchedulerPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    Ng2FlatpickrModule
  ],
  declarations: [SchedulerPage, SetAppointmentComponent],
  entryComponents: [ SetAppointmentComponent ]
})
export class SchedulerPageModule {}
