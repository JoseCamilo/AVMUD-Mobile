import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddJanelaPage } from './addJanela';

@NgModule({
  declarations: [
    AddJanelaPage,
  ],
  imports: [
    IonicPageModule.forChild(AddJanelaPage),
  ],
  exports: [
    AddJanelaPage
  ]
})
export class AddJanelaPageModule {}
