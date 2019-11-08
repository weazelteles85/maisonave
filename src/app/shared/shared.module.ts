import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeFormatPipe } from './time-format.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ TimeFormatPipe ],
  exports: [
    TimeFormatPipe
  ]
})
export class SharedModule { }
