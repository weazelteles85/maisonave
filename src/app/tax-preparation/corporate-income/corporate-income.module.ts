import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CorporateIncomePage } from './corporate-income.page';

const routes: Routes = [
  {
    path: 'tax-preparation',
    component: CorporateIncomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CorporateIncomePage],
})
export class CorporateIncomePageModule {}
