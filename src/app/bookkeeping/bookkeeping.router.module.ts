import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookkeepingPage } from './bookkeeping.page';
import { BankReconciliationPage } from './bank-reconciliation/bank-reconciliation.page';
import { MonthyBookkeepingPage } from './monthy-bookkeeping/monthy-bookkeeping.page';

const routes: Routes = [
  {
    path: 'bookkeeping',
    component: BookkeepingPage,
    children: [
      {
        path: '',
        redirectTo: '/bookkeeping/(monthy-bookkeeping:monthy-bookkeeping)',
        pathMatch: 'full',
      },
      {
        path: 'bank-reconciliation',
        outlet: 'bank-reconciliation',
        component: BankReconciliationPage
      },
      {
        path: 'monthy-bookkeeping',
        outlet: 'monthy-bookkeeping',
        component: MonthyBookkeepingPage
      },
    ]
  },
  {
    path: '',
    redirectTo: '/bookkeeping/(monthy-bookkeeping:monthy-bookkeeping)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookkeepingRoutingModule {}
