import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyFilesPage } from './my-files.page';
import { UserSourcesComponent } from './user-sources/user-sources.component';
import { PaymentFormComponent } from './payment/payment-form/payment-form.component';
import { StripePipe } from '../stripe.pipe';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: MyFilesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    HttpModule
  ],
  declarations: [MyFilesPage, UserSourcesComponent, PaymentFormComponent, StripePipe]
})
export class MyFilesPageModule {}
