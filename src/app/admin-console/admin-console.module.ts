import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { IonicModule } from '@ionic/angular';

import { AdminConsolePage } from './admin-console.page';
import { DropZoneDirective } from '../drop-zone.directive';

const routes: Routes = [
  {
    path: '',
    component: AdminConsolePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminConsolePage, DropZoneDirective]
})
export class AdminConsolePageModule {}
