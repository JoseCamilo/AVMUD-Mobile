import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { File } from '@ionic-native/file';

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
import { ProdutoPage } from "../pages/produto/produto";
import { AddEmpresaPage } from "../pages/addEmpresa/addEmpresa";
import { AddProdutoPage } from "../pages/addProduto/addProduto";
import { EmpresaPage } from "../pages/empresa/empresa";
import { AddAvisoPage } from "../pages/addAviso/addAviso";
import { WsProdutos } from "../providers/wsProdutos";
import { WsEmpresas } from "../providers/wsEmpresas";
import { WsAmbientes } from "../providers/wsAmbientes";
import { WsAvisos } from "../providers/wsAvisos";
import { WsJira } from "../providers/wsJira";
import { AddJiraPage } from "../pages/addJira/addJira";
import { Autosize } from "../components/autosize/autosize";
import { LoginPage } from "../pages/login/login";

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
    AddAvisoPage,
    AddJiraPage,
    Autosize,
    LoginPage
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
    AddAvisoPage,
    AddJiraPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    WsJanelas,
    WsMudancas,
    WsTarefas,
    WsProdutos,
    WsAmbientes,
    WsEmpresas,
    WsAvisos,
    WsJira,
    File,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
