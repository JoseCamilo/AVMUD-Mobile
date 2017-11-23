import { Component } from '@angular/core';
import { Platform, App, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { AmbientePage } from "../pages/ambiente/ambiente";
import { AvisoPage } from "../pages/aviso/aviso";
import { ProdutoPage } from "../pages/produto/produto";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  private homePage;
  private ambientePage;
  private avisoPage;
  private produtoPage;
  private userName: string;
  private userMail: string;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public app: App, events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();       

    });

    this.homePage = HomePage;
    this.ambientePage = AmbientePage;
    this.avisoPage = AvisoPage;
    this.produtoPage = ProdutoPage;

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

  openPage(p) {
    this.rootPage = p;
  }

  logout(){
    this.app.getRootNav().setRoot(LoginPage);
    this.app.getRootNav().popToRoot();
  }
  
}

