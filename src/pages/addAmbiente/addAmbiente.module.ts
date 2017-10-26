import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddAmbientePage } from './addAmbiente';

@NgModule({
  declarations: [
    AddAmbientePage,
  ],
  imports: [
    IonicPageModule.forChild(AddAmbientePage),
  ],
  exports: [
    AddAmbientePage
  ]
})
export class AddAmbientePageModule {}
