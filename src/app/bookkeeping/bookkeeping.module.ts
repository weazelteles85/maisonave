import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BookkeepingPage } from './bookkeeping.page';
import { BookkeepingRoutingModule } from './bookkeeping.router.module';
import { BankReconciliationPageModule } from './bank-reconciliation/bank-reconciliation.module';
import { MonthyBookkeepingPageModule } from './monthy-bookkeeping/monthy-bookkeeping.module';

const routes: Routes = [
  {
    path: '',
    component: BookkeepingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    BookkeepingRoutingModule,
    BankReconciliationPageModule,
    MonthyBookkeepingPageModule
  ],
  declarations: [BookkeepingPage]
})
export class BookkeepingPageModule {}
