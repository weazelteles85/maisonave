import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminSchedulerPage } from './admin-scheduler.page';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SetScheduleComponent } from './set-schedule/set-schedule.component';
import { AppModule } from '../app.module';
import { TimeFormatPipe } from '../shared/time-format.pipe';

const routes: Routes = [
  {
    path: '',
    component: AdminSchedulerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  declarations: [AdminSchedulerPage, SetScheduleComponent, TimeFormatPipe]
})
export class AdminSchedulerPageModule { }
