import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TaxPreparationPage } from './tax-preparation.page';
import { PersonalIncomePageModule } from './personal-income/personal-income.module';
import { CorporateIncomePageModule } from './corporate-income/corporate-income.module';
import { TaxPrepRoutingModule } from './tax-prep.router.module';
import { SalesTaxPageModule } from './sales-tax/sales-tax.module';

const routes: Routes = [
  {
    path: '', component: TaxPreparationPage, children: []
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TaxPrepRoutingModule,
    PersonalIncomePageModule,
    CorporateIncomePageModule,
    SalesTaxPageModule
  ],
  declarations: [TaxPreparationPage]
})
export class TaxPreparationPageModule {}
