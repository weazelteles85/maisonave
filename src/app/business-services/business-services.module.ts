import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BusinessServicesPage } from './business-services.page';
import { BusinessRoutingModule } from './business-ser.router.module';
import { CorporatePageModule } from './corporate/corporate.module';
import { SmallBusinessPageModule } from './small-business/small-business.module';

const routes: Routes = [
  {
    path: '',
    component: BusinessServicesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    BusinessRoutingModule,
    CorporatePageModule,
    SmallBusinessPageModule
  ],
  declarations: [BusinessServicesPage]
})
export class BusinessServicesPageModule {}
