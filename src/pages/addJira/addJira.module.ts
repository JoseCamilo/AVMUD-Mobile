import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddJiraPage } from './addJira';

@NgModule({
  declarations: [
    AddJiraPage,
  ],
  imports: [
    IonicPageModule.forChild(AddJiraPage),
  ],
  exports: [
    AddJiraPage
  ]
})
export class AddJiraPageModule {}
