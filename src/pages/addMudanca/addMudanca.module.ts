import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddMudancaPage } from './addMudanca';

@NgModule({
  declarations: [
    AddMudancaPage,
  ],
  imports: [
    IonicPageModule.forChild(AddMudancaPage),
  ],
  exports: [
    AddMudancaPage
  ]
})
export class AddMudancaPageModule {}
