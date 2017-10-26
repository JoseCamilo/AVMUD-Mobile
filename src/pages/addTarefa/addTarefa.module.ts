import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTarefaPage } from './addTarefa';

@NgModule({
  declarations: [
    AddTarefaPage,
  ],
  imports: [
    IonicPageModule.forChild(AddTarefaPage),
  ],
  exports: [
    AddTarefaPage
  ]
})
export class AddTarefaPageModule {}
