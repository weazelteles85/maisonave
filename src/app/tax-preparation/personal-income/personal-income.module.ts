import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PersonalIncomePage } from './personal-income.page';
import { TaxPreparationPageModule } from '../tax-preparation.module';

const routes: Routes = [
  {
    path: '',
    component: PersonalIncomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [PersonalIncomePage]
})
export class PersonalIncomePageModule {}
