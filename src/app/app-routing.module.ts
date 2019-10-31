import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubscribeGuard } from './core/subscribe.guard';
import { AdminGuard } from './core/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  { path: 'about-us', loadChildren: './about-us/about-us.module#AboutUsPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: '', loadChildren: './tax-preparation/tax-preparation.module#TaxPreparationPageModule' },
  { path: 'personal-income', loadChildren: './tax-preparation/personal-income/personal-income.module#PersonalIncomePageModule' },
  { path: 'corporate-income', loadChildren: './tax-preparation/corporate-income/corporate-income.module#CorporateIncomePageModule' },
  { path: 'sales-tax', loadChildren: './tax-preparation/sales-tax/sales-tax.module#SalesTaxPageModule' },
  { path: 'payroll', loadChildren: './payroll/payroll.module#PayrollPageModule' },
  { path: '', loadChildren: './bookkeeping/bookkeeping.module#BookkeepingPageModule' },
  { path: 'monthy-bookkeeping', loadChildren: './bookkeeping/monthy-bookkeeping/monthy-bookkeeping.module#MonthyBookkeepingPageModule' },
  { path: 'bank-reconciliation', loadChildren: './bookkeeping/bank-reconciliation/bank-reconciliation.module#BankReconciliationPageModule' },
  { path: '', loadChildren: './business-services/business-services.module#BusinessServicesPageModule' },
  { path: 'small-business', loadChildren: './business-services/small-business/small-business.module#SmallBusinessPageModule' },
  { path: 'corporate', loadChildren: './business-services/corporate/corporate.module#CorporatePageModule' },
  { path: 'contact-us', loadChildren: './contact-us/contact-us.module#ContactUsPageModule' },
  { path: 'my-files', loadChildren: './my-files/my-files.module#MyFilesPageModule', canActivate: [SubscribeGuard] },
  { path: 'admin-console', loadChildren: './admin-console/admin-console.module#AdminConsolePageModule', canActivate: [AdminGuard] },
  { path: 'admin-scheduler', loadChildren: './admin-scheduler/admin-scheduler.module#AdminSchedulerPageModule', canActivate: [AdminGuard] },
  { path: 'scheduler', loadChildren: './scheduler/scheduler.module#SchedulerPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
