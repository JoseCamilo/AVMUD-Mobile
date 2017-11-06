import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddAvisoPage } from './addAviso';

@NgModule({
  declarations: [
    AddAvisoPage,
  ],
  imports: [
    IonicPageModule.forChild(AddAvisoPage),
  ],
  exports: [
    AddAvisoPage
  ]
})
export class AddAvisoPageModule {}
