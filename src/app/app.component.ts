import { Component, ViewChild } from '@angular/core';
import { Platform, App, Events, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { AvisoPage } from "../pages/aviso/aviso";
import { ProdutoPage } from "../pages/produto/produto";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  public paginas = [
    { titulo: 'Janelas', componente: HomePage },
    { titulo: 'Produtos', componente: ProdutoPage },
    { titulo: 'Avisos', componente: AvisoPage },
    { titulo: 'Sair', componente: LoginPage }
  ];

  private userName: string;
  private userMail: string;

  @ViewChild(Nav) public nav: Nav;
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public app: App, events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();       

    });

    events.subscribe('username:changed', username => {
      if(username !== undefined && username !== ""){
        this.userName = username;
      }
   });

   events.subscribe('usermail:changed', usermail => {
      if(usermail !== undefined && usermail !== ""){
        this.userMail = usermail;
      }
   });

  }

  abrePagina(pagina) {

    this.nav.setRoot(pagina.componente);
  }
  
}

