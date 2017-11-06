import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddProdutoPage } from './addProduto';

@NgModule({
  declarations: [
    AddProdutoPage,
  ],
  imports: [
    IonicPageModule.forChild(AddProdutoPage),
  ],
  exports: [
    AddProdutoPage
  ]
})
export class AddProdutoPageModule {}
