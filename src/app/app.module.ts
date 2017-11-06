import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TarefaPage } from "../pages/tarefa/tarefa";
import { WsJanelas } from "../providers/wsJanelas";
import { WsMudancas } from "../providers/wsMudancas";
import { WsTarefas } from "../providers/wsTarefas";
import { HttpModule } from "@angular/http";
import { MudancaPage } from "../pages/mudanca/mudanca";
import { AddTarefaPage } from "../pages/addTarefa/addTarefa";
import { AddMudancaPage } from "../pages/addMudanca/addMudanca";
import { AddJanelaPage } from "../pages/addJanela/addJanela";
import { AmbientePage } from "../pages/ambiente/ambiente";
import { AddAmbientePage } from "../pages/addAmbiente/addAmbiente";
import { AvisoPage } from "../pages/aviso/aviso";
import { StatusPage } from "../pages/status/status";
import { SocialSharing } from "@ionic-native/social-sharing";
import { SQLite } from "@ionic-native/sqlite";
import { MyDb } from "../providers/MyDb";
import { ProdutoPage } from "../pages/produto/produto";
import { AddEmpresaPage } from "../pages/addEmpresa/addEmpresa";
import { AddProdutoPage } from "../pages/addProduto/addProduto";
import { EmpresaPage } from "../pages/empresa/empresa";
import { AddAvisoPage } from "../pages/addAviso/addAviso";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TarefaPage,
    MudancaPage,
    AddTarefaPage,
    AddMudancaPage,
    AddJanelaPage,
    AmbientePage,
    AddAmbientePage,
    AvisoPage,
    StatusPage,
    ProdutoPage,
    AddProdutoPage,
    EmpresaPage,
    AddEmpresaPage,
    AddAvisoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TarefaPage,
    MudancaPage,
    AddTarefaPage,
    AddMudancaPage,
    AddJanelaPage,
    AmbientePage,
    AddAmbientePage,
    AvisoPage,
    StatusPage,
    ProdutoPage,
    AddProdutoPage,
    EmpresaPage,
    AddEmpresaPage,
    AddAvisoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    WsJanelas,
    WsMudancas,
    WsTarefas,
    SocialSharing,
    SQLite,
    MyDb,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
