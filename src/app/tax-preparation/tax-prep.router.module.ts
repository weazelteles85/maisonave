import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxPreparationPage } from './tax-preparation.page';
import { PersonalIncomePage } from './personal-income/personal-income.page';
import { CorporateIncomePage } from './corporate-income/corporate-income.page';
import { SalesTaxPage } from './sales-tax/sales-tax.page';

const routes: Routes = [
  {
    path: 'tax-preparation',
    component: TaxPreparationPage,
    children: [
      {
        path: '',
        redirectTo: '/tax-preparation/(personal-income:personal-income)',
        pathMatch: 'full',
      },
      {
        path: 'personal-income',
        outlet: 'personal-income',
        component: PersonalIncomePage
      },
      {
        path: 'corporate-income',
        outlet: 'corporate-income',
        component: CorporateIncomePage
      },
      {
        path: 'sales-tax',
        outlet: 'sales-tax',
        component: SalesTaxPage
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tax-preparation/(home:home)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxPrepRoutingModule {}
