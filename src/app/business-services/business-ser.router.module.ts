import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessServicesPage } from './business-services.page';
import { SmallBusinessPage } from './small-business/small-business.page';
import { CorporatePage } from './corporate/corporate.page';

const routes: Routes = [
  {
    path: 'business-services',
    component: BusinessServicesPage,
    children: [
      {
        path: '',
        redirectTo: '/business-services/(small-business:small-business)',
        pathMatch: 'full',
      },
      {
        path: 'small-business',
        outlet: 'small-business',
        component: SmallBusinessPage
      },
      {
        path: 'corporate',
        outlet: 'corporate',
        component: CorporatePage
      },
    ]
  },
  {
    path: '',
    redirectTo: '/business-services/(small-business:small-business)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule {}
