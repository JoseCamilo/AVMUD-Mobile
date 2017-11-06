import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEmpresaPage } from './addEmpresa';

@NgModule({
  declarations: [
    AddEmpresaPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEmpresaPage),
  ],
  exports: [
    AddEmpresaPage 
  ]
})
export class AddEmpresaPageModule {}
